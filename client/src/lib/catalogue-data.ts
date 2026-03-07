export interface ProductSpec {
  dimensions?: string;
  material?: string;
  weightCapacity?: string;
  useCase?: string;
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

export interface CatalogueProduct {
  id: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  specifications: ProductSpec;
  features: string[];
  applications: string[];
  basePrice: number;
  configOptions?: ConfigOptions;
  images?: string[];
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  color: string;
  products: CatalogueProduct[];
}

function makeProduct(
  name: string,
  categorySlug: string,
  shortDesc: string,
  desc: string,
  specs: ProductSpec,
  features: string[],
  applications: string[],
  basePrice: number,
  configOptions?: ConfigOptions,
  images?: string[]
): CatalogueProduct {
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""),
    name,
    categorySlug,
    shortDescription: shortDesc,
    description: desc,
    specifications: specs,
    features,
    applications,
    basePrice,
    configOptions,
    images,
  };
}

const swingColors: ColorOption[] = [
  { name: "Royal Blue", hex: "#1E40AF" },
  { name: "Forest Green", hex: "#166534" },
  { name: "Sunset Orange", hex: "#EA580C" },
  { name: "Berry Red", hex: "#BE123C" },
];

const swingMaterials: VariantOption[] = [
  { name: "Standard Vinyl", priceModifier: 0 },
  { name: "Premium PVC-Free Vinyl", priceModifier: 800 },
  { name: "Soft Fabric Cover", priceModifier: 500 },
];

const swingAddons: AddonOption[] = [
  { name: "Ceiling Mount Hardware", price: 1200 },
  { name: "Extra Carabiner Set", price: 450 },
  { name: "Protective Floor Mat", price: 1800 },
];

const matColors: ColorOption[] = [
  { name: "Charcoal Grey", hex: "#374151" },
  { name: "Navy Blue", hex: "#1E3A5F" },
  { name: "Forest Green", hex: "#166534" },
  { name: "Burgundy", hex: "#881337" },
];

export const categories: Category[] = [
  {
    slug: "swings",
    title: "Swings",
    description: "Vestibular input swings for therapy and sensory integration. Designed for clinics, sensory gyms, and therapy centres.",
    color: "from-blue-500/10 to-indigo-500/10",
    products: [
      makeProduct("Bolster Swing", "swings", "Heavy-duty bolster swing for vestibular therapy.", "The Bolster Swing provides controlled vestibular input, helping develop balance and coordination. Ideal for OT sessions focusing on sensory integration and motor planning.", { dimensions: "120cm x 30cm", material: "High-density foam, PVC-free vinyl cover", weightCapacity: "90 kg", useCase: "Vestibular therapy, sensory integration" }, ["Reinforced stitching", "Quick-release carabiner mount", "Easy-clean surface", "Adjustable height"], ["Occupational therapy", "Sensory integration", "Vestibular stimulation", "Motor planning"], 4500, { colors: swingColors, materials: swingMaterials, addons: swingAddons }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_1_a43ed9ee-1c32-4081-9b0c-9e423b5538a8.jpg?v=1766662698", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_2_16e10b4d-8fcb-46c4-ba7e-44cb2526ff78.jpg?v=1766662699", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_3_f21e0d3b-6cf5-48c8-91b4-21613cb6417d.jpg?v=1766662698", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_4_9b2e228d-e023-49a8-b9d4-1e5458745416.jpg?v=1766662699"]),
      makeProduct("T Swing", "swings", "T-shaped swing for bilateral coordination training.", "The T Swing supports prone extension and bilateral coordination exercises. Its unique T-shape allows therapists to work on upper body strength and motor planning.", { dimensions: "90cm x 60cm", material: "Padded vinyl, steel frame", weightCapacity: "80 kg", useCase: "Bilateral coordination, prone extension" }, ["Padded comfort surface", "Durable suspension points", "Compact design", "Safe rounded edges"], ["Prone extension therapy", "Upper body strengthening", "Bilateral coordination", "Sensory processing"], 3800, { colors: swingColors, materials: swingMaterials, addons: swingAddons }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_10.jpg?v=1768027428", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_6.jpg?v=1768027428", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_7.jpg?v=1768027428", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_8.jpg?v=1768027428"]),
      makeProduct("Disc Swing", "swings", "Circular platform swing for rotational vestibular input.", "The Disc Swing offers rotational and linear vestibular stimulation. The flat circular platform allows for seated, standing, or prone positions during therapy.", { dimensions: "60cm diameter", material: "Reinforced plastic, rope suspension", weightCapacity: "80 kg", useCase: "Rotational vestibular input" }, ["360-degree rotation", "Non-slip surface", "Adjustable rope length", "Lightweight design"], ["Vestibular therapy", "Balance training", "Sensory modulation", "Recreational therapy"], 3200, { colors: [{ name: "Sky Blue", hex: "#0EA5E9" }, { name: "Lime Green", hex: "#65A30D" }, { name: "Orange", hex: "#EA580C" }], addons: swingAddons }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_2.jpg?v=1764648162", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_1.jpg?v=1764648165", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_1.jpg?v=1764648167", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_1.jpg?v=1764648168"]),
      makeProduct("Platform Swing", "swings", "Large platform swing for multi-position therapy.", "The Platform Swing accommodates multiple therapy positions including sitting, standing, lying prone, or kneeling. Suitable for individual or paired therapy sessions.", { dimensions: "120cm x 60cm", material: "Wooden platform, padded edges, rope suspension", weightCapacity: "120 kg", useCase: "Multi-position vestibular therapy" }, ["Wide stable platform", "Padded safety edges", "Four-point suspension", "Heavy-duty construction"], ["Group therapy", "Vestibular stimulation", "Core strengthening", "Sensory integration"], 6800, { colors: [{ name: "Natural Wood", hex: "#D4A574" }, { name: "White", hex: "#F5F5F5" }], addons: [...swingAddons, { name: "Safety Harness", price: 1500 }] }),
      makeProduct("Tube Swing", "swings", "Enclosed tube swing for deep pressure and vestibular input.", "The Tube Swing combines deep pressure input with vestibular stimulation. The enclosed design provides a calming, secure environment for children who need proprioceptive feedback.", { dimensions: "150cm length, 50cm diameter", material: "Lycra fabric, foam padding", weightCapacity: "70 kg", useCase: "Deep pressure + vestibular input" }, ["Calming enclosed design", "Breathable fabric", "Secure suspension", "Machine washable cover"], ["Deep pressure therapy", "Calming sensory input", "Anxiety reduction", "Proprioceptive feedback"], 5200, { colors: swingColors, materials: [{ name: "Standard Lycra", priceModifier: 0 }, { name: "Premium Breathable Lycra", priceModifier: 600 }], addons: swingAddons }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-187ol789l_dd7b9170-2401-4fe7-84f8-db80f45bde8f.jpg?v=1763019394", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/tubeswing7b7yt_db67f4b7-1e68-4b7b-98c5-b7759d3e3c94.jpg?v=1763019394", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1ghrthr_df42323a-7c99-4daf-8912-a69d50dfb4f2.jpg?v=1763019394", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1htrthr_3000de57-22db-4bce-a30d-eb6b563b230e.jpg?v=1763019394"]),
      makeProduct("Lycra Swing", "swings", "Stretchy fabric swing for full-body sensory compression.", "The Lycra Swing wraps around the body providing proprioceptive input and deep pressure. Its stretchy fabric allows for varied movement patterns and body positions.", { dimensions: "200cm x 100cm", material: "4-way stretch Lycra, reinforced seams", weightCapacity: "70 kg", useCase: "Proprioceptive input, calming" }, ["Full-body compression", "Breathable stretch fabric", "Reinforced attachment point", "Washable material"], ["Sensory modulation", "Calming therapy", "Proprioceptive input", "Self-regulation"], 3900, { colors: [{ name: "Purple", hex: "#7C3AED" }, { name: "Teal", hex: "#0D9488" }, { name: "Pink", hex: "#EC4899" }, { name: "Blue", hex: "#3B82F6" }], addons: swingAddons }),
      makeProduct("Acrobat Swing", "swings", "Multi-position acrobat swing for advanced therapy.", "The Acrobat Swing supports dynamic movement patterns including spinning, swinging, and inversion. Designed for advanced vestibular therapy and motor planning exercises.", { dimensions: "Adjustable, 80cm bar width", material: "Steel bar, padded grips, rope suspension", weightCapacity: "90 kg", useCase: "Advanced vestibular therapy" }, ["Multi-position capability", "Padded grip handles", "Height adjustable", "Professional-grade hardware"], ["Advanced vestibular training", "Motor planning", "Upper body strength", "Coordination therapy"], 5500, { colors: [{ name: "Silver", hex: "#9CA3AF" }, { name: "Black", hex: "#1F2937" }], addons: swingAddons }),
    ],
  },
  {
    slug: "ballpool",
    title: "Ballpool",
    description: "Therapeutic ballpools for sensory rooms and clinics. Safe, durable construction for institutional use.",
    color: "from-violet-500/10 to-purple-500/10",
    products: [
      makeProduct("4x4 Ballpool", "ballpool", "Compact 4x4 foot ballpool for smaller therapy spaces.", "The 4x4 Ballpool is designed for smaller therapy rooms and clinics. Features reinforced walls, padded interior, and easy-clean surfaces. Balls sold separately.", { dimensions: "120cm x 120cm x 60cm", material: "PVC-free vinyl, high-density foam walls", weightCapacity: "150 kg", useCase: "Sensory rooms, small clinics" }, ["Padded interior walls", "Anti-microbial surface", "Easy-clean vinyl", "Collapsible design"], ["Tactile stimulation", "Sensory integration", "Motor planning", "Recreational therapy"], 12500, { colors: [{ name: "Blue", hex: "#3B82F6" }, { name: "Green", hex: "#22C55E" }, { name: "Red", hex: "#EF4444" }], addons: [{ name: "500 Balls (Mixed Colors)", price: 3500 }, { name: "1000 Balls (Mixed Colors)", price: 6000 }, { name: "Protective Cover", price: 1800 }] }),
      makeProduct("6x4 Ballpool", "ballpool", "Large 6x4 foot ballpool for group therapy sessions.", "The 6x4 Ballpool accommodates multiple children simultaneously, ideal for group therapy. Reinforced construction withstands institutional use.", { dimensions: "180cm x 120cm x 60cm", material: "PVC-free vinyl, reinforced foam walls", weightCapacity: "200 kg", useCase: "Group therapy, sensory gyms" }, ["Extra-large capacity", "Reinforced wall construction", "Easy-drain floor design", "Anti-microbial coating"], ["Group sensory therapy", "Tactile exploration", "Social interaction therapy", "Motor development"], 18500, { colors: [{ name: "Blue", hex: "#3B82F6" }, { name: "Green", hex: "#22C55E" }, { name: "Multi-color", hex: "#F59E0B" }], addons: [{ name: "1000 Balls (Mixed Colors)", price: 6000 }, { name: "2000 Balls (Mixed Colors)", price: 10000 }, { name: "Protective Cover", price: 2500 }] }),
    ],
  },
  {
    slug: "mats",
    title: "Mats",
    description: "Safety and therapy mats for professional environments. Available in various sizes and densities.",
    color: "from-emerald-500/10 to-teal-500/10",
    products: [
      makeProduct("Crash Mat", "mats", "High-impact crash mat for safe landings and sensory input.", "The Crash Mat provides a safe landing surface for jumping, rolling, and crash activities. High-density foam absorbs impact while providing proprioceptive feedback.", { dimensions: "180cm x 120cm x 20cm", material: "High-density foam, vinyl cover", weightCapacity: "150 kg impact", useCase: "Crash activities, safe landings" }, ["High-impact absorption", "Non-slip base", "Carry handles", "Easy-clean cover"], ["Sensory seeking activities", "Safe crash landing", "Proprioceptive input", "Gross motor therapy"], 7500, { colors: matColors, sizes: [{ name: "Standard (180x120cm)", priceModifier: 0 }, { name: "Large (240x150cm)", priceModifier: 3500 }], addons: [{ name: "Replacement Cover", price: 2200 }] }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-687l799p_5517468c-2f14-472f-8e25-040031e57d66.jpg?v=1763022357", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-rgher789ol797_7fbb6b03-2b39-401a-95b1-61bef987fd4a.jpg?v=1763022357", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-rtrtrh6jh6t6_0c8a23f6-783e-4ee1-b094-f8d409c11d7c.jpg?v=1763022357", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-rtrtrh45ytg54yhg5_5502eaba-ab14-4173-8cb3-2c96b9b03cb9.jpg?v=1763022357"]),
      makeProduct("Therapy Mat", "mats", "Versatile therapy mat for floor-based exercises.", "The Therapy Mat provides a comfortable, supportive surface for floor-based therapy activities. Suitable for stretching, rolling, and developmental exercises.", { dimensions: "180cm x 120cm x 5cm", material: "Closed-cell foam, vinyl cover", weightCapacity: "200 kg", useCase: "Floor therapy, exercises" }, ["Non-slip surface", "Waterproof cover", "Lightweight and portable", "Rounded corners"], ["Floor-based therapy", "Stretching exercises", "Developmental activities", "Yoga and movement"], 4200, { colors: matColors, sizes: [{ name: "Standard (180x120cm)", priceModifier: 0 }, { name: "Large (240x120cm)", priceModifier: 1800 }] }),
      makeProduct("Floormat", "mats", "Wall-to-wall floor matting for therapy rooms.", "Floormat provides complete room coverage for maximum safety. Ideal for dedicated therapy spaces requiring full floor protection.", { dimensions: "Custom sizes available", material: "EVA foam, anti-slip surface", weightCapacity: "N/A", useCase: "Full room coverage" }, ["Custom sizing available", "Interlocking edges", "Anti-slip surface", "Shock absorbing"], ["Therapy room flooring", "Sensory gym setup", "Fall protection", "Room-wide safety"], 850, { colors: [{ name: "Grey", hex: "#6B7280" }, { name: "Blue", hex: "#3B82F6" }, { name: "Green", hex: "#22C55E" }] }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/SW003663copy_9f324e7c-08a2-4987-a059-fdd7fd544720.jpg?v=1763106152", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/03_2782acd9-61fc-4c06-93ca-878d85089656.jpg?v=1763106152", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/SW003653copy_c3a4f900-6d86-44ce-8a3d-3182f5236afd.jpg?v=1763106152", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/04_887c53bf-0abc-4c65-ad50-8df1ad9cf260.jpg?v=1763106113"]),
      makeProduct("Interlocking Mat", "mats", "Modular interlocking tiles for flexible floor coverage.", "Interlocking Mat tiles allow customizable floor coverage. Easy to install, replace, and reconfigure as therapy needs change.", { dimensions: "60cm x 60cm per tile, 2cm thick", material: "High-density EVA foam", weightCapacity: "N/A", useCase: "Modular flooring" }, ["Easy snap-together assembly", "Replaceable individual tiles", "Multiple color options", "Edge strips included"], ["Modular therapy spaces", "Play area flooring", "Gym flooring", "Multi-purpose rooms"], 450, { colors: [{ name: "Grey", hex: "#6B7280" }, { name: "Blue", hex: "#3B82F6" }, { name: "Red", hex: "#EF4444" }, { name: "Green", hex: "#22C55E" }] }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-TYJKYKYU_9daeb4cf-edf8-4795-83ab-aa23924ccf73.jpg?v=1763019822", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1uyu8ih7_7764e008-19d7-4f6b-abef-3591f9f86cfb.jpg?v=1763019822", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1uyu8jn9_41719120-67e6-4885-b46c-0c0c57b31bcd.jpg?v=1763019822", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1uyu846uj6556j_63a97beb-fd85-4d60-bc43-0970fbb29c22.jpg?v=1763019822"]),
      makeProduct("Foldable Mat", "mats", "Portable folding mat for mobile therapy sessions.", "The Foldable Mat folds into compact sections for easy transport and storage. Ideal for therapists who work across multiple locations.", { dimensions: "180cm x 60cm x 5cm (folded: 60cm x 60cm x 15cm)", material: "Tri-fold foam, vinyl cover", weightCapacity: "150 kg", useCase: "Portable therapy" }, ["Tri-fold compact design", "Carry handle", "Non-slip base", "Easy storage"], ["Home therapy visits", "Multi-location therapy", "Portable sessions", "School-based therapy"], 3200, { colors: matColors }),
    ],
  },
  {
    slug: "movement-balance",
    title: "Movement & Balance",
    description: "Motor planning and balance training equipment. Professional-grade tools for developing coordination and strength.",
    color: "from-amber-500/10 to-orange-500/10",
    products: [
      makeProduct("Kidlite Barrel", "movement-balance", "Therapy barrel for core strengthening and balance.", "The Kidlite Barrel helps develop core strength, balance, and body awareness. Can be used for rolling, sitting, and prone extension exercises.", { dimensions: "60cm diameter x 90cm length", material: "Reinforced PVC, foam padding", weightCapacity: "80 kg", useCase: "Core therapy, rolling exercises" }, ["Lightweight yet durable", "Textured grip surface", "Easy-clean material", "Bright professional colours"], ["Core strengthening", "Vestibular activities", "Prone extension", "Balance training"], 5800, { colors: [{ name: "Blue", hex: "#3B82F6" }, { name: "Yellow", hex: "#EAB308" }, { name: "Red", hex: "#EF4444" }] }),
      makeProduct("Balance Board", "movement-balance", "Wobble balance board for stability training.", "The Balance Board challenges balance and coordination through controlled instability. Adjustable difficulty makes it suitable for various therapy levels.", { dimensions: "40cm diameter", material: "Non-slip wood, rubber base", weightCapacity: "100 kg", useCase: "Balance and stability training" }, ["Non-slip surface", "Adjustable difficulty", "Durable hardwood", "Safe rounded edges"], ["Balance training", "Ankle rehabilitation", "Core stability", "Proprioceptive training"], 2800, undefined, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9796_bd82fe01-e81e-4d39-a553-b1222ef7f681.jpg?v=1764648264", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen-2025-11-11T110002.86.jpg?v=1764648266", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen-2025-11-11T110008.15.jpg?v=1764648269", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9790_3f4dce02-4459-47ad-aad8-f7b6ed22a3d7.jpg?v=1764648271"]),
      makeProduct("Balance Beam", "movement-balance", "Low-profile balance beam for walking exercises.", "The Balance Beam develops dynamic balance and coordination. Low profile design ensures safety while providing challenging balance activities.", { dimensions: "240cm x 10cm x 8cm", material: "Hardwood, anti-slip surface", weightCapacity: "80 kg", useCase: "Dynamic balance, walking exercises" }, ["Low profile for safety", "Non-slip walking surface", "Sturdy construction", "Stackable design"], ["Dynamic balance", "Gait training", "Coordination therapy", "Motor planning"], 3500),
      makeProduct("Stepping Stone", "movement-balance", "Textured stepping stones for motor planning paths.", "Stepping Stones create motor planning obstacle courses. Various heights and textures provide different sensory and balance challenges.", { dimensions: "Set of 6, various heights (5-15cm)", material: "Durable plastic, rubber base", weightCapacity: "60 kg each", useCase: "Motor planning, obstacle courses" }, ["Non-slip rubber base", "Stackable for storage", "Varied heights", "Textured surfaces"], ["Motor planning", "Balance activities", "Obstacle courses", "Foot proprioception"], 2200, undefined, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-26at5.11.10PM.jpg?v=1766749713", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-26at5.11.11PM.jpg?v=1766749713", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-26at5.11.10PM_2.jpg?v=1766749713", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-26at5.11.10PM_1.jpg?v=1766749713"]),
      makeProduct("Wedges", "movement-balance", "Therapy wedges for positioning and incline exercises.", "Therapy Wedges provide angled support for various therapy positions. Essential for prone work, sitting support, and incline activities.", { dimensions: "60cm x 60cm x 30cm", material: "High-density foam, vinyl cover", weightCapacity: "100 kg", useCase: "Positioning, incline therapy" }, ["Multiple angle options", "Non-slip cover", "Lightweight foam", "Easy-clean surface"], ["Positioning support", "Prone extension", "Incline exercises", "Seating support"], 3200, { colors: matColors, sizes: [{ name: "Small (45x45x20cm)", priceModifier: -800 }, { name: "Standard (60x60x30cm)", priceModifier: 0 }, { name: "Large (90x60x40cm)", priceModifier: 1500 }] }),
      makeProduct("Jumping Stool", "movement-balance", "Spring-loaded stool for jumping and bouncing therapy.", "The Jumping Stool provides controlled bouncing and jumping activities. Develops lower body strength, coordination, and sensory regulation.", { dimensions: "30cm diameter, 25cm height", material: "ABS plastic, spring mechanism", weightCapacity: "60 kg", useCase: "Jumping, bouncing therapy" }, ["Controlled bounce mechanism", "Non-slip base", "Durable construction", "Quiet operation"], ["Lower body strengthening", "Vestibular input", "Energy regulation", "Coordination therapy"], 1800),
      makeProduct("Trampoline", "movement-balance", "Therapy trampoline with safety handle.", "The Therapy Trampoline provides controlled bouncing for vestibular input and motor planning. Safety handle provides stability for children needing additional support.", { dimensions: "90cm diameter", material: "Steel frame, polypropylene mat, foam padding", weightCapacity: "80 kg", useCase: "Vestibular therapy, bouncing" }, ["Safety handlebar included", "Padded frame cover", "Non-slip feet", "Quiet bounce mat"], ["Vestibular stimulation", "Motor planning", "Lower body strength", "Sensory regulation"], 6500, undefined, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_3_4.jpg?v=1767097014", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_b54f58b5-845b-4376-bb3e-a1866f44db4f.jpg?v=1767097014", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_d13199af-e206-4435-ba0d-2862b13d0041.jpg?v=1767097014", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen-2025-11-11T131430.91.jpg?v=1767097014"]),
      makeProduct("Ramp & Stairs", "movement-balance", "Combined ramp and stair unit for gross motor activities.", "The Ramp & Stairs unit develops climbing skills, motor planning, and body awareness. Reversible design offers both ramp and stair options.", { dimensions: "120cm x 60cm x 45cm", material: "Plywood, foam padding, vinyl cover", weightCapacity: "100 kg", useCase: "Climbing, gross motor development" }, ["Reversible ramp/stair design", "Padded safety edges", "Non-slip surfaces", "Lightweight portable design"], ["Gross motor development", "Motor planning", "Climbing skills", "Body awareness"], 8500, { colors: matColors }),
    ],
  },
  {
    slug: "climbing",
    title: "Climbing",
    description: "Climbing structures for strength and coordination. Built for institutional safety standards.",
    color: "from-rose-500/10 to-pink-500/10",
    products: [
      makeProduct("Climb Board", "climbing", "Inclined climbing board with adjustable hand holds.", "The Climb Board develops upper body strength, grip strength, and motor planning. Adjustable angle allows progressive difficulty for therapy programs.", { dimensions: "180cm x 60cm", material: "Baltic birch plywood, resin holds", weightCapacity: "100 kg", useCase: "Climbing therapy, upper body strength" }, ["Adjustable incline angle", "Interchangeable hand holds", "Wall-mount brackets included", "Sanded smooth finish"], ["Upper body strengthening", "Grip strength development", "Motor planning", "Coordination therapy"], 9500),
      makeProduct("Wall Bar Ladder", "climbing", "Wall-mounted ladder for climbing and stretching.", "The Wall Bar Ladder provides vertical climbing, hanging, and stretching opportunities. A staple in therapy rooms for developing strength and body awareness.", { dimensions: "240cm x 80cm", material: "Hardwood rungs, steel brackets", weightCapacity: "120 kg", useCase: "Climbing, hanging, stretching" }, ["Wall-mount installation", "Rounded wooden rungs", "Heavy-duty steel brackets", "Professional finish"], ["Vertical climbing", "Hanging exercises", "Stretching therapy", "Upper body development"], 12000),
      makeProduct("Spider Climb Net", "climbing", "Rope climbing net for multi-directional climbing.", "The Spider Climb Net offers multi-directional climbing challenges. Develops grip strength, motor planning, and bilateral coordination in a fun, engaging format.", { dimensions: "180cm x 180cm", material: "Braided nylon rope, steel frame", weightCapacity: "100 kg", useCase: "Multi-directional climbing" }, ["UV-resistant rope", "Steel mounting frame", "Adjustable tension", "Safe knotted intersections"], ["Multi-directional climbing", "Grip strength", "Motor planning", "Bilateral coordination"], 8500),
    ],
  },
  {
    slug: "adl-kit",
    title: "ADL Kit",
    description: "Activities of Daily Living kits for functional training. Complete practice sets for OT skill building.",
    color: "from-cyan-500/10 to-sky-500/10",
    products: [
      makeProduct("4 Page Kit", "adl-kit", "Basic ADL practice kit with 4 activity pages.", "The 4 Page ADL Kit covers fundamental daily living skills including buttoning, zipping, lacing, and snapping. Ideal for introductory OT sessions.", { dimensions: "30cm x 25cm per page", material: "Fabric pages, hardware fasteners", weightCapacity: "N/A", useCase: "Basic ADL training" }, ["Durable fabric construction", "Real-world fasteners", "Portable book format", "Progressive difficulty"], ["Button practice", "Zipper training", "Lacing skills", "Fine motor development"], 1800),
      makeProduct("5 Page Kit", "adl-kit", "Intermediate ADL kit with 5 activity pages.", "The 5 Page ADL Kit adds buckle practice to the basic set. Covers buttoning, zipping, lacing, snapping, and buckling for comprehensive ADL training.", { dimensions: "30cm x 25cm per page", material: "Fabric pages, hardware fasteners", weightCapacity: "N/A", useCase: "Intermediate ADL training" }, ["Five activity types", "Realistic fasteners", "Durable stitching", "Ring-bound pages"], ["Comprehensive ADL practice", "Fine motor therapy", "Independence training", "Functional skills"], 2200),
      makeProduct("6 Page Kit", "adl-kit", "Complete ADL kit with 6 activity pages.", "The 6 Page ADL Kit is the most comprehensive option, including shoe-tying practice alongside all other fastener types. Perfect for full ADL therapy programs.", { dimensions: "30cm x 25cm per page", material: "Fabric pages, hardware fasteners", weightCapacity: "N/A", useCase: "Complete ADL training" }, ["Six activity types", "Shoe-tying module", "Professional-grade materials", "Carry handle included"], ["Full ADL program", "Shoe-tying practice", "Independence skills", "OT clinic essential"], 2800),
    ],
  },
  {
    slug: "therapy-balls",
    title: "Therapy Balls",
    description: "Professional-grade therapy balls for rehabilitation. Anti-burst construction for clinical safety.",
    color: "from-green-500/10 to-emerald-500/10",
    products: [
      makeProduct("Gym Ball", "therapy-balls", "Anti-burst exercise ball for therapy and balance.", "The Gym Ball is a versatile therapy tool for core strengthening, balance activities, and dynamic seating. Anti-burst technology ensures safety in clinical environments.", { dimensions: "Available in 45cm, 55cm, 65cm, 75cm", material: "Anti-burst PVC, textured surface", weightCapacity: "300 kg static", useCase: "Core therapy, dynamic seating" }, ["Anti-burst safety", "Textured non-slip surface", "Pump included", "Multiple sizes available"], ["Core strengthening", "Dynamic seating", "Balance training", "Postural therapy"], 1200, { sizes: [{ name: "45cm", priceModifier: 0 }, { name: "55cm", priceModifier: 200 }, { name: "65cm", priceModifier: 400 }, { name: "75cm", priceModifier: 600 }], colors: [{ name: "Blue", hex: "#3B82F6" }, { name: "Grey", hex: "#6B7280" }, { name: "Red", hex: "#EF4444" }] }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9720_56aab3dd-f27f-4cdc-ad81-285fd115f7a0.jpg?v=1764648162", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9715_c2f5b492-57e1-4157-8321-894f1471c241.jpg?v=1764648165", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9716_959188eb-49f1-42fa-833e-11ac34cbeb74.jpg?v=1764648168", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen7_4299947b-c448-4fb6-a2d9-2fa41cc91d2e.jpg?v=1764648170"]),
      makeProduct("Bosu Ball", "therapy-balls", "Half-ball balance trainer for stability exercises.", "The Bosu Ball provides an unstable surface for balance and stability training. Can be used dome-side up or inverted for different therapy challenges.", { dimensions: "65cm diameter, 25cm height", material: "PVC dome, ABS platform", weightCapacity: "150 kg", useCase: "Balance, stability training" }, ["Dual-sided use", "Non-slip platform", "Pump included", "Hand grips on base"], ["Balance rehabilitation", "Stability training", "Core activation", "Ankle strengthening"], 3500),
      makeProduct("Peanut Ball", "therapy-balls", "Peanut-shaped therapy ball for stable rolling exercises.", "The Peanut Ball provides a stable rolling surface that prevents lateral rolling. Ideal for prone exercises, tummy time activities, and core work.", { dimensions: "50cm x 100cm", material: "Anti-burst PVC", weightCapacity: "200 kg", useCase: "Prone therapy, core work" }, ["Stable peanut shape", "Anti-burst material", "Textured grip surface", "Pump included"], ["Prone extension", "Tummy time", "Core strengthening", "Pediatric therapy"], 2800, undefined, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_dc914207-e215-477d-8898-663d14b1d459.jpg?v=1763974508", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_22423caf-ed1b-49cb-84bb-0875652eb904.jpg?v=1763974508", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_792564f7-c5b3-4b71-822e-20e1e26bcc69.jpg?v=1763974508", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_fbc2aa31-7f8b-4f0f-9641-4005772fe0e7.jpg?v=1763974508"]),
      makeProduct("Medicine Ball", "therapy-balls", "Weighted medicine ball for strength training.", "The Medicine Ball provides resistance for throwing, catching, and carrying exercises. Develops upper body strength and coordination in therapy settings.", { dimensions: "25cm diameter, available 1-5 kg", material: "Rubber shell, sand fill", weightCapacity: "N/A", useCase: "Strength training, coordination" }, ["Multiple weight options", "Textured grip surface", "Bounce-resistant", "Durable rubber shell"], ["Strength training", "Coordination exercises", "Throwing/catching therapy", "Upper body development"], 1500, { sizes: [{ name: "1 kg", priceModifier: 0 }, { name: "2 kg", priceModifier: 300 }, { name: "3 kg", priceModifier: 600 }, { name: "5 kg", priceModifier: 1000 }] }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9557_6dc2589b-8e1c-4c61-8288-e4c622c960ba.jpg?v=1764648214", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen15.jpg?v=1764648217", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen16.jpg?v=1764648221", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9558_83b0306e-307c-40d8-94b6-76d03e268147.jpg?v=1764648224"]),
    ],
  },
  {
    slug: "deep-pressure",
    title: "Deep Pressure",
    description: "Weighted products for proprioceptive input and calming. Designed for therapeutic deep pressure application.",
    color: "from-indigo-500/10 to-blue-500/10",
    products: [
      makeProduct("Weighted Vest", "deep-pressure", "Adjustable weighted vest for proprioceptive calming.", "The Weighted Vest provides distributed deep pressure input across the torso. Adjustable weight pockets allow therapists to customize pressure levels.", { dimensions: "Available in S, M, L", material: "Neoprene, removable weights", weightCapacity: "N/A", useCase: "Calming, focus, self-regulation" }, ["Adjustable weight pockets", "Breathable neoprene", "Washable cover", "Multiple sizes"], ["Calming and regulation", "Focus improvement", "Proprioceptive input", "Classroom support"], 3200, { sizes: [{ name: "Small (3-5 yrs)", priceModifier: 0 }, { name: "Medium (6-10 yrs)", priceModifier: 500 }, { name: "Large (11+ yrs)", priceModifier: 1000 }], colors: [{ name: "Navy", hex: "#1E3A5F" }, { name: "Grey", hex: "#6B7280" }, { name: "Black", hex: "#1F2937" }] }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_98o8p098o8p098o8_1.png?v=1764648068", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-weighted-vest-for-kids-studio-front-blue-therapeutic-badge.jpg?v=1765454795", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_f7hannf7hannf7ha.png?v=1765454795", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-weighted-vest-for-kids-removable-weights-velcro-pockets-breathable-mesh.jpg?v=1765454795"]),
      makeProduct("Weighted Blanket", "deep-pressure", "Therapeutic weighted blanket for deep pressure therapy.", "The Weighted Blanket provides even deep pressure stimulation. Quilted compartments ensure weight distribution remains consistent during use.", { dimensions: "120cm x 180cm, available 3-9 kg", material: "Cotton cover, glass bead fill", weightCapacity: "N/A", useCase: "Deep pressure, calming" }, ["Even weight distribution", "Quilted compartments", "Washable cotton cover", "Multiple weight options"], ["Sleep therapy", "Calming sensory input", "Anxiety management", "Rest and relaxation"], 4500, { sizes: [{ name: "3 kg (Light)", priceModifier: 0 }, { name: "5 kg (Medium)", priceModifier: 800 }, { name: "7 kg (Heavy)", priceModifier: 1500 }, { name: "9 kg (Extra Heavy)", priceModifier: 2200 }], colors: [{ name: "Soft Grey", hex: "#9CA3AF" }, { name: "Navy Blue", hex: "#1E3A5F" }, { name: "Sage Green", hex: "#6B8F71" }, { name: "Dusty Pink", hex: "#D4A0A0" }], addons: [{ name: "Removable Duvet Cover", price: 1200 }, { name: "Storage Bag", price: 600 }] }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/cozykids-weighted-blanket-for-kids-folded-grey-quilted-therapeutic-badge_2fca9568-55a4-4dec-85db-979060d4cb1c.jpg?v=1764648068", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/cozykids-weighted-blanket-for-kids-cute-designs-oeko-tex-microfiber-interior-ties_2a15391b-a47f-4d6f-b767-2ebb17660b94.jpg?v=1765455277", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/cozykids-weighted-blanket-for-kids-girl-lying-hugging-teddy-grey_a84a61cd-48eb-4d0c-9804-9c08cc4f5582.jpg?v=1765455277", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/cozykids-weighted-blanket-for-kids-girl-with-teddy-on-bed-grey-quilted_36537cfe-8dd8-465c-a786-7bdfcd5020f0.jpg?v=1765455277"]),
      makeProduct("Sensory Sock", "deep-pressure", "Full-body Lycra sensory sock for compression input.", "The Sensory Sock provides full-body deep pressure and proprioceptive input. The stretchy fabric allows for movement while maintaining constant compression.", { dimensions: "Available in S, M, L, XL", material: "4-way stretch Lycra", weightCapacity: "N/A", useCase: "Full-body compression" }, ["Full-body coverage", "Breathable Lycra", "Reinforced seams", "Multiple sizes"], ["Body awareness", "Proprioceptive input", "Calming therapy", "Spatial awareness"], 1800, { sizes: [{ name: "Small (3-5 yrs)", priceModifier: 0 }, { name: "Medium (6-8 yrs)", priceModifier: 300 }, { name: "Large (9-12 yrs)", priceModifier: 600 }, { name: "XL (13+ yrs)", priceModifier: 900 }], colors: [{ name: "Purple", hex: "#7C3AED" }, { name: "Blue", hex: "#3B82F6" }, { name: "Green", hex: "#22C55E" }] }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-blue-girl-therapeutic-badge-recommended_5da5095a-704b-46da-9ece-93365e69d3f4.jpg?v=1764647672", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-bedroom-two-kids-blue-and-dino-print_2b4843d4-576a-4a18-8019-b5abf0090187.jpg?v=1765523744", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-blue-girl-full-length-arms-up_99109596-3e48-4fb8-910b-3ae365944cbc.jpg?v=1765523744", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-blue-lycra-girl-smile-arms-out_59f613b7-5267-41c4-b900-0e21e57002cf.jpg?v=1765523744"]),
      makeProduct("Lap Pad", "deep-pressure", "Weighted lap pad for seated calming input.", "The Lap Pad provides focused deep pressure to the lap and thighs while seated. Ideal for classroom and clinic use to improve focus and reduce anxiety.", { dimensions: "30cm x 40cm, available 1-3 kg", material: "Soft fabric, poly-pellet fill", weightCapacity: "N/A", useCase: "Seated calming, focus aid" }, ["Soft comfortable fabric", "Even weight distribution", "Machine washable", "Portable design"], ["Classroom focus aid", "Seated calming", "Desk-based therapy", "Anxiety management"], 1200, { sizes: [{ name: "1 kg", priceModifier: 0 }, { name: "2 kg", priceModifier: 400 }, { name: "3 kg", priceModifier: 800 }] }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorywise-weighted-lap-pad-for-focus-blue-quilted-therapeutic-tool-machine-washable_8b588e43-9b1a-4c87-a85e-3971d35e2254.jpg?v=1764648118", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_qoaqu7qoaqu7qoa.jpg?v=1765531319", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorywise-weighted-lap-pad-for-focus-blue-minky-gray-edge-breathable-microfiber_799609b7-7402-474b-a6c5-6d6fdc09b1f8.jpg?v=1765531319", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorywise-weighted-lap-pad-for-focus-blue-quilted-equal-weight-pockets-minky_5315f3dd-10cd-4fa4-a85e-c722437b3cdc.jpg?v=1765531319"]),
    ],
  },
  {
    slug: "visual",
    title: "Visual",
    description: "Visual sensory equipment for therapy and sensory rooms. Engaging visual stimulation for calming and focus.",
    color: "from-purple-500/10 to-fuchsia-500/10",
    products: [
      makeProduct("Hexwall Touch Light", "visual", "Interactive hexagonal wall light panels.", "Hexwall Touch Lights create interactive wall displays that respond to touch. Customizable colors and patterns make them perfect for sensory room installations.", { dimensions: "Each hex: 15cm, expandable", material: "ABS plastic, LED lights", weightCapacity: "N/A", useCase: "Interactive sensory walls" }, ["Touch-activated color change", "Magnetic snap connection", "USB powered", "Multiple patterns"], ["Visual stimulation", "Cause and effect learning", "Interactive therapy", "Sensory room design"], 2800, { sizes: [{ name: "Set of 6", priceModifier: 0 }, { name: "Set of 10", priceModifier: 2400 }, { name: "Set of 15", priceModifier: 5200 }] }),
      makeProduct("Liquid Motion Tiles", "visual", "Pressure-sensitive floor tiles with flowing liquid.", "Liquid Motion Tiles create mesmerizing visual effects when stepped on. The flowing colors provide both visual stimulation and cause-and-effect feedback.", { dimensions: "50cm x 50cm per tile", material: "Acrylic, non-toxic liquid", weightCapacity: "200 kg", useCase: "Visual and tactile stimulation" }, ["Pressure-responsive colors", "Non-toxic liquid fill", "Sealed construction", "Anti-slip surface"], ["Visual tracking", "Cause and effect", "Gross motor motivation", "Sensory room flooring"], 3500, { colors: [{ name: "Blue/Green", hex: "#06B6D4" }, { name: "Pink/Purple", hex: "#A855F7" }, { name: "Orange/Yellow", hex: "#F59E0B" }] }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_1_3e4be01c-4d7f-41c5-9bd0-13d6118b2490.jpg?v=1770267810", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_2_330a2bc4-a3dc-4808-89a2-f0f00977f073.jpg?v=1770382287", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_3.jpg?v=1770382287", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_4_4f8b8327-c13c-41e8-9897-ce0ad2a803a5.jpg?v=1770382287"]),
      makeProduct("Glitter Pad", "visual", "Handheld glitter viewing pad for visual calming.", "The Glitter Pad provides gentle visual stimulation as glitter settles through liquid. A calming, portable tool for self-regulation and visual focus.", { dimensions: "20cm x 15cm", material: "Acrylic, glitter liquid fill", weightCapacity: "N/A", useCase: "Visual calming, focus" }, ["Leak-proof sealed design", "Slow-settling glitter", "Portable size", "Multiple color options"], ["Visual calming", "Self-regulation", "Focus tool", "Waiting room activity"], 650, undefined, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-fidget-sensory-toys-six-color-glitter-discs-therapeutic-tool_bbed5be3-e7e0-4471-bd5a-2f910f8fc3c6.jpg?v=1764647954", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-fidget-sensory-toys-six-glitter-discs-with-box_e3dd9bb0-f4de-4d38-8429-bbde986de929.jpg?v=1765457147", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-fidget-sensory-toys-5-point-9-inch-round-disc-hands_4a0932d5-223f-4e8c-ac4f-d475280e990c.jpg?v=1765457147"]),
      makeProduct("Glitter Capillary", "visual", "Slim capillary tube with flowing glitter.", "The Glitter Capillary features a narrow tube filled with slowly flowing glitter. The mesmerizing downward flow promotes visual tracking and calming.", { dimensions: "30cm length, 3cm diameter", material: "Acrylic tube, glitter liquid", weightCapacity: "N/A", useCase: "Visual tracking, calming" }, ["Slow-flow design", "Sealed construction", "Desktop stand included", "Multiple colors"], ["Visual tracking therapy", "Calming tool", "Desk-based focus", "Waiting area use"], 850),
      makeProduct("Fibre Light", "visual", "Fibre optic light spray for visual sensory stimulation.", "The Fibre Light creates a cascade of illuminated fibre optic strands. Color-changing modes provide gentle, controllable visual stimulation for sensory environments.", { dimensions: "150cm fibre length", material: "Fibre optic strands, LED base", weightCapacity: "N/A", useCase: "Visual sensory rooms" }, ["Color-changing modes", "Cool to touch fibres", "Multiple speed settings", "Safe LED technology"], ["Sensory room feature", "Visual stimulation", "Calming environment", "Tactile exploration"], 4500),
      makeProduct("Bubble Tube", "visual", "LED bubble column tube for sensory rooms.", "The Bubble Tube creates a mesmerizing column of rising bubbles with color-changing LED illumination. A centrepiece for sensory rooms and calming environments.", { dimensions: "120cm height, 15cm diameter", material: "Acrylic tube, LED base unit", weightCapacity: "N/A", useCase: "Sensory room centrepiece" }, ["Color-changing LED", "Remote controlled", "Safe shatterproof acrylic", "Wall-mount bracket included"], ["Sensory room centrepiece", "Visual calming", "Color recognition", "Environmental enrichment"], 8500, { sizes: [{ name: "90cm (Small)", priceModifier: 0 }, { name: "120cm (Standard)", priceModifier: 2500 }, { name: "150cm (Large)", priceModifier: 5000 }] }, ["https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_f169ba89-3192-47c3-8f27-6c3f543bfd72.jpg?v=1770267207", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_d715a6ac-7cd9-46ff-bb6c-ca978769d0a1.jpg?v=1770382581", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_57be2e95-0978-44a2-9bc9-d543c1f8ce2f.jpg?v=1770382581", "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_e7221245-c760-42ea-8228-b912d529c552.jpg?v=1770382581"]),
    ],
  },
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

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
}

export function calculateProductPrice(product: CatalogueProduct, config: { material?: string; size?: string; addons?: string[] }): number {
  let price = product.basePrice;
  if (config.material && product.configOptions?.materials) {
    const mat = product.configOptions.materials.find(m => m.name === config.material);
    if (mat) price += mat.priceModifier;
  }
  if (config.size && product.configOptions?.sizes) {
    const sz = product.configOptions.sizes.find(s => s.name === config.size);
    if (sz) price += sz.priceModifier;
  }
  if (config.addons && product.configOptions?.addons) {
    for (const addonName of config.addons) {
      const addon = product.configOptions.addons.find(a => a.name === addonName);
      if (addon) price += addon.price;
    }
  }
  return price;
}
