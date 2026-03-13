import PDFDocument from "pdfkit";
import type { Response } from "express";

const BRAND = "#4A53A0";
const BRAND_DARK = "#2D3570";
const ACCENT = "#F59E0B";
const DARK = "#0F172A";
const MUTED = "#64748B";
const LIGHT_BG = "#F8FAFC";
const WHITE = "#FFFFFF";

const CATEGORIES = [
  {
    title: "Therapy Swings",
    desc: "Vestibular input swings for sensory integration. Bolster, T-swing, disc, platform, lycra pod and more. Built for clinics, sensory rooms & schools.",
    count: "15+ products",
    priceRange: "₹7,499 – ₹24,999",
    highlight: "Free ceiling-mount hardware included",
  },
  {
    title: "Ball Pools",
    desc: "Colour therapy and proprioceptive input ball pools. Available in square, round and hexagonal frames with ball sets. Commercial and home variants.",
    count: "8+ products",
    priceRange: "₹8,999 – ₹32,999",
    highlight: "Custom ball counts on bulk orders",
  },
  {
    title: "Therapy Mats",
    desc: "High-density foam crash mats, roll mats, wedge mats and incline bolsters. Non-slip base, vinyl covers, easy-wipe surfaces.",
    count: "10+ products",
    priceRange: "₹3,499 – ₹18,999",
    highlight: "Available in custom sizes for institutions",
  },
  {
    title: "Movement & Balance",
    desc: "Balance boards, rocker boards, stepping stones, wobble cushions and trampolines for gross-motor and postural training.",
    count: "12+ products",
    priceRange: "₹1,999 – ₹14,999",
    highlight: "Stackable — easy storage for schools",
  },
  {
    title: "Climbing Equipment",
    desc: "Indoor climbing walls, ladder sets, monkey bars and obstacle kits that build strength, coordination and confidence.",
    count: "8+ products",
    priceRange: "₹6,999 – ₹42,999",
    highlight: "Freestanding & wall-mounted options",
  },
  {
    title: "ADL & Life-Skills Kits",
    desc: "Activities of Daily Living boards, dressing frames, fastening sets, threading kits and sensory bins for functional therapy.",
    count: "10+ products",
    priceRange: "₹999 – ₹6,999",
    highlight: "OT-designed for clinical protocols",
  },
  {
    title: "Therapy Balls",
    desc: "Peanut balls, gym balls, massage balls and spiky sensory balls in therapeutic sizes for core work and tactile input.",
    count: "8+ products",
    priceRange: "₹499 – ₹3,999",
    highlight: "Anti-burst rated for clinical use",
  },
  {
    title: "Deep Pressure & Weighted",
    desc: "Weighted blankets, lap pads, compression vests, weighted stuffed animals and deep-pressure wraps for anxiety and sensory regulation.",
    count: "12+ products",
    priceRange: "₹1,999 – ₹9,999",
    highlight: "Custom weight on institutional orders",
  },
  {
    title: "Visual & Sensory Tools",
    desc: "Bubble tubes, fibre optic lights, projector sets, colour wheels and visual wall panels for multi-sensory environments.",
    count: "10+ products",
    priceRange: "₹2,499 – ₹28,999",
    highlight: "Full sensory room packages available",
  },
];

const FEATURED_PRODUCTS = [
  { name: "Platform Swing (120×60 cm)", category: "Swings", price: "₹18,999", desc: "Four-point suspension, padded edges, prone/supine/seated use. Max load 100 kg." },
  { name: "Bolster Swing", category: "Swings", price: "₹12,999", desc: "90 cm padded bolster, adjustable rope, vestibular & proprioceptive input." },
  { name: "Lycra Pod Swing", category: "Swings", price: "₹10,999", desc: "Cocoon-style deep-pressure swing, self-regulating for sensory seekers." },
  { name: "Ball Pool (Square, 150×150 cm)", category: "Ball Pools", price: "₹24,999", desc: "Commercial-grade PVC frame, 500 LDPE balls included, easy inflate." },
  { name: "Crash Mat (200×120 cm)", category: "Mats", price: "₹14,999", desc: "15 cm high-density foam, vinyl cover, non-slip base, indoor jumps & rolls." },
  { name: "Wedge Mat Set", category: "Mats", price: "₹8,999", desc: "Incline + flat wedge duo for prone positioning and core activation." },
  { name: "Balance Board Rocker", category: "Movement", price: "₹4,999", desc: "Solid wood rocker, non-slip surface, 80 kg rating, stacks flat." },
  { name: "Weighted Blanket (4 kg)", category: "Deep Pressure", price: "₹4,499", desc: "Glass-bead fill, removable cotton cover, adult & child sizes." },
  { name: "Compression Vest", category: "Deep Pressure", price: "₹3,299", desc: "Velcro adjustment, machine-washable, XS–XL sizing for sensory regulation." },
  { name: "Bubble Tube (120 cm)", category: "Visual", price: "₹14,999", desc: "LED colour-changing, remote control, calming effect for MSE rooms." },
  { name: "Peanut Ball (45 cm)", category: "Therapy Balls", price: "₹1,299", desc: "Anti-burst PVC, prone/supine positioning, core & balance work." },
  { name: "ADL Dressing Frame Set", category: "ADL Kit", price: "₹2,999", desc: "6-frame set: buttons, zips, laces, Velcro, snaps, hooks. OT-standard." },
];

const B2B_BENEFITS = [
  { title: "Bulk Pricing", desc: "Tiered discounts: 5% (5–9 units), 10% (10–24), 15% (25+). Custom quotes for full room setups." },
  { title: "GST Invoices", desc: "Valid GST invoices for all purchases. HSN codes included for all product categories." },
  { title: "Free Pan-India Shipping", desc: "No shipping charges on any order — metro cities and Tier-2/3 towns included." },
  { title: "24-hr Quote Turnaround", desc: "Submit your requirement and receive an itemised quote within one business day." },
  { title: "OT Consultation", desc: "Free 30-min video call with our OT specialist to plan your sensory room or therapy setup." },
  { title: "Manufacturer Warranty", desc: "All products carry manufacturer warranty. Defect claims handled within 7 business days." },
  { title: "Installation Support", desc: "Detailed mounting guides included. Whatsapp support during installation for swing setups." },
  { title: "Sample Kit Programme", desc: "Try 5 OT-curated items with a ₹1,499 refundable deposit before placing your bulk order." },
];

function headerBand(doc: PDFKit.PDFDocument, title: string, subtitle?: string) {
  doc.rect(0, 0, doc.page.width, 70).fill(BRAND);
  doc.fillColor(WHITE).fontSize(18).font("Helvetica-Bold")
     .text("ABLEY'S REHAB", 40, 18, { continued: true })
     .fillColor("#FFFFFF99").fontSize(11).font("Helvetica")
     .text("  ·  rehab.ableys.in");
  doc.fillColor(WHITE).fontSize(10).font("Helvetica")
     .text(title, 40, 42);
  if (subtitle) {
    doc.fillColor("#FFFFFF88").fontSize(8).text(subtitle, 40, 54);
  }
  doc.fillColor(DARK);
}

function footerBand(doc: PDFKit.PDFDocument) {
  const y = doc.page.height - 36;
  doc.rect(0, y, doc.page.width, 36).fill(BRAND_DARK);
  doc.fillColor(WHITE).fontSize(7.5).font("Helvetica")
     .text("Abley's Rehab  ·  rehab.ableys.in  ·  WhatsApp: +91 70421 80166  ·  email: hello@ableys.in  ·  Pune, Maharashtra, India", 40, y + 13, { width: doc.page.width - 80, align: "center" });
}

function pill(doc: PDFKit.PDFDocument, text: string, x: number, y: number, color: string = BRAND) {
  const w = doc.widthOfString(text) + 14;
  doc.roundedRect(x, y, w, 14, 4).fill(color);
  doc.fillColor(WHITE).fontSize(6.5).font("Helvetica-Bold")
     .text(text, x + 7, y + 3.5);
  doc.fillColor(DARK);
  return w;
}

export function generateCatalogPDF(res: Response) {
  const doc = new PDFDocument({ size: "A4", margin: 0, info: {
    Title: "Abley's Rehab — Professional Therapy Equipment Catalogue 2026",
    Author: "Abley's Rehab",
    Subject: "OT & Sensory Integration Equipment Catalogue",
    Keywords: "occupational therapy, sensory room, therapy equipment, OT, India",
  }});

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="Ableys-Rehab-Catalogue-2026.pdf"');
  doc.pipe(res);

  const W = doc.page.width;
  const H = doc.page.height;

  // ────────────────────────────────────────────────────────
  // PAGE 1 — COVER
  // ────────────────────────────────────────────────────────
  doc.rect(0, 0, W, H).fill(BRAND_DARK);
  doc.rect(0, 0, W, H * 0.62).fill(BRAND);
  // Diagonal accent stripe
  doc.save();
  doc.path(`M0,${H * 0.55} L${W},${H * 0.45} L${W},${H * 0.62} L0,${H * 0.62} Z`).fill(BRAND_DARK);
  doc.restore();
  // Accent bar
  doc.rect(0, H * 0.62, W, 4).fill(ACCENT);

  // Logo / Brand
  doc.fillColor(WHITE).fontSize(36).font("Helvetica-Bold")
     .text("ABLEY'S", 50, 80)
     .fillColor("#FFFFFFBB").fontSize(36).font("Helvetica")
     .text("REHAB", 50, 114);
  doc.rect(50, 158, 80, 3).fill(ACCENT);
  doc.fillColor("#FFFFFFAA").fontSize(11).font("Helvetica")
     .text("Professional Therapy & Sensory Integration Equipment", 50, 172);

  // Large title block
  doc.fillColor(WHITE).fontSize(28).font("Helvetica-Bold")
     .text("Product Catalogue", 50, 240)
     .fontSize(26).font("Helvetica")
     .text("2026 Edition", 50, 272);

  doc.fillColor("#FFFFFFCC").fontSize(10).font("Helvetica")
     .text("120+ OT-curated products  ·  9 product categories  ·  Bulk pricing available", 50, 312);

  // Stats bar
  const statsY = H * 0.62 + 30;
  const stats = [
    { val: "120+", label: "Products" },
    { val: "500+", label: "Therapists Trust Us" },
    { val: "₹0", label: "Shipping Nationwide" },
    { val: "24 hr", label: "Quote Turnaround" },
  ];
  const colW = (W - 80) / stats.length;
  stats.forEach((s, i) => {
    const x = 40 + i * colW;
    doc.fillColor(ACCENT).fontSize(22).font("Helvetica-Bold").text(s.val, x, statsY, { width: colW, align: "center" });
    doc.fillColor("#FFFFFFAA").fontSize(8).font("Helvetica").text(s.label, x, statsY + 26, { width: colW, align: "center" });
  });

  // Bottom info
  doc.fillColor("#FFFFFF99").fontSize(9).font("Helvetica")
     .text("rehab.ableys.in  ·  WhatsApp +91 70421 80166  ·  Pune, India", 40, H - 80, { width: W - 80, align: "center" })
     .fillColor("#FFFFFF55").fontSize(7.5)
     .text("All prices inclusive of GST. Subject to change without notice. Valid for institutional and retail orders.", 40, H - 60, { width: W - 80, align: "center" });

  // ────────────────────────────────────────────────────────
  // PAGE 2 — ABOUT ABLEY'S REHAB
  // ────────────────────────────────────────────────────────
  doc.addPage();
  headerBand(doc, "About Abley's Rehab", "Our mission, story & what sets us apart");

  let y = 90;
  const M = 40;
  const CW = W - M * 2;

  doc.fillColor(BRAND).fontSize(20).font("Helvetica-Bold")
     .text("India's Most Trusted Source for OT & Sensory Equipment", M, y, { width: CW });
  y += 52;

  doc.fillColor(DARK).fontSize(10).font("Helvetica").lineGap(3)
     .text(
       "Abley's Rehab is India's specialist provider of occupational therapy, sensory integration, and rehabilitation equipment. " +
       "Founded by a team of occupational therapists and education specialists, we exist to make clinical-grade therapy tools " +
       "accessible to every clinic, school, NGO, and family across India — without the import headache.",
       M, y, { width: CW }
     );
  y += 72;

  doc.fillColor(MUTED).fontSize(8).font("Helvetica-Bold").text("OUR PROMISE", M, y);
  y += 14;

  const promises = [
    { icon: "✓", heading: "OT-Curated Catalogue", body: "Every product in our range is selected and vetted by practicing occupational therapists. We assess each item for clinical suitability, safety, durability and age-appropriateness before it reaches our catalogue." },
    { icon: "✓", heading: "Zero Compromise on Quality", body: "We source from verified manufacturers and apply strict quality control. All products carry manufacturer warranty and meet applicable safety standards for professional therapeutic use." },
    { icon: "✓", heading: "Built for Institutions", body: "Bulk pricing, GST invoices, free pan-India shipping, and a dedicated B2B team mean your procurement process stays simple — even for large sensory room setups." },
    { icon: "✓", heading: "Clinical Support at Every Step", body: "From product selection to installation, our OT specialist team is reachable via WhatsApp. We offer complimentary 30-minute video consultations for institutional room setups." },
  ];

  promises.forEach((p) => {
    if (y > H - 120) return;
    doc.rect(M, y, CW, 54).fill(LIGHT_BG);
    doc.fillColor(BRAND).fontSize(14).font("Helvetica-Bold").text(p.icon, M + 14, y + 8);
    doc.fillColor(DARK).fontSize(9.5).font("Helvetica-Bold").text(p.heading, M + 36, y + 8);
    doc.fillColor(MUTED).fontSize(8.5).font("Helvetica").text(p.body, M + 36, y + 22, { width: CW - 56 });
    y += 62;
  });

  y += 8;
  doc.rect(M, y, CW, 1).fill("#E2E8F0");
  y += 14;

  doc.fillColor(MUTED).fontSize(8).font("Helvetica-Bold").text("INSTITUTION GUARANTEE STACK", M, y);
  y += 14;

  const guarantees = ["100% refundable deposit on Sample Kit", "Defect replacement within 7 business days", "Custom sizing on bulk mat & matterss orders", "Institutional GST invoices with HSN codes", "Free installation guidance via WhatsApp video call", "Priority dispatch for orders above ₹25,000"];
  const half = Math.ceil(guarantees.length / 2);
  guarantees.forEach((g, i) => {
    const col = i < half ? 0 : 1;
    const gx = M + col * (CW / 2);
    const gy = y + (i % half) * 16;
    doc.fillColor(BRAND).fontSize(8).font("Helvetica-Bold").text("·", gx, gy);
    doc.fillColor(DARK).fontSize(8).font("Helvetica").text(g, gx + 12, gy);
  });

  footerBand(doc);

  // ────────────────────────────────────────────────────────
  // PAGE 3 — ABOUT ABLEYS.IN (PARENT STORE)
  // ────────────────────────────────────────────────────────
  doc.addPage();
  headerBand(doc, "About Ableys.in — Our Parent Store", "India's pioneer in adaptive tools & inclusive living products");

  y = 90;

  doc.fillColor(BRAND).fontSize(18).font("Helvetica-Bold")
     .text("Ableys.in — Adaptive Living, Therapy & Inclusion", M, y, { width: CW });
  y += 46;

  doc.fillColor(DARK).fontSize(10).font("Helvetica").lineGap(3)
     .text(
       "Abley's Rehab is the specialist therapy division of Ableys.in — India's leading online store for adaptive " +
       "clothing, sensory toys, inclusive lifestyle products, and special-education tools. " +
       "Since launch, Ableys.in has served thousands of families, schools, and therapists across all 28 states of India.",
       M, y, { width: CW }
     );
  y += 62;

  const ableysCats = [
    { title: "Adaptive Clothing", body: "Specially designed garments with magnetic closures, side-snap fastening, and sensory-friendly fabrics for children and adults with motor differences." },
    { title: "Sensory Toys & Tools", body: "A curated range of sensory fidgets, chew tools, noise-dampening earmuffs, and tactile play kits for children with autism, ADHD and SPD." },
    { title: "Inclusive Education", body: "Communication boards, visual schedules, AAC supports, social story books and classroom sensory kits for special educators." },
    { title: "Therapy Aids", body: "Pencil grips, weighted utensils, non-slip mats, positioning wedges and hand-strengthening tools for home and clinic use." },
    { title: "Home Therapy Corners", body: "Curated starter kits for parents setting up a therapy-friendly space at home — from ₹5,000 setups to complete sensory rooms." },
  ];

  ableysCats.forEach((cat) => {
    if (y > H - 130) return;
    doc.rect(M, y, 6, 44).fill(BRAND);
    doc.fillColor(DARK).fontSize(9.5).font("Helvetica-Bold").text(cat.title, M + 18, y + 4);
    doc.fillColor(MUTED).fontSize(8.5).font("Helvetica").text(cat.body, M + 18, y + 18, { width: CW - 24 });
    y += 52;
  });

  y += 4;
  doc.rect(M, y, CW, 48).fill(BRAND);
  doc.fillColor(WHITE).fontSize(12).font("Helvetica-Bold")
     .text("Shop everything at  ableys.in", M + 20, y + 10);
  doc.fillColor("#FFFFFFCC").fontSize(9).font("Helvetica")
     .text("For OT & sensory room equipment specifically, visit  rehab.ableys.in  or contact our B2B team on WhatsApp.", M + 20, y + 26, { width: CW - 40 });

  footerBand(doc);

  // ────────────────────────────────────────────────────────
  // PAGE 4 — PRODUCT CATEGORIES
  // ────────────────────────────────────────────────────────
  doc.addPage();
  headerBand(doc, "Product Categories", "120+ products across 9 therapy equipment categories");

  y = 86;
  doc.fillColor(MUTED).fontSize(8).font("Helvetica-Bold")
     .text("COMPLETE PRODUCT RANGE — ALL CATEGORIES", M, y);
  y += 18;

  CATEGORIES.forEach((cat, i) => {
    if (y > H - 90) {
      footerBand(doc);
      doc.addPage();
      headerBand(doc, "Product Categories (continued)", "");
      y = 86;
    }
    const isEven = i % 2 === 0;
    doc.rect(M, y, CW, 68).fill(isEven ? LIGHT_BG : WHITE);
    doc.rect(M, y, 4, 68).fill(BRAND);

    // Number badge
    doc.fillColor(BRAND).fontSize(22).font("Helvetica-Bold")
       .text(String(i + 1).padStart(2, "0"), M + 14, y + 20, { width: 28, align: "center" });

    doc.fillColor(DARK).fontSize(10).font("Helvetica-Bold")
       .text(cat.title, M + 52, y + 8);
    doc.fillColor(MUTED).fontSize(8).font("Helvetica")
       .text(cat.desc, M + 52, y + 22, { width: CW - 180 });

    // Right-side pills
    const rx = W - M - 120;
    doc.fillColor(BRAND).fontSize(8).font("Helvetica-Bold").text(cat.count, rx, y + 10, { width: 110, align: "right" });
    doc.fillColor(DARK).fontSize(8).font("Helvetica").text(cat.priceRange, rx, y + 24, { width: 110, align: "right" });
    doc.fillColor(MUTED).fontSize(7).font("Helvetica").text("★ " + cat.highlight, rx, y + 38, { width: 110, align: "right" });

    y += 74;
  });

  footerBand(doc);

  // ────────────────────────────────────────────────────────
  // PAGE 5 — FEATURED PRODUCTS
  // ────────────────────────────────────────────────────────
  doc.addPage();
  headerBand(doc, "Featured Products", "A selection of our most popular therapy items");

  y = 86;
  doc.fillColor(MUTED).fontSize(8).font("Helvetica-Bold")
     .text("BESTSELLERS & OT STAFF PICKS", M, y);
  y += 18;

  FEATURED_PRODUCTS.forEach((p, i) => {
    if (y > H - 80) {
      footerBand(doc);
      doc.addPage();
      headerBand(doc, "Featured Products (continued)", "");
      y = 86;
    }

    doc.rect(M, y, CW, 50).fill(i % 2 === 0 ? LIGHT_BG : WHITE);

    pill(doc, p.category.toUpperCase(), M + 10, y + 8, BRAND);
    doc.fillColor(DARK).fontSize(10).font("Helvetica-Bold").text(p.name, M + 10, y + 24);
    doc.fillColor(MUTED).fontSize(8).font("Helvetica").text(p.desc, M + 10, y + 36, { width: CW - 130 });
    doc.fillColor(BRAND).fontSize(13).font("Helvetica-Bold")
       .text(p.price, W - M - 100, y + 18, { width: 90, align: "right" });
    doc.fillColor(MUTED).fontSize(7).font("Helvetica")
       .text("excl. shipping", W - M - 100, y + 34, { width: 90, align: "right" });

    y += 56;
  });

  footerBand(doc);

  // ────────────────────────────────────────────────────────
  // PAGE 6 — B2B PROGRAMME
  // ────────────────────────────────────────────────────────
  doc.addPage();
  headerBand(doc, "B2B Programme — For Institutions & Clinics", "Bulk pricing · GST invoices · Free shipping · OT consultation");

  y = 86;

  doc.fillColor(BRAND).fontSize(18).font("Helvetica-Bold")
     .text("Why Institutions Choose Abley's Rehab", M, y, { width: CW });
  y += 38;

  doc.fillColor(DARK).fontSize(10).font("Helvetica")
     .text(
       "More than 200 OT clinics, special schools, NGOs, and rehabilitation centres across India have standardised " +
       "on Abley's Rehab equipment. Our B2B programme is designed to make procurement simple, transparent and fast.",
       M, y, { width: CW }
     );
  y += 50;

  const cols = 2;
  const colWidth = (CW - 12) / cols;

  B2B_BENEFITS.forEach((b, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const bx = M + col * (colWidth + 12);
    const by = y + row * 72;

    if (by > H - 120) return;
    doc.rect(bx, by, colWidth, 64).fill(col === 0 ? LIGHT_BG : "#EEF2FF");
    doc.rect(bx, by, 4, 64).fill(BRAND);
    doc.fillColor(DARK).fontSize(9.5).font("Helvetica-Bold").text(b.title, bx + 14, by + 10);
    doc.fillColor(MUTED).fontSize(8).font("Helvetica").text(b.desc, bx + 14, by + 24, { width: colWidth - 22 });
  });

  y += Math.ceil(B2B_BENEFITS.length / cols) * 72 + 16;

  // Bulk discount table
  if (y < H - 150) {
    doc.rect(M, y, CW, 16).fill(BRAND);
    doc.fillColor(WHITE).fontSize(9).font("Helvetica-Bold").text("BULK DISCOUNT SCHEDULE", M + 10, y + 4);
    y += 16;

    const tiers = [
      { range: "1 – 4 units", disc: "Standard price", note: "Full catalogue, no minimum order" },
      { range: "5 – 9 units", disc: "5% off", note: "Auto-applied at checkout" },
      { range: "10 – 24 units", disc: "10% off", note: "Quote via WhatsApp or enquiry form" },
      { range: "25+ units / Room setup", disc: "15%+ off", note: "Custom quote within 24 hours" },
    ];

    tiers.forEach((t, i) => {
      const rowY = y + i * 24;
      doc.rect(M, rowY, CW, 24).fill(i % 2 === 0 ? LIGHT_BG : WHITE);
      doc.fillColor(DARK).fontSize(9).font("Helvetica-Bold").text(t.range, M + 12, rowY + 7, { width: 130 });
      doc.fillColor(BRAND).fontSize(9).font("Helvetica-Bold").text(t.disc, M + 150, rowY + 7, { width: 80 });
      doc.fillColor(MUTED).fontSize(8).font("Helvetica").text(t.note, M + 240, rowY + 8, { width: CW - 250 });
    });

    y += tiers.length * 24 + 12;
  }

  // Sample Kit callout
  if (y < H - 90) {
    doc.rect(M, y, CW, 56).fill(ACCENT);
    doc.fillColor(DARK).fontSize(12).font("Helvetica-Bold")
       .text("🎁  Try Before You Commit — OT Sample Kit Programme", M + 16, y + 10);
    doc.fillColor(DARK).fontSize(9).font("Helvetica")
       .text(
         "Request a curated 5-item sample kit (OT-selected for your setup type). Pay a ₹1,499 fully refundable deposit. " +
         "Kit dispatched within 48 hours. Deposit fully credited on your first bulk order.",
         M + 16, y + 28, { width: CW - 32 }
       );
    y += 64;
  }

  footerBand(doc);

  // ────────────────────────────────────────────────────────
  // PAGE 7 — HOW TO ORDER & CONTACT
  // ────────────────────────────────────────────────────────
  doc.addPage();
  headerBand(doc, "How to Order & Contact Us", "Simple ordering process — B2B or retail");

  y = 86;

  doc.fillColor(BRAND).fontSize(18).font("Helvetica-Bold")
     .text("Getting Started is Simple", M, y);
  y += 36;

  const steps = [
    { num: "01", heading: "Browse & Select", body: "Browse our catalogue at rehab.ableys.in or share your requirement on WhatsApp. Our team will recommend the right products for your setup." },
    { num: "02", heading: "Request a Quote", body: "Fill the B2B enquiry form (rehab.ableys.in/lp) or WhatsApp us directly. Institutional quotes are ready within 24 hours with itemised pricing and GST breakdown." },
    { num: "03", heading: "Confirm & Pay", body: "Approve your quote, choose your preferred payment method (bank transfer, UPI, or card). Pro-forma invoice issued immediately." },
    { num: "04", heading: "Dispatch & Delivery", body: "In-stock orders ship within 2–3 business days. Bulk or custom orders within 5–7 working days. Free delivery to your doorstep, pan-India." },
    { num: "05", heading: "Setup Support", body: "Receive your equipment with installation guides. WhatsApp our OT team for a complimentary setup consultation. You're ready to use." },
  ];

  steps.forEach((s) => {
    if (y > H - 100) return;
    doc.rect(M, y, 44, 56).fill(BRAND);
    doc.fillColor(WHITE).fontSize(16).font("Helvetica-Bold").text(s.num, M, y + 14, { width: 44, align: "center" });
    doc.rect(M + 44, y, CW - 44, 56).fill(LIGHT_BG);
    doc.fillColor(DARK).fontSize(10).font("Helvetica-Bold").text(s.heading, M + 56, y + 8);
    doc.fillColor(MUTED).fontSize(8.5).font("Helvetica").text(s.body, M + 56, y + 22, { width: CW - 72 });
    y += 62;
  });

  y += 12;

  // Contact block
  doc.rect(M, y, CW, 110).fill(BRAND_DARK);
  doc.fillColor(WHITE).fontSize(14).font("Helvetica-Bold")
     .text("Contact & Connect", M + 20, y + 14);
  doc.fillColor("#FFFFFFCC").fontSize(9.5).font("Helvetica")
     .text("WhatsApp (fastest):", M + 20, y + 36)
     .fillColor(WHITE).font("Helvetica-Bold").text("+91 70421 80166", M + 130, y + 36);
  doc.fillColor("#FFFFFFCC").font("Helvetica").fontSize(9.5)
     .text("Email:", M + 20, y + 52)
     .fillColor(WHITE).font("Helvetica-Bold").text("hello@ableys.in", M + 130, y + 52);
  doc.fillColor("#FFFFFFCC").font("Helvetica").fontSize(9.5)
     .text("Website:", M + 20, y + 68)
     .fillColor(WHITE).font("Helvetica-Bold").text("rehab.ableys.in", M + 130, y + 68);
  doc.fillColor("#FFFFFFCC").font("Helvetica").fontSize(9.5)
     .text("B2B Enquiry:", M + 20, y + 84)
     .fillColor(WHITE).font("Helvetica-Bold").text("rehab.ableys.in/lp", M + 130, y + 84);

  footerBand(doc);

  doc.end();
}
