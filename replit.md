# Abley's Rehab - B2B/B2C Hybrid E-Commerce Platform

## Overview
Premium Apple-style B2B/B2C hybrid e-commerce platform for Abley's Rehab, a professional therapy equipment company. Features product catalogue with 9 categories (40+ products), product configurator with dynamic pricing, Zustand shopping cart, mock Razorpay checkout, 3D sensory room builder, and B2B enquiry system.

## Architecture
- **Frontend**: React + Tailwind CSS + shadcn/ui + Framer Motion + wouter (routing)
- **Backend**: Express.js API
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
- `hero.tsx` - Full-width hero with Browse Products / Bulk Enquiry CTAs
- `trust-strip.tsx` - Trust badges (Made in India, Warranty, etc.)
- `category-grid.tsx` - 9 category cards linking to category pages
- `manufacturing-section.tsx` - Quality/engineering highlights
- `features-section.tsx` - 8 feature benefit cards
- `client-logos.tsx` - Client trust section with placeholder logos
- `bulk-enquiry-form.tsx` - B2B lead generation form (on home page)
- `roadmap-section.tsx` - Future verticals (OT, Sensory, Physio, Speech)
- `site-footer.tsx` - Multi-column footer with category links
- `theme-provider.tsx` - Dark/light mode support

## Product Categories (9)
Swings (7), Ballpool (2), Mats (5), Movement & Balance (8), Climbing (3), ADL Kit (3), Therapy Balls (4), Deep Pressure (4), Visual (6)

## E-Commerce Features
- **Real Product Images**: ~20 products pull real images from ableys.in Shopify store (CDN URLs), with image gallery and thumbnails on product pages; remaining products show styled placeholder icons
- **Product Configurator**: Color swatches, material variants, size options, add-on checkboxes with dynamic price calculation
- **Shopping Cart**: Zustand store with cartKey-based item identity (supports multiple configs of same product), quantity controls, GST (18%) calculation
- **Cart Drawer**: Slide-out sheet from right, line items with config details, subtotal/GST/total
- **Mock Checkout**: Razorpay-branded modal with payment tabs, simulated processing, success animation
- **Order Confirmation**: Animated checkmark, order ID, delivery estimate
- **3D Room Builder**: react-three-fiber scene with room walls/floor, product catalogue sidebar, click-to-place geometric representations, orbit controls, pricing summary

## Database Schema
- `products`: id, name, description, price (text), imageUrl
- `leads`: id, name, email, interest, organisation, phone, city, category, requirementType, message, cartItems

## API Endpoints
- `POST /api/leads` - Submit B2B enquiry (with or without cart items)

## Deployment
- Target domain: rehab.ableys.in (CNAME to Replit .replit.app URL)
- Autoscale deployment configured
