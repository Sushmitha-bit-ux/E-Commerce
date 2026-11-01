export const CATEGORIES = [
  {
    id: "cat-1",
    name: "All",
    slug: "all",
    icon: "LayoutGrid",
    productCount: 12
  },
  {
    id: "cat-2",
    name: "Electronics",
    slug: "electronics",
    description: "Next-gen audio, smart wearables, and premium personal tech",
    icon: "Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    productCount: 4
  },
  {
    id: "cat-3",
    name: "Fashion",
    slug: "fashion",
    description: "Modern timeless apparel, jackets, and everyday wardrobe essentials",
    icon: "Shirt",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    productCount: 3
  },
  {
    id: "cat-4",
    name: "Home & Living",
    slug: "home-living",
    description: "Artisanal tableware, studio lighting, and interior upgrades",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    productCount: 3
  },
  {
    id: "cat-5",
    name: "Beauty & Wellness",
    slug: "beauty",
    description: "Cruelty-free botanical formulas and restorative skincare",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    productCount: 2
  },
  {
    id: "cat-6",
    name: "Footwear",
    slug: "footwear",
    description: "High-performance running kicks and premium casual shoes",
    icon: "Footprints",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    productCount: 2
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Aura Pro Wireless Noise-Cancelling Headphones",
    slug: "aura-pro-wireless-headphones",
    description: "Engineered with custom 40mm beryllium acoustic drivers and adaptive hybrid noise cancellation. Delivers an expansive studio-grade soundstage, crystal-clear voice pick-up with beamforming microphones, and up to 45 hours of high-fidelity playback on a single fast charge.",
    price: 249.99,
    originalPrice: 329.99,
    discountPercent: 24,
    category: "Electronics",
    stock: 24,
    rating: 4.9,
    reviewsCount: 148,
    badge: "Best Seller",
    mainImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"
    ],
    features: [
      "Hybrid Active Noise Cancellation with Transparency Mode",
      "45-Hour Battery Life with USB-C Quick Charge (10m = 5 hours)",
      "Lossless Bluetooth 5.3 + Multipoint device switching",
      "Ergonomic aerospace aluminum frame & memory foam ear cushions"
    ],
    specs: {
      "Driver Size": "40mm Beryllium",
      "Frequency Response": "10Hz - 40,000Hz",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.3 / 3.5mm Aux",
      "Warranty": "2 Years Official"
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    reviews: [
      {
        id: "rev-1",
        userName: "Marcus Chen",
        rating: 5,
        comment: "The noise cancellation rivaled my expectations completely. The mids and highs are pristine, and bass is tight without being muddy.",
        date: "Oct 24, 2026"
      },
      {
        id: "rev-2",
        userName: "Elena Rostova",
        rating: 5,
        comment: "Extremely comfortable for long 8-hour work flights. Highly recommend!",
        date: "Oct 19, 2026"
      }
    ]
  },
  {
    id: "prod-2",
    name: "Apex Ultra GPS Smartwatch & Fitness Tracker",
    slug: "apex-ultra-gps-smartwatch",
    description: "Rugged aerospace titanium casing with scratch-resistant sapphire crystal glass. Features dual-frequency multiband GPS, 24/7 ECG-certified cardiac rhythm monitoring, sleep stage analytics, and water resistance up to 50 meters.",
    price: 299.00,
    originalPrice: 379.00,
    discountPercent: 21,
    category: "Electronics",
    stock: 15,
    rating: 4.8,
    reviewsCount: 96,
    badge: "Trending",
    mainImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
    ],
    features: [
      "Dual-frequency GNSS positioning for precise trail tracking",
      "Vibrant AMOLED 1.4-inch Always-On Retina Display",
      "14-day extended battery endurance in smartwatch mode",
      "Continuous Blood Oxygen (SpO2) and Stress Monitoring"
    ],
    specs: {
      "Display": "1.4\" Super AMOLED 454x454",
      "Water Resistance": "5 ATM (50m)",
      "Battery Life": "Up to 14 days",
      "Sensors": "Optical Heart Rate, SpO2, Barometer, Gyroscope"
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    reviews: [
      {
        id: "rev-3",
        userName: "David Kim",
        rating: 5,
        comment: "Battery easily lasted me 12 days on a single charge with daily run tracking.",
        date: "Oct 20, 2026"
      }
    ]
  },
  {
    id: "prod-3",
    name: "Velocity Speed Pro Running Sneakers",
    slug: "velocity-speed-pro-sneakers",
    description: "Engineered with a curved carbon-composite propulsion plate encased between dual layers of ultralight rebound nitrogen-infused foam. Delivers explosive energy return and reduced leg fatigue for tempo runs and race day.",
    price: 139.99,
    originalPrice: 179.99,
    discountPercent: 22,
    category: "Footwear",
    stock: 35,
    rating: 4.7,
    reviewsCount: 88,
    badge: "Hot",
    mainImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
    ],
    features: [
      "Full-length carbon composite speed plate",
      "Ultra-breathable monomesh upper with targeted support zones",
      "Vibram Megagrip high-traction rubber outsole pods",
      "Heel-to-toe drop: 8mm"
    ],
    specs: {
      "Weight": "198g (Size 9)",
      "Drop": "8mm",
      "Upper": "Engineered Monomesh",
      "Terrain": "Road & Track"
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    reviews: [
      {
        id: "rev-4",
        userName: "Sarah Jenkins",
        rating: 5,
        comment: "Set a personal best in my 10k with these! The propulsion feel is real.",
        date: "Oct 15, 2026"
      }
    ]
  },
  {
    id: "prod-4",
    name: "Voyager Minimalist Weatherproof Commuter Backpack",
    slug: "voyager-weatherproof-backpack",
    description: "Tailored from 840D recycled ballistic nylon with water-repellent TPU coating and weather-sealed YKK Aquaguard zippers. Features dedicated padded compartments for a 16\" laptop, tablet, and hidden passport security pocket.",
    price: 89.50,
    originalPrice: 119.00,
    discountPercent: 25,
    category: "Fashion",
    stock: 28,
    rating: 4.9,
    reviewsCount: 115,
    badge: "Staff Pick",
    mainImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"
    ],
    features: [
      "Padded quick-access 16\" laptop and tablet sleeve",
      "Weather-sealed YKK Aquaguard zippers throughout",
      "Luggage trolley pass-through strap for travel ease",
      "Ergonomic breathable air-mesh back panel"
    ],
    specs: {
      "Capacity": "22 Liters",
      "Dimensions": "48 x 30 x 16 cm",
      "Weight": "850g",
      "Material": "840D Recycled Ballistic Nylon"
    },
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    reviews: []
  },
  {
    id: "prod-5",
    name: "Lumina Architectural LED Studio & Desk Lamp",
    slug: "lumina-architectural-led-lamp",
    description: "Precision CNC-machined matte aluminum structure with dual-pivot counterbalanced tension arm. Integrated touch slider offers stepless dimming from 1% to 100% and 5 color temperatures from 2700K candlelight to 6500K daylight.",
    price: 74.99,
    originalPrice: 99.99,
    discountPercent: 25,
    category: "Home & Living",
    stock: 45,
    rating: 4.6,
    reviewsCount: 68,
    badge: "Sale",
    mainImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80"
    ],
    features: [
      "97+ High CRI natural light emission protects against eye strain",
      "Stepless capacitive touch dimming bar",
      "Built-in 15W wireless charging pad on heavy steel base",
      "Dual 360-degree precision rotation joints"
    ],
    specs: {
      "Brightness": "1200 Lumens Max",
      "Color Temperature": "2700K - 6500K",
      "Power": "24W with USB-C adapter",
      "Lifespan": "50,000+ hours"
    },
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    reviews: []
  },
  {
    id: "prod-6",
    name: "Kyoto Handcrafted Stoneware Ceramic Mug Collection",
    slug: "kyoto-handcrafted-ceramic-mugs",
    description: "Wheel-thrown by master artisans using organic local stoneware clay and finished in a reactive matte earth glaze. Each mug possesses unique speckled gradients and a comfortable tactile ergonomic thumb handle.",
    price: 42.00,
    originalPrice: 55.00,
    discountPercent: 24,
    category: "Home & Living",
    stock: 32,
    rating: 4.9,
    reviewsCount: 82,
    badge: "Artisan",
    mainImage: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80"
    ],
    features: [
      "Set of four hand-thrown ceramic 350ml mugs",
      "Non-toxic lead-free reactive mineral glaze",
      "Microwave, dishwasher, and oven safe up to 220°C",
      "Packaged in sustainable recycled paper gift box"
    ],
    specs: {
      "Capacity": "350 ml each",
      "Set Size": "4 Mugs",
      "Material": "Natural Stoneware",
      "Dishwasher Safe": "Yes"
    },
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    reviews: []
  },
  {
    id: "prod-7",
    name: "Botanical Squalane & Rosehip Facial Elixir",
    slug: "botanical-squalane-facial-elixir",
    description: "100% plant-derived squalane infused with cold-pressed Andean rosehip seed oil and stabilized Vitamin C ester. Fast-absorbing and non-comedogenic formula that deeply nourishes, firms, and revives a healthy radiant glow.",
    price: 48.00,
    originalPrice: 60.00,
    discountPercent: 20,
    category: "Beauty & Wellness",
    stock: 50,
    rating: 4.8,
    reviewsCount: 139,
    badge: "Organic",
    mainImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
    ],
    features: [
      "100% Vegan, Cruelty-Free, and Paraben-Free",
      "Rich in Omega 3, 6, 9 and Antioxidant Bioflavonoids",
      "Glass bottle with precision calibrated dropper pipette",
      "Suitable for all skin types including sensitive skin"
    ],
    specs: {
      "Volume": "50 ml / 1.7 fl oz",
      "Skin Type": "All Skin Types",
      "Formula": "Cold-pressed plant oil",
      "Certifications": "Ecocert Organic"
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    reviews: []
  },
  {
    id: "prod-8",
    name: "Australian Extra-Fine Merino Wool Knit Sweater",
    slug: "merino-wool-knit-sweater",
    description: "Spun from 19.5-micron extra-fine Merino wool fibers. Exceptionally soft directly on bare skin, naturally breathable, and thermoregulating for cool mornings and warm afternoons alike.",
    price: 119.00,
    originalPrice: 159.00,
    discountPercent: 25,
    category: "Fashion",
    stock: 22,
    rating: 4.7,
    reviewsCount: 61,
    badge: "Premium",
    mainImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80"
    ],
    features: [
      "100% Pure Extra-Fine Australian Merino Wool",
      "Seamless 3D knit construction for zero-friction wear",
      "Naturally odor and wrinkle resistant",
      "Ribbed collar, cuffs, and hem"
    ],
    specs: {
      "Material": "100% Merino Wool (19.5 micron)",
      "Fit": "Relaxed Tailored",
      "Care": "Hand wash cold or gentle wool cycle"
    },
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    reviews: []
  },
  {
    id: "prod-9",
    name: "Heritage Full-Grain Leather Chelsea Boots",
    slug: "heritage-leather-chelsea-boots",
    description: "Handcrafted from vegetable-tanned full-grain cowhide leather with Goodyear welt construction that can be re-soled for a lifetime of wear. Fitted with dual heavy elastic side gores and cushioned Poron insole.",
    price: 189.00,
    originalPrice: 240.00,
    discountPercent: 21,
    category: "Footwear",
    stock: 18,
    rating: 4.8,
    reviewsCount: 74,
    badge: "Handmade",
    mainImage: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80"
    ],
    features: [
      "Full-grain vegetable tanned Italian leather",
      "Traditional Goodyear welted construction",
      "All-weather studded rubber outsole",
      "Reinforced rear pull tab"
    ],
    specs: {
      "Upper": "Full-Grain Cowhide Leather",
      "Sole": "Dainite Studded Rubber",
      "Construction": "Goodyear Welt 360",
      "Origin": "Handmade in Portugal"
    },
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    reviews: []
  },
  {
    id: "prod-10",
    name: "Pure Mist Ultrasonic Aromatherapy Diffuser",
    slug: "pure-mist-ultrasonic-diffuser",
    description: "Matte porcelain ceramic cover housing advanced 2.4MHz ultrasonic vapor technology. Humidifies your space and disperses pure essential oil aromas silently with gentle ambient warm glow lighting.",
    price: 54.00,
    originalPrice: 70.00,
    discountPercent: 23,
    category: "Home & Living",
    stock: 40,
    rating: 4.7,
    reviewsCount: 57,
    badge: "New",
    mainImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80"
    ],
    features: [
      "Handcrafted real ceramic stoneware cover",
      "Whisper-quiet <20dB ultrasonic diffusion",
      "Continuous and interval misting modes (up to 10 hours)",
      "Auto shut-off when water level is depleted"
    ],
    specs: {
      "Capacity": "200ml",
      "Coverage": "Up to 350 sq ft",
      "Timer Modes": "1h, 3h, 6h, Continuous",
      "Lighting": "Warm LED with breath mode"
    },
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    reviews: []
  },
  {
    id: "prod-11",
    name: "Aura Soundbar Mini Spatial Desktop Speaker",
    slug: "aura-soundbar-mini-speaker",
    description: "Compact desktop soundbar with dual neodymium drivers, dual passive radiators, and Bluetooth 5.3 + USB-C lossless DAC audio input. Perfect for minimalist work desks and bedside audio.",
    price: 109.00,
    originalPrice: 139.00,
    discountPercent: 22,
    category: "Electronics",
    stock: 25,
    rating: 4.8,
    reviewsCount: 49,
    badge: "Trending",
    mainImage: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"
    ],
    features: [
      "Dual 48mm Neodymium drivers + dual bass radiators",
      "Hi-Res 24-bit/96kHz USB-C direct lossless DAC",
      "Aluminum anodized chassis with knurled volume dial",
      "12-hour rechargeable battery for portable use"
    ],
    specs: {
      "Power Output": "30W Peak",
      "Frequency Response": "50Hz - 22,000Hz",
      "Inputs": "USB-C, Bluetooth 5.3, 3.5mm AUX",
      "Battery": "5200mAh"
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    reviews: []
  },
  {
    id: "prod-12",
    name: "Nourishing Wild Botanicals Body Wash & Lotion Duet",
    slug: "botanicals-body-wash-lotion-duet",
    description: "Formulated with wild sandalwood, bergamot rind, and meadowfoam seed oil. Cleanses gently without stripping the skin's lipid barrier, followed by a velvety hydrating body lotion.",
    price: 52.00,
    originalPrice: 65.00,
    discountPercent: 20,
    category: "Beauty & Wellness",
    stock: 38,
    rating: 4.9,
    reviewsCount: 92,
    badge: "Top Rated",
    mainImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80"
    ],
    features: [
      "Set includes 500ml Body Cleanser & 500ml Body Hydrator",
      "Infused with botanical extracts and antioxidant vitamin E",
      "100% Recycled post-consumer plastic pump bottles",
      "Subtle woody citrus aromatherapy scent"
    ],
    specs: {
      "Volume": "2 x 500ml / 16.9 fl oz",
      "Fragrance Notes": "Sandalwood, Bergamot, Amber",
      "Free From": "Sulfates, Silicones, Parabens"
    },
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    reviews: []
  }
];

export const TESTIMONIALS = [
  {
    id: "test-1",
    name: "Sarah Lindqvist",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    comment: "The Aura Pro headphones completely exceeded my expectations. The shipping was lightning fast, arriving in two days in premium eco-friendly packaging.",
    purchasedItem: "Aura Pro Wireless Headphones"
  },
  {
    id: "test-2",
    name: "Alex Ramirez",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    comment: "The real-time order tracking feature was incredibly smooth. Being able to see each stage from packing to out-for-delivery gave me total peace of mind.",
    purchasedItem: "Apex Ultra GPS Smartwatch"
  },
  {
    id: "test-3",
    name: "Chloe Chen",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    rating: 5,
    comment: "I love the clean design of the store and how fast checkout was. The ceramic mugs are genuinely handcrafted masterpieces in our kitchen.",
    purchasedItem: "Kyoto Stoneware Ceramic Mugs"
  }
];
