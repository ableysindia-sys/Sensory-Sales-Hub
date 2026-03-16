import { db } from "./db";
import { categories as categoriesTable, products as productsTable, pages as pagesTable } from "@shared/schema";
import { count } from "drizzle-orm";

const GENERATED_IMAGE_SLUGS = [
  "platform-swing", "lycra-swing", "acrobat-swing",
  "ballpool-4x4", "ballpool-6x4",
  "crash-mat", "therapy-mat", "floormat", "interlocking-mat", "foldable-mat",
  "kidlite-barrel", "balance-beam", "wedges", "jumping-stool",
  "ramp-and-stairs", "climb-board", "wall-bar-ladder", "spider-climb-net",
  "adl-kit-4-page", "adl-kit-5-page", "adl-kit-6-page",
  "bosu-ball", "hexwall-touch-light", "glitter-pad", "glitter-capillary",
];

export async function seedDatabase(catalogueCategories: any[]) {
  const [{ value: productCount }] = await db.select({ value: count() }).from(productsTable);
  if (productCount > 0) {
    return;
  }

  console.log("Seeding database with catalogue data...");

  for (let i = 0; i < catalogueCategories.length; i++) {
    const cat = catalogueCategories[i];
    await db.insert(categoriesTable).values({
      slug: cat.slug,
      title: cat.title,
      description: cat.description,
      color: cat.color,
      image: cat.image || null,
      displayOrder: i,
      isActive: true,
    }).onConflictDoNothing();

    for (const product of cat.products) {
      let images = product.images || [];
      if (images.length === 0 && GENERATED_IMAGE_SLUGS.includes(product.id)) {
        images = [`__generated__:${product.id}`];
      }

      await db.insert(productsTable).values({
        slug: product.id,
        name: product.name,
        categorySlug: product.categorySlug,
        shortDescription: product.shortDescription,
        longDescription: product.description,
        basePrice: product.basePrice,
        comparePrice: product.comparePrice ?? null,
        stock: null,
        images: JSON.stringify(images),
        specifications: JSON.stringify(product.specifications || {}),
        features: JSON.stringify(product.features || []),
        applications: JSON.stringify(product.applications || []),
        configOptions: JSON.stringify(product.configOptions || null),
        shopifyHandle: product.shopifyHandle || null,
        shopifyUrl: product.shopifyUrl || null,
        isActive: true,
      }).onConflictDoNothing();
    }
  }

  const [{ value: finalCount }] = await db.select({ value: count() }).from(productsTable);
  console.log(`Seeded ${finalCount} products across ${catalogueCategories.length} categories.`);

  await seedPages();
}

const CMS_PAGES = [
  {
    slug: "affiliate-program-for-sensory-products",
    title: "Affiliate Program",
    content: `<p class="text-lg mb-8" style="color: var(--muted-foreground);">Earn 10% commission on every sale — and reward your audience with an automatic 5% discount.</p>
<h2>Commission</h2>
<p>✅ Earn <strong>10% commission</strong> on the sale price of every product sold through your unique affiliate link.</p>
<p>🎁 Customers shopping through your affiliate link will automatically receive a <strong>5% discount</strong> — no manual code required.</p>
<h2>Rewards</h2>
<ul>
<li>🏅 <strong>Level 1 Reward – ₹1,000:</strong> Upon reaching a total of ₹20,000 in sales since joining.</li>
<li>🏆 <strong>Level 2 Reward – ₹2,000:</strong> Upon reaching total sales of ₹50,000.</li>
<li>🥇 <strong>Level 3 Reward – ₹5,000:</strong> Upon achieving ₹1,00,000 in total sales.</li>
</ul>
<h2>How to Join</h2>
<p>Sign up as an affiliate, fill in your details, and wait for profile approval. Once approved, you'll receive your unique affiliate link and can start earning immediately.</p>
<h2>Payouts</h2>
<p>🏦 Withdraw your commission once earnings reach ₹1,000 or more. Payments are processed via bank transfer once every month.</p>
<h2>Questions?</h2>
<p>Email us at <a href="mailto:team@ableys.in">team@ableys.in</a> — our team will get back to you promptly.</p>`,
  },
  {
    slug: "ableys-affiliate-program-faq",
    title: "Affiliate Program FAQ",
    content: `<p class="text-lg mb-8" style="color: var(--muted-foreground);">Everything you need to know about Abley's affiliate program.</p>
<h2>Frequently Asked Questions</h2>
<h3>1) How can I join the affiliate program?</h3>
<p>👉 Simply sign up as an affiliate, fill in your details, and wait for profile approval. Once approved, you're ready to start!</p>
<h3>2) What commission and rewards will I earn?</h3>
<p>💰 You'll earn <strong>10% commission</strong> on the sale price of every order. Plus, unlock exclusive rewards as you reach different sales milestones.</p>
<h3>3) Do customers get a discount through my affiliate link?</h3>
<p>🎁 Yes! Customers using your affiliate link will automatically receive a <strong>5% discount</strong> — no coupon code needed.</p>
<h3>4) How and when can I withdraw my earnings?</h3>
<p>🏦 You can withdraw your commission once your earnings reach ₹1,000 or more. Payments are processed via bank transfer once every month.</p>
<h3>5) How can I contact customer support?</h3>
<p>📧 Email us at <a href="mailto:team@ableys.in">team@ableys.in</a>. Our support team will get back to you promptly.</p>
<h3>6) How can I track my sales and commission?</h3>
<p>📊 You can view all your sales and earned commission directly from your Affiliate Dashboard in your profile.</p>`,
  },
  {
    slug: "weighted-vest-size-chart",
    title: "Weighted Vest Size Chart",
    content: `<p class="text-lg mb-8" style="color: var(--muted-foreground);">Find the right size for the perfect fit and therapeutic benefit.</p>
<h2>How to Choose the Right Size</h2>
<p>A weighted vest should weigh approximately <strong>5–10% of the user's body weight</strong> for optimal therapeutic input. Measure the chest circumference snugly and refer to the table below.</p>
<div style="overflow-x: auto; margin: 2rem 0;">
<table style="width:100%; border-collapse: collapse; font-size: 14px;">
<thead>
<tr style="background-color: #f5f5f5;">
<th style="border: 1px solid #ddd; padding: 10px 14px; text-align: left;">Size</th>
<th style="border: 1px solid #ddd; padding: 10px 14px; text-align: left;">Age Range</th>
<th style="border: 1px solid #ddd; padding: 10px 14px; text-align: left;">Chest (cm)</th>
<th style="border: 1px solid #ddd; padding: 10px 14px; text-align: left;">User Height</th>
<th style="border: 1px solid #ddd; padding: 10px 14px; text-align: left;">Vest Weight</th>
</tr>
</thead>
<tbody>
<tr><td style="border:1px solid #ddd;padding:10px 14px;"><strong>XS</strong></td><td style="border:1px solid #ddd;padding:10px 14px;">3–5 years</td><td style="border:1px solid #ddd;padding:10px 14px;">52–56 cm</td><td style="border:1px solid #ddd;padding:10px 14px;">95–110 cm</td><td style="border:1px solid #ddd;padding:10px 14px;">1 kg</td></tr>
<tr style="background:#fafafa;"><td style="border:1px solid #ddd;padding:10px 14px;"><strong>S</strong></td><td style="border:1px solid #ddd;padding:10px 14px;">6–8 years</td><td style="border:1px solid #ddd;padding:10px 14px;">57–62 cm</td><td style="border:1px solid #ddd;padding:10px 14px;">111–125 cm</td><td style="border:1px solid #ddd;padding:10px 14px;">1.5 kg</td></tr>
<tr><td style="border:1px solid #ddd;padding:10px 14px;"><strong>M</strong></td><td style="border:1px solid #ddd;padding:10px 14px;">9–12 years</td><td style="border:1px solid #ddd;padding:10px 14px;">63–70 cm</td><td style="border:1px solid #ddd;padding:10px 14px;">126–145 cm</td><td style="border:1px solid #ddd;padding:10px 14px;">2 kg</td></tr>
<tr style="background:#fafafa;"><td style="border:1px solid #ddd;padding:10px 14px;"><strong>L</strong></td><td style="border:1px solid #ddd;padding:10px 14px;">13–16 years</td><td style="border:1px solid #ddd;padding:10px 14px;">71–82 cm</td><td style="border:1px solid #ddd;padding:10px 14px;">146–165 cm</td><td style="border:1px solid #ddd;padding:10px 14px;">2.5 kg</td></tr>
<tr><td style="border:1px solid #ddd;padding:10px 14px;"><strong>XL</strong></td><td style="border:1px solid #ddd;padding:10px 14px;">Adults</td><td style="border:1px solid #ddd;padding:10px 14px;">83–96 cm</td><td style="border:1px solid #ddd;padding:10px 14px;">166–180 cm</td><td style="border:1px solid #ddd;padding:10px 14px;">3 kg</td></tr>
</tbody>
</table>
</div>
<h2>Fitting Tips</h2>
<ul>
<li>The vest should fit snugly but allow free arm movement</li>
<li>Weights should distribute evenly across front and back pockets</li>
<li>Always consult your occupational therapist for personalised weight recommendations</li>
<li>Weighted vests should typically be worn for 20–30 minutes at a time</li>
</ul>
<h2>Still Unsure?</h2>
<p>Contact us at <a href="mailto:team@ableys.in">team@ableys.in</a> and our team will help you choose the right size.</p>`,
  },
  {
    slug: "sensory-body-sock-sizing-guide",
    title: "Sensory Body Sock Size Guide",
    content: `<p class="text-lg mb-8" style="color: var(--muted-foreground);">Find the perfect fit for maximum sensory comfort and therapeutic benefit.</p>
<p>Abley's sensory body socks are <strong>recommended by professional therapists</strong>. Designed specifically for sensory purposes, each size is crafted with expert insights and clinical research to support sensory development and wellbeing.</p>
<h2>Size Chart</h2>
<div style="overflow-x: auto; margin: 2rem 0;">
<table style="width:100%; border-collapse: collapse; font-size: 14px;">
<thead>
<tr style="background-color: #f5f5f5;">
<th style="border: 1px solid #ddd; padding: 10px 14px; text-align: left;">Size</th>
<th style="border: 1px solid #ddd; padding: 10px 14px; text-align: left;">Length</th>
<th style="border: 1px solid #ddd; padding: 10px 14px; text-align: left;">Width</th>
<th style="border: 1px solid #ddd; padding: 10px 14px; text-align: left;">Age Range</th>
<th style="border: 1px solid #ddd; padding: 10px 14px; text-align: left;">User Height</th>
</tr>
</thead>
<tbody>
<tr><td style="border:1px solid #ddd;padding:10px 14px;"><strong>Small</strong></td><td style="border:1px solid #ddd;padding:10px 14px;">40″ L</td><td style="border:1px solid #ddd;padding:10px 14px;">27″ W</td><td style="border:1px solid #ddd;padding:10px 14px;">3–5 years</td><td style="border:1px solid #ddd;padding:10px 14px;">33″ – 42″</td></tr>
<tr style="background:#fafafa;"><td style="border:1px solid #ddd;padding:10px 14px;"><strong>Medium</strong></td><td style="border:1px solid #ddd;padding:10px 14px;">47″ L</td><td style="border:1px solid #ddd;padding:10px 14px;">27″ W</td><td style="border:1px solid #ddd;padding:10px 14px;">6–9 years</td><td style="border:1px solid #ddd;padding:10px 14px;">43″ – 51″</td></tr>
<tr><td style="border:1px solid #ddd;padding:10px 14px;"><strong>Large</strong></td><td style="border:1px solid #ddd;padding:10px 14px;">56″ L</td><td style="border:1px solid #ddd;padding:10px 14px;">28″ W</td><td style="border:1px solid #ddd;padding:10px 14px;">10–12 years</td><td style="border:1px solid #ddd;padding:10px 14px;">52″ – 60″</td></tr>
</tbody>
</table>
</div>
<h2>How to Choose the Right Size</h2>
<ul>
<li>Measure the child's height to determine the correct length</li>
<li>The body sock should provide gentle resistance — not be too loose or too tight</li>
<li>A snug fit provides better proprioceptive input</li>
<li>When between sizes, size up for comfort</li>
</ul>
<h2>About Sensory Body Socks</h2>
<p>Sensory body socks provide gentle, full-body deep pressure that supports body awareness, motor planning, and self-regulation. Commonly used in occupational therapy to help children with sensory processing differences feel calm and grounded.</p>
<h2>Questions?</h2>
<p>Contact us at <a href="mailto:team@ableys.in">team@ableys.in</a> for personalised sizing advice from our therapist-trained team.</p>`,
  },
  {
    slug: "about-ableys-sensory-tools",
    title: "About Abley's",
    content: `<p class="text-lg mb-8" style="color: var(--muted-foreground);">A haven designed to meet the distinctive needs of individuals with special abilities.</p>
<p>Welcome to Abley's, a haven designed to meet the distinctive needs of individuals with special abilities, disabilities, and the elderly. At Abley's, we go beyond providing adaptive clothing, allergen-free eats, sensory tools, and elderly care products. We're on a mission to enhance independence, foster inclusivity, and create a supportive community.</p>
<p>Our curated offerings cater to specific needs, celebrating the unique abilities within every individual. Join us on this journey where abilities are redefined, and each product tells a story of empowerment, understanding, and shared joy.</p>
<h2>Our Mission</h2>
<p>We believe every individual deserves access to quality therapeutic tools that support their growth, independence, and wellbeing. That's why we work closely with occupational therapists, special educators, and families to curate products that genuinely make a difference.</p>
<h2>Who We Serve</h2>
<ul>
<li><strong>Children with Sensory Processing Differences</strong> — Tools for regulation, focus, and motor development</li>
<li><strong>Occupational Therapists &amp; Clinics</strong> — Professional-grade equipment built for clinical use</li>
<li><strong>Schools &amp; Special Education Centres</strong> — Inclusive learning environments with the right sensory support</li>
<li><strong>Families at Home</strong> — Bringing therapeutic tools into everyday routines</li>
</ul>
<h2>Made in India</h2>
<p>Abley's is a brand of Eighth Fold Circle Pvt Ltd., based in Noida, Uttar Pradesh. We are proud to design and source products locally, supporting Indian craftsmanship while meeting global quality standards.</p>
<h2>Get in Touch</h2>
<p>Have questions? Reach out — we're always happy to help.</p>
<ul>
<li>Email: <a href="mailto:team@ableys.in">team@ableys.in</a></li>
<li>Phone: <a href="tel:+917042180166">+91-704-218-0166</a></li>
</ul>`,
  },
  {
    slug: "about-us",
    title: "About Us",
    content: `<p class="text-lg mb-8" style="color: var(--muted-foreground);">A Mission Born from a Need for Practical Solutions</p>

<p>Abley's was founded by a team of parents and professionals who identified a critical gap in India's market for high-quality sensory tools and developmental aids. The company emerged from firsthand experience navigating child development and special needs challenges.</p>

<p>Our mission is simple but powerful: while information is important, families and therapists need practical, tangible solutions to support children every day. We focus on providing accessible, effective tools that address diverse sensory needs for children and adults across India.</p>

<h2>Our Vision</h2>

<p>To be India's most trusted provider of therapy and rehabilitation equipment — empowering therapists, clinics, hospitals, and families with professional-grade tools that make a real difference in the lives of children with special needs.</p>

<h2>What We Do</h2>

<p>We offer a curated selection of durable, thoughtfully designed therapy products across 9 specialised categories:</p>

<ul>
<li><strong>Therapy Swings</strong> — Bolster, platform, disc, lycra, T-bar, tube, and acrobat swings for vestibular and proprioceptive input</li>
<li><strong>Ball Pools</strong> — Professional-grade therapeutic ball pools for deep pressure and tactile stimulation</li>
<li><strong>Therapy Mats</strong> — Crash mats, floor mats, foldable mats, and interlocking tiles for safe therapy environments</li>
<li><strong>Movement &amp; Balance</strong> — Balance boards, beams, stepping stones, barrels, and wedges for motor development</li>
<li><strong>Climbing Equipment</strong> — Climbing walls, frames, and structures for strength and coordination</li>
<li><strong>ADL Kits</strong> — Activities of Daily Living boards for functional skill development</li>
<li><strong>Therapy Balls</strong> — Professional exercise and therapy balls for rehabilitation</li>
<li><strong>Deep Pressure Tools</strong> — Weighted blankets, vests, and compression products for calming and self-regulation</li>
<li><strong>Visual Sensory</strong> — Bubble tubes, fibre optics, and interactive light panels for multi-sensory environments</li>
</ul>

<h2>Why Choose Abley's</h2>

<ul>
<li><strong>Institutional-Grade Quality</strong> — Every product is designed and tested for professional clinical use</li>
<li><strong>Therapist-Consulted Design</strong> — Our products are developed in consultation with practising occupational therapists</li>
<li><strong>Antimicrobial &amp; Safe Materials</strong> — Easy-to-clean, food-grade, BPA-free materials where appropriate</li>
<li><strong>Bulk &amp; Institutional Pricing</strong> — Special rates for clinics, hospitals, schools, and therapy centres</li>
<li><strong>Made in India</strong> — Proudly manufactured in India, supporting local craftsmanship</li>
<li><strong>6-Month Warranty</strong> — All products come with a 6-month warranty for your peace of mind</li>
</ul>

<h2>Get in Touch</h2>

<p>Whether you're a therapist setting up a new clinic, a school building a sensory room, or a parent looking for the right tools — we're here to help. <a href="/enquiry">Send us an enquiry</a> or <a href="/contact">contact us</a> directly.</p>`,
  },
  {
    slug: "shipping-policy",
    title: "Shipping Policy",
    content: `<p class="text-lg mb-8" style="color: var(--muted-foreground);">Everything you need to know about how we get your orders to you.</p>

<h2>Free Shipping Across India</h2>

<p>We offer <strong>free standard shipping</strong> on all orders across India. No minimum order value, no hidden charges — every order ships free.</p>

<h2>Processing Time</h2>

<p>All orders are processed within <strong>1–2 business days</strong> after payment confirmation. You will receive a confirmation email with your order details once your order has been placed.</p>

<h2>Delivery Time</h2>

<p>Standard delivery typically takes <strong>4–7 business days</strong> depending on your location. Delivery to metro cities is usually faster (3–5 business days), while remote areas may take slightly longer.</p>

<h2>Order Tracking</h2>

<p>Once your order is dispatched, you will receive a shipping confirmation email with a tracking number. You can use this to track your order's progress in real time.</p>

<h2>Bulk &amp; Institutional Orders</h2>

<p>For bulk orders and institutional purchases, delivery timelines may vary depending on the size and customisation requirements of the order. Our team will provide an estimated delivery date when confirming your bulk enquiry. Please <a href="/enquiry">submit a bulk enquiry</a> for details.</p>

<h2>Damaged or Lost Shipments</h2>

<p>If your order arrives damaged or is lost in transit, please <a href="/contact">contact us</a> within 48 hours of delivery (or expected delivery date) with photographs of the damage. We will arrange a replacement or refund at no additional cost.</p>

<h2>Questions?</h2>

<p>If you have any questions about shipping, please reach out to us at <a href="mailto:info@ableys.in">info@ableys.in</a>.</p>`,
  },
  {
    slug: "return-policy",
    title: "Return Policy",
    content: `<p class="text-lg mb-8" style="color: var(--muted-foreground);">We want you to be completely satisfied with your purchase.</p>

<h2>7-Day Exchange Policy</h2>

<p>We offer a <strong>7-day exchange window</strong> from the date of delivery. If you're not satisfied with your product, you may request an exchange within this period.</p>

<h2>Conditions for Exchange</h2>

<p>To be eligible for an exchange, items must meet the following conditions:</p>

<ul>
<li>The item must be <strong>unused and in its original condition</strong></li>
<li>The item must be <strong>unwashed and undamaged</strong></li>
<li>The item must be in its <strong>original packaging</strong> with all tags attached</li>
<li>You must provide the <strong>order number and proof of purchase</strong></li>
</ul>

<h2>How to Request an Exchange</h2>

<ol>
<li>Email us at <a href="mailto:info@ableys.in">info@ableys.in</a> within 7 days of receiving your order</li>
<li>Include your order number, the item you'd like to exchange, and the reason</li>
<li>Our team will respond within 1–2 business days with instructions</li>
<li>Ship the item back to us (return shipping will be arranged by our team)</li>
<li>Once we receive and inspect the item, we'll dispatch the replacement</li>
</ol>

<h2>Refunds</h2>

<p>If an exchange is not possible (e.g., the product is out of stock), we will issue a <strong>full refund</strong> to your original payment method. Refunds are typically processed within <strong>5–7 business days</strong> after we receive the returned item.</p>

<h2>Non-Returnable Items</h2>

<p>For hygiene and safety reasons, the following items cannot be returned or exchanged:</p>

<ul>
<li>Customised or made-to-order products</li>
<li>Products that have been used, washed, or damaged by the customer</li>
<li>Items without original packaging or tags</li>
</ul>

<h2>Damaged or Defective Products</h2>

<p>If you receive a damaged or defective product, please <a href="/contact">contact us</a> within 48 hours of delivery with photographs. We will arrange an immediate replacement at no additional cost.</p>

<h2>Questions?</h2>

<p>For any return or exchange queries, email us at <a href="mailto:info@ableys.in">info@ableys.in</a>.</p>`,
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    content: `<p class="text-lg mb-8" style="color: var(--muted-foreground);">Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>

<h2>Information We Collect</h2>

<p>When you visit our website or place an order, we may collect the following information:</p>

<ul>
<li><strong>Personal Information</strong> — Name, email address, phone number, and shipping address when you place an order or submit an enquiry</li>
<li><strong>Payment Information</strong> — Payment details are processed securely through our payment gateway and are not stored on our servers</li>
<li><strong>Usage Data</strong> — Browser type, pages visited, time spent on pages, and other analytics data to improve our website experience</li>
</ul>

<h2>How We Use Your Information</h2>

<p>We use the information we collect to:</p>

<ul>
<li>Process and fulfil your orders</li>
<li>Respond to your enquiries and provide customer support</li>
<li>Send order confirmations and shipping updates</li>
<li>Improve our website, products, and services</li>
<li>Send occasional product updates or promotions (only with your consent)</li>
</ul>

<h2>Information Sharing</h2>

<p>We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>

<ul>
<li><strong>Shipping Partners</strong> — Your name and delivery address are shared with our logistics partners to fulfil your order</li>
<li><strong>Payment Processors</strong> — Payment information is shared with our secure payment gateway for transaction processing</li>
<li><strong>Legal Requirements</strong> — If required by law, regulation, or legal process</li>
</ul>

<h2>Data Security</h2>

<p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

<h2>Cookies</h2>

<p>Our website uses cookies to enhance your browsing experience and analyse website traffic. You can control cookie preferences through your browser settings. Disabling cookies may affect some website functionality.</p>

<h2>Your Rights</h2>

<p>You have the right to:</p>

<ul>
<li>Access the personal information we hold about you</li>
<li>Request correction of inaccurate information</li>
<li>Request deletion of your personal information</li>
<li>Opt out of marketing communications at any time</li>
</ul>

<h2>Changes to This Policy</h2>

<p>We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date.</p>

<h2>Contact Us</h2>

<p>If you have any questions about this privacy policy, please contact us at <a href="mailto:info@ableys.in">info@ableys.in</a>.</p>`,
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    content: `<p class="text-lg mb-8" style="color: var(--muted-foreground);">Please read these terms carefully before using our website or placing an order.</p>

<h2>General</h2>

<p>By accessing and using the Abley's Rehab website (ableys.in), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>

<h2>Products &amp; Pricing</h2>

<ul>
<li>All product descriptions, images, and specifications are provided as accurately as possible. However, minor variations in colour and dimensions may occur due to manufacturing processes and screen display settings.</li>
<li>Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless otherwise stated.</li>
<li>We reserve the right to modify product prices at any time without prior notice. Price changes will not affect orders that have already been confirmed.</li>
</ul>

<h2>Orders &amp; Payment</h2>

<ul>
<li>Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order.</li>
<li>Payment must be completed at the time of placing the order through our available payment methods.</li>
<li>If an order cannot be fulfilled due to stock unavailability or other reasons, we will notify you and issue a full refund.</li>
</ul>

<h2>Shipping &amp; Delivery</h2>

<p>Shipping and delivery are governed by our <a href="/page/shipping-policy">Shipping Policy</a>. Please refer to that page for details on processing times, delivery estimates, and shipping coverage.</p>

<h2>Returns &amp; Exchanges</h2>

<p>Returns and exchanges are governed by our <a href="/page/return-policy">Return Policy</a>. Please refer to that page for details on eligibility, timelines, and procedures.</p>

<h2>Intellectual Property</h2>

<p>All content on this website — including text, images, logos, product designs, and graphics — is the property of Abley's Rehab and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our prior written consent.</p>

<h2>Limitation of Liability</h2>

<p>Abley's Rehab shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability for any claim shall not exceed the amount paid for the specific product in question.</p>

<h2>Product Use &amp; Safety</h2>

<ul>
<li>Our therapy products are designed for use under the supervision of qualified professionals (therapists, educators, or trained caregivers).</li>
<li>Always follow the product instructions and safety guidelines provided.</li>
<li>Abley's Rehab is not responsible for injuries resulting from improper use or unsupervised use of our products.</li>
<li>Weight capacity limits and age recommendations must be observed at all times.</li>
</ul>

<h2>Bulk &amp; Institutional Orders</h2>

<p>Bulk and institutional orders may be subject to separate terms and conditions as agreed upon at the time of order confirmation. Please <a href="/enquiry">submit a bulk enquiry</a> for custom pricing and terms.</p>

<h2>Changes to Terms</h2>

<p>We reserve the right to update these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Your continued use of the website after any changes constitutes acceptance of the updated terms.</p>

<h2>Governing Law</h2>

<p>These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.</p>

<h2>Contact Us</h2>

<p>If you have any questions about these terms, please contact us at <a href="mailto:info@ableys.in">info@ableys.in</a>.</p>`,
  },
];

export async function seedPages() {
  console.log("Upserting CMS pages...");
  for (const page of CMS_PAGES) {
    await db.insert(pagesTable).values({
      slug: page.slug,
      title: page.title,
      content: page.content,
      isPublished: true,
    }).onConflictDoUpdate({
      target: pagesTable.slug,
      set: {
        title: page.title,
        content: page.content,
        isPublished: true,
      },
    });
  }
  console.log(`Upserted ${CMS_PAGES.length} CMS pages.`);
}
