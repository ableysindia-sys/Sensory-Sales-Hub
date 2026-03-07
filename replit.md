# Abley's Rehab - B2B Ecommerce Catalogue Website

## Overview
Premium Apple-style B2B ecommerce catalogue website for Abley's Rehab, a professional therapy equipment company. Features product catalogue with 9 categories, product detail pages, enquiry cart system, and bulk enquiry form.

## Architecture
- **Frontend**: React + Tailwind CSS + shadcn/ui + Framer Motion + wouter (routing)
- **Backend**: Express.js API
- **Database**: PostgreSQL via Drizzle ORM
- **State**: React Context (enquiry cart) with localStorage persistence

## Brand
- Primary color: #4A53A0
- Fonts: Plus Jakarta Sans (headings), Inter (body)
- Tone: Professional, institutional, premium, Apple-style
- Logo: `attached_assets/ableys_rehab_logo.png` (transparent background)

## Pages & Routes
- `/` - Home (hero, trust strip, category grid, manufacturing, features, client logos, bulk form, roadmap, footer)
- `/category/:slug` - Category page with product grid
- `/product/:slug` - Product detail page with specs, features, applications
- `/enquiry` - Enquiry cart page with form submission

## Key Files
- `shared/schema.ts` - Database models (products, leads)
- `shared/routes.ts` - API contract with Zod validation
- `server/routes.ts` - Express API routes
- `server/storage.ts` - Database storage layer
- `client/src/lib/catalogue-data.ts` - Full product catalogue data (9 categories, 40+ products)
- `client/src/lib/enquiry-cart.tsx` - Enquiry cart context with localStorage persistence
- `client/src/pages/` - Home, Category, Product, EnquiryCart pages
- `client/src/components/` - All UI sections

## Components
- `navbar.tsx` - Fixed top nav with Products dropdown, cart badge, mobile menu
- `hero.tsx` - Full-width hero with Browse Products / Bulk Enquiry CTAs
- `trust-strip.tsx` - Trust badges (Made in India, Warranty, etc.)
- `category-grid.tsx` - 9 category cards linking to category pages
- `product-card.tsx` - Reusable product card with View Details + Add to Enquiry
- `manufacturing-section.tsx` - Quality/engineering highlights
- `features-section.tsx` - 8 feature benefit cards
- `client-logos.tsx` - Client trust section with placeholder logos
- `bulk-enquiry-form.tsx` - B2B lead generation form (on home page)
- `roadmap-section.tsx` - Future verticals (OT, Sensory, Physio, Speech)
- `site-footer.tsx` - Multi-column footer with category links
- `theme-provider.tsx` - Dark/light mode support

## Product Categories (9)
Swings (7), Ballpool (2), Mats (5), Movement & Balance (8), Climbing (3), ADL Kit (3), Therapy Balls (4), Deep Pressure (4), Visual (6)

## Database Schema
- `products`: id, name, description, price (text), imageUrl
- `leads`: id, name, email, interest, organisation, phone, city, category, requirementType, message, cartItems

## API Endpoints
- `POST /api/leads` - Submit B2B enquiry (with or without cart items)

## Enquiry Cart System
- Client-side state via React Context
- Persisted in localStorage
- Items: productId, productName, category, quantity, notes
- Cart page shows items with quantity controls, notes, and enquiry form
- On submit: cart data serialized to JSON in cartItems field

## Deployment
- Target domain: rehab.ableys.in (CNAME to Replit .replit.app URL)
- Autoscale deployment configured
