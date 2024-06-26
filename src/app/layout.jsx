import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ChatContextProvider } from "@/ContextProvider/chatContext";
import { PdfContextProvider } from "@/ContextProvider/pdfContext";
import { KeyContextProvider } from "@/ContextProvider/keyContext";
import { ThemeContextProvider } from "@/ContextProvider/themeContext";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <PdfContextProvider>
        <ChatContextProvider>
          <KeyContextProvider>
            <ThemeContextProvider>
              <html lang="en">
                <body className={outfit.className}>{children}</body>
              </html>
            </ThemeContextProvider>
          </KeyContextProvider>
        </ChatContextProvider>
      </PdfContextProvider>
    </ClerkProvider>
  );
}
