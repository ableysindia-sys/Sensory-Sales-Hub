import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Grid, Text } from "@react-three/drei";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/catalogue-data";
import { useShoppingCart } from "@/lib/shopping-cart";
import {
  Plus,
  RotateCcw,
  Smartphone,
  ShoppingCart,
  Send,
  Trash2,
  Box,
  Circle,
  Cylinder,
  Minus,
  Eye,
} from "lucide-react";
import { Link } from "wouter";
import * as THREE from "three";

interface RoomProduct {
  id: string;
  name: string;
  price: number;
  shape: "cylinder" | "box" | "sphere" | "tallCylinder";
  color: string;
  category: string;
}

interface PlacedItem {
  instanceId: string;
  product: RoomProduct;
  position: [number, number, number];
}

const roomProducts: RoomProduct[] = [
  { id: "bolster-swing", name: "Bolster Swing", price: 4500, shape: "cylinder", color: "#4A53A0", category: "Swings" },
  { id: "platform-swing", name: "Platform Swing", price: 6800, shape: "box", color: "#1E40AF", category: "Swings" },
  { id: "crash-mat", name: "Crash Mat", price: 7500, shape: "box", color: "#166534", category: "Mats" },
  { id: "therapy-mat", name: "Therapy Mat", price: 4200, shape: "box", color: "#0D9488", category: "Mats" },
  { id: "gym-ball", name: "Gym Ball", price: 1200, shape: "sphere", color: "#EF4444", category: "Therapy Balls" },
  { id: "peanut-ball", name: "Peanut Ball", price: 2800, shape: "sphere", color: "#F59E0B", category: "Therapy Balls" },
  { id: "bubble-tube", name: "Bubble Tube", price: 8500, shape: "tallCylinder", color: "#7C3AED", category: "Visual" },
  { id: "fibre-light", name: "Fibre Light", price: 4500, shape: "tallCylinder", color: "#EC4899", category: "Visual" },
  { id: "balance-board", name: "Balance Board", price: 2800, shape: "cylinder", color: "#D4A574", category: "Movement" },
  { id: "stepping-stone", name: "Stepping Stones", price: 2200, shape: "cylinder", color: "#22C55E", category: "Movement" },
];

function ProductMesh({ item }: { item: PlacedItem }) {
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
    }
  };

  const getYOffset = () => {
    switch (item.product.shape) {
      case "cylinder": return 0.075;
      case "box": return 0.06;
      case "sphere": return 0.25;
      case "tallCylinder": return 0.6;
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
        emissiveIntensity={hovered ? 0.3 : 0}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

function Room() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#e8e4e0" roughness={0.8} />
      </mesh>

      <mesh position={[0, 1.5, -3]} receiveShadow>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#f5f1ed" roughness={0.9} />
      </mesh>

      <mesh position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#f0ece8" roughness={0.9} />
      </mesh>

      <mesh position={[3, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#f0ece8" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Scene({ placedItems }: { placedItems: PlacedItem[] }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-2, 2.5, 0]} intensity={0.3} color="#fef3c7" />
      <Room />
      {placedItems.map((item) => (
        <ProductMesh key={item.instanceId} item={item} />
      ))}
      <OrbitControls
        makeDefault
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={2}
        maxDistance={10}
        target={[0, 0.5, 0]}
      />
      <Grid
        args={[6, 6]}
        position={[0, 0.001, 0]}
        cellSize={0.5}
        cellThickness={0.3}
        cellColor="#d1d5db"
        sectionSize={1}
        sectionThickness={0.5}
        sectionColor="#9ca3af"
        fadeDistance={8}
        fadeStrength={1}
        followCamera={false}
      />
    </>
  );
}

export default function SensoryRoomBuilder() {
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
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
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row pt-16 lg:pt-20">
        <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border/50 bg-card/50 flex flex-col" data-testid="sidebar-products">
          <div className="p-4 lg:p-5 border-b border-border/30">
            <h2 className="text-lg font-bold text-foreground mb-1">Product Catalog</h2>
            <p className="text-xs text-muted-foreground">Click to add items to the room</p>
          </div>

          <div className="px-4 lg:px-5 py-3 border-b border-border/30">
            <div className="flex flex-wrap gap-1.5">
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  }`}
                  data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-2 max-h-[300px] lg:max-h-none">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addProductToRoom(product)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50 hover:border-primary/20 hover:shadow-md transition-all text-left group"
                data-testid={`room-product-${product.id}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: product.color + "20" }}
                >
                  {product.shape === "sphere" ? (
                    <Circle className="w-5 h-5" style={{ color: product.color }} />
                  ) : product.shape === "box" ? (
                    <Box className="w-5 h-5" style={{ color: product.color }} />
                  ) : (
                    <Cylinder className="w-5 h-5" style={{ color: product.color }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{formatPrice(product.price)}</p>
                </div>
                <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1 relative flex flex-col">
          <div className="absolute top-3 right-3 z-10 flex gap-2">
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
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-1.5 bg-background/90 backdrop-blur-sm shadow-sm"
              data-testid="button-ar-view"
            >
              <Smartphone className="w-3.5 h-3.5" />
              AR View
            </Button>
          </div>

          {placedItems.length > 0 && (
            <div className="absolute top-3 left-3 z-10 bg-background/90 backdrop-blur-sm rounded-xl border border-border/50 p-3 shadow-sm max-h-[200px] overflow-y-auto w-56" data-testid="placed-items-list">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                In Room ({placedItems.length})
              </p>
              <div className="space-y-1.5">
                {placedItems.map((item) => (
                  <div key={item.instanceId} className="flex items-center justify-between gap-2">
                    <span className="text-xs text-foreground truncate">{item.product.name}</span>
                    <button
                      onClick={() => removeItem(item.instanceId)}
                      className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                      data-testid={`remove-room-item-${item.instanceId}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 min-h-[400px] lg:min-h-0">
            <Canvas
              shadows
              camera={{ position: [4, 3.5, 4], fov: 50 }}
              style={{ background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)" }}
              data-testid="canvas-3d"
            >
              <Suspense fallback={null}>
                <Scene placedItems={placedItems} />
              </Suspense>
            </Canvas>
          </div>

          <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 lg:px-6 py-4" data-testid="room-summary-bar">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm text-muted-foreground">
                  {placedItems.length === 0
                    ? "Add products to start designing your sensory room"
                    : `${placedItems.length} item${placedItems.length > 1 ? "s" : ""} in your setup`}
                </p>
                {placedItems.length > 0 && (
                  <p className="text-2xl font-bold text-foreground">{formatPrice(totalCost)}</p>
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
                      Get Quote for Setup
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    className="rounded-full gap-2 shadow-lg shadow-primary/20"
                    onClick={handleBuySetup}
                    data-testid="button-buy-setup"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Room Setup
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
