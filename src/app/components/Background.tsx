type Props = {
  className?: string;
};

export default function Background({ className }: Props) {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full z-0 bg-black ${className}`}
    ></div>
  );
}
