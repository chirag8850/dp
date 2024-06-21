"use client";
import { createContext, useState, useEffect } from "react";

export const KeyContext = createContext();

export function KeyContextProvider({ children }) {
  const [openAiKey, setOpenAiKey] = useState("");

  useEffect(() => {
    setOpenAiKey(process.env.OPENAI_KEY);
  }, []);

  return (
    <KeyContext.Provider value={{ openAiKey, setOpenAiKey }}>
      {children}
    </KeyContext.Provider>
  );
}
