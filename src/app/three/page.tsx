"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function IcosahedronGeometry() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getVarColor = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    const baseColor = new THREE.Color(getVarColor("--color-primary-60") || "#00C67A");
    const altColor = new THREE.Color(getVarColor("--color-secondary-60") || "#3D3DEB");
    const bgColor = new THREE.Color(getVarColor("--color-black-60") || "#1C1C1E");

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

    // Icosahedron 幾何體
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({ vertexColors: true });

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

    // 建立圓形粒子貼圖
    function createCircleTexture(): THREE.Texture {
      const size = 64;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d")!;
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();

      return new THREE.CanvasTexture(canvas);
    }

    // 粒子特效：每顆粒子都有隨機方向與速度
    const particlesCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleDirections: THREE.Vector3[] = [];

    for (let i = 0; i < particlesCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      particlePositions.set([x, y, z], i * 3);

      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002
      );
      particleDirections.push(dir);
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const circleTexture = createCircleTexture();
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      map: circleTexture,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
      opacity: 0.6,
      sizeAttenuation: true,
      color: "#ffffff",
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;

      const positions = particleGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particlesCount; i++) {
        const index = i * 3;
        positions.array[index]     += particleDirections[i].x;
        positions.array[index + 1] += particleDirections[i].y;
        positions.array[index + 2] += particleDirections[i].z;

        // 若粒子飛太遠則反向
        if (positions.array[index] > 10 || positions.array[index] < -10) {
          particleDirections[i].x *= -1;
        }
        if (positions.array[index + 1] > 10 || positions.array[index + 1] < -10) {
          particleDirections[i].y *= -1;
        }
        if (positions.array[index + 2] > 10 || positions.array[index + 2] < -10) {
          particleDirections[i].z *= -1;
        }
      }
      positions.needsUpdate = true;

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

  return <div ref={containerRef} className="w-full h-screen" />;
}