"use client";
import { useEffect } from "react";

interface RingLoaderProps {
  size?: string;
  stroke?: string;
  speed?: string;
  color?: string;
  bgOpacity?: string;
}

export function RingLoader({
  size = "20",
  stroke = "2.5",
  speed = "2",
  bgOpacity = "0",
  color = "#010101",
}: RingLoaderProps) {
  useEffect(() => {
    async function getLoader() {
      const { ring } = await import("ldrs");
      ring.register();
    }
    getLoader();
  }, []);
  return (
    /* @ts-expect-error -- This Component is not a valid JSX Element */
    <l-ring
      size={size}
      stroke={stroke}
      bg-opacity={bgOpacity}
      speed={speed}
      color={color}
    />
  );
}
