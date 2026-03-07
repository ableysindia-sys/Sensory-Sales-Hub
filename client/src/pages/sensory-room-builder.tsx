import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
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
  X,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { Link } from "wouter";
import * as THREE from "three";

interface RoomProduct {
  id: string;
  name: string;
  price: number;
  shape: "cylinder" | "box" | "sphere" | "tallCylinder" | "flatBox";
  color: string;
  category: string;
  image: string;
  description: string;
}

interface PlacedItem {
  instanceId: string;
  product: RoomProduct;
  position: [number, number, number];
}

const roomProducts: RoomProduct[] = [
  { id: "bolster-swing", name: "Bolster Swing", price: 4500, shape: "cylinder", color: "#4A53A0", category: "Swings", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_1_a43ed9ee-1c32-4081-9b0c-9e423b5538a8.jpg?v=1766662698", description: "Vestibular therapy swing" },
  { id: "disc-swing", name: "Disc Swing", price: 3200, shape: "cylinder", color: "#0EA5E9", category: "Swings", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_2.jpg?v=1764648162", description: "Rotational vestibular input" },
  { id: "t-swing", name: "T Swing", price: 3800, shape: "cylinder", color: "#1E40AF", category: "Swings", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_10.jpg?v=1768027428", description: "Bilateral coordination" },
  { id: "platform-swing", name: "Platform Swing", price: 6800, shape: "box", color: "#D4A574", category: "Swings", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-187ol789l_dd7b9170-2401-4fe7-84f8-db80f45bde8f.jpg?v=1763019394", description: "Multi-position therapy" },
  { id: "crash-mat", name: "Crash Mat", price: 7500, shape: "box", color: "#166534", category: "Mats", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-687l799p_5517468c-2f14-472f-8e25-040031e57d66.jpg?v=1763022357", description: "Safe landing surface" },
  { id: "interlocking-mat", name: "Interlocking Mat", price: 450, shape: "flatBox", color: "#3B82F6", category: "Mats", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-TYJKYKYU_9daeb4cf-edf8-4795-83ab-aa23924ccf73.jpg?v=1763019822", description: "Modular floor tiles" },
  { id: "gym-ball", name: "Gym Ball", price: 1200, shape: "sphere", color: "#EF4444", category: "Therapy Balls", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9720_56aab3dd-f27f-4cdc-ad81-285fd115f7a0.jpg?v=1764648162", description: "Core strengthening" },
  { id: "peanut-ball", name: "Peanut Ball", price: 2800, shape: "sphere", color: "#F59E0B", category: "Therapy Balls", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_dc914207-e215-477d-8898-663d14b1d459.jpg?v=1763974508", description: "Prone therapy" },
  { id: "bubble-tube", name: "Bubble Tube", price: 8500, shape: "tallCylinder", color: "#7C3AED", category: "Visual & Sensory", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_f169ba89-3192-47c3-8f27-6c3f543bfd72.jpg?v=1770267207", description: "Visual calming" },
  { id: "liquid-tiles", name: "Liquid Motion Tiles", price: 3500, shape: "flatBox", color: "#06B6D4", category: "Visual & Sensory", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_1_3e4be01c-4d7f-41c5-9bd0-13d6118b2490.jpg?v=1770267810", description: "Pressure-responsive floor" },
  { id: "balance-board", name: "Balance Board", price: 2800, shape: "cylinder", color: "#D4A574", category: "Movement", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9796_bd82fe01-e81e-4d39-a553-b1222ef7f681.jpg?v=1764648264", description: "Stability training" },
  { id: "stepping-stone", name: "Stepping Stones", price: 2200, shape: "cylinder", color: "#22C55E", category: "Movement", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-26at5.11.10PM.jpg?v=1766749713", description: "Motor planning paths" },
  { id: "trampoline", name: "Trampoline", price: 6500, shape: "cylinder", color: "#1F2937", category: "Movement", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_3_4.jpg?v=1767097014", description: "Vestibular bouncing" },
  { id: "weighted-vest", name: "Weighted Vest", price: 3200, shape: "box", color: "#1E3A5F", category: "Deep Pressure", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_98o8p098o8p098o8_1.png?v=1764648068", description: "Proprioceptive calming" },
  { id: "sensory-sock", name: "Sensory Sock", price: 1800, shape: "tallCylinder", color: "#3B82F6", category: "Deep Pressure", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-blue-girl-therapeutic-badge-recommended_5da5095a-704b-46da-9ece-93365e69d3f4.jpg?v=1764647672", description: "Full-body compression" },
  { id: "weighted-blanket", name: "Weighted Blanket", price: 4500, shape: "flatBox", color: "#9CA3AF", category: "Deep Pressure", image: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/cozykids-weighted-blanket-for-kids-folded-grey-quilted-therapeutic-badge_2fca9568-55a4-4dec-85db-979060d4cb1c.jpg?v=1764648068", description: "Deep pressure therapy" },
];

function ProductMesh({ item, onRemove }: { item: PlacedItem; onRemove: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current && item.product.shape === "tallCylinder") {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  const getGeometry = () => {
    switch (item.product.shape) {
      case "cylinder":
        return <cylinderGeometry args={[0.3, 0.3, 0.15, 32]} />;
      case "box":
        return <boxGeometry args={[0.8, 0.12, 0.6]} />;
      case "sphere":
        return <sphereGeometry args={[0.25, 32, 32]} />;
      case "tallCylinder":
        return <cylinderGeometry args={[0.08, 0.08, 1.2, 16]} />;
      case "flatBox":
        return <boxGeometry args={[0.6, 0.04, 0.6]} />;
    }
  };

  const getYOffset = () => {
    switch (item.product.shape) {
      case "cylinder": return 0.075;
      case "box": return 0.06;
      case "sphere": return 0.25;
      case "tallCylinder": return 0.6;
      case "flatBox": return 0.02;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={[item.position[0], getYOffset(), item.position[2]]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      {getGeometry()}
      <meshStandardMaterial
        color={hovered ? "#ffffff" : item.product.color}
        emissive={hovered ? item.product.color : "#000000"}
        emissiveIntensity={hovered ? 0.4 : 0}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

function TherapyRoom() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#d4c8b8" roughness={0.7} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[5.8, 5.8]} />
        <meshStandardMaterial color="#c9bfb0" roughness={0.9} transparent opacity={0.3} />
      </mesh>

      {[...Array(6)].map((_, i) => (
        <mesh key={`floorline-x-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, -2.5 + i]}>
          <planeGeometry args={[5.8, 0.01]} />
          <meshStandardMaterial color="#b8ae9e" />
        </mesh>
      ))}
      {[...Array(6)].map((_, i) => (
        <mesh key={`floorline-z-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-2.5 + i, 0.002, 0]}>
          <planeGeometry args={[0.01, 5.8]} />
          <meshStandardMaterial color="#b8ae9e" />
        </mesh>
      ))}

      <mesh position={[0, 1.5, -3]} receiveShadow>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#f0ebe5" roughness={0.95} />
      </mesh>

      <mesh position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#ede8e2" roughness={0.95} />
      </mesh>

      <mesh position={[3, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#ede8e2" roughness={0.95} />
      </mesh>

      <group>
        <mesh position={[0, 0.06, -2.99]}>
          <boxGeometry args={[6, 0.12, 0.02]} />
          <meshStandardMaterial color="#8B7355" roughness={0.6} />
        </mesh>
        <mesh position={[-2.99, 0.06, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[6, 0.12, 0.02]} />
          <meshStandardMaterial color="#8B7355" roughness={0.6} />
        </mesh>
        <mesh position={[2.99, 0.06, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[6, 0.12, 0.02]} />
          <meshStandardMaterial color="#8B7355" roughness={0.6} />
        </mesh>
      </group>

      <group position={[-3, 1.5, 0]}>
        <mesh position={[0.01, 0.3, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.2, 1.0]} />
          <meshStandardMaterial color="#d6e8f5" roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[0.02, 0.3, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.24, 1.04, 0.03]} />
          <meshStandardMaterial color="#9CA3AF" roughness={0.5} />
        </mesh>
        <mesh position={[0.025, 0.3, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.2, 0.005, 0.04]} />
          <meshStandardMaterial color="#7f8a96" roughness={0.5} />
        </mesh>
        <mesh position={[0.025, 0.3, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.005, 1.0, 0.04]} />
          <meshStandardMaterial color="#7f8a96" roughness={0.5} />
        </mesh>
      </group>

      <group position={[3, 0, 1]}>
        <mesh position={[-0.01, 1.1, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[1.0, 2.2]} />
          <meshStandardMaterial color="#a08060" roughness={0.7} />
        </mesh>
        <mesh position={[-0.02, 1.1, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[1.04, 2.24, 0.03]} />
          <meshStandardMaterial color="#8B7355" roughness={0.6} />
        </mesh>
        <mesh position={[-0.03, 1.1, -0.35]} rotation={[0, -Math.PI / 2, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#C0A060" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>

      <group position={[0, 2.95, 0]}>
        <mesh>
          <boxGeometry args={[4, 0.06, 0.06]} />
          <meshStandardMaterial color="#6B7280" roughness={0.4} metalness={0.5} />
        </mesh>
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <mesh key={`hook-${i}`} position={[x, -0.06, 0]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#9CA3AF" roughness={0.3} metalness={0.7} />
          </mesh>
        ))}
        <mesh position={[-2, 0.03, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color="#4B5563" roughness={0.5} metalness={0.5} />
        </mesh>
        <mesh position={[2, 0.03, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color="#4B5563" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>

      {[-2.5, -1.25, 0, 1.25, 2.5].map((x, i) => (
        <group key={`padpanel-${i}`}>
          <mesh position={[x, 0.6, -2.98]}>
            <boxGeometry args={[1.2, 1.15, 0.04]} />
            <meshStandardMaterial color="#e8e2d8" roughness={0.95} />
          </mesh>
          <mesh position={[x, 0.6, -2.96]}>
            <boxGeometry args={[1.16, 1.11, 0.01]} />
            <meshStandardMaterial color="#f0ebe5" roughness={0.98} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Scene({ placedItems, onRemoveItem }: { placedItems: PlacedItem[]; onRemoveItem: (id: string) => void }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.9}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-2, 2.5, -1]} intensity={0.4} color="#fef3c7" />
      <pointLight position={[1, 2.5, 1]} intensity={0.3} color="#f0f4ff" />
      <hemisphereLight args={["#f0f4ff", "#d4c8b8", 0.3]} />
      <TherapyRoom />
      {placedItems.map((item) => (
        <ProductMesh key={item.instanceId} item={item} onRemove={() => onRemoveItem(item.instanceId)} />
      ))}
      <OrbitControls
        makeDefault
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={2.5}
        maxDistance={9}
        target={[0, 0.8, 0]}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

function WelcomeOverlay({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-sm" data-testid="welcome-overlay">
      <div className="bg-background rounded-3xl border border-border/50 shadow-2xl p-8 max-w-md mx-4 text-center">
        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Lightbulb className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">Design Your Sensory Room</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Build a therapy room layout in 3 easy steps:
        </p>
        <div className="space-y-4 text-left mb-8">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
            <p className="text-sm text-foreground"><span className="font-semibold">Browse products</span> in the sidebar and tap the <Plus className="w-3.5 h-3.5 inline" /> button to add them to the room.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
            <p className="text-sm text-foreground"><span className="font-semibold">Rotate the 3D view</span> by dragging with your mouse or finger to explore the room.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
            <p className="text-sm text-foreground"><span className="font-semibold">Review the total cost</span> at the bottom, then buy the setup or request a quote.</p>
          </div>
        </div>
        <Button
          onClick={onDismiss}
          size="lg"
          className="rounded-full w-full gap-2 shadow-lg shadow-primary/20"
          data-testid="button-start-building"
        >
          Start Building
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default function SensoryRoomBuilder() {
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showWelcome, setShowWelcome] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { addToCart } = useShoppingCart();

  const addProductToRoom = (product: RoomProduct) => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.5 + Math.random() * 1.5;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    setPlacedItems((prev) => [
      ...prev,
      {
        instanceId: `${product.id}-${Date.now()}`,
        product,
        position: [x, 0, z],
      },
    ]);

    if (showWelcome) setShowWelcome(false);
  };

  const removeItem = (instanceId: string) => {
    setPlacedItems((prev) => prev.filter((i) => i.instanceId !== instanceId));
  };

  const clearRoom = () => setPlacedItems([]);

  const totalCost = placedItems.reduce((sum, item) => sum + item.product.price, 0);

  const uniqueCategories = ["All", ...new Set(roomProducts.map((p) => p.category))];
  const filteredProducts =
    selectedCategory === "All"
      ? roomProducts
      : roomProducts.filter((p) => p.category === selectedCategory);

  const groupedProducts = filteredProducts.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, RoomProduct[]>);

  const handleBuySetup = () => {
    const grouped = new Map<string, { product: RoomProduct; count: number }>();
    for (const item of placedItems) {
      const existing = grouped.get(item.product.id);
      if (existing) {
        existing.count++;
      } else {
        grouped.set(item.product.id, { product: item.product, count: 1 });
      }
    }
    for (const [, { product, count }] of grouped) {
      for (let i = 0; i < count; i++) {
        addToCart({
          productId: product.id,
          productName: product.name,
          category: product.category,
          unitPrice: product.price,
          config: { addons: [] },
          image: product.image,
        });
      }
    }
  };

  const itemCounts = placedItems.reduce((acc, item) => {
    acc[item.product.id] = (acc[item.product.id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row pt-16 lg:pt-20">
        <aside className="w-full lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-border/50 bg-card/50 flex flex-col" data-testid="sidebar-products">
          <div className="p-4 lg:p-5 border-b border-border/30">
            <h2 className="text-lg font-bold text-foreground mb-1" data-testid="heading-product-catalog">Product Catalog</h2>
            <p className="text-xs text-muted-foreground">Tap a product to add it to your therapy room</p>
          </div>

          <div className="px-4 lg:px-5 py-3 border-b border-border/30 overflow-x-auto">
            <div className="flex gap-1.5 min-w-max">
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  }`}
                  data-testid={`filter-${cat.toLowerCase().replace(/[\s&]+/g, "-")}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[280px] lg:max-h-none">
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
                      {expandedCategory === category ? (
                        <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </button>
                  {(expandedCategory === category || expandedCategory === null) && (
                    <div className="px-3 lg:px-4 pb-3 space-y-2">
                      {products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          count={itemCounts[product.id] || 0}
                          onAdd={() => addProductToRoom(product)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-3 lg:p-4 space-y-2">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    count={itemCounts[product.id] || 0}
                    onAdd={() => addProductToRoom(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </aside>

        <div className="flex-1 relative flex flex-col">
          {showWelcome && placedItems.length === 0 && (
            <WelcomeOverlay onDismiss={() => setShowWelcome(false)} />
          )}

          <div className="absolute top-3 right-3 z-10 flex gap-2">
            {placedItems.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-1.5 bg-background/90 backdrop-blur-sm shadow-sm"
                onClick={clearRoom}
                data-testid="button-clear-room"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </Button>
            )}
          </div>

          {placedItems.length > 0 && (
            <div className="absolute top-3 left-3 z-10 bg-background/90 backdrop-blur-sm rounded-xl border border-border/50 p-3 shadow-sm max-h-[240px] overflow-y-auto w-60" data-testid="placed-items-list">
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
                      <span className="text-[10px] text-muted-foreground">{items.length > 1 ? `×${items.length}` : formatPrice(product.price)}</span>
                    </div>
                    <button
                      onClick={() => removeItem(items[items.length - 1].instanceId)}
                      className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 p-0.5"
                      data-testid={`remove-room-item-${productId}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {placedItems.length === 0 && !showWelcome && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none" data-testid="empty-room-hint">
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl border border-border/30 px-6 py-5 shadow-sm">
                <Hand className="w-8 h-8 text-primary/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground font-medium">Select a product from the sidebar</p>
                <p className="text-xs text-muted-foreground/60 mt-1">to place it in the therapy room</p>
              </div>
            </div>
          )}

          <div className="flex-1 min-h-[400px] lg:min-h-0">
            <Canvas
              shadows
              camera={{ position: [4.5, 3.5, 4.5], fov: 45 }}
              style={{ background: "linear-gradient(180deg, #e8eef5 0%, #d4dce8 100%)" }}
              data-testid="canvas-3d"
            >
              <Suspense fallback={null}>
                <Scene placedItems={placedItems} onRemoveItem={removeItem} />
              </Suspense>
            </Canvas>
          </div>

          <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 lg:px-6 py-4" data-testid="room-summary-bar">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 flex-wrap">
              <div>
                {placedItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Browse the catalog and tap products to build your therapy room
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      {placedItems.length} item{placedItems.length > 1 ? "s" : ""} in your setup
                    </p>
                    <p className="text-2xl font-bold text-foreground">{formatPrice(totalCost)}</p>
                  </>
                )}
              </div>
              {placedItems.length > 0 && (
                <div className="flex gap-3">
                  <Link href="/#enquiry">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full gap-2"
                      data-testid="button-quote-setup"
                    >
                      <Send className="w-4 h-4" />
                      Get Quote
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    className="rounded-full gap-2 shadow-lg shadow-primary/20"
                    onClick={handleBuySetup}
                    data-testid="button-buy-setup"
                  >
                    <ShoppingCart className="w-4 h-4" />
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
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
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
        {count > 0 && (
          <span className="text-[10px] font-bold text-primary">×{count}</span>
        )}
      </div>
    </button>
  );
}
