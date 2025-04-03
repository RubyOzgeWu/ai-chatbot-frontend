"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
};

export default function IcosahedronGeometry({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getVarColor = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    const baseColor = new THREE.Color(
      getVarColor("--color-primary-60") || "#00C67A"
    );
    const altColor = new THREE.Color(
      getVarColor("--color-secondary-60") || "#3D3DEB"
    );
    const bgColor = new THREE.Color(
      getVarColor("--color-black-60") || "#1C1C1E"
    );

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // 降低資源壓力
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(bgColor, 0);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({ vertexColors: true });

    // 動態顏色
    const colors: number[] = [];
    const vertexCount = geometry.attributes.position.count;
    for (let i = 0; i < vertexCount; i++) {
      const mixed = baseColor.clone().lerp(altColor, Math.random() * 0.4);
      mixed.offsetHSL(0, 0, (Math.random() - 0.5) * 0.2);
      colors.push(mixed.r, mixed.g, mixed.b);
    }

    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const fitCameraToObject = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const aspect = width / height;

      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const fov = camera.fov * (Math.PI / 180);
      const objectSize = 2;
      const verticalLimit = objectSize / 2 / Math.tan(fov / 2);
      const horizontalLimit = verticalLimit / aspect;
      camera.position.z = Math.max(verticalLimit, horizontalLimit) * 1.5;
    };

    fitCameraToObject();

    // 加入動畫取消控制
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    // resize 節流處理
    let resizeTimeout: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        fitCameraToObject();
      }, 100);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      container.removeChild(renderer.domElement);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden ${className}`}
    />
  );
}
