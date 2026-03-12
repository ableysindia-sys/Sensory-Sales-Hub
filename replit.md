# Abley's Rehab - B2B/B2C Hybrid E-Commerce Platform

## Overview
Premium B2B/B2C hybrid e-commerce platform for Abley's Rehab, a professional therapy equipment company. UI closely replicates the visual design of ableys.in (Shopify Dawn theme). Features product catalogue with 9 categories (42 professional B2B products), product configurator with dynamic pricing, Zustand shopping cart, Shopify checkout, 3D sensory room builder, Gemini AI chat assistant, B2B enquiry system, and full admin panel with product CRUD, inventory, leads, and pages management.

## Architecture
- **Frontend**: React + Tailwind CSS + shadcn/ui + Framer Motion + wouter (routing)
- **Backend**: Express.js API
- **AI**: Gemini 2.0 Flash via @google/generative-ai (GEMINI_API_KEY env var)
- **Database**: PostgreSQL via Drizzle ORM
- **State**: 
  - B2C Shopping Cart: Zustand with `persist` middleware (localStorage key: `ableys-shopping-cart`)
  - B2B Enquiry Cart: React Context with localStorage (key: `ableys-enquiry-cart`)
  - Product Data: React Context (ProductsProvider) fetching from API with fallback to catalogue-data.ts
- **Checkout**: Shopify Storefront API (Cart API) — no Razorpay
- **3D**: react-three-fiber + @react-three/drei (sensory room builder)

## Brand
- Primary color: #4A53A0
- Fonts: Poppins (headings), Montserrat (body) — matches ableys.in Shopify theme
- Page width: 1440px (max-w-page utility in Tailwind, matches ableys.in Shopify Dawn theme)
- Tone: Professional, clean, Shopify-style e-commerce
- Logo: `attached_assets/ableys_rehab_logo.png` (transparent background)
- Social: Facebook, Instagram, YouTube (react-icons/si)

## Pages & Routes
- `/` - Home (rotating announcement bar, hero with single primary CTA, "Who are you shopping for?" audience chooser, category grid, featured swings banner, product showcase with "Best Sellers"/"New In" tabs, testimonials, bulk enquiry wizard, footer)
- `/products` - All products with sidebar filters (Product Type accordion, Price accordion, active filter chips), search, sort, grid density toggle, "Why Choose Us" features section at bottom
- `/category/:slug` - Category page with sidebar category navigation, banner, sort dropdown, grid toggle, product grid
- `/product/:slug` - Product detail page with configurator, dynamic pricing, B2C/B2B actions
- `/enquiry` - Multi-step bulk order wizard (5 steps: Setup Type → Order Type → Category Selection → Budget & Timeline → Contact Form + Summary → Success page)
- `/contact` - Contact Us page (form, business hours, WhatsApp/phone quick connect, social links, Google Maps embed, bulk order CTA)
- `/admin` - Admin panel (password-protected) with Dashboard, Leads, Products, and Pages tabs
- `/sensory-room-builder` - 3D interactive room builder with product placement
- `/page/:slug` - Dynamic pages (CMS-managed content pages)

## UX Components (v2 Overhaul)
- **Mobile Bottom Nav**: `client/src/components/mobile-bottom-nav.tsx` — Fixed bottom nav for mobile (Home, Products, Get a Quote [primary], WhatsApp). Only shows on screens <lg.
- **Rotating Announcement Bar**: Part of `navbar.tsx` — rotates through 4 messages every 4s (no social icons)
- **Audience Chooser**: Inline component in `home.tsx` — 3 cards (Family, OT Clinic, School/NGO) after hero
- **Product Cards**: Simplified to 1 primary CTA (Add to Cart) + 1 secondary (Get B2B Quote as text link)
- **Enquiry Wizard**: Step labels in stepper, localStorage pre-fills contact details, WhatsApp quick-contact bypass at step 0
- **FAB Positioning**: WhatsApp FAB at `bottom-20 right-5` (above mobile nav), Chat widget at `bottom-[5.5rem] right-5` (above WA FAB)

## Key Files
- `shared/schema.ts` - Database models (products, categories, leads, pages)
- `shared/routes.ts` - API contract with Zod validation
- `server/routes.ts` - Express API routes (public + admin CRUD)
- `server/storage.ts` - Database storage layer (CRUD for products, categories, leads, pages)
- `server/seed.ts` - Seeds database from catalogue-data.ts on first run
- `client/src/lib/catalogue-data.ts` - Static product catalogue data (42 products, 9 categories) - types and SITE_IMAGES still imported from here
- `client/src/lib/product-provider.tsx` - React context providing products/categories from API with hooks: useProducts(), formatPrice(), calculateProductPrice(), getDiscountPercent()
- `client/src/lib/product-images.ts` - AI-generated product image imports (Vite asset imports)
- `client/src/lib/shopping-cart.ts` - Zustand B2C cart store (cartKey-based identity, GST 18%, localStorage persist)
- `client/src/lib/enquiry-cart.tsx` - B2B enquiry cart context with localStorage persistence
- `client/src/pages/admin.tsx` - Full admin panel (Dashboard, Leads, Products CRUD, Pages CMS)
- `client/src/pages/dynamic-page.tsx` - Dynamic page renderer for CMS pages

## Database Schema
- `categories`: id (serial), slug (unique), title, description, color, image, displayOrder, isActive
- `products`: id (serial), slug (unique), name, categorySlug, shortDescription, longDescription, basePrice (int), comparePrice (int nullable), stock (int nullable = unlimited), images (JSON text), specifications (JSON text), features (JSON text), applications (JSON text), configOptions (JSON text), shopifyHandle, shopifyUrl, isActive, createdAt
- `leads`: id (serial), name, email, interest, organisation, phone, city, category, requirementType, message, cartItems, status (new/contacted/converted/closed), createdAt
- `pages`: id (serial), slug (unique), title, content, isPublished, createdAt, updatedAt

## API Endpoints
### Public
- `GET /api/products` - List all active products
- `GET /api/products/:slug` - Get single product
- `GET /api/categories` - List all active categories
- `GET /api/pages/:slug` - Get published page by slug
- `POST /api/leads` - Submit B2B enquiry
- `POST /api/chat` - Gemini AI chat (rate-limited, 15 req/min per IP)
- `POST /api/shopify/checkout` - Create Shopify checkout URL (handle, quantity) → redirects to Shopify checkout

### Shopify Integration
- Store domain: `2feec0-4.myshopify.com` (env: SHOPIFY_STORE_DOMAIN)
- Storefront API token: env secret SHOPIFY_STOREFRONT_TOKEN
- API version: 2024-10
- **Auto-sync**: `server/shopify-sync.ts` syncs all Shopify products to DB on startup and every 30 minutes
  - `syncShopifyProducts()` fetches all products via Storefront API (paginated), upserts to DB with collection→category mapping
  - `startPeriodicSync()` called in `routes.ts` at server startup
  - Admin manual trigger: `POST /api/admin/shopify-sync`
- Products have `shopifyHandle`, `shopifyUrl`, `shopifyVariants` (JSON), `productType`, `vendor`, `sku` fields in DB (set by sync)
- `shopifyVariants` stores all variant data: id, title, sku, price, compareAtPrice, options, image (null for single-variant products)
- Client uses `product.shopifyHandle` from DB data (no more hardcoded slug→handle map)
- Server checkout allowlist is dynamic (queries DB for products with shopifyHandle)
- "Buy on Shopify" button on product pages and cart drawer for products with Shopify handle
- Checkout flow: server creates cart via Storefront API Cart API (cartCreate mutation) → returns checkoutUrl → frontend opens in new tab

### Admin (Bearer token auth)
- `POST /api/admin/login` - Admin login (returns bearer token)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/leads` - List all leads
- `GET /api/admin/leads/:id` - Get single lead
- `PATCH /api/admin/leads/:id` - Update lead status
- `DELETE /api/admin/leads/:id` - Delete lead
- `GET /api/admin/products` - List all products (including inactive)
- `POST /api/admin/products` - Create product
- `PATCH /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/categories` - List all categories
- `POST /api/admin/categories` - Create category
- `PATCH /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category
- `GET /api/admin/pages` - List all pages
- `POST /api/admin/pages` - Create page
- `PATCH /api/admin/pages/:id` - Update page
- `DELETE /api/admin/pages/:id` - Delete page

## Admin Panel Features
- Password-protected login (ADMIN_PASSWORD env secret)
- Bearer token auth stored in sessionStorage
- Dashboard: stat cards (Total Leads, New, Products, Low Stock), recent enquiries
- Leads: searchable table, status filter, detail view, inline status updates, delete
- Products: table with thumbnails, category, price, stock, active toggle, search, add/edit/delete with full form (images, specs, features, applications)
- Pages: CMS for custom content pages with title, slug, content (HTML/Markdown), published toggle

## Product Images
- Products with real Shopify CDN images: bolster-swing, t-swing, disc-swing, tube-swing, balance-board, stepping-stones, trampoline, gym-ball, peanut-ball, medicine-ball, weighted-vest, weighted-blanket, sensory-sock, lap-pad, liquid-motion-tiles, fibre-light, bubble-tube
- Products with AI-generated images stored as `__generated__:{slug}` markers in DB, resolved at render time via `product-images.ts`

## Mobile Responsiveness
- Global `overflow-x: hidden` on body to prevent horizontal scrollbar on all pages
- Product page: breadcrumb wraps/truncates on mobile, thumbnail strip scrolls horizontally
- Sensory room builder: sidebar stacks above canvas on mobile with max-h-[240px], canvas min-h-[300px]
- Hero arrows repositioned for mobile, category grid tags enlarged
- Chat widget goes full-screen on mobile (100dvh)
- All interactive elements have min 44px touch targets

## Deployment
- Target domain: rehab.ableys.in (CNAME to Replit .replit.app URL)
- Autoscale deployment configured
