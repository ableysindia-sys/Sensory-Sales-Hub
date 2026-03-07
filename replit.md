# Abley's Rehab - Professional Therapy Equipment B2B Landing Page

## Overview
Premium Apple-style B2B landing page for Abley's Rehab, a professional therapy equipment company. Built with React + Express + PostgreSQL.

## Architecture
- **Frontend**: React + Tailwind CSS + shadcn/ui + Framer Motion
- **Backend**: Express.js API
- **Database**: PostgreSQL via Drizzle ORM
- **Routing**: wouter (frontend), Express (backend)

## Brand
- Primary color: #4A53A0
- Font: Plus Jakarta Sans (headings), Inter (body)
- Tone: Professional, institutional, premium, Apple-style
- Logo: `attached_assets/ableys_rehab_logo.png` (transparent background)

## Key Files
- `shared/schema.ts` - Database models (products, leads)
- `shared/routes.ts` - API contract with Zod validation
- `server/routes.ts` - Express API routes
- `server/storage.ts` - Database storage layer
- `client/src/pages/home.tsx` - Main landing page
- `client/src/components/` - All UI sections

## Components
- `navbar.tsx` - Fixed top navigation with mobile menu
- `hero.tsx` - Full-width hero with animated product cards
- `trust-strip.tsx` - Trust badges (Made in India, Warranty, etc.)
- `category-grid.tsx` - 9 product category cards with product labels
- `manufacturing-section.tsx` - Quality/engineering highlights
- `features-section.tsx` - 8 feature benefit cards
- `client-logos.tsx` - Client trust section with placeholder logos
- `bulk-enquiry-form.tsx` - B2B lead generation form
- `roadmap-section.tsx` - Future verticals (OT, Sensory, Physio, Speech)
- `site-footer.tsx` - Multi-column footer
- `theme-provider.tsx` - Dark/light mode support

## Database Schema
- `products`: id, name, description, price (text), imageUrl
- `leads`: id, name, email, interest, organisation, phone, city, category, requirementType, message

## API Endpoints
- `POST /api/leads` - Submit B2B enquiry form

## Product Categories
Swings, Ballpool, Mats, Movement & Balance, Climbing, ADL Kit, Therapy Balls, Deep Pressure, Visual

## Deployment
- Target domain: rehab.ableys.in (CNAME to Replit .replit.app URL)
- Autoscale deployment configured
