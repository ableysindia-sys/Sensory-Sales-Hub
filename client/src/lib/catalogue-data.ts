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
    "slug": "swings",
    "title": "Swings & Vestibular",
    "description": "Professional therapy swings providing vestibular input, deep pressure, and calming sensory stimulation for children and adults.",
    "color": "from-blue-600 to-indigo-700",
    "image": "https://www.ableys.in/cdn/shop/collections/1257x329_9ae5b2e4-3b64-4bb3-95e3-13f7c1fc2cd0.jpg?v=1766789920&width=600",
    "products": [
      {
        "id": "tyre-tube-swing-heavy-duty-outdoor-indoor-sensory-swing-for-kids-balance-fun-therapy-play",
        "shopifyHandle": "tyre-tube-swing-heavy-duty-outdoor-indoor-sensory-swing-for-kids-balance-fun-therapy-play",
        "name": "Tyre Tube Swing – Heavy-Duty Outdoor & Indoor Sensory Swing for Kids | Balance",
        "categorySlug": "swings",
        "shortDescription": "Many children struggle with body awareness and sensory regulation, often seeking movement to feel grounded and calm. The Tyre Tube Swing provides the essential vestibular input needed to help kids nav",
        "description": "Many children struggle with body awareness and sensory regulation, often seeking movement to feel grounded and calm. The Tyre Tube Swing provides the essential vestibular input needed to help kids navigate their physical space with confidence.\nProduct Highlights:\nBuilds Body Awareness: Specially designed to help children understand their physical presence and improve spatial orientation.\nVestibular Development: Supports the development of balance and coordination through rhythmic swinging and spinning.\nHeavy-Duty Construction: Features a durable, smooth, child-safe rubber tube with high-quality reinforced stitching.\nVersatile Environment: Perfect for home playrooms, therapy centers, and sensory-friendly classrooms.\nCalming Motion: Provides a soothing, repetitive movement that aids in sensory regulation and focus.\nHow It Works:\nThe Tyre Tube Swing is engineered for multi-directional movement. By sitting, hanging, or lying across the tube, children engage their core muscles and balance systems. The textured straps and soft-touch exterior ensure a secure grip while the central opening allows for varied seating positions to target different sensory needs.",
        "specifications": {},
        "features": [
          "Tyre Tube Swing – Heavy-Duty Outdoor & Indoor Sensory Swing for Kids | Balance"
        ],
        "applications": [
          "balance",
          "home-play",
          "outdoor",
          "proprioceptive",
          "swing",
          "therapy-room"
        ],
        "basePrice": 7999,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-187ol789l_dd7b9170-2401-4fe7-84f8-db80f45bde8f.jpg?v=1763019394",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/tubeswing7b7yt_db67f4b7-1e68-4b7b-98c5-b7759d3e3c94.jpg?v=1763019394",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1ghrthr_df42323a-7c99-4daf-8912-a69d50dfb4f2.jpg?v=1763019394",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1htrthr_3000de57-22db-4bce-a30d-eb6b563b230e.jpg?v=1763019394",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-etdgerr_ca6d2390-6cd8-4ce5-878c-c06de54809aa.jpg?v=1763019382",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-trhythr_264173bd-c2da-4948-bf5c-adda4f2e1e30.jpg?v=1763019382"
        ],
        "shopifyUrl": "https://www.ableys.in/products/tyre-tube-swing-heavy-duty-outdoor-indoor-sensory-swing-for-kids-balance-fun-therapy-play"
      },
      {
        "id": "disc-swing-outdoor-rope-swing-seat-for-kids-fun-balance-coordination-play-equipment-for-gardens-therapy",
        "shopifyHandle": "disc-swing-outdoor-rope-swing-seat-for-kids-fun-balance-coordination-play-equipment-for-gardens-therapy",
        "name": "Disc Swing – Outdoor Rope Swing Seat for Kids | Fun Balance & Coordination Play Equipment for Gardens & Therapy",
        "categorySlug": "swings",
        "shortDescription": "Many children struggle to find engaging ways to build physical strength and coordination while satisfying their natural need for rhythmic movement.",
        "description": "Many children struggle to find engaging ways to build physical strength and coordination while satisfying their natural need for rhythmic movement.\nKey Benefits:\nDurable Construction: Made with weather-resistant materials for long-lasting use in various environments.\nPhysical Development: Supports core muscle development and enhances overall physical strength.\nSensory Integration: Promotes motor planning and provides essential vestibular input.\nVersatile Play: Suitable for both indoor frames and outdoor playground setups.\nSafe Design: Built with non-toxic materials ensuring a secure play experience for kids.\nHow It Works:\nThe Disc Swing is designed to be easily installed on tree branches, swing sets, or indoor support frames. Once secured, children can interact with the swing by sitting, standing, or climbing the sturdy rope. This movement encourages the body to find balance and coordinate muscle groups, providing a fun yet therapeutic way to burn energy and improve focus through motion.",
        "specifications": {},
        "features": [
          "Disc Swing – Outdoor Rope Swing Seat for Kids | Fun Balance & Coordination Play Equipment for Gardens & Therapy"
        ],
        "applications": [
          "balance",
          "outdoor",
          "proprioceptive",
          "swing",
          "therapy-room",
          "vestibular"
        ],
        "basePrice": 6199,
        "comparePrice": 7439,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_2.jpg?v=1764648162",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_1.jpg?v=1764648165",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_1.jpg?v=1764648167",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_1.jpg?v=1764648168",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_1.jpg?v=1764648170",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_6_5.jpg?v=1767852294"
        ],
        "shopifyUrl": "https://www.ableys.in/products/disc-swing-outdoor-rope-swing-seat-for-kids-fun-balance-coordination-play-equipment-for-gardens-therapy"
      },
      {
        "id": "t-swing-therapeutic-sensory-swing-for-kids-balance-coordination-calming-vestibular-play",
        "shopifyHandle": "t-swing-therapeutic-sensory-swing-for-kids-balance-coordination-calming-vestibular-play",
        "name": "T-Swing – Therapeutic Sensory Swing for Kids | Balance",
        "categorySlug": "swings",
        "shortDescription": "Many children with sensory processing needs struggle with body awareness and emotional regulation, often feeling restless or uncoordinated without the right physical outlet. The T-Swing provides a pur",
        "description": "Many children with sensory processing needs struggle with body awareness and emotional regulation, often feeling restless or uncoordinated without the right physical outlet. The T-Swing provides a purposeful way to channel that energy, offering a stable yet dynamic platform for therapeutic movement.\nKey Product Highlights:\nVersatile T-Shaped Design: Supports multiple positions including sitting, straddling, or hanging to build core strength.\nDurable Construction: Built with high-quality, reinforced materials designed for frequent therapeutic use.\nVestibular Input: Provides essential swinging and spinning motions to help develop balance and coordination.\nCalming & Organizing: The rhythmic motion helps promote emotional regulation and focus for children with ADHD or Autism.\nEasy Installation: Features a secure single-point suspension system for smooth, controlled movement.\nHow It Works\nThe T-Swing works by engaging the vestibular system through movement and the proprioceptive system through body positioning. By straddling or hanging from the \"T\" bar, children receive deep pressure and gravitational feedback that helps \"organize\" the brain. It is more than just a swing; it is a tool for building confidence through safe, active play.\nPerfect For: Occupational therapy clinics, sensory-friendly classrooms, and home playrooms.",
        "specifications": {},
        "features": [
          "T-Swing – Therapeutic Sensory Swing for Kids | Balance"
        ],
        "applications": [
          "balance",
          "calming",
          "home-play",
          "proprioceptive",
          "swing",
          "therapy-room"
        ],
        "basePrice": 6199,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_10.jpg?v=1768027428",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_6.jpg?v=1768027428",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_7.jpg?v=1768027428",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_8.jpg?v=1768027428",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_10.jpg?v=1768027428",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_8.jpg?v=1768027428"
        ],
        "shopifyUrl": "https://www.ableys.in/products/t-swing-therapeutic-sensory-swing-for-kids-balance-coordination-calming-vestibular-play"
      },
      {
        "id": "bolster-swing-soft-comfortable-baby-swing-indoor-hammock-style-bolster-jhula-for-kids",
        "shopifyHandle": "bolster-swing-soft-comfortable-baby-swing-indoor-hammock-style-bolster-jhula-for-kids",
        "name": "Bolster Swing – Soft & Comfortable Baby Swing | Indoor Hammock Style Bolster Jhula for Kids",
        "categorySlug": "swings",
        "shortDescription": "Finding a safe and soothing indoor space where infants and toddlers can relax can be challenging for busy parents. The Bolster Swing provides a dedicated sanctuary for your child to decompress and eng",
        "description": "Finding a safe and soothing indoor space where infants and toddlers can relax can be challenging for busy parents. The Bolster Swing provides a dedicated sanctuary for your child to decompress and engage in calming movement.\nThis cushioned swing is designed to support sensory regulation through rhythmic motion and tactile comfort.\nSoft Cotton Fabric: Breathable material for a comfortable tactile experience.\nSecure Bolster Design: Provides a sense of enclosure and safety.\nSmooth Rocking Motion: Supports vestibular input and relaxation.\nDurable Rope Attachments: Engineered for stability during use.\nIndoor-Friendly Design: Versatile enough for bedrooms or play areas.\nHow It Works\nUnlike standard hard-seated swings, the Bolster Swing uses a hammock-style fabric construction that contours to your child's body. By providing gentle 360-degree pressure and a natural rocking rhythm, it helps promote a state of calm and supports better sleep patterns. Simply secure the sturdy ropes to a weight-tested mount to create an instant sensory retreat.",
        "specifications": {},
        "features": [
          "Bolster Swing – Soft & Comfortable Baby Swing | Indoor Hammock Style Bolster Jhula for Kids"
        ],
        "applications": [
          "calming",
          "home",
          "swing",
          "vestibular"
        ],
        "basePrice": 5299,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_1_a43ed9ee-1c32-4081-9b0c-9e423b5538a8.jpg?v=1766662698",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_2_16e10b4d-8fcb-46c4-ba7e-44cb2526ff78.jpg?v=1766662699",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_3_f21e0d3b-6cf5-48c8-91b4-21613cb6417d.jpg?v=1766662698",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_4_9b2e228d-e023-49a8-b9d4-1e5458745416.jpg?v=1766662699",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_5_5fe99c1c-e9ae-4c70-94e8-4087e8c1fc33.jpg?v=1766662699",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_6_4.jpg?v=1767789198"
        ],
        "shopifyUrl": "https://www.ableys.in/products/bolster-swing-soft-comfortable-baby-swing-indoor-hammock-style-bolster-jhula-for-kids"
      }
    ]
  },
  {
    "slug": "mats-flooring",
    "title": "Mats & Flooring",
    "description": "Safety mats, sensory floor tiles, crash pads, and interlocking foam tiles for therapy rooms and play areas.",
    "color": "from-emerald-600 to-teal-700",
    "image": "https://www.ableys.in/cdn/shop/collections/1257x329_9c7b2e00-c88d-464b-b7b2-9d8c02459a65.jpg?v=1766789854&width=600",
    "products": [
      {
        "id": "abley-s-crash-pad-soft-landing-sensory-cushion-4x4-6x4-ft-for-safe-jumping-deep-pressure-play",
        "shopifyHandle": "abley-s-crash-pad-soft-landing-sensory-cushion-4x4-6x4-ft-for-safe-jumping-deep-pressure-play",
        "name": "Crash Pad – Soft Landing Sensory Cushion (4x4 / 6x4 ft) for Safe Jumping & Deep Pressure Play",
        "categorySlug": "mats-flooring",
        "shortDescription": "Many children with sensory processing needs crave high-impact movement but lack a safe, dedicated environment to jump, crash, or roll without the risk of injury. This lack of a safe \"landing zone\" can",
        "description": "Many children with sensory processing needs crave high-impact movement but lack a safe, dedicated environment to jump, crash, or roll without the risk of injury. This lack of a safe \"landing zone\" can lead to unsafe jumping on furniture or elevated anxiety due to a lack of proprioceptive input.\nThe Ableys Crash Pad provides a professional-grade solution for sensory seekers and active play. Designed to support the sensory system, this high-density foam cushion offers the deep pressure input necessary for calming and self-regulation. Whether used in a clinical setting or a home sensory corner, it creates a secure space for motor planning and physical expression.\nKey Benefits:\nHigh-Density Foam Filling: Provides maximum impact absorption and supportive deep pressure.\nPromotes Sensory Regulation: Helps children organize their sensory systems through proprioceptive input.\n️ Durable & Tear-Resistant: Features a breathable, heavy-duty cover designed for active, long-term use.\nEasy Maintenance: The removable outer cover is machine washable for consistent hygiene.\nVersatile Application: Perfect for occupational therapy, sensory gyms, or under indoor swings.\nHow It Works\nThe Abley's Crash Pad works by absorbing the force of high-impact movements, such as jumping or falling, and converting that impact into deep pressure touch. This specific type of tactile input signals the brain to release calming neurotransmitters, helping users feel more grounded and aware of their body's position in space. Simply place the pad in a clear area or under a sensory swing to provide an immediate safety upgrade to any play environment.",
        "specifications": {},
        "features": [
          "Crash Pad – Soft Landing Sensory Cushion (4x4 / 6x4 ft) for Safe Jumping & Deep Pressure Play"
        ],
        "applications": [
          "calming",
          "deep-pressure",
          "home-play",
          "proprioceptive",
          "therapy-room"
        ],
        "basePrice": 15999,
        "comparePrice": null,
        "configOptions": {
          "sizes": [
            {
              "name": "4x4",
              "priceModifier": 0
            },
            {
              "name": "6x4",
              "priceModifier": 4000
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-687l799p_5517468c-2f14-472f-8e25-040031e57d66.jpg?v=1763022357",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-rgher789ol797_7fbb6b03-2b39-401a-95b1-61bef987fd4a.jpg?v=1763022357",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-rtrtrh6jh6t6_0c8a23f6-783e-4ee1-b094-f8d409c11d7c.jpg?v=1763022357",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-rtrtrh45ytg54yhg5_5502eaba-ab14-4173-8cb3-2c96b9b03cb9.jpg?v=1763022357",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-rtrtrhjnmo_0cec7c3e-f7a7-4451-bdf4-ea1eedf5bebf.jpg?v=1763022358",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-yuilil.jpg?v=1763022357"
        ],
        "shopifyUrl": "https://www.ableys.in/products/abley-s-crash-pad-soft-landing-sensory-cushion-4x4-6x4-ft-for-safe-jumping-deep-pressure-play"
      },
      {
        "id": "eva-foam-puzzle-mat-soft-interlocking-play-mats-for-kids-non-toxic-shock-absorbing-floor-tiles",
        "shopifyHandle": "eva-foam-puzzle-mat-soft-interlocking-play-mats-for-kids-non-toxic-shock-absorbing-floor-tiles",
        "name": "EVA Foam Puzzle Mat – Soft Interlocking Play Mats for Kids | Non-Toxic",
        "categorySlug": "mats-flooring",
        "shortDescription": "Finding a safe, cushioned area for floor play that also encourages early learning can be difficult with standard rugs or hard flooring. The Alphabet and Number EVA Foam Puzzle Mat provides a protectiv",
        "description": "Finding a safe, cushioned area for floor play that also encourages early learning can be difficult with standard rugs or hard flooring. The Alphabet and Number EVA Foam Puzzle Mat provides a protective, high-quality surface that supports both physical safety and cognitive development.\nKey Benefits\nEducational Design: Features 36 interlocking tiles including the full alphabet (A-Z) and numbers (0-9) to promote early literacy and numeracy.\nShock-Absorbing Safety: The high-density EVA foam provides a soft, cushioned barrier against hard floors, supporting motor skill development and tummy time.\nNon-Toxic Material: Crafted from safe, lead-free, and phthalate-free foam for a worry-free play environment.\nTextured Grip: An anti-slip surface ensures secure footing for little ones as they crawl, walk, and play.\nWaterproof and Durable: Easy to wipe clean after spills, maintaining a hygienic space for daily activities.\nHow It Works\nThis versatile mat system is designed for easy assembly. Simply align the interlocking edges of the 36 tiles to create a customized play area that fits your room's dimensions. Children can engage with the pop-out letters and numbers, promoting fine motor skills and hand-eye coordination as they fit the pieces together. It serves as an ideal base for sensory bins, physical therapy exercises, or quiet reading corners.",
        "specifications": {},
        "features": [
          "EVA Foam Puzzle Mat – Soft Interlocking Play Mats for Kids | Non-Toxic"
        ],
        "applications": [
          "flooring",
          "home-play",
          "sensory-play"
        ],
        "basePrice": 299,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/SW003663copy_9f324e7c-08a2-4987-a059-fdd7fd544720.jpg?v=1763106152",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/03_2782acd9-61fc-4c06-93ca-878d85089656.jpg?v=1763106152",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/SW003653copy_c3a4f900-6d86-44ce-8a3d-3182f5236afd.jpg?v=1763106152",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/04_887c53bf-0abc-4c65-ad50-8df1ad9cf260.jpg?v=1763106113",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/SW003656copy_4e99c527-47e5-4efa-ad4e-018bad5a312a.jpg?v=1763106113",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/SW003659copy_de5401d1-84eb-49e3-8cb9-d263948055f8.jpg?v=1763106113",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/SW003661copy_f336d9df-162c-417c-90ac-c07a7f8e8c6b.jpg?v=1763106113",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/SW003662copy_50eedb7d-37b9-4bf5-9e4c-e9beffc6e310.jpg?v=1763106113",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Eva-Foam-Puzzle-mat.jpg?v=1766988708"
        ],
        "shopifyUrl": "https://www.ableys.in/products/eva-foam-puzzle-mat-soft-interlocking-play-mats-for-kids-non-toxic-shock-absorbing-floor-tiles"
      },
      {
        "id": "interlocking-mats-soft-eva-foam-floor-tiles-non-slip-shock-absorbing-play-exercise-mats",
        "shopifyHandle": "interlocking-mats-soft-eva-foam-floor-tiles-non-slip-shock-absorbing-play-exercise-mats",
        "name": "Interlocking Mats Floor Tiles : ( 2 x 2 )Ft | Non-Slip",
        "categorySlug": "mats-flooring",
        "shortDescription": "Hard flooring can lead to discomfort and potential injury during high-energy sensory play or physical therapy sessions. Our Interlocking Mats Floor provide a dedicated, cushioned environment that supp",
        "description": "Hard flooring can lead to discomfort and potential injury during high-energy sensory play or physical therapy sessions. Our Interlocking Mats Floor provide a dedicated, cushioned environment that supports safe movement and reduces the impact on growing joints.\nKey Benefits:\nImpact Protection: High-density Interlocking Mats Floor cushions falls and reduces fatigue during long periods of play or standing.\nSensory-Friendly Texture: The non-slip, textured surface provides essential tactile feedback and stability.\nVersatile Configuration: Simple puzzle-lock design allows you to customize the layout to fit any room size.\nHygienic and Durable: Waterproof material makes it easy to wipe away spills, maintaining a clean sensory space.\nThermal Comfort: Insulates against cold floors, making ground-level activities more inviting.\nHow It Works:\nThese mats are designed for effortless setup. Simply align the interlocking edges and press them together to create a seamless, non-slip surface. The high-density foam structure works by absorbing kinetic energy, which protects both the user and the floor. Whether used for yoga, physiotherapy, or classroom seating, these mats create a defined and supportive zone for various therapeutic and recreational activities.",
        "specifications": {},
        "features": [
          "Interlocking Mats Floor Tiles : ( 2 x 2 )Ft | Non-Slip"
        ],
        "applications": [
          "flooring",
          "home-play",
          "therapy-room"
        ],
        "basePrice": 2441,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-TYJKYKYU_9daeb4cf-edf8-4795-83ab-aa23924ccf73.jpg?v=1763019822",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1uyu8ih7_7764e008-19d7-4f6b-abef-3591f9f86cfb.jpg?v=1763019822",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1uyu8jn9_41719120-67e6-4885-b46c-0c0c57b31bcd.jpg?v=1763019822",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1uyu846uj6556j_63a97beb-fd85-4d60-bc43-0970fbb29c22.jpg?v=1763019822",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1uyu856u65ui56_b8324e19-4e3f-44ee-9cac-68a20c3aa3b0.jpg?v=1763019822",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-68KL_7f7859b5-9fe5-4be0-a3df-66011ca3c3b5.jpg?v=1763019822",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Interlocking-Mats.jpg?v=1766989892"
        ],
        "shopifyUrl": "https://www.ableys.in/products/interlocking-mats-soft-eva-foam-floor-tiles-non-slip-shock-absorbing-play-exercise-mats"
      },
      {
        "id": "liquid-motion-sensory-mat-multicolor",
        "shopifyHandle": "liquid-motion-sensory-mat-multicolor",
        "name": "Abley's Liquid Motion Tile | Interactive Sensory Mat | Square Multicolour",
        "categorySlug": "mats-flooring",
        "shortDescription": "Abley's Liquid Motion Tile | Interactive Sensory Mat | Square Multicolour is designed to create a soothing and engaging sensory experience. This liquid motion sensory mat features vibrant colors that ",
        "description": "Abley's Liquid Motion Tile | Interactive Sensory Mat | Square Multicolour is designed to create a soothing and engaging sensory experience. This liquid motion sensory mat features vibrant colors that swirl and shift with gentle pressure. Children and adults enjoy pressing, stepping, or tapping the mat as colorful liquid streams respond with captivating, ever-changing displays.\nA liquid motion sensory mat can help improve focus and provide calming input. The shifting colors and soft texture invite exploration, making it perfect for sensory rooms, therapy sessions, classrooms, or home environments. The mat encourages tactile engagement and visual tracking, which helps develop attention and self-regulation.\nEach liquid motion sensory mat from Abley's is crafted to be durable and safe. The robust materials resist leaks and withstand repeated use. This makes it ideal for active use by kids, teens, and adults alike. It can be placed on the floor to step on, set on a table for hand activities, or used under feet during seated tasks for movement breaks.\nAbley's liquid motion sensory mat stands out for its multi-color appeal and interactive design. The square format allows easy arranging in play or therapy areas. The bright, swirling liquids spark curiosity, supporting sensory-seeking behaviors while offering gentle calming support.\nThis liquid motion sensory mat is easy to clean and maintain. Wipe it down after use, making it suitable for high-traffic settings. It’s a versatile option for creating engaging sensory spaces in schools, clinics, therapy centers, and homes. The mat’s visual and tactile feedback make it a popular choice among therapists and educators.\nExplore the benefits of Abley's liquid motion sensory mat today. Enhance your sensory toolkit with this interactive, reliable, and beautifully designed mat. Each use brings new visual surprises, helping users relax or re-focus depending on their needs.",
        "specifications": {},
        "features": [
          "Abley's Liquid Motion Tile | Interactive Sensory Mat | Square Multicolour"
        ],
        "applications": [
          "autism",
          "exploration",
          "home-play",
          "sensory-play",
          "spd",
          "tactile"
        ],
        "basePrice": 1499,
        "comparePrice": 3045,
        "configOptions": {
          "sizes": [
            {
              "name": "1 / 30cmx30cm",
              "priceModifier": 0
            },
            {
              "name": "1 / 50cmx50cm",
              "priceModifier": 2000.94
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensory-shop-liquid-motion-sensory-mat-single-purple-pink-closeup-therapeutic-badge_c0901e85-8fed-436a-8f62-3b6b8b3362a7.jpg?v=1764647954",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensory-shop-liquid-motion-sensory-mat-nine-color-3x3-grid-orange-background_57b9e54d-60ea-45ea-b93e-54bdfb199ebd.jpg?v=1765455384",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensory-shop-liquid-motion-sensory-mat-colorful-squares-stacked-size-12x12-white_0d368c93-103b-4388-a371-1af61a77c977.jpg?v=1765455384",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensory-shop-liquid-motion-sensory-mat-flat-lay-angled-12-squares-bright-colors_6827ce4b-54ea-4aff-b52b-f627f8d2768f.jpg?v=1765455384",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensory-shop-liquid-motion-sensory-mat-multiple-mats-row-reflection-desktop-display_9bfdd37d-1d7d-46e8-b3cc-2f012cef3541.jpg?v=1765455384",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/12.jpg?v=1765455384",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Liquid-Motion-Tiles-_-20-X-20-_-inches--_12-x-12-_-inches.jpg?v=1766140106"
        ],
        "shopifyUrl": "https://www.ableys.in/products/liquid-motion-sensory-mat-multicolor"
      },
      {
        "id": "sensory-mat-round-shape-pack-of-10",
        "shopifyHandle": "sensory-mat-round-shape-pack-of-10",
        "name": "Abley's Round Sensory Floor Mats | 10-Piece Set for Tactile Input",
        "categorySlug": "mats-flooring",
        "shortDescription": "A set of round mats for tactile stimulation and balance.",
        "description": "A set of round mats for tactile stimulation and balance.\nThis colorful sensory mat is designed to provide tactile stimulation for individuals needing sensory input. Made from high-quality silicone material, the mat is soft yet durable, offering a strong enough surface for gripping, pulling, squeezing, and stepping on. These textured circles are ideal for sensory integration therapy, helping to improve focus, balance, coordination, and tactile awareness.\nComprehensive Sensory Stimulation: Multiple textures and bright designs offer targeted sensory input to support developmental needs.\nPromotes Relaxation and Focus: Helps reduce stress and increase concentration during therapeutic activities or daily routines.\nSkill Development: Supports improvements in language, problem-solving, fine motor, and gross motor skills through tactile engagement.",
        "specifications": {},
        "features": [
          "Abley's Round Sensory Floor Mats | 10-Piece Set for Tactile Input"
        ],
        "applications": [
          "autism",
          "exploration",
          "flooring",
          "home-play",
          "sensory-mat",
          "sensory-play"
        ],
        "basePrice": 3758,
        "comparePrice": 5212,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-3l_uiil.jpg?v=1764648007",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1sverrbgrbvr.jpg?v=1765608949",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1svvervesv.jpg?v=1765608949",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-3yuyk.jpg?v=1765608949",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/large.jpg?v=1765608949"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-mat-round-shape-pack-of-10"
      },
      {
        "id": "sensory-mat-for-kids-textured-puzzle",
        "shopifyHandle": "sensory-mat-for-kids-textured-puzzle",
        "name": "Abley's Sensory Mat Textured Puzzle | 6-Piece Tactile Path Set",
        "categorySlug": "mats-flooring",
        "shortDescription": "Discover a new world of tactile play with the Abley's Sensory Mat, Textured Puzzle | 6-Piece Tactile Path Set. This sensory mat for kids brings interactive textures and engaging shapes together for ho",
        "description": "Discover a new world of tactile play with the Abley's Sensory Mat, Textured Puzzle | 6-Piece Tactile Path Set. This sensory mat for kids brings interactive textures and engaging shapes together for hours of sensory exploration. Children step, touch, or sit on each piece to experience unique tactile feedback that supports their growing senses.\nEach piece in the sensory mat for kids set features a different texture. There are soft, furry surfaces, smooth faux-leather squares, sequined panels, and gentle animal-themed edges. The gentle pressure from walking or playing helps children calm themselves and focus. Sensory play with this mat can support children struggling with sensory processing or focus.\nThe 8-piece design lets kids arrange the sensory mat for kids set in endless patterns. These mats fit well in therapy rooms, play spaces, or classrooms. They work for individual play or group activities. The animal-themed pieces add a playful look that encourages curious hands and feet.\nCleanup and storage are easy. Each textured piece connects like a simple puzzle. The sensory mat for kids set can be stored flat or separated when not in use. All materials are easy to wipe down and designed for safe use in homes or professional environments.\nTherapists, parents, and teachers choose this mat to support tactile play and sensory input. The different surfaces provide gentle resistance and stimulation. The variety of sensations meets the needs of children seeking tactile comfort or stimulation.\nA sensory mat for kids is a valuable tool for targeted sensory play. It encourages movement, balance, and creative arrangement. Children learn self-regulation and focus through sensory experiences. The playful animal design invites engagement.\nThe Abley's Sensory Mat, Textured Puzzle | 6-Piece Tactile Path Set is made for long-lasting use. Each pad is crafted with durable, child-friendly materials that stand up to active play. The sensory mat for kids stands out for its premium textures ",
        "specifications": {},
        "features": [
          "Abley's Sensory Mat Textured Puzzle | 6-Piece Tactile Path Set"
        ],
        "applications": [
          "autism",
          "exploration",
          "flooring",
          "home-play",
          "sensory-mat",
          "sensory-play"
        ],
        "basePrice": 1874,
        "comparePrice": 2823,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-sensory-mat-for-kids-six-animal-texture-pads-flat-lay_a6280787-8258-433a-b132-56fc3a93638b.jpg?v=1764648006",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-sensory-mat-for-kids-circle-layout-multiple-texture-pads-blue-storage-bag_acf531d0-f87a-4b45-8098-b8074eada14e.jpg?v=1764648008",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-sensory-mat-for-kids-hedgehog-fluffy-pad-features-machine-washable_231fdda2-332f-4a48-87b9-66df8c9da048.jpg?v=1764648011",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-sensory-mat-for-kids-multi-texture-scattered-layout-checkmark_210b60c2-7b49-4e52-a0cd-3a42cd0668b4.jpg?v=1764648013",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-sensory-mat-for-kids-six-textured-pads-engaging-textures-banner_52b86d7b-2983-4545-be97-24b93f396dd0.jpg?v=1764648016",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/81WdwoTiqL._SX679.jpg?v=1765518483",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Abley_s-Sensory-Mat_-Textured-Puzzle--6-Piece-Tactile-Path-Set.jpg?v=1766142263"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-mat-for-kids-textured-puzzle"
      }
    ]
  },
  {
    "slug": "deep-pressure",
    "title": "Deep Pressure & Weighted",
    "description": "Weighted vests, blankets, lap pads, compression garments, and body socks providing calming deep pressure input.",
    "color": "from-purple-600 to-violet-700",
    "image": "https://www.ableys.in/cdn/shop/collections/1257x329_5d2c2f0f-dc3b-40c0-94e0-27e66bc42e3b.jpg?v=1766789674&width=600",
    "products": [
      {
        "id": "ankle-weight-1kg-adjustable-fitness-weights-for-strength-training-walking-aerobics",
        "shopifyHandle": "ankle-weight-1kg-adjustable-fitness-weights-for-strength-training-walking-aerobics",
        "name": "Adjustable Ankle Weights (0.5kg, 1kg & 2kg) – Fitness Weights for Walking",
        "categorySlug": "deep-pressure",
        "shortDescription": "Finding it difficult to increase the intensity of your daily walks or physiotherapy exercises without bulky equipment? Many fitness enthusiasts and individuals in rehabilitation struggle to find a com",
        "description": "Finding it difficult to increase the intensity of your daily walks or physiotherapy exercises without bulky equipment? Many fitness enthusiasts and individuals in rehabilitation struggle to find a comfortable, secure way to add resistance to their lower body movements, often leading to plateaued progress or inconsistent training.\nThe Adjustable Ankle Weight Set is designed to provide controlled resistance for every step, lift, and movement. Whether you are focused on sensory grounding through proprioceptive input or simply looking to tone muscles, these weights offer a versatile solution for home and clinic use.\nkey benefits:\nBreathable Comfort: Made with soft, skin-friendly fabric to prevent irritation during long sessions.\nSecure Fit: Features an adjustable Velcro strap system that fits all ankle sizes comfortably.\nBalanced Design: Evenly distributed weight ensures natural movement and prevents joint strain.\nMulti-Level Resistance: Includes 0.5kg and 1kg options to support gradual strength building.\nPortable Versatility: Compact design makes it easy to transition from home workouts to the gym or clinic.\nHow It Works:\nBy adding extra load to the lower extremities, these weights promote increased muscle activation and calorie burn. For those with sensory processing needs, the added weight provides vital proprioceptive feedback, helping to improve body awareness and calming the nervous system during physical activity. Simply wrap the weights around your ankles, secure the Velcro strap, and proceed with your walking, leg lifts, or aerobic routine.",
        "specifications": {},
        "features": [
          "Adjustable Ankle Weights (0.5kg, 1kg & 2kg) – Fitness Weights for Walking"
        ],
        "applications": [
          "home",
          "proprioceptive",
          "strength",
          "therapy-room"
        ],
        "basePrice": 830,
        "comparePrice": null,
        "configOptions": {
          "sizes": [
            {
              "name": "0.5kg",
              "priceModifier": 0
            },
            {
              "name": "1kg",
              "priceModifier": 430
            },
            {
              "name": "2kg",
              "priceModifier": 1405.75
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard.jpg?v=1764648118",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_125cc10d-81b9-410d-9d45-1a4476357ea5.jpg?v=1764648122",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_31b11561-e1a2-4c7a-b611-733ba1d4fcea.jpg?v=1764648124",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_b3be4554-09de-47dd-aabd-0e0915f61e2d.jpg?v=1764648127"
        ],
        "shopifyUrl": "https://www.ableys.in/products/ankle-weight-1kg-adjustable-fitness-weights-for-strength-training-walking-aerobics"
      },
      {
        "id": "weighted-plush-bunny-for-sensory-therapy",
        "shopifyHandle": "weighted-plush-bunny-for-sensory-therapy",
        "name": "Abley's Weighted Plush Bunny | 4lb (1.81kg) Calming Lap Companion",
        "categorySlug": "deep-pressure",
        "shortDescription": "Struggling to help manage the wiggles during seated activities? This 4lb (1.81kg) Weighted Plush Bunny is an engaging and comforting alternative to a traditional lap pad.",
        "description": "Struggling to help manage the wiggles during seated activities? This 4lb (1.81kg) Weighted Plush Bunny is an engaging and comforting alternative to a traditional lap pad.\nThis soft, huggable bunny provides 4 pounds of gentle, grounding deep pressure. The evenly distributed weight feels like a secure hug, which can help create a sense of security and calm.\nKey Benefits:\nProvides Grounding Deep Pressure: The 4lb (1.81kg) weight feels like a secure hug, supporting relaxation and helping to manage restlessness.\nPlayful Lap Pad Alternative: Offers the benefits of a weighted lap pad in a more engaging form that children often prefer.\nSoft & Cuddly: Made with a durable, ultra-soft tactile fabric perfect for cuddling.\nSupports Focus & Regulation: A helpful tool for managing restlessness and supporting focus during homework , class, or travel.\nHow It Works:\nThe deep pressure stimulation from the weighted plush provides sensory input that can help support self-regulation. Its friendly, discreet design fits into any setting, from a classroom to an office, providing quiet support whenever it's needed.",
        "specifications": {},
        "features": [
          "Abley's Weighted Plush Bunny | 4lb (1.81kg) Calming Lap Companion"
        ],
        "applications": [
          "anxiety",
          "autism",
          "bedtime",
          "calming",
          "deep-pressure",
          "home"
        ],
        "basePrice": 2338,
        "comparePrice": 4678,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/calm-buddy-weighted-plush-bunny-for-sensory-therapy-grey-studio-white-background-therapeutic-badge_594ed948-9fca-4934-93e5-3e22fb708090.jpg?v=1764648118",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/calm-buddy-weighted-plush-bunny-for-sensory-therapy-grey-cream-pair-facing-calm-cuddle_0edbd4d6-5fac-48c1-8407-6288eacb5275.jpg?v=1765454702",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/calm-buddy-weighted-plush-bunny-for-sensory-therapy-grey-sitting-11-8-inch-height-8x8-base_b3e81aff-9453-4c63-b22f-7107a547ceb9.jpg?v=1765454702",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/calm-buddy-weighted-plush-bunny-for-sensory-therapy-blue-gently-weighted-therapy-tool-deep-pressure_afe51eb0-c929-412b-8947-6d01c9cca017.jpg?v=1765454702",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/calm-buddy-weighted-plush-bunny-for-sensory-therapy-multi-color-collection-various-sizes-sensory-fabric_96103c55-73ae-4f75-92fd-16a9b99b7c85.jpg?v=1765454702"
        ],
        "shopifyUrl": "https://www.ableys.in/products/weighted-plush-bunny-for-sensory-therapy"
      },
      {
        "id": "sensory-vibrating-minky-dot-pillow-for-kids-with-autism-adhd-calming-weighted-therapy-cushion-for-anxiety-focus-and-sleep",
        "shopifyHandle": "sensory-vibrating-minky-dot-pillow-for-kids-with-autism-adhd-calming-weighted-therapy-cushion-for-anxiety-focus-and-sleep",
        "name": "Abley's Vibrating Minky Pillow | Soothing Sensory Cushion for Calm",
        "categorySlug": "deep-pressure",
        "shortDescription": "Finding a simple, immediate way to support calm or manage sensory input can be a challenge? It's difficult to find a tool that's intuitive, comforting, and always ready when needed.",
        "description": "Finding a simple, immediate way to support calm or manage sensory input can be a challenge? It's difficult to find a tool that's intuitive, comforting, and always ready when needed.\nExperience the gentle comfort of the Abley’s Vibrating Minky Pillow. It's designed to provide soothing sensory feedback on demand. Its ultra-plush minky dimpled texture and hug-activated vibration make it a wonderful sensory companion.\nKey Benefits & Features\nHug to Activate: Simply squeeze or hug the pillow to start the gentle, soothing vibration. No switches or cords!\nUltra-Soft Minky Fabric: The dotted minky texture offers a delightful and satisfying tactile sensory experience.\nPromotes Calm & Focus: The gentle vibration provides immediate sensory feedback, helping to support calming routines and focus.\nSafe & Portable: The battery-operated motor is securely hidden inside for child safety. It's perfect for home , travel, or bedtime.\nHow It Works\nUsing the pillow is effortless. The gentle motor is pressure-activated. Simply apply pressure by hugging, squeezing, or leaning against it to start the soothing vibrations. It provides immediate sensory feedback, supporting calming routines, bedtime relaxation, travel comfort, or sensory play.",
        "specifications": {},
        "features": [
          "Abley's Vibrating Minky Pillow | Soothing Sensory Cushion for Calm"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "bedtime",
          "calming",
          "deep-pressure"
        ],
        "basePrice": 1631,
        "comparePrice": 1749,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_1_f5c09c8d-57de-40a5-93f5-19e14de876f9.jpg?v=1764648068",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_61c893ec-3aea-46b4-a7c6-4fe6f463bf46.jpg?v=1765455497",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_e488da84-ecc5-4bb8-a2e5-65873ef4a730.jpg?v=1765455497",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_fae6c490-dfec-45bd-9f0e-fd6ff08e2317.jpg?v=1765455497",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_12acc25a-c79a-4b7f-8e2c-6a5154f9fc43.jpg?v=1765455497",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_fde8a8d6-bca0-45a1-b5f6-4601d08cd470.jpg?v=1765455497",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Vibrating-Pillow.jpg?v=1766813279"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-vibrating-minky-dot-pillow-for-kids-with-autism-adhd-calming-weighted-therapy-cushion-for-anxiety-focus-and-sleep"
      },
      {
        "id": "weighted-vest-for-kids-2lbs-3lbs-blue",
        "shopifyHandle": "weighted-vest-for-kids-2lbs-3lbs-blue",
        "name": "Abley's Weighted Compression Vest for Kids | 2lb and 3lb Removable Weights | Deep Pressure Sensory Vest for Autism ADHD | Blue",
        "categorySlug": "deep-pressure",
        "shortDescription": "Struggling to find a tool to help your child stay calm and focused in the classroom or at home? The Abley's Weighted Compression Vest is designed to provide gentle, deep pressure input.",
        "description": "Struggling to find a tool to help your child stay calm and focused in the classroom or at home? The Abley's Weighted Compression Vest is designed to provide gentle, deep pressure input.\nThis supportive vest offers a comforting, hug-like sensation. It's an ideal tool for children who benefit from sensory support, helping to create a sense of calm and support focus during school , homework, or quiet time.\nKey Benefits:\nProvides Deep Pressure: Delivers consistent, calming proprioceptive input, similar to a hug.\nAdjustable & Removable Weights: Includes 2lb (Small) or 3lb (Medium/Large) of removable weights for customizable support.\nComfortable & Breathable: Made from soft, durable fabric with mesh panels for breathability during activity.\nDiscreet & Versatile: Can be worn over a t-shirt or under clothing in various settings.\nHow It Works:\nThe vest is designed for a snug, comfortable fit with easy-to-use fastenings. The adjustable straps ensure a custom fit, while the removable weights allow you to modify the input based on your child's needs. It's a supportive tool for daily routines, group time, or transitions.",
        "specifications": {},
        "features": [
          "Abley's Weighted Compression Vest for Kids | 2lb and 3lb Removable Weights | Deep Pressure Sensory Vest for Autism ADHD | Blue"
        ],
        "applications": [
          "adhd",
          "autism",
          "body-awareness",
          "calming",
          "classroom",
          "deep-pressure"
        ],
        "basePrice": 4218,
        "comparePrice": 5776,
        "configOptions": {
          "sizes": [
            {
              "name": "Large (10-12 years)",
              "priceModifier": 0
            },
            {
              "name": "Medium (5-9 years)",
              "priceModifier": -281
            },
            {
              "name": "Small (2-4 Years)",
              "priceModifier": -656
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_98o8p098o8p098o8_1.png?v=1764648068",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-weighted-vest-for-kids-studio-front-blue-therapeutic-badge.jpg?v=1765454795",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_f7hannf7hannf7ha.png?v=1765454795",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-weighted-vest-for-kids-removable-weights-velcro-pockets-breathable-mesh.jpg?v=1765454795",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_f7hannf7hannf7ha_2.png?v=1765454795",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-weighted-vest-for-kids-boy-front-back-blue-mesh-adjustable.jpg?v=1765454795",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-weighted-vest-for-kids-child-sitting-on-bed-playing-lifestyle-blue.jpg?v=1765454795",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-weighted-vest-for-kids-boy-playing-with-toys-closeup-blue.jpg?v=1765454795",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-weighted-vest-for-kids-size-chart-width-length-age-range.jpg?v=1765454795",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_zbaz40zbaz40zbaz.png?v=1765454795",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Weighted-Vest.jpg?v=1766144864"
        ],
        "shopifyUrl": "https://www.ableys.in/products/weighted-vest-for-kids-2lbs-3lbs-blue"
      },
      {
        "id": "weighted-plush-for-sensory-calming-pony",
        "shopifyHandle": "weighted-plush-for-sensory-calming-pony",
        "name": "Abley's Weighted Plush Friendly Pony | 4lb (1.81kg) Calming Lap Companion",
        "categorySlug": "deep-pressure",
        "shortDescription": "Struggling to find a comforting tool to manage restlessness or support focus during quiet time? The Abley's Weighted Plush Friendly Pony offers 4 lbs (1.81 kg) of gentle, steady comfort.",
        "description": "Struggling to find a comforting tool to manage restlessness or support focus during quiet time? The Abley's Weighted Plush Friendly Pony offers 4 lbs (1.81 kg) of gentle, steady comfort.\nThis soft and huggable pony is designed to be a calming lap companion. Its evenly distributed weight provides grounding deep pressure, which can help create a sense of security and calm. It's an ideal sensory support tool for home, classrooms , or during transitions.\nKey Benefits:\nProvides Calming Deep Pressure: The 4lb (1.81kg) weight is evenly distributed to feel like a secure, gentle hug.\nHuggable Lap Companion: Made from ultra-soft plush fabric, its size is perfect for resting on a lap during seated activities.\nSupports Focus & Calm: The steady, grounding input can help manage restlessness and support focus during homework, reading, or quiet time.\nDurable & Easy to Clean: Crafted for daily use and easy to spot clean with a damp cloth.\nHow It Works:\nThe 4 lbs of deep pressure stimulation provides sensory input that can help support self-regulation. It's a supportive companion for winding down, managing stressful moments, or simply providing tactile comfort.",
        "specifications": {},
        "features": [
          "Abley's Weighted Plush Friendly Pony | 4lb (1.81kg) Calming Lap Companion"
        ],
        "applications": [
          "anxiety",
          "autism",
          "bedtime",
          "calming",
          "deep-pressure",
          "home"
        ],
        "basePrice": 2338,
        "comparePrice": 4699,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serene-toys-weighted-plush-for-sensory-calming-beige-pony-front-therapeutic-badg.jpg?v=1764648118",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serene-toys-weighted-plush-for-sensory-calming-beige-pony-11-8-inch-height-yellow-stag.jpg?v=1764648121",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serene-toys-weighted-plush-for-sensory-calming-beige-pony-checklist-soothing-weighted-soft-huggable_fc5e418f-ae93-4a2b-b80c-ea8f1dab430a.jpg?v=1764648124",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serene-toys-weighted-plush-for-sensory-calming-beige-pony-saddle-up-text-peach-background_c97c1d3f-0d56-45fa-a87a-addeb0d56c80.jpg?v=1764648126",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serene-toys-weighted-plush-for-sensory-calming-boy-holding-pony-gently-weighte.jpg?v=1764648130"
        ],
        "shopifyUrl": "https://www.ableys.in/products/weighted-plush-for-sensory-calming-pony"
      },
      {
        "id": "sensory-body-sock-for-kids",
        "shopifyHandle": "sensory-body-sock-for-kids",
        "name": "Abley's Body Sock Original | Machine-Washable Sensory Cocoon",
        "categorySlug": "deep-pressure",
        "shortDescription": "Abley's Body Sock, Original, brings comfort and support with a unique twist. This sensory body sock for kids helps children experience deep pressure and calming input. The design uses soft, stretchy f",
        "description": "Abley's Body Sock, Original, brings comfort and support with a unique twist. This sensory body sock for kids helps children experience deep pressure and calming input. The design uses soft, stretchy fabric. Kids can move and push against their bodies. The sensory body sock for kids helps improve focus and body awareness.\nThe snug fit gives children a gentle, secure feeling. This product is often used for calming during sensory breaks. The body sock can help children relax. It also encourages imaginative play. This sensory body sock for kids is easy to use. Kids can get in and out without trouble. The fabric is breathable so children feel comfortable during use.\nParents like the machine-washable design. Cleaning is quick. Abley’s offers durability with reinforced stitching. The sock stands up to daily active play. In therapy, teachers and therapists use the sensory body sock for kids to help with self-regulation. The product promotes movement. It lets children stretch and push, which can build important motor skills.\nAbley’s Body Sock is portable. It folds and stores easily. Children can use it at home, school, or therapy centers. Families trust Abley’s for safe and high-quality tools. The sensory body sock for kids is tested for quality. It is gentle on skin and free from harsh dyes.\nKids of many ages enjoy using the sock for different needs. Some children use it for calming before bed. Others use it to prepare for schoolwork. The design fits a range of body types. Abley's aims to support children by providing practical tools. This sensory body sock for kids delivers a simple, supportive experience.",
        "specifications": {},
        "features": [
          "Abley's Body Sock Original | Machine-Washable Sensory Cocoon"
        ],
        "applications": [
          "autism",
          "body-awareness",
          "calming",
          "compression",
          "home-play",
          "proprioceptive"
        ],
        "basePrice": 1874,
        "comparePrice": 2606,
        "configOptions": {
          "sizes": [
            {
              "name": "Small (3-5 years)",
              "priceModifier": 0
            },
            {
              "name": "Medium (6-9 Years)",
              "priceModifier": 188
            },
            {
              "name": "Large (10-12 Years)",
              "priceModifier": 282
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-blue-girl-therapeutic-badge-recommended_5da5095a-704b-46da-9ece-93365e69d3f4.jpg?v=1764647672",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-bedroom-two-kids-blue-and-dino-print_2b4843d4-576a-4a18-8019-b5abf0090187.jpg?v=1765523744",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-blue-girl-full-length-arms-up_99109596-3e48-4fb8-910b-3ae365944cbc.jpg?v=1765523744",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-blue-lycra-girl-smile-arms-out_59f613b7-5267-41c4-b900-0e21e57002cf.jpg?v=1765523744",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-pair-kids-relax-bedroom-blue-and-dino_69d38182-e67e-4f56-b36d-98313c381693.jpg?v=1765523744",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/serenekids-sensory-body-sock-for-kids-size-chart-small-medium-large-blue_3bb8c1e7-14bf-4680-9269-4297ea946b1a.jpg?v=1765523744"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-body-sock-for-kids"
      },
      {
        "id": "jurassic-park-sensory-body-sock",
        "shopifyHandle": "jurassic-park-sensory-body-sock",
        "name": "Abley's Body Sock Jurassic Park Edition | Stretchy Cocoon",
        "categorySlug": "deep-pressure",
        "shortDescription": "Step into a world of fun and support with the Abley's Body Sock, Jurassic Park Edition. This Jurassic Park sensory body sock is made for children who need a calming aid for focus and self-regulation. ",
        "description": "Step into a world of fun and support with the Abley's Body Sock, Jurassic Park Edition. This Jurassic Park sensory body sock is made for children who need a calming aid for focus and self-regulation. The vibrant dinosaur print sparks the imagination. It gives a cozy, secure experience with soft, stretchy material.\nThe Jurassic Park sensory body sock wraps snugly around the body. This firm but gentle pressure offers deep touch input. Many kids feel comfort from this kind of deep pressure. Use the sock for calming down after school, during therapy, or before bed. The soft fabric lets the child stretch, twist, and move.\nDesigned for durability, this product stays strong through active play. Every seam is reinforced. The high-quality stretch fabric holds up to lots of movement. The opening is wide enough to let the child climb in and out with ease. It stays breathable and cool for long sessions.\nThe Jurassic Park sensory body sock helps boost focus during homework. Put it on at home, therapy centers, or special needs classrooms. Many parents see an improvement in focus and calm behavior. When worn, it cuts distractions and gives safe sensory feedback.\nWith its playful dinosaur design, the Jurassic Park sensory body sock fits right into any sensory room. Kids love the bright colors and familiar Jurassic Park theme. Busy hands and bodies get a safe way to move. This product is soft, stretchy, and easy to wash. The sock is easy to fold and store away. It will last through repeated use and many washes.\nTry the Jurassic Park sensory body sock from Ableys for children who need sensory input. Use it for stress relief, focus training, or playtime fun. With this product, every child can discover comfort, control, and a little adventure.",
        "specifications": {},
        "features": [
          "Abley's Body Sock Jurassic Park Edition | Stretchy Cocoon"
        ],
        "applications": [
          "autism",
          "body-awareness",
          "calming",
          "compression",
          "home-play",
          "proprioceptive"
        ],
        "basePrice": 1874,
        "comparePrice": 2606,
        "configOptions": {
          "sizes": [
            {
              "name": "Small (3-5 years)",
              "priceModifier": 0
            },
            {
              "name": "Medium(6-9 years)",
              "priceModifier": 188
            },
            {
              "name": "Large (10-12 years)",
              "priceModifier": 282
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/bt-jurassic-park-sensory-body-sock-therapeutic-tool-badge-child-arms-out.jpg?v=1764647671",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/bt-jurassic-park-sensory-body-sock-navy-dinosaur-print-child-front-zip.jpg?v=1765534591",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/bt-jurassic-park-sensory-body-sock-navy-dinosaur-print-child-smiling-center.jpg?v=1765534591",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/bt-jurassic-park-sensory-body-sock-navy-dinosaur-print-child-arms-out.jpg?v=1765534591",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/bt-jurassic-park-sensory-body-sock-size-chart-dimensions-therapist-recommended.jpg?v=1765534591"
        ],
        "shopifyUrl": "https://www.ableys.in/products/jurassic-park-sensory-body-sock"
      },
      {
        "id": "compression-vest-for-sensory-needs",
        "shopifyHandle": "compression-vest-for-sensory-needs",
        "name": "Abley's Sensory Compression Vest for Kids & Adults | Deep Pressure Calming Vest for Autism ADHD Sensory Needs | Snug & Adjustable",
        "categorySlug": "deep-pressure",
        "shortDescription": "Experience a constant, calming hug with the Abley's Compression Vest. Designed for both children and adults, this sensory vest provides steady, deep pressure to help soothe, calm, and focus. It's a tr",
        "description": "Experience a constant, calming hug with the Abley's Compression Vest. Designed for both children and adults, this sensory vest provides steady, deep pressure to help soothe, calm, and focus. It's a trusted tool for managing sensory needs, reducing anxiety, and helping to prevent overwhelm without the use of heavy weights.\nThe snug yet flexible design wraps the torso, providing a secure, comforting feeling that can help individuals feel more grounded and in control.\nKey Benefits & Features:\nPROMOTES CALM & FOCUS: The vest's hug-like feel provides organizing sensory input, helping to reduce restlessness and improve concentration during school, homework, or therapy.\nSOOTHING DEEP PRESSURE: Delivers consistent, gentle pressure to the torso, which can help calm the nervous system and reduce feelings of overwhelm for individuals with Autism, ADHD, or Sensory Processing Disorder.\nSNUG & ADJUSTABLE FIT: Easy-to-use hook-and-loop (Velcro) closures on the sides allow for a fully adjustable and secure fit, ensuring the pressure is \"just right\" and comfortable for the wearer.\nBREATHABLE ALL-DAY COMFORT: Made from a soft, stretchy, and breathable Neoprene blend (Nylon/Spandex), this vest is comfortable enough for all-day wear. It moves with the wearer and won't cause overheating.\nDISCREET & VERSATILE: This lightweight vest fits smoothly under everyday clothes, making it discreet for use at school, in the community, or at work. It has no buckles or hard parts that can press into the skin.\nDURABLE & EASY TO CARE FOR: Designed to withstand daily use, the premium materials hold their shape and elasticity. It's machine washable for easy care.\nWho Is It For?\nThe Abley's Compression Vest is an ideal sensory tool for:\nChildren and adults with sensory needs\nIndividuals with Autism (ASD) or ADHD\nAnyone who benefits from deep pressure to manage anxiety\nParents for use at home\nTeachers for use in the classroom\nTherapists as part of a sensory diet\nHow It Works: Unlike a weighted vest, this c",
        "specifications": {},
        "features": [
          "Abley's Sensory Compression Vest for Kids & Adults | Deep Pressure Calming Vest for Autism ADHD Sensory Needs | Snug & Adjustable"
        ],
        "applications": [
          "autism",
          "body-awareness",
          "calming",
          "classroom",
          "compression",
          "low-muscle-tone"
        ],
        "basePrice": 2343,
        "comparePrice": 3257,
        "configOptions": {
          "sizes": [
            {
              "name": "Small (2-4 Years)",
              "priceModifier": 0
            },
            {
              "name": "Medium (5-9 Years)",
              "priceModifier": 94
            },
            {
              "name": "Large (10-12 Years)",
              "priceModifier": 188
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-compression-vest-for-sensory-needs-flatlay-blue-vest-ableys-logo-therapeutic-badge_8b83cdde-96d2-4eb2-b772-a1ec9689b81f.jpg?v=1764648007",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-compression-vest-for-sensory-needs-back-view-blue-velcro-panels_01346d43-fb8f-4e0f-b381-eca9629bee69.jpg?v=1765780557",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-compression-vest-for-sensory-needs-child-front-side-back-blue-vest-collage_79972a3f-c2ac-4a0b-969c-153d36a5fabd.jpg?v=1765780557",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-compression-vest-for-sensory-needs-back-view-inset-closure-panels-deep-pressure_5323240d-e978-4cb7-ac57-e9a715fb721f.jpg?v=1765780557",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-compression-vest-for-sensory-needs-child-front-view-blue-vest-peace-sign_750c5e30-245b-4360-9ed4-31ae1f2c6dee.jpg?v=1765780557",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-compression-vest-for-sensory-needs-front-view-lightweight-layering-demo_b5c7583e-53d9-4a3b-bc84-1ebea0e3a242.jpg?v=1765780557",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-compression-vest-for-sensory-needs-side-view-strap-closeup-hook-and-loop_a630b7a5-8c87-4201-9b0e-f33761564134.jpg?v=1765780557",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-compression-vest-for-sensory-needs-size-chart-measurement-guide_6157e80b-5551-40f4-8e9c-50e96691820b.jpg?v=1765780557",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Compression-Vest.jpg?v=1766145224"
        ],
        "shopifyUrl": "https://www.ableys.in/products/compression-vest-for-sensory-needs"
      },
      {
        "id": "weighted-lap-pad-for-focus-minky-3lb",
        "shopifyHandle": "weighted-lap-pad-for-focus-minky-3lb",
        "name": "Abley’s Weighted Lap Pad with Minky Dots | Dual-Texture Sensory Lap Pad for Focus & Calm",
        "categorySlug": "deep-pressure",
        "shortDescription": "Struggling to find a tool to help manage fidgeting or support focus during seated activities? The Ableys Weighted Lap Pad offers a comforting, dual-texture solution designed to support sensory regulat",
        "description": "Struggling to find a tool to help manage fidgeting or support focus during seated activities? The Ableys Weighted Lap Pad offers a comforting, dual-texture solution designed to support sensory regulation and focus.\nKey Benefits\nCalming Deep Pressure: Provides gentle proprioceptive input to help encourage stillness and a sense of grounding during seated tasks.\nDual-Texture Design: Features two distinct surfaces—soft, tactile minky dots on one side and a smooth, cooling fabric on the other—to meet various sensory preferences.\nSupports Focus: A helpful tool for home, school , or travel to help manage fidgeting and promote concentration.\nDurable & Portable: The compact design is easy to carry, featuring double-stitched fabric that is machine washable for easy care.\nHow It Works\nThe gentle weight of the pad is designed to sit securely on the lap, providing deep pressure that can support relaxation. Users can choose between the raised minky dots for tactile stimulation or the smooth side for a more neutral feel, making it a versatile tool for various environments.",
        "specifications": {},
        "features": [
          "Abley’s Weighted Lap Pad with Minky Dots | Dual-Texture Sensory Lap Pad for Focus & Calm"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "attention",
          "autism",
          "calming",
          "classroom"
        ],
        "basePrice": 2437,
        "comparePrice": 3431,
        "configOptions": {
          "sizes": [
            {
              "name": "3lbs",
              "priceModifier": 0
            },
            {
              "name": "5lbs",
              "priceModifier": 281
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorywise-weighted-lap-pad-for-focus-blue-quilted-therapeutic-tool-machine-washable_8b588e43-9b1a-4c87-a85e-3971d35e2254.jpg?v=1764648118",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_qoaqu7qoaqu7qoa.jpg?v=1765531319",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorywise-weighted-lap-pad-for-focus-blue-minky-gray-edge-breathable-microfiber_799609b7-7402-474b-a6c5-6d6fdc09b1f8.jpg?v=1765531319",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorywise-weighted-lap-pad-for-focus-blue-quilted-equal-weight-pockets-minky_5315f3dd-10cd-4fa4-a85e-c722437b3cdc.jpg?v=1765531319",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorywise-weighted-lap-pad-for-focus-child-holding-draped-pad-textured-minky-blue_b6745e10-5c48-41d7-ba5c-805b20221bdc.jpg?v=1765531319",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorywise-weighted-lap-pad-for-focus-child-lying-with-pad-over-legs-blue-minky_f583a51a-f9d7-4c48-89b7-7cdc128715f0.jpg?v=1765531319",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorywise-weighted-lap-pad-for-focus-child-playing-with-teddy-on-pad-blue-minky_53f2ad94-bc5e-46e1-a787-cbdf1f782304.jpg?v=1765531319",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorywise-weighted-lap-pad-for-focus-child-sitting-with-upright-lap-pad-blue_65aefc87-1618-46e1-b590-68000f1c56e4.jpg?v=1765531319",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorywise-weighted-lap-pad-for-focus-child-using-on-lap-with-teddy-blue-minky_7e59719b-ad87-4deb-ba4f-67e913493084.jpg?v=1765531319",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Weighted-Lap-Pad.jpg?v=1766144716"
        ],
        "shopifyUrl": "https://www.ableys.in/products/weighted-lap-pad-for-focus-minky-3lb"
      },
      {
        "id": "weighted-blanket-for-kids-5lb",
        "shopifyHandle": "weighted-blanket-for-kids-5lb",
        "name": "Abley's Weighted Blanket Kids' | 5lbs (2.27kg ) | 7lbs (3.18Kg) | 22lbs (10kg) Hug for Restful Sleep",
        "categorySlug": "deep-pressure",
        "shortDescription": "Struggling to help your child settle down for bed or find calm during quiet time? Abley's Weighted Blankets are expertly designed to provide gentle, deep pressure that mimics the feeling of a comforti",
        "description": "Struggling to help your child settle down for bed or find calm during quiet time? Abley's Weighted Blankets are expertly designed to provide gentle, deep pressure that mimics the feeling of a comforting hug, helping restless bodies find peace.\nAvailable in 5lb (2.27kg), 7lb (3.18kg), and 22lb (10kg) options, there is a perfect weight for every stage of growth—from young children to teens and adults seeking deep sensory input.\nKey Benefits:\nSupports Calm & Relaxation: Deep pressure stimulation (DPS) helps soothe a restless nervous system, promoting a sense of security.\nEncourages a Settled Bedtime: The gentle, hugging sensation helps manage tossing and turning, supporting a deeper, more restorative night’s sleep.\nPremium Construction: Features non-toxic, hypoallergenic glass beads sewn into small, reinforced pockets to ensure even weight distribution without shifting.\nSoft & Breathable: Made from high-quality, breathable microfiber fabric, making it comfortable for year-round use in any season.\nEasy to Clean: The durable one-piece design is fully machine washable, ensuring easy care for busy parents.",
        "specifications": {},
        "features": [
          "Abley's Weighted Blanket Kids' | 5lbs (2.27kg ) | 7lbs (3.18Kg) | 22lbs (10kg) Hug for Restful Sleep"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "bedtime",
          "calming",
          "deep-pressure"
        ],
        "basePrice": 3374,
        "comparePrice": 4690,
        "configOptions": {
          "sizes": [
            {
              "name": "5lbs",
              "priceModifier": 0
            },
            {
              "name": "7lbs",
              "priceModifier": 188
            },
            {
              "name": "22lbs",
              "priceModifier": 1625
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/cozykids-weighted-blanket-for-kids-folded-grey-quilted-therapeutic-badge_2fca9568-55a4-4dec-85db-979060d4cb1c.jpg?v=1764648068",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/cozykids-weighted-blanket-for-kids-cute-designs-oeko-tex-microfiber-interior-ties_2a15391b-a47f-4d6f-b767-2ebb17660b94.jpg?v=1765455277",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/cozykids-weighted-blanket-for-kids-girl-lying-hugging-teddy-grey_a84a61cd-48eb-4d0c-9804-9c08cc4f5582.jpg?v=1765455277",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/cozykids-weighted-blanket-for-kids-girl-with-teddy-on-bed-grey-quilted_36537cfe-8dd8-465c-a786-7bdfcd5020f0.jpg?v=1765455277",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/cozykids-weighted-blanket-for-kids-girl-wrapped-in-blanket-hood-grey_9e4a0bfb-57f4-4e1b-a5fb-3d6af4f2c182.jpg?v=1765455277",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_ecw0rxecw0rxecw.jpg?v=1765455277",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Gemini_Generated_Image_ouwcobouwcobouw.jpg?v=1765455277",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Weighted-Blanket.jpg?v=1766732221"
        ],
        "shopifyUrl": "https://www.ableys.in/products/weighted-blanket-for-kids-5lb"
      },
      {
        "id": "compression-bed-sheet-for-sensory-needs",
        "shopifyHandle": "compression-bed-sheet-for-sensory-needs",
        "name": "Abley's Compression Bed Sheet Stretchy Nylon | Cool Restful Sleep",
        "categorySlug": "deep-pressure",
        "shortDescription": "Struggling to find all-night comfort without overheating? This stretchy compression bed sheet offers a cool, breathable alternative to traditional weighted blankets.",
        "description": "Struggling to find all-night comfort without overheating? This stretchy compression bed sheet offers a cool, breathable alternative to traditional weighted blankets.\nMade from a soft nylon and spandex blend, it slips over the mattress to provide consistent, gentle compression that feels like a calming hug. This deep pressure can help individuals feel more grounded and secure.\nKey Benefits:\nProvides Calming Pressure: The stretchy fabric provides a consistent, gentle hug to support relaxation.\nCool & Breathable Comfort: A cooler, more breathable option than traditional weighted blankets.\nSupports a Settled Night: The gentle compression can help manage restlessness.\nEasy to Use: Simply slips over the mattress like a sleeve, staying in place all night.\nIt's a supportive tool for both children and adults who benefit from deep pressure, providing all-night comfort without the added weight or heat.",
        "specifications": {},
        "features": [
          "Abley's Compression Bed Sheet Stretchy Nylon | Cool Restful Sleep"
        ],
        "applications": [
          "anxiety",
          "autism",
          "bedtime",
          "calming",
          "compression",
          "deep-pressure"
        ],
        "basePrice": 3562,
        "comparePrice": 4995,
        "configOptions": {
          "sizes": [
            {
              "name": "96 cm by 170cm",
              "priceModifier": 0
            },
            {
              "name": "137cm by 170cm",
              "priceModifier": 937
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryco-compression-bed-sheet-for-sensory-needs-product-shot-girl-peeking-out-therapeutic-badge.jpg?v=1764647848",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryco-compression-bed-sheet-for-sensory-needs-blue-stretch-girl-smiling-hugging-sheet.jpg?v=1764647851",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryco-compression-bed-sheet-for-sensory-needs-blue-cover-girl-reading-on-bed.jpg?v=1764647853",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryco-compression-bed-sheet-for-sensory-needs-child-sleeping-under-blue-sheet-with-teddy.jpg?v=1764647855",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryco-compression-bed-sheet-for-sensory-needs-blue-fitted-sheet-half-bed-mattress-display.jpg?v=1764647857"
        ],
        "shopifyUrl": "https://www.ableys.in/products/compression-bed-sheet-for-sensory-needs"
      },
      {
        "id": "compression-bed-sheet-cotton-spandex-twin-bed",
        "shopifyHandle": "compression-bed-sheet-cotton-spandex-twin-bed",
        "name": "Abley's Compression Bed Sheet Stretchy Cotton | Soft Peaceful Sleep",
        "categorySlug": "deep-pressure",
        "shortDescription": "Looking for all-night calming pressure but prefer the natural feel of cotton? This stretchy compression bed sheet offers a soft, breathable alternative to weighted blankets.",
        "description": "Looking for all-night calming pressure but prefer the natural feel of cotton? This stretchy compression bed sheet offers a soft, breathable alternative to weighted blankets.\nMade from a soft, breathable cotton and spandex blend, it slips over the mattress to provide gentle, consistent compression. This hug-like sensation can help individuals feel more secure and grounded.\nKey Benefits:\nGentle, Consistent Compression: The stretchy cotton-spandex blend provides a comforting, secure feeling.\nSoft & Breathable Fabric: Offers the natural softness and breathability of cotton, ideal for comfortable use.\nSupports a Settled Night: The hug-like sensation can help manage restlessness.\nEasy to Use: Slips over the mattress like a sleeve and stays in place.\nIt's a supportive tool for both children and adults who benefit from deep pressure, providing all-night comfort with the soft feel of cotton.",
        "specifications": {},
        "features": [
          "Abley's Compression Bed Sheet Stretchy Cotton | Soft Peaceful Sleep"
        ],
        "applications": [
          "anxiety",
          "autism",
          "bedtime",
          "calming",
          "compression",
          "deep-pressure"
        ],
        "basePrice": 3843,
        "comparePrice": 5429,
        "configOptions": {
          "sizes": [
            {
              "name": "96 cm by 170cm",
              "priceModifier": 0
            },
            {
              "name": "137cm by 170cm",
              "priceModifier": 937
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-compression-bed-sheet-for-sensory-needs-product-shot-twin-sleeve-therapeutic.jpg?v=1764647848",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-compression-bed-sheet-for-sensory-needs-kids-collage-relaxation-soothing.jpg?v=1764647851",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-compression-bed-sheet-for-sensory-needs-boy-sitting-reading-light-blue-sleeve.jpg?v=1764647853",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-compression-bed-sheet-for-sensory-needs-quick-setup-twin-bed-sleeve-fitted.jpg?v=1764647855",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-compression-bed-sheet-for-sensory-needs-child-pulling-sheet-keeps-blanket.jpg?v=1764647857",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-compression-bed-sheet-for-sensory-needs-boy-lying-soothing-night-sleep.jpg?v=1764647859",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-compression-bed-sheet-for-sensory-needs-even-distributed-compression-reading.jpg?v=1764647860"
        ],
        "shopifyUrl": "https://www.ableys.in/products/compression-bed-sheet-cotton-spandex-twin-bed"
      },
      {
        "id": "weighted-lap-pad-for-focus-minky-dots",
        "shopifyHandle": "weighted-lap-pad-for-focus-minky-dots",
        "name": "Abley’s Weighted Lap Pad with Minky Dots | Dual-Texture Sensory Lap Pad for Focus & Calm",
        "categorySlug": "deep-pressure",
        "shortDescription": "You need a simple, discreet tool that provides the right sensory input to help them settle. You've tried fidgets, but they sometimes become a distraction themselves. You're looking for a silent, effec",
        "description": "You need a simple, discreet tool that provides the right sensory input to help them settle. You've tried fidgets, but they sometimes become a distraction themselves. You're looking for a silent, effective tool that provides grounding, proprioceptive input to help them modulate, stay on task, and feel secure during class, homework, or mealtimes.\nKey Benefits:\nSupports Focus: The grounding weight helps manage restlessness, supporting focus during schoolwork, meals, or car rides.\nEngaging Minky Dot Texture: The soft, raised dots provide a satisfying, quiet texture for restless fingers to explore.\nDual-Sided for Tactile Input: Offers both the soft minky dot texture and a smooth cotton surface for varied sensory preferences.\nPortable & Discreet: The ideal size for use at home, in the classroom, or during travel.\nHow It Works\nThis lap pad provides proprioceptive (deep pressure) input, which can be calming and help support body awareness. The tactile minky dots offer a quiet, sensory outlet for busy hands. This combination helps create a calming routine and can support seated attention without distracting others.",
        "specifications": {},
        "features": [
          "Abley’s Weighted Lap Pad with Minky Dots | Dual-Texture Sensory Lap Pad for Focus & Calm"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "attention",
          "autism",
          "calming",
          "classroom"
        ],
        "basePrice": 2437,
        "comparePrice": 3431,
        "configOptions": {
          "sizes": [
            {
              "name": "3lbs",
              "priceModifier": 0
            },
            {
              "name": "5lbs",
              "priceModifier": 281
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/calmwise-weighted-lap-pad-for-focus-girl-smiling-therapeutic-tool-badge-pink.jpg?v=1764648118",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/calmwise-weighted-lap-pad-for-focus-pink-minky-equal-weight-pockets.jpg?v=1765863084",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/calmwise-weighted-lap-pad-for-focus-double-sided-pink-blue-minky-microfiber.jpg?v=1765863084",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/calmwise-weighted-lap-pad-for-focus-child-sitting-pink-lap-pad-concentration.jpg?v=1765863084",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/calmwise-weighted-lap-pad-for-focus-girl-sitting-calming-soothing-pressure-pink.jpg?v=1765863084",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/calmwise-weighted-lap-pad-for-focus-size-chart-3lbs-5lbs-kids-weight-range.jpg?v=1765863084",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/calmwise-weighted-lap-pad-for-focus-child-lying-asleep-pink-lap-pad.jpg?v=1765863084"
        ],
        "shopifyUrl": "https://www.ableys.in/products/weighted-lap-pad-for-focus-minky-dots"
      }
    ]
  },
  {
    "slug": "fidgets-focus",
    "title": "Fidgets & Focus Tools",
    "description": "Pop tubes, fidget boxes, stress balls, stretchy strings, putty, and sensory toys designed to improve attention and self-regulation.",
    "color": "from-orange-500 to-amber-600",
    "image": "https://www.ableys.in/cdn/shop/collections/1257x329_a14b5e0c-3d3d-47f2-8e03-e2e8e6da23eb.jpg?v=1766789750&width=600",
    "products": [
      {
        "id": "hand-exercise-putty-set-4x50g",
        "shopifyHandle": "hand-exercise-putty-set-4x50g",
        "name": "Abley's Hand Exercise Putty Set | 4 Resistance Levels 4x 50g Tubs",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Discover the Abley's Hand Exercise Putty Set, designed for anyone seeking effective hand therapy and sensory support. This hand exercise putty set features four different resistance levels. Each set i",
        "description": "Discover the Abley's Hand Exercise Putty Set, designed for anyone seeking effective hand therapy and sensory support. This hand exercise putty set features four different resistance levels. Each set includes four 50g tubs, so you can choose the strength that suits your needs.\nThe x-soft, soft, medium, and firm putties in this hand exercise putty set help with finger strength, flexibility, and fine motor skills. Easy to pinch, squeeze, twist, or stretch, each color corresponds to a unique resistance. Beginners and experienced users will find the right option for gradual progress.\nThis hand exercise putty set uses high-grade silicone. It stays soft and smooth between uses. No sticky residue or mess on hands. The putty comes in sturdy tubs that keep it fresh and ready for your next session.\nPhysical therapists and teachers can use the hand exercise putty set for rehabilitation or classroom activities. It is suited for children, adults, and seniors who want to build grip or reduce stiffness. The small tubs fit easily in a bag, so you can take hand therapy on the go.\nMany people use the hand exercise putty set to support sensory needs. It acts as a calming fidget, contributing to focus and self-regulation. Sensory seekers and those with fine motor challenges often benefit from daily use.\nAbley’s is committed to quality and long-lasting design. This hand exercise putty set resists breaking and crumbling. The vibrant colors make each session engaging. High durability ensures it lasts through repeated stretches and squeezes, supporting steady progress.\nWhether for recovery, strength, or sensory needs, the hand exercise putty set adapts to your goals. Trusted by therapists and families, it brings flexibility and relief with every use. Experience the benefits of a premium hand exercise putty set from Abley’s.",
        "specifications": {},
        "features": [
          "Abley's Hand Exercise Putty Set | 4 Resistance Levels 4x 50g Tubs"
        ],
        "applications": [
          "adhd",
          "classroom",
          "developmental-delays",
          "fidget",
          "fine-motor",
          "focus"
        ],
        "basePrice": 1312,
        "comparePrice": 1933,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-hand-exercise-putty-set-therapy-jar-with-stacked-tins-xsoft-soft-medium-firm.jpg?v=1764647900",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-hand-exercise-putty-set-open-tubs-four-colors-xsoft-soft-medium-firm.jpg?v=1765455129",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-hand-exercise-putty-set-4pack-clear-jar-with-finger-stretch-demo.jpg?v=1765455129",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-hand-exercise-putty-set-hand-squeeze-blue-putty-fine-motor-demo.jpg?v=1765455129",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-hand-exercise-putty-set-four-exercise-modes-pinch-extend-squeeze-twist.jpg?v=1765455129",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Therapy-Putty-_100-gm_-Red.jpg?v=1766131652"
        ],
        "shopifyUrl": "https://www.ableys.in/products/hand-exercise-putty-set-4x50g"
      },
      {
        "id": "fidget-box-for-anxiety-and-focus",
        "shopifyHandle": "fidget-box-for-anxiety-and-focus",
        "name": "Abley's Fidget Box Favourites Assortment | 12-Piece Calming Sensory Kit",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Abley's Fidget Box, Favourites Assortment offers a complete sensory experience. Each set contains 12 calming tools designed to support children and adults. This all-in-one fidget box for anxiety and f",
        "description": "Abley's Fidget Box, Favourites Assortment offers a complete sensory experience. Each set contains 12 calming tools designed to support children and adults. This all-in-one fidget box for anxiety and focus helps manage stress and improve concentration in any environment.\nEvery item inside the fidget box for anxiety and focus has a unique texture and movement. You get spinning, stretching, squeezing, and twisting sensations. These are perfect for restless hands during work, study, or travel. The kit supports relaxation and provides a healthy outlet for nervous energy.\nAbley's Fidget Box is portable and easy to carry anywhere. Each piece is safe. The design fits in hands of all sizes. This makes the fidget box for anxiety and focus suitable for home, school, or office. The tools are easy to clean and long lasting. They withstand daily use by active children and busy adults.\nColors and shapes in the kit stimulate the senses. Bright and cheerful, the fidget box for anxiety and focus encourages sensory exploration. The set includes favorites like stretchy strings, spinning toys, textured rings, and water timers. Each one helps with calming routines or quick sensory breaks when tension rises.\nFamilies choose this box to support emotional regulation. Kids find tools to use quietly during reading or homework. Adults relieve stress or improve productivity. Teachers use these fidgets in classrooms for better focus and participation.\nEvery piece in Abley's Fidget Box for anxiety and focus meets high safety standards. The materials are tested and reliable. The compact storage box keeps everything organized and ready. This kit is a thoughtful gift for birthdays or special milestones.\nAbley's makes sensory support accessible. The fidget box for anxiety and focus is ideal for anyone who wants safe, effective relief from daily stress. Enjoy a calmer, more focused day using trusted premium sensory tools.",
        "specifications": {},
        "features": [
          "Abley's Fidget Box Favourites Assortment | 12-Piece Calming Sensory Kit"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 937,
        "comparePrice": 1100,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-08-25at21.47.32_5_0b03604a-9299-4bbf-9c9c-b0ae3827afe8.jpg?v=1764647847",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-08-25at21.48.19_cc87b578-aeee-4474-9bb3-e6312e221ecb.jpg?v=1764647851"
        ],
        "shopifyUrl": "https://www.ableys.in/products/fidget-box-for-anxiety-and-focus"
      },
      {
        "id": "ableys-fidget-box-mega-toolkit-33-piece-comprehensive-sensory-kit-copy",
        "shopifyHandle": "ableys-fidget-box-mega-toolkit-33-piece-comprehensive-sensory-kit-copy",
        "name": "Abley's Fidget Box | Mega Toolkit | 33-Piece Comprehensive Sensory Kit",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Discover a world of sensory exploration with the Abley's 33-Piece Fidget Box. This comprehensive kit includes 33 carefully selected fidget tools, such as pop tubes, stretchy strings, textured balls, s",
        "description": "Discover a world of sensory exploration with the Abley's 33-Piece Fidget Box. This comprehensive kit includes 33 carefully selected fidget tools, such as pop tubes, stretchy strings, textured balls, spinners, and more, all housed in a convenient storage box.\nDesigned to support self-regulation, each item provides a unique tactile experience to help channel restless energy, promote a sense of calm, and improve focus. Kids and adults can squeeze, twist, pop, and spin, engaging their hands and minds in a constructive way.\nMade from durable, child-safe materials, every tool is built to withstand repeated use. The bright, inviting colors and variety of textures keep users engaged. This versatile set is ideal for use at home, in the classroom, during therapy sessions, or for quiet moments during travel.\nProvide a constructive outlet for sensory needs with this complete and engaging fidget toolkit, perfect for supporting daily moments of calm and concentration.",
        "specifications": {},
        "features": [
          "Abley's Fidget Box | Mega Toolkit | 33-Piece Comprehensive Sensory Kit"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 1874,
        "comparePrice": 2499,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/33psc7i87_5b0a8f7a-9530-4199-abb0-a0b2a73df561.jpg?v=1764647900",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/23pscuaeuykyukky8_fd223483-8879-4016-acfc-8f4ed3cae210.jpg?v=1764647902",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333kkukuyk_7731c55a-7c62-4827-bab5-1e277d48b715.jpg?v=1764647905",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333thjtyy_d7705a56-835f-4def-91fe-899b9be419b5.jpg?v=1764647907",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333thty_c249c424-0b76-4e2c-ad09-e0468b99bcde.jpg?v=1764647909",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333yjttyh_c93b945f-23f4-4e0c-a352-5b946949b79e.jpg?v=1764647911",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/3336i7tj_e0038ebf-df99-4af2-865f-4f0de92e79e9.jpg?v=1764647912",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ytjytyt_3ffad8c1-9518-4738-8e5c-9c6dc9b23411.jpg?v=1764647914"
        ],
        "shopifyUrl": "https://www.ableys.in/products/ableys-fidget-box-mega-toolkit-33-piece-comprehensive-sensory-kit-copy"
      },
      {
        "id": "ableys-spiky-squeeze-balls-hand-strengthening-fidgets-3-pack",
        "shopifyHandle": "ableys-spiky-squeeze-balls-hand-strengthening-fidgets-3-pack",
        "name": "Abley's Spiky Squeeze Balls | Hand Strengthening Fidgets 3-Pack",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Discover Abley's Spiky Squeeze Balls, designed for anyone seeking effective hand therapy. These spiky squeeze balls for hand therapy come in a convenient 3-pack. Each ball features a spiky texture tha",
        "description": "Discover Abley's Spiky Squeeze Balls, designed for anyone seeking effective hand therapy. These spiky squeeze balls for hand therapy come in a convenient 3-pack. Each ball features a spiky texture that offers a satisfying sensory experience. The design helps stimulate tactile nerves in your fingers and palms.\nAbley's spiky squeeze balls for hand therapy are great for building hand strength. Squeezing the balls can relieve tension and stress. The textured spikes provide gentle massage while you use them. The colors inside each ball create a fun and engaging visual element. This makes them suitable for both adults and children.\nUse spiky squeeze balls for hand therapy during work or study breaks. They help improve focus and self-regulation. The balls are durable and easy to clean. Carry them in your bag or keep them on your desk. The size fits comfortably in your hand for both small and large hands.\nThese spiky squeeze balls for hand therapy can support sensory needs at home, in classrooms, or clinics. They are useful for people who want to boost grip strength or recover from minor hand injuries. Many therapists recommend spiky squeeze balls for hand therapy as a reliable fidget tool.\nEach pack includes three balls so you have extras to share. The materials are safe for daily use. Abley’s spiky squeeze balls for hand therapy are designed to withstand repeated squeezing. Use them as sensory tools to support calming routines or manage restless energy. Bright colors and a spiky shape make them appealing and practical for all ages.",
        "specifications": {},
        "features": [
          "Abley's Spiky Squeeze Balls | Hand Strengthening Fidgets 3-Pack"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "desensitization",
          "fidget",
          "portable",
          "sensory-play"
        ],
        "basePrice": 515,
        "comparePrice": 716,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-spiky-squeeze-balls-for-hand-therapy-three-balls-white-background-therapeutic-badge_19dbcb1e-8e00-4103-b224-fd92c5e1d11e.jpg?v=1764648068",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-spiky-squeeze-balls-for-hand-therapy-closeup-hand-stress-reliever-transparent-beads_3a9a454b-3063-46bc-a1de-9047ee2af5ae.jpg?v=1765537343",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-spiky-squeeze-balls-for-hand-therapy-floating-balls-feature-callouts-squeezing-hand_74cc2c96-d0e0-4858-9638-40be9d5894c8.jpg?v=1765537343",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-spiky-squeeze-balls-for-hand-therapy-hand-demo-anxiety-relief-orange-background_a841c5cc-ef5a-48da-92f0-339193223fc6.jpg?v=1765537343",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-spiky-squeeze-balls-for-hand-therapy-hand-squeezing-long-clear-tube-multicolor-beads_40ca0834-8e6a-4f18-bb28-03dcf2b54208.jpg?v=1765537343",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-spiky-squeeze-balls-for-hand-therapy-three-pack-box-clear-spiky-balls-multicolor_f5717570-057f-49ea-8220-f33eb7533a47.jpg?v=1765537343",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Spiky-ball---set-of-3.jpg?v=1766131431"
        ],
        "shopifyUrl": "https://www.ableys.in/products/ableys-spiky-squeeze-balls-hand-strengthening-fidgets-3-pack"
      },
      {
        "id": "ableys-fidget-box-mega-toolkit-23-piece-comprehensive-sensory-kit",
        "shopifyHandle": "ableys-fidget-box-mega-toolkit-23-piece-comprehensive-sensory-kit",
        "name": "Abley's Fidget Box | Mega Toolkit | 23-Piece Comprehensive Sensory Kit",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Explore a variety of sensory experiences with the Abley's 23-Piece Fidget Box. This curated kit features 23 unique sensory tools, including pop tubes, stretchy strings, textured balls, and more, all o",
        "description": "Explore a variety of sensory experiences with the Abley's 23-Piece Fidget Box. This curated kit features 23 unique sensory tools, including pop tubes, stretchy strings, textured balls, and more, all organized in a convenient storage box.\nDesigned to support focus and self-regulation, each item offers a distinct tactile feel to help channel restless energy and promote a sense of calm. Users can squeeze, twist, pop, and stretch, providing a constructive outlet for fidgeting.\nCrafted from durable, child-safe materials, every tool is designed to withstand frequent use. This versatile set is ideal for focused sessions at home, in the classroom, during therapy, or for quiet moments while traveling. Provide a complete and engaging toolkit to support daily sensory needs.",
        "specifications": {},
        "features": [
          "Abley's Fidget Box | Mega Toolkit | 23-Piece Comprehensive Sensory Kit"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 1218,
        "comparePrice": 1699,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/33psc9p809_ef2750c7-da32-49bc-bdc8-5d7f7da25da8.jpg?v=1764647900",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333tjyt_f75107b2-e521-4643-b05d-fd0f8ff2dc8f.jpg?v=1764647902",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/uyykjyukj_8ef7b4da-7a31-43cf-a89b-19021fe371d4.jpg?v=1764647905",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333ikykjy_112ac88d-e25f-4deb-afd4-61fa3b99345f.jpg?v=1764647907",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333kytuky_24f031bc-2ab9-4c90-9829-3808beb3080d.jpg?v=1764647909",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333ttjytj_ea4a5930-6e80-4cd2-afff-1c4bb9899cd6.jpg?v=1764647911",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333yhg5_ba913803-0e50-4034-a90e-62486969ff40.jpg?v=1764647912",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/3336u65t_e59ccfdf-adf8-443e-9567-86f4add6a1ac.jpg?v=1764647914"
        ],
        "shopifyUrl": "https://www.ableys.in/products/ableys-fidget-box-mega-toolkit-23-piece-comprehensive-sensory-kit"
      },
      {
        "id": "sensory-fidget-box-for-kids",
        "shopifyHandle": "sensory-fidget-box-for-kids",
        "name": "Abley's Fidget Box Mega Toolkit | 20-Piece Comprehensive Sensory Kit",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Discover the Abley's Fidget Box, Mega Toolkit—a sensory fidget box for kids designed for curious hands and busy minds.",
        "description": "Discover the Abley's Fidget Box, Mega Toolkit—a sensory fidget box for kids designed for curious hands and busy minds.\nInside, kids will find 20 distinct tools. Each item offers a unique sensory experience. There are squishy balls, stretchy noodles, pop tubes, and soft textured rings. These tools help release energy and manage fidgeting.\nThis sensory fidget box for kids suits various needs. It helps children stay calm and focused. Use it in classrooms, therapy sessions, or at home. The collection encourages quiet play and helps reduce stress.\nEach toy in the sensory fidget box for kids is selected for safety. Materials are non-toxic and built to last. Vibrant colors and different textures keep kids interested. There is something for every child in this box.\nTeachers and therapists trust this sensory fidget box for kids. It supports self-regulation and enhances concentration. Parents notice the positive change during homework or stressful times.\nThe compact kit is easy to store and carry. Children can bring it during travel or on school trips. All pieces fit neatly in the box for easy clean-up.\nGift the Abley's Fidget Box to help kids build fine motor skills. The tools offer tactile feedback and soothe restless fingers. Kids gain comfort, calmness, and a sense of control.\nSupport every child’s sensory journey with this sensory fidget box for kids. The kit gives options to redirect energy and support well-being. Ideal for children with ADHD, autism, or those who fidget. This box is a thoughtful, practical addition to any routine.",
        "specifications": {},
        "features": [
          "Abley's Fidget Box Mega Toolkit | 20-Piece Comprehensive Sensory Kit"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 2343,
        "comparePrice": 2600,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-08-25at21.47.33_2_1.jpg?v=1764647848",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-08-25at21.47.50_1.jpg?v=1764647851"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-fidget-box-for-kids"
      },
      {
        "id": "sensory-fidget-box-for-kids-ableys",
        "shopifyHandle": "sensory-fidget-box-for-kids-ableys",
        "name": "Abley's Fidget Box Mega Toolkit | 18-Piece Comprehensive Sensory Kit",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Abley's Fidget Box, Mega Toolkit brings together 20 unique tools in one handy set. This sensory fidget box for kids contains pop tubes, stretchy strings, spinners, and more. Every item supports differ",
        "description": "Abley's Fidget Box, Mega Toolkit brings together 20 unique tools in one handy set. This sensory fidget box for kids contains pop tubes, stretchy strings, spinners, and more. Every item supports different sensory needs and encourages self-regulation in children.\nKids can squeeze, twist, pop, and spin. Each piece from the sensory fidget box for kids is safe and easy to handle. The items are bright and colorful to make play fun and inviting. The box includes toys for restless hands and busy minds.\nFidgeting helps reduce stress and promotes focus. The sensory fidget box for kids is ideal for school, therapy sessions, and home use. Children can use these tools when studying or relaxing after a busy day.\nThis set suits kids who need extra calming or help with attention. Each tool offers a new way to channel energy. The durable materials make sure the sensory fidget box for kids lasts through repeated use.\nParents and teachers can enjoy the variety included in this kit. The different textures and movements keep children interested. Abley's designed the sensory fidget box for kids to give a toolkit that fits many ages and sensory needs.\nYou can use the fidget box during travel, at the dinner table, or for quiet breaks. The lightweight design makes it simple to carry anywhere. Kids can choose their favorite tool each day.\nGift the sensory fidget box for kids to support focus, calm, and comfort. Abley's ensures every piece meets safety standards. The box is packed with thoughtful options for daily sensory support.\nChildren who love variety will enjoy this collection. Each item brings a new sensory experience. The sensory fidget box for kids supports all kinds of play while building important skills.",
        "specifications": {},
        "features": [
          "Abley's Fidget Box Mega Toolkit | 18-Piece Comprehensive Sensory Kit"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 1499,
        "comparePrice": 1750,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-08-25at21.47.32_3_1.jpg?v=1764647848",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-08-25at21.48.06_1.jpg?v=1764647852"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-fidget-box-for-kids-ableys"
      },
      {
        "id": "ableys-fidget-box-mega-toolkit-22-piece-comprehensive-sensory-kit",
        "shopifyHandle": "ableys-fidget-box-mega-toolkit-22-piece-comprehensive-sensory-kit",
        "name": "Abley's Fidget Box | Mega Toolkit | 22-Piece Comprehensive Sensory Kit",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Struggling to find a tool to help your child focus? It's challenging when they are easily distracted, find it hard to concentrate, or have 'wiggles' that make seated activities difficult. You need sim",
        "description": "Struggling to find a tool to help your child focus? It's challenging when they are easily distracted, find it hard to concentrate, or have 'wiggles' that make seated activities difficult. You need simple, discreet tools that provide the right sensory input to help them settle. You've tried a single fidget, but it gets boring. You're looking for a complete, all-in-one solution that provides a variety of textures and movements to keep hands busy and support focus in the classroom, during homework, or while traveling. You need a \"starter kit\" to discover what works best.\nThis 22-Piece Fidget Box is an essential starter set curated to support focus and calm by providing a constructive outlet for restless hands.\nKey Benefits:\n22-Piece Variety Set: A curated starter kit with 22 tools to squeeze, spin, pop, and stretch.\nSupports Focus & Calm: Helps channel restless energy into a quiet, non-distracting activity.\nPortable & Organized: The entire 22-piece collection is housed in a durable, compact case, perfect for travel.\nDurable & Non-Toxic: Made from non-toxic materials for lasting engagement.\nHow It Helps:\nThis set helps users engage in quiet moments, making it an ideal companion for the classroom, office, or travel. By keeping hands busy, these tools can help support focus during listening activities or study sessions.",
        "specifications": {},
        "features": [
          "Abley's Fidget Box | Mega Toolkit | 22-Piece Comprehensive Sensory Kit"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 1124,
        "comparePrice": 1499,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/33psc_266a01bf-5e15-4c93-88c5-3b14fe59839a.jpg?v=1764647847",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333tjy6y_ff507c42-2dc6-44f0-8851-eaeeb6e17093.jpg?v=1764647851",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333ty7ujty_5dadfd25-1400-4238-b9a3-43de6b646204.jpg?v=1764647853",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333ukyk_161d398f-1aed-4b05-9f94-39142514c8ea.jpg?v=1764647854",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333uyky_0cc76db0-7e89-4659-9986-84657bcb7201.jpg?v=1764647856",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333uyyuk_4d18d386-3b65-4b61-b940-5a7b324b20d8.jpg?v=1764647858"
        ],
        "shopifyUrl": "https://www.ableys.in/products/ableys-fidget-box-mega-toolkit-22-piece-comprehensive-sensory-kit"
      },
      {
        "id": "unicorn-stretchy-fidget-strings-5-pack",
        "shopifyHandle": "unicorn-stretchy-fidget-strings-5-pack",
        "name": "Abley's Stretchy Fidget Strings Unicorn Design Magical Calming Sensory Tool 5-Pack Multicolour",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Discover a magical way to ease stress and boost focus with Abley's unicorn stretchy fidget strings. Each pack brings five different colors. These unicorn stretchy fidget strings look bright and playfu",
        "description": "Discover a magical way to ease stress and boost focus with Abley's unicorn stretchy fidget strings. Each pack brings five different colors. These unicorn stretchy fidget strings look bright and playful. Children and adults enjoy using them for calming moments at school, home, or work.\nThe adorable unicorn-shaped ends add fun to every stretch. The soft, flexible design feels smooth in your hands. You can bend, twist, pull, or tie these unicorn stretchy fidget strings in many ways. They snap back to shape every time. This tool suits anyone who wants to improve focus or self-regulation.\nTeachers like having unicorn stretchy fidget strings in the classroom. Therapists use them for sensory breaks. Parents find them helpful for daily routines or travel. These strings work quietly. They do not disrupt others during meetings or lessons.\nSafety matters here. The material is high-quality and non-toxic. Abley’s unicorn stretchy fidget strings are built to last through many stretches and pulls. Each rainbow set supports daily sensory needs.\nCleaning these unicorn stretchy fidget strings is simple. Warm water and mild soap will do. Their size fits all ages. Slip a few in a bag or drawer for on-the-go calming.\nChoose Abley's unicorn stretchy fidget strings to add joy and comfort to any sensory toolkit. The gentle texture and cute design support fidgeting without drawing unwanted attention. They make thoughtful gifts for anyone needing sensory support or just a little magic in their day.",
        "specifications": {},
        "features": [
          "Abley's Stretchy Fidget Strings Unicorn Design Magical Calming Sensory Tool 5-Pack Multicolour"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "attention",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 438,
        "comparePrice": 608,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-unicorn-stretchy-fidget-strings-closeup-unicorn-heads-multiple-views_518d88e8-d500-4717-8ead-f42e1c5d59f5.jpg?v=1764648068",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-unicorn-stretchy-fidget-strings-hand-holding-colorful-bundle_e237d0eb-8004-47c3-910d-104e7b278282.jpg?v=1764648070",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-unicorn-stretchy-fidget-strings-pastel-six-pack-unicorn-heads_85a51ecb-aca8-4c0c-9b10-00067d9e66cf.jpg?v=1764648073",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-unicorn-stretchy-fidget-strings-scattered-pile-gift-for-adults_f25708a0-fbff-4938-a20c-079798fadde4.jpg?v=1764648075",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-unicorn-stretchy-fidget-strings-stretch-up-to-50-inches-demo_df14e344-af8d-4e7d-b947-d751631b7520.jpg?v=1764648078",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Abley_s-Stretchy-Fidget-Strings-Unicorn-Design-Magical-Calming-Sensory-Tool-5-Pack-Multicolour_1.jpg?v=1767871491"
        ],
        "shopifyUrl": "https://www.ableys.in/products/unicorn-stretchy-fidget-strings-5-pack"
      },
      {
        "id": "ableys-fidget-box-7-piece-comprehensive-sensory-kit",
        "shopifyHandle": "ableys-fidget-box-7-piece-comprehensive-sensory-kit",
        "name": "Abley's Fidget Box | 7-Piece Comprehensive Sensory Kit",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Struggling to find a tool to help your child focus? It's challenging when they are easily distracted, find it hard to concentrate, or have 'wiggles' that make seated activities difficult. You need a s",
        "description": "Struggling to find a tool to help your child focus? It's challenging when they are easily distracted, find it hard to concentrate, or have 'wiggles' that make seated activities difficult. You need a simple, discreet tool that provides the right sensory input to help them settle. You've tried other fidgets, but they're often noisy, get lost, or become a distraction themselves. You're looking for a portable, all-in-one solution that provides a variety of textures and movements to keep hands busy and support focus in the classroom, during homework, or while traveling.\nThis portable set features 7 sensory tools, thoughtfully selected to engage the hands and support focus.\nKey Benefits:\n7-Tool Variety Pack: Includes 7 curated tools to stretch, pop, squish, and spin, providing a core variety of movements.\nSupports Focus & Calm: Offers a quiet, non-distracting way to channel restless energy, supporting better concentration.\nDiscreet & Portable: The compact case is ideal for quiet use in classrooms , offices, or during travel.\nDurable Materials: Made from non-toxic materials for everyday use.\nHow It Works:\nEach of the 7 tools is chosen to support self-regulation in a discreet way. The durable, compact case keeps your essential tools protected and ready for any moment.",
        "specifications": {},
        "features": [
          "Abley's Fidget Box | 7-Piece Comprehensive Sensory Kit"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 1687,
        "comparePrice": 2299,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsApp_Image_2025-11-17_at_2.48.54_PM_e7723d06-7d0d-4616-a083-5ec463e3aeef.jpg?v=1764647847",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333hgert_91677947-a95b-4d9c-b1b1-42fc1d213c94.jpg?v=1764647851",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333trhr_e2cccdfb-cfa7-409c-9f59-c3d93df2aa93.jpg?v=1764647853",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/333tygrehg_8440e26b-8a06-4144-b79e-0e7dba3b79ac.jpg?v=1764647855",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/3336tujtj_5702fa07-65a4-4ce5-8158-82b30ba7cc8a.jpg?v=1764647856",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsApp_Image_2025-11-18_at_6.15.32_PM_cff054bb-8393-45ae-adb6-6226b76a12d4.jpg?v=1764647858"
        ],
        "shopifyUrl": "https://www.ableys.in/products/ableys-fidget-box-7-piece-comprehensive-sensory-kit"
      },
      {
        "id": "stretchy-fidget-strings-for-kids-ableys",
        "shopifyHandle": "stretchy-fidget-strings-for-kids-ableys",
        "name": "Abley's Stretchy Fidget Strings Caterpillar Design | Calming Sensory Tool",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Struggling with restless energy or difficulty staying focused during quiet tasks? Abley's Stretchy Fidget Strings Caterpillar provide a discreet and effective way to manage fidgeting needs without dis",
        "description": "Struggling with restless energy or difficulty staying focused during quiet tasks? Abley's Stretchy Fidget Strings Caterpillar provide a discreet and effective way to manage fidgeting needs without distracting others.\nKey Benefits & Highlights:\nSupports Focus: Channels restless energy into a productive sensory outlet to help maintain concentration.\nSatisfying Tactile Feedback: Features a unique caterpillar texture that provides rich sensory input.\nDevelops Fine Motor Skills: Stretching, wrapping, and squeezing helps build hand strength and coordination.\nDurable & Safe: Made from high-quality, non-toxic silicone rubber for long-lasting, worry-free play.\nPromotes Calm: Encourages a sense of relaxation through repetitive, rhythmic movement.\nHow It Works\nThese caterpillar-themed strings are designed for versatile sensory exploration. Users can stretch them up to several feet, wrap them around fingers, or squeeze the textured \"legs\" for immediate tactile relief. Unlike many noisy fidget toys, these strings are completely silent, making them ideal for classrooms, offices, or travel. The resilient material always returns to its original shape, ensuring a consistent sensory experience every time.",
        "specifications": {},
        "features": [
          "Abley's Stretchy Fidget Strings Caterpillar Design | Calming Sensory Tool"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "attention",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 438,
        "comparePrice": 608,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-stretchy-fidget-strings-for-kids-packaging-box-with-six-strings-therapeutic-seal_221d19e2-90a2-49e7-8e9e-1259b876e28a.jpg?v=1764648068",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-stretchy-fidget-strings-for-kids-hand-grip-rich-colors-closeup_d8ca66bc-2265-4f88-aa2d-94ad8c53a734.jpg?v=1764648070",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-stretchy-fidget-strings-for-kids-hands-stretching-multicolor-gift-box_1c5ed21c-1154-4c90-a8f5-581c5bd5f36f.jpg?v=1764648073",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-stretchy-fidget-strings-for-kids-multicolor-row-on-white-background_a674a2e5-fb8d-403d-9582-93535ade98d5.jpg?v=1764648075",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-stretchy-fidget-strings-for-kids-pastel-chains-draped-over-palm_7e64ec5d-53b2-4e56-86ef-40c83ab47762.jpg?v=1764648078",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Fidget-Strings-1.jpg?v=1766814767"
        ],
        "shopifyUrl": "https://www.ableys.in/products/stretchy-fidget-strings-for-kids-ableys"
      },
      {
        "id": "stretchy-fidget-strings-for-anxiety-relief",
        "shopifyHandle": "stretchy-fidget-strings-for-anxiety-relief",
        "name": "Abley's Stretchy Fidget Strings Original | Non-Toxic Fidget for Focus",
        "categorySlug": "fidgets-focus",
        "shortDescription": "A quiet and satisfying fidget for busy hands.",
        "description": "A quiet and satisfying fidget for busy hands.\nThese quiet and satisfying stretchy strings are made from durable, non-toxic elastic for worry-free play. A perfect quiet tool for busy hands, these strings provide satisfying tactile feedback to help improve focus and encourage a sense of calm. The stretching, wrapping, and squeezing of the strings helps build hand strength, dexterity, and coordination through engaging play.\nChannels restless energy into focus\nProvides satisfying tactile feedback\nDevelops fine motor skills\nDurable, non-toxic silicone rubber\nPromotes a sense of calm & concentration",
        "specifications": {},
        "features": [
          "Abley's Stretchy Fidget Strings Original | Non-Toxic Fidget for Focus"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "attention",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 360,
        "comparePrice": 499,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-stretchy-fidget-strings-for-anxiety-relief-box-packaging-six-neon-strings_37155341-7aa3-4c36-9d5f-061c22182a4c.jpg?v=1764648068",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-stretchy-fidget-strings-for-anxiety-relief-bright-multicolor-tangled-pile_1571197e-b8ed-4628-bbb1-e035701072b5.jpg?v=1764648070",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-stretchy-fidget-strings-for-anxiety-relief-hands-twisting-vertical-adult-gift_8d33219c-0c58-417a-833a-70ff6298f446.jpg?v=1764648072",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-stretchy-fidget-strings-for-anxiety-relief-multiple-views-hand-twist-collage_ad3844d4-f399-48c2-892d-68c0459a0fe1.jpg?v=1764648075",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-stretchy-fidget-strings-for-anxiety-relief-stretch-to-50-inches-two-hands_67474ba4-84b5-4f34-b705-10b4a46fbebe.jpg?v=1764648077",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Fidget-Strings.jpg?v=1766145050"
        ],
        "shopifyUrl": "https://www.ableys.in/products/stretchy-fidget-strings-for-anxiety-relief"
      },
      {
        "id": "abley-s-premium-sensory-stress-balls-for-adults-kids-anxiety-relief-fidget-toy-for-calming-focus-relaxation-therapy-sensory-toy-easter-basket-stuffer-gift",
        "shopifyHandle": "abley-s-premium-sensory-stress-balls-for-adults-kids-anxiety-relief-fidget-toy-for-calming-focus-relaxation-therapy-sensory-toy-easter-basket-stuffer-gift",
        "name": "Abley's Multicolor Stretchy Sensory Ball | Squishy Tactile Fidget Toy",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Feeling restless, overwhelmed, or struggling to find focus? It can be hard to find a quiet moment of calm in a busy world.",
        "description": "Feeling restless, overwhelmed, or struggling to find focus? It can be hard to find a quiet moment of calm in a busy world.\nMeet the Abley’s Multicolor Stretchy Sensory Ball! This soft, flexible fidget toy is designed to help support a sense of calm and engage the senses. Squeeze, stretch, and watch as the tiny, colorful beads move and squish under your fingers, providing satisfying tactile feedback.\nHow It Helps:\nThis sensory ball is an ideal tool for individuals seeking sensory input. The squishy, gel-like texture provides a pleasant tactile experience, while the action of squeezing and stretching can help manage restlessness and support focus, making it a valuable addition to any home, classroom, or office.\nKey Features:\nFilled with Tiny Beads: A transparent outer shell packed with colorful mini balls that shift and glide as you squeeze.\nSuper Stretchy & Squishy: Features a soft, gel-like texture that stretches, molds, and bounces back for endless fidgeting.\nSupports Calming Needs: A great tool for fidgeting, promoting a sense of calm, and aiding focus.\nSensory-Friendly Design: Excellent for children and adults with sensory processing needs, including those with autism or ADHD, as a supportive tool.\nSafe & Durable: Made with premium, non-toxic, BPA-free materials that are soft, durable, and leak-resistant.",
        "specifications": {},
        "features": [
          "Abley's Multicolor Stretchy Sensory Ball | Squishy Tactile Fidget Toy"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "fidget",
          "portable",
          "sensory-play",
          "stress-relief"
        ],
        "basePrice": 514,
        "comparePrice": 599,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-10-27at16.41.42.jpg?v=1764647954",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-10-27at16.41.43_1.jpg?v=1765617992",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-10-27at16.41.43.jpg?v=1765617992",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-10-27at16.41.44_1.jpg?v=1765617992",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-10-27at16.41.44.jpg?v=1765617992",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-10-27at16.41.45.jpg?v=1765617992"
        ],
        "shopifyUrl": "https://www.ableys.in/products/abley-s-premium-sensory-stress-balls-for-adults-kids-anxiety-relief-fidget-toy-for-calming-focus-relaxation-therapy-sensory-toy-easter-basket-stuffer-gift"
      },
      {
        "id": "small-pop-tubes-fidget-toy-5-pack",
        "shopifyHandle": "small-pop-tubes-fidget-toy-5-pack",
        "name": "Abley's Pop Tubes Small Size | Multi-Sensory Fidget 5-Pack",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Discover sensory fun with Abley's Pop Tubes, Small Size. This 5-pack brings colorful play to your fingertips and is designed for those who need focus or calming support. Each small pop tubes fidget to",
        "description": "Discover sensory fun with Abley's Pop Tubes, Small Size. This 5-pack brings colorful play to your fingertips and is designed for those who need focus or calming support. Each small pop tubes fidget toy is made for easy stretching, bending, and connecting. These tubes create satisfying popping sounds that grab attention and help with self-regulation.\nKids and adults can use a small pop tubes fidget toy to relieve stress or fidget in busy settings. The tactile texture encourages hands-on exploration and improves finger strength. Bright colors make the set visually appealing. Each small pop tubes fidget toy fits easily into a backpack, desk drawer, or therapy kit. Durable plastic stands up to repeated play and stretching.\nTherapists and teachers trust Abley's sensory products for quality and effectiveness. Each small pop tubes fidget toy is safe for everyday use with smooth, rounded edges. The tubes interlock, allowing endless creative shapes and patterns. Use them in classrooms, at home, or during travel.\nA small pop tubes fidget toy supports occupational therapy routines and helps children with sensory needs build focus. The lightweight design works well for group activities or solo play. They are easy to wash and maintain. Families choose this small pop tubes fidget toy set for calm moments and quiet time.\nBring joy and practical support to daily routines with these playful tubes. Choose Abley's small pop tubes fidget toy 5-pack for an unbeatable sensory experience.",
        "specifications": {},
        "features": [
          "Abley's Pop Tubes Small Size | Multi-Sensory Fidget 5-Pack"
        ],
        "applications": [
          "adhd",
          "attention",
          "autism",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 150,
        "comparePrice": 208,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1iykyky.jpg?v=1764648007",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2werfew_6b023948-105c-4848-a325-94f196fd480e.jpg?v=1764648009",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-29p9u.jpg?v=1764648012",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2uo8u.jpg?v=1764648014",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2yoo.jpg?v=1764648016",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-thtr.jpg?v=1764648018"
        ],
        "shopifyUrl": "https://www.ableys.in/products/small-pop-tubes-fidget-toy-5-pack"
      },
      {
        "id": "fidget-pop-tubes-5-pack-large-ableys",
        "shopifyHandle": "fidget-pop-tubes-5-pack-large-ableys",
        "name": "Abley's Pop Tubes Large Size | Multi-Sensory Fidget 5-Pack",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Discover a playful way to support sensory needs with Abley's Pop Tubes, Large Size. This fidget pop tubes 5 pack offers bright colors and satisfying pops. Each tube stretches, bends, and twists. Peopl",
        "description": "Discover a playful way to support sensory needs with Abley's Pop Tubes, Large Size. This fidget pop tubes 5 pack offers bright colors and satisfying pops. Each tube stretches, bends, and twists. People love the popping sound and tactile feedback. These fidget pop tubes 5 pack sets are suited for both children and adults.\nThe tubes feature a durable design. Large sizes make gripping easy. This set delivers hours of focus and stimulation. The fidget pop tubes 5 pack is a favorite tool for classrooms and therapy rooms. Kids use them as a quiet distraction. Adults find them calming during work or stressful moments.\nThese tubes help improve fine motor skills. Pulling and compressing them builds hand strength. Children on the autism spectrum enjoy the sensory relief. Therapists recommend the fidget pop tubes 5 pack for self-regulation.\nParents choose Abley's for safe sensory play. The cheerful design makes the fidget pop tubes 5 pack a fun gift. They fit well in backpacks or at desks. Each pack invites discovery and movement.\nEvery fidget pop tubes 5 pack from Abley's meets high-quality standards. The tubes withstand frequent stretching and twisting. Bright colors attract attention and spark interest.\nPeople buy these tubes for group play. The sound can encourage social interaction. Teachers use them to keep kids focused. Sensory seekers love the repeated popping sensation.\nThe fidget pop tubes 5 pack works at home, school, or therapy centers. You can share with friends thanks to the five-pack set. Busy hands stay active and engaged. Stress levels go down with gentle sensory input.\nWith Abley's Pop Tubes, variety and fun come together. This product is a reliable, engaging addition to sensory tool kits everywhere.",
        "specifications": {},
        "features": [
          "Abley's Pop Tubes Large Size | Multi-Sensory Fidget 5-Pack"
        ],
        "applications": [
          "adhd",
          "attention",
          "autism",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 197,
        "comparePrice": 274,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-fidget-pop-tubes-5-pack-multicolor-display-with-therapeutic-tool-badge.jpg?v=1764647954",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-fidget-pop-tubes-5-pack-colorful-set-stretched-up-to-26-inch.jpg?v=1765799657",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-fidget-pop-tubes-5-pack-learning-sensory-input-promo-blue-box.jpg?v=1765799657",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-fidget-pop-tubes-5-pack-therapist-recommended-sensory-development-box.jpg?v=1765799657",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-fidget-pop-tubes-5-pack-five-tubes-lined-flat-multicolor-shown.jpg?v=1765799657",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-fidget-pop-tubes-5-pack-multi-sensory-input-icons-and-box-display.jpg?v=1765799657",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-fidget-pop-tubes-5-pack-multicolor-tubes-standing-in-branded-box.png?v=1765799657"
        ],
        "shopifyUrl": "https://www.ableys.in/products/fidget-pop-tubes-5-pack-large-ableys"
      },
      {
        "id": "chew-necklace-pack-of-3-yellow-blue-red",
        "shopifyHandle": "chew-necklace-pack-of-3-yellow-blue-red",
        "name": "Abley's Chewable Necklaces Building Block | 3-Pack Oral Motor Fidget",
        "categorySlug": "fidgets-focus",
        "shortDescription": "A best-value 3-pack of donut chew necklaces.",
        "description": "A best-value 3-pack of donut chew necklaces.\nThis best-value 3-pack ensures a safe chewing tool is always on hand, perfect for managing your child's oral sensory needs. This three-pack of our popular donut-shaped chew necklaces is a cost-effective way to ensure a safe chewing tool is available wherever it might be needed, empowering individuals to manage their own sensory needs.\nEnsures safe chewing tool always on hand\nBest-value 3-pack\nManages child's oral sensory needs\nEncourages self-regulation\nCost-effective solution",
        "specifications": {},
        "features": [
          "Abley's Chewable Necklaces Building Block | 3-Pack Oral Motor Fidget"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "calming",
          "chew",
          "classroom"
        ],
        "basePrice": 702,
        "comparePrice": 977,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapy-tools-chewable-necklaces-for-sensory-needs-yellow-red-blue-vertical-silicone-bumps-cord.jpg?v=1764647782",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapy-tools-chewable-necklaces-for-sensory-needs-silicone-textured-rectangles-easy-to-clean.jpg?v=1765800248",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/chewbuddy-chewable-necklace-for-kids-yellow-red-benefits-relieve-anxiety.jpg?v=1765864893",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapy-tools-chewable-necklaces-for-sensory-needs-aqua-blue-yellow-bpa-free-food-grade-silicone.jpg?v=1765800248",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapy-tools-chewable-necklaces-for-sensory-needs-red-blue-closeup-textured-therapy-tool.jpg?v=1765800248",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapy-tools-chewable-necklaces-for-sensory-needs-four-colors-hanging-textured-sensory-stimulation.jpg?v=1765800248"
        ],
        "shopifyUrl": "https://www.ableys.in/products/chew-necklace-pack-of-3-yellow-blue-red"
      },
      {
        "id": "chewable-necklace-for-kids-2-pack",
        "shopifyHandle": "chewable-necklace-for-kids-2-pack",
        "name": "Abley's Chewable Necklaces Building Block | 2-Pack Oral Motor Fidget",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Discover how Abley's Chewable Necklaces offer comfort and support for kids who need sensory input every day. Each set includes two colorful building block pendants. They look fun and are safe to use. ",
        "description": "Discover how Abley's Chewable Necklaces offer comfort and support for kids who need sensory input every day. Each set includes two colorful building block pendants. They look fun and are safe to use. The material is food-grade silicone. It is non-toxic and free from harmful substances. This chewable necklace for kids is perfect for children who like to chew while concentrating or calming themselves.\nThe necklace has a sturdy breakaway cord. It helps keep your child safe during use. Kids can use the chewable necklace for kids at school, at home, or while traveling. The design is bright and playful. It draws attention in a positive way and is easy for kids to wear all day.\nThe textured surface of each pendant gives sensory feedback. Many children with sensory needs enjoy these sensations. The chewable necklace for kids can also help manage fidgeting. It gives a place for repetitive chewing. This may reduce shirt chewing or nail biting.\nThe pendants are easy to clean. Just wash them with mild soap and water. They dry quickly and are ready to use again. The set includes two necklaces. Children can switch colors for variety.\nParents and therapists trust Abley’s for sensory tools. Kids with autism, ADHD, or other sensory challenges may benefit from a chewable necklace for kids. It encourages focus and self-soothing. Many teachers and caregivers see improvement with daily use.\nAbley's designs sensory solutions that last. This chewable necklace for kids is durable for daily wear. Its unique building block style stands out. Children enjoy both the look and the feel.\nChoose Ableys for sensory support you can count on. Provide your child with a fun way to meet their needs with each chewable necklace for kids.",
        "specifications": {},
        "features": [
          "Abley's Chewable Necklaces Building Block | 2-Pack Oral Motor Fidget"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "calming",
          "chew",
          "classroom"
        ],
        "basePrice": 468,
        "comparePrice": 651,
        "configOptions": {
          "sizes": [
            {
              "name": "Red + Blue",
              "priceModifier": 0
            },
            {
              "name": "Yellow + Blue",
              "priceModifier": 0
            },
            {
              "name": "Yellow + Red",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/chewbuddy-chewable-necklace-for-kids-red-blue-therapeutic-tool-badge.jpg?v=1764647783",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/chewbuddy-chewable-necklace-for-kids-easy-to-clean-water-sterilizer-multi-color.jpg?v=1765864893",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/chewbuddy-chewable-necklace-for-kids-yellow-blue-pair-black-cord.png?v=1765864893",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/chewbuddy-chewable-necklace-for-kids-yellow-red-pair-black-cord.png?v=1765864893",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorybuddy-chewable-necklace-for-sensory-needs-silicone-pendant-bpa-free-food-grade.jpg?v=1765864893",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorybuddy-chewable-necklace-for-sensory-needs-textured-stud-pendants-therapy-tool-supervised.jpg?v=1765864893",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorybuddy-chewable-necklace-for-sensory-needs-four-color-textured-pendants-sensory-stimulation.jpg?v=1765864893",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/chewbuddy-chewable-necklace-for-kids-yellow-red-benefits-relieve-anxiety.jpg?v=1765864893"
        ],
        "shopifyUrl": "https://www.ableys.in/products/chewable-necklace-for-kids-2-pack"
      },
      {
        "id": "chew-necklace-green-1",
        "shopifyHandle": "chew-necklace-green-1",
        "name": "Abley's Chewable Necklace Building Block | Oral Motor Fidget 1 Pc",
        "categorySlug": "fidgets-focus",
        "shortDescription": "A simple and stylish chew necklace for oral needs.",
        "description": "A simple and stylish chew necklace for oral needs.\nThis white donut-shaped chew necklace is a simple, stylish, and effective tool that provides a safe and appropriate outlet for mild chewing and oral sensory needs. It is designed to help promote calm and focus by redirecting chewing away from items that can be damaging to teeth or health.\nOffers subtle sensory support\nProvides safe, appropriate chewing outlet\nPromotes calm & focus\nSafe alternative to harmful chewing\nHelps self-regulate & block distractions",
        "specifications": {},
        "features": [
          "Abley's Chewable Necklace Building Block | Oral Motor Fidget 1 Pc"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "calming",
          "chew",
          "classroom"
        ],
        "basePrice": 267,
        "comparePrice": 342,
        "configOptions": {
          "sizes": [
            {
              "name": "Red",
              "priceModifier": 0
            },
            {
              "name": "Blue",
              "priceModifier": 0
            },
            {
              "name": "Green",
              "priceModifier": 0
            },
            {
              "name": "Yellow",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorybuddy-chewable-necklace-for-sensory-needs-red-silicone-stud-pendant-therapeutic.jpg?v=1764647735",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/61fQyOGb_EL._SX679.jpg?v=1765615840",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorybuddy-chewable-necklace-for-sensory-needs-aqua-silicone-stud-pendant-closeup.jpg?v=1765615840",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorybuddy-chewable-necklace-for-sensory-needs-textured-stud-pendants-therapy-tool-supervised.jpg?v=1765864893",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorybuddy-chewable-necklace-for-sensory-needs-silicone-stud-pendant-relieve-anxiety-speech.jpg?v=1765615840",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorybuddy-chewable-necklace-for-sensory-needs-silicone-pendant-bpa-free-food-grade.jpg?v=1765864893",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorybuddy-chewable-necklace-for-sensory-needs-silicone-stud-rectangle-washable-easy-to-clean.jpg?v=1765615840",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorybuddy-chewable-necklace-for-sensory-needs-four-color-textured-pendants-sensory-stimulation.jpg?v=1765864893",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorybuddy-chewable-necklace-for-sensory-needs-light-blue-silicone-stud-pendant-straight-on.png?v=1765615840",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorybuddy-chewable-necklace-for-sensory-needs-yellow-silicone-stud-pendant-closeup.jpg?v=1765615840"
        ],
        "shopifyUrl": "https://www.ableys.in/products/chew-necklace-green-1"
      },
      {
        "id": "abley-s-spiky-sensory-rings-for-anxiety-adhd-bfrb-fidget-acupressure-rings-for-focus-stress-relief-finger-stimulation-durable-metal-massage-rings-for-kids-adultspack-of-6",
        "shopifyHandle": "abley-s-spiky-sensory-rings-for-anxiety-adhd-bfrb-fidget-acupressure-rings-for-focus-stress-relief-finger-stimulation-durable-metal-massage-rings-for-kids-adultspack-of-6",
        "name": "Spiky Acupressure Rings for Fingers – Set of 6- Fidget Massage Rings for Focus & Tactile Stimulation",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Regain calm and focus with these Spiky Acupressure Rings, designed to provide gentle pressure and tactile input. Made from durable plastic, each ring offers satisfying resistance when rolled up and do",
        "description": "Regain calm and focus with these Spiky Acupressure Rings, designed to provide gentle pressure and tactile input. Made from durable plastic, each ring offers satisfying resistance when rolled up and down the fingers. Ideal for classrooms, offices, or travel, these rings are a quiet way to keep hands busy, helping to regulate sensory input, reduce fidgeting, and promote better concentration. Whether used to improve focus or as a quiet calming tool, these portable, discreet rings are a must-have in your sensory toolkit.\nKey Features:\nProvides Tactile Feedback: The spiky texture provides soothing sensory feedback to help improve focus and concentration.\nSupports Fidgeting Needs: Helps keep hands engaged, which can be beneficial for managing restlessness or inattention.\nFlexible & Durable: Made with high-quality stretchable plastic that fits most finger sizes without breaking.\nPortable & Discreet: Easy to carry in a pocket, purse, or pencil case for on-the-go calming support.\nGreat for All Ages: Useful for kids, teens, and adults in school, at work, or any time a quiet fidget is needed.",
        "specifications": {},
        "features": [
          "Spiky Acupressure Rings for Fingers – Set of 6- Fidget Massage Rings for Focus & Tactile Stimulation"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "desensitization",
          "fidget",
          "focus",
          "portable"
        ],
        "basePrice": 281,
        "comparePrice": 599,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2uky45y54e5_f0ce32b0-7b45-4704-8e8e-3994db9158b5.jpg?v=1764648214",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2ukyi7_1314edea-feb6-4b21-8808-c4713efb3e74.jpg?v=1765795186",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2ukyjr_637b1c29-1e7e-4b33-ad18-338bc7a80134.jpg?v=1765795186",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-egherre_603e375e-b212-4720-8065-b841440cfabe.jpg?v=1765795186",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-uk76ykjy_1474d5b1-a270-405f-a8a3-2351331be646.jpg?v=1765795186",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Spiky-Acupressure-Rings-for-Fingers-_-Set-of-Fidget-Massage-Rings-for-Focus-_-Tactile-Stimulation.jpg?v=1766142491"
        ],
        "shopifyUrl": "https://www.ableys.in/products/abley-s-spiky-sensory-rings-for-anxiety-adhd-bfrb-fidget-acupressure-rings-for-focus-stress-relief-finger-stimulation-durable-metal-massage-rings-for-kids-adultspack-of-6"
      },
      {
        "id": "ableys-sensory-silicone-stretchy-bracelets-multi-color-textured-rings-stress-relief-fidget-toy-for-autism-support-4-pack",
        "shopifyHandle": "ableys-sensory-silicone-stretchy-bracelets-multi-color-textured-rings-stress-relief-fidget-toy-for-autism-support-4-pack",
        "name": "Sensory Silicone Stretchy Bracelets 4-Pack of Multi-Color Textured Rings for Fidgeting & Chewing",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Abley’s Sensory Bracelets are designed to support kids who benefit from tactile feedback or have an urge to chew. Made from soft, flexible, and safe silicone, these textured bracelets provide oral and",
        "description": "Abley’s Sensory Bracelets are designed to support kids who benefit from tactile feedback or have an urge to chew. Made from soft, flexible, and safe silicone, these textured bracelets provide oral and tactile stimulation. The fun, colorful designs can be worn as bracelets or used as handheld fidget toys, helping with focus and providing a safe outlet for chewing. Durable, stretchable, and easy to clean, they are a great addition for home, school, or travel.\nKey Features:\nSet of 4 Textured Bracelets: Includes four colorful, wearable fidgets with unique textures.\nSafe for Chewing: Made from food-grade, BPA-free silicone to provide a safe chewing outlet.\nProvides Sensory Input: Offers both oral sensory and tactile feedback to help improve focus and self-regulation.\nSoft, Stretchy & Durable: A flexible design that can be stretched and pulled, making it a long-lasting fidget tool.\nWearable & Portable: Can be worn as a stylish bracelet or used as a hand fidget, ensuring it's always available when needed.",
        "specifications": {},
        "features": [
          "Sensory Silicone Stretchy Bracelets 4-Pack of Multi-Color Textured Rings for Fidgeting & Chewing"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "chew",
          "fidget",
          "on-the-go"
        ],
        "basePrice": 656,
        "comparePrice": 849,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-28yoptgfn_a855fcc1-d972-4614-9925-6bf164d1ff87.jpg?v=1764648214",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-28yoptujtyuj_21a7a46f-82cb-4602-9994-a77c15dbc2a2.jpg?v=1764648216",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-28yopyuku_cfd9f835-a6a7-477c-93bf-4b3bee46cb20.jpg?v=1764648219",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-fjgjg_658d1f8e-8166-43c7-bbae-482e23fbb702.jpg?v=1764648221",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-hjfjhtg_afa4747d-7a98-4bbd-a11a-de94d84e4943.jpg?v=1764648224",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-tjtyt_7774842b-08de-497a-89ed-7010c4196109.jpg?v=1764648226",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-tjytj_df302fb1-1976-4705-9794-73c01bc3bda8.jpg?v=1764648228",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Sensory-Silicone-Stretchy-Bracelets_-4-Pack-of-Multi-Color-Textured-Rings-for-Fidgeting-_-Chewing.jpg?v=1766734787"
        ],
        "shopifyUrl": "https://www.ableys.in/products/ableys-sensory-silicone-stretchy-bracelets-multi-color-textured-rings-stress-relief-fidget-toy-for-autism-support-4-pack"
      },
      {
        "id": "abley-s-elastic-autism-awareness-bracelet-for-kids-soft-stretchable-wristband-with-puzzle-pattern-lightweight-comfortable-sensory-bracelet-for-spd-adhd-and-autism-support-9x2-5cm-6g",
        "shopifyHandle": "abley-s-elastic-autism-awareness-bracelet-for-kids-soft-stretchable-wristband-with-puzzle-pattern-lightweight-comfortable-sensory-bracelet-for-spd-adhd-and-autism-support-9x2-5cm-6g",
        "name": "Colorful Puzzle Pattern Stretch Bracelet for Kids – Soft & Lightweight Wristband",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Show your support for unity and acceptance with this vibrant Puzzle Pattern Bracelet. Designed with colorful puzzle patterns that symbolize community, this bracelet is both meaningful and stylish. Cra",
        "description": "Show your support for unity and acceptance with this vibrant Puzzle Pattern Bracelet. Designed with colorful puzzle patterns that symbolize community, this bracelet is both meaningful and stylish. Crafted from soft, stretchable fabric, it’s gentle on the skin and ideal for daily wear. Lightweight (only 6g) and perfectly sized (9x2.5 cm), it comfortably fits small wrists without causing irritation. A thoughtful accessory for community events, school spirit days, or as a symbol of support and inclusion.\nKey Features:\nSymbol of Support: Features iconic multicolor puzzle pieces, a universal symbol of community and understanding.\nComfortable & Stretchy Fit: Made with soft, elastic material that adjusts gently to the wrist for a comfortable, non-restrictive fit.\nDesigned for Kids: Ideal size (9x2.5cm) and lightweight (6g) build, designed for small wrists and everyday wear.\nSensory-Friendly Feel: The smooth fabric and flexible construction provide pleasant and gentle tactile input.\nGreat Gift Idea: Perfect for awareness events, school programs, party favors, or as a fashionable accessory.",
        "specifications": {},
        "features": [
          "Colorful Puzzle Pattern Stretch Bracelet for Kids – Soft & Lightweight Wristband"
        ],
        "applications": [
          "adhd",
          "autism",
          "fidget",
          "on-the-go",
          "portable",
          "tactile"
        ],
        "basePrice": 280,
        "comparePrice": 499,
        "configOptions": {
          "sizes": [
            {
              "name": "Puzzle Pattern + Rainbow Arc",
              "priceModifier": 0
            },
            {
              "name": "Rainbow Love with Heart",
              "priceModifier": 0
            },
            {
              "name": "Puzzle Band with Heart Patch",
              "priceModifier": 0
            },
            {
              "name": "Hope with Peace Hand Sign",
              "priceModifier": 0
            },
            {
              "name": "Sunflower with Puzzle Heart",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2ukyTGEG_af66323a-cd5c-44d5-9298-d505928b9f6c.jpg?v=1764648162",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2uky7i67567_132417a9-a29e-4669-9652-fb731362c5c0.jpg?v=1764648165",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2uky97p98_c63343c8-50c3-4503-8d37-03b122022191.jpg?v=1764648167",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2uky453gt534gf_530e76d1-6d15-486e-a2b1-40880a1994c8.jpg?v=1764648170",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2ukyhtrhgrg_81e2d9e0-584e-4afd-bf08-90b1f1f19afc.jpg?v=1764648172",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2ukytjktkj_a543bd5b-adbe-4db6-ae31-fe584388074a.jpg?v=1764648174",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2ukytyujty_842612a3-afb0-44bf-8088-9c95935c6fe7.jpg?v=1764648175",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-8lu8i_11ab231a-9e95-4997-9df3-174b0454d081.jpg?v=1764648176",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-8ol879l89_9bb9e372-043f-4936-b132-3ad84a6ba7d5.jpg?v=1764648178",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-876o7_b34e0099-d1c9-4488-aa3f-9e256b86def7.jpg?v=1764648179",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-mytjk_8bdae433-f3b3-43fb-b8c1-97b28e3e3913.jpg?v=1764648181"
        ],
        "shopifyUrl": "https://www.ableys.in/products/abley-s-elastic-autism-awareness-bracelet-for-kids-soft-stretchable-wristband-with-puzzle-pattern-lightweight-comfortable-sensory-bracelet-for-spd-adhd-and-autism-support-9x2-5cm-6g"
      },
      {
        "id": "liquid-motion-timer-for-kids-3-pack",
        "shopifyHandle": "liquid-motion-timer-for-kids-3-pack",
        "name": "Abley's Liquid Motion Timer | Visual Timer Fidget",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Struggling to manage transitions, support quiet time, or find a simple, engaging tool to help soothe an overstimulated mind? The Abley's Liquid Motion Timer provides a captivating visual experience de",
        "description": "Struggling to manage transitions, support quiet time, or find a simple, engaging tool to help soothe an overstimulated mind? The Abley's Liquid Motion Timer provides a captivating visual experience designed to support calm and focus.\nThis pack includes three unique timers. Just flip one over and watch the colorful bubbles and droplets flow slowly from top to bottom in a predictable, rhythmic pattern. This gentle, mesmerizing motion is ideal for visual sensory input.\nKey Benefits:\nCalming Visual Input: The slow, predictable flow of the colorful bubbles is mesmerizing and helps to support a sense of calm.\nSupports Transitions: An excellent tool for classrooms or home, helping to ease the shift between activities by providing a clear visual cue.\nEncourages Quiet Focus: Acts as a silent fidget, capturing attention and helping to support focus during homework or quiet time.\nDurable & Engaging: Made from sturdy materials with bright, engaging colors. This 3-pack is perfect for sharing.\nHow It Works:\nThis is not a traditional timer for measuring time, but rather a sensory tool. The predictable motion provides comfort and a quiet point of focus. It's a tool often used by therapists and teachers to assist with self-regulation and provide a quiet sensory break.",
        "specifications": {},
        "features": [
          "Abley's Liquid Motion Timer | Visual Timer Fidget"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "calming",
          "classroom",
          "focus",
          "home"
        ],
        "basePrice": 262,
        "comparePrice": 1143,
        "configOptions": {
          "sizes": [
            {
              "name": "1",
              "priceModifier": 0
            },
            {
              "name": "2",
              "priceModifier": 206
            },
            {
              "name": "3",
              "priceModifier": 394
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-motion-timer-for-kids-purple-pink-front-and-side-view-therapeutic-badge_e0c6cab1-8afb-4fd0-8a6b-9522d97e8be0.jpg?v=1764647954",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-motion-timer-for-kids-dimensions-5-7-inches-height-2-2-inches-width_da1408fc-b8ad-4f50-b4c5-d61f93c67987.jpg?v=1765457055",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-motion-timer-for-kids-red-and-blue-flip-droplets-action_12f9b72d-4054-44eb-9d73-84ab24c94d48.jpg?v=1765457055",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-motion-timer-for-kids-three-color-timers-with-packaging_5f0cc98d-5b22-4ebc-82fe-6bef1590acdd.jpg?v=1765457055",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-motion-timer-for-kids-three-timers-kids-party-background_134cef80-79ed-4e10-847e-7b224a55437c.jpg?v=1765457055",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Abley_s-Liquid-Motion-Timer--Visual-Timer-Fidget.jpg?v=1766140286"
        ],
        "shopifyUrl": "https://www.ableys.in/products/liquid-motion-timer-for-kids-3-pack"
      },
      {
        "id": "liquid-motion-pen-fidget-for-anxiety",
        "shopifyHandle": "liquid-motion-pen-fidget-for-anxiety",
        "name": "Abley's Liquid Motion Pen | Functional Fidget",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Abley's Liquid Motion Pen | Functional Fidget, is a unique sensory tool designed for everyday use. This pen offers a soothing experience through its flowing liquid bubbles. Many people find it ideal a",
        "description": "Abley's Liquid Motion Pen | Functional Fidget, is a unique sensory tool designed for everyday use. This pen offers a soothing experience through its flowing liquid bubbles. Many people find it ideal as a liquid motion pen fidget for anxiety, especially when they need calm during busy moments at work or school.\nEach pack includes three pens with vibrant liquid chambers. Watching the colorful bubbles move up and down draws your focus. This quiet movement helps redirect nervous energy. The liquid motion pen fidget for anxiety supports attention and self-regulation. It is made from sturdy materials, ensuring it will last through daily use.\nThe pen writes smoothly on paper. Its balanced weight feels good in your hand. You get the benefit of a writing tool and fidget toy in one. This feature makes it perfect for both students and professionals. Teachers use it in classrooms to help students concentrate. Adults keep it on their desks for moments of stress.\nThe pen needs no batteries. It works anywhere at any time. Its simple design fits easily into backpacks or pencil cases. The liquid motion pen fidget for anxiety adds a playful touch to your day without distraction or noise.\nAbley's Liquid Motion Pen is safe, non-toxic, and easy to clean. It meets high safety standards for children and adults. Each pen is crafted with care because focus and calm are important for everyone. Use it during meetings, study sessions, or when waiting in line. The liquid motion pen fidget for anxiety helps you stay centered and feel more relaxed.\nThis 3-pack provides value by allowing you to keep one at home, one at work, and one in your bag. Many users mention gifting it to friends and family who enjoy calming sensory tools. Try the Abley's Liquid Motion Pen 3-Pack and discover how simple movements can bring peace to your day.",
        "specifications": {},
        "features": [
          "Abley's Liquid Motion Pen | Functional Fidget"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "calming",
          "fidget",
          "on-the-go",
          "portable"
        ],
        "basePrice": 262,
        "comparePrice": 1143,
        "configOptions": {
          "sizes": [
            {
              "name": "1",
              "priceModifier": 0
            },
            {
              "name": "2",
              "priceModifier": 159
            },
            {
              "name": "3",
              "priceModifier": 394
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-motion-pen-fidget-for-anxiety-pink-single-pen-therapeutic-badge_8fa1da01-013a-4f1e-9f1d-c15f85ac241c.jpg?v=1764647954",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-motion-pen-fidget-for-anxiety-infographic-3-color-drops-child-drawing_b3c1ffbc-7c67-44e9-ac60-71bf828ae675.jpg?v=1765536297",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-motion-pen-fidget-for-anxiety-packaged-box-three-color-pen-se.jpg?v=1765536297",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-motion-pen-fidget-for-anxiety-teal-twist-retractable-ballpoint-hands_8ba4570c-0bf9-437c-849a-054ec25bfc34.jpg?v=1765536297",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-motion-pen-fidget-for-anxiety-three-motion-bubbler-pens-green-pink-blue_25ca6560-9de3-40ff-bef9-367c9e1f00d8.jpg?v=1765536297",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Abley_s-Liquid-Motion-Pen--Functional-Fidget.jpg?v=1766140564"
        ],
        "shopifyUrl": "https://www.ableys.in/products/liquid-motion-pen-fidget-for-anxiety"
      },
      {
        "id": "fidget-box-for-kids-essentials",
        "shopifyHandle": "fidget-box-for-kids-essentials",
        "name": "Abley's Fidget Box Essentials Collection | 14-Piece Tactile Fidgets",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Discover endless sensory fun with the Abley's Fidget Box, Essentials Collection. This set includes 14 unique tactile fidgets. Each toy is carefully selected. The fidget box for kids is designed to hel",
        "description": "Discover endless sensory fun with the Abley's Fidget Box, Essentials Collection. This set includes 14 unique tactile fidgets. Each toy is carefully selected. The fidget box for kids is designed to help children stay calm. It supports focus during schoolwork or quiet playtime. Each piece in the fidget box for kids is made with child-safe, durable materials. They are easy to hold and use, even for smaller hands.\nInside the fidget box for kids, find a variety of textures and movement styles. Squishy balls, stretchy strings, and pop tubes bring a gentle sensory experience. Kids can explore different sensations. The colorful designs keep attention and spark curiosity. These items make routine activities easier. Use them while completing homework, waiting in line, or transitioning between tasks.\nTeachers and therapists trust each fidget box for kids for its calming benefits. The box can fit neatly into backpacks or classroom bins. Take it to therapy sessions, classrooms, or on family outings. Children can self-soothe or improve focus without distraction. Every piece is washable and built to last. The fidget box for kids supports self-regulation for many situations.\nAbley's values quality and thoughtful design. The Essentials Collection stands out for its variety and reliability. The fidget box for kids fits many ages and sensory needs. It is a smart choice for families, teachers, and therapists who want easy tools for sensory regulation. Surprise a child with the fidget box for kids and watch them engage, discover, and relax during busy days.",
        "specifications": {},
        "features": [
          "Abley's Fidget Box Essentials Collection | 14-Piece Tactile Fidgets"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 1218,
        "comparePrice": 1450,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-08-25at21.47.32_4_1.jpg?v=1764647848",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-08-25at21.47.58_1.jpg?v=1764647851"
        ],
        "shopifyUrl": "https://www.ableys.in/products/fidget-box-for-kids-essentials"
      },
      {
        "id": "sensory-fidget-box-for-kids-starter-kit",
        "shopifyHandle": "sensory-fidget-box-for-kids-starter-kit",
        "name": "Abley's Fidget Box Starter Kit | 8-Piece Portable Sensory Tools",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Abley's Fidget Box, Starter Kit offers a sensory fidget box for kids who need support with focus and calming. This kit includes eight different sensory tools. Every piece fits into a compact box, maki",
        "description": "Abley's Fidget Box, Starter Kit offers a sensory fidget box for kids who need support with focus and calming. This kit includes eight different sensory tools. Every piece fits into a compact box, making it easy to carry everywhere. The bright colors and varied textures keep children engaged and interested.\nThe sensory fidget box for kids contains chewables, stretchy strands, and a liquid motion bubbler. These are safe and designed for children's hands. Kids can use the fidget tools in school, at home, or while traveling. The kit promotes self-regulation and helps kids manage stress.\nThe sensory fidget box for kids includes options that are easy to clean. Each item is made from strong, durable materials. Kids who are sensitive to textures will find something that feels right for them. Occupational therapists recommend these sensory tools for routine use.\nAbley's designed the sensory fidget box for kids to help with attention and calming. These tools allow quiet movement, so they work well in classrooms. Children can stay on task and avoid distractions. The kit suits children of different ages who have unique sensory needs.\nParents appreciate that the sensory fidget box for kids is ready to use out of the box. The set also makes a thoughtful gift. Abley's is well-known for quality and dedication to sensory care. The starter kit helps kids feel in control and more confident in their daily lives.\nThe sensory fidget box for kids fits perfectly into bags or backpacks. Kids can easily bring these tools wherever they go. Every item is tested to ensure safety. The tactile tools are gentle on hands and built to last. This kit can be part of a child’s daily routine.\nChildren who use the sensory fidget box for kids find comfort during overwhelming moments. Each tool helps with calming and focus. Abley's commitment to quality is clear in every product, making this kit a smart addition to any sensory support plan.",
        "specifications": {},
        "features": [
          "Abley's Fidget Box Starter Kit | 8-Piece Portable Sensory Tools"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 656,
        "comparePrice": 800,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-08-25at21.47.33_1_c335797e-bfb5-4b99-ba04-226c2c02b7b3.jpg?v=1764647848",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsApp_Image_2025-08-25_at_21.48.30_813e8b44-5012-41b2-964a-ed8b31e468c6.jpg?v=1764647851"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-fidget-box-for-kids-starter-kit"
      },
      {
        "id": "hand-strengthening-putty-for-adults-and-kids",
        "shopifyHandle": "hand-strengthening-putty-for-adults-and-kids",
        "name": "Abley's Hand Strengthening Putty | 4 Resistance Levels Fine Motor Skills Aid 50g",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Abley's Hand Strengthening Putty brings a simple way to build hand strength and flexibility. This hand strengthening putty for adults and kids is soft to the touch. It comes with four resistance level",
        "description": "Abley's Hand Strengthening Putty brings a simple way to build hand strength and flexibility. This hand strengthening putty for adults and kids is soft to the touch. It comes with four resistance levels. Each level meets different needs. You can start gentle and work up as your grip gets stronger.\nAbley's putty helps adults and children. Fine motor skill practice becomes fun. Squeeze, pinch, and stretch the putty as part of daily routines. Each tub holds 50g, enough for both big and small hands. Carry it in a bag or store it at your desk. The bright color is appealing and easy to spot.\nThis hand strengthening putty for adults and kids supports therapy goals. Occupational therapists recommend it for grip exercise. Teachers use it in school to keep restless hands busy. Families enjoy it for calm time at home. It is perfect for anyone seeking stronger fingers or stress relief.\nThe putty stays clean and smooth with each use. It is durable and resists breaking or drying. Abley's designs every tub with care. The product supports well-being and daily strength routines.\nHand strengthening putty for adults and kids is a reliable tool. It suits children with sensory needs and adults after injury. Athletes use it to keep their hands ready. Abley's offers a simple way to improve dexterity with every squeeze or stretch.",
        "specifications": {},
        "features": [
          "Abley's Hand Strengthening Putty | 4 Resistance Levels Fine Motor Skills Aid 50g"
        ],
        "applications": [
          "adhd",
          "classroom",
          "developmental-delays",
          "fidget",
          "fine-motor",
          "focus"
        ],
        "basePrice": 515,
        "comparePrice": 750,
        "configOptions": {
          "sizes": [
            {
              "name": "Blue",
              "priceModifier": 0
            },
            {
              "name": "Red",
              "priceModifier": 0
            },
            {
              "name": "Green",
              "priceModifier": 0
            },
            {
              "name": "Yellow",
              "priceModifier": 0
            },
            {
              "name": "Black",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsApp_Image_2025-06-19_at_12_147c97f3-3bcd-4bbe-8ce1-ceef3a161815.jpg?v=1766132015",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsApp_Image_2025-06-19_at_12.36.05_PM_2_bb7ba63a-9ee6-4d19-a0ab-4e351aae9071.jpg?v=1766132015",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-3youili_1_7e9ca1d3-c11e-49ed-b82a-70c34817aeb1.jpg?v=1765538919",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-uioluilui_79020fc2-f70f-4e33-97d0-725b8e896045.jpg?v=1765538919",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-yjytgy7t_8bb2a53b-8a4e-40d9-940d-4e406f7e8846.jpg?v=1765538919",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsApp_Image_2025-06-19_at_12.36.05_PM_1_12eb9da6-606f-4b10-b5ab-69e74696732c.jpg?v=1765538919",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsApp_Image_2025-06-19_at_12.36.05_PM_33ccf569-d6c4-42ac-8fee-43ced185028c.jpg?v=1765538919",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsApp_Image_2025-07-26_at_17_c5be84f7-0c4a-4523-a785-bd11a46e2d4a.jpg?v=1765538919",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Therapy-Putty-_100-gm_-Green.jpg?v=1766131747"
        ],
        "shopifyUrl": "https://www.ableys.in/products/hand-strengthening-putty-for-adults-and-kids"
      },
      {
        "id": "hand-exercise-putty-100g-4-levels",
        "shopifyHandle": "hand-exercise-putty-100g-4-levels",
        "name": "Abley's Hand Exercise Putty | 100g Tub | Silicone |Yellow",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Abley's Hand Exercise Putty comes in a 100g tub and suits many needs. This hand exercise putty is easy to use. It can help with finger strength, hand mobility, and stress relief. The putty is made of ",
        "description": "Abley's Hand Exercise Putty comes in a 100g tub and suits many needs. This hand exercise putty is easy to use. It can help with finger strength, hand mobility, and stress relief. The putty is made of high-quality silicone. It is soft, smooth, and comfortable to squeeze. People use hand exercise putty for physical therapy and rehabilitation.\nAbley's Hand Exercise Putty offers four different resistance levels. Each level serves a different purpose. Begin with a soft level for gentle movement. Choose firm resistance for building muscle. Switch levels as you progress. The flexibility helps with many exercises. It fits well in routines for kids and adults.\nDurable silicone makes this hand exercise putty long-lasting. The material stretches and bounces back. It will not crumble or stick to hands. You can clean it easily. Use it at home, school, or office. Place it on your desk for quick stress relief. Keep a tub in your therapy bag.\nHand exercise putty from Abley's helps with fine motor skills. Use it for finger stretches or hand strengthening. Children can improve handwriting grip. Adults can use it for rehabilitation. People dealing with arthritis or hand injuries find it helpful.\nAbley's hand exercise putty is odorless and safe. It suits both children and adults. Sensory seekers enjoy the smooth feel. Teachers and therapists trust this product. It supports sensory regulation. The putty serves as a fidget tool too. Keep focus with a few squeezes.\nEasy packaging allows for daily use. The tub keeps the hand exercise putty fresh. Take it during travel. Get through long meetings with ease. Every squeeze brings calm. Choose Abley's for durability and comfort.",
        "specifications": {},
        "features": [
          "Abley's Hand Exercise Putty | 100g Tub | Silicone |Yellow"
        ],
        "applications": [
          "adhd",
          "classroom",
          "developmental-delays",
          "fidget",
          "fine-motor",
          "focus"
        ],
        "basePrice": 796,
        "comparePrice": 1050,
        "configOptions": {
          "sizes": [
            {
              "name": "Yellow",
              "priceModifier": 0
            },
            {
              "name": "Green",
              "priceModifier": 0
            },
            {
              "name": "Blue",
              "priceModifier": 0
            },
            {
              "name": "Red",
              "priceModifier": 0
            },
            {
              "name": "Black",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-hand-exercise-putty-yellow-tub-top-view_debea8cf-99ff-44b6-a622-a68205421be9.jpg?v=1764647900",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-hand-exercise-putty-neon-green-tub-top-view_0785db06-1de3-4112-8619-bd894b0b732f.jpg?v=1765616713",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-hand-exercise-putty-blue-tub-top-view_9027c3d0-b44b-4b65-bac3-198dcfb115cc.jpg?v=1765616713",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-hand-exercise-putty-red-tub-top-view_96447c93-1728-4516-8df2-8ffa89d7eedc.jpg?v=1765616713",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-hand-exercise-putty-black-therapy-putty-sealed-tub-top-down_24f83572-f51d-4602-aadc-fe510e3d62c5.jpg?v=1765616713",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-3youili_1_b20754ea-0d84-4252-8adb-0edeab9ff6ad.jpg?v=1765616713",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-uioluilui_5735c126-c5fc-4365-95d9-d52e5a791c1c.jpg?v=1765616713",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-yjytgy7t_61e8441d-0668-4e7c-b789-9f0405296990.jpg?v=1765616713",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Therapy-Putty-_100-gm_-yellow.jpg?v=1766131543"
        ],
        "shopifyUrl": "https://www.ableys.in/products/hand-exercise-putty-100g-4-levels"
      },
      {
        "id": "sensory-number-gel-fidgets-10-pack",
        "shopifyHandle": "sensory-number-gel-fidgets-10-pack",
        "name": "Abley's Gel Fidgets Number Shapes (0-9) Sensory Learning Tool 10-Pack Multicolour",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Abley's Gel Fidgets, Number Shapes (0-9), Sensory Learning Tool, 10-Pack, Multicolour are designed for hands that need to fidget. These sensory number gel fidgets bring bright color and clear shapes. ",
        "description": "Abley's Gel Fidgets, Number Shapes (0-9), Sensory Learning Tool, 10-Pack, Multicolour are designed for hands that need to fidget. These sensory number gel fidgets bring bright color and clear shapes. Each pack includes ten numbers. Children feel the soft gel texture, squeeze, and twist the shapes. This keeps little hands busy and minds focused.\nThe sensory number gel fidgets help with number recognition through touch and sight. Students press each number to feel different resistance. This gives simple feedback and encourages calm. These tools support sensory needs during learning or quiet time.\nVivid multicolour designs attract attention. The gel fidgets work for classrooms, therapy, or calming routines at home. The number format doubles as a counting tool. Learning basic math becomes more engaging.\nDurable materials withstand daily handling. The gel inside moves gently with pressure. This creates a soothing tactile sensation. These fidgets are safe to squeeze, twist, and poke. Caregivers can use them as aids for children who crave touch input.\nEach number in the set is about the size of a child's palm. This size is right for grasping and exploring. These sensory number gel fidgets also support children learning shapes or colors. Parents and therapists appreciate the easy-to-clean surface. Soft soap and water keep each one fresh.\nAbley's Gel Fidgets are travel-friendly. They fit into backpacks or small containers. Use the sensory number gel fidgets during lessons, therapy, or when waiting in lines. They work for on-the-go or at home.\nEach purchase delivers quality and value. Sensory number gel fidgets help children engage with numbers in a playful way. Discover how they blend sensory play with practical learning. Try these for your next sensory support activity.",
        "specifications": {},
        "features": [
          "Abley's Gel Fidgets Number Shapes (0-9) Sensory Learning Tool 10-Pack Multicolour"
        ],
        "applications": [
          "classroom",
          "developmental-delays",
          "educational",
          "fidget",
          "learning",
          "sensory-play"
        ],
        "basePrice": 2343,
        "comparePrice": 3257,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/playlearn-sensory-number-gel-fidgets-full-set-0-to-9-colorful-numbers-therapeutic-badg.jpg?v=1764647901",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/playlearn-sensory-number-gel-fidgets-child-playing-with-numbers-1-2-3-tactil.jpg?v=1764647904",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/playlearn-sensory-number-gel-fidgets-number-4-and-5-pair-topview_be75d391-1edd-45c6-a288-3b0ee10a1423.webp?v=1764647906",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/playlearn-sensory-number-gel-fidgets-purple-number-1-gel-fidget-closeup_1a5dbeb4-2062-4cb1-90da-e4bd09489496.webp?v=1764647909",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsApp_Image_2026-01-08_at_11.30.10_AM.jpg?v=1767852060"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-number-gel-fidgets-10-pack"
      },
      {
        "id": "rainbow-slug-fidget-toy-clicky",
        "shopifyHandle": "rainbow-slug-fidget-toy-clicky",
        "name": "Abley's Clicky Slug Fidget Rainbow | Flexible Articulated Design 1 Piece",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Bring color and joy to your sensory routine with Abley's Clicky Slug Fidget, Rainbow. This rainbow slug fidget toy features a flexible, articulated design that fits comfortably in your hand. Each sect",
        "description": "Bring color and joy to your sensory routine with Abley's Clicky Slug Fidget, Rainbow. This rainbow slug fidget toy features a flexible, articulated design that fits comfortably in your hand. Each section clicks and bends, offering satisfying tactile feedback during play or stress relief.\nBright rainbow colors make this rainbow slug fidget toy eye-catching. The flexible joints allow smooth movement and endless fidgeting fun. The satisfying clicking sound helps with focus and relaxation. This tool works well for children and adults needing calm or distraction.\nThe rainbow slug fidget toy suits busy hands during homework, meetings, or downtime. It fits easily in a pocket or bag, letting you take it to school or the office. The smooth, durable material is gentle and built to last. Cleaning is simple with a damp cloth.\nUse this rainbow slug fidget toy for sensory breaks or calming activities. It helps regulate energy and soothe nerves. The friendly slug shape appeals to all ages. Its compact size keeps it close at hand for on-the-go sensory support.\nAbley's designs sensory tools for everyone. Each rainbow slug fidget toy reflects a focus on comfort and quality. Enjoy endless movement, soft clicking noises, and soothing color in one sturdy piece.",
        "specifications": {},
        "features": [
          "Abley's Clicky Slug Fidget Rainbow | Flexible Articulated Design 1 Piece"
        ],
        "applications": [
          "adhd",
          "attention",
          "fidget",
          "focus",
          "portable",
          "sensory-play"
        ],
        "basePrice": 235,
        "comparePrice": 300,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-rainbow-slug-fidget-toy-sensory-therapeutic-badge_65c31c1d-9288-4ab8-9e43-230444d49321.jpg?v=1764647847",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-rainbow-slug-fidget-toy-best-gift-for-kids-box_7df61cb9-af21-4939-b01d-acae70b00c1e.jpg?v=1765793817",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-rainbow-slug-fidget-toy-in-hand-size-demo_7721a21d-9586-4048-b8c8-d2b83b88f6e1.jpg?v=1765793817",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-rainbow-slug-fidget-toy-multicolor-with-box-20cm_829cad39-44c0-4700-9548-9f4f7dcb86d4.jpg?v=1765793817",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-rainbow-slug-fidget-toy-non-toxic-hypoallergenic_04433a25-b693-4b50-870a-0442710cb320.jpg?v=1765793817"
        ],
        "shopifyUrl": "https://www.ableys.in/products/rainbow-slug-fidget-toy-clicky"
      },
      {
        "id": "liquid-fidget-sensory-toys-glitter-6pk",
        "shopifyHandle": "liquid-fidget-sensory-toys-glitter-6pk",
        "name": "Abley's Liquid Fidgets Glitter Swirl Visual Tool 6-Pack Multicolour",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Abley's Liquid Fidgets, Glitter Swirl Visual Tool, 6-Pack brings sensory fun into your hands. This set offers a playful mix of colors and swirling glitter. The tactile feeling is satisfying. Each disc",
        "description": "Abley's Liquid Fidgets, Glitter Swirl Visual Tool, 6-Pack brings sensory fun into your hands. This set offers a playful mix of colors and swirling glitter. The tactile feeling is satisfying. Each disc is easy to grip. The movement inside creates soothing patterns. These liquid fidget sensory toys are great for children and adults. They can calm busy hands. They draw attention and help with focus.\nThe 6-pack set lets you switch colors. Every disc is filled with liquid and bright glitter. These liquid fidget sensory toys are strong. The material resists daily squeezing. They work for classrooms and therapy sessions. Use them during breaks or quiet time. Many people find the swirling effect relaxing. The toys are safe and non-toxic.\nAbley's designs each tool with care. Needs of users come first. Their liquid fidget sensory toys suit many situations. Children with sensory needs enjoy them. Adults can use them at work or at home. The portable size means you can carry one in a bag. Use them while traveling or waiting. The swirling glitter is visual and calming.\nTeachers can add liquid fidget sensory toys to their toolkit. They work well during group activities. They also help during solo play. The smooth edges are gentle on skin. These toys require no batteries. There is no mess with careful use.\nThis pack from Abley's supports sensory self-regulation. People use them to reduce stress. Bright colors catch the light. The swirling liquid glitters shift with movement. These liquid fidget sensory toys offer both play and relaxation. The design is simple. The benefit is real. Keeping hands busy helps minds stay focused.",
        "specifications": {},
        "features": [
          "Abley's Liquid Fidgets Glitter Swirl Visual Tool 6-Pack Multicolour"
        ],
        "applications": [
          "anxiety",
          "autism",
          "calming",
          "fidget",
          "portable",
          "sensory-play"
        ],
        "basePrice": 1969,
        "comparePrice": 2605,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-fidget-sensory-toys-six-color-glitter-discs-therapeutic-tool_bbed5be3-e7e0-4471-bd5a-2f910f8fc3c6.jpg?v=1764647954",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-fidget-sensory-toys-six-glitter-discs-with-box_e3dd9bb0-f4de-4d38-8429-bbde986de929.jpg?v=1765457147",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-fidget-sensory-toys-5-point-9-inch-round-disc-hands_4a0932d5-223f-4e8c-ac4f-d475280e990c.jpg?v=1765457147",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-fidget-sensory-toys-hands-sensory-stimulation-fine-motor_eb612a55-a9d2-4bb7-a5f1-e34a65e63f9a.jpg?v=1765457147",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-liquid-fidget-sensory-toys-tpu-safe-flexible-vs-pvc-cracked_0d6a74da-3811-4db4-aa05-6f08cd486c6f.jpg?v=1765457147",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Abley_s-Liquid-Fidgets_-Glitter-Swirl-Visual-Tool_-6-Pack_-Multicolour_1.jpg?v=1767854825"
        ],
        "shopifyUrl": "https://www.ableys.in/products/liquid-fidget-sensory-toys-glitter-6pk"
      },
      {
        "id": "led-pop-tubes-sensory-toys-5-pack",
        "shopifyHandle": "led-pop-tubes-sensory-toys-5-pack",
        "name": "Abley's Pop Tubes LED Light-Up | Multi-Sensory Fidget 5-Pack",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Looking for a fun way to support sensory needs? Abley's Pop Tubes, LED Light-Up 5-Pack offers both play and therapy. These LED pop tubes sensory toys bring color and excitement to any environment. Eac",
        "description": "Looking for a fun way to support sensory needs? Abley's Pop Tubes, LED Light-Up 5-Pack offers both play and therapy. These LED pop tubes sensory toys bring color and excitement to any environment. Each tube lights up and glows, creating a captivating visual experience for kids and adults.\nThese LED pop tubes sensory toys snap, stretch, and bend. The tubes produce a satisfying popping sound when pulled apart. This tactile feedback helps with sensory regulation during play or focus time. The bright lights appeal to visual senses and encourage engagement.\nThe 5-pack gives plenty of options. You can use them at home, in classrooms, or therapy sessions. These LED pop tubes sensory toys are light and portable. You can take them anywhere. Use them during travel or quiet breaks.\nEach tube is made from durable materials. These are safe for children and adults. The LED feature inside each toy glows with vibrant colors, making fidgeting more appealing and interactive. These LED pop tubes sensory toys are easy to clean. Parents and teachers will appreciate their low maintenance.\nGreat for stress relief and anxiety management. Stretching or twisting a tube gives hands busy work. Calming lights make these LED pop tubes sensory toys helpful for calming after a busy day. Many therapists recommend them for sensory seekers and people on the autism spectrum.\nYou can connect the tubes together, forming spirals, shapes, and even wearable chains. This encourages imaginative play and creative thinking. Use these LED pop tubes sensory toys as a party favor, learning reward, or a fun addition to sensory toolkits.\nChoose Abley's for innovative sensory support. This LED pop tubes sensory toys set stands out with its light-up feature. Enjoy play, focus, and satisfying sensory feedback in one package.",
        "specifications": {},
        "features": [
          "Abley's Pop Tubes LED Light-Up | Multi-Sensory Fidget 5-Pack"
        ],
        "applications": [
          "adhd",
          "attention",
          "autism",
          "classroom",
          "fidget",
          "focus"
        ],
        "basePrice": 582,
        "comparePrice": 776,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-led-pop-tubes-sensory-toys-glowing-packaged-box-display-multicolor_24cf853e-0c5a-4c43-8c9a-55ad1736f994.jpg?v=1764648007",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-led-pop-tubes-sensory-toys-multicolor-led-closeup-quick-flicker_45c801e8-dfa5-4c87-937c-416c57f62a02.jpg?v=1765533631",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/61-bKN-LosL._SX679.jpg?v=1765533631",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-led-pop-tubes-sensory-toys-neon-party-features-led-settings-switch-built-in-ag13-battery_7fb97dd9-567f-494e-a7e5-9efcf0cfe7b0.jpg?v=1765533631",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-led-pop-tubes-sensory-toys-size-unstretched-7point5-stretched-25-inch_ac0c87be-cc67-42d6-9e84-4d2df1192db3.jpg?v=1765533631",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-led-pop-tubes-sensory-toys-stretch-bend-twist-connect-demo_06f204b1-354a-4c59-9808-96de734efe1b.jpg?v=1765533631"
        ],
        "shopifyUrl": "https://www.ableys.in/products/led-pop-tubes-sensory-toys-5-pack"
      },
      {
        "id": "fuzzy-sensory-bracelets-for-kids-4-pack",
        "shopifyHandle": "fuzzy-sensory-bracelets-for-kids-4-pack",
        "name": "Abley's Fuzzy Sensory Bracelets | Wearable Fidget 4-Pack",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Abley's Fuzzy Sensory Bracelets | Wearable Fidget 4-Pack are designed for little hands that need a calming touch. These fuzzy sensory bracelets for kids help support focus and self-regulation during d",
        "description": "Abley's Fuzzy Sensory Bracelets | Wearable Fidget 4-Pack are designed for little hands that need a calming touch. These fuzzy sensory bracelets for kids help support focus and self-regulation during daily routines. Each bracelet in the pack provides a soft, textured feel. The playful fuzz is gentle against the skin.\nKids love the bright colors and the fun squishy sensation. These fuzzy sensory bracelets for kids can be worn at home or in classrooms. They are easy to take on and off. The bracelets support children who seek tactile input. Soft materials used in these bracelets are safe and durable.\nAbley's focuses on high-quality sensory solutions. These fuzzy sensory bracelets for kids encourage fidgeting in an appropriate way. They make quiet fidgets and do not distract others. The materials are designed to handle stretching and squishing.\nYou can use these bracelets to help with stress. Many kids find comfort in stroking the fuzzy spikes. The unique texture makes these bracelets stand out from plain bands. Teachers and therapists use them for calming strategies and transitions. Parents notice improved focus when their child has a quiet fidget.\nBright colors make each bracelet easy to spot. Sets include four pieces, so children can pick a color or share with friends. The soft, flexible design fits many wrist sizes. These fuzzy sensory bracelets for kids are washable and easy to clean.\nAbley’s mission is to create sensory tools that empower children to thrive. These bracelets offer a simple but effective way for kids to self-soothe without drawing attention. Choose Abley's Fuzzy Sensory Bracelets | Wearable Fidget 4-Pack for your sensory toolkit. Try them for long car rides, study sessions, or relaxing at home.",
        "specifications": {},
        "features": [
          "Abley's Fuzzy Sensory Bracelets | Wearable Fidget 4-Pack"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "fidget",
          "on-the-go",
          "portable",
          "tactile"
        ],
        "basePrice": 815,
        "comparePrice": 1042,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-fuzzy-sensory-bracelets-for-kids-flat-lay-4-colors-therapeutic-badge1.jpg?v=1764647900",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-fuzzy-sensory-bracelets-for-kids-box-with-4-multicolor-bracelets1.jpg?v=1764647902",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-fuzzy-sensory-bracelets-for-kids-hand-holding-4-pack-bright-colors1.jpg?v=1764647905",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-fuzzy-sensory-bracelets-for-kids-orange-stretchy-bracelet-pulled1.jpg?v=1764647907",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-fuzzy-sensory-bracelets-for-kids-stack-of-neon-silicone-bracelets1.jpg?v=1764647909",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Fuzzy-Bracelets.jpg?v=1766144576"
        ],
        "shopifyUrl": "https://www.ableys.in/products/fuzzy-sensory-bracelets-for-kids-4-pack"
      },
      {
        "id": "chewable-necklace-for-sensory-needs",
        "shopifyHandle": "chewable-necklace-for-sensory-needs",
        "name": "Abley's Chewable Necklace Donut Shape | BPA-Free Silicone Fidget",
        "categorySlug": "fidgets-focus",
        "shortDescription": "Finding a discreet and engaging way to support sensory needs can be challenging. This sweet-looking donut chew necklace provides a fun, safe, and effective solution for managing oral sensory input, he",
        "description": "Finding a discreet and engaging way to support sensory needs can be challenging. This sweet-looking donut chew necklace provides a fun, safe, and effective solution for managing oral sensory input, helping to promote calm and focus.\nDesigned as a playful yet practical tool, it offers a safe outlet for fidgeting and chewing, redirecting focus from fingers, clothing, or other items. It's a perfect sensory companion for the classroom, at home, or during travel.\nKey Features:\nWorry-Free Sensory Input: Made from 100% safe, food-grade silicone (BPA-free) that is gentle on teeth.\nPromotes Self-Regulation: Provides a predictable and calming oral motor activity to help soothe feelings of overwhelm or restlessness.\n️ Designed for Safety: Features a soft cord and a breakaway clasp to prevent snagging or choking hazards.\n️ Extra Soothing: Freezer-safe design allows for a cooled, extra-soothing sensory experience.\nEasy to Clean: Simply wash with mild soap and water or place it in the dishwasher for hassle-free cleaning.\nThis durable necklace is ideal for individuals who benefit from oral motor input, offering a mild chew resistance that is both satisfying and comfortable. Trust Abley's for thoughtful design in sensory support.",
        "specifications": {},
        "features": [
          "Abley's Chewable Necklace Donut Shape | BPA-Free Silicone Fidget"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "calming",
          "chew",
          "classroom"
        ],
        "basePrice": 267,
        "comparePrice": 342,
        "configOptions": {
          "sizes": [
            {
              "name": "Pink",
              "priceModifier": 0
            },
            {
              "name": "Yellow",
              "priceModifier": 0
            },
            {
              "name": "White",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryjoy-chewable-necklace-for-sensory-needs-pink-donut-smiley-silicone-food-grade-cord.jpg?v=1764647734",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/fewfhtt.jpg?v=1765608333",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/fewfhytht.jpg?v=1765608333",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/fewfrtrht.jpg?v=1765608333",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/i7ttjy.jpg?v=1765608333",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/fewf_werfgewfew.jpg?v=1765608333",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-fef_4030fb42-0a2a-4564-a6d8-f9d35eb8bf60.jpg?v=1765608333"
        ],
        "shopifyUrl": "https://www.ableys.in/products/chewable-necklace-for-sensory-needs"
      }
    ]
  },
  {
    "slug": "oral-motor",
    "title": "Oral Motor & Chew Tools",
    "description": "Chewable necklaces, oral motor tools, chew tubes, and speech therapy aids for oral sensory needs.",
    "color": "from-rose-500 to-pink-600",
    "image": "https://www.ableys.in/cdn/shop/collections/1257x329_12cc5a2d-5cb2-4e1e-9c98-05e5ed126c3e.jpg?v=1766789814&width=600",
    "products": [
      {
        "id": "oral-motor-chew-tube-for-sensory-therapy",
        "shopifyHandle": "oral-motor-chew-tube-for-sensory-therapy",
        "name": "Abley's Chew Tube 'Y' Shape | Oral Motor Skills Tool 2-Pack",
        "categorySlug": "oral-motor",
        "shortDescription": "Abley's Chew Tube, 'Y' Shape helps children and adults build strong mouths. This oral motor chew tube for sensory therapy gives comfort during stressful times. The unique 'Y' shape fits easily in smal",
        "description": "Abley's Chew Tube, 'Y' Shape helps children and adults build strong mouths. This oral motor chew tube for sensory therapy gives comfort during stressful times. The unique 'Y' shape fits easily in small or large hands. It has raised bumps and smooth sides. These textures give a choice for every need.\nMany families use this oral motor chew tube for sensory therapy in homes and schools. It helps with focus, calming, and reducing anxiety. Children can chew the tube instead of biting nails, pencils, or clothing. Adults use it for self-regulation in busy places. The strong silicone material stands up to daily use without breaking.\nTherapists often choose this oral motor chew tube for sensory therapy. They find the 'Y' shape more comfortable than straight styles. The design makes it easy to grip. It also teaches jaw strength, mouth coordination, and safe chewing habits. Each pack includes two tubes, so you always have a backup on hand.\nCleaning the oral motor chew tube for sensory therapy is simple. Wash with mild soap and water after each use. The tubes are free from BPA, phthalates, and latex. Safety is always a top goal for every product from Ableys.\nThe oral motor chew tube for sensory therapy fits many ages and needs. It supports kids with chewing habits or adults who need to fidget quietly at work. Therapists use it in oral motor skill exercises. Use it as a calming tool during transitions, therapy sessions, or daily routines. Teachers and parents trust Ableys for strong, high-quality sensory solutions.",
        "specifications": {},
        "features": [
          "Abley's Chew Tube 'Y' Shape | Oral Motor Skills Tool 2-Pack"
        ],
        "applications": [
          "autism",
          "chew",
          "oral",
          "oral-motor",
          "spd",
          "therapy-room"
        ],
        "basePrice": 846,
        "comparePrice": 1173,
        "configOptions": {
          "sizes": [
            {
              "name": "Blue + Red",
              "priceModifier": 0
            },
            {
              "name": "Blue + Green",
              "priceModifier": 0
            },
            {
              "name": "Green + Red",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorypro-oral-motor-chew-tube-for-sensory-therapy-teal-red-two-pack-therapeutic-tool-seal.jpg?v=1764647734",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorypro-oral-motor-chew-tube-for-sensory-therapy-stacked-assorted-colors-textured-y-shape.jpg?v=1765612101",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorypro-oral-motor-chew-tube-for-sensory-therapy-red-y-shape-dimensions-13cm-by-9cm.jpg?v=1765612101",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorypro-oral-motor-chew-tube-for-sensory-therapy-teal-lime-pair-deep-nubs-ribbed-ridges.png?v=1765612101",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorypro-oral-motor-chew-tube-for-sensory-therapy-red-green-pair-nubs-and-ridges-front-view.png?v=1765612101"
        ],
        "shopifyUrl": "https://www.ableys.in/products/oral-motor-chew-tube-for-sensory-therapy"
      },
      {
        "id": "tongue-depressor-wooden-medical-stick-for-oral-examination-craft-use-smooth-sterile",
        "shopifyHandle": "tongue-depressor-wooden-medical-stick-for-oral-examination-craft-use-smooth-sterile",
        "name": "Tongue Depressor – Wooden Medical Stick for Oral Examination & Craft Use | Smooth & Sterile",
        "categorySlug": "oral-motor",
        "shortDescription": "Finding a reliable tool for oral examinations or speech therapy shouldn't mean compromising on comfort or safety. Many standard wooden sticks can have rough edges or inconsistent quality, making profe",
        "description": "Finding a reliable tool for oral examinations or speech therapy shouldn't mean compromising on comfort or safety. Many standard wooden sticks can have rough edges or inconsistent quality, making professional assessments or home activities stressful for both the provider and the user.\nThe Tongue Depressor is designed to support clinicians, therapists, and parents with a high-quality, medical-grade solution. Crafted for smooth performance, these sticks provide the stability needed for clear oral views while ensuring a gentle touch against sensitive tissues.\nMedical-Grade Quality: Made from premium wood for professional healthcare and therapy standards.\nSplinter-Free Finish: Precision-polished surfaces ensure safety and comfort during oral use.\nMulti-Purpose Versatility: Ideal for speech therapy, medical exams, and creative DIY projects.\nHygienic Design: Non-toxic and odorless material for a safe sensory experience.\nLightweight & Sturdy: Provides the necessary strength without being bulky or heavy.\nHow It Works: For oral assessments, gently place the depressor on the tongue to provide a clear view of the throat. In speech therapy, use it to assist with tongue placement and oral motor exercises. For creative use, the sturdy wooden structure serves as an excellent base for building models or instructional aids. ️",
        "specifications": {},
        "features": [
          "Tongue Depressor – Wooden Medical Stick for Oral Examination & Craft Use | Smooth & Sterile"
        ],
        "applications": [
          "clinical",
          "oral",
          "oral-motor",
          "therapy-room"
        ],
        "basePrice": 120,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_1039ef50-0b1e-4b5d-aef9-9ae6fbadaedb.jpg?v=1764648264",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_1d631448-5326-442d-a299-0792f5990b00.jpg?v=1764648267",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_a5c480b4-5bed-4179-bed6-f79c0a74858d.jpg?v=1764648273",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Tongue-Depressor.jpg?v=1766131331"
        ],
        "shopifyUrl": "https://www.ableys.in/products/tongue-depressor-wooden-medical-stick-for-oral-examination-craft-use-smooth-sterile"
      },
      {
        "id": "chewable-sensory-necklaces-for-kids",
        "shopifyHandle": "chewable-sensory-necklaces-for-kids",
        "name": "Abley's Chewable Necklaces Saber Tooth | 3-Pack for Oral Needs",
        "categorySlug": "oral-motor",
        "shortDescription": "Abley's Chewable Necklaces, Saber Tooth 3-Pack are designed for sensory needs. Each necklace features a smooth, colorful saber tooth shape. These chewable sensory necklaces for kids give comfort durin",
        "description": "Abley's Chewable Necklaces, Saber Tooth 3-Pack are designed for sensory needs. Each necklace features a smooth, colorful saber tooth shape. These chewable sensory necklaces for kids give comfort during stressful moments. The textures help kids stay focused at school or home. The lightweight design suits everyday wear. These necklaces use safe, food-grade silicone. They are easy to clean with mild soap and water.\nChewable sensory necklaces for kids work well for children who need oral input. The sturdy cord has a breakaway clasp for safety. Kids can wear them discreetly for self-regulation. The 3-pack offers variety, so kids can switch colors based on mood. These necklaces are built to be durable for daily use. They support chewing needs without losing shape.\nChewable sensory necklaces for kids from Ableys help with focus during studying or reading. They also help reduce anxiety and fidgeting. Parents and therapists recommend these necklaces for children who chew on clothing or pencils. The design protects teeth and gums. You get a practical tool and a fun accessory in one product.\nKids like the bright colors and unique saber tooth design. The necklaces are suitable for boys and girls. They fit well under shirts for extra comfort. Each necklace is lightweight and comfortable all day. Chewable sensory necklaces for kids are made for easy handling. They suit kids with sensory processing needs or ADHD.\nParents love how these necklaces support their child’s needs. You can use chewable sensory necklaces for kids at home or school. The necklaces are a simple, portable solution for oral sensory input. They help your child feel calm and focused. These necklaces add support for daily routines.",
        "specifications": {},
        "features": [
          "Abley's Chewable Necklaces Saber Tooth | 3-Pack for Oral Needs"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "calming",
          "chew",
          "classroom"
        ],
        "basePrice": 702,
        "comparePrice": 977,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-chewable-sensory-necklaces-for-kids-product-shot-white-background-trio-closeup.jpg?v=1764647848",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryplus-chewable-sensory-necklaces-for-kids-easy-to-clean-waterproof-silicone-trio.jpg?v=1764647851",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-necklace-for-sensory-needs-three-colors-bpa-free-food-grade.jpg?v=1764647852",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-necklace-for-sensory-needs-relieve-anxiety-oral-motor-therapy.jpg?v=1764647854",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-necklace-for-sensory-needs-unique-textures-therapy-tool-supervised.jpg?v=1764647856",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-necklace-for-sensory-needs-three-color-textured-sensory-stimulation.jpg?v=1764647857"
        ],
        "shopifyUrl": "https://www.ableys.in/products/chewable-sensory-necklaces-for-kids"
      },
      {
        "id": "saber-tooth-chew-necklace-for-kids",
        "shopifyHandle": "saber-tooth-chew-necklace-for-kids",
        "name": "Abley's Chewable Necklace | Saber Tooth | 1 Pc for Oral Input",
        "categorySlug": "oral-motor",
        "shortDescription": "The Abley's Chewable Necklaces, Saber Tooth, is designed as a durable and safe saber tooth chew necklace for kids. This necklace is made for children who need oral input or sensory relief during their",
        "description": "The Abley's Chewable Necklaces, Saber Tooth, is designed as a durable and safe saber tooth chew necklace for kids. This necklace is made for children who need oral input or sensory relief during their daily routine. The texture is smooth. The shape of this saber tooth chew necklace for kids allows comfortable chewing and easy grip with little hands.\nParents often choose this saber tooth chew necklace for kids because it can help with focus, calming, and self-regulation. Kids can wear the necklace all day. It is lightweight and flexible. The soft silicone is BPA-free and non-toxic. The material is easy to clean with soap and water.\nThe saber tooth chew necklace for kids has a safety breakaway clasp. It is suitable for home, travel, school, or therapy. Each necklace is strong enough to handle daily use. The simple style is discreet. The red color is visually appealing for both boys and girls.\nThis saber tooth chew necklace for kids offers support for children with sensory needs or oral motor challenges. It is a portable and effective option for those who need a safe alternative to chewing on pencils, clothing, or fingers. Kids who crave oral stimulation find comfort in its use. Therapists recommend this necklace for autism, ADHD, and other sensory processing differences.\nThe necklace can become part of sensory toolkits at home or in the classroom. With thoughtful design, it keeps focus on quality and comfort. Abley's is committed to developing products that help kids discover tools for self-regulation. The saber tooth chew necklace for kids is a valuable sensory accessory for families and professionals.",
        "specifications": {},
        "features": [
          "Abley's Chewable Necklace | Saber Tooth | 1 Pc for Oral Input"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "calming",
          "chew",
          "classroom"
        ],
        "basePrice": 267,
        "comparePrice": 342,
        "configOptions": {
          "sizes": [
            {
              "name": "Red",
              "priceModifier": 0
            },
            {
              "name": "Green",
              "priceModifier": 0
            },
            {
              "name": "Purple",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorykids-saber-tooth-chew-necklace-for-kids-red-pendant-closeup-therapeutic-badge.jpg?v=1764647734",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorykids-saber-tooth-chew-necklace-for-kids-green-pendant-single-hole-black-cord.png?v=1764647737",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorykids-saber-tooth-chew-necklace-for-kids-purple-pendant-closeup-black-cord-knot.png?v=1764647740",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorykids-saber-tooth-chew-necklace-for-kids-three-color-set-food-grade-silicone.jpg?v=1764647741",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorykids-saber-tooth-chew-necklace-for-kids-three-pendants-texture-sensory-red-banner.jpg?v=1764647743",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorykids-saber-tooth-chew-necklace-for-kids-dual-closeup-therapy-tool-warning-text.jpg?v=1764647745",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorykids-saber-tooth-chew-necklace-for-kids-side-view-purple-red-benefits-list.jpg?v=1764647746",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorykids-saber-tooth-chew-necklace-for-kids-green-pendant-straight-hang-black-cord.png?v=1764647748"
        ],
        "shopifyUrl": "https://www.ableys.in/products/saber-tooth-chew-necklace-for-kids"
      },
      {
        "id": "chew-necklace-pack-of-2-red-green",
        "shopifyHandle": "chew-necklace-pack-of-2-red-green",
        "name": "Abley's Chewable Necklaces Saber Tooth | 2-Pack for Consistent Support",
        "categorySlug": "oral-motor",
        "shortDescription": "A convenient 2-pack for managing oral sensory needs.",
        "description": "A convenient 2-pack for managing oral sensory needs.\nThis convenient 2-pack of discreet and wearable chew necklaces offers a natural way to manage oral sensory needs and promote focus throughout the day. It ensures a clean, safe, and appropriate chewing tool is always available for your child's self-regulation and concentration.\nEmpowers sensory management\nEnsures clean fidget is always ready\nProvides consistent support\nSafe & appropriate chewing tool\nPromotes focus throughout the day",
        "specifications": {},
        "features": [
          "Abley's Chewable Necklaces Saber Tooth | 2-Pack for Consistent Support"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "calming",
          "chew",
          "classroom"
        ],
        "basePrice": 468,
        "comparePrice": 651,
        "configOptions": {
          "sizes": [
            {
              "name": "Red + Green",
              "priceModifier": 0
            },
            {
              "name": "Purple + Red",
              "priceModifier": 0
            },
            {
              "name": "Green + Purple",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-necklace-for-sensory-needs-green-red-therapeutic-tool-adult-supervision.jpg?v=1764647782",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-necklace-for-sensory-needs-easy-to-clean-waterproof-pink-red-green.jpg?v=1764647784",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-necklace-for-sensory-needs-pink-red-silicone-fang-black-cord.png?v=1764647788",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-necklace-for-sensory-needs-green-pink-textured-silicone-fangs.png?v=1764647790",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-necklace-for-sensory-needs-three-colors-bpa-free-food-grade.jpg?v=1764647852",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-necklace-for-sensory-needs-relieve-anxiety-oral-motor-therapy.jpg?v=1764647854",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-necklace-for-sensory-needs-unique-textures-therapy-tool-supervised.jpg?v=1764647856",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-necklace-for-sensory-needs-three-color-textured-sensory-stimulation.jpg?v=1764647857"
        ],
        "shopifyUrl": "https://www.ableys.in/products/chew-necklace-pack-of-2-red-green"
      },
      {
        "id": "oral-motor-tool-for-speech-therapy",
        "shopifyHandle": "oral-motor-tool-for-speech-therapy",
        "name": "Abley's Oral Motor Tool Cloud Wand | Tongue Movement Aid",
        "categorySlug": "oral-motor",
        "shortDescription": "A professional tool for tongue control and muscle strengthening.",
        "description": "A professional tool for tongue control and muscle strengthening.\nThis professional-grade speech therapy tool is designed to assist in oral motor exercises and enhance speech development. Featuring a durable cloud-shaped head with a movable metal ball bearing, it offers precise control for tongue placement and muscle strengthening activities.\nProfessional Design: Features a cloud-shaped head with a metallic ball bearing, allowing for precise tongue movement exercises and muscle control.\nErgonomic Handle: The comfortable blue grip handle provides excellent control, making it ideal for extended use during therapy sessions.\nVersatile Usage: Suitable for a variety of oral motor exercises, speech therapy routines, and muscle strengthening activities, supporting speech development and tongue mobility.",
        "specifications": {},
        "features": [
          "Abley's Oral Motor Tool Cloud Wand | Tongue Movement Aid"
        ],
        "applications": [
          "clinical",
          "developmental-delays",
          "oral",
          "oral-motor",
          "speech-therapy",
          "therapy-room"
        ],
        "basePrice": 783,
        "comparePrice": 1086,
        "configOptions": {
          "sizes": [
            {
              "name": "Blue",
              "priceModifier": 0
            },
            {
              "name": "Yellow",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-oral-motor-tool-for-speech-therapy-blue-handle-front-therapeutic-badge.jpg?v=1764647954",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/51W1KY1lyuL._SX679.jpg?v=1765522098",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/61gV8JUKyHL._SX679.jpg?v=1765522098",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-oral-motor-tool-for-speech-therapy-yellow-handle-silicone-material-closeup.jpg?v=1765522098",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-oral-motor-tool-for-speech-therapy-angled-blue-handle-rolling-ball.jpg?v=1765522098",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-oral-motor-tool-for-speech-therapy-features-gentle-vibration-infographic.jpg?v=1765522098",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-oral-motor-tool-for-speech-therapy-yellow-handle-front-rolling-ball-badge.jpg?v=1765522098",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Cloud-Wand-Speech-tool.jpg?v=1766826345"
        ],
        "shopifyUrl": "https://www.ableys.in/products/oral-motor-tool-for-speech-therapy"
      },
      {
        "id": "oral-motor-toolkit-for-speech-therapy",
        "shopifyHandle": "oral-motor-toolkit-for-speech-therapy",
        "name": "Abley's Oral Motor Toolkit 3-Piece Set | Tongue Placement Practice",
        "categorySlug": "oral-motor",
        "shortDescription": "A 3-piece kit for tongue placement and movement practice.",
        "description": "A 3-piece kit for tongue placement and movement practice.\nThis comprehensive 3-piece speech therapy tongue training set is designed to enhance tongue placement and movement, improving speech articulation. The set includes three specialized tools: a ridged trainer for muscle control, a flat surface tool for positioning exercises, and a curved guide for movement practice. Each tool is equipped with an ergonomic handle that ensures a comfortable and stable grip during therapy sessions, while the durable plastic construction guarantees long-lasting use.\nComplete Set: Includes three professional-grade tongue training tools: a ridged trainer, flat trainer, and curved trainer for comprehensive speech therapy exercises.\nVersatile Use: These tools are suitable for various speech therapy exercises and tongue movement training, designed to support the improvement of articulation and muscle control.\nErgonomic Design: Each tool features a comfortable grip handle and precision-engineered shapes that facilitate effective training while ensuring ease of use.",
        "specifications": {},
        "features": [
          "Abley's Oral Motor Toolkit 3-Piece Set | Tongue Placement Practice"
        ],
        "applications": [
          "clinical",
          "developmental-delays",
          "oral",
          "oral-motor",
          "speech-therapy",
          "therapy-room"
        ],
        "basePrice": 673,
        "comparePrice": 934,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/speech-tools-oral-motor-toolkit-for-speech-therapy-three-purple-silicone-sticks-white-background.jpg?v=1764647954",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/51GbWivdlL._SX679.jpg?v=1765451601",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/61Ke5vNUEgL._SX679__1.jpg?v=1765451601",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/speech-tools-oral-motor-toolkit-for-speech-therapy-infographic-benefits-speech-language-development.jpg?v=1765451601",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/speech-tools-oral-motor-toolkit-for-speech-therapy-closeup-metal-bead-ridged-head-silicone.jpg?v=1765451601",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/speech-tools-oral-motor-toolkit-for-speech-therapy-three-tools-marketing-banner-oral-motor-text.jpg?v=1765451601",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/speech-tools-oral-motor-toolkit-for-speech-therapy-three-tools-angle-with-inmouth-demonstration.jpg?v=1765451601",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/speech-tools-oral-motor-toolkit-for-speech-therapy-three-tools-usage-step-by-step-demo.jpg?v=1765451601",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/3-peace-speech-tools.jpg?v=1766820212"
        ],
        "shopifyUrl": "https://www.ableys.in/products/oral-motor-toolkit-for-speech-therapy"
      },
      {
        "id": "chew-necklace-pack-of-3-black-blue-white",
        "shopifyHandle": "chew-necklace-pack-of-3-black-blue-white",
        "name": "Abley's Chewable Necklaces Discreet | 3-Pack for Oral Needs",
        "categorySlug": "oral-motor",
        "shortDescription": "Redirect chewing and improve focus with this 3-pack, a great value that provides a safe and effective tool for home, school, and on the go.",
        "description": "Redirect chewing and improve focus with this 3-pack, a great value that provides a safe and effective tool for home, school, and on the go.\nA perfect starter set or a great value pack, these three silicone chew necklaces provide a safe, natural, and effective tool for reducing fidgety behaviors.\nGreat Value & Variety: This three-pack allows you to keep a necklace at home, at school, and in the car, so a calming tool is always within reach.\nReduces Fidgety Behaviors: Redirects the need to chew away from fingers, hair, or clothing to a safe and appropriate outlet.\nDetails: 3 Necklaces\nMaterial: 100% Food-Grade Silicone\nChewing Level: Mild to Moderate\nSafety: Breakaway clasp.",
        "specifications": {},
        "features": [
          "Abley's Chewable Necklaces Discreet | 3-Pack for Oral Needs"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "calming",
          "chew",
          "classroom"
        ],
        "basePrice": 796,
        "comparePrice": 1107,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensory-shop-chewable-necklace-for-sensory-needs-close-up-trio-hanging-textured-therapeutic-tool.jpg?v=1764647783",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-three-color-row-textures-sensory.jpg?v=1765802587",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-three-hanging-colors-bpa-free-badge.jpg?v=1765802587",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensory-shop-chewable-necklace-for-sensory-needs-three-colors-black-blue-white-easy-to-clean.jpg?v=1764647790",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensory-shop-chewable-necklace-for-sensory-needs-side-by-side-black-blue-therapy-tool.jpg?v=1764647792",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensory-shop-chewable-necklace-for-sensory-needs-black-blue-relieve-anxiety-oral-motor.jpg?v=1764647793"
        ],
        "shopifyUrl": "https://www.ableys.in/products/chew-necklace-pack-of-3-black-blue-white"
      },
      {
        "id": "chew-necklace-pack-of-2",
        "shopifyHandle": "chew-necklace-pack-of-2",
        "name": "Abley's Chewable Necklaces Discreet | 2-Pack for Consistent Oral Input",
        "categorySlug": "oral-motor",
        "shortDescription": "A convenient 2-pack for managing oral sensory needs.",
        "description": "A convenient 2-pack for managing oral sensory needs.\nThis convenient 2-pack of discreet and wearable chew necklaces offers a natural way to manage oral sensory needs and promote focus throughout the day. It ensures a clean, safe, and appropriate chewing tool is always available for your child's self-regulation and concentration.\nEmpowers sensory management\nEnsures clean fidget is always ready\nProvides consistent support\nSafe & appropriate chewing tool\nPromotes focus throughout the day",
        "specifications": {},
        "features": [
          "Abley's Chewable Necklaces Discreet | 2-Pack for Consistent Oral Input"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "calming",
          "chew",
          "classroom"
        ],
        "basePrice": 524,
        "comparePrice": 738,
        "configOptions": {
          "sizes": [
            {
              "name": "Blue + Black",
              "priceModifier": 0
            },
            {
              "name": "Blue + White",
              "priceModifier": 0
            },
            {
              "name": "White + Black",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-blue-and-black-pair-therapeutic-badge-closeup.jpg?v=1764647782",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-two-angled-top-view-relieve-anxiety.jpg?v=1765802587",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-three-color-row-textures-sensory.jpg?v=1765802587",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-black-and-blue-closeup-textured-therapy.jpg?v=1765802587",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-three-hanging-colors-bpa-free-badge.jpg?v=1765802587",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-three-color-triangle-easy-to-clean.jpg?v=1765802587",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-white-and-blue-pair-front-view.png?v=1765802587",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-white-and-black-pair-front-view.png?v=1765802587"
        ],
        "shopifyUrl": "https://www.ableys.in/products/chew-necklace-pack-of-2"
      },
      {
        "id": "chew-necklace",
        "shopifyHandle": "chew-necklace",
        "name": "Abley's Chewable Necklace | Discreet | Stylish | Food-Grade Silicone",
        "categorySlug": "oral-motor",
        "shortDescription": "Manage the need for oral sensory input with this stylish, wearable tool, made from 100% food-grade silicone with a breakaway clasp for safety.",
        "description": "Manage the need for oral sensory input with this stylish, wearable tool, made from 100% food-grade silicone with a breakaway clasp for safety.\nThis stylish and discreet chewable necklace provides a safe and natural way to promote calm, improve focus, and manage the need for oral sensory input.\nPromotes Calm & Improves Focus: Offers a readily available and appropriate way to receive calming oral input, helping to manage fidgeting and improve concentration.\nA Safe Chewing Solution: Provides a worry-free alternative to chewing on non-food items like pencils, clothing, or fingernails, giving you peace of mind.\nDetails: 1 Necklace\nMaterial: 100% Food-Grade Silicone\nChewing Level: Mild to Moderate\nSafety: Breakaway clasp.",
        "specifications": {},
        "features": [
          "Abley's Chewable Necklace | Discreet | Stylish | Food-Grade Silicone"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "calming",
          "chew",
          "classroom"
        ],
        "basePrice": 267,
        "comparePrice": 342,
        "configOptions": {
          "sizes": [
            {
              "name": "Blue",
              "priceModifier": 0
            },
            {
              "name": "Black",
              "priceModifier": 0
            },
            {
              "name": "White",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensory-supplies-chewable-necklace-for-sensory-needs-blue-triangle-silicone-textured-therapy-tool.jpg?v=1764647734",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/61XzDiYcLXL._SX679.jpg?v=1765610930",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/61n8TfN76cL._SX679.jpg?v=1765610930",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-three-color-row-textures-sensory.jpg?v=1765802587",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-black-and-blue-closeup-textured-therapy.jpg?v=1765802587",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-two-angled-top-view-relieve-anxiety.jpg?v=1765802587",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytools-chewable-necklace-for-sensory-needs-three-hanging-colors-bpa-free-badge.jpg?v=1765802587",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/fewfdfberbfvde_0f68ad36-f03e-4fbb-9a6a-2ee9b53af537.jpg?v=1765610930",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1.png?v=1765610930",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/qq.png?v=1765610930"
        ],
        "shopifyUrl": "https://www.ableys.in/products/chew-necklace"
      },
      {
        "id": "oral-motor-chew-tool-for-sensory-needs",
        "shopifyHandle": "oral-motor-chew-tool-for-sensory-needs",
        "name": "Abley's Chew Tube 'Y' Shape | Oral Motor Skills Tool 1 Pc",
        "categorySlug": "oral-motor",
        "shortDescription": "Discover the Abley's Chew Tube, 'Y' Shape—a reliable oral motor chew tool for sensory needs. This tool is thoughtfully designed to help children and adults who require oral stimulation and self-regula",
        "description": "Discover the Abley's Chew Tube, 'Y' Shape—a reliable oral motor chew tool for sensory needs. This tool is thoughtfully designed to help children and adults who require oral stimulation and self-regulation. The unique 'Y' shape is easy to grip and can be held by small or large hands. It fits comfortably in the mouth, offering soothing relief for sensory challenges.\nEach branch of this chew tube gives a different texture. One side has soft bumps and the other side has firm ridges. The variety makes this oral motor chew tool for sensory needs a favorite for many users. It allows for gentle or more intense chewing. The textures help exercise the mouth and jaw muscles. This tool can improve biting and chewing skills.\nThis oral motor chew tool for sensory needs is made from high-quality, food-grade material. There are no harmful chemicals used. It is safe for both children and adults. Cleaning is easy, so you can use it every day. The chew tube is durable and can handle regular biting without breaking down quickly.\nYou can use this tool in many situations. It works well in school, at home, or during therapy. It can help reduce anxiety, increase calmness, and support focus. People often use it during transitions or when feeling overwhelmed. It fits into many sensory kits and therapy routines easily.\nThe Abley's Chew Tube, 'Y' Shape stands out due to its sturdy build and versatility. The oral motor chew tool for sensory needs supports healthy oral habits and positive self-regulation. Its compact size makes it easy to carry in a bag or store in a desk. Many therapists recommend this tool for sensory-seeking children and adults. The practical design meets real needs every day.",
        "specifications": {},
        "features": [
          "Abley's Chew Tube 'Y' Shape | Oral Motor Skills Tool 1 Pc"
        ],
        "applications": [
          "autism",
          "chew",
          "oral",
          "oral-motor",
          "spd",
          "therapy-room"
        ],
        "basePrice": 421,
        "comparePrice": 586,
        "configOptions": {
          "sizes": [
            {
              "name": "Blue",
              "priceModifier": 0
            },
            {
              "name": "Red",
              "priceModifier": 0
            },
            {
              "name": "Green",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytoys-oral-motor-chew-tool-for-sensory-needs-teal-y-shaped-therapeutic-seal-badge.jpg?v=1764647734",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/819p-87838L._SX679.jpg?v=1765607570",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/81F3Y6DDnfL._SX679.jpg?v=1765607570",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytoys-oral-motor-chew-tool-for-sensory-needs-red-y-shaped-textured-arms-13cm-9cm.jpg?v=1765607570",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytoys-oral-motor-chew-tool-for-sensory-needs-assorted-colors-group-shot-textured-arms.jpg?v=1765607570",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytoys-oral-motor-chew-tool-for-sensory-needs-lime-green-y-shaped-texture-closeup.png?v=1765607570",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/therapytoys-oral-motor-chew-tool-for-sensory-needs-bright-red-y-shaped-texture-front.png?v=1765607570"
        ],
        "shopifyUrl": "https://www.ableys.in/products/oral-motor-chew-tool-for-sensory-needs"
      },
      {
        "id": "dual-textured-chew-tube-for-sensory-needs",
        "shopifyHandle": "dual-textured-chew-tube-for-sensory-needs",
        "name": "Abley's Chew Tube Hollow | Dual-Textured Oral Motor 2-Pack",
        "categorySlug": "oral-motor",
        "shortDescription": "Abley's Chew Tube, Hollow | Dual-Textured Oral Motor, 2-Pack is designed to meet many sensory needs. Every tube has two unique textures. One side feels bumpy. The other side feels smooth. This dual-te",
        "description": "Abley's Chew Tube, Hollow | Dual-Textured Oral Motor, 2-Pack is designed to meet many sensory needs. Every tube has two unique textures. One side feels bumpy. The other side feels smooth. This dual-textured chew tube for sensory needs gives more oral stimulation.\nFor children and adults, oral motor input helps regulate focus and mood. The hollow design makes every chew soft. This style is gentle on teeth and jaws. The dual-textured chew tube for sensory needs can support calm in school, at home, or while traveling.\nEach pack comes with two chew tubes. The dual-textured design lets users pick the feel they want. This flexibility helps meet many sensory preferences. The chew tubes are made of high-quality, food-grade silicone. Cleaning is quick. Users can simply hand-wash or place them in a dishwasher.\nDurability matters. These chew tubes are built to last. Each dual-textured chew tube for sensory needs resists biting and tearing. The hollow shape is lightweight. Carrying and storing is easy. This 2-pack is perfect for daily routines or for sharing with others.\nThe bright colors invite touch and sight. The size fits hands and mouths well. It works for kids, teens, and adults. The dual-textured chew tube for sensory needs supports self-regulation in many settings.\nTherapists, teachers, and caregivers trust this sensory tool. The textures give clear sensory feedback. The product supports focus during tasks. It helps manage stress in busy moments. It can also support language development through oral motor play.\nMany families and professionals choose Ableys for a dual-textured chew tube for sensory needs. This 2-pack delivers variety and safety. Every tube is BPA-free and odorless. It suits chewers who need different textures to meet daily challenges.",
        "specifications": {},
        "features": [
          "Abley's Chew Tube Hollow | Dual-Textured Oral Motor 2-Pack"
        ],
        "applications": [
          "autism",
          "chew",
          "oral",
          "oral-motor",
          "spd",
          "therapy-room"
        ],
        "basePrice": 515,
        "comparePrice": 704,
        "configOptions": {
          "sizes": [
            {
              "name": "Purple + Green",
              "priceModifier": 0
            },
            {
              "name": "Blue + Green",
              "priceModifier": 0
            },
            {
              "name": "Purple + Blue",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-dual-textured-chew-tube-for-sensory-needs-packaging-box-purple-green-pair.jpg?v=1764647734",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-dual-textured-chew-tube-for-sensory-needs-purple-17-5cm-length-dotted-ribbed.jpg?v=1765611065",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-dual-textured-chew-tube-for-sensory-needs-blue-closeup-dotted-ribs-texture.jpg?v=1765611065",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-dual-textured-chew-tube-for-sensory-needs-green-kid-safe-bpa-free-closeup.jpg?v=1765611065",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-dual-textured-chew-tube-for-sensory-needs-green-purple-pair-promotes-calmness.jpg?v=1765611065",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-dual-textured-chew-tube-for-sensory-needs-blue-floating-chewing-alternative.jpg?v=1765611065",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-dual-textured-chew-tube-for-sensory-needs-box-blue-green-therapeutic-badge.jpg?v=1765611065",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/ableys-dual-textured-chew-tube-for-sensory-needs-box-purple-blue-therapeutic-badge.jpg?v=1765611065"
        ],
        "shopifyUrl": "https://www.ableys.in/products/dual-textured-chew-tube-for-sensory-needs"
      },
      {
        "id": "chewable-necklaces-for-sensory-needs-2pk",
        "shopifyHandle": "chewable-necklaces-for-sensory-needs-2pk",
        "name": "Abley's Chewable Necklaces Donut Shape | 2-Pack for Consistent Support",
        "categorySlug": "oral-motor",
        "shortDescription": "Abley's Chewable Necklaces, Donut Shape, bring everyday support for children and adults alike. This 2-pack features soft yet durable silicone, designed to be gentle on teeth and gums. These chewable n",
        "description": "Abley's Chewable Necklaces, Donut Shape, bring everyday support for children and adults alike. This 2-pack features soft yet durable silicone, designed to be gentle on teeth and gums. These chewable necklaces for sensory needs help manage urges to chew, bite, or fidget.\nEach necklace offers a fun donut design. The cheerful faces make them appealing for kids, while the neutral colors blend in with everyday outfits. The easy-to-clean material means families can use and clean these chewable necklaces for sensory needs with little effort.\nThe breakaway clasp adds safety. You can feel confident that the necklace will snap apart under pressure, reducing risk during active movement. The adjustable cord length allows comfort for all ages.\nChewing can soothe, focus, or help self-regulate. Abley's chewable necklaces for sensory needs let users quietly meet those needs at home, school, or out in public. They are especially helpful for children who need oral input or sensory comfort during transitions.\nThe set includes two donut-shaped chewables. Families have a spare or one for each hand. The sturdy silicone resists premature wear and offers consistent feedback when chewed.\nMany people find regular chewable necklaces for sensory needs can fray over time. Abley's focuses on durability and smooth, rounded shapes to prevent irritation. The material is free from BPA, phthalates, and other unwanted additives.\nCare is simple. Wash with mild soap and water to keep the chewables fresh. The necklaces are lightweight, so they do not add pressure or discomfort during long use. They sit quietly against clothing but are easy to grab when needed.\nThese chewable necklaces for sensory needs can support self-regulation, attention, or stress relief. Use at school, therapy sessions, or during travel. Abley's products help meet diverse sensory needs with thought and care.",
        "specifications": {},
        "features": [
          "Abley's Chewable Necklaces Donut Shape | 2-Pack for Consistent Support"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "calming",
          "chew",
          "classroom"
        ],
        "basePrice": 533,
        "comparePrice": 738,
        "configOptions": {
          "sizes": [
            {
              "name": "Pink + Baby Pink",
              "priceModifier": 0
            },
            {
              "name": "Pink + Yellow",
              "priceModifier": 0
            },
            {
              "name": "Yellow+ Baby Pink",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/chewnie-chewable-necklaces-for-sensory-needs-smiling-donut-pair-therapeutic-tool-badge.jpg?v=1764647783",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/chewnie-chewable-necklaces-for-sensory-needs-pink-yellow-smiling-donut-pair.png?v=1765865933",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/chewnie-chewable-necklaces-for-sensory-needs-donut-pair-marketing-benefits-list.jpg?v=1765865933",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/chewnie-chewable-necklaces-for-sensory-needs-closeup-dual-circle-not-a-toy-supervision.jpg?v=1765865933",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/chewnie-chewable-necklaces-for-sensory-needs-white-and-yellow-smiling-donut-pair.png?v=1765865933"
        ],
        "shopifyUrl": "https://www.ableys.in/products/chewable-necklaces-for-sensory-needs-2pk"
      },
      {
        "id": "chewable-chew-bands-for-sensory-needs",
        "shopifyHandle": "chewable-chew-bands-for-sensory-needs",
        "name": "Abley's Chew Bands Absorbent Terry Cloth | Wearable for Chewing Needs",
        "categorySlug": "oral-motor",
        "shortDescription": "Abley's Chew Bands provide a comfortable solution for those with sensory needs. These bands are made from soft, absorbent terry cloth. They are gentle on the skin and easy to wear all day. The materia",
        "description": "Abley's Chew Bands provide a comfortable solution for those with sensory needs. These bands are made from soft, absorbent terry cloth. They are gentle on the skin and easy to wear all day. The material absorbs moisture well and offers a comforting texture. Chewable chew bands for sensory needs give users a safe alternative to chewing on shirts or pencils.\nBright colors appeal to children and adults who want a stylish accessory. The design is discreet and easy to match with daily outfits. These bands fit securely on the wrist and do not slip off easily. They are machine washable, making them simple to keep clean for everyday use.\nPeople who seek chewable chew bands for sensory needs can use them in classrooms, therapy sessions, or at home. They help reduce anxiety and support focus during stressful moments. They are lightweight and do not feel bulky on the wrist. Wearable for chewing needs, each band helps redirect chewing habits with a sensory-friendly approach.\nChewable chew bands for sensory needs are durable and long-lasting. Each band is designed to withstand frequent use. They are safe and tested for daily wear by children and adults. Use them as part of a sensory diet or calming routine. This makes them a practical tool for parents, therapists, and teachers.\nChoose Abley's Chew Bands for an effective tool that fits a variety of sensory preferences. The terry cloth feels soft and comforting. The product is suitable for sensitive users who want a solution for their chewing needs. Abley's focuses on quality and thoughtful design to help users feel calm and supported.",
        "specifications": {},
        "features": [
          "Abley's Chew Bands Absorbent Terry Cloth | Wearable for Chewing Needs"
        ],
        "applications": [
          "adhd",
          "autism",
          "chew",
          "classroom",
          "focus",
          "oral"
        ],
        "basePrice": 1409,
        "comparePrice": 1954,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-chew-bands-for-sensory-needs-therapeutic-approved-flat-lay-rainbow-set.jpg?v=1764647672",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-chew-bands-for-sensory-needs-skin-friendly-soft-absorbent-fabric-multicolor.jpg?v=1764647675",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-chew-bands-for-sensory-needs-travel-friendly-rainbow-pack-on-white.jpg?v=1764647677",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-chew-bands-for-sensory-needs-long-necklace-style-rainbow-velcro-ends.jpg?v=1764647679",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-chew-bands-for-sensory-needs-washable-reusable-rainbow-bands-in-water.jpg?v=1764647681",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensoryshop-chewable-chew-bands-for-sensory-needs-velcro-closeup-microfiber-texture-multicolor.jpg?v=1764647683"
        ],
        "shopifyUrl": "https://www.ableys.in/products/chewable-chew-bands-for-sensory-needs"
      }
    ]
  },
  {
    "slug": "balance-movement",
    "title": "Balance & Movement",
    "description": "Stepping stones, balance boards, trampolines, scooter boards, and exercise equipment for motor skill development.",
    "color": "from-cyan-600 to-blue-600",
    "image": "https://www.ableys.in/cdn/shop/collections/1257x329_26bc1bf1-d95c-4c0b-8f5e-91fa2988b2b2.jpg?v=1766790092&width=600",
    "products": [
      {
        "id": "scooter-board-therapy-balance-board-for-kids-physical-activity-coordination-core-strength-training",
        "shopifyHandle": "scooter-board-therapy-balance-board-for-kids-physical-activity-coordination-core-strength-training",
        "name": "Scooter Board – Therapy & Balance Board for Kids | Physical Activity",
        "categorySlug": "balance-movement",
        "shortDescription": "Many children require engaging ways to build core strength and gross motor skills while burning off excess energy in indoor environments. The Scooter Board provides a dynamic solution that turns physi",
        "description": "Many children require engaging ways to build core strength and gross motor skills while burning off excess energy in indoor environments. The Scooter Board provides a dynamic solution that turns physical development into an exciting game.\nKey Benefits\nPromotes Physical Coordination: Encourages bilateral coordination and motor planning through active movement.\nSupports Core Strength: Engages abdominal and back muscles whether the child is sitting, kneeling, or lying down.\nEnhances Spatial Awareness: Helps children navigate their environment and understand body positioning.\nBuilt for Safety: Features integrated handles to protect fingers and rounded edges for a smooth experience.\nVersatile Sensory Input: Provides essential vestibular and proprioceptive feedback during play.\nHow It Works\nChildren can use the board in various positions—sitting, kneeling, or prone (lying on the stomach)—to propel themselves across smooth surfaces. This movement challenges the body to maintain balance while navigating obstacles or participating in group activities. It is an effective tool for sensory integration and physical therapy sessions, making muscle engagement feel like pure play.\nUsage Environments\nDesigned for use on smooth floors, this board is a staple for schools, therapy centers, and home sensory gyms. Whether used in an organized obstacle course or for independent exploration, it supports active healthy development for growing children.",
        "specifications": {},
        "features": [
          "Scooter Board – Therapy & Balance Board for Kids | Physical Activity"
        ],
        "applications": [
          "balance",
          "coordination",
          "gross-motor",
          "home-play",
          "proprioceptive",
          "therapy-room"
        ],
        "basePrice": 3954,
        "comparePrice": 4749,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_469123fc-f1a4-4f9c-8e97-28f5c0945852.jpg?v=1764648214",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_f5d46e44-fb15-413d-8ce9-78509fdbd168.jpg?v=1764648216",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_a2f10a25-ce13-4905-b936-5a40676a59c0.jpg?v=1764648218",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_a3d3ec06-b350-49ff-9b5d-951c4a6763b4.jpg?v=1764648221",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_41d30015-16dd-48d5-b7ad-9b7c21a98ae3.jpg?v=1764648224",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Scooter-Board.jpg?v=1766132148"
        ],
        "shopifyUrl": "https://www.ableys.in/products/scooter-board-therapy-balance-board-for-kids-physical-activity-coordination-core-strength-training"
      },
      {
        "id": "exercise-band-light-resistance-band-for-stretching-yoga-strength-training",
        "shopifyHandle": "exercise-band-light-resistance-band-for-stretching-yoga-strength-training",
        "name": "Exercise Band – Light | Resistance Band for Stretching, Yoga & Strength Training",
        "categorySlug": "balance-movement",
        "shortDescription": "Finding a gentle way to build strength or improve flexibility without overstraining joints can be challenging for beginners or those in recovery support. The Exercise Band Light provides a safe and ef",
        "description": "Finding a gentle way to build strength or improve flexibility without overstraining joints can be challenging for beginners or those in recovery support. The Exercise Band Light provides a safe and effective solution for low-impact training.\nDurable Latex Construction: High-quality material for smooth, consistent tension.\nJoint-Friendly Resistance: Enhances mobility without putting excessive pressure on joints.\nVersatile Use: Supports yoga, pilates, stretching, and daily fitness routines.\nPortable Design: Lightweight and easy to carry for home, gym, or outdoor sessions.\nBeginner-Friendly: Ideal for those starting their fitness journey or requiring gentle recovery support.\nHow It Works: Unlike traditional weights, this band offers elastic resistance that increases throughout the range of motion. By providing steady tension, it assists in muscle activation and improves proprioceptive awareness. Simply loop the band or hold it to add controlled resistance to any movement, helping to improve balance and endurance safely.",
        "specifications": {},
        "features": [
          "Exercise Band – Light | Resistance Band for Stretching, Yoga & Strength Training"
        ],
        "applications": [],
        "basePrice": 299,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_c76f1085-1244-43ef-a678-607ff57c07a4.jpg?v=1766663240",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_931b49e1-8dcb-4ffe-bb9f-be17f3bd87ab.jpg?v=1766663240",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_fc75cb54-e3d9-4ecb-afb2-487889b0108e.jpg?v=1766663240",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_11ebdd9a-a73d-4b4c-9225-27fcf1c04e22.jpg?v=1766663240",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_c9b8b3e4-a963-4c10-a0a5-7507f19a6376.jpg?v=1766663198"
        ],
        "shopifyUrl": "https://www.ableys.in/products/exercise-band-light-resistance-band-for-stretching-yoga-strength-training"
      },
      {
        "id": "sensory-balance-rocker-board-supports-core-strength-and-vestibular-development",
        "shopifyHandle": "sensory-balance-rocker-board-supports-core-strength-and-vestibular-development",
        "name": "Sensory Balance Rocker Board | Supports Core Strength and Vestibular Development",
        "categorySlug": "balance-movement",
        "shortDescription": "Many children struggle with excess energy or a lack of physical coordination during indoor play, which can lead to restlessness and difficulty focusing on seated tasks.",
        "description": "Many children struggle with excess energy or a lack of physical coordination during indoor play, which can lead to restlessness and difficulty focusing on seated tasks.\nKey Benefits:\nPromotes Vestibular Development: The gentle rocking motion supports the inner ear's sense of balance and spatial orientation.\nBuilds Core Stability: Encourages active engagement of core muscles, improving overall posture and physical confidence.\nVersatile Play Options: Can be used as a rocker, a bridge, a slide, or a quiet reading nook to suit different sensory needs.\nEnhances Motor Planning: Helps children understand their body's position in space through active movement.\nSafe and Durable Design: Features an anti-slip textured surface and a sturdy build for worry-free sensory exploration.\nHow It Works:\nThe Sensory Balance Rocker Board utilizes a curved ergonomic design to provide controlled physical feedback. When a child stands or sits on the board, the shifting center of gravity requires them to adjust their muscles constantly. This \"active play\" provides essential proprioceptive and vestibular input, helping to calm the nervous system and promote physical self-regulation. Whether used for high-energy rocking or as a steady base for balancing, it adapts to the child's specific sensory requirements.",
        "specifications": {},
        "features": [
          "Sensory Balance Rocker Board | Supports Core Strength and Vestibular Development"
        ],
        "applications": [],
        "basePrice": 1997,
        "comparePrice": 2336,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_9ffdffab-4564-4849-b3ae-a2c1dca742dc.jpg?v=1770267466",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_59bb6e8d-6ec2-43b5-895a-406be9a6baa5.jpg?v=1770267466",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_7e0fbd7d-c0bd-488f-805a-637a1917499d.jpg?v=1770267466",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_c88c5e63-75f9-466c-8477-0e9dfe509f53.jpg?v=1770267466",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_8e8c306f-e693-4a0e-b296-71521cbafe60.jpg?v=1770267466",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_f37898c4-c7f6-4f0e-8417-703887496fc0.jpg?v=1770267466"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-balance-rocker-board-supports-core-strength-and-vestibular-development"
      },
      {
        "id": "cosco-medicine-ball-3kg-heavy-duty-rubber-fitness-ball-for-strength-power-core-training",
        "shopifyHandle": "cosco-medicine-ball-3kg-heavy-duty-rubber-fitness-ball-for-strength-power-core-training",
        "name": "Medicine Ball 3kg | Heavy-Duty Rubber Fitness Ball for Strength",
        "categorySlug": "balance-movement",
        "shortDescription": "Finding it difficult to maintain focus or feeling a need for grounding heavy work during physical activity can be a challenge. The Medicine Ball 3kg is designed to provide the deep pressure and propri",
        "description": "Finding it difficult to maintain focus or feeling a need for grounding heavy work during physical activity can be a challenge. The Medicine Ball 3kg is designed to provide the deep pressure and proprioceptive input necessary to support body awareness and motor planning.\nThis durable weighted tool offers several key features to support your sensory and fitness goals:\nWeighted Proprioceptive Input: Provides 3kg of resistance to encourage calming heavy work routines.\nTextured Anti-Slip Surface: Ensures a secure grip and provides tactile feedback during use.\nDurable Construction: Made from rugged rubber to withstand consistent use in home or therapy settings.\nVersatile Application: Supports core engagement, coordination, and physical strength.\nHow It Works\nBy incorporating the 3kg weight into controlled movements such as twists, lifts, or lunges, users receive significant sensory feedback through their muscles and joints. This \"heavy work\" helps the nervous system regulate, promoting better focus and stability. Whether used for physical therapy support or daily sensory breaks, the ball's anti-slip design ensures safe handling during every session.",
        "specifications": {},
        "features": [
          "Medicine Ball 3kg | Heavy-Duty Rubber Fitness Ball for Strength"
        ],
        "applications": [
          "balance",
          "gross-motor",
          "home",
          "proprioceptive",
          "strength",
          "therapy-room"
        ],
        "basePrice": 1152,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9554_890bb31e-be75-45aa-965a-1822aa82aace.jpg?v=1764648214",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen5_cb5acb86-cf39-46ae-96f1-5ff415b5e872.jpg?v=1764648217",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen18.jpg?v=1764648221",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9555_88cc56e3-3f93-419c-9275-a055396fce41.jpg?v=1764648224",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9556_fd0ebeac-662c-4c1f-9b73-c554e06d11d8.jpg?v=1764648226",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Cosco-Medicine-Ball-3kg.jpg?v=1766128291"
        ],
        "shopifyUrl": "https://www.ableys.in/products/cosco-medicine-ball-3kg-heavy-duty-rubber-fitness-ball-for-strength-power-core-training"
      },
      {
        "id": "wooden-balance-board-curved-wobble-board-for-kids-balance-core-strength-sensory-development",
        "shopifyHandle": "wooden-balance-board-curved-wobble-board-for-kids-balance-core-strength-sensory-development",
        "name": "Wooden Balance Board – Curved Wobble Board for Kids | Balance",
        "categorySlug": "balance-movement",
        "shortDescription": "Finding ways to keep children active and engaged indoors while supporting their developmental growth can be a challenge. The Wooden Balance Board provides a versatile solution to help kids develop bod",
        "description": "Finding ways to keep children active and engaged indoors while supporting their developmental growth can be a challenge. The Wooden Balance Board provides a versatile solution to help kids develop body awareness and physical confidence through creative play.\nThis durable, curved board is designed to offer the following benefits:\nPromotes Gross Motor Skills: Encourages rocking and balancing to build strength.\nSensory Support: Provides essential vestibular and proprioceptive input.\nVersatile Design: Functions as a bridge, slide, or step-stool for open-ended play.\nSafe & Smooth: High-quality wood with a smooth finish for comfortable use.\nBoosts Focus: Physical movement helps improve core control and concentration.\nHow It Works\nThe ergonomic curve of the board creates a natural rocking motion. Kids can stand on it to practice balancing, sit in it like a cradle, or flip it over to use as a bridge for imaginative play. By engaging the core muscles and balancing the body, children gain a better sense of spatial awareness and physical coordination.",
        "specifications": {},
        "features": [
          "Wooden Balance Board – Curved Wobble Board for Kids | Balance"
        ],
        "applications": [
          "balance",
          "coordination",
          "gross-motor",
          "home-play",
          "proprioceptive",
          "therapy-room"
        ],
        "basePrice": 2999,
        "comparePrice": 3899,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9796_bd82fe01-e81e-4d39-a553-b1222ef7f681.jpg?v=1764648264",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen-2025-11-11T110002.86.jpg?v=1764648266",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen-2025-11-11T110008.15.jpg?v=1764648269",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9790_3f4dce02-4459-47ad-aad8-f7b6ed22a3d7.jpg?v=1764648271",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9792_e1deca07-33dd-4196-b57d-5c644c5da514.jpg?v=1764648273",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9793_bdabee10-2d11-424f-9da3-5cfbc53ffd28.jpg?v=1764648275",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Balance-Board.jpg?v=1766060195"
        ],
        "shopifyUrl": "https://www.ableys.in/products/wooden-balance-board-curved-wobble-board-for-kids-balance-core-strength-sensory-development"
      },
      {
        "id": "gym-ball-65cm-anti-burst-exercise-ball-for-yoga-fitness-core-strength-training",
        "shopifyHandle": "gym-ball-65cm-anti-burst-exercise-ball-for-yoga-fitness-core-strength-training",
        "name": "Gym Ball – Anti-Burst Exercise Ball for Yoga",
        "categorySlug": "balance-movement",
        "shortDescription": "Maintaining core stability and proper posture can be challenging during traditional workouts or long hours of sitting. The Gym Ball provides a dynamic solution to engage your muscles and improve overa",
        "description": "Maintaining core stability and proper posture can be challenging during traditional workouts or long hours of sitting. The Gym Ball provides a dynamic solution to engage your muscles and improve overall physical coordination.\nDesigned for versatility, this anti-burst exercise ball supports various fitness routines, from intensive core training to gentle stretching.\nKey Benefits:\nDurable anti-burst PVC construction for enhanced safety during use.\nTextured, non-slip surface provides superior grip and stability.\nAvailable in multiple sizes to provide an ergonomic fit for your height.\nPromotes core strength, balance, and flexibility development.\nLightweight and portable design for easy use at home, gym, or office.\nHow It Works:\nUnlike standard fitness equipment, this gym ball utilizes a slow-deflation anti-burst design. By providing an unstable surface, it forces your core muscles to engage constantly to maintain balance. Whether you are performing yoga poses, pilates movements, or using it as an active sitting solution, the textured surface ensures you stay in control while the high-grade PVC supports your body weight safely.",
        "specifications": {},
        "features": [
          "Gym Ball – Anti-Burst Exercise Ball for Yoga"
        ],
        "applications": [
          "balance",
          "gross-motor",
          "home",
          "proprioceptive",
          "strength",
          "therapy-room"
        ],
        "basePrice": 927,
        "comparePrice": null,
        "configOptions": {
          "sizes": [
            {
              "name": "65 cm",
              "priceModifier": 0
            },
            {
              "name": "75 cm",
              "priceModifier": 171
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9720_56aab3dd-f27f-4cdc-ad81-285fd115f7a0.jpg?v=1764648162",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9715_c2f5b492-57e1-4157-8321-894f1471c241.jpg?v=1764648165",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9716_959188eb-49f1-42fa-833e-11ac34cbeb74.jpg?v=1764648168",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen7_4299947b-c448-4fb6-a2d9-2fa41cc91d2e.jpg?v=1764648170",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen24.jpg?v=1764648173",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9724_f0f6d010-c703-45fb-b9e5-c2b045269c51.jpg?v=1764648175",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Cosco-Gym-Ball---65cm.jpg?v=1766127622",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Cosco-Gym-Ball---75cm.jpg?v=1766127737"
        ],
        "shopifyUrl": "https://www.ableys.in/products/gym-ball-65cm-anti-burst-exercise-ball-for-yoga-fitness-core-strength-training"
      },
      {
        "id": "cosco-medicine-ball-2kg-non-slip-rubber-fitness-ball-for-strength-core-functional-training",
        "shopifyHandle": "cosco-medicine-ball-2kg-non-slip-rubber-fitness-ball-for-strength-core-functional-training",
        "name": "Medicine Ball 2kg | Non-Slip Rubber Fitness Ball for Strength",
        "categorySlug": "balance-movement",
        "shortDescription": "Finding the right tools to support body awareness and physical coordination can be a challenge, especially when seeking consistent sensory feedback during movement. The Medicine Ball 2kg is designed t",
        "description": "Finding the right tools to support body awareness and physical coordination can be a challenge, especially when seeking consistent sensory feedback during movement. The Medicine Ball 2kg is designed to provide the heavy work and tactile input necessary to help users feel grounded and focused during physical activities.\nKey Features for Sensory and Physical Support:\nProprioceptive Input: The 2kg weight provides deep pressure and heavy work, supporting body awareness.\nTextured Tactile Grip: The non-slip rubber surface offers significant sensory feedback for the hands.\nDurable Construction: Built for high-impact use in sensory rooms or home gyms.\nBalanced Weight: Ensures steady resistance for coordination and strength exercises.\nVersatile Use: Suitable for gross motor skill development and core stability support.\nHow It Works\nThis medicine ball functions by adding resistance to functional movements. By incorporating it into squats, carries, or overhead reaches, users engage their joints and muscles more deeply. Unlike standard fitness equipment, the textured rubber surface is specifically designed to provide a secure, non-slip grip, ensuring that users can maintain control while receiving constant tactile information. This makes it a helpful tool for movement-based sensory breaks or structured therapy sessions.",
        "specifications": {},
        "features": [
          "Medicine Ball 2kg | Non-Slip Rubber Fitness Ball for Strength"
        ],
        "applications": [
          "balance",
          "gross-motor",
          "home",
          "proprioceptive",
          "strength",
          "therapy-room"
        ],
        "basePrice": 963,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9564_5ac7a364-cb5f-4042-bd51-d725527b4e71.jpg?v=1764648214",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen5_21573802-6fd1-433f-8f48-5588f4c8b6f8.jpg?v=1764648217",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen17.jpg?v=1764648219",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9565_e6a5ed11-59c4-4fe0-bf9d-735e58873d06.jpg?v=1764648221",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9566_2fcd4cac-1dfd-4df4-923e-958c0cffa37b.jpg?v=1764648225",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Cosco-Medicine-Ball-2kg.jpg?v=1766128138"
        ],
        "shopifyUrl": "https://www.ableys.in/products/cosco-medicine-ball-2kg-non-slip-rubber-fitness-ball-for-strength-core-functional-training"
      },
      {
        "id": "sensory-stepping-stones-for-kids-balance-coordination-motor-skills-development",
        "shopifyHandle": "sensory-stepping-stones-for-kids-balance-coordination-motor-skills-development",
        "name": "Abley's Sensory Balance Stepping Stones | 6-Pack Non-Slip Coordination Blocks",
        "categorySlug": "balance-movement",
        "shortDescription": "Many children struggle with body awareness, coordination, and finding constructive ways to burn energy indoors. Abley's Sensory Balance Stepping Stones provide a dynamic solution to support physical d",
        "description": "Many children struggle with body awareness, coordination, and finding constructive ways to burn energy indoors. Abley's Sensory Balance Stepping Stones provide a dynamic solution to support physical development while keeping playtime safe and engaging.\nTextured Sensory Surface: Features raised bumps and a central footprint design to provide calming tactile input and a secure grip.\nSafe & Non-Slip Base: Designed with a specialized bottom that stays firmly in place on hardwood, tile, carpet, and even grass.\nDurable Construction: Built to withstand active play, jumping, and hopping from stone to stone.\nVibrant Multi-Color Set: Includes six bright stones to promote color recognition and visual engagement.\nEasy to Store: Lightweight and stackable design makes it simple to tidy away when playtime is over.\nHow It Works: Simply arrange the stones in various patterns—from straight lines to challenging zigzag obstacle courses. As children step or jump from one stone to the next, they are naturally prompted to adjust their center of gravity. This process supports the development of gross motor skills, enhances core strength, and promotes better spatial awareness. It is an ideal tool for home play, classrooms, or occupational therapy sessions to support sensory integration in a fun, active way.",
        "specifications": {},
        "features": [
          "Abley's Sensory Balance Stepping Stones | 6-Pack Non-Slip Coordination Blocks"
        ],
        "applications": [],
        "basePrice": 4059,
        "comparePrice": 4870,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-26at5.11.10PM.jpg?v=1766749713",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-26at5.11.11PM.jpg?v=1766749713",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-26at5.11.10PM_2.jpg?v=1766749713",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-26at5.11.10PM_1.jpg?v=1766749713"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-stepping-stones-for-kids-balance-coordination-motor-skills-development"
      },
      {
        "id": "cosco-medicine-ball-1kg-durable-rubber-fitness-ball-for-strength-core-balance-training",
        "shopifyHandle": "cosco-medicine-ball-1kg-durable-rubber-fitness-ball-for-strength-core-balance-training",
        "name": "Medicine Ball 1kg | Durable Rubber Fitness Ball for Strength",
        "categorySlug": "balance-movement",
        "shortDescription": "Finding the right tools to support core stability and physical coordination can be challenging when standard weights are difficult to grip or lack the necessary versatility for dynamic movement. The M",
        "description": "Finding the right tools to support core stability and physical coordination can be challenging when standard weights are difficult to grip or lack the necessary versatility for dynamic movement. The Medicine Ball 1kg provides a reliable solution for functional training and sensory integration.\nThis durable training tool is designed to support physical development through various exercise routines. Its key features include:\nTextured Grip: Non-slip rubber surface for excellent control during movement.\nProprioceptive Input: Provides 1kg of weighted resistance to support body awareness.\nDurable Construction: Built from high-density rubber for long-lasting use in active environments.\nVersatile Design: Suitable for a wide range of strength and coordination drills.\nCompact Size: Easy to handle for beginners and those in physical therapy routines.\nHow It Works: Unlike standard dumbbells, the spherical design of this medicine ball allows for multi-planar movement. Users can hold the ball firmly with both hands to perform squats, lunges, or sit-ups, promoting engagement of the core and stabilizer muscles. The textured surface ensures a secure hold, making it an effective tool for partner drills and coordination exercises in home, gym, or school settings.",
        "specifications": {},
        "features": [
          "Medicine Ball 1kg | Durable Rubber Fitness Ball for Strength"
        ],
        "applications": [
          "balance",
          "gross-motor",
          "home",
          "proprioceptive",
          "strength",
          "therapy-room"
        ],
        "basePrice": 774,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9557_6dc2589b-8e1c-4c61-8288-e4c622c960ba.jpg?v=1764648214",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen15.jpg?v=1764648217",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen16.jpg?v=1764648221",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9558_83b0306e-307c-40d8-94b6-76d03e268147.jpg?v=1764648224",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9559_849b910e-9e6e-4a6b-a38d-775494c41001.jpg?v=1764648226",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Cosco-Medicine-Ball-1kg.jpg?v=1766127967"
        ],
        "shopifyUrl": "https://www.ableys.in/products/cosco-medicine-ball-1kg-durable-rubber-fitness-ball-for-strength-core-balance-training"
      },
      {
        "id": "cosco-medicine-ball-4kg-professional-rubber-fitness-ball-for-power-strength-core-workouts",
        "shopifyHandle": "cosco-medicine-ball-4kg-professional-rubber-fitness-ball-for-power-strength-core-workouts",
        "name": "Medicine Ball 4kg | Professional Rubber Fitness Ball for Power",
        "categorySlug": "balance-movement",
        "shortDescription": "Building functional strength and coordination can be challenging without the right tactile equipment. The Medicine Ball 4kg is designed to address the need for a durable, high-grip tool that supports ",
        "description": "Building functional strength and coordination can be challenging without the right tactile equipment. The Medicine Ball 4kg is designed to address the need for a durable, high-grip tool that supports physical development, core stability, and motor planning exercises.\nEnhanced Grip Surface: Features an anti-slip rubber texture for secure handling during active movement.\nDurable Construction: Built with high-quality materials to withstand repetitive impact and professional use.\nVersatile Weight Profile: The 4kg weight provides significant proprioceptive input for strength and balance training.\nEasy Maintenance: The smooth rubber surface allows for quick cleaning between sessions.\nMulti-Sensory Feedback: Offers firm tactile feedback and weighted resistance to promote body awareness.\nHow It Works: This professional-grade fitness ball functions as a versatile resistance tool. By incorporating it into rotational throws, lunges, or core exercises, users engage multiple muscle groups simultaneously. The weighted nature of the ball provides deep pressure input, which can assist with focus and physical grounding during high-energy activities. Use it solo against a solid wall or with a partner to improve reaction time and bilateral coordination.",
        "specifications": {},
        "features": [
          "Medicine Ball 4kg | Professional Rubber Fitness Ball for Power"
        ],
        "applications": [
          "balance",
          "gross-motor",
          "home",
          "proprioceptive",
          "strength",
          "therapy-room"
        ],
        "basePrice": 1341,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9560_644ff2e1-2e6b-4cbb-b886-54b16b79173d.jpg?v=1764648213",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen5_37bf1618-0d90-4b88-99b6-a7183c999aed.jpg?v=1764648216",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen5_b3ace217-7503-44cc-b253-17afd07f677c.jpg?v=1764648219",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9561_2e334ab0-19d7-4895-9fa7-d77b5b545708.jpg?v=1764648221",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/IMG_9562_29a6970a-ca8d-4e18-97fd-4e2b6b9991dd.jpg?v=1764648224",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Cosco-Medicine-Ball-4kg.jpg?v=1766128342"
        ],
        "shopifyUrl": "https://www.ableys.in/products/cosco-medicine-ball-4kg-professional-rubber-fitness-ball-for-power-strength-core-workouts"
      },
      {
        "id": "trampoline-safe-durable-jumping-exercise-trampoline-for-kids-adults-fitness-fun-at-home",
        "shopifyHandle": "trampoline-safe-durable-jumping-exercise-trampoline-for-kids-adults-fitness-fun-at-home",
        "name": "Trampoline – Safe & Durable Jumping Exercise Trampoline for Kids & Adults | Fitness & Fun at Home",
        "categorySlug": "balance-movement",
        "shortDescription": "Finding a safe and effective way for children and adults to channel high energy or seek sensory input can be challenging, especially when indoor space is limited.",
        "description": "Finding a safe and effective way for children and adults to channel high energy or seek sensory input can be challenging, especially when indoor space is limited.\nThe Sensory Trampoline is expertly designed to provide a controlled, high-quality bouncing experience. It serves as a vital tool for those seeking vestibular input, helping to promote physical regulation and focus through active play.\nKey Benefits:\nDurable Steel Frame: Built with a high-strength frame to ensure long-lasting stability during vigorous jumping. ️\nHigh-Quality Elastic Springs: Engineered for a consistent and safe bounce that supports joint health.\nNon-Slip Safety Mat: Features a secure, textured surface and protective padding to prevent accidental slips. ️\nEnhances Coordination: Helps users improve balance, motor skills, and cardiovascular health through rhythmic movement.\nVersatile Use: Portable design that fits seamlessly into play areas, therapy rooms, or home gyms.\nHow It Works:\nThis trampoline utilizes high-rebound elastic technology to provide deep pressure and vestibular stimulation. Unlike standard play equipment, our focus is on stability and safety, featuring a non-slip jumping surface and a reinforced frame. It allows users to release pent-up energy in a productive way, supporting self-regulation and physical fitness in both home and therapeutic settings. ️",
        "specifications": {},
        "features": [
          "Trampoline – Safe & Durable Jumping Exercise Trampoline for Kids & Adults | Fitness & Fun at Home"
        ],
        "applications": [
          "active-play",
          "gross-motor",
          "home-play",
          "proprioceptive",
          "therapy-room"
        ],
        "basePrice": 5822,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_3_4.jpg?v=1767097014",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_b54f58b5-845b-4376-bb3e-a1866f44db4f.jpg?v=1767097014",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_d13199af-e206-4435-ba0d-2862b13d0041.jpg?v=1767097014",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen-2025-11-11T131430.91.jpg?v=1767097014",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Trampoline_1.jpg?v=1767788868"
        ],
        "shopifyUrl": "https://www.ableys.in/products/trampoline-safe-durable-jumping-exercise-trampoline-for-kids-adults-fitness-fun-at-home"
      },
      {
        "id": "abley-s-ball-pool-soft-play-pit-with-colorful-balls-4x4-6x4-ft-for-sensory-motor-skill-development",
        "shopifyHandle": "abley-s-ball-pool-soft-play-pit-with-colorful-balls-4x4-6x4-ft-for-sensory-motor-skill-development",
        "name": "Ball Pool for Kids by Abley – Soft Play Pit without balls (4x4 ft & 6x4 ft) for Sensory Play & Motor Skills",
        "categorySlug": "balance-movement",
        "shortDescription": "Many children struggle with body awareness and sensory processing, often needing a dedicated space where they can engage in safe, active play without the risk of injury. Abley’s Soft Foam Ball Pool pr",
        "description": "Many children struggle with body awareness and sensory processing, often needing a dedicated space where they can engage in safe, active play without the risk of injury. Abley’s Soft Foam Ball Pool provides the perfect solution, offering a structured environment for proprioceptive and tactile input.\nKey Features:\nHigh-Density Foam Walls: Provides a sturdy yet soft boundary for safe exploration and physical play.\nSensory Integration Support: Delivers essential proprioceptive feedback through movement and pressure.\nVersatile Sizing: Available in 4x4 ft and 6x4 ft options to fit home playrooms or professional therapy centers.\nHygienic Maintenance: Features a removable, washable cover to ensure a clean play environment.\nMotor Skill Development: Encourages jumping, crawling, and balancing to improve coordination.\nHow It Works\nSetting up your sensory space is simple. Place the ball pool on a flat, even surface. Once filled with crush-proof balls (sold separately), the pool acts as a multi-sensory hub. Children can \"dive\" into the pool for deep pressure input, practice crawling over the soft edges to build core strength, or engage in social play with peers. The foam construction ensures that even during high-energy play, the environment remains forgiving and supportive of the child's movements.",
        "specifications": {},
        "features": [
          "Ball Pool for Kids by Abley – Soft Play Pit without balls (4x4 ft & 6x4 ft) for Sensory Play & Motor Skills"
        ],
        "applications": [
          "gross-motor",
          "home-play",
          "sensory-play",
          "tactile",
          "therapy-room"
        ],
        "basePrice": 19999,
        "comparePrice": 23999,
        "configOptions": {
          "sizes": [
            {
              "name": "4x4 ft",
              "priceModifier": 0
            },
            {
              "name": "6x4 ft",
              "priceModifier": 9901
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-7ti7o78_530731ce-4f67-4c50-9086-12970c83caa3.jpg?v=1764648119",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-rghergrreg_0fbb8e54-bc65-4161-920e-af85f32418d6.jpg?v=1764648121",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-rthy5trhtr_d6b48943-a73d-4508-ad51-1153662290c1.jpg?v=1764648125",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-ukuy5g64564g5g_5edce4ec-3f73-4c1d-953f-9927f8ec0d02.jpg?v=1764648127",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-ukuy56b56_58775a32-362f-4eb7-96f7-9b17436167c6.jpg?v=1764648130",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-uykyuk_6f7288c5-bea0-44fb-9394-06191a4e6c73.jpg?v=1764648131"
        ],
        "shopifyUrl": "https://www.ableys.in/products/abley-s-ball-pool-soft-play-pit-with-colorful-balls-4x4-6x4-ft-for-sensory-motor-skill-development"
      },
      {
        "id": "sensory-stepping-stones-for-kids",
        "shopifyHandle": "sensory-stepping-stones-for-kids",
        "name": "Abley's Stepping Stones | Textured Top | Non-Slip 5-Piece Set for Balance",
        "categorySlug": "balance-movement",
        "shortDescription": "Abley's Stepping Stones help children develop balance and coordination. This unique 5-piece set is designed for both play and therapy settings. Each stone has a textured top. Kids can feel and explore",
        "description": "Abley's Stepping Stones help children develop balance and coordination. This unique 5-piece set is designed for both play and therapy settings. Each stone has a textured top. Kids can feel and explore the different surfaces with their feet. These sensory stepping stones for kids make active play more engaging.\nEvery stone in the set is sturdy and non-slip. Children jump, step, and arrange them in fun patterns. The sensory stepping stones for kids provide a safe platform for movement. Their non-slip base keeps play secure on smooth or rough floors. Kids can use them with or without socks. The colors are bright. They attract children and invite participation in movement activities.\nEach piece is lightweight and easy to arrange. The sensory stepping stones for kids are portable. Parents can create obstacle courses in any room. Teachers use them to organize group games in classrooms and therapy centers. Therapists recommend these stones for motor planning and coordination practice. The textured surfaces help with tactile input. Children improve focus and body awareness while playing.\nThese stones are made from durable plastic. The materials last through regular play sessions. Maintenance is simple. Wipe the sensory stepping stones for kids clean after each use. Safe for indoor and outdoor environments. They support a child’s sense of confidence as they move from one stone to the next.\nAbley's Stepping Stones suit a wide age range. Younger children enjoy the sensory engagement. Older kids benefit from balance and strength challenges. The design fits most spaces at home, therapy centers, or schools. Use them as a calming tool. They support sensory self-regulation and motor activity throughout the day.\nEncourage group play, imaginative games, or solo exploration. The set promotes active movement and sensory development. Sensory stepping stones for kids offer a fun way to build gross motor skills. The texture and firmness create a rewarding experience for kids who seek sens",
        "specifications": {},
        "features": [
          "Abley's Stepping Stones | Textured Top | Non-Slip 5-Piece Set for Balance"
        ],
        "applications": [
          "balance",
          "coordination",
          "developmental-delays",
          "gross-motor",
          "home-play",
          "low-muscle-tone"
        ],
        "basePrice": 3468,
        "comparePrice": 4838,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/playpals-sensory-stepping-stones-for-kids-set-of-six-multicolor-therapeutic-recommended_a83b05ec-5f22-4908-bba5-a9e02bf8fbfc.jpg?v=1764648068",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/5136cTLMUPL._SX679.jpg?v=1765521866",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/61obxqXgyIL._SX679.jpg?v=1765521866",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/playpals-sensory-stepping-stones-for-kids-hollow-nesting-multicolor-stacked-storage_ec79355d-ba3c-46d0-aa49-e9dbd4edb427.jpg?v=1765521866",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/playpals-sensory-stepping-stones-for-kids-indoor-kids-balance-play-blue-green-yellow_0d7eb99f-848e-41ee-bd5e-5f2b32434a71.jpg?v=1765521866",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/playpals-sensory-stepping-stones-for-kids-outdoor-beach-play-colorful-four-pack_fcb5f93e-6d14-46f1-9366-87de1368d26b.jpg?v=1765521866",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/playpals-sensory-stepping-stones-for-kids-playroom-rug-montessori-style-arrangement_74f594bc-86a9-4e9a-919c-4b4fc36d97e1.jpg?v=1765521866",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Abley_s-Stepping-Stones---Textured-Top--Non-Slip-5-Piece-Set-for-Balance_1.jpg?v=1767789600"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-stepping-stones-for-kids"
      }
    ]
  },
  {
    "slug": "visual-sensory",
    "title": "Visual & Calming",
    "description": "Fiber optic lamps, liquid motion timers, bubble tubes, sensory tents, and visual tools for relaxation and focus.",
    "color": "from-indigo-500 to-purple-600",
    "image": "https://www.ableys.in/cdn/shop/collections/1257x329_51bb4c5e-4c3b-4523-80a0-f96fba74c0a2.jpg?v=1766790029&width=600",
    "products": [
      {
        "id": "bubble-tube-sensory-led-water-tube-for-kids-calming-visual-therapy-light-for-relaxation-focus",
        "shopifyHandle": "bubble-tube-sensory-led-water-tube-for-kids-calming-visual-therapy-light-for-relaxation-focus",
        "name": "Liquid Motion Bubble Tube Set of 5 | Sensory Tube for Kids | Calming Visual Therapy Toy for Relaxation, Focus & Stress Relief",
        "categorySlug": "visual-sensory",
        "shortDescription": "Many children struggle with sensory overload or find it difficult to transition between high-energy activities and quiet time. Without a gentle visual anchor, finding a sense of calm and focus can be ",
        "description": "Many children struggle with sensory overload or find it difficult to transition between high-energy activities and quiet time. Without a gentle visual anchor, finding a sense of calm and focus can be a daily challenge for both parents and educators.\nThe Liquid Motion Sensory Tube Set provides a mesmerizing, gravity-fed experience designed to capture the imagination and soothe the mind. Each of the five tubes offers a unique visual journey, helping to ground the user through rhythmic movement and vibrant colors.\nKey Product Highlights:\nDiverse Visual Inputs: Includes five distinct styles: silver glitter, blue glitter, multicolored confetti, blue liquid bubbles, and a yellow spiral dripper.\nSupports Focus: Encourages visual tracking and concentration, making it an excellent tool for students or those with sensory processing needs.\nPortable Calming Tool: Perfectly sized for small hands, these tubes are easy to take on car rides, to school, or keep in a dedicated sensory corner.\nDurable Construction: Made from shatter-resistant materials designed for frequent handling and exploration.\nNo Batteries Required: Purely gravity-powered for endless, quiet, and screen-free engagement.\nHow It Works:\nSimply select one of the five tubes and flip it vertically. Watch as the internal elements—whether they are shimmering glitter or slow-moving liquid drops—begin their descent to the bottom. The varying speeds and textures across the set allow users to find the specific visual rhythm that best supports their current emotional state. Once the movement stops, just flip it again to restart the calming cycle.",
        "specifications": {},
        "features": [
          "Liquid Motion Bubble Tube Set of 5 | Sensory Tube for Kids | Calming Visual Therapy Toy for Relaxation, Focus & Stress Relief"
        ],
        "applications": [],
        "basePrice": 2340,
        "comparePrice": 2738,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_f169ba89-3192-47c3-8f27-6c3f543bfd72.jpg?v=1770267207",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_d715a6ac-7cd9-46ff-bb6c-ca978769d0a1.jpg?v=1770382581",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_57be2e95-0978-44a2-9bc9-d543c1f8ce2f.jpg?v=1770382581",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_e7221245-c760-42ea-8228-b912d529c552.jpg?v=1770382581",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_0a4586dd-7673-4e06-8063-0676fb9feb05.jpg?v=1770382581",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard7_04cf51f8-dec1-49e2-bb4a-5f77dd56e63c.jpg?v=1770382581",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard8_555089b4-bb3c-49a2-b894-582e57380703.jpg?v=1770382581"
        ],
        "shopifyUrl": "https://www.ableys.in/products/bubble-tube-sensory-led-water-tube-for-kids-calming-visual-therapy-light-for-relaxation-focus"
      },
      {
        "id": "60-minute-rainbow-visual-timer-classroom-and-home-time-management-support",
        "shopifyHandle": "60-minute-rainbow-visual-timer-classroom-and-home-time-management-support",
        "name": "60-Minute Rainbow Visual Timer | Classroom and Home Time Management Support",
        "categorySlug": "visual-sensory",
        "shortDescription": "Help your child master the concept of time with ease!",
        "description": "Help your child master the concept of time with ease!\nMany children and neurodivergent individuals find abstract time difficult to grasp, which can lead to anxiety during transitions or difficulty staying on task. The 60-Minute Rainbow Visual Timer solves this by providing a vibrant, intuitive representation of passing time, making it easier to manage daily routines without the stress of \"how much longer?\"\nKey Benefits:\nVisual Time Representation: The colorful rainbow disk disappears as time elapses, providing a clear \"time remaining\" status at a glance.\nSilent Operation: Ideal for sound-sensitive environments, this timer operates without distracting ticking sounds.\nPromotes Independence: Encourages users to manage their own schedules for homework, play, and chores.\nReduces Transition Anxiety: Provides a gentle visual warning before an activity ends, helping to prevent meltdowns.\nUniversal Design: High-contrast numbers and a simple cloud-accented dial make it accessible for all ages and abilities.\n️ How It Works:\nSimply turn the central blue knob clockwise to the desired duration (up to 60 minutes). As time counts down, the rainbow-colored disk gradually retracts toward the cloud icon. When the disk fully disappears, a clear auditory alert sounds to signal that time is up. It’s a low-stress way to stay productive in the classroom, office, or kitchen.",
        "specifications": {},
        "features": [
          "60-Minute Rainbow Visual Timer | Classroom and Home Time Management Support"
        ],
        "applications": [],
        "basePrice": 1792,
        "comparePrice": 2097,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_981cbec1-08ad-4c54-8cb6-2d70da15a495.jpg?v=1770270366",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_d655a189-5491-49da-8fc2-ec60a38b5ca3.jpg?v=1770382383",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_4f3687a0-2db6-4820-823a-c6e5552c1a41.jpg?v=1770382383",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_69326d1c-799e-47e9-9772-656ee1d79cbe.jpg?v=1770382383",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_6f723786-5bc4-4274-9776-577bc999312d.jpg?v=1770382383",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_a733cb66-34b7-4194-8590-fc0fa6778f13.jpg?v=1770382383"
        ],
        "shopifyUrl": "https://www.ableys.in/products/60-minute-rainbow-visual-timer-classroom-and-home-time-management-support"
      },
      {
        "id": "liquid-motion-bubbler-sensory-toy-for-kids-adults-calming-visual-timer-stress-relief-toy",
        "shopifyHandle": "liquid-motion-bubbler-sensory-toy-for-kids-adults-calming-visual-timer-stress-relief-toy",
        "name": "Liquid Motion Bubbler Sensory Toy – For Kids & Adults | Calming Visual Timer Stress Relief Toy",
        "categorySlug": "visual-sensory",
        "shortDescription": "Feeling restless or overwhelmed can make it difficult to focus on tasks or settle down during transitions. The Liquid Motion Bubbler provides a gentle way to manage these moments through captivating v",
        "description": "Feeling restless or overwhelmed can make it difficult to focus on tasks or settle down during transitions. The Liquid Motion Bubbler provides a gentle way to manage these moments through captivating visual engagement.\nKey Benefits\nRhythmic Visual Support: Slow-motion droplets create a predictable and calming visual pace for the eyes to follow.\nFocus Enhancement: Provides a helpful \"brain break\" that supports individuals in resetting their concentration.\nDynamic Elements: Features internal spinning wheels in specific designs that rotate as liquid passes through, adding a layer of visual interest.\nSturdy Design: Crafted from durable, shatter-resistant plastic to ensure longevity in various environments.\nVibrant Engagement: Utilizes distinct color palettes and liquid densities to keep visual interest high and promote engagement.\nHow It Works\nSimply flip the bubbler to activate the gravity-fed motion. As the colored droplets descend through the clear liquid, they create unique, repetitive patterns. Once the liquid has reached the bottom, flip it again to restart the experience. It is a battery-free tool that provides continuous visual stimulation for classrooms, offices, or home sensory spaces.",
        "specifications": {},
        "features": [
          "Liquid Motion Bubbler Sensory Toy – For Kids & Adults | Calming Visual Timer Stress Relief Toy"
        ],
        "applications": [],
        "basePrice": 397,
        "comparePrice": 464,
        "configOptions": {
          "sizes": [
            {
              "name": "Blue",
              "priceModifier": 0
            },
            {
              "name": "Orange",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_1_3e4be01c-4d7f-41c5-9bd0-13d6118b2490.jpg?v=1770267810",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_2_330a2bc4-a3dc-4808-89a2-f0f00977f073.jpg?v=1770382287",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_3.jpg?v=1770382287",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_4_4f8b8327-c13c-41e8-9897-ce0ad2a803a5.jpg?v=1770382287",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_5_0dcb0d16-77f4-43cd-84f0-35bb9c3e3f9b.jpg?v=1770382287",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_6_c2b3386f-d252-4053-a66d-eb42d8be9c93.jpg?v=1770382287",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_d2529bd2-a33a-44a0-baf1-5c99cb72d904.jpg?v=1770382287",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_d73cbce7-8b44-4db8-8758-2cf425ea52fa.jpg?v=1770382287",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_334524bd-cfd3-4ad9-903b-a0c3403dc395.jpg?v=1770382287",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_c58f8916-b20e-427e-95a7-18efccdcd009.jpg?v=1770382287",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_8f5b20e8-af6c-4ba9-be20-794f77651b88.jpg?v=1770382287",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_22cdd249-98e9-46b2-b948-47a710d4bf36.jpg?v=1770382287"
        ],
        "shopifyUrl": "https://www.ableys.in/products/liquid-motion-bubbler-sensory-toy-for-kids-adults-calming-visual-timer-stress-relief-toy"
      },
      {
        "id": "liquid-motion-bubbler-keychain-visual-calm-focus-support-support-toy",
        "shopifyHandle": "liquid-motion-bubbler-keychain-visual-calm-focus-support-support-toy",
        "name": "Liquid Motion Bubbler Keychain | Visual Calm & Focus Support Toy",
        "categorySlug": "visual-sensory",
        "shortDescription": "Restless hands and overstimulated minds often require a portable visual anchor to help regain focus and composure. The Liquid Motion Bubbler Keychain provides a soothing point of focus, helping to bri",
        "description": "Restless hands and overstimulated minds often require a portable visual anchor to help regain focus and composure. The Liquid Motion Bubbler Keychain provides a soothing point of focus, helping to bridge the gap between high-energy environments and a state of calm.\nKey Benefits\nPromotes Emotional Regulation: The rhythmic flow of droplets helps users find a sense of center during overwhelming moments.\nEnhances Visual Tracking: Watching the bubbles descend encourages ocular focus and concentration.\nPortable Stress Relief: Compact enough to attach to any bag, ensuring sensory support is always within reach.\nSupports Mindfulness: Acts as a visual timer for deep breathing exercises or short sensory breaks.\nHow It Works\nUtilizing the principles of physics and fluid dynamics, this bubbler creates a predictable, repetitive motion. Simply flip the keychain to initiate the gravity-fed descent of colored oil droplets through a clear liquid medium. This process provides a non-distracting visual stimulus that can help ground users with ADHD, autism, or general anxiety by giving the brain a simple, soothing task to track. It is an effective tool for transitions between activities or as a quiet fidget in classrooms and offices.",
        "specifications": {},
        "features": [
          "Liquid Motion Bubbler Keychain | Visual Calm & Focus Support Toy"
        ],
        "applications": [],
        "basePrice": 185,
        "comparePrice": 216,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_d7d4861c-3ad7-4672-8e64-9fc5e261f89a.jpg?v=1770634594",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_7a3a8691-030f-466b-b63e-e260928c38a4.jpg?v=1770634782",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_7d4923d9-7d9e-4f99-a0af-58b676b43b58.jpg?v=1770634782",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_9629badb-f7b1-496f-8ca4-e4b1c48731da.jpg?v=1770634782",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_6e96fa32-d656-482b-a40d-b1df40f6c067.jpg?v=1770634782",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_e1217d7e-b621-41f9-94f5-246c07f679da.jpg?v=1770634782"
        ],
        "shopifyUrl": "https://www.ableys.in/products/liquid-motion-bubbler-keychain-visual-calm-focus-support-support-toy"
      },
      {
        "id": "ball-pool-balls-soft-colorful-play-balls-for-kids-non-toxic-plastic-balls-for-ball-pit-indoor-play",
        "shopifyHandle": "ball-pool-balls-soft-colorful-play-balls-for-kids-non-toxic-plastic-balls-for-ball-pit-indoor-play",
        "name": "Ball Pool Balls – Soft & Colorful Play Balls for Kids | Non-Toxic Plastic Balls for Ball Pit & Indoor Play",
        "categorySlug": "visual-sensory",
        "shortDescription": "Providing a safe and stimulating environment for active play is essential for a child's development. Our Ball Pool Balls offer a vibrant way to engage your child's senses while ensuring a safe play ex",
        "description": "Providing a safe and stimulating environment for active play is essential for a child's development. Our Ball Pool Balls offer a vibrant way to engage your child's senses while ensuring a safe play experience.\nThese lightweight, non-toxic plastic balls are designed to support joyful play in ball pits, play tents, or baby pools. The smooth, crush-proof design ensures long-lasting durability while protecting small hands during active movement.\nKey Highlights:\nSafe & Non-Toxic: Crafted from child-safe materials for worry-free play.\nCrush-Proof Design: Durable construction that maintains its shape even during vigorous activity.\nVisual Stimulation: Bright, multi-colored shades help support color recognition.\nMotor Skill Support: Encourages grasping, tossing, and physical coordination.\nEasy Maintenance: Smooth surfaces that are simple to wipe clean and sanitize.\nHow It Works:\nSimply fill a designated play area, such as a tent or pool, with the balls to create an instant sensory environment. As children move through the balls, they receive tactile feedback and visual stimulation. This activity encourages imaginative play and physical movement, helping to refine both fine and gross motor skills through natural interaction.",
        "specifications": {},
        "features": [
          "Ball Pool Balls – Soft & Colorful Play Balls for Kids | Non-Toxic Plastic Balls for Ball Pit & Indoor Play"
        ],
        "applications": [
          "home-play",
          "sensory-play",
          "tactile",
          "visual"
        ],
        "basePrice": 4500,
        "comparePrice": 5400,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-11-20at12.01.54PM_1.jpg?v=1764648118",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-11-20at12.01.54PM_2.jpg?v=1764648121",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-11-20at12.01.54PM_3.jpg?v=1764648124",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-11-20at12.01.54PM_4.jpg?v=1764648126",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-11-20at12.01.54PM_5.jpg?v=1764648130",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-11-20at12.01.54PM.jpg?v=1764648132",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Ball-Pool-Balls.jpg?v=1766126569"
        ],
        "shopifyUrl": "https://www.ableys.in/products/ball-pool-balls-soft-colorful-play-balls-for-kids-non-toxic-plastic-balls-for-ball-pit-indoor-play"
      },
      {
        "id": "ableys-light-up-sensory-play-tent-for-children-fiber-optic-calming-den-for-focus-relaxation",
        "shopifyHandle": "ableys-light-up-sensory-play-tent-for-children-fiber-optic-calming-den-for-focus-relaxation",
        "name": "Abley's Light-Up Sensory Play Tent for Children | Fiber Optic Calming Den for Focus & Relaxation",
        "categorySlug": "visual-sensory",
        "shortDescription": "Transform any space into a magical and calming sanctuary for your child with the Abley's Fiber Optic Sensory Play Tent! This inviting hideaway provides a safe, soothing, and highly engaging environmen",
        "description": "Transform any space into a magical and calming sanctuary for your child with the Abley's Fiber Optic Sensory Play Tent! This inviting hideaway provides a safe, soothing, and highly engaging environment, perfect for any child who thrives with structured sensory input, focused play, relaxation, or quiet contemplation.\nThe integrated fiber optic lights offer a captivating visual experience, projecting a gentle, colorful, and dynamic glow. This immersive stimulation can support self-regulation, encourage sustained focus, and promote a sense of tranquility – ideal for unwinding after a busy day or during moments of overstimulation. It's an excellent addition for cozy reading nooks, fostering imaginative adventures, or complementing guided play and therapy sessions. (Unlike basic tents, our integrated lights offer consistent, safe illumination without external projectors!)\n️ Crafted from premium, child-safe, and non-toxic materials, the Abley's tent ensures both durability and your peace of mind. Its lightweight and intelligently foldable design allows for incredibly quick assembly (under 5 minutes! ️) and compact storage, making it truly versatile. This is the perfect flexible solution for playrooms, bedrooms, dedicated therapy spaces, or even travel ️, providing a familiar calming nook wherever you go. (Features reinforced stitching and a stable frame for enhanced safety and longevity compared to flimsy alternatives.) Empower your child with their own personal sanctuary to explore, unwind, and deeply engage in stimulating sensory play!\nKey Features:\nDesigned for Calming Play: A cozy and inviting tent providing a safe, soothing environment for children who benefit from focused sensory input and a personal retreat. ️\nIntegrated Fiber Optic Visuals: Soft, colorful fiber optic lights create a captivating and dynamic visual experience, supporting calm, focus, and relaxation.\nEncourages Focus & Self-Regulation: An ideal space for reading, quiet imaginative play, therapeutic a",
        "specifications": {},
        "features": [
          "Abley's Light-Up Sensory Play Tent for Children | Fiber Optic Calming Den for Focus & Relaxation"
        ],
        "applications": [
          "adhd",
          "anxiety",
          "autism",
          "calming",
          "home",
          "lights"
        ],
        "basePrice": 5018,
        "comparePrice": 5499,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_563a4bc1-9dbd-4f35-9de3-0d8ce1a26967.jpg?v=1764647955",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_fa2d482f-cf73-48c7-b3f2-631af1c6ed75.jpg?v=1764647958",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_4f68a0d3-acfd-4dd0-8b85-7eb9b7a57606.jpg?v=1764647962",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_b965a6d5-906e-47fe-9fff-c58d98cda0cc.jpg?v=1764647966",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_0bb67b9b-18f0-4bc7-ba38-136557127a60.jpg?v=1764647969"
        ],
        "shopifyUrl": "https://www.ableys.in/products/ableys-light-up-sensory-play-tent-for-children-fiber-optic-calming-den-for-focus-relaxation"
      },
      {
        "id": "abley-s-fiber-optic-sensory-lamp-for-autism-calming-color-changing-light-with-crystals-led-night-light-for-kids-with-adhd-spd-sensory-issues-no-battery-required-reusable-design",
        "shopifyHandle": "abley-s-fiber-optic-sensory-lamp-for-autism-calming-color-changing-light-with-crystals-led-night-light-for-kids-with-adhd-spd-sensory-issues-no-battery-required-reusable-design",
        "name": "Calming Fiber Optic Sensory Lamp – Color-Changing Light with Crystal Base – LED Night Light for Kids",
        "categorySlug": "visual-sensory",
        "shortDescription": "Create a soothing environment with Abley’s Fiber Optic Sensory Lamp. This calming lamp features glowing fiber optic strands and a crystal-filled base that illuminates in brilliant, color-changing ligh",
        "description": "Create a soothing environment with Abley’s Fiber Optic Sensory Lamp. This calming lamp features glowing fiber optic strands and a crystal-filled base that illuminates in brilliant, color-changing light. Safe and reusable, it makes the perfect night light for a sensory corner or bedtime routine, helping children feel relaxed and secure. Whether used during quiet time or as a gentle night light, this lamp adds a gentle visual stimulation that promotes a calm and focused atmosphere.\nKey Features:\nSoothing Visual Sensory Input: Gentle fiber optic glow with bright, changing colors creates a calming visual experience.\nEngaging Crystal-Filled Base: Adds a magical sparkle effect that is visually engaging and helps hold a child's attention.\nPerfect Night Light for Kids: Creates a comforting bedtime atmosphere that helps kids wind down before sleep.\nDurable & Long-Lasting: Designed with safe materials suitable for daily use in homes, classrooms, or quiet spaces.",
        "specifications": {},
        "features": [
          "Calming Fiber Optic Sensory Lamp – Color-Changing Light with Crystal Base – LED Night Light for Kids"
        ],
        "applications": [
          "anxiety",
          "autism",
          "bedtime",
          "calming",
          "home",
          "lights"
        ],
        "basePrice": 1312,
        "comparePrice": 1859,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsApp_Image_2025-08-20_at_11.43.51_AM_3350863e-c5e1-4032-a02b-75311daeb4b2.jpg?v=1764648162",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2_370c05e2-b259-4a92-aa54-10e0afe7205d.jpg?v=1764648165",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-8i87_84a0fe29-37eb-4898-adaf-6cb388b9abc7.jpg?v=1764648168",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-9oplu9ul_9c62dd0f-4720-42f6-b3dc-b040d7e8de35.jpg?v=1764648170",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-28yopi_o_ad8f86e2-8afc-461c-9ab5-8a612b660bea.jpg?v=1764648173",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-28yopiuyjkuy_af2bb076-f619-4f2c-bf91-87f4371eea15.jpg?v=1764648175",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-28yoplkuiu_53361c93-9f93-4e65-892d-4ab884608bd2.jpg?v=1764648176",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-28yopuliui_8e03f9a8-8b3d-49e5-b78b-4d4d5dfe437e.jpg?v=1764648178",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Fiber-Optic-sensory-light.png?v=1767355454"
        ],
        "shopifyUrl": "https://www.ableys.in/products/abley-s-fiber-optic-sensory-lamp-for-autism-calming-color-changing-light-with-crystals-led-night-light-for-kids-with-adhd-spd-sensory-issues-no-battery-required-reusable-design"
      }
    ]
  },
  {
    "slug": "communication-learning",
    "title": "Communication & Learning",
    "description": "AAC devices, visual communication cards, learning tools, flashcards, and educational aids for speech and cognitive development.",
    "color": "from-teal-500 to-emerald-600",
    "image": "https://www.ableys.in/cdn/shop/collections/1257x329_08b86a3f-c1ca-4eb5-85d5-3a6d460b9dbb.jpg?v=1766789720&width=600",
    "products": [
      {
        "id": "whisper-phones-set-of-6-auditory-feedback-tool-for-reading-and-speech-support",
        "shopifyHandle": "whisper-phones-set-of-6-auditory-feedback-tool-for-reading-and-speech-support",
        "name": "Whisper Phone Set of 6 | Auditory Feedback Tool for Reading and Speech Support",
        "categorySlug": "communication-learning",
        "shortDescription": "Many children struggle with phonemic awareness and maintaining focus during independent reading sessions. The Multicolour Whisper Phones provide a simple yet effective solution by allowing students to",
        "description": "Many children struggle with phonemic awareness and maintaining focus during independent reading sessions. The Multicolour Whisper Phones provide a simple yet effective solution by allowing students to hear their own voices clearly while minimizing background noise.\nProduct Highlights:\nSet of 6 vibrant, multicolour acoustic phones for group or classroom use.\nLightweight and ergonomically designed to fit comfortably in small hands.\nDurable, non-toxic plastic construction designed for classroom longevity.\nPromotes self-correction and supports auditory processing skills.\nAcoustic design amplifies sound naturally without the need for batteries.\nHow It Works\nThese tools are designed to support the development of reading fluency. By providing immediate auditory feedback, they help children recognize speech sounds and improve pronunciation. Simply hold the phone to the ear and mouth like a standard handset. As the child speaks softly into the mouthpiece, the sound is funneled directly to their ear. This allows them to \"whisper\" while hearing themselves at a clear, amplified volume, making it easier to identify mistakes and stay engaged with the text.\nIdeal for Learning Environments\nThey are particularly beneficial for students who require additional support with focus or those participating in speech therapy programs. Whether in a classroom literacy center or during home study, these phones help create a focused \"sound booth\" for every student.",
        "specifications": {},
        "features": [
          "Whisper Phone Set of 6 | Auditory Feedback Tool for Reading and Speech Support"
        ],
        "applications": [],
        "basePrice": 787,
        "comparePrice": 921,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsApp_Image_2026-02-18_at_1.11.53_PM.jpg?v=1771403491",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/New_Whisper_4_3.png?v=1771481211",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/New_Whisper_4_2.png?v=1771481211",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_ce3d006b-f7b1-4c37-a88b-e66e70090643.jpg?v=1771481211",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/New_Whisper_4_1.png?v=1771481211",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_3f43a661-07e5-4ff8-85bd-ee9a9c7f4485.jpg?v=1771481211",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_662659d9-7ad4-4779-b947-f23f834bb5b2.jpg?v=1771481211",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/freepik__realistic-lifestyle-photo-of-an-indian-school-chil__77157.png?v=1771481211",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/freepik__ultrarealistic-lifestyle-image-of-an-indian-child-__77158_1.png?v=1771481211",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/freepik__realistic-lifestyle-photo-of-an-indian-school-chil__77156.png?v=1771481211"
        ],
        "shopifyUrl": "https://www.ableys.in/products/whisper-phones-set-of-6-auditory-feedback-tool-for-reading-and-speech-support"
      },
      {
        "id": "ableys-aac-communication-device-talkable-support-non-verbal-expression-and-daily-routines",
        "shopifyHandle": "ableys-aac-communication-device-talkable-support-non-verbal-expression-and-daily-routines",
        "name": "Abley's AAC Communication Device talkable | Support Non-Verbal Expression and Daily Routines",
        "categorySlug": "communication-learning",
        "shortDescription": "Many children and adults face the daily challenge of being unable to express their basic needs, leading to intense frustration and emotional outbursts. Abley’s AAC Communication Device acts as a vital",
        "description": "Many children and adults face the daily challenge of being unable to express their basic needs, leading to intense frustration and emotional outbursts. Abley’s AAC Communication Device acts as a vital bridge, turning silent struggle into clear, audible expression. It is specifically designed to support non-verbal and minimally verbal individuals in reclaiming their voice and participating more independently in daily life.\nKey Features & Sensory Benefits\n18 Intuitive Visual Icons: Covers essential daily needs like food, water, toilet, and emotions to promote immediate understanding.\nAudible Voice Output: Clear speech generation helps caregivers hear and respond to requests quickly, building user confidence.\nBilingual Support: Features dedicated toggles for English and Hindi to support diverse linguistic environments.\nDurable & Portable Design: Lightweight and robust, perfect for use at home, school, or during therapy sessions.\nTactile Press Buttons: Engaging physical buttons provide sensory feedback, making it easier for users with fine motor challenges.\nHow It Works\nThis \"talkable\" device is incredibly simple to use. Users simply press a high-contrast icon—such as the \"Water\" or \"Toilet\" symbol—and the device speaks the corresponding word aloud. This immediate reinforcement helps connect the visual symbol with the verbal sound, supporting language development and reducing the anxiety associated with being misunderstood.\nWhether it’s used to follow a daily schedule, express a feeling like \"Sad\" or \"Happy,\" or simply say \"Thank You,\" this communication aid promotes inclusion and significantly improves the quality of life for families.",
        "specifications": {},
        "features": [
          "Abley's AAC Communication Device talkable | Support Non-Verbal Expression and Daily Routines"
        ],
        "applications": [],
        "basePrice": 1499,
        "comparePrice": 1678,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-30at6.31.12PM_1.jpg?v=1767099839",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-30at6.31.09PM_1.jpg?v=1767681825",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-30at6.31.10PM.jpg?v=1767681825",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-30at6.31.11PM_1.jpg?v=1767681825",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-30at6.31.12PM_2.jpg?v=1767681825",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-30at6.31.11PM.jpg?v=1767681825",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-30at6.31.10PM_1.jpg?v=1767681825",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-30at6.31.09PM.jpg?v=1767681825",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2025-12-30at6.31.12PM.jpg?v=1767681825"
        ],
        "shopifyUrl": "https://www.ableys.in/products/ableys-aac-communication-device-talkable-support-non-verbal-expression-and-daily-routines"
      },
      {
        "id": "ableys-communication-cards-for-autism-visual-cue-cards-for-nonverbal-kids-32-durable-flashcards-with-keyring-clip-speech-therapy-tools-for-children-with-autism-adhd-spd",
        "shopifyHandle": "ableys-communication-cards-for-autism-visual-cue-cards-for-nonverbal-kids-32-durable-flashcards-with-keyring-clip-speech-therapy-tools-for-children-with-autism-adhd-spd",
        "name": "Visual Communication Cards for Kids – 32 Durable Flashcards with Keyring for Expressing Needs & Emotions",
        "categorySlug": "communication-learning",
        "shortDescription": "Support your child’s communication journey with Abley’s Visual Communication Cards, a powerful tool designed for pre-verbal or speech-delayed children. This 32-card set uses clear visuals and simple t",
        "description": "Support your child’s communication journey with Abley’s Visual Communication Cards, a powerful tool designed for pre-verbal or speech-delayed children. This 32-card set uses clear visuals and simple text to help kids express their needs, emotions, and wants effectively. Each card is sturdy, laminated, and features rounded corners for safe handling. The set includes a detachable keyring and lanyard clip, making it easy to carry and accessible at school, on outings, or at home. Promote independence, reduce frustration, and build confidence with this easy-to-use, child-friendly communication aid.\nKey Features:\nEmpowers Nonverbal Expression: 32 clear visual cue cards help children express emotions, needs, and actions without words.\nSturdy & Safe Material: Waterproof laminated cards with smooth, rounded edges for durable, child-safe use.\nPortable & Accessible: Includes a keyring and lanyard clip for easy attachment to bags, belts, or backpacks.\nBuilds Communication & Independence: Helps reduce frustration by providing a reliable method for self-expression.\nPerfect for Home, School, or Outings: A great tool for parents, teachers, and caregivers to support a child's communication development.",
        "specifications": {},
        "features": [
          "Visual Communication Cards for Kids – 32 Durable Flashcards with Keyring for Expressing Needs & Emotions"
        ],
        "applications": [
          "autism",
          "classroom",
          "communication",
          "developmental-delays",
          "educational",
          "home"
        ],
        "basePrice": 838,
        "comparePrice": 1299,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2ukyuipiul_74da4d5f-5fda-4f53-90d4-f19c5b8c048a.jpg?v=1764648264",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2uky8io87_04f971c7-0d3d-4865-8a6d-98f649528f89.jpg?v=1764648266",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2ukyuilui_5bfe77b8-4d76-44ad-ad35-8e4953e078f4.jpg?v=1764648269",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-7oi778o_b8d3eaa9-066a-4550-bd99-f7cce2fd62c4.jpg?v=1764648271",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-2768ik87_487d4378-9c79-4c66-abf8-40d8da1e509d.jpg?v=1764648274",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-uyo8ylyu_86391f6d-6e78-48c6-99f5-8333ac78dcb3.jpg?v=1764648275",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Visual-Communication-Cards.jpg?v=1766817100"
        ],
        "shopifyUrl": "https://www.ableys.in/products/ableys-communication-cards-for-autism-visual-cue-cards-for-nonverbal-kids-32-durable-flashcards-with-keyring-clip-speech-therapy-tools-for-children-with-autism-adhd-spd"
      },
      {
        "id": "buckle-activity-toy-for-fine-motor-skills",
        "shopifyHandle": "buckle-activity-toy-for-fine-motor-skills",
        "name": "Abley's Buckle Activity Pal Ollie the Owl | Fine Motor Skills Tool",
        "categorySlug": "communication-learning",
        "shortDescription": "Meet Ollie the Owl, the popular buckle activity toy for fine motor skills. Designed by Abley's, this toy brings fun and learning together. Ollie is soft and colorful. Children enjoy snapping, twisting",
        "description": "Meet Ollie the Owl, the popular buckle activity toy for fine motor skills. Designed by Abley's, this toy brings fun and learning together. Ollie is soft and colorful. Children enjoy snapping, twisting, and pulling each buckle. These actions help develop hand strength and coordination.\nThe buckle activity toy for fine motor skills has several engaging buckles. Each buckle is different. Some are easier for small hands. Others provide a bigger challenge. Kids practice matching, latching, and unbuckling. They build confidence with each try. Every movement helps improve grip and finger control.\nFamilies and therapists love this buckle activity toy for fine motor skills. It keeps children busy and focused. Ollie fits well in small backpacks. Lightweight, easy to carry to parks or classrooms. Use it at home during quiet time. It is also useful while traveling. The texture, color, and shapes attract attention right away.\nParents find this toy helps reduce screen time. Schools use it for therapy sessions. Occupational therapists recommend it for skill building. Children with sensory needs enjoy the different fastenings. It supports self-regulation. The materials are safe, durable, and easy to clean.\nAbley's designs each buckle activity toy for fine motor skills with care. Ollie encourages independent play. It helps children explore new movements. Kids work at their own pace. No batteries or screens required. Just pure hands-on activity.\nOllie the Owl stands out among activity pals. Suitable for children of many ages. Makes a thoughtful gift for birthdays or special occasions. Every buckle activity toy for fine motor skills offers long-lasting value. Abley's supports children's development with quality sensory products. Discover the better way to play and learn with Ollie the Owl today.",
        "specifications": {},
        "features": [
          "Abley's Buckle Activity Pal Ollie the Owl | Fine Motor Skills Tool"
        ],
        "applications": [
          "developmental-delays",
          "fine-motor",
          "home",
          "independence",
          "learning",
          "life-skills"
        ],
        "basePrice": 1199,
        "comparePrice": 1805,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/little-learners-buckle-activity-toy-for-fine-motor-skills-owl-plush-front-and-back-therapeutic-tool-badge_c57f59e5-c81a-4a11-8c8f-fc9da0618df6.jpg?v=1764647672",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/little-learners-buckle-activity-toy-for-fine-motor-skills-owl-plush-child-hands-manipulating-straps_21c4e4f1-dc35-4401-a01f-cee1c3d5fb62.jpg?v=1764647674",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/little-learners-buckle-activity-toy-for-fine-motor-skills-owl-plush-child-playing-multi-buckle-closeups_08dfe429-9b0b-42ae-8586-3ac4cd0ea06e.jpg?v=1764647676",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/little-learners-buckle-activity-toy-for-fine-motor-skills-owl-plush-front-button-eyes-zipper-mouth_b1b5aa0c-a18b-408b-ba3c-ad83d66cae4f.jpg?v=1764647678",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/little-learners-buckle-activity-toy-for-fine-motor-skills-owl-plush-rainbow-straps-metal-and-plastic-buckles_66df793c-6817-4f9c-802b-1aa2e5a93345.jpg?v=1764647681",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Adl-Frame-Abley_s-Buckle-Activity-Pal--Ollie-the-Owl--Fine-Motor-Skills-Tool.jpg?v=1766139914"
        ],
        "shopifyUrl": "https://www.ableys.in/products/buckle-activity-toy-for-fine-motor-skills"
      },
      {
        "id": "buckle-activity-toy-for-kids-beetle",
        "shopifyHandle": "buckle-activity-toy-for-kids-beetle",
        "name": "Abley's Buckle Activity Pal Buzz the Beetle | Hands-On Learning Tool",
        "categorySlug": "communication-learning",
        "shortDescription": "Abley's Buckle Activity Pal, Buzz the Beetle, is a friendly buckle activity toy for kids. It is shaped like a cheerful beetle. It encourages children to use their hands. This toy offers multiple buckl",
        "description": "Abley's Buckle Activity Pal, Buzz the Beetle, is a friendly buckle activity toy for kids. It is shaped like a cheerful beetle. It encourages children to use their hands. This toy offers multiple buckle types and colors on its back.\nLittle hands can try each buckle. They practice fastening and unfastening. This keeps children engaged for a long time. Matching and sorting colors bring extra fun. Buzz the Beetle makes learning about buckles exciting.\nThe design is soft and light. Kids find it easy to carry around. Abley's focuses on safety. All parts are smooth and securely attached. The zippers and buckles slide easily. Children get to develop fine motor skills through play.\nBuzz teaches patience. It helps with focus and problem-solving. Kids use the buckle activity toy for kids at home or on the go. It is perfect for travel or waiting rooms. It fits into a backpack or car seat bag.\nParents like products that help independence. This buckle activity toy for kids promotes dressing skills. Children try buckles without frustration. They learn by doing. Sensory input from different textures keeps their minds engaged.\nThis toy supports self-regulation. Children enjoy the simple repetition. The soft fabric soothes with gentle pressure. Buzz’s bright colors are easy for little eyes to see. It invites children to try new tasks.\nThis buckle activity toy for kids is great for children with sensory needs. Its design suits therapeutic play at home or school. Teachers and therapists use it for group or solo activities. It is washable and durable. Care is easy, so it stays clean.\nAbley’s makes tools for every child. Buzz the Beetle is trusted by parents and professionals. Kids feel proud when they master each buckle. Abley's Buckle Activity Pal is more than a toy. It is a hands-on learning aid for independence and fun.",
        "specifications": {},
        "features": [
          "Abley's Buckle Activity Pal Buzz the Beetle | Hands-On Learning Tool"
        ],
        "applications": [
          "developmental-delays",
          "fine-motor",
          "home",
          "independence",
          "learning",
          "life-skills"
        ],
        "basePrice": 996,
        "comparePrice": 1805,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorytoys-buckle-activity-toy-for-kids-front-and-back-therapeutic-badge_411bad6b-687c-449d-9d4e-fb900466ac63.jpg?v=1764647672",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorytoys-buckle-activity-toy-for-kids-buckle-clip-strap-closeups-child-hands_c5479440-de78-41d2-b72e-707c68593494.jpg?v=1764647674",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorytoys-buckle-activity-toy-for-kids-child-holding-ladybug-straps_d4f2a739-34fe-4cf4-9711-1fe86daa3abb.jpg?v=1764647676",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorytoys-buckle-activity-toy-for-kids-four-view-front-back-ladybug_06251af7-f511-4c5e-864f-4ede476c634e.jpg?v=1764647679",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorytoys-buckle-activity-toy-for-kids-front-zipper-open-button-eyes_1480d5d4-70f8-439a-b585-2bcc45560e44.jpg?v=1764647681",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/sensorytoys-buckle-activity-toy-for-kids-rainbow-straps-multi-buckle-back_56df6e1a-8eef-4298-84dc-f3cb88abe95e.jpg?v=1764647682"
        ],
        "shopifyUrl": "https://www.ableys.in/products/buckle-activity-toy-for-kids-beetle"
      }
    ]
  },
  {
    "slug": "daily-living",
    "title": "Daily Living & ADL",
    "description": "Adaptive utensils, drinking cups, toothbrushes, scissors, clothing, and daily living aids for independence.",
    "color": "from-amber-500 to-yellow-600",
    "image": "https://www.ableys.in/cdn/shop/collections/1257x329_d7cc19e2-a60d-490e-9a7a-97c9b19c4b90.jpg?v=1766789970&width=600",
    "products": [
      {
        "id": "adaptive-red-sensory-friendly-cotton-pants-taggles-comfort-easy-independent-dressing",
        "shopifyHandle": "adaptive-red-sensory-friendly-cotton-pants-taggles-comfort-easy-independent-dressing",
        "name": "Adaptive Cotton Pants | Tagless Comfort & Independent Dressing Support",
        "categorySlug": "daily-living",
        "shortDescription": "Make morning routines stress-free and comfortable. ️",
        "description": "Make morning routines stress-free and comfortable. ️\nFor children with tactile sensitivity or fine motor challenges, getting dressed can often be a source of frustration. Rough fabrics, itchy tags, and complicated buttons can turn a simple task into a daily struggle. These Adaptive Cotton Pants are designed to solve exactly that, offering a soothing, gentle experience for sensitive skin.\nWhy parents and kids love them:\n100% Soft Cotton: Natural, breathable fabric that feels gentle all day long.\nZero Irritation: A completely tagless design eliminates the common \"itchy tag\" meltdown.\nSensory-Friendly Seams: Flat seams ensure a smooth feel against the skin, preventing chafing.\nPromotes Independence: The easy pull-on elastic waistband allows children to dress themselves without struggling with zippers or buttons.\nRelaxed Fit: Designed for free movement during play, school, or therapy.\nHow it works:\nSimply pull them on like sweatpants—no fasteners required. The elastic waistband provides a secure yet non-constricting fit, making them perfect for children who are sensitive to tight clothing or are learning to dress independently. Whether for school , therapy sessions , or relaxing at home, these pants provide the comfort and confidence your child needs.",
        "specifications": {},
        "features": [
          "Adaptive Cotton Pants | Tagless Comfort & Independent Dressing Support"
        ],
        "applications": [],
        "basePrice": 1559,
        "comparePrice": 1839,
        "configOptions": {
          "sizes": [
            {
              "name": "Blue / 1- 2Y",
              "priceModifier": 0
            },
            {
              "name": "Blue / 3-4Y",
              "priceModifier": 0
            },
            {
              "name": "Blue / 4-5Y",
              "priceModifier": 0
            },
            {
              "name": "Blue / 5-6Y",
              "priceModifier": 0
            },
            {
              "name": "Blue / 6-7Y",
              "priceModifier": 0
            },
            {
              "name": "Blue / 8-9Y",
              "priceModifier": 0
            },
            {
              "name": "Blue / 10-11Y",
              "priceModifier": 0
            },
            {
              "name": "Red / 1- 2Y",
              "priceModifier": 0
            },
            {
              "name": "Red / 3-4Y",
              "priceModifier": 0
            },
            {
              "name": "Red / 4-5Y",
              "priceModifier": 0
            },
            {
              "name": "Red / 5-6Y",
              "priceModifier": 0
            },
            {
              "name": "Red / 6-7Y",
              "priceModifier": 0
            },
            {
              "name": "Red / 8-9Y",
              "priceModifier": 0
            },
            {
              "name": "Red / 10-11Y",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_420d16c4-069f-4a65-98be-db25e5791656.jpg?v=1765884968",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6-1.jpg?v=1765884968",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard7_fe76e243-fe94-49bb-86ed-374b755b9b58.jpg?v=1766572122",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard8.jpg?v=1766572122",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard10.jpg?v=1766572122",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard11_4bd66155-c4dd-4618-8ec9-e759f032738d.jpg?v=1766572122",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_10.jpg?v=1766572122",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_7.jpg?v=1766572122",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_8.jpg?v=1766572122",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_6-1.jpg?v=1766572122",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_6_2a31dbab-86ce-46f9-bf59-564a1fe72620.jpg?v=1766572122"
        ],
        "shopifyUrl": "https://www.ableys.in/products/adaptive-red-sensory-friendly-cotton-pants-taggles-comfort-easy-independent-dressing"
      },
      {
        "id": "adaptive-kids-shirt-with-hidden-velcro-sensory-friendly-clothing",
        "shopifyHandle": "adaptive-kids-shirt-with-hidden-velcro-sensory-friendly-clothing",
        "name": "Adaptive Kids Full Shirt with Hidden Velcro | Sensory-Friendly Cotton Clothing",
        "categorySlug": "daily-living",
        "shortDescription": "Transform morning struggles into independent success!",
        "description": "Transform morning struggles into independent success!\nDoes your child struggle with tiny buttons or get irritated by scratchy clothing tags? The Ableys Adaptive Shirt is designed to solve these exact challenges. We have reimagined the classic smart shirt to be sensory-inclusive and frustration-free, helping children dress themselves with confidence.\nWhy Parents & Kids Love It:\nHidden Velcro Closure: Looks exactly like a standard button-down shirt but opens and closes instantly with high-quality Velcro hidden behind the placket.\nSensory Friendly Fabric: Crafted from ultra-soft, breathable material that feels gentle against sensitive skin. ️\nZero Irritation: Completely tagless design and flat seam stitching prevent the itching and scratching caused by regular clothes. ️\nSmart & Stylish: Features a trendy mandarin collar and chest pocket, perfect for school or special occasions.\nHow It Works:\nUnlike \"Normal Wear\" which requires complex fine motor skills to button up, our \"Adaptive Wear\" allows children to simply align the front and press to close. It promotes independence and reduces dressing time significantly!\nIdeal for: School, weddings, family photos, and building dressing confidence.",
        "specifications": {},
        "features": [
          "Adaptive Kids Full Shirt with Hidden Velcro | Sensory-Friendly Cotton Clothing"
        ],
        "applications": [],
        "basePrice": 1516,
        "comparePrice": 1743,
        "configOptions": {
          "sizes": [
            {
              "name": "2-3Y",
              "priceModifier": 0
            },
            {
              "name": "3-4Y",
              "priceModifier": 0
            },
            {
              "name": "4-5Y",
              "priceModifier": 0
            },
            {
              "name": "5-6Y",
              "priceModifier": 0
            },
            {
              "name": "6-7Y",
              "priceModifier": 0
            },
            {
              "name": "8-9Y",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_ee56ef96-8144-4acf-ab56-1b18957f0081.jpg?v=1766133524",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_4597ec5b-087b-49a4-81a4-31c9482d67b4.jpg?v=1766133540",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_2f48357a-4375-4e62-b963-89dd561c0e7a.jpg?v=1766565828",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_3ebf854b-b883-4601-bb33-0a511b01ecae.jpg?v=1766565828",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_81b559f6-f65c-417f-a754-a5597a3e5646.jpg?v=1766565828",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_6e696f3d-4fac-4c1b-8e42-b2222cd6992f.jpg?v=1766565828",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6-1_8f3e4e73-b6a3-47c5-9202-7cbdb39d4bd1.jpg?v=1766565828"
        ],
        "shopifyUrl": "https://www.ableys.in/products/adaptive-kids-shirt-with-hidden-velcro-sensory-friendly-clothing"
      },
      {
        "id": "adaptive-long-sleeve-t-shirt-easy-open-shoulder-velcro-sensory-friendly-cotton",
        "shopifyHandle": "adaptive-long-sleeve-t-shirt-easy-open-shoulder-velcro-sensory-friendly-cotton",
        "name": "Adaptive Long Sleeve T-Shirt | Easy-Open Shoulder Velcro & Sensory Friendly Cotton",
        "categorySlug": "daily-living",
        "shortDescription": "Transform Daily Dressing into a Stress-Free Experience",
        "description": "Transform Daily Dressing into a Stress-Free Experience\nFor many children with sensory sensitivities or limited mobility, pulling a tight t-shirt collar over the head can be a source of anxiety and discomfort. Traditional clothing often comes with itchy tags and rough seams that distract and irritate sensitive skin. The Abley's Adaptive Long Sleeve T-Shirt is designed to solve these exact challenges, making getting dressed a breeze rather than a battle.\nWhy Parents and Kids Love This Tee:\nEasy Access Shoulders: Features strong yet soft Velcro openings on both shoulders, expanding the neckline significantly so it slides easily over the head without squeezing.\nSensory-Safe Comfort: Made from 100% soft cotton with absolutely no tags to scratch or tickle the neck.\nFlat Seam Technology: Special flat seam stitching prevents chafing and irritation, ensuring all-day comfort for even the most sensitive skin.\nFun Design: Features the playful \"Meowrassic Park\" print, combining style with function.\nHow to Wear:\nSimply unfasten the Velcro strips on both shoulders to widen the neck opening. Slide the shirt gently over your child's head or pull it up from the feet—whichever is easier. Once in place, press the Velcro strips closed for a secure, comfortable fit that looks just like a standard tee.\nPerfect for school, therapy, or relaxing at home. Give your child the comfort and independence they deserve!",
        "specifications": {},
        "features": [
          "Adaptive Long Sleeve T-Shirt | Easy-Open Shoulder Velcro & Sensory Friendly Cotton"
        ],
        "applications": [],
        "basePrice": 1134,
        "comparePrice": 1338,
        "configOptions": {
          "sizes": [
            {
              "name": "1- 2Y",
              "priceModifier": 0
            },
            {
              "name": "3-4Y",
              "priceModifier": 0
            },
            {
              "name": "4-5Y",
              "priceModifier": 0
            },
            {
              "name": "5-6Y",
              "priceModifier": 0
            },
            {
              "name": "6-7Y",
              "priceModifier": 0
            },
            {
              "name": "8-9Y",
              "priceModifier": 0
            },
            {
              "name": "10-11Y",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_5431f2ef-e5e0-47f1-8300-c52c83b31d31.jpg?v=1766128931",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_18e96fd5-73a3-40ec-8b91-7aa85fda97df.jpg?v=1766129732",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_f5c7fe5a-f7a8-4859-8e36-1362dc3e425f.jpg?v=1766572401",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_987e64d3-1eb6-4e06-b770-ccb480213060.jpg?v=1766572401",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_ec118cae-7c73-4f1b-9d48-6e8e96f9c3e9.jpg?v=1766572401",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_d183d11c-7f05-4b97-9755-4b3520f14f3f.jpg?v=1766572401"
        ],
        "shopifyUrl": "https://www.ableys.in/products/adaptive-long-sleeve-t-shirt-easy-open-shoulder-velcro-sensory-friendly-cotton"
      },
      {
        "id": "adaptive-shoulder-open-t-shirt-sensory-friendly-cotton-hassle-free-dressing",
        "shopifyHandle": "adaptive-shoulder-open-t-shirt-sensory-friendly-cotton-hassle-free-dressing",
        "name": "Adaptive Shoulder-Open Half Sleeve T-Shirt for Kids | Soft Sensory-Friendly Cotton",
        "categorySlug": "daily-living",
        "shortDescription": "Make Dressing a Breeze, Not a Battle!",
        "description": "Make Dressing a Breeze, Not a Battle!\nDoes your morning routine turn into a struggle over tight necklines and scratchy tags? For children with sensory sensitivities or limited mobility, standard t-shirts can be a source of frustration and discomfort. The Ableys Adaptive Shoulder-Open T-Shirt is designed to bring joy and independence back to getting dressed.\nWhy Parents & Kids Love It:\nSensory-Friendly Design: Completely tag-free with flat seams to prevent irritation on sensitive skin.\nHassle-Free Dressing: Features strong yet soft Velcro openings on both shoulders, allowing the neck opening to expand widely.\n100% Soft Cotton: Breathable, natural fabric that keeps your child cool and comfortable all day.\nCute & Encouraging: Features the \"Believe in your MOO-gic\" design to boost confidence.\nAdaptive Functionality: Ideal for assisted dressing or children learning to dress independently without the \"stuck head\" panic.\nHow It Works:\nUnlike normal wear that forces a tight collar over the head, this adaptive tee opens up completely at the shoulders. Simply unfasten the Velcro strips, slide the shirt on easily without touching the face or ears, and press the Velcro closed. It transforms a stressful daily task into a quick, comfortable moment.",
        "specifications": {},
        "features": [
          "Adaptive Shoulder-Open Half Sleeve T-Shirt for Kids | Soft Sensory-Friendly Cotton"
        ],
        "applications": [],
        "basePrice": 1034,
        "comparePrice": 1220,
        "configOptions": {
          "sizes": [
            {
              "name": "1- 2Y",
              "priceModifier": 0
            },
            {
              "name": "3-4Y",
              "priceModifier": 0
            },
            {
              "name": "4-5Y",
              "priceModifier": 0
            },
            {
              "name": "5-6Y",
              "priceModifier": 0
            },
            {
              "name": "6-7Y",
              "priceModifier": 0
            },
            {
              "name": "8-9Y",
              "priceModifier": 0
            },
            {
              "name": "10-11Y",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_1ff1ce0d-6e35-44b9-98bb-c482a3493cc3.jpg?v=1766123911",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_7b2aec05-930c-4725-bf3c-cec678e9e5b8.jpg?v=1766129613",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_9a36906b-b13a-4437-944c-48117ccc0098.jpg?v=1766652340",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_847f1dc9-621f-4d08-8728-228bec370533.jpg?v=1766652340",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_71b8458f-df09-441b-a7bb-166c9cffb8be.jpg?v=1766652340",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_3433dbc3-1bd4-4f26-9ff0-fcf5ed2fa431.jpg?v=1766652340"
        ],
        "shopifyUrl": "https://www.ableys.in/products/adaptive-shoulder-open-t-shirt-sensory-friendly-cotton-hassle-free-dressing"
      },
      {
        "id": "adaptive-shoulder-open-half-sleeve-t-shirt-for-kids-soft-sensory-friendly-cotton",
        "shopifyHandle": "adaptive-shoulder-open-half-sleeve-t-shirt-for-kids-soft-sensory-friendly-cotton",
        "name": "Sensory-Friendly Adaptive Half Sleeve T-Shirt | Shoulder-Open Easy Wear Design",
        "categorySlug": "daily-living",
        "shortDescription": "Make Dressing a Breeze, Not a Battle!",
        "description": "Make Dressing a Breeze, Not a Battle!\nDoes your morning routine turn into a struggle over tight necklines and scratchy tags? For children with sensory sensitivities or limited mobility, standard t-shirts can be a source of frustration and discomfort. The Ableys Adaptive Shoulder-Open T-Shirt is designed to bring joy and independence back to getting dressed.\nWhy Parents & Kids Love It:\nSensory-Friendly Design: Completely tag-free with flat seams to prevent irritation on sensitive skin.\nHassle-Free Dressing: Features strong yet soft Velcro openings on both shoulders, allowing the neck opening to expand widely.\n100% Soft Cotton: Breathable, natural fabric that keeps your child cool and comfortable all day.\nCute & Encouraging: Features the \"Believe in your MOO-gic\" design to boost confidence.\nAdaptive Functionality: Ideal for assisted dressing or children learning to dress independently without the \"stuck head\" panic.\nHow It Works:\nUnlike normal wear that forces a tight collar over the head, this adaptive tee opens up completely at the shoulders. Simply unfasten the Velcro strips, slide the shirt on easily without touching the face or ears, and press the Velcro closed. It transforms a stressful daily task into a quick, comfortable moment.",
        "specifications": {},
        "features": [
          "Sensory-Friendly Adaptive Half Sleeve T-Shirt | Shoulder-Open Easy Wear Design"
        ],
        "applications": [],
        "basePrice": 1034,
        "comparePrice": 1220,
        "configOptions": {
          "sizes": [
            {
              "name": "2-3Y",
              "priceModifier": 0
            },
            {
              "name": "3-4Y",
              "priceModifier": 0
            },
            {
              "name": "4-5Y",
              "priceModifier": 0
            },
            {
              "name": "5-6Y",
              "priceModifier": 0
            },
            {
              "name": "6-7Y",
              "priceModifier": 0
            },
            {
              "name": "8-9Y",
              "priceModifier": 0
            },
            {
              "name": "10-11Y",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_497b9e7b-2125-4380-826b-dac76ec2af1b.jpg?v=1766124350",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_272a53e2-904f-4e3b-a9a5-93201e5ac803.jpg?v=1766129588",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_9e3262fa-d7d8-4b49-b48d-0e30dae86fcd.jpg?v=1766651997",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_b825971f-9584-4b22-b72a-8a3db480e10b.jpg?v=1766651997",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_ccc23a0c-a3e6-4ccd-8de2-850e69da207e.jpg?v=1766651997",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_72759537-b505-4ff8-8cf0-22fc58aa4038.jpg?v=1766651997"
        ],
        "shopifyUrl": "https://www.ableys.in/products/adaptive-shoulder-open-half-sleeve-t-shirt-for-kids-soft-sensory-friendly-cotton"
      },
      {
        "id": "adaptive-half-sleeve-t-shirt-with-shoulder-opening-comfortable-cotton-wear",
        "shopifyHandle": "adaptive-half-sleeve-t-shirt-with-shoulder-opening-comfortable-cotton-wear",
        "name": "Adaptive Half Sleeve T-Shirt with Shoulder Opening | Comfortable Cotton Wear",
        "categorySlug": "daily-living",
        "shortDescription": "Make Dressing a Breeze, Not a Battle!",
        "description": "Make Dressing a Breeze, Not a Battle!\nDoes your morning routine turn into a struggle over tight necklines and scratchy tags? For children with sensory sensitivities or limited mobility, standard t-shirts can be a source of frustration and discomfort. The Ableys Adaptive Shoulder-Open T-Shirt is designed to bring joy and independence back to getting dressed.\nWhy Parents & Kids Love It:\nSensory-Friendly Design: Completely tag-free with flat seams to prevent irritation on sensitive skin.\nHassle-Free Dressing: Features strong yet soft Velcro openings on both shoulders, allowing the neck opening to expand widely.\n100% Soft Cotton: Breathable, natural fabric that keeps your child cool and comfortable all day.\nCute & Encouraging: Features the \"Believe in your MOO-gic\" design to boost confidence.\nAdaptive Functionality: Ideal for assisted dressing or children learning to dress independently without the \"stuck head\" panic.\nHow It Works:\nUnlike normal wear that forces a tight collar over the head, this adaptive tee opens up completely at the shoulders. Simply unfasten the Velcro strips, slide the shirt on easily without touching the face or ears, and press the Velcro closed. It transforms a stressful daily task into a quick, comfortable moment.",
        "specifications": {},
        "features": [
          "Adaptive Half Sleeve T-Shirt with Shoulder Opening | Comfortable Cotton Wear"
        ],
        "applications": [],
        "basePrice": 1034,
        "comparePrice": 1220,
        "configOptions": {
          "sizes": [
            {
              "name": "2-3Y",
              "priceModifier": 0
            },
            {
              "name": "3-4Y",
              "priceModifier": 0
            },
            {
              "name": "4-5Y",
              "priceModifier": 0
            },
            {
              "name": "5-6Y",
              "priceModifier": 0
            },
            {
              "name": "6-7Y",
              "priceModifier": 0
            },
            {
              "name": "8-9Y",
              "priceModifier": 0
            },
            {
              "name": "10-11Y",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_6fa6f301-7035-4fe1-8d8f-6bb538407007.jpg?v=1766125618",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_8551f8d2-3cae-44d3-9719-209fb89262ad.jpg?v=1766129813",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_ea272939-627b-4aff-bef2-5dfc655b12b3.jpg?v=1766651900",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_fcb6e65e-1d4d-4081-8f86-54d0ffaeaeb7.jpg?v=1766651900",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_98bbe81b-e92f-434e-9d80-afe6cd6c11ef.jpg?v=1766651900",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_535c2474-ea32-40b9-aa15-c2fe9d670f2f.jpg?v=1766651900"
        ],
        "shopifyUrl": "https://www.ableys.in/products/adaptive-half-sleeve-t-shirt-with-shoulder-opening-comfortable-cotton-wear"
      },
      {
        "id": "sensory-friendly-adaptive-long-sleeve-t-shirt-easy-open-shoulder-design",
        "shopifyHandle": "sensory-friendly-adaptive-long-sleeve-t-shirt-easy-open-shoulder-design",
        "name": "Sensory-Friendly Adaptive Long Sleeve T-Shirt | Easy-Open Shoulder Design",
        "categorySlug": "daily-living",
        "shortDescription": "Transform Daily Dressing into a Stress-Free Experience",
        "description": "Transform Daily Dressing into a Stress-Free Experience\nFor many children with sensory sensitivities or limited mobility, pulling a tight t-shirt collar over the head can be a source of anxiety and discomfort. Traditional clothing often comes with itchy tags and rough seams that distract and irritate sensitive skin. The Abley's Adaptive Long Sleeve T-Shirt is designed to solve these exact challenges, making getting dressed a breeze rather than a battle.\nWhy Parents and Kids Love This Tee:\nEasy Access Shoulders: Features strong yet soft Velcro openings on both shoulders, expanding the neckline significantly so it slides easily over the head without squeezing.\nSensory-Safe Comfort: Made from 100% soft cotton with absolutely no tags to scratch or tickle the neck.\nFlat Seam Technology: Special flat seam stitching prevents chafing and irritation, ensuring all-day comfort for even the most sensitive skin.\nFun Design: Features the playful \"Meowrassic Park\" print, combining style with function.\nHow to Wear:\nSimply unfasten the Velcro strips on both shoulders to widen the neck opening. Slide the shirt gently over your child's head or pull it up from the feet—whichever is easier. Once in place, press the Velcro strips closed for a secure, comfortable fit that looks just like a standard tee.\nPerfect for school, therapy, or relaxing at home. Give your child the comfort and independence they deserve!",
        "specifications": {},
        "features": [
          "Sensory-Friendly Adaptive Long Sleeve T-Shirt | Easy-Open Shoulder Design"
        ],
        "applications": [],
        "basePrice": 1134,
        "comparePrice": 1338,
        "configOptions": {
          "sizes": [
            {
              "name": "2-3Y",
              "priceModifier": 0
            },
            {
              "name": "3-4Y",
              "priceModifier": 0
            },
            {
              "name": "4-5Y",
              "priceModifier": 0
            },
            {
              "name": "5-6Y",
              "priceModifier": 0
            },
            {
              "name": "6-7Y",
              "priceModifier": 0
            },
            {
              "name": "8-9Y",
              "priceModifier": 0
            },
            {
              "name": "10-11Y",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_b64eee74-2bea-4a31-9421-684820fc53a8.jpg?v=1766130490",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_509e468e-3776-4b01-88f5-1c4738c4b260.jpg?v=1766130490",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_8599a7e1-9399-449d-b17f-33dc837839e0.jpg?v=1766573160",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_c288bbad-5f15-4640-8af5-299e43454287.jpg?v=1766573160",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_090064f0-6b24-4eef-8528-e22acdf867ad.jpg?v=1766573160",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_f0d2a042-a959-485c-801c-28a9636294ea.jpg?v=1766573160"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-friendly-adaptive-long-sleeve-t-shirt-easy-open-shoulder-design"
      },
      {
        "id": "easy-open-shoulder-adaptive-long-sleeve-t-shirt-soft-sensory-cotton",
        "shopifyHandle": "easy-open-shoulder-adaptive-long-sleeve-t-shirt-soft-sensory-cotton",
        "name": "Easy-Open Shoulder Adaptive Long Sleeve T-Shirt | Soft Sensory Cotton",
        "categorySlug": "daily-living",
        "shortDescription": "Transform Daily Dressing into a Stress-Free Experience",
        "description": "Transform Daily Dressing into a Stress-Free Experience\nFor many children with sensory sensitivities or limited mobility, pulling a tight t-shirt collar over the head can be a source of anxiety and discomfort. Traditional clothing often comes with itchy tags and rough seams that distract and irritate sensitive skin. The Abley's Adaptive Long Sleeve T-Shirt is designed to solve these exact challenges, making getting dressed a breeze rather than a battle.\nWhy Parents and Kids Love This Tee:\nEasy Access Shoulders: Features strong yet soft Velcro openings on both shoulders, expanding the neckline significantly so it slides easily over the head without squeezing.\nSensory-Safe Comfort: Made from 100% soft cotton with absolutely no tags to scratch or tickle the neck.\nFlat Seam Technology: Special flat seam stitching prevents chafing and irritation, ensuring all-day comfort for even the most sensitive skin.\nFun Design: Features the playful \"Meowrassic Park\" print, combining style with function.\nHow to Wear:\nSimply unfasten the Velcro strips on both shoulders to widen the neck opening. Slide the shirt gently over your child's head or pull it up from the feet—whichever is easier. Once in place, press the Velcro strips closed for a secure, comfortable fit that looks just like a standard tee.\nPerfect for school, therapy, or relaxing at home. Give your child the comfort and independence they deserve!",
        "specifications": {},
        "features": [
          "Easy-Open Shoulder Adaptive Long Sleeve T-Shirt | Soft Sensory Cotton"
        ],
        "applications": [],
        "basePrice": 1134,
        "comparePrice": 1338,
        "configOptions": {
          "sizes": [
            {
              "name": "2-3Y",
              "priceModifier": 0
            },
            {
              "name": "3-4Y",
              "priceModifier": 0
            },
            {
              "name": "4-5Y",
              "priceModifier": 0
            },
            {
              "name": "5-6Y",
              "priceModifier": 0
            },
            {
              "name": "6-7Y",
              "priceModifier": 0
            },
            {
              "name": "8-9Y",
              "priceModifier": 0
            },
            {
              "name": "10-11Y",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_b7dee1b6-aaef-43c1-b163-5d9bc415b7c1.jpg?v=1766130639",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_4d222118-258a-4245-94c1-c0eb96d107df.jpg?v=1766130639",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_ba8a3b9b-e5d9-4d6f-abb7-39055e2ed41c.jpg?v=1766572888",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_53feb759-d169-435a-861e-eb9d3de45145.jpg?v=1766572888",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_09c6befc-4d55-4e9d-97da-0693cd1631fc.jpg?v=1766572888",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_64880cc7-3082-42a1-9587-c2dceb91f1ab.jpg?v=1766572888"
        ],
        "shopifyUrl": "https://www.ableys.in/products/easy-open-shoulder-adaptive-long-sleeve-t-shirt-soft-sensory-cotton"
      },
      {
        "id": "adaptive-kids-full-sleeve-shirt-with-hidden-velcro-sensory-friendly-wear",
        "shopifyHandle": "adaptive-kids-full-sleeve-shirt-with-hidden-velcro-sensory-friendly-wear",
        "name": "Adaptive Kids Full Sleeve Shirt with Hidden Velcro | Sensory-Friendly Wear",
        "categorySlug": "daily-living",
        "shortDescription": "Transform morning struggles into independent success!",
        "description": "Transform morning struggles into independent success!\nDoes your child struggle with tiny buttons or get irritated by scratchy clothing tags? The Ableys Adaptive Shirt is designed to solve these exact challenges. We have reimagined the classic smart shirt to be sensory-inclusive and frustration-free, helping children dress themselves with confidence.\nWhy Parents & Kids Love It:\nHidden Velcro Closure: Looks exactly like a standard button-down shirt but opens and closes instantly with high-quality Velcro hidden behind the placket.\nSensory Friendly Fabric: Crafted from ultra-soft, breathable material that feels gentle against sensitive skin. ️\nZero Irritation: Completely tagless design and flat seam stitching prevent the itching and scratching caused by regular clothes. ️\nSmart & Stylish: Features a trendy mandarin collar and chest pocket, perfect for school or special occasions.\nHow It Works:\nUnlike \"Normal Wear\" which requires complex fine motor skills to button up, our \"Adaptive Wear\" allows children to simply align the front and press to close. It promotes independence and reduces dressing time significantly!\nIdeal for: School, weddings, family photos, and building dressing confidence.",
        "specifications": {},
        "features": [
          "Adaptive Kids Full Sleeve Shirt with Hidden Velcro | Sensory-Friendly Wear"
        ],
        "applications": [],
        "basePrice": 1516,
        "comparePrice": 1743,
        "configOptions": {
          "sizes": [
            {
              "name": "2-3Y",
              "priceModifier": 0
            },
            {
              "name": "3-4Y",
              "priceModifier": 0
            },
            {
              "name": "4-5Y",
              "priceModifier": 0
            },
            {
              "name": "5-6Y",
              "priceModifier": 0
            },
            {
              "name": "6-7Y",
              "priceModifier": 0
            },
            {
              "name": "8-9Y",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_69291fd1-6010-4188-bab8-7fb8d5203d91.jpg?v=1766134485",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_1385d3ba-016a-4871-91c0-938791854322.jpg?v=1766134485",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_66366dbb-8778-4412-961f-2e10e4ce59eb.jpg?v=1766565636",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_9816f1f5-3c5e-4bcc-9b10-b5a914f6d7b5.jpg?v=1766565636",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_f7552628-a661-4fb9-a283-5e9285f1c69e.jpg?v=1766565636",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_cec092d5-d6d8-4e84-bd4f-ae56175a7708.jpg?v=1766565636"
        ],
        "shopifyUrl": "https://www.ableys.in/products/adaptive-kids-full-sleeve-shirt-with-hidden-velcro-sensory-friendly-wear"
      },
      {
        "id": "sensory-friendly-adaptive-full-shirt-for-kids-hidden-velcro-closure",
        "shopifyHandle": "sensory-friendly-adaptive-full-shirt-for-kids-hidden-velcro-closure",
        "name": "Sensory-Friendly Adaptive Full Shirt for Kids | Hidden Velcro Closure",
        "categorySlug": "daily-living",
        "shortDescription": "Transform morning struggles into independent success!",
        "description": "Transform morning struggles into independent success!\nDoes your child struggle with tiny buttons or get irritated by scratchy clothing tags? The Ableys Adaptive Shirt is designed to solve these exact challenges. We have reimagined the classic smart shirt to be sensory-inclusive and frustration-free, helping children dress themselves with confidence.\nWhy Parents & Kids Love It:\nHidden Velcro Closure: Looks exactly like a standard button-down shirt but opens and closes instantly with high-quality Velcro hidden behind the placket.\nSensory Friendly Fabric: Crafted from ultra-soft, breathable material that feels gentle against sensitive skin. ️\nZero Irritation: Completely tagless design and flat seam stitching prevent the itching and scratching caused by regular clothes. ️\nSmart & Stylish: Features a trendy mandarin collar and chest pocket, perfect for school or special occasions.\nHow It Works:\nUnlike \"Normal Wear\" which requires complex fine motor skills to button up, our \"Adaptive Wear\" allows children to simply align the front and press to close. It promotes independence and reduces dressing time significantly!\nIdeal for: School, weddings, family photos, and building dressing confidence.",
        "specifications": {},
        "features": [
          "Sensory-Friendly Adaptive Full Shirt for Kids | Hidden Velcro Closure"
        ],
        "applications": [],
        "basePrice": 1516,
        "comparePrice": 1743,
        "configOptions": {
          "sizes": [
            {
              "name": "2-3Y",
              "priceModifier": 0
            },
            {
              "name": "3-4Y",
              "priceModifier": 0
            },
            {
              "name": "4-5Y",
              "priceModifier": 0
            },
            {
              "name": "5-6Y",
              "priceModifier": 0
            },
            {
              "name": "6-7Y",
              "priceModifier": 0
            },
            {
              "name": "8-9Y",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_8ebebb61-244f-4321-b0b0-a7fd47b80e8b.jpg?v=1766135360",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_db8da1b0-5245-4f9b-9f28-74cc662f2045.jpg?v=1766561738",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_cc9ad42a-4431-44ae-bc98-cc6da689edb5.jpg?v=1766561738",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_dd7d61f9-010a-4742-961a-8c147bdca210.jpg?v=1766561738",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_53cefc14-c4aa-4615-a87a-84726ae8dbe8.jpg?v=1766561738",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_71d693b1-0e4e-4591-8973-6bc8988937aa.jpg?v=1766561738",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6-1_d9d30501-0078-448e-9d6a-dc6095230a30.jpg?v=1766561738"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-friendly-adaptive-full-shirt-for-kids-hidden-velcro-closure"
      },
      {
        "id": "plastic-cup-with-two-handles-for-elderly-easy-grip-drinking-cup-for-seniors",
        "shopifyHandle": "plastic-cup-with-two-handles-for-elderly-easy-grip-drinking-cup-for-seniors",
        "name": "Plastic Cup with Two Handles for Elderly – 300 ml Easy Grip Drinking Cup for Seniors",
        "categorySlug": "daily-living",
        "shortDescription": "Maintaining independence during mealtime can be challenging for seniors or individuals with limited hand strength, often leading to accidental spills and frustration. The Two-Handle Easy Grip Drinking",
        "description": "Maintaining independence during mealtime can be challenging for seniors or individuals with limited hand strength, often leading to accidental spills and frustration. The Two-Handle Easy Grip Drinking Cup is designed to solve these common obstacles, providing a stable and secure way to enjoy beverages with confidence.\nKey Features & Highlights:\nDual Ergonomic Handles: Provides a balanced, two-handed grip for maximum control and stability.\nLightweight & Durable: Made from high-quality, non-toxic plastic that is easy to lift and built to last.\nSpill-Resistant Design: Includes a fitted lid with a spout to help regulate flow and minimize mess.\nClear Measurement Markings: Transparent body with visible ounce/ml increments for easy monitoring of fluid intake.\nWide, Sturdy Base: Specially engineered to prevent tipping on flat surfaces.\nHow It Works:\nThis cup bridges the gap between traditional glassware and specialized assistive devices. By utilizing two handles, it distributes the weight of the liquid evenly across both hands, significantly reducing the strain caused by arthritis or tremors. The included spout lid allows for controlled sipping, making it an essential tool for home care, hospitals, and senior living environments.",
        "specifications": {},
        "features": [
          "Plastic Cup with Two Handles for Elderly – 300 ml Easy Grip Drinking Cup for Seniors"
        ],
        "applications": [],
        "basePrice": 698,
        "comparePrice": 781,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_b7a3543d-4345-4ed1-b5b0-e1d630adf005.jpg?v=1763963421",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_2dc0b8f7-5079-4b22-a1ee-daf3757c78be.jpg?v=1763963421",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_834ca164-ddff-4bfd-9743-3fc0386e9d8e.jpg?v=1763963422",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_d7027914-4e0c-4814-8209-e624f2450828.jpg?v=1763963421",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_f5c7bbc1-262d-4f05-9dad-fbe35662eada.jpg?v=1763963421",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsApp_Image_2026-01-08_at_11.54.18_AM.jpg?v=1767853477"
        ],
        "shopifyUrl": "https://www.ableys.in/products/plastic-cup-with-two-handles-for-elderly-easy-grip-drinking-cup-for-seniors"
      },
      {
        "id": "loop-scissors-for-kids-safe-easy-to-use-crafting-scissors-for-children",
        "shopifyHandle": "loop-scissors-for-kids-safe-easy-to-use-crafting-scissors-for-children",
        "name": "Loop Scissors for Kids – Safe, Easy-to-Use Crafting Scissors for Children",
        "categorySlug": "daily-living",
        "shortDescription": "Many children struggle with the complex finger-and-thumb coordination required for traditional scissors, which can lead to frustration during art activities and school projects.",
        "description": "Many children struggle with the complex finger-and-thumb coordination required for traditional scissors, which can lead to frustration during art activities and school projects.\nOur Loop Scissors for Kids provide a stress-free solution, allowing young learners to focus on their creativity rather than the mechanics of the tool. These adaptive scissors utilize a simple squeeze-and-release action that makes cutting accessible for everyone.\nKey Product Highlights:\nSelf-Opening Design: The flexible loop handle automatically reopens the blades after every cut, reducing hand fatigue.\nRounded Safety Tips: Designed with blunt ends to ensure a safer experience for preschoolers and early learners.\nAmbidextrous Use: The symmetrical design works equally well for both left-handed and right-handed children.\nErgonomic Grip: Provides a comfortable surface for the whole hand, supporting those with limited fine motor strength.\nDurable Construction: High-quality stainless steel blades paired with resilient plastic handles for long-lasting use.\nHow It Works:\nUnlike standard scissors that require precise finger placement, these loop scissors are operated by a gentle whole-hand squeeze. Simply place the loop in the palm, wrap fingers around the handle, and press to cut. The spring-like action of the loop does the hard work of opening the blades back up, helping children develop confidence and bilateral coordination as they navigate different shapes and materials.",
        "specifications": {},
        "features": [
          "Loop Scissors for Kids – Safe, Easy-to-Use Crafting Scissors for Children"
        ],
        "applications": [],
        "basePrice": 349,
        "comparePrice": 390,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_8517b587-285b-408e-8b72-7a094d25b6f6.jpg?v=1763963723",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_4f031800-f8d8-47fc-9d1c-c521e25b88d9.jpg?v=1763963723",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_ccd1fee9-8dad-4928-86bf-bf58c2bff492.jpg?v=1763963723",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_8f1cc4b5-0295-4d4a-939e-0db3c1720402.jpg?v=1763963723",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen-2025-11-19T162621.72.jpg?v=1763963723",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/image-gen-2025-11-19T173041.42.jpg?v=1763963723"
        ],
        "shopifyUrl": "https://www.ableys.in/products/loop-scissors-for-kids-safe-easy-to-use-crafting-scissors-for-children"
      },
      {
        "id": "drinking-cup-for-kids-safe-easy-to-use-toddler-drinking-cup",
        "shopifyHandle": "drinking-cup-for-kids-safe-easy-to-use-toddler-drinking-cup",
        "name": "Blue Cut-Out Nosey Cup (237ml) | Supports Safe Swallowing & Neck Neutrality",
        "categorySlug": "daily-living",
        "shortDescription": "Drink Safely Without Tilting Your Head",
        "description": "Drink Safely Without Tilting Your Head\nStandard cups often require users to tilt their head back to drain the last drop, which can be dangerous for individuals with swallowing difficulties (dysphagia) or limited neck mobility. The Blue Cut-Out Nosey Cup solves this problem with a specialized ergonomic design.\nBy featuring a cut-out section that fits around the nose, this cup allows the user to maintain a neutral head position and a \"chin-tuck\" posture while drinking. This significantly reduces the risk of choking and supports independent hydration for children and adults alike.\nKey Features:\nSafe Swallowing Support: Designed to facilitate drinking without neck extension.\n237ml Capacity: Perfect size for hydration monitoring and easy handling.\nDurable & Safe: Made from high-quality, food-grade plastic that withstands drops.\nVisual Aid: The bright blue color provides visual contrast for easier recognition.\nEasy Cleaning: Smooth surface design prevents bacteria buildup.\nHow It Works:\nUnlike traditional cups that hit the bridge of the nose, the cut-out section provides clearance. This allows the liquid to flow into the mouth simply by tilting the cup, not the head. This mechanism is essential for proper oral motor therapy and safe feeding practices.\nPerfect For:\nChildren transitioning from bottles to open cups.\nIndividuals with Cerebral Palsy or Dysphagia.\nAnyone with limited range of motion in the neck or upper back.",
        "specifications": {},
        "features": [
          "Blue Cut-Out Nosey Cup (237ml) | Supports Safe Swallowing & Neck Neutrality"
        ],
        "applications": [],
        "basePrice": 338,
        "comparePrice": 378,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_27bf8114-5aa3-423b-aeb7-d6e1bc113126.jpg?v=1767853862",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_3d931379-a855-4480-92fc-373faaa8bc6c.jpg?v=1767853918",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_9a887d82-2a47-477b-9dd2-1b12bf2291da.jpg?v=1767853918",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_af368d86-8666-426b-ab6f-0805e98f18af.jpg?v=1767853918",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_a898205a-6707-4495-9f0d-0cf5daa72a99.jpg?v=1767853862",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsApp_Image_2026-01-08_at_11.59.40_AM.jpg?v=1767853897"
        ],
        "shopifyUrl": "https://www.ableys.in/products/drinking-cup-for-kids-safe-easy-to-use-toddler-drinking-cup"
      },
      {
        "id": "adaptive-utensils-for-elderly-ergonomic-easy-to-use-eating-tools-for-seniors",
        "shopifyHandle": "adaptive-utensils-for-elderly-ergonomic-easy-to-use-eating-tools-for-seniors",
        "name": "Adaptive Utensils for Elderly (Set of 4) – Ergonomic & Easy-to-Use Eating Tools for Seniors",
        "categorySlug": "daily-living",
        "shortDescription": "Maintaining independence at the dining table can be challenging when limited hand strength or mobility issues make standard cutlery difficult to hold. Our Adaptive Utensil Set is designed to bridge th",
        "description": "Maintaining independence at the dining table can be challenging when limited hand strength or mobility issues make standard cutlery difficult to hold. Our Adaptive Utensil Set is designed to bridge that gap, providing a comfortable and secure dining experience for seniors and those with dexterity challenges.\nKey Benefits & Highlights:\nErgonomic Non-Slip Handles: The wide, textured grips provide maximum control and stability.\nLightweight & Durable: Crafted with high-quality stainless steel for long-lasting use without adding unnecessary weight.\nPromotes Dignity: Supports independent eating, helping users feel confident during mealtimes.\nReduced Strain: The specialized handle shape minimizes pressure on finger joints and wrists.\nVersatile Use: Ideal for home, hospitals, or elder care facilities.\nHow It Works:\nUnlike traditional thin-handled silverware, these adaptive tools feature a bulbous, ribbed handle design. This allows the user to utilize a \"palm grip\" rather than a \"pincer grip,\" which is often painful or difficult for those with arthritis or tremors. Simply hold the textured handle firmly to enjoy a more stable and stress-free eating experience.",
        "specifications": {},
        "features": [
          "Adaptive Utensils for Elderly (Set of 4) – Ergonomic & Easy-to-Use Eating Tools for Seniors"
        ],
        "applications": [],
        "basePrice": 999,
        "comparePrice": 1118,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2026-01-08at12.05.18PM_1.jpg?v=1767854268",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2026-01-08at12.05.18PM_3.jpg?v=1767854268",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2026-01-08at12.05.18PM_4.jpg?v=1767854268",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2026-01-08at12.05.18PM_2.jpg?v=1767854268",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WhatsAppImage2026-01-08at12.05.18PM.jpg?v=1767854226"
        ],
        "shopifyUrl": "https://www.ableys.in/products/adaptive-utensils-for-elderly-ergonomic-easy-to-use-eating-tools-for-seniors"
      },
      {
        "id": "suction-silicone-plates-for-elderly-non-slip-dining-plates-for-seniors",
        "shopifyHandle": "suction-silicone-plates-for-elderly-non-slip-dining-plates-for-seniors",
        "name": "Suction Silicone Plates for Elderly – Non-Slip Dining Plates for Seniors",
        "categorySlug": "daily-living",
        "shortDescription": "Mealtime can become a source of stress and frustration for seniors experiencing hand tremors, limited dexterity, or mobility challenges. When plates slide across the table, it leads to spills, mess, a",
        "description": "Mealtime can become a source of stress and frustration for seniors experiencing hand tremors, limited dexterity, or mobility challenges. When plates slide across the table, it leads to spills, mess, and a loss of dining independence. ️\nOur Suction Silicone Plate is designed to provide a stable, worry-free dining experience. By securing firmly to smooth surfaces, it assists users in scooping food without the plate shifting, promoting confidence and dignity during every meal.\nKey Benefits:\nEnhanced Stability: The powerful suction base prevents the plate from sliding or tipping, reducing accidental spills.\nPromotes Independence: Specifically designed to assist those with limited hand strength or tremors to feed themselves more easily.\nSafe & Durable: Crafted from 100% food-grade silicone that is BPA-free and built for long-term daily use. ️\nConvenient Maintenance: Fully microwave and dishwasher safe, making meal prep and cleanup effortless for caregivers.\nErgonomic Support: The flexible yet sturdy material is easy to handle and ideal for home or clinical environments.\nHow It Works: Simply place the plate on a clean, flat surface and press down to engage the suction. The plate remains anchored while the user dines, providing a reliable surface for scooping and cutting. To release, gently lift the edge of the suction base.",
        "specifications": {},
        "features": [
          "Suction Silicone Plates for Elderly – Non-Slip Dining Plates for Seniors"
        ],
        "applications": [],
        "basePrice": 338,
        "comparePrice": 378,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_e807deeb-51e3-4d34-aee1-1c65e7a07906.jpg?v=1763965180",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_b13df9b2-1c03-4f24-8ed6-8710f7702a56.jpg?v=1763965180",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_38a37afe-5c4d-4ee2-9254-36face4f6089.jpg?v=1763965180",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_736b2ccc-2ea9-49ae-a801-a219361d382f.jpg?v=1763965180",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_dd30fbb4-0cfd-41ce-a15c-4875b9b98e2c.jpg?v=1763965180",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_1451705c-3448-4a50-849f-cbd4d70fcaad.jpg?v=1763965180"
        ],
        "shopifyUrl": "https://www.ableys.in/products/suction-silicone-plates-for-elderly-non-slip-dining-plates-for-seniors"
      },
      {
        "id": "spill-proof-plates-for-elderly-non-slip-dining-plates-for-seniors",
        "shopifyHandle": "spill-proof-plates-for-elderly-non-slip-dining-plates-for-seniors",
        "name": "Spill-Proof Plates for Elderly – Non-Slip Dining Plates for Seniors",
        "categorySlug": "daily-living",
        "shortDescription": "Mealtime can often become a source of frustration for individuals dealing with hand tremors, limited mobility, or decreased coordination, leading to spills and a loss of independence.",
        "description": "Mealtime can often become a source of frustration for individuals dealing with hand tremors, limited mobility, or decreased coordination, leading to spills and a loss of independence.\nThe Spill Proof Plates is thoughtfully engineered to restore confidence at the dinner table. Featuring a unique high-back contoured rim, it provides a functional surface to push food against, making it effortless to load onto a spoon or fork without the risk of food sliding off the edge.\nKey Benefits & Highlights:\nEnhanced Independence: The curved wall acts as a built-in guide for easier scooping.\nStable Dining Surface: Designed to remain steady on the table to prevent accidental sliding. ️\nDurable & Food-Safe: Crafted from high-quality, BPA-free materials for daily use. ️\nPromotes Dignity: Supports self-feeding for seniors and those with motor challenges.\nEasy Maintenance: Lightweight design that is simple to clean and dishwasher safe.\nHow it Works: Unlike flat standard plates, this assisted dining tool uses a high-molded curve on one side. Users can simply push their food toward the curved wall, which naturally guides the meal onto their utensil. This eliminates the need for a second utensil or \"chasing\" food around the plate, making it an essential aid for stress-free dining.",
        "specifications": {},
        "features": [
          "Spill-Proof Plates for Elderly – Non-Slip Dining Plates for Seniors"
        ],
        "applications": [],
        "basePrice": 694,
        "comparePrice": 777,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_4e1725d0-6ea2-49d8-a9cb-de581b0e919b.jpg?v=1767854407",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_44e72c59-1fd9-42b9-bd76-d0d991fd80e0.jpg?v=1767854407",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_f4a4c7c7-78f0-45d9-8c00-61135a779b33.jpg?v=1767854407",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_7c5c3d2c-6010-48df-b65d-1b12f0ed92a5.jpg?v=1767854407",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_b9d0b582-03ad-4d80-acdc-2dd3fef0b778.jpg?v=1767854407",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_f0db8577-250b-4e6e-b4d6-0b376fc3907e.jpg?v=1767854407"
        ],
        "shopifyUrl": "https://www.ableys.in/products/spill-proof-plates-for-elderly-non-slip-dining-plates-for-seniors"
      },
      {
        "id": "silent-headphones-for-kids-comfortable-safe-volume-limited-headphones-for-children",
        "shopifyHandle": "silent-headphones-for-kids-comfortable-safe-volume-limited-headphones-for-children",
        "name": "Silent Headphones for Kids – Comfortable & Safe Volume-Limited Headphones for Children",
        "categorySlug": "daily-living",
        "shortDescription": "Finding the right balance between digital engagement and hearing safety can be a challenge for parents, as standard headphones often reach volumes that are unsafe for developing ears. Our Silent Headp",
        "description": "Finding the right balance between digital engagement and hearing safety can be a challenge for parents, as standard headphones often reach volumes that are unsafe for developing ears. Our Silent Headphones for Kids provide a dedicated solution that protects auditory health while allowing children to focus on their favorite educational or entertainment content without distraction.\nKey Features & Sensory Benefits:\nBuilt-In Volume Limiter: Automatically caps sound at safe levels to prevent hearing damage.\nFocus Enhancement: Provides a controlled acoustic environment ideal for online learning and concentration.\nErgonomic Design: Lightweight, adjustable headband ensures a secure fit for various head sizes.\nUltra-Soft Cushioning: Padded ear cups offer all-day comfort for sensitive skin and ears.\nDurable Build: Engineered to withstand the daily wear and tear of active childhood use.\nHow It Works:\nThese headphones utilize passive noise isolation and internal volume-limiting circuitry to create a safe, immersive listening experience. Simply connect the headphones to any standard audio jack, and the built-in safety features handle the rest. The adjustable headband and soft cushions work together to distribute pressure evenly, making them comfortable for long-duration use during travel or schoolwork.",
        "specifications": {},
        "features": [
          "Silent Headphones for Kids – Comfortable & Safe Volume-Limited Headphones for Children"
        ],
        "applications": [],
        "basePrice": 1499,
        "comparePrice": 1678,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_0c121a15-26db-4b41-83ae-60089fb60368.jpg?v=1767853293",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_22c205fc-79bc-42c6-9ed2-e88cfadaa295.jpg?v=1767853311",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_81d459fc-1b77-4731-a2f2-dbaca27c0d76.jpg?v=1767853311",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_36bbff1d-2ebb-4352-97db-8a0a21da820b.jpg?v=1767853293",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_18f5ddf8-10f5-4eac-8732-67327c10b75c.jpg?v=1767853293"
        ],
        "shopifyUrl": "https://www.ableys.in/products/silent-headphones-for-kids-comfortable-safe-volume-limited-headphones-for-children"
      },
      {
        "id": "3-sided-toothbrush-for-kids-easy-effective-brushing-for-children",
        "shopifyHandle": "3-sided-toothbrush-for-kids-easy-effective-brushing-for-children",
        "name": "3-Sided Toothbrush for Kids – Easy & Effective Brushing for Children",
        "categorySlug": "daily-living",
        "shortDescription": "Many children struggle to reach every surface of their teeth effectively, often missing the back or chewing areas during their daily routine. The 3-Sided Toothbrush for Kids solves this challenge by c",
        "description": "Many children struggle to reach every surface of their teeth effectively, often missing the back or chewing areas during their daily routine. The 3-Sided Toothbrush for Kids solves this challenge by covering all three sides of the teeth in a single, efficient stroke.\nThis innovative design supports a thorough clean while making the process simpler for small hands.\nKey Benefits & Features:\nTriple-Sided Design: Cleans the front, back, and chewing surfaces simultaneously for maximum efficiency.\nSoft Bristle Technology: Gentle on sensitive gums while supporting effective plaque removal.\nBPA-Free Materials: Crafted from high-quality, safe materials for peace of mind.\nErgonomic Grip: A handle designed specifically for toddlers and children to promote independent brushing.\nTravel-Friendly: Lightweight and durable, making it easy to maintain hygiene routines anywhere.\nHow It Works:\nUnlike standard flat brushes that require multiple angles, this toothbrush utilizes a U-shaped orientation that hugs the teeth. Simply apply a pea-sized amount of toothpaste, place the brush over the teeth, and move back and forth. The three-sided contact ensures no spot is left behind, promoting better oral health habits from a young age.",
        "specifications": {},
        "features": [
          "3-Sided Toothbrush for Kids – Easy & Effective Brushing for Children"
        ],
        "applications": [],
        "basePrice": 348,
        "comparePrice": 389,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_692a2fb8-34fd-4d04-9249-a8300c1bfcd3.jpg?v=1767854501",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_87960ce9-a283-42df-acc7-aa69b176e64c.jpg?v=1767854500",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_856aeb1e-e9cd-4df7-8744-7f4d4b223ba9.jpg?v=1767854501",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_ce7de44a-1829-4815-84af-1966aa70d80a.jpg?v=1767854501",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_ec321e71-8251-41f0-a1df-6099991a1524.jpg?v=1767854501",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_a1867c75-0316-49be-81b8-6affb8073ca5.jpg?v=1767854500"
        ],
        "shopifyUrl": "https://www.ableys.in/products/3-sided-toothbrush-for-kids-easy-effective-brushing-for-children"
      },
      {
        "id": "kids-table-sturdy-colorful-plastic-study-table-for-children-perfect-for-learning-play-craft-activities",
        "shopifyHandle": "kids-table-sturdy-colorful-plastic-study-table-for-children-perfect-for-learning-play-craft-activities",
        "name": "Kids Table – Sturdy & Colorful Plastic Study Table for Children | Perfect for Learning, Play & Craft Activities",
        "categorySlug": "daily-living",
        "shortDescription": "Children often lack a dedicated, safe workspace sized specifically for their height, which can hinder focus and posture during creative or educational activities. The Kids Plastic Study Table provides",
        "description": "Children often lack a dedicated, safe workspace sized specifically for their height, which can hinder focus and posture during creative or educational activities. The Kids Plastic Study Table provides a reliable, designated area that supports a child's natural need for structure and organization.\nThis functional piece of furniture is designed with the specific needs of developing children in mind, featuring:\nDurable Construction: High-quality plastic built for daily use.\nFocus-Friendly: Provides a stable surface for concentration.\nSafety First: Rounded corners and smooth edges to prevent accidents.\nLightweight Design: Easy for adults to move between rooms.\nVersatile Use: Suitable for both indoor learning and outdoor play.\nHow It Works:\nSetting up a successful learning environment is simple. Place the table on a flat surface in a well-lit area to promote ergonomic posture. Use the smooth, easy-to-clean surface for everything from tactile sensory play with clay to structured homework sessions. The stable design ensures the table remains steady while your child explores their creativity or completes tasks.",
        "specifications": {},
        "features": [
          "Kids Table – Sturdy & Colorful Plastic Study Table for Children | Perfect for Learning, Play & Craft Activities"
        ],
        "applications": [],
        "basePrice": 927,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_1.jpg?v=1766663351",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_1_e3b86331-9df4-4776-9f1d-d57853bef8f9.jpg?v=1766663351",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_1_fbb66618-85b0-44bd-9cba-79f46f2b571a.jpg?v=1766663351",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_1_82919112-cf9c-46e2-9414-796fcf0d44e5.jpg?v=1766663351",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_3_8.jpg?v=1767789357"
        ],
        "shopifyUrl": "https://www.ableys.in/products/kids-table-sturdy-colorful-plastic-study-table-for-children-perfect-for-learning-play-craft-activities"
      },
      {
        "id": "bolster-soft-comfortable-baby-bolster-pillow-supportive-sleeping-pillow-for-kids-newborns-1",
        "shopifyHandle": "bolster-soft-comfortable-baby-bolster-pillow-supportive-sleeping-pillow-for-kids-newborns-1",
        "name": "Bolster – Soft & Comfortable Baby Bolster Pillow | Supportive Sleeping Pillow for Kids & Newborns",
        "categorySlug": "daily-living",
        "shortDescription": "Finding the right sleep support for a newborn or growing child can be difficult, as they often need extra security and physical alignment to stay comfortable throughout the night. Our Bolster Pillow p",
        "description": "Finding the right sleep support for a newborn or growing child can be difficult, as they often need extra security and physical alignment to stay comfortable throughout the night. Our Bolster Pillow provides the gentle physical boundaries and soft support necessary to promote a restful and secure sleeping environment.\nkey benefits:\nErgonomic Support: Designed to provide gentle support to the neck, back, and arms.\nPromotes Security: Mimics a sense of closeness to help children feel safe in their crib or bed.\nVersatile Use: Perfect for nap time, bedtime, or as a cozy travel companion.\nSkin-Friendly Fabric: Crafted from premium, breathable materials safe for delicate skin.\nHypoallergenic Filling: Features non-toxic stuffing to ensure a healthy sleep space.\nHow It Works:\nThe Bolster Pillow functions as a positioning aid that encourages healthy posture during sleep. By hugging or resting against the bolster, children receive calming tactile input that can reduce restlessness. Unlike flat pillows, the cylindrical shape is specifically designed to fit the natural contours of a child's body, providing consistent support whether they are side-sleeping or lounging.",
        "specifications": {},
        "features": [
          "Bolster – Soft & Comfortable Baby Bolster Pillow | Supportive Sleeping Pillow for Kids & Newborns"
        ],
        "applications": [
          "bedtime",
          "calming",
          "home",
          "sleep"
        ],
        "basePrice": 3999,
        "comparePrice": null,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_a23c94bc-9b5d-4829-a6e1-b9b30d5abf85.jpg?v=1766657995",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_89d88dfc-6e0b-4608-b267-f8e2bc400ffa.jpg?v=1766657995",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_9f232f0e-9c5f-433c-b0dd-35e4d25a14e5.jpg?v=1766657995",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_39b21aa5-67ee-4b86-ae92-2defb5171b83.png?v=1766657996",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_63489830-fd9f-4c81-a6dd-128d96e88795.png?v=1766657996",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard_4.png?v=1767789091"
        ],
        "shopifyUrl": "https://www.ableys.in/products/bolster-soft-comfortable-baby-bolster-pillow-supportive-sleeping-pillow-for-kids-newborns-1"
      },
      {
        "id": "ableys-child-with-autism-on-board-car-safety-sticker",
        "shopifyHandle": "ableys-child-with-autism-on-board-car-safety-sticker",
        "name": "Child On Board Car Safety Sticker for Unique Needs – Yellow Diamond Warning Sign for Vehicles",
        "categorySlug": "daily-living",
        "shortDescription": "Enhance awareness and safety with this \"Child On Board\" car sticker. This bright, highly visible sign alerts emergency responders and other drivers that a child with unique communication or behavioral",
        "description": "Enhance awareness and safety with this \"Child On Board\" car sticker. This bright, highly visible sign alerts emergency responders and other drivers that a child with unique communication or behavioral needs is in the vehicle. In an emergency, this sticker communicates vital information—that the child may not respond to verbal commands, might be unaware of danger, or could resist help. The durable, weatherproof design is ideal for car windows or bumpers. A simple yet vital tool for families, encouraging extra caution and understanding from others.\nKey Features:\nHigh-Visibility Safety Sign: Alerts first responders and drivers to the presence of a child with special communication needs.\nProvides Crucial Information: Helps explain that a child may not respond as expected in an emergency situation.\nDurable & Weather-Resistant: Made to withstand the elements on a car window or bumper for long-lasting use.\nEasy to Apply: Simple peel-and-stick application for any vehicle.\nPromotes Safety & Awareness: A vital tool for providing peace of mind to parents and caregivers on the road.",
        "specifications": {},
        "features": [
          "Child On Board Car Safety Sticker for Unique Needs – Yellow Diamond Warning Sign for Vehicles"
        ],
        "applications": [
          "autism",
          "on-the-go",
          "travel"
        ],
        "basePrice": 281,
        "comparePrice": 499,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1kj7ty_75b7b2bf-0d3b-4e20-8d43-075b58ea20b2.jpg?v=1764648162",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-8lk87lo879o89_2eba8f99-f853-451d-8540-8f3f52c367aa.jpg?v=1764648165",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-68kk6k_eca4b746-1867-4921-9d38-249125140dcf.jpg?v=1764648168",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-erher_0df1c465-9d1f-4c85-a1ae-6dd48c7b3574.jpg?v=1764648169",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-i76o6_f13dcd82-fec5-4849-88bf-bcdd3d93bcd2.jpg?v=1764648171"
        ],
        "shopifyUrl": "https://www.ableys.in/products/ableys-child-with-autism-on-board-car-safety-sticker"
      }
    ]
  },
  {
    "slug": "tactile-sensory",
    "title": "Tactile & Sensory Brushes",
    "description": "Sensory brushes, textured bracelets, acupressure rings, and tactile tools for desensitization and sensory input.",
    "color": "from-lime-600 to-green-700",
    "image": "https://www.ableys.in/cdn/shop/collections/1257x329_40a87cff-4a3b-49a2-879b-d5e8dea20d62.jpg?v=1766789894&width=600",
    "products": [
      {
        "id": "sensory-brush-2",
        "shopifyHandle": "sensory-brush-2",
        "name": "Abley's Sensory Brush Deep Pressure | Calming Tactile Input 1 Pc",
        "categorySlug": "tactile-sensory",
        "shortDescription": "Many individuals experience sensory over-responsivity or restlessness when they cannot properly process tactile input. Finding a way to provide consistent, grounding pressure is essential for maintain",
        "description": "Many individuals experience sensory over-responsivity or restlessness when they cannot properly process tactile input. Finding a way to provide consistent, grounding pressure is essential for maintaining focus and emotional regulation throughout the day.\nKey Benefits & Highlights:\nCalming Deep Pressure: Designed to provide firm yet gentle tactile stimulation to support relaxation.\nSensory Regulation: Helps individuals who seek tactile input to feel more grounded and centered.\nVersatile Use: Ideal for home routines, classroom transitions, or professional therapy sessions.\nSkin-Safe Materials: Crafted with BPA-free bristles that glide comfortably over skin or clothing.\nTherapist Approved: Suitable for use with the Wilbarger Protocol or general occupational therapy needs.\nHow It Works:\nThe Abley’s Sensory Brush delivers moderate to deep pressure through its specialized bristle design. By applying firm, rhythmic strokes across the arms, back, or legs, the brush provides the proprioceptive input needed to help calm the nervous system. This method is often used to support those with tactile defensiveness or sensory processing needs, making it a portable and effective tool for emotional support.",
        "specifications": {},
        "features": [
          "Abley's Sensory Brush Deep Pressure | Calming Tactile Input 1 Pc"
        ],
        "applications": [
          "autism",
          "clinical",
          "desensitization",
          "home",
          "spd",
          "tactile"
        ],
        "basePrice": 468,
        "comparePrice": 673,
        "configOptions": {
          "sizes": [
            {
              "name": "Blue",
              "priceModifier": 0
            },
            {
              "name": "Grey",
              "priceModifier": 0
            },
            {
              "name": "Brown",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1ut_be06df27-dfb3-456b-9aa2-36404883d95f.jpg?v=1764648007",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1ijkyk_26a59a66-ea2d-4752-a3cb-df564edc086e.jpg?v=1765533534",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/61GGmklwOfL._SX679.jpg?v=1765533534",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-1iu7j_47a95f5d-ff16-4ff5-ab57-ca9d6fc7507d.jpg?v=1765533534",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-ik7uyikkj_1cac9fea-9038-41eb-a7f0-a9c58112fdff.jpg?v=1765533534",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-o7yoy_3d1bbec2-e18c-4b18-aa7d-f1b62beebe73.jpg?v=1765533534",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-yyy_31a890ce-997f-4e74-95a9-4fe006b564a9.jpg?v=1765533534",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-tykjt.jpg?v=1765533534",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Untitled-ujyt.jpg?v=1765533534"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-brush-2"
      },
      {
        "id": "sensory-therapressure-brush-ableys",
        "shopifyHandle": "sensory-therapressure-brush-ableys",
        "name": "Abley's Sensory Therapressure Brush | Original 1 Pc",
        "categorySlug": "tactile-sensory",
        "shortDescription": "A sensory brush for deep pressure and calming.",
        "description": "A sensory brush for deep pressure and calming.\nDiscover comfort and relief with Abley's Therapressure Therapy Brush, thoughtfully designed for individuals experiencing sensory processing challenges. This specialised brush delivers medium-to-deep pressure stimulation across various body areas, including arms, legs, back, and hands. The brush features soft, skin-friendly bristles that help create a calming sensation during moments of tactile sensitivity or overwhelming situations.\nTherapeutic Design: Specially engineered brush provides medium-to-deep pressure stimulation for sensory processing and tactile therapy support.\nVersatile Application: Can be used on arms, legs, back, hands, and other body areas to help individuals adjust to touch sensations.\nCalming Support: Helps reduce stress and overwhelming feelings associated with touch-related sensory challenges.",
        "specifications": {},
        "features": [
          "Abley's Sensory Therapressure Brush | Original 1 Pc"
        ],
        "applications": [
          "autism",
          "clinical",
          "desensitization",
          "home",
          "spd",
          "tactile"
        ],
        "basePrice": 374,
        "comparePrice": 538,
        "configOptions": {
          "sizes": [
            {
              "name": "White",
              "priceModifier": 0
            },
            {
              "name": "Blue",
              "priceModifier": 0
            },
            {
              "name": "Green",
              "priceModifier": 0
            },
            {
              "name": "Orange",
              "priceModifier": 0
            },
            {
              "name": "Pink",
              "priceModifier": 0
            },
            {
              "name": "Yellow",
              "priceModifier": 0
            }
          ]
        },
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/special-supplies-sensory-therapressure-brush-white-single-with-therapeutic-tool-badge.jpg?v=1764648006",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/special-supplies-sensory-therapressure-brush-hand-applying-blue-brush-to-child-forearm.jpg?v=1764648008",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/special-supplies-sensory-therapressure-brush-two-brushes-white-teal-6-pack.jpg?v=1764648009",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/special-supplies-sensory-therapressure-brush-blue-dimensions-8cm-4cm.webp?v=1767852257",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/special-supplies-sensory-therapressure-brush-hand-holding-brush-showing-flexible-bristles.jpg?v=1767852257",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/special-supplies-sensory-therapressure-brush-hand-holding-blue-brush-professional-use.jpg?v=1767852257",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/special-supplies-sensory-therapressure-brush-pair-white-teal-gentle-bristles.jpg?v=1767852257",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/special-supplies-sensory-therapressure-brush-angled-white-isolated.jpg?v=1767852257",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/special-supplies-sensory-therapressure-brush-angled-blue-isolated.jpg?v=1767852257",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/special-supplies-sensory-therapressure-brush-angled-teal-isolated.jpg?v=1767852257",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/special-supplies-sensory-therapressure-brush-angled-orange-isolated.jpg?v=1767852257",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/special-supplies-sensory-therapressure-brush-angled-pink-isolated.jpg?v=1767852257",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/special-supplies-sensory-therapressure-brush-yellow-top-view.jpg?v=1767852257"
        ],
        "shopifyUrl": "https://www.ableys.in/products/sensory-therapressure-brush-ableys"
      }
    ]
  },
  {
    "slug": "therapy-balls",
    "title": "Therapy & Exercise Balls",
    "description": "Peanut balls, gym balls, and medicine balls for core strengthening, balance training, and therapeutic exercise.",
    "color": "from-sky-500 to-blue-600",
    "image": "https://www.ableys.in/cdn/shop/collections/1257x329_f6e6a68c-5af5-458c-8c7a-46b10e9a65b3.jpg?v=1766789943&width=600",
    "products": [
      {
        "id": "peanut-ball-for-kids-fun-safe-therapy-and-exercise-ball-for-children",
        "shopifyHandle": "peanut-ball-for-kids-fun-safe-therapy-and-exercise-ball-for-children",
        "name": "Peanut Ball for Kids – Fun & Safe Therapy and Exercise Ball for Children",
        "categorySlug": "therapy-balls",
        "shortDescription": "Finding stable equipment for motor skill development and core strengthening can be difficult with traditional round exercise balls that easily roll away. The Peanut Ball for Kids provides a more stabl",
        "description": "Finding stable equipment for motor skill development and core strengthening can be difficult with traditional round exercise balls that easily roll away. The Peanut Ball for Kids provides a more stable, secure base to help children engage in active play while building physical confidence.\nKey Features for Sensory & Physical Support:\nUnique Lateral Stability: The peanut shape limits movement to forward and backward, offering more security than a standard sphere.\nCore Strength Promotion: Encourages active sitting and engagement of core muscles during play or study.\nDurable & Non-Toxic: Built from high-quality materials designed for frequent use in high-energy environments.\nVersatile Use Cases: Perfect for stretching, rhythmic bouncing, or as a sensory seat.\nTactile Input: Provides soothing proprioceptive and vestibular input through controlled movement.\nHow It Works: Unlike traditional round balls that can be unpredictable, the Peanut Ball's unique saddle-like center allows a child to sit securely while moving. This design supports balance and coordination by providing a predictable range of motion, making it an ideal tool for children who are still developing their gross motor skills or require additional sensory feedback during the day.",
        "specifications": {},
        "features": [
          "Peanut Ball for Kids – Fun & Safe Therapy and Exercise Ball for Children"
        ],
        "applications": [],
        "basePrice": 1499,
        "comparePrice": 1678,
        "images": [
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard1_dc914207-e215-477d-8898-663d14b1d459.jpg?v=1763974508",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard2_22423caf-ed1b-49cb-84bb-0875652eb904.jpg?v=1763974508",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard3_792564f7-c5b3-4b71-822e-20e1e26bcc69.jpg?v=1763974508",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard4_fbc2aa31-7f8b-4f0f-9641-4005772fe0e7.jpg?v=1763974508",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard5_9e1fbc36-3c66-41bf-9041-bc6119a60bb0.jpg?v=1763974508",
          "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/Artboard6_97b31a0a-b8e6-49e3-88f0-2dd79bd7f01e.jpg?v=1763974508"
        ],
        "shopifyUrl": "https://www.ableys.in/products/peanut-ball-for-kids-fun-safe-therapy-and-exercise-ball-for-children"
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
