import { useState, useRef, useCallback, Suspense, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/catalogue-data";
import { useShoppingCart } from "@/lib/shopping-cart";
import {
  Plus,
  RotateCcw,
  ShoppingCart,
  Send,
  Trash2,
  Lightbulb,
  Hand,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  ZoomOut,
  Palette,
  Sparkles,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { Link } from "wouter";
import * as THREE from "three";

type ProductPlacement =
  | "swing-bolster" | "swing-disc" | "swing-t" | "swing-platform"
  | "mat-crash" | "mat-tiles"
  | "ball-round" | "ball-peanut"
  | "tube-bubble" | "tile-liquid"
  | "board-balance" | "stones-stepping" | "trampoline"
  | "vest-weighted" | "sock-sensory" | "blanket-weighted"
  | "fiber-optic" | "climbing-wall" | "activity-panel" | "floor-projector" | "soft-play-shapes";

interface RoomProduct {
  id: string;
  name: string;
  price: number;
  placement: ProductPlacement;
  color: string;
  accentColor: string;
  category: string;
  image: string;
  description: string;
}

interface PlacedItem {
  instanceId: string;
  product: RoomProduct;
  position: [number, number, number];
}

interface RoomSettings {
  ledColor: string;
  ledIntensity: number;
  wallPadColor: string;
  floorType: "wood" | "foam" | "rubber";
  roomMode: "light" | "dark";
}

interface RoomTemplate {
  id: string;
  name: string;
  description: string;
  items: string[];
  settings: Partial<RoomSettings>;
}

const LED_COLORS = [
  { name: "Off", value: "#000000" },
  { name: "Warm White", value: "#FEF3C7" },
  { name: "Cool Blue", value: "#93C5FD" },
  { name: "Calming Purple", value: "#C4B5FD" },
  { name: "Soft Green", value: "#86EFAC" },
  { name: "Sunset Orange", value: "#FDBA74" },
  { name: "Pink", value: "#F9A8D4" },
  { name: "Aqua", value: "#67E8F9" },
];

const WALL_COLORS = [
  { name: "Soft White", value: "#F8F6F3" },
  { name: "Sky Blue", value: "#DBEAFE" },
  { name: "Mint", value: "#D1FAE5" },
  { name: "Lavender", value: "#EDE9FE" },
  { name: "Peach", value: "#FED7AA" },
  { name: "Cloud Grey", value: "#F1F5F9" },
];

const FLOOR_TYPES: { id: "wood" | "foam" | "rubber"; name: string; color: string; accent: string }[] = [
  { id: "wood", name: "Oak Parquet", color: "#C4A882", accent: "#B89B72" },
  { id: "foam", name: "Safety Foam", color: "#7DD3FC", accent: "#38BDF8" },
  { id: "rubber", name: "Rubber Mat", color: "#475569", accent: "#334155" },
];

const roomProducts: RoomProduct[] = [
  { id: "bolster-swing", name: "Bolster Swing", price: 4500, placement: "swing-bolster", color: "#4A53A0", accentColor: "#6B74C4", category: "Swings", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_1_a43ed9ee-1c32-4081-9b0c-9e423b5538a8.jpg?v=1766662698", description: "Vestibular therapy swing" },
  { id: "disc-swing", name: "Disc Swing", price: 3200, placement: "swing-disc", color: "#0EA5E9", accentColor: "#38BDF8", category: "Swings", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_2.jpg?v=1764648162", description: "Rotational vestibular input" },
  { id: "t-swing", name: "T Swing", price: 3800, placement: "swing-t", color: "#1E40AF", accentColor: "#3B82F6", category: "Swings", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_10.jpg?v=1768027428", description: "Bilateral coordination" },
  { id: "platform-swing", name: "Platform Swing", price: 6800, placement: "swing-platform", color: "#D4A574", accentColor: "#E8C9A0", category: "Swings", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-187ol789l_dd7b9170-2401-4fe7-84f8-db80f45bde8f.jpg?v=1763019394", description: "Multi-position therapy" },
  { id: "crash-mat", name: "Crash Mat", price: 7500, placement: "mat-crash", color: "#166534", accentColor: "#22C55E", category: "Mats", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-687l799p_5517468c-2f14-472f-8e25-040031e57d66.jpg?v=1763022357", description: "Safe landing surface" },
  { id: "interlocking-mat", name: "Interlocking Mat", price: 450, placement: "mat-tiles", color: "#3B82F6", accentColor: "#EF4444", category: "Mats", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-TYJKYKYU_9daeb4cf-edf8-4795-83ab-aa23924ccf73.jpg?v=1763019822", description: "Modular floor tiles" },
  { id: "gym-ball", name: "Gym Ball", price: 1200, placement: "ball-round", color: "#EF4444", accentColor: "#DC2626", category: "Therapy Balls", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9720_56aab3dd-f27f-4cdc-ad81-285fd115f7a0.jpg?v=1764648162", description: "Core strengthening" },
  { id: "peanut-ball", name: "Peanut Ball", price: 2800, placement: "ball-peanut", color: "#F59E0B", accentColor: "#D97706", category: "Therapy Balls", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_dc914207-e215-477d-8898-663d14b1d459.jpg?v=1763974508", description: "Prone therapy" },
  { id: "bubble-tube", name: "Bubble Tube", price: 8500, placement: "tube-bubble", color: "#7C3AED", accentColor: "#A78BFA", category: "Visual & Sensory", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_f169ba89-3192-47c3-8f27-6c3f543bfd72.jpg?v=1770267207", description: "Visual calming" },
  { id: "liquid-tiles", name: "Liquid Motion Tiles", price: 3500, placement: "tile-liquid", color: "#06B6D4", accentColor: "#22D3EE", category: "Visual & Sensory", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_1_3e4be01c-4d7f-41c5-9bd0-13d6118b2490.jpg?v=1770267810", description: "Pressure-responsive floor" },
  { id: "fiber-optic-curtain", name: "Fiber Optic Curtain", price: 12000, placement: "fiber-optic", color: "#F472B6", accentColor: "#EC4899", category: "Visual & Sensory", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_f169ba89-3192-47c3-8f27-6c3f543bfd72.jpg?v=1770267207", description: "Cascading light strands" },
  { id: "floor-projector", name: "Interactive Projector", price: 25000, placement: "floor-projector", color: "#8B5CF6", accentColor: "#6D28D9", category: "Visual & Sensory", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_1_3e4be01c-4d7f-41c5-9bd0-13d6118b2490.jpg?v=1770267810", description: "Motion-reactive floor display" },
  { id: "balance-board", name: "Balance Board", price: 2800, placement: "board-balance", color: "#D4A574", accentColor: "#8B7355", category: "Movement", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9796_bd82fe01-e81e-4d39-a553-b1222ef7f681.jpg?v=1764648264", description: "Stability training" },
  { id: "stepping-stone", name: "Stepping Stones", price: 2200, placement: "stones-stepping", color: "#22C55E", accentColor: "#16A34A", category: "Movement", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-26at5.11.10PM.jpg?v=1766749713", description: "Motor planning paths" },
  { id: "trampoline", name: "Trampoline", price: 6500, placement: "trampoline", color: "#1F2937", accentColor: "#4B5563", category: "Movement", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_3_4.jpg?v=1767097014", description: "Vestibular bouncing" },
  { id: "climbing-wall", name: "Climbing Wall", price: 18000, placement: "climbing-wall", color: "#78716C", accentColor: "#A8A29E", category: "Movement", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_3_4.jpg?v=1767097014", description: "Sensory climbing surface" },
  { id: "soft-play-set", name: "Soft Play Shapes", price: 9500, placement: "soft-play-shapes", color: "#F97316", accentColor: "#FB923C", category: "Movement", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-687l799p_5517468c-2f14-472f-8e25-040031e57d66.jpg?v=1763022357", description: "Foam ramp, wedge & cylinder" },
  { id: "activity-panel", name: "Activity Panel", price: 6500, placement: "activity-panel", color: "#0EA5E9", accentColor: "#38BDF8", category: "Interactive", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_10.jpg?v=1768027428", description: "Tactile wall-mounted panel" },
  { id: "weighted-vest", name: "Weighted Vest", price: 3200, placement: "vest-weighted", color: "#1E3A5F", accentColor: "#2563EB", category: "Deep Pressure", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_98o8p098o8p098o8_1.png?v=1764648068", description: "Proprioceptive calming" },
  { id: "sensory-sock", name: "Sensory Sock", price: 1800, placement: "sock-sensory", color: "#3B82F6", accentColor: "#60A5FA", category: "Deep Pressure", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-blue-girl-therapeutic-badge-recommended_5da5095a-704b-46da-9ece-93365e69d3f4.jpg?v=1764647672", description: "Full-body compression" },
  { id: "weighted-blanket", name: "Weighted Blanket", price: 4500, placement: "blanket-weighted", color: "#9CA3AF", accentColor: "#6B7280", category: "Deep Pressure", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/cozykids-weighted-blanket-for-kids-folded-grey-quilted-therapeutic-badge_2fca9568-55a4-4dec-85db-979060d4cb1c.jpg?v=1764648068", description: "Deep pressure therapy" },
];

const roomTemplates: RoomTemplate[] = [
  {
    id: "calming-retreat",
    name: "Calming Retreat",
    description: "A soothing space with soft lighting, bubble tubes and deep pressure tools",
    items: ["bubble-tube", "weighted-blanket", "fiber-optic-curtain", "interlocking-mat", "liquid-tiles"],
    settings: { ledColor: "#C4B5FD", wallPadColor: "#EDE9FE", floorType: "foam", roomMode: "light" },
  },
  {
    id: "active-therapy",
    name: "Active Therapy Room",
    description: "Designed for vestibular and movement therapy with swings, climbing and trampolines",
    items: ["bolster-swing", "platform-swing", "trampoline", "crash-mat", "climbing-wall", "stepping-stone"],
    settings: { ledColor: "#FEF3C7", wallPadColor: "#DBEAFE", floorType: "rubber", roomMode: "light" },
  },
  {
    id: "dark-sensory",
    name: "Dark Sensory Room",
    description: "Immersive dark environment where LED, fiber optics, projectors and liquid tiles glow vividly",
    items: ["bubble-tube", "fiber-optic-curtain", "floor-projector", "liquid-tiles", "liquid-tiles"],
    settings: { ledColor: "#C4B5FD", ledIntensity: 0.8, wallPadColor: "#1E1E2E", floorType: "rubber", roomMode: "dark" },
  },
  {
    id: "sensory-explorer",
    name: "Sensory Explorer",
    description: "Multi-sensory stimulation with interactive projector, activity panels and visual tools",
    items: ["floor-projector", "activity-panel", "bubble-tube", "soft-play-set", "gym-ball", "liquid-tiles"],
    settings: { ledColor: "#93C5FD", wallPadColor: "#DCFCE7", floorType: "foam", roomMode: "light" },
  },
  {
    id: "ot-clinic",
    name: "OT Clinic Setup",
    description: "Professional occupational therapy room with balance, coordination and sensory tools",
    items: ["t-swing", "balance-board", "peanut-ball", "crash-mat", "weighted-vest", "stepping-stone", "activity-panel"],
    settings: { ledColor: "#FEF3C7", wallPadColor: "#F8F6F3", floorType: "rubber", roomMode: "light" },
  },
];

function RopeLine({ start, end, color = "#8B7355" }: { start: [number, number, number]; end: [number, number, number]; color?: string }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} linewidth={2} />
    </line>
  );
}

function SwingBolster({ item }: { item: PlacedItem }) {
  const ceilY = 2.92;
  const seatY = 1.6;
  const x = item.position[0];
  const z = item.position[2];
  return (
    <group>
      <RopeLine start={[x - 0.15, ceilY, z]} end={[x - 0.15, seatY + 0.12, z]} />
      <RopeLine start={[x + 0.15, ceilY, z]} end={[x + 0.15, seatY + 0.12, z]} />
      <mesh position={[x, seatY, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <capsuleGeometry args={[0.12, 0.5, 8, 16]} />
        <meshStandardMaterial color={item.product.color} roughness={0.6} />
      </mesh>
      <mesh position={[x - 0.15, ceilY, z]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#9CA3AF" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[x + 0.15, ceilY, z]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#9CA3AF" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

function SwingDisc({ item }: { item: PlacedItem }) {
  const ceilY = 2.92;
  const seatY = 1.4;
  const x = item.position[0];
  const z = item.position[2];
  const ropeOffsets: [number, number][] = [[0, -0.2], [0.17, 0.1], [-0.17, 0.1]];
  return (
    <group>
      {ropeOffsets.map(([dx, dz], i) => (
        <RopeLine key={i} start={[x, ceilY, z]} end={[x + dx, seatY + 0.04, z + dz]} />
      ))}
      <mesh position={[x, ceilY, z]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#9CA3AF" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[x, seatY, z]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.06, 32]} />
        <meshStandardMaterial color={item.product.color} roughness={0.5} />
      </mesh>
      <mesh position={[x, seatY + 0.031, z]}>
        <cylinderGeometry args={[0.26, 0.26, 0.005, 32]} />
        <meshStandardMaterial color={item.product.accentColor} roughness={0.4} />
      </mesh>
    </group>
  );
}

function SwingT({ item }: { item: PlacedItem }) {
  const ceilY = 2.92;
  const barY = 1.7;
  const x = item.position[0];
  const z = item.position[2];
  return (
    <group>
      <RopeLine start={[x, ceilY, z]} end={[x, barY + 0.04, z]} />
      <mesh position={[x, ceilY, z]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#9CA3AF" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[x, barY, z]} castShadow>
        <boxGeometry args={[0.6, 0.06, 0.06]} />
        <meshStandardMaterial color={item.product.color} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[x, barY, z]}>
        <boxGeometry args={[0.06, 0.06, 0.04]} />
        <meshStandardMaterial color={item.product.accentColor} roughness={0.4} />
      </mesh>
      <RopeLine start={[x - 0.25, barY - 0.03, z]} end={[x - 0.25, barY - 0.5, z]} color={item.product.color} />
      <RopeLine start={[x + 0.25, barY - 0.03, z]} end={[x + 0.25, barY - 0.5, z]} color={item.product.color} />
    </group>
  );
}

function SwingPlatform({ item }: { item: PlacedItem }) {
  const ceilY = 2.92;
  const platY = 1.3;
  const x = item.position[0];
  const z = item.position[2];
  const corners: [number, number][] = [[-0.3, -0.2], [0.3, -0.2], [-0.3, 0.2], [0.3, 0.2]];
  return (
    <group>
      {corners.map(([dx, dz], i) => (
        <group key={i}>
          <RopeLine start={[x + dx * 0.3, ceilY, z + dz * 0.3]} end={[x + dx, platY + 0.04, z + dz]} />
          <mesh position={[x + dx * 0.3, ceilY, z + dz * 0.3]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#9CA3AF" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}
      <mesh position={[x, platY, z]} castShadow>
        <boxGeometry args={[0.7, 0.08, 0.5]} />
        <meshStandardMaterial color={item.product.color} roughness={0.7} />
      </mesh>
      <mesh position={[x, platY + 0.041, z]}>
        <boxGeometry args={[0.66, 0.005, 0.46]} />
        <meshStandardMaterial color={item.product.accentColor} roughness={0.5} />
      </mesh>
    </group>
  );
}

function MatCrash({ item }: { item: PlacedItem }) {
  const x = item.position[0];
  const z = item.position[2];
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.16, 0.7]} />
        <meshStandardMaterial color={item.product.color} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.161, 0]}>
        <boxGeometry args={[0.96, 0.005, 0.66]} />
        <meshStandardMaterial color={item.product.accentColor} roughness={0.7} opacity={0.5} transparent />
      </mesh>
      {[-0.32, 0, 0.32].map((zOff, i) => (
        <mesh key={i} position={[0, 0.162, zOff]}>
          <boxGeometry args={[0.96, 0.003, 0.01]} />
          <meshStandardMaterial color="#0F4C2A" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function MatTiles({ item }: { item: PlacedItem }) {
  const x = item.position[0];
  const z = item.position[2];
  const tileColors = [item.product.color, item.product.accentColor, "#22C55E", "#F59E0B", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316", "#6366F1"];
  return (
    <group position={[x, 0, z]}>
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <mesh key={`${row}-${col}`} position={[-0.31 + col * 0.31, 0.015, -0.31 + row * 0.31]} castShadow receiveShadow>
            <boxGeometry args={[0.29, 0.03, 0.29]} />
            <meshStandardMaterial color={tileColors[(row * 3 + col) % tileColors.length]} roughness={0.8} />
          </mesh>
        ))
      )}
    </group>
  );
}

function BallRound({ item }: { item: PlacedItem }) {
  const x = item.position[0];
  const z = item.position[2];
  const radius = 0.22;
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, radius, 0]} castShadow>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={item.product.color} roughness={0.4} metalness={0.05} />
      </mesh>
      <mesh position={[0, radius, 0]}>
        <torusGeometry args={[radius * 0.6, 0.005, 8, 32]} />
        <meshStandardMaterial color={item.product.accentColor} roughness={0.3} />
      </mesh>
    </group>
  );
}

function BallPeanut({ item }: { item: PlacedItem }) {
  const x = item.position[0];
  const z = item.position[2];
  const r = 0.18;
  return (
    <group position={[x, 0, z]}>
      <mesh position={[-0.14, r, 0]} castShadow>
        <sphereGeometry args={[r, 32, 32]} />
        <meshStandardMaterial color={item.product.color} roughness={0.4} />
      </mesh>
      <mesh position={[0.14, r, 0]} castShadow>
        <sphereGeometry args={[r, 32, 32]} />
        <meshStandardMaterial color={item.product.color} roughness={0.4} />
      </mesh>
      <mesh position={[0, r, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <capsuleGeometry args={[r * 0.7, 0.18, 8, 16]} />
        <meshStandardMaterial color={item.product.accentColor} roughness={0.45} />
      </mesh>
    </group>
  );
}

function BubbleTube({ item, isDark = false }: { item: PlacedItem; isDark?: boolean }) {
  const x = item.position[0];
  const wallZ = -2.85;
  const bubblesRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (bubblesRef.current) {
      bubblesRef.current.children.forEach((child, i) => {
        child.position.y += delta * 0.15 * (1 + i * 0.1);
        if (child.position.y > 1.15) child.position.y = 0.08;
      });
    }
  });
  const glowMult = isDark ? 2.5 : 1;
  return (
    <group position={[x, 0, wallZ]}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 1.2, 24]} />
        <meshStandardMaterial color={item.product.color} transparent opacity={isDark ? 0.6 : 0.45} roughness={0.1} metalness={0.2} emissive={isDark ? item.product.color : "#000000"} emissiveIntensity={isDark ? 0.4 : 0} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 1.18, 24]} />
        <meshStandardMaterial color={item.product.accentColor} transparent opacity={isDark ? 0.5 : 0.3} emissive={item.product.color} emissiveIntensity={0.6 * glowMult} roughness={0.05} />
      </mesh>
      <group ref={bubblesRef}>
        {[0.15, 0.35, 0.55, 0.75, 0.95].map((y, i) => (
          <mesh key={i} position={[Math.sin(i * 1.8) * 0.04, y, Math.cos(i * 1.8) * 0.04]}>
            <sphereGeometry args={[0.02 + (i % 2) * 0.01, 8, 8]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={isDark ? 0.9 : 0.7} emissive={item.product.accentColor} emissiveIntensity={0.8 * glowMult} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.06, 24]} />
        <meshStandardMaterial color="#374151" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.04, 24]} />
        <meshStandardMaterial color="#374151" roughness={0.4} metalness={0.3} />
      </mesh>
      <pointLight position={[0, 0.6, 0.15]} intensity={isDark ? 0.8 : 0.3} color={item.product.color} distance={isDark ? 3 : 1.5} />
    </group>
  );
}

function FiberOpticCurtain({ item, isDark = false }: { item: PlacedItem; isDark?: boolean }) {
  const x = item.position[0];
  const wallZ = -2.92;
  const strandsRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const glowMult = isDark ? 2.5 : 1;
  useFrame((_, delta) => {
    timeRef.current += delta;
    if (strandsRef.current) {
      strandsRef.current.children.forEach((child, i) => {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        const hue = ((timeRef.current * 0.15 + i * 0.05) % 1);
        mat.emissive.setHSL(hue, isDark ? 1.0 : 0.8, isDark ? 0.6 : 0.5);
        mat.emissiveIntensity = 0.9 * glowMult;
      });
    }
  });
  return (
    <group position={[x, 0, wallZ]}>
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[1.0, 0.06, 0.04]} />
        <meshStandardMaterial color="#1F2937" roughness={0.4} metalness={0.3} />
      </mesh>
      <group ref={strandsRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={i} position={[-0.45 + i * 0.047, 1.25, 0.01]}>
            <cylinderGeometry args={[0.004, 0.004, 2.4, 4]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={isDark ? 0.95 : 0.8} emissive={item.product.color} emissiveIntensity={0.9 * glowMult} />
          </mesh>
        ))}
      </group>
      <pointLight position={[0, 1.5, 0.2]} intensity={isDark ? 0.6 : 0.2} color={item.product.color} distance={isDark ? 4 : 2} />
    </group>
  );
}

function FloorProjector({ item, isDark = false }: { item: PlacedItem; isDark?: boolean }) {
  const x = item.position[0];
  const z = item.position[2];
  const projRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const glowMult = isDark ? 2.5 : 1;
  useFrame((_, delta) => {
    timeRef.current += delta;
    if (projRef.current) {
      const mat = projRef.current.material as THREE.MeshStandardMaterial;
      const hue = (timeRef.current * 0.1) % 1;
      mat.emissive.setHSL(hue, isDark ? 0.9 : 0.6, isDark ? 0.5 : 0.3);
      mat.emissiveIntensity = 0.5 * glowMult;
      mat.color.setHSL(hue, isDark ? 0.7 : 0.4, isDark ? 0.6 : 0.5);
    }
  });
  return (
    <group position={[x, 0, z]}>
      <mesh ref={projRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color={item.product.color} transparent opacity={isDark ? 0.7 : 0.4} emissive={item.product.color} emissiveIntensity={0.5 * glowMult} roughness={0.1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
        <ringGeometry args={[0.6, 0.62, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={isDark ? 0.6 : 0.3} emissive="#ffffff" emissiveIntensity={0.3 * glowMult} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
        <ringGeometry args={[0.3, 0.32, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={isDark ? 0.6 : 0.3} emissive="#ffffff" emissiveIntensity={0.3 * glowMult} />
      </mesh>
      <mesh position={[0, 2.9, 0]}>
        <boxGeometry args={[0.2, 0.08, 0.15]} />
        <meshStandardMaterial color="#1F2937" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 2.85, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 0.04, 8]} />
        <meshStandardMaterial color="#4B5563" roughness={0.3} metalness={0.5} />
      </mesh>
      <pointLight position={[0, 0.3, 0]} intensity={isDark ? 0.5 : 0} color={item.product.color} distance={isDark ? 3 : 0} />
    </group>
  );
}

function ClimbingWall({ item }: { item: PlacedItem }) {
  const wallX = 2.96;
  const z = item.position[2];
  const holdPositions = useMemo(() => {
    const holds: { x: number; y: number; z: number; color: string; size: number }[] = [];
    const colors = ["#EF4444", "#3B82F6", "#22C55E", "#F59E0B", "#8B5CF6", "#EC4899"];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 3; col++) {
        holds.push({
          x: -0.01,
          y: 0.4 + row * 0.45 + (col % 2) * 0.2,
          z: z - 0.3 + col * 0.3 + (row % 2) * 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 0.04 + Math.random() * 0.02,
        });
      }
    }
    return holds;
  }, [z]);

  return (
    <group position={[wallX, 0, 0]}>
      <mesh position={[-0.02, 1.3, z]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[1.2, 2.4, 0.06]} />
        <meshStandardMaterial color={item.product.color} roughness={0.9} />
      </mesh>
      {holdPositions.map((hold, i) => (
        <mesh key={i} position={[hold.x, hold.y, hold.z]} rotation={[0, -Math.PI / 2, 0]}>
          <dodecahedronGeometry args={[hold.size, 0]} />
          <meshStandardMaterial color={hold.color} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function ActivityPanel({ item }: { item: PlacedItem }) {
  const wallZ = -2.94;
  const x = item.position[0];
  return (
    <group position={[x, 0, wallZ]}>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.8, 0.7, 0.04]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.2, 0.021]}>
        <boxGeometry args={[0.76, 0.66, 0.005]} />
        <meshStandardMaterial color={item.product.color} roughness={0.4} />
      </mesh>
      <mesh position={[-0.2, 1.35, 0.03]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
        <meshStandardMaterial color="#EF4444" roughness={0.5} />
      </mesh>
      <mesh position={[0.15, 1.35, 0.03]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.08, 0.08, 0.03]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.5} />
      </mesh>
      <mesh position={[-0.1, 1.05, 0.03]}>
        <torusGeometry args={[0.05, 0.015, 8, 16]} />
        <meshStandardMaterial color="#22C55E" roughness={0.5} />
      </mesh>
      <mesh position={[0.2, 1.05, 0.03]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#8B5CF6" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.2, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 6]} />
        <meshStandardMaterial color={item.product.accentColor} transparent opacity={0.4} roughness={0.3} />
      </mesh>
    </group>
  );
}

function SoftPlayShapes({ item }: { item: PlacedItem }) {
  const x = item.position[0];
  const z = item.position[2];
  return (
    <group position={[x, 0, z]}>
      <mesh position={[-0.3, 0.12, 0]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.6, 0.06, 0.4]} />
        <meshStandardMaterial color={item.product.color} roughness={0.85} />
      </mesh>
      <mesh position={[-0.3, 0.15, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.56, 0.005, 0.36]} />
        <meshStandardMaterial color={item.product.accentColor} roughness={0.7} />
      </mesh>
      <mesh position={[0.15, 0.1, 0.15]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        <meshStandardMaterial color="#3B82F6" roughness={0.85} />
      </mesh>
      <mesh position={[0.15, 0.201, 0.15]}>
        <boxGeometry args={[0.26, 0.005, 0.26]} />
        <meshStandardMaterial color="#60A5FA" roughness={0.7} />
      </mesh>
      <mesh position={[0.2, 0.1, -0.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
        <meshStandardMaterial color="#22C55E" roughness={0.85} />
      </mesh>
      <mesh position={[-0.15, 0.08, -0.3]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.16, 6]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.85} />
      </mesh>
    </group>
  );
}

function LiquidTile({ item, isDark = false }: { item: PlacedItem; isDark?: boolean }) {
  const x = item.position[0];
  const z = item.position[2];
  const glowMult = isDark ? 2.5 : 1;
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.012, 0]} receiveShadow>
        <boxGeometry args={[0.5, 0.024, 0.5]} />
        <meshStandardMaterial color={item.product.color} transparent opacity={isDark ? 0.85 : 0.7} roughness={0.1} metalness={0.1} emissive={isDark ? item.product.color : "#000000"} emissiveIntensity={isDark ? 0.5 : 0} />
      </mesh>
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[0.46, 0.003, 0.46]} />
        <meshStandardMaterial color={item.product.accentColor} transparent opacity={isDark ? 0.8 : 0.5} emissive={item.product.color} emissiveIntensity={0.4 * glowMult} roughness={0.05} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.52, 0.008, 0.52]} />
        <meshStandardMaterial color="#374151" roughness={0.5} />
      </mesh>
      {isDark && <pointLight position={[0, 0.1, 0]} intensity={0.15} color={item.product.color} distance={1} />}
    </group>
  );
}

function BalanceBoard({ item }: { item: PlacedItem }) {
  const x = item.position[0];
  const z = item.position[2];
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.06, 0]} rotation={[0.05, 0, 0.03]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.04, 32]} />
        <meshStandardMaterial color={item.product.color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.06, 0]} rotation={[0.05, 0, 0.03]}>
        <cylinderGeometry args={[0.24, 0.24, 0.005, 32]} />
        <meshStandardMaterial color={item.product.accentColor} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.025, 0]}>
        <sphereGeometry args={[0.06, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={item.product.accentColor} roughness={0.6} />
      </mesh>
    </group>
  );
}

function SteppingStones({ item }: { item: PlacedItem }) {
  const x = item.position[0];
  const z = item.position[2];
  const stonePositions: [number, number, string][] = [
    [-0.22, -0.15, item.product.color],
    [0.1, 0.05, item.product.accentColor],
    [-0.05, 0.28, item.product.color],
    [0.25, -0.2, item.product.accentColor],
    [-0.2, 0.12, "#F59E0B"],
  ];
  return (
    <group position={[x, 0, z]}>
      {stonePositions.map(([sx, sz, col], i) => (
        <mesh key={i} position={[sx, 0.04, sz]} castShadow>
          <cylinderGeometry args={[0.08 + i * 0.01, 0.1 + i * 0.01, 0.08, 16]} />
          <meshStandardMaterial color={col} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function TrampolineMesh({ item }: { item: PlacedItem }) {
  const x = item.position[0];
  const z = item.position[2];
  const legAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.04, 32]} />
        <meshStandardMaterial color={item.product.color} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.221, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.005, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.34, 0.03, 8, 32]} />
        <meshStandardMaterial color={item.product.accentColor} roughness={0.6} />
      </mesh>
      {legAngles.map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.28, 0.1, Math.sin(angle) * 0.28]} castShadow>
          <cylinderGeometry args={[0.025, 0.03, 0.2, 8]} />
          <meshStandardMaterial color="#6B7280" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}
      <mesh position={[0.4, 0.45, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
        <meshStandardMaterial color="#9CA3AF" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0.4, 0.7, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#EF4444" roughness={0.5} />
      </mesh>
    </group>
  );
}

function WeightedVest({ item }: { item: PlacedItem }) {
  const x = item.position[0];
  const z = item.position[2];
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 1.0, 8]} />
        <meshStandardMaterial color="#9CA3AF" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.02]} />
        <meshStandardMaterial color="#9CA3AF" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.65, 0.01]} castShadow>
        <boxGeometry args={[0.35, 0.45, 0.06]} />
        <meshStandardMaterial color={item.product.color} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.65, 0.042]}>
        <boxGeometry args={[0.31, 0.41, 0.005]} />
        <meshStandardMaterial color={item.product.accentColor} roughness={0.7} />
      </mesh>
      {[-0.08, 0.08].map((yOff, i) => (
        <mesh key={i} position={[0, 0.65 + yOff, 0.045]}>
          <boxGeometry args={[0.25, 0.12, 0.005]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} opacity={0.3} transparent />
        </mesh>
      ))}
    </group>
  );
}

function SensorySock({ item }: { item: PlacedItem }) {
  const x = item.position[0];
  const z = item.position[2];
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
        <meshStandardMaterial color={item.product.color} transparent opacity={0.7} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <capsuleGeometry args={[0.12, 0.5, 8, 16]} />
        <meshStandardMaterial color={item.product.accentColor} transparent opacity={0.3} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <torusGeometry args={[0.15, 0.015, 8, 16]} />
        <meshStandardMaterial color={item.product.accentColor} roughness={0.5} />
      </mesh>
    </group>
  );
}

function WeightedBlanket({ item }: { item: PlacedItem }) {
  const x = item.position[0];
  const z = item.position[2];
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.12, 0.35]} />
        <meshStandardMaterial color={item.product.color} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.121, 0]}>
        <boxGeometry args={[0.48, 0.005, 0.33]} />
        <meshStandardMaterial color={item.product.accentColor} roughness={0.8} />
      </mesh>
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <mesh key={`${row}-${col}`} position={[-0.15 + col * 0.15, 0.125, -0.12 + row * 0.08]}>
            <boxGeometry args={[0.13, 0.008, 0.06]} />
            <meshStandardMaterial color={item.product.color} roughness={0.95} />
          </mesh>
        ))
      )}
    </group>
  );
}

function ProductMesh({ item, isDark }: { item: PlacedItem; isDark: boolean }) {
  switch (item.product.placement) {
    case "swing-bolster": return <SwingBolster item={item} />;
    case "swing-disc": return <SwingDisc item={item} />;
    case "swing-t": return <SwingT item={item} />;
    case "swing-platform": return <SwingPlatform item={item} />;
    case "mat-crash": return <MatCrash item={item} />;
    case "mat-tiles": return <MatTiles item={item} />;
    case "ball-round": return <BallRound item={item} />;
    case "ball-peanut": return <BallPeanut item={item} />;
    case "tube-bubble": return <BubbleTube item={item} isDark={isDark} />;
    case "tile-liquid": return <LiquidTile item={item} isDark={isDark} />;
    case "fiber-optic": return <FiberOpticCurtain item={item} isDark={isDark} />;
    case "floor-projector": return <FloorProjector item={item} isDark={isDark} />;
    case "board-balance": return <BalanceBoard item={item} />;
    case "stones-stepping": return <SteppingStones item={item} />;
    case "trampoline": return <TrampolineMesh item={item} />;
    case "climbing-wall": return <ClimbingWall item={item} />;
    case "soft-play-shapes": return <SoftPlayShapes item={item} />;
    case "activity-panel": return <ActivityPanel item={item} />;
    case "vest-weighted": return <WeightedVest item={item} />;
    case "sock-sensory": return <SensorySock item={item} />;
    case "blanket-weighted": return <WeightedBlanket item={item} />;
  }
}

function TherapyRoom({ settings }: { settings: RoomSettings }) {
  const floorConfig = FLOOR_TYPES.find(f => f.id === settings.floorType) || FLOOR_TYPES[0];
  const ledOn = settings.ledColor !== "#000000";
  const isDark = settings.roomMode === "dark";

  const effectiveWallColor = isDark ? "#1E1E2E" : settings.wallPadColor;

  const wallBaseColor = useMemo(() => {
    const c = new THREE.Color(effectiveWallColor);
    return "#" + c.clone().lerp(new THREE.Color(isDark ? "#2A2A3A" : "#ffffff"), 0.15).getHexString();
  }, [effectiveWallColor, isDark]);

  const padHighlight = useMemo(() => {
    const c = new THREE.Color(effectiveWallColor);
    return "#" + c.clone().lerp(new THREE.Color(isDark ? "#3A3A4A" : "#ffffff"), 0.25).getHexString();
  }, [effectiveWallColor, isDark]);

  const padShadow = useMemo(() => {
    const c = new THREE.Color(effectiveWallColor);
    return "#" + c.clone().lerp(new THREE.Color("#000000"), isDark ? 0.2 : 0.08).getHexString();
  }, [effectiveWallColor, isDark]);

  const darkFloorColor = isDark ? "#181820" : floorConfig.color;
  const darkFloorAccent = isDark ? "#222230" : floorConfig.accent;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color={darkFloorColor} roughness={isDark ? 0.8 : 0.6} metalness={isDark ? 0.1 : 0.05} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[5.8, 5.8]} />
        <meshStandardMaterial color={darkFloorAccent} roughness={0.8} transparent opacity={0.25} />
      </mesh>

      {settings.floorType === "wood" && (
        <>
          {[...Array(12)].map((_, i) => (
            <mesh key={`plank-x-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, -2.75 + i * 0.5]}>
              <planeGeometry args={[5.8, 0.008]} />
              <meshStandardMaterial color={isDark ? "#2A2A38" : "#A08968"} transparent opacity={isDark ? 0.3 : 0.5} />
            </mesh>
          ))}
          {[...Array(3)].map((_, i) => (
            <mesh key={`plank-z-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-1.9 + i * 1.9, 0.002, 0]}>
              <planeGeometry args={[0.005, 5.8]} />
              <meshStandardMaterial color={isDark ? "#2A2A38" : "#A08968"} transparent opacity={0.3} />
            </mesh>
          ))}
        </>
      )}

      {settings.floorType === "foam" && (
        <>
          {[...Array(4)].map((_, row) =>
            [...Array(4)].map((_, col) => {
              const lightColors = ["#7DD3FC", "#93C5FD", "#67E8F9", "#A5F3FC"];
              const darkColors = ["#1E293B", "#1A2332", "#1C2838", "#1E2D3F"];
              const colors = isDark ? darkColors : lightColors;
              return (
                <mesh key={`foam-${row}-${col}`} rotation={[-Math.PI / 2, 0, 0]} position={[-2.1 + col * 1.4, 0.003, -2.1 + row * 1.4]}>
                  <planeGeometry args={[1.35, 1.35]} />
                  <meshStandardMaterial color={colors[(row + col) % colors.length]} roughness={0.9} />
                </mesh>
              );
            })
          )}
        </>
      )}

      {settings.floorType === "rubber" && (
        <>
          {[...Array(6)].map((_, i) => (
            <mesh key={`rubber-dot-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-2 + i * 0.8, 0.003, -2 + i * 0.8]}>
              <circleGeometry args={[0.03, 8]} />
              <meshStandardMaterial color={isDark ? "#2A2A38" : "#5B6675"} />
            </mesh>
          ))}
        </>
      )}

      <mesh position={[0, 1.5, -3]} receiveShadow>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color={wallBaseColor} roughness={0.85} />
      </mesh>
      <mesh position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color={wallBaseColor} roughness={0.85} />
      </mesh>
      <mesh position={[3, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color={wallBaseColor} roughness={0.85} />
      </mesh>

      <group>
        <mesh position={[0, 0.05, -2.99]}>
          <boxGeometry args={[6, 0.10, 0.03]} />
          <meshStandardMaterial color={isDark ? "#2A2A38" : "#E8DDD0"} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.005, -2.99]}>
          <boxGeometry args={[6, 0.01, 0.035]} />
          <meshStandardMaterial color={isDark ? "#1A1A28" : "#D4C4B0"} roughness={0.6} />
        </mesh>
        <mesh position={[-2.99, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[6, 0.10, 0.03]} />
          <meshStandardMaterial color={isDark ? "#2A2A38" : "#E8DDD0"} roughness={0.5} />
        </mesh>
        <mesh position={[-2.99, 0.005, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[6, 0.01, 0.035]} />
          <meshStandardMaterial color={isDark ? "#1A1A28" : "#D4C4B0"} roughness={0.6} />
        </mesh>
        <mesh position={[2.99, 0.05, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[6, 0.10, 0.03]} />
          <meshStandardMaterial color={isDark ? "#2A2A38" : "#E8DDD0"} roughness={0.5} />
        </mesh>
        <mesh position={[2.99, 0.005, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[6, 0.01, 0.035]} />
          <meshStandardMaterial color={isDark ? "#1A1A28" : "#D4C4B0"} roughness={0.6} />
        </mesh>
      </group>

      <group position={[-3, 1.5, 0]}>
        <mesh position={[0.01, 0.3, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.2, 1.0]} />
          <meshStandardMaterial color={isDark ? "#1A2030" : "#E3EDF7"} roughness={0.2} metalness={isDark ? 0.2 : 0.05} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0.02, 0.3, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.24, 1.04, 0.03]} />
          <meshStandardMaterial color={isDark ? "#2A2A38" : "#CBD5E1"} roughness={0.4} />
        </mesh>
        <mesh position={[0.025, 0.3, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.2, 0.005, 0.04]} />
          <meshStandardMaterial color={isDark ? "#3A3A48" : "#94A3B8"} roughness={0.4} />
        </mesh>
        <mesh position={[0.025, 0.3, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.005, 1.0, 0.04]} />
          <meshStandardMaterial color={isDark ? "#3A3A48" : "#94A3B8"} roughness={0.4} />
        </mesh>
      </group>

      <group position={[3, 0, 1]}>
        <mesh position={[-0.01, 1.1, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[1.0, 2.2]} />
          <meshStandardMaterial color={isDark ? "#2A2030" : "#B8956A"} roughness={0.65} />
        </mesh>
        <mesh position={[-0.02, 1.1, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[1.04, 2.24, 0.03]} />
          <meshStandardMaterial color={isDark ? "#1A1828" : "#A07850"} roughness={0.55} />
        </mesh>
        <mesh position={[-0.03, 1.1, -0.35]} rotation={[0, -Math.PI / 2, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color={isDark ? "#8A7848" : "#D4A860"} roughness={0.25} metalness={0.7} />
        </mesh>
      </group>

      <group position={[0, 2.95, 0]}>
        <mesh>
          <boxGeometry args={[4, 0.06, 0.06]} />
          <meshStandardMaterial color={isDark ? "#3A3A48" : "#94A3B8"} roughness={0.3} metalness={0.6} />
        </mesh>
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <mesh key={`hook-${i}`} position={[x, -0.06, 0]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color={isDark ? "#4A4A58" : "#CBD5E1"} roughness={0.25} metalness={0.8} />
          </mesh>
        ))}
        <mesh position={[-2, 0.03, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color={isDark ? "#2A2A38" : "#64748B"} roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[2, 0.03, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color={isDark ? "#2A2A38" : "#64748B"} roughness={0.4} metalness={0.6} />
        </mesh>
      </group>

      <group>
        <mesh position={[0, 2.97, -2.98]}>
          <boxGeometry args={[5.8, 0.025, 0.025]} />
          <meshStandardMaterial
            color={ledOn ? settings.ledColor : "#E2E8F0"}
            emissive={ledOn ? settings.ledColor : "#FEF9EF"}
            emissiveIntensity={ledOn ? settings.ledIntensity * 2 : 0.15}
          />
        </mesh>
        <mesh position={[-2.98, 2.97, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[5.8, 0.025, 0.025]} />
          <meshStandardMaterial
            color={ledOn ? settings.ledColor : "#E2E8F0"}
            emissive={ledOn ? settings.ledColor : "#FEF9EF"}
            emissiveIntensity={ledOn ? settings.ledIntensity * 2 : 0.15}
          />
        </mesh>
        <mesh position={[2.98, 2.97, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[5.8, 0.025, 0.025]} />
          <meshStandardMaterial
            color={ledOn ? settings.ledColor : "#E2E8F0"}
            emissive={ledOn ? settings.ledColor : "#FEF9EF"}
            emissiveIntensity={ledOn ? settings.ledIntensity * 2 : 0.15}
          />
        </mesh>
        {ledOn && (
          <>
            <pointLight position={[0, 2.8, -2.5]} intensity={settings.ledIntensity * 0.4} color={settings.ledColor} distance={5} />
            <pointLight position={[-2.5, 2.8, 0]} intensity={settings.ledIntensity * 0.3} color={settings.ledColor} distance={4} />
            <pointLight position={[2.5, 2.8, 0]} intensity={settings.ledIntensity * 0.3} color={settings.ledColor} distance={4} />
          </>
        )}
      </group>

      {[-2.5, -1.25, 0, 1.25, 2.5].map((x, i) => (
        <group key={`padpanel-${i}`}>
          <mesh position={[x, 0.6, -2.97]}>
            <boxGeometry args={[1.18, 1.12, 0.06]} />
            <meshStandardMaterial color={padShadow} roughness={0.92} />
          </mesh>
          <mesh position={[x, 0.6, -2.94]}>
            <boxGeometry args={[1.12, 1.06, 0.02]} />
            <meshStandardMaterial color={settings.wallPadColor} roughness={0.88} />
          </mesh>
          <mesh position={[x, 0.6, -2.929]}>
            <boxGeometry args={[1.06, 1.0, 0.005]} />
            <meshStandardMaterial color={padHighlight} roughness={0.85} />
          </mesh>
          {[-0.35, 0, 0.35].map((yOff, j) => (
            <mesh key={j} position={[x, 0.6 + yOff, -2.926]}>
              <boxGeometry args={[1.0, 0.008, 0.005]} />
              <meshStandardMaterial color={padShadow} transparent opacity={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 3.0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color={isDark ? "#0E0E18" : "#FAFAF9"} roughness={0.9} />
      </mesh>

      <mesh position={[0, 2.98, -2.98]}>
        <boxGeometry args={[5.9, 0.04, 0.04]} />
        <meshStandardMaterial color={isDark ? "#1A1A28" : "#E8E5E0"} roughness={0.6} />
      </mesh>
      <mesh position={[-2.98, 2.98, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[5.9, 0.04, 0.04]} />
        <meshStandardMaterial color={isDark ? "#1A1A28" : "#E8E5E0"} roughness={0.6} />
      </mesh>
      <mesh position={[2.98, 2.98, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[5.9, 0.04, 0.04]} />
        <meshStandardMaterial color={isDark ? "#1A1A28" : "#E8E5E0"} roughness={0.6} />
      </mesh>
    </group>
  );
}

function ZoomController({ controlsRef, zoomRef }: { controlsRef: React.RefObject<any>; zoomRef: React.MutableRefObject<((d: number) => void) | null> }) {
  const { camera } = useThree();
  zoomRef.current = useCallback((direction: number) => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    const target = controls.target as THREE.Vector3;
    const offset = new THREE.Vector3().subVectors(camera.position, target);
    const factor = direction > 0 ? 0.8 : 1.25;
    const newLen = offset.length() * factor;
    const clamped = Math.max(controls.minDistance, Math.min(controls.maxDistance, newLen));
    offset.normalize().multiplyScalar(clamped);
    camera.position.copy(target).add(offset);
    camera.updateProjectionMatrix();
    controls.update();
  }, [camera, controlsRef]);
  return null;
}

function Scene({ placedItems, controlsRef, zoomRef, settings }: { placedItems: PlacedItem[]; controlsRef: React.RefObject<any>; zoomRef: React.MutableRefObject<((d: number) => void) | null>; settings: RoomSettings }) {
  const isDark = settings.roomMode === "dark";
  return (
    <>
      <ambientLight intensity={isDark ? 0.08 : 0.6} color={isDark ? "#4A4A6A" : "#FFF8F0"} />
      <directionalLight position={[5, 8, 5]} intensity={isDark ? 0.15 : 1.0} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} color={isDark ? "#6A6A8A" : "#FFF5E6"} />
      <pointLight position={[-2, 2.5, -1]} intensity={isDark ? 0.08 : 0.5} color={isDark ? "#8888AA" : "#FEF3C7"} />
      <pointLight position={[1, 2.5, 1]} intensity={isDark ? 0.08 : 0.4} color={isDark ? "#8888AA" : "#E0F2FE"} />
      <pointLight position={[0, 1.0, 2]} intensity={isDark ? 0.05 : 0.2} color={isDark ? "#6A6A8A" : "#FDE68A"} />
      <hemisphereLight args={[isDark ? "#1A1A2E" : "#EFF6FF", isDark ? "#0A0A14" : "#C4A882", isDark ? 0.1 : 0.4]} />
      <TherapyRoom settings={settings} />
      {placedItems.map((item) => (
        <ProductMesh key={item.instanceId} item={item} isDark={isDark} />
      ))}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableZoom={false}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={2.5}
        maxDistance={9}
        target={[0, 0.8, 0]}
        enableDamping
        dampingFactor={0.08}
      />
      <ZoomController controlsRef={controlsRef} zoomRef={zoomRef} />
    </>
  );
}

function WelcomeOverlay({ onDismiss, onTemplate }: { onDismiss: () => void; onTemplate: (t: RoomTemplate) => void }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-sm" data-testid="welcome-overlay">
      <div className="bg-background rounded-3xl border border-border/50 shadow-2xl p-6 sm:p-8 max-w-lg mx-4 text-center max-h-[90vh] overflow-y-auto">
        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Lightbulb className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">Design Your Sensory Room</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Start from scratch or choose a pre-designed template:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6" data-testid="template-grid">
          {roomTemplates.map((t) => (
            <button
              key={t.id}
              onClick={() => onTemplate(t)}
              className="text-left p-3 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              data-testid={`template-${t.id}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <p className="text-xs font-semibold text-foreground truncate">{t.name}</p>
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight line-clamp-2">{t.description}</p>
              <p className="text-[10px] text-primary mt-1 font-medium">{t.items.length} items</p>
            </button>
          ))}
        </div>

        <div className="space-y-4 text-left mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">Or build from scratch</p>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">1</span>
            <p className="text-xs text-foreground"><span className="font-semibold">Browse products</span> in the sidebar and tap <Plus className="w-3 h-3 inline" /> to add them.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">2</span>
            <p className="text-xs text-foreground"><span className="font-semibold">Customize the room</span> — change wall colors, floor type and LED mood lighting.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">3</span>
            <p className="text-xs text-foreground"><span className="font-semibold">Review &amp; order</span> — check the total cost, then buy or request a quote.</p>
          </div>
        </div>
        <Button onClick={onDismiss} size="lg" className="rounded-full w-full gap-2 shadow-lg shadow-primary/20" data-testid="button-start-building">
          Start Empty Room
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function RoomCustomizePanel({ settings, onChange, isOpen, onClose }: { settings: RoomSettings; onChange: (s: RoomSettings) => void; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-background/95 backdrop-blur-sm rounded-xl border border-border/50 p-3 sm:p-4 shadow-lg w-[calc(100%-1rem)] sm:w-64 max-h-[60vh] overflow-y-auto" data-testid="customize-panel">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-foreground">Room Settings</h3>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted/50 transition-colors" data-testid="button-close-customize">
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Room Mode</p>
        <div className="flex gap-1.5">
          <Button
            variant={settings.roomMode === "light" ? "default" : "outline"}
            size="sm"
            className="flex-1 gap-1.5"
            onClick={() => onChange({ ...settings, roomMode: "light" })}
            data-testid="room-mode-light"
          >
            <Sun className="w-3.5 h-3.5" />
            Light
          </Button>
          <Button
            variant={settings.roomMode === "dark" ? "default" : "outline"}
            size="sm"
            className="flex-1 gap-1.5"
            onClick={() => onChange({ ...settings, roomMode: "dark" })}
            data-testid="room-mode-dark"
          >
            <Moon className="w-3.5 h-3.5" />
            Dark
          </Button>
        </div>
        {settings.roomMode === "dark" && (
          <p className="text-[10px] text-muted-foreground mt-1.5 leading-tight">Glowing products like bubble tubes, fiber optics, projectors and liquid tiles are best viewed in dark mode</p>
        )}
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">LED Mood Lighting</p>
        <div className="grid grid-cols-4 gap-1.5">
          {LED_COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => onChange({ ...settings, ledColor: c.value })}
              className={`w-full aspect-square rounded-lg border-2 transition-all ${settings.ledColor === c.value ? "border-primary scale-110" : "border-border/30 hover:border-border"}`}
              style={{ backgroundColor: c.value === "#000000" ? "#1F2937" : c.value }}
              title={c.name}
              data-testid={`led-${c.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              {c.value === "#000000" && <X className="w-3 h-3 mx-auto text-gray-400" />}
            </button>
          ))}
        </div>
        {settings.ledColor !== "#000000" && (
          <div className="mt-2">
            <p className="text-[10px] text-muted-foreground mb-1">Intensity</p>
            <input
              type="range"
              min="0.2"
              max="1"
              step="0.1"
              value={settings.ledIntensity}
              onChange={(e) => onChange({ ...settings, ledIntensity: parseFloat(e.target.value) })}
              className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-primary"
              data-testid="slider-led-intensity"
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Wall Padding</p>
        <div className="grid grid-cols-3 gap-1.5">
          {WALL_COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => onChange({ ...settings, wallPadColor: c.value })}
              className={`w-full aspect-square rounded-lg border-2 transition-all ${settings.wallPadColor === c.value ? "border-primary scale-110" : "border-border/30 hover:border-border"}`}
              style={{ backgroundColor: c.value }}
              title={c.name}
              data-testid={`wall-${c.name.toLowerCase().replace(/\s/g, "-")}`}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">Floor Type</p>
        <div className="space-y-1.5">
          {FLOOR_TYPES.map((f) => (
            <button
              key={f.id}
              onClick={() => onChange({ ...settings, floorType: f.id })}
              className={`w-full flex items-center gap-2 p-2 rounded-lg border transition-all text-left ${settings.floorType === f.id ? "border-primary bg-primary/5" : "border-border/30 hover:border-border"}`}
              data-testid={`floor-${f.id}`}
            >
              <div className="w-6 h-6 rounded-md flex-shrink-0" style={{ backgroundColor: f.color }} />
              <span className="text-xs font-medium text-foreground">{f.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border/30">
        <p className="text-[10px] text-muted-foreground text-center">Room size: 6m x 6m x 3m</p>
      </div>
    </div>
  );
}

export default function SensoryRoomBuilder() {
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showWelcome, setShowWelcome] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [roomSettings, setRoomSettings] = useState<RoomSettings>({
    ledColor: "#FEF3C7",
    ledIntensity: 0.6,
    wallPadColor: "#F8F6F3",
    floorType: "wood",
    roomMode: "light",
  });
  const { addToCart } = useShoppingCart();
  const controlsRef = useRef<any>(null);
  const zoomRef = useRef<((d: number) => void) | null>(null);

  const addProductToRoom = (product: RoomProduct) => {
    const isSwing = product.placement.startsWith("swing-");
    const isBubbleTube = product.placement === "tube-bubble";
    const isFiberOptic = product.placement === "fiber-optic";
    const isClimbing = product.placement === "climbing-wall";
    const isActivityPanel = product.placement === "activity-panel";
    const isFloorProjector = product.placement === "floor-projector";

    let x: number, z: number;
    if (isSwing) {
      x = -1.0 + Math.random() * 2.0;
      z = -0.5 + Math.random() * 1.0;
    } else if (isBubbleTube || isFiberOptic) {
      x = -2.0 + Math.random() * 4.0;
      z = 0;
    } else if (isClimbing) {
      x = 0;
      z = -1.0 + Math.random() * 2.0;
    } else if (isActivityPanel) {
      x = -2.0 + Math.random() * 4.0;
      z = 0;
    } else if (isFloorProjector) {
      x = -1.0 + Math.random() * 2.0;
      z = -1.0 + Math.random() * 2.0;
    } else {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 1.5;
      x = Math.cos(angle) * radius;
      z = Math.sin(angle) * radius;
    }

    setPlacedItems((prev) => [
      ...prev,
      { instanceId: `${product.id}-${Date.now()}`, product, position: [x, 0, z] },
    ]);
    if (showWelcome) setShowWelcome(false);
  };

  const loadTemplate = (template: RoomTemplate) => {
    const items: PlacedItem[] = [];
    template.items.forEach((productId) => {
      const product = roomProducts.find(p => p.id === productId);
      if (!product) return;
      const isSwing = product.placement.startsWith("swing-");
      const isBubbleTube = product.placement === "tube-bubble";
      const isFiberOptic = product.placement === "fiber-optic";
      const isClimbing = product.placement === "climbing-wall";
      const isActivityPanel = product.placement === "activity-panel";
      const isFloorProjector = product.placement === "floor-projector";

      let x: number, z: number;
      if (isSwing) {
        x = -1.0 + Math.random() * 2.0;
        z = -0.5 + Math.random() * 1.0;
      } else if (isBubbleTube || isFiberOptic) {
        x = -2.0 + Math.random() * 4.0;
        z = 0;
      } else if (isClimbing) {
        x = 0;
        z = -0.5 + Math.random() * 1.0;
      } else if (isActivityPanel) {
        x = -1.5 + Math.random() * 3.0;
        z = 0;
      } else if (isFloorProjector) {
        x = -0.5 + Math.random() * 1.0;
        z = -0.5 + Math.random() * 1.0;
      } else {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.5 + Math.random() * 1.5;
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
      }
      items.push({ instanceId: `${product.id}-${Date.now()}-${Math.random()}`, product, position: [x, 0, z] });
    });
    setPlacedItems(items);
    if (template.settings) {
      setRoomSettings(prev => ({ ...prev, ...template.settings }));
    }
    setShowWelcome(false);
  };

  const removeItem = (instanceId: string) => {
    setPlacedItems((prev) => prev.filter((i) => i.instanceId !== instanceId));
  };

  const clearRoom = () => {
    setPlacedItems([]);
    setRoomSettings({ ledColor: "#FEF3C7", ledIntensity: 0.6, wallPadColor: "#F8F6F3", floorType: "wood", roomMode: "light" });
  };

  const totalCost = placedItems.reduce((sum, item) => sum + item.product.price, 0);

  const uniqueCategories = ["All", ...new Set(roomProducts.map((p) => p.category))];
  const filteredProducts = selectedCategory === "All" ? roomProducts : roomProducts.filter((p) => p.category === selectedCategory);

  const groupedProducts = filteredProducts.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, RoomProduct[]>);

  const handleBuySetup = () => {
    const grouped = new Map<string, { product: RoomProduct; count: number }>();
    for (const item of placedItems) {
      const existing = grouped.get(item.product.id);
      if (existing) existing.count++;
      else grouped.set(item.product.id, { product: item.product, count: 1 });
    }
    for (const [, { product, count }] of grouped) {
      for (let i = 0; i < count; i++) {
        addToCart({ productId: product.id, productName: product.name, category: product.category, unitPrice: product.price, config: { addons: [] }, image: product.image });
      }
    }
  };

  const handleZoom = (direction: number) => {
    if (zoomRef.current) zoomRef.current(direction);
  };

  const itemCounts = placedItems.reduce((acc, item) => {
    acc[item.product.id] = (acc[item.product.id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row pt-[6.5rem] lg:pt-[6.5rem]">
        <aside className="w-full lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-border/50 bg-card/50 flex flex-col" data-testid="sidebar-products">
          <div className="p-3 sm:p-4 lg:p-5 border-b border-border/30">
            <h2 className="text-base sm:text-lg font-bold text-foreground mb-0.5 sm:mb-1" data-testid="heading-product-catalog">Product Catalog</h2>
            <p className="text-xs text-muted-foreground">Tap a product to add it to your therapy room</p>
          </div>

          <div className="px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 border-b border-border/30 overflow-x-auto">
            <div className="flex gap-1.5 min-w-max">
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all whitespace-nowrap min-h-[32px] ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted"}`}
                  data-testid={`filter-${cat.toLowerCase().replace(/[\s&]+/g, "-")}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[240px] sm:max-h-[280px] lg:max-h-none">
            {selectedCategory === "All" ? (
              Object.entries(groupedProducts).map(([category, products]) => (
                <div key={category} className="border-b border-border/20 last:border-b-0">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                    className="w-full flex items-center justify-between px-4 lg:px-5 py-3 text-left hover:bg-muted/30 transition-colors"
                    data-testid={`toggle-category-${category.toLowerCase().replace(/[\s&]+/g, "-")}`}
                  >
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground/60">{products.length}</span>
                      {expandedCategory === category ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                    </div>
                  </button>
                  {(expandedCategory === category || expandedCategory === null) && (
                    <div className="px-3 lg:px-4 pb-3 space-y-2">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} count={itemCounts[product.id] || 0} onAdd={() => addProductToRoom(product)} />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-3 lg:p-4 space-y-2">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} count={itemCounts[product.id] || 0} onAdd={() => addProductToRoom(product)} />
                ))}
              </div>
            )}
          </div>
        </aside>

        <div className="flex-1 relative flex flex-col">
          {showWelcome && placedItems.length === 0 && (
            <WelcomeOverlay onDismiss={() => setShowWelcome(false)} onTemplate={loadTemplate} />
          )}

          <RoomCustomizePanel settings={roomSettings} onChange={setRoomSettings} isOpen={showCustomize} onClose={() => setShowCustomize(false)} />

          {!showCustomize && placedItems.length > 0 && (
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-background/90 backdrop-blur-sm rounded-xl border border-border/50 p-2.5 sm:p-3 shadow-sm max-h-[180px] sm:max-h-[240px] overflow-y-auto w-48 sm:w-60" data-testid="placed-items-list">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                In Room ({placedItems.length})
              </p>
              <div className="space-y-1.5">
                {Object.entries(
                  placedItems.reduce((acc, item) => {
                    if (!acc[item.product.id]) acc[item.product.id] = { product: item.product, items: [] };
                    acc[item.product.id].items.push(item);
                    return acc;
                  }, {} as Record<string, { product: RoomProduct; items: PlacedItem[] }>)
                ).map(([productId, { product, items }]) => (
                  <div key={productId} className="flex items-center gap-2">
                    <img src={product.image} alt={product.name} className="w-7 h-7 rounded object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-foreground truncate block">{product.name}</span>
                      <span className="text-[10px] text-muted-foreground">{items.length > 1 ? `x${items.length}` : formatPrice(product.price)}</span>
                    </div>
                    <button onClick={() => removeItem(items[items.length - 1].instanceId)} className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 p-0.5" data-testid={`remove-room-item-${productId}`}>
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 flex flex-wrap justify-end gap-1.5 sm:gap-2 max-w-[calc(100%-1rem)]">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-1 sm:gap-1.5 bg-background/90 backdrop-blur-sm shadow-sm text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3"
              onClick={() => setRoomSettings(prev => ({ ...prev, roomMode: prev.roomMode === "light" ? "dark" : "light" }))}
              data-testid="button-toggle-room-mode"
            >
              {roomSettings.roomMode === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{roomSettings.roomMode === "light" ? "Dark" : "Light"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-1 sm:gap-1.5 bg-background/90 backdrop-blur-sm shadow-sm text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3"
              onClick={() => setShowCustomize(!showCustomize)}
              data-testid="button-customize-room"
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Customize</span>
            </Button>
            {placedItems.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-1 sm:gap-1.5 bg-background/90 backdrop-blur-sm shadow-sm text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3"
                onClick={clearRoom}
                data-testid="button-clear-room"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            )}
          </div>

          <div className="absolute bottom-20 sm:bottom-24 right-2 sm:right-3 z-10 flex flex-col gap-1.5" data-testid="zoom-controls">
            <button onClick={() => handleZoom(1)} className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-background/90 backdrop-blur-sm border border-border/50 shadow-sm flex items-center justify-center hover:bg-background transition-colors" data-testid="button-zoom-in">
              <ZoomIn className="w-4 h-4 text-foreground" />
            </button>
            <button onClick={() => handleZoom(-1)} className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-background/90 backdrop-blur-sm border border-border/50 shadow-sm flex items-center justify-center hover:bg-background transition-colors" data-testid="button-zoom-out">
              <ZoomOut className="w-4 h-4 text-foreground" />
            </button>
          </div>

          {placedItems.length === 0 && !showWelcome && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none" data-testid="empty-room-hint">
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl border border-border/30 px-6 py-5 shadow-sm">
                <Hand className="w-8 h-8 text-primary/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground font-medium">Select a product from the sidebar</p>
                <p className="text-xs text-muted-foreground/60 mt-1">or use Customize to set up the room environment</p>
              </div>
            </div>
          )}

          <div className="flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-0">
            <Canvas shadows camera={{ position: [4.5, 3.5, 4.5], fov: 45 }} style={{ background: roomSettings.roomMode === "dark" ? "linear-gradient(180deg, #0A0A14 0%, #0E0E1C 40%, #121220 100%)" : "linear-gradient(180deg, #F0F4FA 0%, #E8EDF5 40%, #F5EDE3 100%)" }} data-testid="canvas-3d">
              <Suspense fallback={null}>
                <Scene placedItems={placedItems} controlsRef={controlsRef} zoomRef={zoomRef} settings={roomSettings} />
              </Suspense>
            </Canvas>
          </div>

          <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl px-3 sm:px-4 lg:px-6 py-3 sm:py-4" data-testid="room-summary-bar">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
              <div className="min-w-0">
                {placedItems.length === 0 ? (
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Browse the catalog and tap products to build your therapy room
                  </p>
                ) : (
                  <>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {placedItems.length} item{placedItems.length > 1 ? "s" : ""} in your setup
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">{formatPrice(totalCost)}</p>
                  </>
                )}
              </div>
              {placedItems.length > 0 && (
                <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                  <Link href="/enquiry" className="flex-1 sm:flex-initial">
                    <Button variant="outline" size="default" className="rounded-full gap-1.5 sm:gap-2 w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-11" data-testid="button-quote-setup">
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Get Quote
                    </Button>
                  </Link>
                  <Button size="default" className="rounded-full gap-1.5 sm:gap-2 shadow-lg shadow-primary/20 flex-1 sm:flex-initial text-xs sm:text-sm h-9 sm:h-11" onClick={handleBuySetup} data-testid="button-buy-setup">
                    <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Buy Setup
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, count, onAdd }: { product: RoomProduct; count: number; onAdd: () => void }) {
  return (
    <button
      onClick={onAdd}
      className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-background border border-border/50 hover:border-primary/20 hover:shadow-md transition-all text-left group"
      data-testid={`room-product-${product.id}`}
    >
      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-border/30">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
        <p className="text-xs text-muted-foreground truncate">{product.description}</p>
        <p className="text-xs font-medium text-primary mt-0.5">{formatPrice(product.price)}</p>
      </div>
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <div className="w-7 h-7 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-colors">
          <Plus className="w-3.5 h-3.5 text-primary group-hover:text-primary-foreground" />
        </div>
        {count > 0 && <span className="text-[10px] font-bold text-primary">x{count}</span>}
      </div>
    </button>
  );
}
