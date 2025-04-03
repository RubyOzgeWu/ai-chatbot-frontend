"use client";
import { useState } from "react";
import { SendOutlined } from '@ant-design/icons';
// import { Button } from "antd";

import BackgroundParticles from "./components/three/BackgroundParticles.tsx";
import IcosahedronGeometry from "./components/three/IcosahedronGeometry.tsx";
import InputComponent from "./components/basic/input/Input.tsx";
import ButtonComponent from "./components/basic/button/Button.tsx";
// import FormLogin from "./components/home/FormLogin.tsx";

export default function Home() {
  /* 先建立 email, password 的 state */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      alert("請輸入帳號與密碼");
      return;
    }
    console.log("提交表單：", { email, password });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundParticles />
      <div className="relative z-10 flex flex-col items-center justify-items-center h-screen font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col row-start-2 items-center w-full h-full justify-end">
          <div className="w-full flex-1 flex flex-col justify-center p-16 md:px-18 md:py-20 ">
            <div className="text-center text-white tracking-wide pb-6">
              <h1>AskLexI</h1>
              <h4 className="tracking-normal mt-2 font-light typing ">
                智慧法律小助理，一問即答
              </h4>
            </div>
            <IcosahedronGeometry className="basis-[50%] 2xl:basis-[70%]" />
          </div>

          <div className="w-full 2xl:w-1/2 p-6 pb-12">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex gap-2 items-end"
            >
              <InputComponent
                value={email}
                className="flex-2"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="請輸入問題"
                type="textarea"
                size="large"
                autoSize
              ></InputComponent>

              <ButtonComponent htmlType="submit" shape="circle" size="large" className="mb-0.5">
                <SendOutlined />
              </ButtonComponent>

              {/* <InputComponent
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入密碼"
                type="password"
                size="large"
              ></InputComponent>

              <ButtonComponent
                htmlType="submit"
                size="large"
                className="w-1/2 self-center rounded-lg"
              >
                登入
              </ButtonComponent> */}
            </form>
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
      </div>
    </div>
  );
}
