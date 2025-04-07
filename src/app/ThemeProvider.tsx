"use client";

import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState({
    colorPrimary: "#00C67A",
    colorError: "#f44336",
    colorWarning: "#ffd500",
    colorSuccess: "#00C67A",
  });

  useEffect(() => {
    const getVar = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    setToken({
      colorPrimary: getVar("--color-primary"),
      colorError: getVar("--color-error"),
      colorWarning: getVar("--color-warning"),
      colorSuccess: getVar("--color-success"),
    });
  }, []);

  return (
    <ConfigProvider
      theme={{
        token, // 全域
        components: {
          Input: {
            colorBgContainer: "var(--color-black-50)",
            colorBorder: "var(--color-black-40)",
            colorText: "var(--color-black-10)",
            colorTextPlaceholder: "var(--color-black-40)",
            fontSize: 16,
          },
          Button: {
            borderRadius: "9999px",
          },
          Card: {
            colorBgContainer: "var(--color-black-30)",
            colorBorder: "var(--color-black-30)",
            colorText: "var(--color-black-60)",
            fontSize: 16,
            bodyPadding: 12,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
