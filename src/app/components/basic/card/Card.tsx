import { Card } from "antd";

type cardProps = {
  children: React.ReactNode;
  className?: string;
  bodyStyle?: React.CSSProperties;
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
