"use client";
import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import axios from "axios";

import styles from "./page.module.css";

import Background from "./components/Background.tsx";
import BackgroundParticles from "./components/three/BackgroundParticles.tsx";
import IcosahedronGeometry from "./components/three/IcosahedronGeometry.tsx";
import InputComponent from "./components/basic/input/Input.tsx";
import ButtonComponent from "./components/basic/button/Button.tsx";
import Card from "./components/basic/card/Card.tsx";

export default function Home() {
  /* 先建立 conversation 的 state */
  const [conversations, setConversation] = useState([]);
  const [inputValue, setInputValue] = useState("");

  /* 提交輸入對話 */
  const handleSubmit = async () => {
    console.log("提交");
    if (!inputValue.trim()) return;

    const userMessage = {
      role: "user",
      content: inputValue,
    };

    setConversation((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      // API 請求
      const response = await axios.post("/api/conversations", {
        role: "user",
        content: inputValue,
      });

      // AI 回應加入 conversation
      const assistantMessage = {
        role: "assistant",
        content: response.data.llm_response,
      };
      setConversation((prev) => [...prev, assistantMessage]);

    } catch (error) {
      console.error("資料獲取失敗", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {conversations.length === 0 && <BackgroundParticles />}
      {conversations.length > 0 && <Background />}

      <div className="relative z-10 flex flex-col items-center justify-items-center h-screen font-[family-name:var(--font-noto-sans)]">
        <main className="flex flex-col row-start-2 items-center w-full h-full justify-end">
          {conversations.length === 0 && (
            <div className="w-full flex-1 flex flex-col justify-center p-16 md:px-18 md:py-20 2xl:py-25">
              <div className="text-center text-white tracking-wide pb-6">
                <h1 className={`2xl:text-[2.65rem] ${styles["gradient-text"]}`}>
                  AskLexI
                </h1>
                <h4 className="tracking-normal mt-2 font-light typing">
                  智慧法律小助理，一問即答
                </h4>
              </div>
              <IcosahedronGeometry className="basis-[50%] 2xl:basis-[70%]" />
            </div>
          )}

          {conversations.length > 0 && (
            <div className="w-full flex-1 flex justify-center overflow-y-auto">
              <div className="w-full 2xl:w-1/2 flex flex-col justify-start px-6 pt-15">
                {conversations.map((conversation, index) => {
                  const isUser = conversation.role === "user";
                  const isAssistant = conversation.role === "assistant";

                  return (
                    <div
                      className={`flex justify-end mb-8 ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                      key={index}
                    >
                      {isUser && (
                        <Card className="max-w-[60%]">
                          {conversation.content}
                        </Card>
                      )}

                      {isAssistant && (
                        <p className="text-black-30 text-[16px]">
                          {conversation.content}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="w-full 2xl:w-1/2 p-6 pb-12">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex gap-2 items-end"
            >
              <InputComponent
                value={inputValue}
                className="flex-2"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="請輸入問題"
                type="textarea"
                size="large"
                autoSize
              ></InputComponent>

              <ButtonComponent
                htmlType="submit"
                shape="circle"
                size="large"
                className="mb-0.5"
              >
                <SendOutlined />
              </ButtonComponent>
            </form>
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
      </div>
    </div>
  );
}
