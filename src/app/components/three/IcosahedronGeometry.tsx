"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function IcosahedronGeometry() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 讀取 CSS 變數
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
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(bgColor);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({ vertexColors: true });

    // 產生頂點顏色陣列（為每個面頂點調整顏色）
    const colors: number[] = [];
    const vertexCount = geometry.attributes.position.count;

    for (let i = 0; i < vertexCount; i++) {
      const mixed = baseColor.clone().lerp(altColor, Math.random() * 0.4); // 混進一點 secondary 色
      mixed.offsetHSL(0, 0, (Math.random() - 0.5) * 0.2);
      colors.push(mixed.r, mixed.g, mixed.b);
    }

    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
