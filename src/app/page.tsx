// import { Button } from "antd";
import BackgroundParticles from "./components/three/BackgroundParticles.tsx";
import IcosahedronGeometry from "./components/three/IcosahedronGeometry.tsx";
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundParticles />
      <div className="relative z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full h-full">
          <h3 className="text-white basis-[10%]">AskLexI</h3>
          <div className="w-full basis-[50%]">
            <IcosahedronGeometry />
          </div>
          <p className="text-white">login</p>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
      </div>
    </div>
  );
}
