import { Card } from "antd";

type cardProps = {
  children: ReactNode;
  className?: string;
  bodyStyle?: CSSProperties;
};

export default function UserQuery({
  children,
  className,
  bodyStyle,
}: cardProps) {
  return (
    <Card className={className} variant="borderless" bodyStyle={bodyStyle}>
      {children}
    </Card>
  );
}
