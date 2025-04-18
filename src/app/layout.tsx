import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import ThemeProvider from "./ThemeProvider";

import "./styles/main.css";
import "./styles/variables.css";
import "./styles/global.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans", 
  subsets: ["latin"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable}  antialiased min-h-screen`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
