"use client";
import { useState, useEffect, useRef, useContext } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { PdfContext } from "@/ContextProvider/pdfContext";
import { ChatContext } from "@/ContextProvider/chatContext";
import Error from "@/components/Error";
import { Configuration, OpenAIApi } from "openai";

const CHAT_HISTORY_KEY = "chat_history";
const OPENAI_API_KEY = process.env.OPENAI_KEY; // Replace with your actual API key
const MAX_RETRIES = 5;

function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const [apiError, setApiError] = useState(false);
  const { pdfContext } = useContext(PdfContext);
  const { setChat } = useContext(ChatContext);
  const ref = useRef(null);

  const [chatHistory, setChatHistory] = useState(() => {
    if (typeof window !== "undefined") {
      const savedChatHistory = localStorage.getItem(CHAT_HISTORY_KEY);
      return savedChatHistory ? JSON.parse(savedChatHistory) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
    }
    setChat(chatHistory);
  }, [chatHistory]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleInputSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;
    if (OPENAI_API_KEY.trim() === "") {
      setThinking(false);
      setApiError("OpenAI API key not set. Please check your configuration.");
      return;
    }

    const userInput = { role: "user", content: inputValue };
    const updatedChatHistory = [...chatHistory, userInput];
    setChatHistory(updatedChatHistory);
    setInputValue("");

    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const fetchResponse = async (retryCount = 0) => {
      try {
        setThinking(true);
        let arrayTop = [
          {
            role: "system",
            content:
              'You are NyayaVivaka, a language model trained to act as a PDF file. Your task is to take text input of each page of the PDF file one by one from the user. After each page, you will ask the user if there are more pages to be added. If the user provides another page, you will repeat the process until the user writes the exact words "END OF PDF FILE." Once the user has finished adding pages, you will switch to "query mode," where you will only answer questions related to the contents of the PDF file. Remember, you are a PDF file, and your responses should be limited to the information contained within the PDF file. You must accurately answer any questions the user poses, regardless of how they phrase them.',
          },
        ];

        for (let i = 0; i < pdfContext.chunks.length; i++) {
          arrayTop.push({
            role: "user",
            content: pdfContext.chunks[i],
          });
          arrayTop.push({
            role: "assistant",
            content: "Next page please.",
          });
          if (i === pdfContext.chunks.length - 1) {
            arrayTop.push({
              role: "user",
              content: "END OF PDF FILE",
            });
            arrayTop.push({
              role: "assistant",
              content: "Thank you for the pdf, now you can ask me questions",
            });
          }
        }

        let remaining_part = chatHistory.concat(userInput);
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: arrayTop.concat(remaining_part),
        });

        setThinking(false);
        const aiResponse = response.data.choices[0].message;
        setChatHistory([...updatedChatHistory, aiResponse]);
      } catch (error) {
        if (
          error.response &&
          error.response.status === 429 &&
          retryCount < MAX_RETRIES
        ) {
          await delay(2 ** retryCount * 1000); // Exponential backoff
          return fetchResponse(retryCount + 1);
        }
        setApiError(error.message);
        updatedChatHistory.pop();
        setChatHistory(updatedChatHistory);
        setThinking(false);
      }
    };

    fetchResponse();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!thinking && inputValue.trim() !== "") {
        handleInputSubmit(e);
      }
      e.preventDefault();
    }
  };

  return (
    <Container fixed>
      {apiError ? <Error anyError={apiError} /> : null}
      <Box
        sx={{
          height: "70vh",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            outline: "1px solid slategrey",
          },
        }}
        ref={ref}
      >
        <List>
          {chatHistory.map((msg, i) => (
            <ListItem key={i}>
              <ListItemAvatar>
                {msg.role === "user" ? (
                  <Avatar
                    sx={{ bgcolor: "#d2d6d3" }}
                    alt="You"
                    src="/user-icon.png"
                  />
                ) : (
                  <Avatar
                    alt="NyayaVivaka"
                    sx={{ bgcolor: "#d2d6d3" }}
                    src="/chatgpt-icon.png"
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={msg.role === "user" ? `You` : `NyayaVivaka`}
                secondary={msg.content}
              />
            </ListItem>
          ))}
          {thinking ? (
            <ListItem key={"typing"}>
              <ListItemAvatar>
                <Avatar
                  alt="NyayaVivaka"
                  sx={{ bgcolor: "#d2d6d3" }}
                  src="/chatgpt-icon.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={`NyayaVivaka`}
                secondary={"NyayaVivaka is typing..."}
              />
            </ListItem>
          ) : null}
        </List>
        <Stack spacing={2} direction="row">
          <Box
            component="form"
            sx={{
              width: "100%",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Enter your queries here..."
              variant="standard"
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Box>
          <Button
            sx={{
              "& > :not(style)": { width: "100%" },
            }}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleInputSubmit}
            disabled={thinking || inputValue.trim() === ""}
          ></Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default Chat;
