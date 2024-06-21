"use client";
import { createContext, useState } from "react";

export const KeyContext = createContext();

export function KeyContextProvider({ children }) {
  const [openAiKey, setOpenAiKey] = useState(
    "sk-proj-M18sKlibwUchF0TB862ST3BlbkFJu276EEE0ZkpftdCIcCLu"
  ); // Replace with your actual API key

  return (
    <KeyContext.Provider value={{ openAiKey, setOpenAiKey }}>
      {children}
    </KeyContext.Provider>
  );
}
