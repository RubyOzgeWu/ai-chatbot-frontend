import { Input } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import styles from "./Input.module.css";

/* ts 輸入型別定義 */
type InputProps = {
  value: string;
  className?: string;
  placeholder?: string;
  type?: string;
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  size?: "small" | "middle" | "large";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const { TextArea } = Input;

export default function InputComponent({
  value,
  className,
  onChange,
  placeholder,
  autoSize,
  type = "text",
  size = "middle",
}: InputProps) {
  // 根據 type 使用不同 Input 元件
  const InputElement = type === "password" ? Input.Password : Input;
  if (type === "password") {
    return (
      <Input.Password
        value={value}
        className={`${styles.customInput} ${className}`}
        onChange={onChange}
        placeholder={placeholder}
        size={size}
        iconRender={(visible) =>
          visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
        }
      />
    );
  }
  if (type === "textarea") {
    return (
      <TextArea
        value={value}
        className={`${styles.customInput} ${className}`}
        onChange={onChange}
        placeholder={placeholder}
        autoSize={autoSize}
      />
    );
  }

  return (
    <InputElement
      className={`${styles.customInput} ${className}`}
      type={type}
      size={size}
      value={value}
      onChange={onChange}
      placeholder={placeholder || "請輸入"}
    />
  );
}
