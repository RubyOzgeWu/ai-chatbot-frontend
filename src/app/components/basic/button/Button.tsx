import { Button } from "antd";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode; // 可以放任何型別的內容
  className?: string;
  style?: React.CSSProperties;
  htmlType?: "submit" | "reset" | "button";
  type?: "primary" | "link" | "text" | "default";
  shape?: "default" | "circle" | "round";
  size?: "large" | "middle" | "small";
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void; // 父層傳遞 function 到子層 callback function 回父層
};

export default function ButtonComponent({
  children,
  className,
  style,
  htmlType = "button",
  type = "primary",
  shape = "default",
  size = "middle",
  block = false,
  loading = false,
  disabled = false,
  icon,
  onClick,
}: ButtonProps) {
  return (
    <Button
      className={`${styles.button} ${className}`}
      type={type}
      shape={shape}
      size={size}
      htmlType={htmlType}
      block={block}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      style={style}
      icon={icon}
    >
      {children}
    </Button>
  );
}
