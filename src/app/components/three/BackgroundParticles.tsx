"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
};

export default function BackgroundParticles({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const enableParticles = true;
    if (!enableParticles) return;

    const container = containerRef.current;
    if (!container) return;

    const bgColor = new THREE.Color(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-black-60")
        .trim() || "#1C1C1E"
    );

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(bgColor);
    container.appendChild(renderer.domElement);

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

    const particlesCount = 300;
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

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const circleTexture = createCircleTexture();
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.2,
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

    // const clock = new THREE.Clock();
    let animationId: number;
    let lastFrameTime = 0;
    const fps = 30;

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);

      if (time - lastFrameTime < 1000 / fps) return;
      lastFrameTime = time;

      const positions = particleGeometry.attributes
        .position as THREE.BufferAttribute;

      for (let i = 0; i < particlesCount; i++) {
        const index = i * 3;
        positions.array[index] += particleDirections[i].x;
        positions.array[index + 1] += particleDirections[i].y;
        positions.array[index + 2] += particleDirections[i].z;

        if (positions.array[index] > 10 || positions.array[index] < -10) {
          particleDirections[i].x *= -1;
        }
        if (
          positions.array[index + 1] > 10 ||
          positions.array[index + 1] < -10
        ) {
          particleDirections[i].y *= -1;
        }
        if (
          positions.array[index + 2] > 10 ||
          positions.array[index + 2] < -10
        ) {
          particleDirections[i].z *= -1;
        }
      }

      positions.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);

      container.removeChild(renderer.domElement);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      circleTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 left-0 w-full h-full z-0 ${className ?? ""}`}
    />
  );
}
