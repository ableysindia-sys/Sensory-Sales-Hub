# Abley's Rehab - B2B/B2C Hybrid E-Commerce Platform

## Overview
Premium Apple-style B2B/B2C hybrid e-commerce platform for Abley's Rehab, a professional therapy equipment company. Features product catalogue with 9 categories (40+ products), product configurator with dynamic pricing, Zustand shopping cart, mock Razorpay checkout, 3D sensory room builder, Gemini AI chat assistant, and B2B enquiry system.

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
- Tone: Professional, institutional, premium, Apple-style
- Logo: `attached_assets/ableys_rehab_logo.png` (transparent background)

## Pages & Routes
- `/` - Home (hero, trust strip, category grid, sensory room CTA, manufacturing, features, client logos, bulk form, roadmap, footer)
- `/category/:slug` - Category page with product grid
- `/product/:slug` - Product detail page with configurator, dynamic pricing, B2C/B2B actions
- `/enquiry` - B2B enquiry cart page with form submission
- `/order-confirmation` - Order confirmation after successful checkout
- `/sensory-room-builder` - 3D interactive room builder with product placement

## Key Files
- `shared/schema.ts` - Database models (products, leads)
- `shared/routes.ts` - API contract with Zod validation
- `server/routes.ts` - Express API routes
- `server/storage.ts` - Database storage layer
- `client/src/lib/catalogue-data.ts` - Full product catalogue with basePrice, configOptions (colors, materials, sizes, addons), images (Shopify CDN URLs for ~20 matching products), formatPrice(), calculateProductPrice()
- `client/src/lib/shopping-cart.ts` - Zustand B2C cart store (cartKey-based identity, GST 18%, localStorage persist)
- `client/src/lib/enquiry-cart.tsx` - B2B enquiry cart context with localStorage persistence
- `client/src/pages/` - Home, Category, Product, EnquiryCart, OrderConfirmation, SensoryRoomBuilder
- `client/src/components/` - All UI sections

## Components
- `navbar.tsx` - Fixed top nav with Products dropdown, shopping cart icon (B2C), enquiry button (B2B), Room Builder link, mobile menu
- `cart-drawer.tsx` - Slide-out shopping cart drawer with items, quantity controls, GST calculation, checkout button
- `razorpay-modal.tsx` - Mock Razorpay payment modal (UPI/Card/Netbanking tabs, simulated 2s processing)
- `product-card.tsx` - Product card with price, Add to Cart (B2C), Add to Enquiry (B2B)
- `hero.tsx` - Full-width hero with real product photography + Browse Products / Bulk Enquiry CTAs
- `trust-strip.tsx` - Trust badges (Made in India, Warranty, etc.)
- `category-grid.tsx` - 9 category cards with real collection images linking to category pages
- `manufacturing-section.tsx` - Quality/engineering highlights
- `features-section.tsx` - 8 feature benefit cards
- `client-logos.tsx` - Product showcase gallery with real images + shop banner
- `bulk-enquiry-form.tsx` - B2B lead generation form (on home page)
- `roadmap-section.tsx` - Future verticals (OT, Sensory, Physio, Speech)
- `site-footer.tsx` - Multi-column footer with category links
- `theme-provider.tsx` - Dark/light mode support

## Product Categories (11) — 119 products from ableys.in Shopify
Swings & Vestibular (4), Mats & Flooring (6), Deep Pressure & Weighted (13), Fidgets & Focus Tools (33), Oral Motor & Chew Tools (14), Balance & Movement (13), Visual & Calming (7), Communication & Learning (5), Daily Living & ADL (21), Tactile & Sensory Brushes (2), Therapy & Exercise Balls (1)

## E-Commerce Features
- **Real Shopify Data**: All 119 products fetched from ableys.in Shopify API with real titles, descriptions, prices, images, and variant data. Generated via `scripts/generate-catalogue.mjs`
- **All Products Page**: `/products` with search bar, category filter buttons, sort (price/name), product grid
- **Real Website Images**: ableys.in images used throughout — hero banner, category grid cards, manufacturing workshop visual, sensory room CTA, product showcase gallery, shop banner. All products have Shopify CDN image galleries
- **Product Configurator**: Color swatches, material variants, size options, add-on checkboxes with dynamic price calculation
- **Shopping Cart**: Zustand store with cartKey-based item identity (supports multiple configs of same product), quantity controls, GST (18%) calculation
- **Cart Drawer**: Slide-out sheet from right, line items with config details, subtotal/GST/total
- **Mock Checkout**: Razorpay-branded modal with payment tabs, simulated processing, success animation
- **Order Confirmation**: Animated checkmark, order ID, delivery estimate
- **3D Room Builder**: react-three-fiber therapy room with padded walls, ceiling, suspension bar, window, door, LED strip lighting. 21 products across 7 categories with realistic 3D representations (swings hang from ceiling with ropes, mats lay flat, balls are spheres, bubble tube animates, fiber optic curtain cycles colors, interactive projector glows on floor, climbing wall with colored holds). 4 pre-built templates (Calming Retreat, Active Therapy, Sensory Explorer, OT Clinic). Room customization panel: LED mood lighting (8 colors + intensity), wall padding (6 colors), floor type (wood/foam/rubber). Zoom +/- buttons (scroll not hijacked). Placed items list with thumbnails; buy/quote actions
- **AI Chat Assistant**: Floating chat widget (bottom-right FAB) powered by Gemini 2.0 Flash; context-aware about Abley's products and therapy equipment; IP-based rate limiting (15 req/min); suggestion chips for common questions; conversation history maintained per session

## Database Schema
- `products`: id, name, description, price (text), imageUrl
- `leads`: id, name, email, interest, organisation, phone, city, category, requirementType, message, cartItems

## API Endpoints
- `POST /api/leads` - Submit B2B enquiry (with or without cart items)
- `POST /api/chat` - Gemini AI chat assistant (rate-limited, 15 req/min per IP)

## Deployment
- Target domain: rehab.ableys.in (CNAME to Replit .replit.app URL)
- Autoscale deployment configured
