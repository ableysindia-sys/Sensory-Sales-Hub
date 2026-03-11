export interface ProductSpec {
  dimensions?: string;
  material?: string;
  weightCapacity?: string;
  useCase?: string;
  weight?: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface VariantOption {
  name: string;
  priceModifier: number;
}

export interface AddonOption {
  name: string;
  price: number;
}

export interface ConfigOptions {
  colors?: ColorOption[];
  materials?: VariantOption[];
  sizes?: VariantOption[];
  addons?: AddonOption[];
}

export interface ShopifyVariant {
  id: string;
  title: string;
  sku: string;
  availableForSale: boolean;
  price: number;
  compareAtPrice: number | null;
  options: Array<{ name: string; value: string }>;
  image: string | null;
}

export interface CatalogueProduct {
  id: string;
  shopifyHandle?: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  specifications: ProductSpec;
  features: string[];
  applications: string[];
  basePrice: number;
  comparePrice?: number | null;
  configOptions?: ConfigOptions;
  images?: string[];
  shopifyUrl?: string;
  shopifyVariants?: ShopifyVariant[];
  productType?: string;
  vendor?: string;
  sku?: string;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  color: string;
  image?: string;
  products: CatalogueProduct[];
}

export const SITE_IMAGES = {
  hero: "https://www.ableys.in/cdn/shop/files/2752x1536.jpg?v=1767008990&width=1920",
  heroSecondary: "https://www.ableys.in/cdn/shop/files/Gemini_Generated_Image_64i3x864i3x864i3_343b5998-b75c-4f24-8b10-ca805fcce13d.png?v=1765174771&width=800",
  sensoryRoom: "https://www.ableys.in/cdn/shop/files/Focused_Floor_Play.png?v=1764649173&width=800",
  workshop: "https://www.ableys.in/cdn/shop/files/Abley_s_shop1.png?v=1764648560&width=800",
  getStarted: "https://www.ableys.in/cdn/shop/files/get_started.png?v=1764649172&width=800",
  diy: "https://www.ableys.in/cdn/shop/files/Diy.png?v=1764649029&width=800",
  weightedVest: "https://www.ableys.in/cdn/shop/files/weighted_vest_73931c9b-8820-43ea-8ef8-fdb268c0c949.png?v=1753190482&width=600",
  shopBanner: "https://www.ableys.in/cdn/shop/files/bley_s_India_Shop..png?v=1764648926&width=1500",
  adaptiveClothing: "https://www.ableys.in/cdn/shop/collections/1257x329.jpg?v=1767003940&width=1257",
  productShowcase: "https://www.ableys.in/cdn/shop/files/2048x2048.jpg?v=1767003806&width=1024",
};

export const categories: Category[] = [
  {
    slug: "swings",
    title: "Swings",
    description: "Vestibular input swings for therapy and sensory integration. Professional-grade suspension swings designed for clinics, therapy centres, and sensory rooms.",
    color: "from-blue-600 to-indigo-700",
    image: "__generated_category__:swings",
    products: [
      {
        id: "bolster-swing",
        name: "Bolster Swing",
        categorySlug: "swings",
        shortDescription: "Soft padded bolster swing for prone positioning, vestibular input, and core strengthening during therapy sessions.",
        description: "The Bolster Swing is a professional-grade therapy swing designed for occupational therapy and sensory integration. Its padded cylindrical design encourages prone positioning, helping children develop core strength, bilateral coordination, and vestibular processing. The bolster shape allows children to straddle or lie across it, providing deep proprioceptive input while swinging. Ideal for therapy centres, sensory rooms, and clinical environments.\n\nKey Features:\n- Heavy-duty padded bolster with reinforced stitching\n- Encourages prone extension and flexion patterns\n- Adjustable rope length for height customization\n- Supports vestibular, proprioceptive, and tactile input\n- Easy to mount on ceiling hooks or swing frames",
        specifications: { dimensions: "90cm x 25cm diameter", material: "High-density foam with vinyl cover", weightCapacity: "80 kg", useCase: "Therapy centres, sensory rooms" },
        features: ["Heavy-duty padded bolster", "Reinforced stitching", "Adjustable rope length", "Prone positioning support", "Easy ceiling mount"],
        applications: ["vestibular-therapy", "core-strengthening", "sensory-integration", "occupational-therapy"],
        basePrice: 12999,
        comparePrice: 15999,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_1_a43ed9ee-1c32-4081-9b0c-9e423b5538a8.jpg?v=1766662698",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_2_16e10b4d-8fcb-46c4-ba7e-44cb2526ff78.jpg?v=1766662699"
        ],
        configOptions: {
          colors: [
            { name: "Blue", hex: "#3B82F6" },
            { name: "Red", hex: "#EF4444" },
            { name: "Green", hex: "#22C55E" }
          ]
        }
      },
      {
        id: "t-swing",
        name: "T Swing",
        categorySlug: "swings",
        shortDescription: "T-shaped therapy swing for bilateral coordination, balance training, and vestibular stimulation.",
        description: "The T Swing is designed for therapeutic use in occupational therapy settings. Its unique T-shaped bar allows children to grip with both hands while swinging, promoting bilateral coordination, upper body strength, and vestibular processing. The swing encourages midline crossing and helps develop postural control.\n\nKey Features:\n- T-shaped grip bar for bilateral hand use\n- Adjustable height rope system\n- Smooth, controlled swinging motion\n- Develops upper body and grip strength\n- Professional-grade hardware included",
        specifications: { dimensions: "T-bar: 60cm wide, Rope: adjustable to 250cm", material: "Wooden T-bar with nylon rope", weightCapacity: "80 kg", useCase: "Therapy centres, clinics" },
        features: ["T-shaped grip bar", "Bilateral coordination training", "Adjustable height", "Smooth swinging motion", "Professional hardware"],
        applications: ["bilateral-coordination", "vestibular-therapy", "upper-body-strength", "postural-control"],
        basePrice: 8999,
        comparePrice: 10999,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_10.jpg?v=1768027428",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_6.jpg?v=1768027428"
        ]
      },
      {
        id: "disc-swing",
        name: "Disc Swing",
        categorySlug: "swings",
        shortDescription: "Circular disc swing for rotational vestibular input and balance development in therapy settings.",
        description: "The Disc Swing provides rotational and linear vestibular input, making it an essential tool for sensory integration therapy. Children can sit, stand, or lie on the disc while spinning or swinging, which helps develop balance, coordination, and spatial awareness. The flat disc design is particularly effective for children who need rotational vestibular stimulation.\n\nKey Features:\n- Flat circular disc design for multiple positioning\n- 360-degree rotational movement capability\n- Non-slip textured surface\n- Heavy-duty single-point suspension\n- Develops vestibular and proprioceptive processing",
        specifications: { dimensions: "60cm diameter", material: "High-density plastic with textured surface", weightCapacity: "75 kg", useCase: "Sensory rooms, therapy centres" },
        features: ["360-degree rotation", "Non-slip surface", "Multiple positioning options", "Single-point suspension", "Vestibular stimulation"],
        applications: ["rotational-vestibular", "balance-training", "sensory-integration", "spatial-awareness"],
        basePrice: 7499,
        comparePrice: 8999,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_2.jpg?v=1764648162",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_1.jpg?v=1764648165"
        ]
      },
      {
        id: "platform-swing",
        name: "Platform Swing",
        categorySlug: "swings",
        shortDescription: "Large flat platform swing for group therapy, prone activities, and multi-directional vestibular input.",
        description: "The Platform Swing is a large, flat rectangular swing that provides extensive vestibular input in multiple directions. Its spacious surface allows children to sit, lie prone, kneel, or even stand (with supervision) while receiving linear and rotational vestibular stimulation. Ideal for both individual and group therapy sessions.\n\nKey Features:\n- Large flat platform for multiple positions\n- Four-point suspension for stability\n- Multi-directional swinging motion\n- Padded edges for safety\n- Supports prone extension activities",
        specifications: { dimensions: "120cm x 60cm", material: "Plywood platform with foam padding and vinyl cover", weightCapacity: "100 kg", useCase: "Therapy centres, sensory rooms" },
        features: ["Large flat surface", "Four-point suspension", "Padded edges", "Multi-directional movement", "Group therapy capable"],
        applications: ["group-therapy", "vestibular-input", "prone-extension", "sensory-integration"],
        basePrice: 18999,
        comparePrice: 22999,
        configOptions: {
          sizes: [
            { name: "Standard (120x60cm)", priceModifier: 0 },
            { name: "Large (150x75cm)", priceModifier: 4000 }
          ]
        }
      },
      {
        id: "tube-swing",
        name: "Tube Swing",
        categorySlug: "swings",
        shortDescription: "Heavy-duty tyre tube swing for outdoor and indoor vestibular therapy and active play.",
        description: "The Tube Swing uses a heavy-duty rubber tyre tube to provide vestibular input through swinging and spinning motions. Its durable construction makes it suitable for both indoor therapy rooms and outdoor play areas. Children can sit inside, straddle, or hang from the tube, receiving proprioceptive and vestibular feedback.\n\nKey Features:\n- Heavy-duty rubber tyre tube construction\n- Smooth, safe edges\n- Versatile positioning options\n- Indoor and outdoor use\n- Reinforced rope attachment points",
        specifications: { dimensions: "70cm outer diameter", material: "Heavy-duty rubber with reinforced straps", weightCapacity: "90 kg", useCase: "Indoor/outdoor therapy" },
        features: ["Heavy-duty rubber construction", "Safe smooth edges", "Indoor/outdoor use", "Versatile positioning", "Reinforced attachments"],
        applications: ["vestibular-therapy", "active-play", "proprioceptive-input", "outdoor-therapy"],
        basePrice: 7999,
        comparePrice: 9499,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-187ol789l_dd7b9170-2401-4fe7-84f8-db80f45bde8f.jpg?v=1763019394",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/tubeswing7b7yt_db67f4b7-1e68-4b7b-98c5-b7759d3e3c94.jpg?v=1763019394"
        ]
      },
      {
        id: "lycra-swing",
        name: "Lycra Swing",
        categorySlug: "swings",
        shortDescription: "Stretchy lycra cocoon swing providing deep pressure, vestibular input, and calming sensory experience.",
        description: "The Lycra Swing is a stretchy, cocoon-like swing that wraps around the child, providing deep pressure input combined with gentle vestibular stimulation. The lycra fabric conforms to the body, creating a calming, womb-like environment that is particularly beneficial for children with sensory processing difficulties, anxiety, or autism spectrum conditions.\n\nKey Features:\n- Stretchy lycra fabric for deep pressure wrapping\n- Cocoon-like enclosure for calming effect\n- Single-point suspension for gentle swaying\n- Machine washable fabric\n- Promotes self-regulation and calming",
        specifications: { dimensions: "150cm length, expandable width", material: "4-way stretch lycra fabric", weightCapacity: "70 kg", useCase: "Sensory rooms, therapy centres" },
        features: ["Deep pressure wrapping", "Cocoon enclosure", "Machine washable", "Self-regulation support", "Calming sensory input"],
        applications: ["deep-pressure", "calming", "sensory-processing", "self-regulation"],
        basePrice: 6499,
        comparePrice: 7999,
        configOptions: {
          colors: [
            { name: "Blue", hex: "#3B82F6" },
            { name: "Purple", hex: "#8B5CF6" },
            { name: "Green", hex: "#22C55E" },
            { name: "Red", hex: "#EF4444" }
          ]
        }
      },
      {
        id: "acrobat-swing",
        name: "Acrobat Swing",
        categorySlug: "swings",
        shortDescription: "Multi-position acrobat swing for advanced vestibular challenges, aerial therapy, and dynamic movement.",
        description: "The Acrobat Swing is designed for advanced vestibular and proprioceptive therapy, allowing children to perform dynamic aerial movements in a safe, supported environment. Its trapeze-style design encourages grip strength, bilateral coordination, core engagement, and confidence building through progressive movement challenges.\n\nKey Features:\n- Trapeze-style multi-position design\n- Padded grip bars for comfort\n- Adjustable rope length\n- Supports advanced vestibular challenges\n- Professional-grade hardware and mounting",
        specifications: { dimensions: "Bar: 50cm wide, Rope: adjustable to 250cm", material: "Steel bar with foam padding and nylon rope", weightCapacity: "80 kg", useCase: "Therapy centres, sensory gyms" },
        features: ["Multi-position design", "Padded grip bars", "Advanced vestibular challenges", "Core engagement", "Professional hardware"],
        applications: ["advanced-vestibular", "aerial-therapy", "grip-strength", "confidence-building"],
        basePrice: 9999,
        comparePrice: 11999,
        configOptions: {
          colors: [
            { name: "Blue", hex: "#3B82F6" },
            { name: "Red", hex: "#EF4444" },
            { name: "Yellow", hex: "#F59E0B" }
          ]
        }
      }
    ]
  },
  {
    slug: "ballpool",
    title: "Ballpool",
    description: "Therapeutic ballpools for sensory rooms and clinics. Professional-grade enclosures designed for deep pressure, tactile stimulation, and calming sensory experiences.",
    color: "from-pink-500 to-rose-600",
    image: "https://www.ableys.in/cdn/shop/collections/ffd9483743859644a14333ca0faf25a1.webp?v=1764648396&width=600",
    products: [
      {
        id: "ballpool-4x4",
        name: "4x4 Ballpool",
        categorySlug: "ballpool",
        shortDescription: "Compact 4ft x 4ft therapeutic ballpool for clinics and small sensory rooms with padded walls and 500 balls.",
        description: "The 4x4 Ballpool is a compact therapeutic ballpool designed for clinic environments and smaller sensory rooms. Its padded walls ensure safety while children immerse themselves in colourful balls, receiving deep pressure, tactile stimulation, and proprioceptive input. The pool comes complete with 500 high-quality, crush-proof balls.\n\nKey Features:\n- 4ft x 4ft footprint ideal for clinics\n- Padded vinyl-covered walls for safety\n- Includes 500 crush-proof therapy balls\n- Easy-clean vinyl interior\n- Removable wall panels for access\n- Promotes deep pressure and tactile processing",
        specifications: { dimensions: "120cm x 120cm x 60cm deep", material: "Steel frame with foam-padded vinyl walls", weightCapacity: "150 kg", useCase: "Clinics, small sensory rooms" },
        features: ["Padded vinyl walls", "500 crush-proof balls included", "Easy-clean interior", "Removable wall panels", "Steel frame construction", "Deep pressure therapy"],
        applications: ["deep-pressure", "tactile-stimulation", "sensory-room", "proprioceptive-input"],
        basePrice: 32999,
        comparePrice: 39999,
        configOptions: {
          colors: [
            { name: "Mixed Primary", hex: "#3B82F6" },
            { name: "Pastel Mix", hex: "#F9A8D4" },
            { name: "Ocean Blue", hex: "#0EA5E9" }
          ]
        }
      },
      {
        id: "ballpool-6x4",
        name: "6x4 Ballpool",
        categorySlug: "ballpool",
        shortDescription: "Large 6ft x 4ft therapeutic ballpool for sensory rooms with padded walls and 800 balls for group sessions.",
        description: "The 6x4 Ballpool is a large therapeutic ballpool designed for dedicated sensory rooms and group therapy sessions. Its spacious design allows multiple children to use it simultaneously, making it ideal for group sensory integration activities. Comes complete with 800 high-quality, crush-proof balls.\n\nKey Features:\n- Spacious 6ft x 4ft design for group use\n- Padded vinyl-covered walls for safety\n- Includes 800 crush-proof therapy balls\n- Reinforced steel frame construction\n- Step-in entry panel for easy access\n- Supports individual and group therapy",
        specifications: { dimensions: "180cm x 120cm x 60cm deep", material: "Steel frame with foam-padded vinyl walls", weightCapacity: "200 kg", useCase: "Sensory rooms, therapy centres" },
        features: ["Large 6x4 design", "800 balls included", "Group therapy capable", "Step-in entry", "Reinforced frame", "Padded walls"],
        applications: ["group-therapy", "deep-pressure", "sensory-room", "tactile-stimulation"],
        basePrice: 49999,
        comparePrice: 59999,
        configOptions: {
          colors: [
            { name: "Mixed Primary", hex: "#3B82F6" },
            { name: "Pastel Mix", hex: "#F9A8D4" },
            { name: "Clear/Translucent", hex: "#E5E7EB" }
          ]
        }
      }
    ]
  },
  {
    slug: "mats",
    title: "Mats",
    description: "Safety and therapy mats for professional environments. High-density foam mats for crash landings, floor exercises, and creating safe therapy spaces.",
    color: "from-green-600 to-emerald-700",
    image: "https://www.ableys.in/cdn/shop/collections/205a3a30b60a7f9fd326971bfb996fb7.webp?v=1764648396&width=600",
    products: [
      {
        id: "crash-mat",
        name: "Crash Mat",
        categorySlug: "mats",
        shortDescription: "High-density foam crash mat for safe landing, jumping activities, and proprioceptive crash play in therapy.",
        description: "The Crash Mat is a thick, high-density foam mat designed for safe crash landing activities during sensory integration therapy. Children can jump, roll, and crash onto the mat, receiving deep proprioceptive input that helps with body awareness and sensory regulation. The vinyl cover is easy to clean and durable for clinical use.\n\nKey Features:\n- Extra-thick high-density foam (15cm)\n- Heavy-duty vinyl cover for durability\n- Non-slip base layer\n- Easy-clean surface\n- Provides deep proprioceptive input on impact",
        specifications: { dimensions: "180cm x 120cm x 15cm thick", material: "High-density foam with vinyl cover", weightCapacity: "120 kg", useCase: "Therapy centres, sensory rooms" },
        features: ["15cm thick high-density foam", "Vinyl cover", "Non-slip base", "Easy to clean", "Deep proprioceptive input"],
        applications: ["crash-play", "proprioceptive-input", "safe-landing", "sensory-therapy"],
        basePrice: 14999,
        comparePrice: 17999,
        configOptions: {
          colors: [
            { name: "Blue", hex: "#3B82F6" },
            { name: "Red", hex: "#EF4444" },
            { name: "Green", hex: "#22C55E" }
          ]
        }
      },
      {
        id: "therapy-mat",
        name: "Therapy Mat",
        categorySlug: "mats",
        shortDescription: "Professional therapy mat for floor exercises, stretching, and structured therapy activities.",
        description: "The Therapy Mat is a professional-grade exercise mat designed for structured therapy sessions. Its firm yet comfortable density provides optimal support for floor exercises, stretching, and therapeutic activities. The anti-microbial vinyl surface is easy to sanitize between patients.\n\nKey Features:\n- Professional-grade density for therapy use\n- Anti-microbial vinyl surface\n- Firm support for exercises\n- Easy to sanitize between sessions\n- Reinforced corners and edges",
        specifications: { dimensions: "180cm x 90cm x 5cm thick", material: "Medium-density foam with anti-microbial vinyl", weightCapacity: "150 kg", useCase: "Therapy rooms, clinics, hospitals" },
        features: ["Professional density foam", "Anti-microbial surface", "Reinforced corners", "Easy sanitization", "Firm exercise support"],
        applications: ["floor-exercises", "stretching", "therapy-activities", "rehabilitation"],
        basePrice: 8999,
        comparePrice: 10999,
        configOptions: {
          colors: [
            { name: "Blue", hex: "#3B82F6" },
            { name: "Grey", hex: "#6B7280" },
            { name: "Purple", hex: "#8B5CF6" }
          ]
        }
      },
      {
        id: "floormat",
        name: "Floormat",
        categorySlug: "mats",
        shortDescription: "Large-area floor mat for creating safe play and therapy zones in clinics and sensory rooms.",
        description: "The Floormat provides a large, cushioned surface area for creating designated safe play and therapy zones. Its medium-density foam absorbs impact and provides comfortable padding for children during floor-based activities. The seamless design prevents tripping hazards.\n\nKey Features:\n- Large coverage area for therapy zones\n- Medium-density impact-absorbing foam\n- Seamless flat design\n- Slip-resistant bottom surface\n- Durable vinyl cover",
        specifications: { dimensions: "240cm x 120cm x 3cm thick", material: "Medium-density foam with vinyl cover", weightCapacity: "200 kg", useCase: "Sensory rooms, play areas" },
        features: ["Large coverage area", "Impact-absorbing foam", "Seamless design", "Slip-resistant base", "Durable construction"],
        applications: ["safe-play-zone", "therapy-floor", "sensory-room", "impact-protection"],
        basePrice: 11999,
        comparePrice: 14499
      },
      {
        id: "interlocking-mat",
        name: "Interlocking Mat",
        categorySlug: "mats",
        shortDescription: "Modular interlocking foam tiles for customizable therapy room flooring with easy installation.",
        description: "Interlocking Mat tiles provide modular, customizable flooring solutions for therapy rooms and sensory spaces. Each tile connects seamlessly with adjacent tiles, allowing you to cover any floor area without gaps. The EVA foam construction provides excellent impact protection and insulation.\n\nKey Features:\n- Interlocking puzzle-edge design\n- Customizable coverage area\n- EVA foam construction\n- Easy to install and reconfigure\n- Available in multiple colours\n- Pack of 12 tiles",
        specifications: { dimensions: "60cm x 60cm x 2cm per tile (12-pack)", material: "High-density EVA foam", weightCapacity: "N/A", useCase: "Therapy rooms, sensory rooms, gyms" },
        features: ["Puzzle-edge interlocking", "Customizable layout", "EVA foam construction", "Easy installation", "12-tile pack"],
        applications: ["room-flooring", "impact-protection", "therapy-room-setup", "modular-flooring"],
        basePrice: 5999,
        comparePrice: 6999,
        configOptions: {
          colors: [
            { name: "Grey", hex: "#6B7280" },
            { name: "Blue", hex: "#3B82F6" },
            { name: "Black", hex: "#1F2937" },
            { name: "Multi-colour", hex: "#F59E0B" }
          ]
        }
      },
      {
        id: "foldable-mat",
        name: "Foldable Mat",
        categorySlug: "mats",
        shortDescription: "Tri-fold portable therapy mat for mobile therapists, home visits, and space-efficient storage.",
        description: "The Foldable Mat is a tri-fold design that combines the functionality of a full-size therapy mat with the convenience of portable, space-saving storage. When unfolded, it provides a full-length exercise surface; when folded, it stores compactly in a corner or closet. Perfect for mobile therapists and home visit setups.\n\nKey Features:\n- Tri-fold portable design\n- Full-length exercise surface when open\n- Compact storage when folded\n- Carry handles for transport\n- Non-slip base and reinforced hinges",
        specifications: { dimensions: "180cm x 60cm x 5cm (open), 60cm x 60cm x 15cm (folded)", material: "High-density foam with vinyl cover", weightCapacity: "120 kg", weight: "4.5 kg" },
        features: ["Tri-fold design", "Carry handles", "Compact storage", "Non-slip base", "Reinforced hinges"],
        applications: ["mobile-therapy", "home-visits", "portable-setup", "space-saving"],
        basePrice: 6499,
        comparePrice: 7999,
        configOptions: {
          colors: [
            { name: "Blue", hex: "#3B82F6" },
            { name: "Pink", hex: "#EC4899" },
            { name: "Grey", hex: "#6B7280" }
          ]
        }
      }
    ]
  },
  {
    slug: "movement-balance",
    title: "Movement & Balance",
    description: "Motor planning and balance training equipment. Professional tools for developing coordination, core strength, and vestibular processing through active movement.",
    color: "from-amber-500 to-orange-600",
    image: "https://www.ableys.in/cdn/shop/collections/51a9c54320cd2f65212d42c9b0daea5c.webp?v=1764648396&width=600",
    products: [
      {
        id: "kidlite-barrel",
        name: "Kidlite Barrel",
        categorySlug: "movement-balance",
        shortDescription: "Lightweight therapy barrel for rolling, rocking, and vestibular stimulation in paediatric therapy.",
        description: "The Kidlite Barrel is a lightweight therapy barrel designed for paediatric occupational therapy. Children can sit inside, roll, rock, or crawl through the barrel, receiving vestibular and proprioceptive input. Its lightweight construction allows therapists to easily reposition it during sessions.\n\nKey Features:\n- Lightweight yet durable construction\n- Smooth interior for comfort\n- Rolling and rocking activities\n- Develops vestibular processing\n- Easy for therapists to manoeuvre",
        specifications: { dimensions: "60cm diameter x 90cm length", material: "Lightweight plastic barrel with foam padding", weightCapacity: "60 kg", weight: "3.5 kg" },
        features: ["Lightweight construction", "Smooth padded interior", "Rolling activities", "Vestibular development", "Easy to manoeuvre"],
        applications: ["vestibular-therapy", "rolling-activities", "motor-planning", "paediatric-therapy"],
        basePrice: 8999,
        comparePrice: 10999
      },
      {
        id: "balance-board",
        name: "Balance Board",
        categorySlug: "movement-balance",
        shortDescription: "Wooden wobble board for balance training, core strengthening, and proprioceptive development.",
        description: "The Balance Board is a curved wooden wobble board that challenges balance, core stability, and proprioceptive awareness. Standing, sitting, or kneeling on the board develops postural control, ankle stability, and bilateral coordination. The natural wood finish provides a warm, therapeutic aesthetic.\n\nKey Features:\n- Curved wooden wobble design\n- Develops balance and core stability\n- Multiple positioning options\n- Natural wood finish\n- Non-slip surface treatment",
        specifications: { dimensions: "80cm x 30cm", material: "Natural beech wood with non-slip finish", weightCapacity: "100 kg" },
        features: ["Curved wobble design", "Core stability training", "Natural wood", "Non-slip surface", "Multiple positions"],
        applications: ["balance-training", "core-strengthening", "proprioceptive-input", "coordination"],
        basePrice: 4999,
        comparePrice: 5999,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_469123fc-f1a4-4f9c-8e97-28f5c0945852.jpg?v=1764648214",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_f5d46e44-fb15-413d-8ce9-78509fdbd168.jpg?v=1764648216"
        ]
      },
      {
        id: "balance-beam",
        name: "Balance Beam",
        categorySlug: "movement-balance",
        shortDescription: "Low-profile balance beam for gait training, coordination, and motor planning activities.",
        description: "The Balance Beam is a low-profile walking beam designed for gait training, coordination development, and motor planning activities. Its low height ensures safety while providing meaningful balance challenges. The textured walking surface provides tactile feedback for foot placement awareness.\n\nKey Features:\n- Low-profile safety design (10cm height)\n- Textured non-slip walking surface\n- Modular beam sections for varied lengths\n- Rounded edges for safety\n- Develops gait and coordination",
        specifications: { dimensions: "240cm x 10cm x 10cm height", material: "Solid wood with non-slip finish", weightCapacity: "80 kg" },
        features: ["Low-profile design", "Textured surface", "Modular sections", "Rounded edges", "Gait training"],
        applications: ["gait-training", "coordination", "motor-planning", "balance-development"],
        basePrice: 5499,
        comparePrice: 6499
      },
      {
        id: "stepping-stones",
        name: "Stepping Stones",
        categorySlug: "movement-balance",
        shortDescription: "Textured non-slip stepping stones for balance, coordination, and obstacle course activities.",
        description: "Stepping Stones are colourful, textured balance platforms that can be arranged in various configurations to create obstacle courses and balance challenges. Each stone features a non-slip textured top and rubber base, with varying heights to provide progressive difficulty levels.\n\nKey Features:\n- Set of 6 coloured stepping stones\n- Textured non-slip tops\n- Rubber grip bases\n- Varying heights for progression\n- Lightweight and portable",
        specifications: { dimensions: "Various heights (5-15cm), 25cm diameter", material: "High-density plastic with rubber base", weightCapacity: "60 kg per stone" },
        features: ["6-piece set", "Non-slip textured tops", "Rubber bases", "Varying heights", "Portable design"],
        applications: ["balance-obstacles", "motor-planning", "coordination", "active-play"],
        basePrice: 3999,
        comparePrice: 4799,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-26at5.11.10PM.jpg?v=1766749713",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-26at5.11.11PM.jpg?v=1766749713"
        ]
      },
      {
        id: "wedges",
        name: "Wedges",
        categorySlug: "movement-balance",
        shortDescription: "Foam therapy wedges for positioning, incline exercises, and motor development activities.",
        description: "Therapy Wedges are versatile foam wedges used for positioning, incline exercises, and developmental motor activities. They provide inclined surfaces for crawling, sitting, and prone activities, helping develop trunk control and upper body strength. The vinyl cover is easy to clean.\n\nKey Features:\n- High-density foam construction\n- Multiple wedge angles available\n- Easy-clean vinyl cover\n- Positioning and exercise support\n- Develops trunk control",
        specifications: { dimensions: "60cm x 60cm x 30cm (height)", material: "High-density foam with vinyl cover", weightCapacity: "80 kg" },
        features: ["High-density foam", "Multiple angles", "Vinyl cover", "Positioning support", "Trunk control development"],
        applications: ["positioning", "incline-exercises", "motor-development", "trunk-control"],
        basePrice: 4499,
        comparePrice: 5499,
        configOptions: {
          sizes: [
            { name: "Small (30cm)", priceModifier: 0 },
            { name: "Medium (45cm)", priceModifier: 1500 },
            { name: "Large (60cm)", priceModifier: 3000 }
          ]
        }
      },
      {
        id: "jumping-stool",
        name: "Jumping Stool",
        categorySlug: "movement-balance",
        shortDescription: "Spring-loaded jumping stool for active movement, proprioceptive input, and energy regulation.",
        description: "The Jumping Stool provides a controlled bouncing platform for active movement breaks and proprioceptive input. The spring-loaded base allows children to bounce safely while developing lower body strength, balance, and motor coordination. Great for energy regulation and sensory breaks.\n\nKey Features:\n- Spring-loaded bouncing platform\n- Non-slip rubber base\n- Develops lower body strength\n- Controlled bouncing height\n- Quiet operation for indoor use",
        specifications: { dimensions: "35cm diameter x 25cm height", material: "Steel spring mechanism with foam-padded top", weightCapacity: "60 kg" },
        features: ["Spring-loaded bounce", "Non-slip base", "Lower body strength", "Controlled height", "Quiet operation"],
        applications: ["active-movement", "proprioceptive-input", "energy-regulation", "motor-coordination"],
        basePrice: 3499,
        comparePrice: 3999
      },
      {
        id: "ramp-and-stairs",
        name: "Ramp and Stairs",
        categorySlug: "movement-balance",
        shortDescription: "Climbing ramp and stairs combo for gross motor development, gait training, and confidence building.",
        description: "The Ramp and Stairs is a versatile gross motor development tool combining a climbing ramp with practice stairs. Children develop gait patterns, leg strength, balance, and confidence through ascending and descending activities. The padded, non-slip surfaces ensure safety during therapy sessions.\n\nKey Features:\n- Combined ramp and stairs design\n- Padded non-slip surfaces\n- Adjustable ramp angle\n- Handrails for support\n- Develops gait and gross motor skills",
        specifications: { dimensions: "120cm x 60cm x 45cm height", material: "Plywood with foam padding and vinyl cover, steel handrails", weightCapacity: "80 kg" },
        features: ["Combined ramp and stairs", "Non-slip padding", "Adjustable angle", "Handrail support", "Gross motor development"],
        applications: ["gait-training", "gross-motor", "stair-climbing", "confidence-building"],
        basePrice: 12999,
        comparePrice: 15999
      },
      {
        id: "trampoline",
        name: "Trampoline",
        categorySlug: "movement-balance",
        shortDescription: "Mini therapy trampoline with handle bar for safe jumping, vestibular input, and motor coordination.",
        description: "The Therapy Trampoline is a mini indoor trampoline with a stability handle bar, designed for therapeutic jumping activities. Bouncing provides intense vestibular and proprioceptive input, helping with sensory regulation, lower body strength, and motor coordination. The handle bar ensures safety during use.\n\nKey Features:\n- Mini indoor trampoline design\n- Stability handle bar included\n- Quiet, low-bounce surface\n- Non-slip rubber legs\n- Vestibular and proprioceptive input",
        specifications: { dimensions: "100cm diameter", material: "Steel frame with polypropylene mat and foam-padded handle", weightCapacity: "80 kg" },
        features: ["Stability handle", "Quiet bounce", "Non-slip legs", "Indoor use", "Vestibular input"],
        applications: ["jumping-therapy", "vestibular-input", "motor-coordination", "energy-regulation"],
        basePrice: 7999,
        comparePrice: 9499,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_3_4.jpg?v=1767097014",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_b54f58b5-845b-4376-bb3e-a1866f44db4f.jpg?v=1767097014"
        ]
      }
    ]
  },
  {
    slug: "climbing",
    title: "Climbing",
    description: "Climbing structures for strength and coordination. Professional climbing equipment designed for motor planning, upper body development, and confidence building.",
    color: "from-red-600 to-rose-700",
    image: "https://www.ableys.in/cdn/shop/collections/3e42f0c4c2db7be555f4e4def6a2cf66.webp?v=1764648404&width=600",
    products: [
      {
        id: "climb-board",
        name: "Climb Board",
        categorySlug: "climbing",
        shortDescription: "Adjustable climbing board with hand and foot holds for upper body strength and motor planning.",
        description: "The Climb Board is an adjustable climbing wall panel with colourful hand and foot holds arranged in progressive difficulty patterns. It develops upper body strength, grip strength, motor planning, and bilateral coordination. The board can be mounted at various angles for increasing challenge.\n\nKey Features:\n- Multiple coloured hand and foot holds\n- Adjustable mounting angles\n- Progressive difficulty patterns\n- Develops grip and upper body strength\n- Professional-grade mounting hardware",
        specifications: { dimensions: "180cm x 120cm", material: "Marine plywood with polyresin holds and steel mounting brackets", weightCapacity: "100 kg" },
        features: ["Coloured holds", "Adjustable angles", "Progressive difficulty", "Upper body development", "Professional mounting"],
        applications: ["climbing-therapy", "strength-building", "motor-planning", "coordination"],
        basePrice: 24999,
        comparePrice: 29999
      },
      {
        id: "wall-bar-ladder",
        name: "Wall Bar Ladder",
        categorySlug: "climbing",
        shortDescription: "Wall-mounted Swedish ladder bars for climbing, stretching, and full-body strengthening exercises.",
        description: "The Wall Bar Ladder (Swedish Ladder) is a wall-mounted climbing and exercise apparatus with horizontal bars at regular intervals. It provides opportunities for climbing, hanging, stretching, and strengthening exercises. The solid wood construction and professional mounting ensure safety and durability.\n\nKey Features:\n- Wall-mounted Swedish ladder design\n- Solid wood bars at regular intervals\n- Full-body exercise capability\n- Professional wall-mounting hardware\n- Develops upper body and core strength",
        specifications: { dimensions: "240cm x 80cm, 14 rungs", material: "Solid beech wood bars with steel wall brackets", weightCapacity: "120 kg" },
        features: ["Swedish ladder design", "Solid wood bars", "14 rungs", "Full-body exercises", "Professional mounting"],
        applications: ["climbing", "stretching", "strengthening", "rehabilitation"],
        basePrice: 18999,
        comparePrice: 22999
      },
      {
        id: "spider-climb-net",
        name: "Spider Climb Net",
        categorySlug: "climbing",
        shortDescription: "Cargo-style climbing net for developing grip strength, coordination, and spatial awareness.",
        description: "The Spider Climb Net is a cargo-style rope climbing net that provides challenging climbing activities for developing grip strength, bilateral coordination, and spatial awareness. The net can be mounted vertically on a wall or at an angle for varied difficulty. Heavy-duty rope construction ensures safety.\n\nKey Features:\n- Cargo-style rope net design\n- Heavy-duty braided rope\n- Vertical or angled mounting\n- Develops grip and coordination\n- Professional mounting points",
        specifications: { dimensions: "200cm x 150cm", material: "Heavy-duty braided polypropylene rope, 16mm diameter", weightCapacity: "100 kg" },
        features: ["Cargo-style net", "Heavy-duty rope", "Flexible mounting", "Grip development", "Spatial awareness"],
        applications: ["climbing", "grip-strength", "coordination", "spatial-awareness"],
        basePrice: 14999,
        comparePrice: 17999
      }
    ]
  },
  {
    slug: "adl-kit",
    title: "ADL Kit",
    description: "Activities of Daily Living kits for functional training. Structured activity boards designed to develop self-care skills, fine motor abilities, and independence.",
    color: "from-teal-500 to-cyan-600",
    image: "https://www.ableys.in/cdn/shop/collections/e943d3f161400ee0efe52b4ca3a4198e.webp?v=1764648396&width=600",
    products: [
      {
        id: "adl-kit-4-page",
        name: "4 Page ADL Kit",
        categorySlug: "adl-kit",
        shortDescription: "4-panel activity board for practising buttons, zippers, laces, and buckles for daily living skills.",
        description: "The 4 Page ADL Kit is a structured activity board system with 4 panels, each featuring different daily living skill activities. Children practice buttoning, zipping, lacing, and buckling in a controlled, repeatable format. The kit develops fine motor skills, bilateral coordination, and independence in self-care tasks.\n\nKey Features:\n- 4 activity panels (buttons, zippers, laces, buckles)\n- Sturdy board construction\n- Real clothing fasteners for authentic practice\n- Progressive difficulty levels\n- Develops fine motor and self-care skills",
        specifications: { dimensions: "30cm x 30cm per panel", material: "MDF board with fabric and real fasteners" },
        features: ["4 activity panels", "Real fasteners", "Progressive difficulty", "Fine motor development", "Self-care practice"],
        applications: ["fine-motor", "self-care-skills", "daily-living", "independence-training"],
        basePrice: 7999,
        comparePrice: 9499
      },
      {
        id: "adl-kit-5-page",
        name: "5 Page ADL Kit",
        categorySlug: "adl-kit",
        shortDescription: "5-panel activity board with buttons, zippers, laces, buckles, and snaps for comprehensive self-care training.",
        description: "The 5 Page ADL Kit expands on the 4-panel version by adding a snap fastener panel, providing more comprehensive daily living skills training. Each panel features real-world fasteners that children encounter in everyday dressing, building confidence and independence.\n\nKey Features:\n- 5 activity panels including snaps\n- Comprehensive self-care training\n- Real clothing fasteners\n- Colour-coded difficulty levels\n- Durable construction for repeated use",
        specifications: { dimensions: "30cm x 30cm per panel", material: "MDF board with fabric and real fasteners" },
        features: ["5 activity panels", "Includes snaps", "Colour-coded difficulty", "Comprehensive training", "Durable construction"],
        applications: ["fine-motor", "self-care-skills", "daily-living", "comprehensive-training"],
        basePrice: 9999,
        comparePrice: 11999
      },
      {
        id: "adl-kit-6-page",
        name: "6 Page ADL Kit",
        categorySlug: "adl-kit",
        shortDescription: "Complete 6-panel ADL kit with buttons, zippers, laces, buckles, snaps, and Velcro for full self-care training.",
        description: "The 6 Page ADL Kit is the most comprehensive daily living skills training tool, featuring 6 activity panels covering buttons, zippers, laces, buckles, snaps, and Velcro closures. This complete set addresses all common clothing fastener types, making it the ideal choice for therapy centres and schools.\n\nKey Features:\n- Complete 6-panel ADL system\n- All major fastener types covered\n- Progressive difficulty across panels\n- Therapist activity guide included\n- Institutional-grade durability",
        specifications: { dimensions: "30cm x 30cm per panel", material: "MDF board with fabric and real fasteners" },
        features: ["6 activity panels", "All fastener types", "Activity guide included", "Institutional grade", "Complete training system"],
        applications: ["comprehensive-adl", "occupational-therapy", "school-therapy", "institutional-use"],
        basePrice: 11999,
        comparePrice: 14499
      }
    ]
  },
  {
    slug: "therapy-balls",
    title: "Therapy Balls",
    description: "Professional-grade therapy balls for rehabilitation. Anti-burst exercise balls designed for core strengthening, balance training, and therapeutic exercises.",
    color: "from-violet-500 to-purple-600",
    image: "https://www.ableys.in/cdn/shop/collections/ac9144caafe6e1192c8f841eb3fed291.webp?v=1764648396&width=600",
    products: [
      {
        id: "gym-ball",
        name: "Gym Ball",
        categorySlug: "therapy-balls",
        shortDescription: "Anti-burst therapy gym ball for core strengthening, balance training, and seated therapy activities.",
        description: "The Gym Ball is a professional-grade anti-burst therapy ball designed for core strengthening, balance training, and dynamic seating. Its anti-burst technology ensures safety during use — if punctured, the ball deflates slowly rather than bursting. Available in multiple sizes for different age groups.\n\nKey Features:\n- Anti-burst safety technology\n- Professional-grade PVC construction\n- Develops core strength and balance\n- Dynamic seating option\n- Pump included",
        specifications: { dimensions: "65cm diameter (also available in 45cm, 55cm, 75cm)", material: "Anti-burst PVC", weightCapacity: "300 kg" },
        features: ["Anti-burst technology", "Professional PVC", "Core strengthening", "Dynamic seating", "Pump included"],
        applications: ["core-strengthening", "balance-training", "dynamic-seating", "rehabilitation"],
        basePrice: 2499,
        comparePrice: 2999,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9720_56aab3dd-f27f-4cdc-ad81-285fd115f7a0.jpg?v=1764648162",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9715_c2f5b492-57e1-4157-8321-894f1471c241.jpg?v=1764648165"
        ],
        configOptions: {
          sizes: [
            { name: "45cm (Kids)", priceModifier: -500 },
            { name: "55cm (Youth)", priceModifier: 0 },
            { name: "65cm (Adult)", priceModifier: 500 },
            { name: "75cm (Tall)", priceModifier: 800 }
          ],
          colors: [
            { name: "Blue", hex: "#3B82F6" },
            { name: "Red", hex: "#EF4444" },
            { name: "Grey", hex: "#6B7280" }
          ]
        }
      },
      {
        id: "bosu-ball",
        name: "Bosu Ball",
        categorySlug: "therapy-balls",
        shortDescription: "Half-ball balance trainer for advanced balance, core stability, and rehabilitation exercises.",
        description: "The Bosu Ball is a half-ball balance trainer that provides an unstable surface for advanced balance and core stability exercises. It can be used dome-side up for balance challenges or platform-side up for increased instability. Essential for progressive rehabilitation and sports therapy.\n\nKey Features:\n- Half-ball balance trainer design\n- Dual-sided use (dome up or platform up)\n- Anti-slip base platform\n- Develops advanced balance and proprioception\n- Professional grade for clinical use",
        specifications: { dimensions: "60cm diameter, 25cm height", material: "Anti-burst PVC dome with ABS platform", weightCapacity: "150 kg" },
        features: ["Dual-sided use", "Anti-slip platform", "Advanced balance training", "Proprioception development", "Clinical grade"],
        applications: ["advanced-balance", "rehabilitation", "core-stability", "sports-therapy"],
        basePrice: 5999,
        comparePrice: 6999
      },
      {
        id: "peanut-ball",
        name: "Peanut Ball",
        categorySlug: "therapy-balls",
        shortDescription: "Peanut-shaped therapy ball for stable prone positioning, core exercises, and paediatric therapy.",
        description: "The Peanut Ball has a unique peanut shape that provides greater stability than a standard therapy ball, making it ideal for prone positioning, core strengthening, and paediatric therapy. The indented centre prevents rolling, allowing children to lie across it safely for exercises.\n\nKey Features:\n- Peanut shape for enhanced stability\n- Anti-roll centre indentation\n- Anti-burst construction\n- Ideal for prone positioning\n- Supports paediatric therapy needs",
        specifications: { dimensions: "60cm x 30cm", material: "Anti-burst PVC", weightCapacity: "150 kg" },
        features: ["Peanut shape stability", "Anti-roll design", "Anti-burst PVC", "Prone positioning", "Paediatric friendly"],
        applications: ["prone-positioning", "core-exercises", "paediatric-therapy", "stability-training"],
        basePrice: 3999,
        comparePrice: 4799,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_dc914207-e215-477d-8898-663d14b1d459.jpg?v=1763974508",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_22423caf-ed1b-49cb-84bb-0875652eb904.jpg?v=1763974508"
        ],
        configOptions: {
          colors: [
            { name: "Blue", hex: "#3B82F6" },
            { name: "Pink", hex: "#EC4899" },
            { name: "Green", hex: "#22C55E" }
          ]
        }
      },
      {
        id: "medicine-ball",
        name: "Medicine Ball",
        categorySlug: "therapy-balls",
        shortDescription: "Textured medicine ball for strength training, proprioceptive input, and coordination exercises.",
        description: "The Medicine Ball provides weighted resistance for strength training, proprioceptive input, and coordination exercises. The textured anti-slip surface ensures a secure grip during throwing, catching, and lifting activities. Available in multiple weights for progressive training.\n\nKey Features:\n- Textured anti-slip surface\n- Heavy-duty rubber construction\n- Progressive weight options\n- Proprioceptive input through weight\n- Suitable for throwing and catching drills",
        specifications: { dimensions: "23cm diameter", material: "Heavy-duty textured rubber", useCase: "Therapy centres, rehabilitation" },
        features: ["Anti-slip texture", "Heavy-duty rubber", "Progressive weights", "Proprioceptive input", "Throwing drills"],
        applications: ["strength-training", "proprioceptive-input", "coordination", "rehabilitation"],
        basePrice: 2999,
        comparePrice: 3499,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9554_890bb31e-be75-45aa-965a-1822aa82aace.jpg?v=1764648214",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen5_cb5acb86-cf39-46ae-96f1-5ff415b5e872.jpg?v=1764648217"
        ],
        configOptions: {
          sizes: [
            { name: "1 kg", priceModifier: -1000 },
            { name: "2 kg", priceModifier: -500 },
            { name: "3 kg", priceModifier: 0 },
            { name: "4 kg", priceModifier: 500 }
          ]
        }
      }
    ]
  },
  {
    slug: "deep-pressure",
    title: "Deep Pressure",
    description: "Weighted products for proprioceptive input and calming. Professional deep pressure tools designed to promote self-regulation, focus, and sensory processing.",
    color: "from-indigo-500 to-blue-700",
    image: "https://www.ableys.in/cdn/shop/collections/d54b0da028da766a971956a5fd21b53b.webp?v=1764648396&width=600",
    products: [
      {
        id: "weighted-vest",
        name: "Weighted Vest",
        categorySlug: "deep-pressure",
        shortDescription: "Adjustable weighted compression vest with removable weights for calming deep pressure input.",
        description: "The Weighted Vest provides calming deep pressure input through evenly distributed removable weights. The compression design offers a hug-like sensation that helps children with sensory processing difficulties, ADHD, and autism to self-regulate and maintain focus. Adjustable straps ensure a comfortable, customized fit.\n\nKey Features:\n- Removable weight inserts for customization\n- Breathable mesh construction\n- Adjustable compression straps\n- Discreet design wearable under clothing\n- Promotes calming and focus",
        specifications: { dimensions: "Available in S/M/L", material: "Neoprene with mesh panels, removable steel weights", weight: "0.9-1.4 kg of removable weights" },
        features: ["Removable weights", "Breathable mesh", "Adjustable straps", "Discreet design", "Calming effect"],
        applications: ["deep-pressure", "self-regulation", "focus-support", "calming"],
        basePrice: 3999,
        comparePrice: 4999,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_98o8p098o8p098o8_1.png?v=1764648068",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-weighted-vest-for-kids-studio-front-blue-therapeutic-badge.jpg?v=1765454795"
        ],
        configOptions: {
          sizes: [
            { name: "Small (2-4 years)", priceModifier: 0 },
            { name: "Medium (5-9 years)", priceModifier: 500 },
            { name: "Large (10-12 years)", priceModifier: 1000 }
          ],
          colors: [
            { name: "Blue", hex: "#3B82F6" },
            { name: "Grey", hex: "#6B7280" },
            { name: "Black", hex: "#1F2937" }
          ]
        }
      },
      {
        id: "weighted-blanket",
        name: "Weighted Blanket",
        categorySlug: "deep-pressure",
        shortDescription: "Therapeutic weighted blanket providing even deep pressure for calming, sleep support, and anxiety reduction.",
        description: "The Weighted Blanket provides evenly distributed deep pressure across the body, simulating the feeling of being held or hugged. This proprioceptive input promotes the release of serotonin and melatonin, supporting calming, relaxation, and better sleep quality. Ideal for therapy sessions and home use.\n\nKey Features:\n- Evenly distributed glass bead filling\n- Quilted pockets prevent weight shifting\n- Soft microfiber outer cover\n- Machine washable cover\n- Promotes sleep and calming",
        specifications: { dimensions: "100cm x 150cm", material: "Microfiber cover with glass bead filling", weight: "2.3-4.5 kg options" },
        features: ["Glass bead filling", "Quilted pockets", "Machine washable", "Soft microfiber", "Sleep support"],
        applications: ["sleep-support", "anxiety-reduction", "calming", "deep-pressure-therapy"],
        basePrice: 4999,
        comparePrice: 5999,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/cozykids-weighted-blanket-for-kids-folded-grey-quilted-therapeutic-badge_2fca9568-55a4-4dec-85db-979060d4cb1c.jpg?v=1764648068",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/cozykids-weighted-blanket-for-kids-cute-designs-oeko-tex-microfiber-interior-ties_2a15391b-a47f-4d6f-b767-2ebb17660b94.jpg?v=1765455277"
        ],
        configOptions: {
          sizes: [
            { name: "5 lbs (2.3 kg)", priceModifier: 0 },
            { name: "7 lbs (3.2 kg)", priceModifier: 1000 },
            { name: "10 lbs (4.5 kg)", priceModifier: 2500 }
          ]
        }
      },
      {
        id: "sensory-sock",
        name: "Sensory Sock",
        categorySlug: "deep-pressure",
        shortDescription: "Full-body lycra sensory sock for deep pressure, body awareness, and calming proprioceptive input.",
        description: "The Sensory Sock is a stretchy, full-body lycra garment that provides deep pressure and proprioceptive input across the entire body. Children step inside and the fabric conforms to their body, creating resistance during movement that enhances body awareness, motor planning, and calming. The breathable fabric allows extended use.\n\nKey Features:\n- Full-body lycra enclosure\n- Deep pressure across entire body\n- Resistance during movement\n- Breathable stretch fabric\n- Develops body awareness and motor planning",
        specifications: { dimensions: "Available in S/M/L/XL", material: "4-way stretch lycra fabric" },
        features: ["Full-body enclosure", "Deep pressure input", "Movement resistance", "Breathable fabric", "Body awareness"],
        applications: ["deep-pressure", "body-awareness", "motor-planning", "calming"],
        basePrice: 2999,
        comparePrice: 3699,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-blue-girl-therapeutic-badge-recommended_5da5095a-704b-46da-9ece-93365e69d3f4.jpg?v=1764647672",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-bedroom-two-kids-blue-and-dino-print_2b4843d4-576a-4a18-8019-b5abf0090187.jpg?v=1765523744"
        ],
        configOptions: {
          sizes: [
            { name: "Small (3-5 years)", priceModifier: 0 },
            { name: "Medium (5-8 years)", priceModifier: 300 },
            { name: "Large (8-12 years)", priceModifier: 600 },
            { name: "XL (12+ years)", priceModifier: 900 }
          ],
          colors: [
            { name: "Blue", hex: "#3B82F6" },
            { name: "Purple", hex: "#8B5CF6" },
            { name: "Green", hex: "#22C55E" }
          ]
        }
      },
      {
        id: "lap-pad",
        name: "Lap Pad",
        categorySlug: "deep-pressure",
        shortDescription: "Weighted lap pad for seated calming, focus enhancement, and deep pressure during desk activities.",
        description: "The Weighted Lap Pad provides targeted deep pressure input to the legs and lower body while seated. It helps children maintain focus during desk work, circle time, or seated therapy activities by providing calming proprioceptive input. The soft minky dot texture adds tactile stimulation.\n\nKey Features:\n- Weighted for deep pressure input\n- Soft minky dot tactile surface\n- Ideal for seated activities\n- Portable size for school/therapy/home\n- Promotes focus and calming",
        specifications: { dimensions: "40cm x 25cm", material: "Minky dot fabric with glass bead filling", weight: "1.4 kg" },
        features: ["Deep pressure weighting", "Minky dot texture", "Portable size", "Seated calming", "Focus enhancement"],
        applications: ["focus-support", "seated-calming", "classroom-use", "desk-activities"],
        basePrice: 2499,
        comparePrice: 2999,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorywise-weighted-lap-pad-for-focus-blue-quilted-therapeutic-tool-machine-washable_8b588e43-9b1a-4c87-a85e-3971d35e2254.jpg?v=1764648118",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_qoaqu7qoaqu7qoa.jpg?v=1765531319"
        ]
      }
    ]
  },
  {
    slug: "visual",
    title: "Visual",
    description: "Visual sensory equipment for therapy and sensory rooms. Interactive light-based products designed for visual stimulation, calming environments, and multi-sensory experiences.",
    color: "from-cyan-500 to-blue-600",
    image: "https://www.ableys.in/cdn/shop/collections/7621adbf392c1f021d93a8048319d089.webp?v=1764648396&width=600",
    products: [
      {
        id: "hexwall-touch-light",
        name: "Hexwall Touch Light",
        categorySlug: "visual",
        shortDescription: "Interactive hexagonal wall-mounted touch lights with colour-changing response for sensory rooms.",
        description: "Hexwall Touch Lights are interactive hexagonal panels that respond to touch by changing colours. They can be mounted on walls in various configurations, creating an engaging visual sensory wall. Each panel has touch-sensitive surfaces and LED colour-changing technology, encouraging visual tracking, cause-and-effect learning, and interactive play.\n\nKey Features:\n- Touch-responsive colour-changing panels\n- Modular hexagonal design (set of 6)\n- Multiple mounting configurations\n- LED technology with long lifespan\n- USB rechargeable\n- Encourages visual tracking and interaction",
        specifications: { dimensions: "13cm per hexagon side, set of 6", material: "ABS plastic with LED array and touch sensors" },
        features: ["Touch-responsive", "Modular hexagons", "Colour changing", "LED technology", "USB rechargeable", "Set of 6"],
        applications: ["sensory-room", "visual-stimulation", "interactive-play", "cause-and-effect"],
        basePrice: 5999,
        comparePrice: 7499
      },
      {
        id: "liquid-motion-tiles",
        name: "Liquid Motion Tiles",
        categorySlug: "visual",
        shortDescription: "Interactive floor tiles with colourful liquid that moves underfoot for visual and tactile sensory input.",
        description: "Liquid Motion Tiles are interactive floor tiles containing colourful liquid that moves and shifts when stepped on, providing both visual and tactile sensory stimulation. They are ideal for sensory rooms, waiting areas, and therapy spaces, encouraging exploration, cause-and-effect understanding, and calming visual input.\n\nKey Features:\n- Colourful liquid fills that move when stepped on\n- Non-toxic, sealed liquid interior\n- Non-slip surface for safety\n- Durable construction for high traffic\n- Visual and tactile sensory input",
        specifications: { dimensions: "30cm x 30cm per tile", material: "Acrylic with non-toxic liquid fill, non-slip base" },
        features: ["Interactive liquid fill", "Non-toxic sealed", "Non-slip surface", "Durable construction", "Visual stimulation"],
        applications: ["sensory-room", "visual-input", "tactile-exploration", "cause-and-effect"],
        basePrice: 2999,
        comparePrice: 3499,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensory-shop-liquid-motion-sensory-mat-single-purple-pink-closeup-therapeutic-badge_c0901e85-8fed-436a-8f62-3b6b8b3362a7.jpg?v=1764647954",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensory-shop-liquid-motion-sensory-mat-nine-color-3x3-grid-orange-background_57b9e54d-60ea-45ea-b93e-54bdfb199ebd.jpg?v=1765455384"
        ],
        configOptions: {
          colors: [
            { name: "Blue-Green", hex: "#0EA5E9" },
            { name: "Pink-Purple", hex: "#D946EF" },
            { name: "Orange-Yellow", hex: "#F59E0B" },
            { name: "Multi-colour Pack", hex: "#10B981" }
          ]
        }
      },
      {
        id: "glitter-pad",
        name: "Glitter Pad",
        categorySlug: "visual",
        shortDescription: "Handheld glitter sensory pad with swirling glitter particles for visual calming and focus.",
        description: "The Glitter Pad is a handheld sensory tool filled with liquid and glitter particles. When tilted or shaken, the glitter swirls and slowly settles, providing calming visual input. It can be used as a visual timer, calming tool, or visual stimulation device during therapy sessions.\n\nKey Features:\n- Sealed liquid-filled pad with glitter\n- Calming swirling visual effect\n- Durable leak-proof construction\n- Visual timer functionality\n- Portable and handheld",
        specifications: { dimensions: "20cm x 15cm x 2cm", material: "Acrylic panel with non-toxic liquid and glitter fill" },
        features: ["Swirling glitter effect", "Leak-proof", "Calming visual input", "Visual timer use", "Portable"],
        applications: ["visual-calming", "focus-tool", "visual-timer", "sensory-therapy"],
        basePrice: 1499,
        comparePrice: 1799
      },
      {
        id: "glitter-capillary",
        name: "Glitter Capillary",
        categorySlug: "visual",
        shortDescription: "Tall capillary tube with cascading glitter and bubbles for mesmerising visual sensory experience.",
        description: "The Glitter Capillary is a tall, transparent tube filled with liquid, glitter, and coloured beads that cascade slowly when inverted. It provides mesmerising visual input that promotes sustained attention, calming, and visual tracking. Ideal for sensory corners, waiting rooms, and therapy spaces.\n\nKey Features:\n- Tall transparent capillary tube\n- Cascading glitter and beads\n- Sustained visual attention tool\n- Calming and mesmerising effect\n- Durable sealed construction",
        specifications: { dimensions: "30cm height x 5cm diameter", material: "Acrylic tube with liquid, glitter, and beads" },
        features: ["Cascading effect", "Visual tracking", "Calming tool", "Sustained attention", "Sealed construction"],
        applications: ["visual-tracking", "calming", "sustained-attention", "sensory-corner"],
        basePrice: 1999,
        comparePrice: 2499
      },
      {
        id: "fibre-light",
        name: "Fibre Light",
        categorySlug: "visual",
        shortDescription: "Fibre optic light spray with colour-changing LEDs for tactile visual exploration in sensory rooms.",
        description: "The Fibre Light is a fibre optic spray light source with multiple colour-changing strands. Children can hold, drape, and explore the safe, cool-to-touch fibre optic strands while experiencing cycling colour changes. It provides both visual and tactile sensory input in a safe, engaging format.\n\nKey Features:\n- Multiple fibre optic strands\n- Colour-changing LED light source\n- Safe cool-to-touch strands\n- Visual and tactile stimulation\n- Multiple colour modes and speeds",
        specifications: { dimensions: "200 strands, 200cm length", material: "PMMA fibre optic strands with LED light engine" },
        features: ["Colour-changing strands", "Cool to touch", "Visual stimulation", "Tactile exploration", "Multiple modes"],
        applications: ["sensory-room", "visual-exploration", "tactile-input", "calming"],
        basePrice: 8999,
        comparePrice: 10999,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_563a4bc1-9dbd-4f35-9de3-0d8ce1a26967.jpg?v=1764647955",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_fa2d482f-cf73-48c7-b3f2-631af1c6ed75.jpg?v=1764647958"
        ]
      },
      {
        id: "bubble-tube",
        name: "Bubble Tube",
        categorySlug: "visual",
        shortDescription: "LED bubble column with colour-changing bubbles for calming visual and auditory sensory room experience.",
        description: "The Bubble Tube is a cornerstone of sensory room design. This tall, illuminated column filled with water produces a continuous stream of bubbles that change colour through LED cycling. The gentle bubbling sound and shifting colours create a calming, multi-sensory experience that promotes relaxation, visual tracking, and sustained attention.\n\nKey Features:\n- LED colour-changing illumination\n- Continuous bubble stream\n- Calming auditory bubble sounds\n- Multiple colour modes\n- Professional-grade for therapy rooms\n- Remote control included",
        specifications: { dimensions: "120cm height x 10cm diameter", material: "Acrylic tube with LED light ring and air pump" },
        features: ["Colour-changing LEDs", "Continuous bubbles", "Auditory feedback", "Remote control", "Professional grade"],
        applications: ["sensory-room", "calming", "visual-tracking", "multi-sensory"],
        basePrice: 24999,
        comparePrice: 29999,
        images: [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_f169ba89-3192-47c3-8f27-6c3f543bfd72.jpg?v=1770267207",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_d715a6ac-7cd9-46ff-bb6c-ca978769d0a1.jpg?v=1770382581"
        ],
        configOptions: {
          sizes: [
            { name: "90cm (Mini)", priceModifier: -8000 },
            { name: "120cm (Standard)", priceModifier: 0 },
            { name: "150cm (Tall)", priceModifier: 8000 }
          ]
        }
      }
    ]
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductBySlug(slug: string): CatalogueProduct | undefined {
  for (const cat of categories) {
    const product = cat.products.find((p) => p.id === slug);
    if (product) return product;
  }
  return undefined;
}

export function getProductCategory(product: CatalogueProduct): Category | undefined {
  return categories.find((c) => c.slug === product.categorySlug);
}

export function getAllProducts(): CatalogueProduct[] {
  return categories.flatMap((c) => c.products);
}

export function calculateProductPrice(
  product: CatalogueProduct,
  config?: { material?: string; size?: string; addons?: string[] }
): number {
  let price = product.basePrice;
  if (config && product.configOptions) {
    if (config.material && product.configOptions.materials) {
      const mat = product.configOptions.materials.find((m) => m.name === config.material);
      if (mat) price += mat.priceModifier;
    }
    if (config.size && product.configOptions.sizes) {
      const sz = product.configOptions.sizes.find((s) => s.name === config.size);
      if (sz) price += sz.priceModifier;
    }
    if (config.addons && product.configOptions.addons) {
      for (const addon of config.addons) {
        const ao = product.configOptions.addons.find((a) => a.name === addon);
        if (ao) price += ao.price;
      }
    }
  }
  return price;
}

export function getDiscountPercent(product: CatalogueProduct): number | null {
  if (!product.comparePrice || product.comparePrice <= product.basePrice) return null;
  return Math.round(((product.comparePrice - product.basePrice) / product.comparePrice) * 100);
}

export function getNewArrivals(): CatalogueProduct[] {
  const all = getAllProducts();
  return all.filter(p => p.comparePrice && p.comparePrice > p.basePrice).slice(0, 8);
}

export function getBestSellers(): CatalogueProduct[] {
  const all = getAllProducts();
  const withDiscount = all.filter(p => p.comparePrice && p.comparePrice > p.basePrice);
  return withDiscount.sort((a, b) => {
    const dA = getDiscountPercent(a) || 0;
    const dB = getDiscountPercent(b) || 0;
    return dB - dA;
  }).slice(0, 8);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
