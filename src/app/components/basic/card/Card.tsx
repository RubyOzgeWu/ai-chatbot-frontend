import { Card } from "antd";

type cardProps = {
  children: ReactNode;
  className?: string;
};

export default function UserQuery({ children, className }: cardProps) {
  return (
    <Card className={className} variant="borderless">
      {children}
    </Card>
  );
}
