# Abley's Rehab - B2B/B2C Hybrid E-Commerce Platform

## Overview
Premium B2B/B2C hybrid e-commerce platform for Abley's Rehab, a professional therapy equipment company. UI closely replicates the visual design of ableys.in (Shopify Dawn theme). Features product catalogue with 9 categories (42 professional B2B products), product configurator with dynamic pricing, Zustand shopping cart, mock Razorpay checkout, 3D sensory room builder, Gemini AI chat assistant, and B2B enquiry system.

## Architecture
- **Frontend**: React + Tailwind CSS + shadcn/ui + Framer Motion + wouter (routing)
- **Backend**: Express.js API
- **AI**: Gemini 2.0 Flash via @google/generative-ai (GEMINI_API_KEY env var)
- **Database**: PostgreSQL via Drizzle ORM
- **State**: 
  - B2C Shopping Cart: Zustand with `persist` middleware (localStorage key: `ableys-shopping-cart`)
  - B2B Enquiry Cart: React Context with localStorage (key: `ableys-enquiry-cart`)
- **3D**: react-three-fiber + @react-three/drei (sensory room builder)

## Brand
- Primary color: #4A53A0
- Fonts: Plus Jakarta Sans (headings), Inter (body)
- Tone: Professional, clean, Shopify-style e-commerce
- Logo: `attached_assets/ableys_rehab_logo.png` (transparent background)
- Social: Facebook, Instagram, YouTube (react-icons/si)

## Pages & Routes
- `/` - Home (announcement bar, hero slideshow, top collections grid, new arrivals carousel, best-sellers carousel, get started banner, testimonials, trust badges, commitment section, blog preview, sensory room CTA, bulk enquiry form, footer)
- `/products` - All products with search, filter, sort
- `/category/:slug` - Category page with banner, sort dropdown, product grid
- `/product/:slug` - Product detail page with configurator, dynamic pricing, B2C/B2B actions
- `/enquiry` - B2B enquiry cart page with form submission
- `/order-confirmation` - Order confirmation after successful checkout
- `/sensory-room-builder` - 3D interactive room builder with product placement

## Key Files
- `shared/schema.ts` - Database models (products, leads)
- `shared/routes.ts` - API contract with Zod validation
- `server/routes.ts` - Express API routes
- `server/storage.ts` - Database storage layer
- `client/src/lib/catalogue-data.ts` - Full product catalogue (42 products, 9 categories) with basePrice, comparePrice, configOptions, images, formatPrice(), calculateProductPrice(), getDiscountPercent(), getNewArrivals(), getBestSellers()
- `client/src/lib/shopping-cart.ts` - Zustand B2C cart store (cartKey-based identity, GST 18%, localStorage persist)
- `client/src/lib/enquiry-cart.tsx` - B2B enquiry cart context with localStorage persistence
- `client/src/pages/` - Home, AllProducts, Category, Product, EnquiryCart, OrderConfirmation, SensoryRoomBuilder
- `client/src/components/` - All UI sections

## Components (Active)
- `navbar.tsx` - Fixed header with AnnouncementBar ("Free Shipping All Over India" + social icons) + clean Shopify-style navbar (Products dropdown, cart, enquiry, mobile menu)
- `hero.tsx` - Full-width auto-advancing hero slideshow (3 slides: Professional Equipment, Sensory Room Essentials, Swings & Movement) with prev/next arrows, dot navigation
- `category-grid.tsx` - "Our Top Rated Collections" — 5 featured collection cards with images, product counts, masonry-like grid layout
- `product-carousel.tsx` - Horizontal scrolling product carousel with scroll buttons (used for "Just In" and "Our Best-Sellers")
- `product-card.tsx` - Shopify-style product card: sale badge ("Save X%"), strikethrough compare price, star ratings (seeded), "Abley's" vendor label, inline color swatches, Add to Cart button
- `testimonials.tsx` - "Loved by Parents & Therapists" — 3 testimonial cards with star ratings
- `trust-badges.tsx` - 3-column trust badges (Free Shipping, Certified Safe, Expert Support)
- `commitment-section.tsx` - "Our Commitment to Your Family" — about section with workshop image
- `blog-preview.tsx` - "Therapist-Approved Resources" — 3 blog cards with images
- `cart-drawer.tsx` - Slide-out shopping cart drawer with items, quantity controls, GST calculation, checkout button
- `razorpay-modal.tsx` - Mock Razorpay payment modal (UPI/Card/Netbanking tabs, simulated 2s processing)
- `bulk-enquiry-form.tsx` - B2B lead generation form
- `site-footer.tsx` - Multi-column footer: brand+social icons, shop categories, help & info links, our commitment + contact info
- `chat-widget.tsx` - Gemini AI chat assistant (floating FAB)
- `theme-provider.tsx` - Dark/light mode support

## Product Images
- Products with real Shopify CDN images: bolster-swing, t-swing, disc-swing, tube-swing, balance-board, stepping-stones, trampoline, gym-ball, peanut-ball, medicine-ball, weighted-vest, weighted-blanket, sensory-sock, lap-pad, liquid-motion-tiles, fibre-light, bubble-tube
- Products with AI-generated images (via `client/src/lib/product-images.ts`): platform-swing, lycra-swing, acrobat-swing, ballpool-4x4, ballpool-6x4, crash-mat, therapy-mat, floormat, interlocking-mat, foldable-mat, kidlite-barrel, balance-beam, wedges, jumping-stool, ramp-and-stairs, climb-board, wall-bar-ladder, spider-climb-net, adl-kit (3 variants), bosu-ball, hexwall-touch-light, glitter-pad, glitter-capillary

## Product Categories (9) — 42 professional B2B therapy products
Swings (7), Ballpool (2), Mats (5), Movement & Balance (8), Climbing (3), ADL Kit (3), Therapy Balls (4), Deep Pressure (4), Visual (6)

## E-Commerce Features
- **Curated B2B Catalogue**: 42 professional therapy products across 9 categories with detailed descriptions, specifications, professional pricing, and real product images from ableys.in Shopify CDN
- **Sale Badges**: Products with comparePrice show "Save X%" badges and strikethrough pricing
- **Star Ratings**: Seeded deterministic 4-5 star ratings with review counts per product
- **All Products Page**: `/products` with search bar, category filter buttons, sort (price/name), product grid
- **Category Pages**: Full-width banner with title overlay, sort dropdown (Best selling, A-Z, Z-A, Price low/high), product count, product grid
- **Product Configurator**: Color swatches, material variants, size options, add-on checkboxes with dynamic price calculation
- **Shopping Cart**: Zustand store with cartKey-based item identity, quantity controls, GST (18%) calculation
- **Cart Drawer**: Slide-out sheet from right, line items with config details, subtotal/GST/total
- **Mock Checkout**: Razorpay-branded modal with payment tabs, simulated processing, success animation
- **Order Confirmation**: Animated checkmark, order ID, delivery estimate
- **3D Room Builder**: react-three-fiber therapy room with padded walls, ceiling, suspension bar, window, door, LED strip lighting. 21 products across 7 categories. 5 pre-built templates (Calming Retreat, Active Therapy, Sensory Explorer, OT Clinic, Dark Sensory Room). Room customization: LED mood lighting, wall padding, floor type, light/dark room mode. Zoom +/- buttons
- **AI Chat Assistant**: Floating chat widget powered by Gemini 2.0 Flash; context-aware; rate-limited (15 req/min)

## Database Schema
- `products`: id, name, description, price (text), imageUrl
- `leads`: id, name, email, interest, organisation, phone, city, category, requirementType, message, cartItems

## API Endpoints
- `POST /api/leads` - Submit B2B enquiry (with or without cart items)
- `POST /api/chat` - Gemini AI chat assistant (rate-limited, 15 req/min per IP)

## Deployment
- Target domain: rehab.ableys.in (CNAME to Replit .replit.app URL)
- Autoscale deployment configured
