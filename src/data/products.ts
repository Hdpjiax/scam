export type ProductReview = {
  id: string;
  author_name: string;
  author_avatar?: string;
  rating: number;
  title?: string;
  content: string;
  created_at?: string;
  is_verified_purchase?: boolean;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  imageHover?: string;
  badge?: string;
  description: string;
  colors: string[];
  stock?: number;
  sku?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: ProductReview[];
  featured?: boolean;
  images?: string[];
};

export const products: Product[] = [
  {
    "id": 1,
    "name": "Loma Sensor Element",
    "category": "Smart Home",
    "price": 95,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/001-loma-sensor-element/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/001-loma-sensor-element/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/001-loma-sensor-element/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/001-loma-sensor-element/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/001-loma-sensor-element/room.jpg"
    ],
    "description": "A refined sensor shaped for quiet security, crafted in matte glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#d9c7ad",
      "#2f332e",
      "#7d8a76"
    ],
    "stock": 9,
    "sku": "NOM-0001",
    "rating": 4.6,
    "reviewCount": 25,
    "featured": true,
    "reviews": [
      {
        "id": "loma-sensor-element-1",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-1-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-04T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-sensor-element-2",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-1-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-05T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-sensor-element-3",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-1-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-06T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 2,
    "name": "Mira Thermostat Object",
    "category": "Smart Home",
    "price": 112,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/002-mira-thermostat-object/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/002-mira-thermostat-object/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/002-mira-thermostat-object/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/002-mira-thermostat-object/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/002-mira-thermostat-object/room.jpg"
    ],
    "description": "A refined thermostat shaped for air quality rituals, crafted in ceramic composite with a calm architectural presence for contemporary living.",
    "colors": [
      "#e9dfcf",
      "#744831",
      "#c0a16b"
    ],
    "stock": 14,
    "sku": "NOM-0002",
    "rating": 4.6,
    "reviewCount": 32,
    "featured": true,
    "reviews": [
      {
        "id": "mira-thermostat-object-1",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-2-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-07T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "mira-thermostat-object-2",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-2-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-08T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "mira-thermostat-object-3",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-2-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-09T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 3,
    "name": "Orion Switch House",
    "category": "Smart Home",
    "price": 129,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/003-orion-switch-house/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/003-orion-switch-house/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/003-orion-switch-house/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/003-orion-switch-house/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/003-orion-switch-house/room.jpg"
    ],
    "badge": "Low Stock",
    "description": "A refined switch shaped for daily automation, crafted in soft-touch polymer with a calm architectural presence for contemporary living.",
    "colors": [
      "#c8b293",
      "#202022",
      "#b37b50"
    ],
    "stock": 19,
    "sku": "NOM-0003",
    "rating": 4.7,
    "reviewCount": 39,
    "featured": true,
    "reviews": [
      {
        "id": "orion-switch-house-1",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-3-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-10T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "orion-switch-house-2",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-3-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-11T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "orion-switch-house-3",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-3-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-12T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 4,
    "name": "Noct Monitor Edition",
    "category": "Smart Home",
    "price": 146,
    "oldPrice": 274,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/004-noct-monitor-edition/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/004-noct-monitor-edition/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/004-noct-monitor-edition/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/004-noct-monitor-edition/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/004-noct-monitor-edition/room.jpg"
    ],
    "description": "A refined monitor shaped for evening scenes, crafted in anodized aluminum with a calm architectural presence for contemporary living.",
    "colors": [
      "#ebe7dc",
      "#6c7567",
      "#b95f3e"
    ],
    "stock": 24,
    "sku": "NOM-0004",
    "rating": 4.8,
    "reviewCount": 46,
    "featured": true,
    "reviews": [
      {
        "id": "noct-monitor-edition-1",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-4-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-13T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "noct-monitor-edition-2",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-4-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-14T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "noct-monitor-edition-3",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-4-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-15T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 5,
    "name": "Aven Panel Arc",
    "category": "Smart Home",
    "price": 163,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/005-aven-panel-arc/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/005-aven-panel-arc/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/005-aven-panel-arc/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/005-aven-panel-arc/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/005-aven-panel-arc/room.jpg"
    ],
    "description": "A refined panel shaped for low-friction control, crafted in brushed steel with a calm architectural presence for contemporary living.",
    "colors": [
      "#d5d0c4",
      "#4d382c",
      "#a6a998"
    ],
    "stock": 29,
    "sku": "NOM-0005",
    "rating": 4.8,
    "reviewCount": 53,
    "featured": true,
    "reviews": [
      {
        "id": "aven-panel-arc-1",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-5-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-16T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aven-panel-arc-2",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-5-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-17T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aven-panel-arc-3",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-5-2",
        "rating": 4,
        "title": "Designed with care",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-18T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 6,
    "name": "Eon Sensor Room",
    "category": "Smart Home",
    "price": 180,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/006-eon-sensor-room/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/006-eon-sensor-room/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/006-eon-sensor-room/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/006-eon-sensor-room/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/006-eon-sensor-room/room.jpg"
    ],
    "badge": "Made to Order",
    "description": "A refined sensor shaped for quiet security, crafted in matte glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#f6f0e6",
      "#34322d",
      "#a85e40"
    ],
    "stock": 34,
    "sku": "NOM-0006",
    "rating": 4.8,
    "reviewCount": 60,
    "featured": true,
    "reviews": [
      {
        "id": "eon-sensor-room-1",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-6-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-19T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "eon-sensor-room-2",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-6-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-20T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "eon-sensor-room-3",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-6-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-21T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 7,
    "name": "Rhea Thermostat Layer",
    "category": "Smart Home",
    "price": 197,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/007-rhea-thermostat-layer/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/007-rhea-thermostat-layer/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/007-rhea-thermostat-layer/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/007-rhea-thermostat-layer/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/007-rhea-thermostat-layer/room.jpg"
    ],
    "description": "A refined thermostat shaped for air quality rituals, crafted in ceramic composite with a calm architectural presence for contemporary living.",
    "colors": [
      "#ded6c8",
      "#202a28",
      "#8f6b52"
    ],
    "stock": 8,
    "sku": "NOM-0007",
    "rating": 4.9,
    "reviewCount": 67,
    "featured": true,
    "reviews": [
      {
        "id": "rhea-thermostat-layer-1",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-7-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-22T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rhea-thermostat-layer-2",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-7-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-23T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rhea-thermostat-layer-3",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-7-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-24T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 8,
    "name": "Atlas Switch Series",
    "category": "Smart Home",
    "price": 214,
    "oldPrice": 322,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/008-atlas-switch-series/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/008-atlas-switch-series/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/008-atlas-switch-series/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/008-atlas-switch-series/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/008-atlas-switch-series/room.jpg"
    ],
    "description": "A refined switch shaped for daily automation, crafted in soft-touch polymer with a calm architectural presence for contemporary living.",
    "colors": [
      "#e5d8c4",
      "#23303a",
      "#b37b50"
    ],
    "stock": 13,
    "sku": "NOM-0008",
    "rating": 5,
    "reviewCount": 74,
    "featured": true,
    "reviews": [
      {
        "id": "atlas-switch-series-1",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-8-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-25T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "atlas-switch-series-2",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-8-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-01T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "atlas-switch-series-3",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-8-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-02T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 9,
    "name": "Siena Monitor Form",
    "category": "Smart Home",
    "price": 231,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/009-siena-monitor-form/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/009-siena-monitor-form/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/009-siena-monitor-form/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/009-siena-monitor-form/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/009-siena-monitor-form/room.jpg"
    ],
    "badge": "Best Seller",
    "description": "A refined monitor shaped for evening scenes, crafted in anodized aluminum with a calm architectural presence for contemporary living.",
    "colors": [
      "#f0eadf",
      "#5d3b2e",
      "#c0a16b"
    ],
    "stock": 18,
    "sku": "NOM-0009",
    "rating": 4.5,
    "reviewCount": 81,
    "featured": true,
    "reviews": [
      {
        "id": "siena-monitor-form-1",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-9-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-03T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "siena-monitor-form-2",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-9-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-04T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "siena-monitor-form-3",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-9-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-05T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 10,
    "name": "Vale Panel Atelier",
    "category": "Smart Home",
    "price": 248,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/010-vale-panel-atelier/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/010-vale-panel-atelier/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/010-vale-panel-atelier/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/010-vale-panel-atelier/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/010-vale-panel-atelier/room.jpg"
    ],
    "description": "A refined panel shaped for low-friction control, crafted in brushed steel with a calm architectural presence for contemporary living.",
    "colors": [
      "#cfc2ad",
      "#191a17",
      "#d0a45d"
    ],
    "stock": 23,
    "sku": "NOM-0010",
    "rating": 4.6,
    "reviewCount": 88,
    "featured": true,
    "reviews": [
      {
        "id": "vale-panel-atelier-1",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-10-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-06T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vale-panel-atelier-2",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-10-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-07T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vale-panel-atelier-3",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-10-2",
        "rating": 4,
        "title": "Quiet luxury",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-08T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 11,
    "name": "Moss Sensor Mode",
    "category": "Smart Home",
    "price": 265,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/011-moss-sensor-mode/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/011-moss-sensor-mode/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/011-moss-sensor-mode/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/011-moss-sensor-mode/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/011-moss-sensor-mode/room.jpg"
    ],
    "description": "A refined sensor shaped for quiet security, crafted in matte glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#e7e0d5",
      "#6f7468",
      "#a85e40"
    ],
    "stock": 0,
    "sku": "NOM-0011",
    "rating": 4.6,
    "reviewCount": 95,
    "featured": true,
    "reviews": [
      {
        "id": "moss-sensor-mode-1",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-11-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-09T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "moss-sensor-mode-2",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-11-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-10T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "moss-sensor-mode-3",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-11-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-11T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 12,
    "name": "Linea Thermostat Studio",
    "category": "Smart Home",
    "price": 282,
    "oldPrice": 370,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/012-linea-thermostat-studio/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/012-linea-thermostat-studio/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/012-linea-thermostat-studio/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/012-linea-thermostat-studio/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/012-linea-thermostat-studio/room.jpg"
    ],
    "badge": "NOMA Icon",
    "description": "A refined thermostat shaped for air quality rituals, crafted in ceramic composite with a calm architectural presence for contemporary living.",
    "colors": [
      "#f1eee7",
      "#1f211d",
      "#a6a998"
    ],
    "stock": 33,
    "sku": "NOM-0012",
    "rating": 4.7,
    "reviewCount": 102,
    "featured": true,
    "reviews": [
      {
        "id": "linea-thermostat-studio-1",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-12-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-12T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "linea-thermostat-studio-2",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-12-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-13T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "linea-thermostat-studio-3",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-12-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-14T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 13,
    "name": "Astra Switch Reserve",
    "category": "Smart Home",
    "price": 299,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/013-astra-switch-reserve/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/013-astra-switch-reserve/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/013-astra-switch-reserve/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/013-astra-switch-reserve/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/013-astra-switch-reserve/room.jpg"
    ],
    "description": "A refined switch shaped for daily automation, crafted in soft-touch polymer with a calm architectural presence for contemporary living.",
    "colors": [
      "#d9c7ad",
      "#2f332e",
      "#7d8a76"
    ],
    "stock": 7,
    "sku": "NOM-0013",
    "rating": 4.8,
    "reviewCount": 109,
    "featured": true,
    "reviews": [
      {
        "id": "astra-switch-reserve-1",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-13-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-15T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "astra-switch-reserve-2",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-13-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-16T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "astra-switch-reserve-3",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-13-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-17T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 14,
    "name": "Sable Monitor Field",
    "category": "Smart Home",
    "price": 316,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/014-sable-monitor-field/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/014-sable-monitor-field/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/014-sable-monitor-field/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/014-sable-monitor-field/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/014-sable-monitor-field/room.jpg"
    ],
    "description": "A refined monitor shaped for evening scenes, crafted in anodized aluminum with a calm architectural presence for contemporary living.",
    "colors": [
      "#e9dfcf",
      "#744831",
      "#c0a16b"
    ],
    "stock": 12,
    "sku": "NOM-0014",
    "rating": 4.8,
    "reviewCount": 116,
    "featured": true,
    "reviews": [
      {
        "id": "sable-monitor-field-1",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-14-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-18T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "sable-monitor-field-2",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-14-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-19T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "sable-monitor-field-3",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-14-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-20T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 15,
    "name": "Cala Panel Set",
    "category": "Smart Home",
    "price": 333,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/015-cala-panel-set/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/015-cala-panel-set/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/015-cala-panel-set/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/015-cala-panel-set/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/015-cala-panel-set/room.jpg"
    ],
    "badge": "Carbon Neutral",
    "description": "A refined panel shaped for low-friction control, crafted in brushed steel with a calm architectural presence for contemporary living.",
    "colors": [
      "#c8b293",
      "#202022",
      "#b37b50"
    ],
    "stock": 17,
    "sku": "NOM-0015",
    "rating": 4.8,
    "reviewCount": 123,
    "featured": true,
    "reviews": [
      {
        "id": "cala-panel-set-1",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-15-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-21T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cala-panel-set-2",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-15-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-22T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cala-panel-set-3",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-15-2",
        "rating": 4,
        "title": "Feels custom",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-23T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 16,
    "name": "Vela Sensor Element",
    "category": "Smart Home",
    "price": 350,
    "oldPrice": 418,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/016-vela-sensor-element/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/016-vela-sensor-element/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/016-vela-sensor-element/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/016-vela-sensor-element/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/016-vela-sensor-element/room.jpg"
    ],
    "description": "A refined sensor shaped for quiet security, crafted in matte glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#ebe7dc",
      "#6c7567",
      "#b95f3e"
    ],
    "stock": 22,
    "sku": "NOM-0016",
    "rating": 4.9,
    "reviewCount": 130,
    "featured": true,
    "reviews": [
      {
        "id": "vela-sensor-element-1",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-16-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-24T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vela-sensor-element-2",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-16-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-25T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vela-sensor-element-3",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-16-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-01T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 17,
    "name": "Terra Thermostat Object",
    "category": "Smart Home",
    "price": 367,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/017-terra-thermostat-object/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/017-terra-thermostat-object/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/017-terra-thermostat-object/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/017-terra-thermostat-object/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/017-terra-thermostat-object/room.jpg"
    ],
    "description": "A refined thermostat shaped for air quality rituals, crafted in ceramic composite with a calm architectural presence for contemporary living.",
    "colors": [
      "#d5d0c4",
      "#4d382c",
      "#a6a998"
    ],
    "stock": 27,
    "sku": "NOM-0017",
    "rating": 5,
    "reviewCount": 137,
    "featured": false,
    "reviews": [
      {
        "id": "terra-thermostat-object-1",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-17-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-02T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "terra-thermostat-object-2",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-17-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-03T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "terra-thermostat-object-3",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-17-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-04T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 18,
    "name": "Solace Switch House",
    "category": "Smart Home",
    "price": 384,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/018-solace-switch-house/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/018-solace-switch-house/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/018-solace-switch-house/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/018-solace-switch-house/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/018-solace-switch-house/room.jpg"
    ],
    "badge": "Limited Run",
    "description": "A refined switch shaped for daily automation, crafted in soft-touch polymer with a calm architectural presence for contemporary living.",
    "colors": [
      "#f6f0e6",
      "#34322d",
      "#a85e40"
    ],
    "stock": 32,
    "sku": "NOM-0018",
    "rating": 4.5,
    "reviewCount": 144,
    "featured": false,
    "reviews": [
      {
        "id": "solace-switch-house-1",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-18-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-05T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "solace-switch-house-2",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-18-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-06T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "solace-switch-house-3",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-18-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-07T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 19,
    "name": "Arden Monitor Edition",
    "category": "Smart Home",
    "price": 401,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/019-arden-monitor-edition/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/019-arden-monitor-edition/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/019-arden-monitor-edition/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/019-arden-monitor-edition/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/019-arden-monitor-edition/room.jpg"
    ],
    "description": "A refined monitor shaped for evening scenes, crafted in anodized aluminum with a calm architectural presence for contemporary living.",
    "colors": [
      "#ded6c8",
      "#202a28",
      "#8f6b52"
    ],
    "stock": 6,
    "sku": "NOM-0019",
    "rating": 4.6,
    "reviewCount": 151,
    "featured": false,
    "reviews": [
      {
        "id": "arden-monitor-edition-1",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-19-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-08T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "arden-monitor-edition-2",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-19-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-09T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "arden-monitor-edition-3",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-19-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-10T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 20,
    "name": "Kanso Pendant Edition",
    "category": "Lighting",
    "price": 436,
    "oldPrice": 484,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/020-kanso-pendant-edition/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/020-kanso-pendant-edition/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/020-kanso-pendant-edition/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/020-kanso-pendant-edition/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/020-kanso-pendant-edition/room.jpg"
    ],
    "description": "A refined pendant shaped for reading corners, crafted in opal glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#e5d8c4",
      "#23303a",
      "#b37b50"
    ],
    "stock": 11,
    "sku": "NOM-0020",
    "rating": 4.6,
    "reviewCount": 158,
    "featured": true,
    "reviews": [
      {
        "id": "kanso-pendant-edition-1",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-20-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-11T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "kanso-pendant-edition-2",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-20-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-12T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "kanso-pendant-edition-3",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-20-2",
        "rating": 4,
        "title": "Better than expected",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-13T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 21,
    "name": "Aurel Table Lamp Arc",
    "category": "Lighting",
    "price": 453,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/021-aurel-table-lamp-arc/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/021-aurel-table-lamp-arc/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/021-aurel-table-lamp-arc/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/021-aurel-table-lamp-arc/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/021-aurel-table-lamp-arc/room.jpg"
    ],
    "badge": "Studio Pick",
    "description": "A refined table lamp shaped for soft arrivals, crafted in linen shade with a calm architectural presence for contemporary living.",
    "colors": [
      "#f0eadf",
      "#5d3b2e",
      "#c0a16b"
    ],
    "stock": 16,
    "sku": "NOM-0021",
    "rating": 4.7,
    "reviewCount": 165,
    "featured": false,
    "reviews": [
      {
        "id": "aurel-table-lamp-arc-1",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-21-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-14T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aurel-table-lamp-arc-2",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-21-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-15T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aurel-table-lamp-arc-3",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-21-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-16T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 22,
    "name": "Cove Lantern Room",
    "category": "Lighting",
    "price": 470,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/022-cove-lantern-room/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/022-cove-lantern-room/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/022-cove-lantern-room/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/022-cove-lantern-room/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/022-cove-lantern-room/room.jpg"
    ],
    "description": "A refined lantern shaped for late conversations, crafted in aged brass with a calm architectural presence for contemporary living.",
    "colors": [
      "#cfc2ad",
      "#191a17",
      "#d0a45d"
    ],
    "stock": 0,
    "sku": "NOM-0022",
    "rating": 4.8,
    "reviewCount": 172,
    "featured": false,
    "reviews": [
      {
        "id": "cove-lantern-room-1",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-22-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-17T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cove-lantern-room-2",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-22-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-18T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cove-lantern-room-3",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-22-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-19T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 23,
    "name": "Loma Rail Layer",
    "category": "Lighting",
    "price": 487,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/023-loma-rail-layer/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/023-loma-rail-layer/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/023-loma-rail-layer/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/023-loma-rail-layer/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/023-loma-rail-layer/room.jpg"
    ],
    "description": "A refined rail shaped for dinner light, crafted in hand-finished ceramic with a calm architectural presence for contemporary living.",
    "colors": [
      "#e7e0d5",
      "#6f7468",
      "#a85e40"
    ],
    "stock": 26,
    "sku": "NOM-0023",
    "rating": 4.8,
    "reviewCount": 179,
    "featured": false,
    "reviews": [
      {
        "id": "loma-rail-layer-1",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-23-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-20T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-rail-layer-2",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-23-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-21T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-rail-layer-3",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-23-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-22T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 24,
    "name": "Mira Shade Series",
    "category": "Lighting",
    "price": 504,
    "oldPrice": 632,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/024-mira-shade-series/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/024-mira-shade-series/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/024-mira-shade-series/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/024-mira-shade-series/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/024-mira-shade-series/room.jpg"
    ],
    "badge": "New Season",
    "description": "A refined shade shaped for gallery walls, crafted in powder-coated steel with a calm architectural presence for contemporary living.",
    "colors": [
      "#f1eee7",
      "#1f211d",
      "#a6a998"
    ],
    "stock": 31,
    "sku": "NOM-0024",
    "rating": 4.8,
    "reviewCount": 22,
    "featured": false,
    "reviews": [
      {
        "id": "mira-shade-series-1",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-24-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-23T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "mira-shade-series-2",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-24-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-24T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "mira-shade-series-3",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-24-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-25T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 25,
    "name": "Orion Pendant Form",
    "category": "Lighting",
    "price": 101,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/025-orion-pendant-form/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/025-orion-pendant-form/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/025-orion-pendant-form/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/025-orion-pendant-form/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/025-orion-pendant-form/room.jpg"
    ],
    "description": "A refined pendant shaped for reading corners, crafted in opal glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#d9c7ad",
      "#2f332e",
      "#7d8a76"
    ],
    "stock": 5,
    "sku": "NOM-0025",
    "rating": 4.9,
    "reviewCount": 29,
    "featured": false,
    "reviews": [
      {
        "id": "orion-pendant-form-1",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-25-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-01T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "orion-pendant-form-2",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-25-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-02T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "orion-pendant-form-3",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-25-2",
        "rating": 4,
        "title": "Worth the wait",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-03T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 26,
    "name": "Noct Table Lamp Atelier",
    "category": "Lighting",
    "price": 118,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/026-noct-table-lamp-atelier/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/026-noct-table-lamp-atelier/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/026-noct-table-lamp-atelier/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/026-noct-table-lamp-atelier/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/026-noct-table-lamp-atelier/room.jpg"
    ],
    "description": "A refined table lamp shaped for soft arrivals, crafted in linen shade with a calm architectural presence for contemporary living.",
    "colors": [
      "#e9dfcf",
      "#744831",
      "#c0a16b"
    ],
    "stock": 10,
    "sku": "NOM-0026",
    "rating": 5,
    "reviewCount": 36,
    "featured": false,
    "reviews": [
      {
        "id": "noct-table-lamp-atelier-1",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-26-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-04T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "noct-table-lamp-atelier-2",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-26-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-05T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "noct-table-lamp-atelier-3",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-26-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-06T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 27,
    "name": "Aven Lantern Mode",
    "category": "Lighting",
    "price": 135,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/027-aven-lantern-mode/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/027-aven-lantern-mode/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/027-aven-lantern-mode/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/027-aven-lantern-mode/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/027-aven-lantern-mode/room.jpg"
    ],
    "badge": "Low Stock",
    "description": "A refined lantern shaped for late conversations, crafted in aged brass with a calm architectural presence for contemporary living.",
    "colors": [
      "#c8b293",
      "#202022",
      "#b37b50"
    ],
    "stock": 15,
    "sku": "NOM-0027",
    "rating": 4.5,
    "reviewCount": 43,
    "featured": false,
    "reviews": [
      {
        "id": "aven-lantern-mode-1",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-27-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-07T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aven-lantern-mode-2",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-27-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-08T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aven-lantern-mode-3",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-27-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-09T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 28,
    "name": "Eon Rail Studio",
    "category": "Lighting",
    "price": 152,
    "oldPrice": 260,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/028-eon-rail-studio/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/028-eon-rail-studio/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/028-eon-rail-studio/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/028-eon-rail-studio/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/028-eon-rail-studio/room.jpg"
    ],
    "description": "A refined rail shaped for dinner light, crafted in hand-finished ceramic with a calm architectural presence for contemporary living.",
    "colors": [
      "#ebe7dc",
      "#6c7567",
      "#b95f3e"
    ],
    "stock": 20,
    "sku": "NOM-0028",
    "rating": 4.6,
    "reviewCount": 50,
    "featured": false,
    "reviews": [
      {
        "id": "eon-rail-studio-1",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-28-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-10T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "eon-rail-studio-2",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-28-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-11T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "eon-rail-studio-3",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-28-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-12T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 29,
    "name": "Rhea Shade Reserve",
    "category": "Lighting",
    "price": 169,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/029-rhea-shade-reserve/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/029-rhea-shade-reserve/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/029-rhea-shade-reserve/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/029-rhea-shade-reserve/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/029-rhea-shade-reserve/room.jpg"
    ],
    "description": "A refined shade shaped for gallery walls, crafted in powder-coated steel with a calm architectural presence for contemporary living.",
    "colors": [
      "#d5d0c4",
      "#4d382c",
      "#a6a998"
    ],
    "stock": 25,
    "sku": "NOM-0029",
    "rating": 4.6,
    "reviewCount": 57,
    "featured": false,
    "reviews": [
      {
        "id": "rhea-shade-reserve-1",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-29-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-13T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rhea-shade-reserve-2",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-29-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-14T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rhea-shade-reserve-3",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-29-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-15T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 30,
    "name": "Atlas Pendant Field",
    "category": "Lighting",
    "price": 186,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/030-atlas-pendant-field/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/030-atlas-pendant-field/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/030-atlas-pendant-field/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/030-atlas-pendant-field/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/030-atlas-pendant-field/room.jpg"
    ],
    "badge": "Made to Order",
    "description": "A refined pendant shaped for reading corners, crafted in opal glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#f6f0e6",
      "#34322d",
      "#a85e40"
    ],
    "stock": 30,
    "sku": "NOM-0030",
    "rating": 4.7,
    "reviewCount": 64,
    "featured": true,
    "reviews": [
      {
        "id": "atlas-pendant-field-1",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-30-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-16T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "atlas-pendant-field-2",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-30-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-17T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "atlas-pendant-field-3",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-30-2",
        "rating": 4,
        "title": "Beautifully restrained",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-18T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 31,
    "name": "Siena Table Lamp Set",
    "category": "Lighting",
    "price": 203,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/031-siena-table-lamp-set/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/031-siena-table-lamp-set/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/031-siena-table-lamp-set/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/031-siena-table-lamp-set/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/031-siena-table-lamp-set/room.jpg"
    ],
    "description": "A refined table lamp shaped for soft arrivals, crafted in linen shade with a calm architectural presence for contemporary living.",
    "colors": [
      "#ded6c8",
      "#202a28",
      "#8f6b52"
    ],
    "stock": 4,
    "sku": "NOM-0031",
    "rating": 4.8,
    "reviewCount": 71,
    "featured": false,
    "reviews": [
      {
        "id": "siena-table-lamp-set-1",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-31-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-19T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "siena-table-lamp-set-2",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-31-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-20T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "siena-table-lamp-set-3",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-31-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-21T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 32,
    "name": "Vale Lantern Element",
    "category": "Lighting",
    "price": 220,
    "oldPrice": 308,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/032-vale-lantern-element/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/032-vale-lantern-element/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/032-vale-lantern-element/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/032-vale-lantern-element/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/032-vale-lantern-element/room.jpg"
    ],
    "description": "A refined lantern shaped for late conversations, crafted in aged brass with a calm architectural presence for contemporary living.",
    "colors": [
      "#e5d8c4",
      "#23303a",
      "#b37b50"
    ],
    "stock": 9,
    "sku": "NOM-0032",
    "rating": 4.8,
    "reviewCount": 78,
    "featured": false,
    "reviews": [
      {
        "id": "vale-lantern-element-1",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-32-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-22T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vale-lantern-element-2",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-32-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-23T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vale-lantern-element-3",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-32-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-24T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 33,
    "name": "Moss Rail Object",
    "category": "Lighting",
    "price": 237,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/033-moss-rail-object/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/033-moss-rail-object/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/033-moss-rail-object/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/033-moss-rail-object/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/033-moss-rail-object/room.jpg"
    ],
    "badge": "Best Seller",
    "description": "A refined rail shaped for dinner light, crafted in hand-finished ceramic with a calm architectural presence for contemporary living.",
    "colors": [
      "#f0eadf",
      "#5d3b2e",
      "#c0a16b"
    ],
    "stock": 0,
    "sku": "NOM-0033",
    "rating": 4.8,
    "reviewCount": 85,
    "featured": false,
    "reviews": [
      {
        "id": "moss-rail-object-1",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-33-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-25T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "moss-rail-object-2",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-33-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-01T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "moss-rail-object-3",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-33-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-02T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 34,
    "name": "Linea Shade House",
    "category": "Lighting",
    "price": 254,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/034-linea-shade-house/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/034-linea-shade-house/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/034-linea-shade-house/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/034-linea-shade-house/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/034-linea-shade-house/room.jpg"
    ],
    "description": "A refined shade shaped for gallery walls, crafted in powder-coated steel with a calm architectural presence for contemporary living.",
    "colors": [
      "#cfc2ad",
      "#191a17",
      "#d0a45d"
    ],
    "stock": 19,
    "sku": "NOM-0034",
    "rating": 4.9,
    "reviewCount": 92,
    "featured": false,
    "reviews": [
      {
        "id": "linea-shade-house-1",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-34-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-03T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "linea-shade-house-2",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-34-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-04T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "linea-shade-house-3",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-34-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-05T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 35,
    "name": "Astra Pendant Edition",
    "category": "Lighting",
    "price": 271,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/035-astra-pendant-edition/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/035-astra-pendant-edition/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/035-astra-pendant-edition/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/035-astra-pendant-edition/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/035-astra-pendant-edition/room.jpg"
    ],
    "description": "A refined pendant shaped for reading corners, crafted in opal glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#e7e0d5",
      "#6f7468",
      "#a85e40"
    ],
    "stock": 24,
    "sku": "NOM-0035",
    "rating": 5,
    "reviewCount": 99,
    "featured": false,
    "reviews": [
      {
        "id": "astra-pendant-edition-1",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-35-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-06T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "astra-pendant-edition-2",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-35-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-07T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "astra-pendant-edition-3",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-35-2",
        "rating": 4,
        "title": "Precise and tactile",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-08T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 36,
    "name": "Sable Table Lamp Arc",
    "category": "Lighting",
    "price": 288,
    "oldPrice": 356,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/036-sable-table-lamp-arc/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/036-sable-table-lamp-arc/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/036-sable-table-lamp-arc/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/036-sable-table-lamp-arc/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/036-sable-table-lamp-arc/room.jpg"
    ],
    "badge": "NOMA Icon",
    "description": "A refined table lamp shaped for soft arrivals, crafted in linen shade with a calm architectural presence for contemporary living.",
    "colors": [
      "#f1eee7",
      "#1f211d",
      "#a6a998"
    ],
    "stock": 29,
    "sku": "NOM-0036",
    "rating": 4.5,
    "reviewCount": 106,
    "featured": false,
    "reviews": [
      {
        "id": "sable-table-lamp-arc-1",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-36-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-09T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "sable-table-lamp-arc-2",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-36-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-10T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "sable-table-lamp-arc-3",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-36-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-11T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 37,
    "name": "Cala Lantern Room",
    "category": "Lighting",
    "price": 305,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/037-cala-lantern-room/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/037-cala-lantern-room/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/037-cala-lantern-room/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/037-cala-lantern-room/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/037-cala-lantern-room/room.jpg"
    ],
    "description": "A refined lantern shaped for late conversations, crafted in aged brass with a calm architectural presence for contemporary living.",
    "colors": [
      "#d9c7ad",
      "#2f332e",
      "#7d8a76"
    ],
    "stock": 34,
    "sku": "NOM-0037",
    "rating": 4.6,
    "reviewCount": 113,
    "featured": false,
    "reviews": [
      {
        "id": "cala-lantern-room-1",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-37-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-12T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cala-lantern-room-2",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-37-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-13T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cala-lantern-room-3",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-37-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-14T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 38,
    "name": "Vela Rail Layer",
    "category": "Lighting",
    "price": 322,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/038-vela-rail-layer/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/038-vela-rail-layer/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/038-vela-rail-layer/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/038-vela-rail-layer/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/038-vela-rail-layer/room.jpg"
    ],
    "description": "A refined rail shaped for dinner light, crafted in hand-finished ceramic with a calm architectural presence for contemporary living.",
    "colors": [
      "#e9dfcf",
      "#744831",
      "#c0a16b"
    ],
    "stock": 8,
    "sku": "NOM-0038",
    "rating": 4.6,
    "reviewCount": 120,
    "featured": false,
    "reviews": [
      {
        "id": "vela-rail-layer-1",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-38-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-15T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vela-rail-layer-2",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-38-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-16T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vela-rail-layer-3",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-38-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-17T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 39,
    "name": "Nori Ottoman Layer",
    "category": "Furniture",
    "price": 603,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/039-nori-ottoman-layer/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/039-nori-ottoman-layer/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/039-nori-ottoman-layer/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/039-nori-ottoman-layer/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/039-nori-ottoman-layer/room.jpg"
    ],
    "badge": "Carbon Neutral",
    "description": "A refined ottoman shaped for quiet reading, crafted in vegan leather with a calm architectural presence for contemporary living.",
    "colors": [
      "#c8b293",
      "#202022",
      "#b37b50"
    ],
    "stock": 13,
    "sku": "NOM-0039",
    "rating": 4.7,
    "reviewCount": 127,
    "featured": false,
    "reviews": [
      {
        "id": "nori-ottoman-layer-1",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-39-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-18T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "nori-ottoman-layer-2",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-39-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-19T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "nori-ottoman-layer-3",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-39-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-20T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 40,
    "name": "Elio Console Series",
    "category": "Furniture",
    "price": 620,
    "oldPrice": 668,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/040-elio-console-series/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/040-elio-console-series/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/040-elio-console-series/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/040-elio-console-series/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/040-elio-console-series/room.jpg"
    ],
    "description": "A refined console shaped for hosting nights, crafted in boucle upholstery with a calm architectural presence for contemporary living.",
    "colors": [
      "#ebe7dc",
      "#6c7567",
      "#b95f3e"
    ],
    "stock": 18,
    "sku": "NOM-0040",
    "rating": 4.8,
    "reviewCount": 134,
    "featured": true,
    "reviews": [
      {
        "id": "elio-console-series-1",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-40-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-21T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "elio-console-series-2",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-40-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-22T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "elio-console-series-3",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-40-2",
        "rating": 4,
        "title": "Instantly changed the room",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-23T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 41,
    "name": "Rune Side Table Form",
    "category": "Furniture",
    "price": 637,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/041-rune-side-table-form/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/041-rune-side-table-form/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/041-rune-side-table-form/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/041-rune-side-table-form/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/041-rune-side-table-form/room.jpg"
    ],
    "description": "A refined side table shaped for entryway order, crafted in solid oak with a calm architectural presence for contemporary living.",
    "colors": [
      "#d5d0c4",
      "#4d382c",
      "#a6a998"
    ],
    "stock": 23,
    "sku": "NOM-0041",
    "rating": 4.8,
    "reviewCount": 141,
    "featured": false,
    "reviews": [
      {
        "id": "rune-side-table-form-1",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-41-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-24T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rune-side-table-form-2",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-41-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-25T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rune-side-table-form-3",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-41-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-01T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 42,
    "name": "Kanso Stool Atelier",
    "category": "Furniture",
    "price": 654,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/042-kanso-stool-atelier/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/042-kanso-stool-atelier/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/042-kanso-stool-atelier/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/042-kanso-stool-atelier/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/042-kanso-stool-atelier/room.jpg"
    ],
    "badge": "Limited Run",
    "description": "A refined stool shaped for slow mornings, crafted in ash wood with a calm architectural presence for contemporary living.",
    "colors": [
      "#f6f0e6",
      "#34322d",
      "#a85e40"
    ],
    "stock": 28,
    "sku": "NOM-0042",
    "rating": 4.8,
    "reviewCount": 148,
    "featured": false,
    "reviews": [
      {
        "id": "kanso-stool-atelier-1",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-42-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-02T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "kanso-stool-atelier-2",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-42-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-03T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "kanso-stool-atelier-3",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-42-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-04T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 43,
    "name": "Aurel Desk Mode",
    "category": "Furniture",
    "price": 671,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/043-aurel-desk-mode/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/043-aurel-desk-mode/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/043-aurel-desk-mode/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/043-aurel-desk-mode/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/043-aurel-desk-mode/room.jpg"
    ],
    "description": "A refined desk shaped for focused work, crafted in walnut veneer with a calm architectural presence for contemporary living.",
    "colors": [
      "#ded6c8",
      "#202a28",
      "#8f6b52"
    ],
    "stock": 33,
    "sku": "NOM-0043",
    "rating": 4.9,
    "reviewCount": 155,
    "featured": false,
    "reviews": [
      {
        "id": "aurel-desk-mode-1",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-43-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-05T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aurel-desk-mode-2",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-43-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-06T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aurel-desk-mode-3",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-43-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-07T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 44,
    "name": "Cove Ottoman Studio",
    "category": "Furniture",
    "price": 688,
    "oldPrice": 816,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/044-cove-ottoman-studio/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/044-cove-ottoman-studio/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/044-cove-ottoman-studio/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/044-cove-ottoman-studio/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/044-cove-ottoman-studio/room.jpg"
    ],
    "description": "A refined ottoman shaped for quiet reading, crafted in vegan leather with a calm architectural presence for contemporary living.",
    "colors": [
      "#e5d8c4",
      "#23303a",
      "#b37b50"
    ],
    "stock": 0,
    "sku": "NOM-0044",
    "rating": 5,
    "reviewCount": 162,
    "featured": false,
    "reviews": [
      {
        "id": "cove-ottoman-studio-1",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-44-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-08T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cove-ottoman-studio-2",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-44-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-09T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cove-ottoman-studio-3",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-44-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-10T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 45,
    "name": "Loma Console Reserve",
    "category": "Furniture",
    "price": 705,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/045-loma-console-reserve/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/045-loma-console-reserve/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/045-loma-console-reserve/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/045-loma-console-reserve/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/045-loma-console-reserve/room.jpg"
    ],
    "badge": "Studio Pick",
    "description": "A refined console shaped for hosting nights, crafted in boucle upholstery with a calm architectural presence for contemporary living.",
    "colors": [
      "#f0eadf",
      "#5d3b2e",
      "#c0a16b"
    ],
    "stock": 12,
    "sku": "NOM-0045",
    "rating": 4.5,
    "reviewCount": 169,
    "featured": false,
    "reviews": [
      {
        "id": "loma-console-reserve-1",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-45-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-11T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-console-reserve-2",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-45-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-12T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-console-reserve-3",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-45-2",
        "rating": 4,
        "title": "Designed with care",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-13T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 46,
    "name": "Mira Side Table Field",
    "category": "Furniture",
    "price": 722,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/046-mira-side-table-field/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/046-mira-side-table-field/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/046-mira-side-table-field/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/046-mira-side-table-field/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/046-mira-side-table-field/room.jpg"
    ],
    "description": "A refined side table shaped for entryway order, crafted in solid oak with a calm architectural presence for contemporary living.",
    "colors": [
      "#cfc2ad",
      "#191a17",
      "#d0a45d"
    ],
    "stock": 17,
    "sku": "NOM-0046",
    "rating": 4.6,
    "reviewCount": 176,
    "featured": false,
    "reviews": [
      {
        "id": "mira-side-table-field-1",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-46-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-14T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "mira-side-table-field-2",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-46-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-15T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "mira-side-table-field-3",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-46-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-16T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 47,
    "name": "Orion Stool Set",
    "category": "Furniture",
    "price": 739,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/047-orion-stool-set/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/047-orion-stool-set/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/047-orion-stool-set/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/047-orion-stool-set/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/047-orion-stool-set/room.jpg"
    ],
    "description": "A refined stool shaped for slow mornings, crafted in ash wood with a calm architectural presence for contemporary living.",
    "colors": [
      "#e7e0d5",
      "#6f7468",
      "#a85e40"
    ],
    "stock": 22,
    "sku": "NOM-0047",
    "rating": 4.6,
    "reviewCount": 19,
    "featured": false,
    "reviews": [
      {
        "id": "orion-stool-set-1",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-47-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-17T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "orion-stool-set-2",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-47-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-18T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "orion-stool-set-3",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-47-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-19T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 48,
    "name": "Noct Desk Element",
    "category": "Furniture",
    "price": 756,
    "oldPrice": 864,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/048-noct-desk-element/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/048-noct-desk-element/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/048-noct-desk-element/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/048-noct-desk-element/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/048-noct-desk-element/room.jpg"
    ],
    "badge": "New Season",
    "description": "A refined desk shaped for focused work, crafted in walnut veneer with a calm architectural presence for contemporary living.",
    "colors": [
      "#f1eee7",
      "#1f211d",
      "#a6a998"
    ],
    "stock": 27,
    "sku": "NOM-0048",
    "rating": 4.7,
    "reviewCount": 26,
    "featured": false,
    "reviews": [
      {
        "id": "noct-desk-element-1",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-48-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-20T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "noct-desk-element-2",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-48-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-21T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "noct-desk-element-3",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-48-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-22T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 49,
    "name": "Aven Ottoman Object",
    "category": "Furniture",
    "price": 773,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/049-aven-ottoman-object/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/049-aven-ottoman-object/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/049-aven-ottoman-object/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/049-aven-ottoman-object/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/049-aven-ottoman-object/room.jpg"
    ],
    "description": "A refined ottoman shaped for quiet reading, crafted in vegan leather with a calm architectural presence for contemporary living.",
    "colors": [
      "#d9c7ad",
      "#2f332e",
      "#7d8a76"
    ],
    "stock": 32,
    "sku": "NOM-0049",
    "rating": 4.8,
    "reviewCount": 33,
    "featured": false,
    "reviews": [
      {
        "id": "aven-ottoman-object-1",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-49-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-23T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aven-ottoman-object-2",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-49-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-24T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aven-ottoman-object-3",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-49-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-25T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 50,
    "name": "Eon Console House",
    "category": "Furniture",
    "price": 370,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/050-eon-console-house/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/050-eon-console-house/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/050-eon-console-house/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/050-eon-console-house/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/050-eon-console-house/room.jpg"
    ],
    "description": "A refined console shaped for hosting nights, crafted in boucle upholstery with a calm architectural presence for contemporary living.",
    "colors": [
      "#e9dfcf",
      "#744831",
      "#c0a16b"
    ],
    "stock": 6,
    "sku": "NOM-0050",
    "rating": 4.8,
    "reviewCount": 40,
    "featured": true,
    "reviews": [
      {
        "id": "eon-console-house-1",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-50-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-01T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "eon-console-house-2",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-50-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-02T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "eon-console-house-3",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-50-2",
        "rating": 4,
        "title": "Quiet luxury",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-03T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 51,
    "name": "Rhea Side Table Edition",
    "category": "Furniture",
    "price": 387,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/051-rhea-side-table-edition/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/051-rhea-side-table-edition/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/051-rhea-side-table-edition/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/051-rhea-side-table-edition/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/051-rhea-side-table-edition/room.jpg"
    ],
    "badge": "Low Stock",
    "description": "A refined side table shaped for entryway order, crafted in solid oak with a calm architectural presence for contemporary living.",
    "colors": [
      "#c8b293",
      "#202022",
      "#b37b50"
    ],
    "stock": 11,
    "sku": "NOM-0051",
    "rating": 4.8,
    "reviewCount": 47,
    "featured": false,
    "reviews": [
      {
        "id": "rhea-side-table-edition-1",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-51-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-04T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rhea-side-table-edition-2",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-51-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-05T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rhea-side-table-edition-3",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-51-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-06T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 52,
    "name": "Atlas Stool Arc",
    "category": "Furniture",
    "price": 404,
    "oldPrice": 492,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/052-atlas-stool-arc/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/052-atlas-stool-arc/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/052-atlas-stool-arc/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/052-atlas-stool-arc/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/052-atlas-stool-arc/room.jpg"
    ],
    "description": "A refined stool shaped for slow mornings, crafted in ash wood with a calm architectural presence for contemporary living.",
    "colors": [
      "#ebe7dc",
      "#6c7567",
      "#b95f3e"
    ],
    "stock": 16,
    "sku": "NOM-0052",
    "rating": 4.9,
    "reviewCount": 54,
    "featured": false,
    "reviews": [
      {
        "id": "atlas-stool-arc-1",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-52-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-07T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "atlas-stool-arc-2",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-52-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-08T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "atlas-stool-arc-3",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-52-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-09T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 53,
    "name": "Siena Desk Room",
    "category": "Furniture",
    "price": 421,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/053-siena-desk-room/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/053-siena-desk-room/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/053-siena-desk-room/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/053-siena-desk-room/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/053-siena-desk-room/room.jpg"
    ],
    "description": "A refined desk shaped for focused work, crafted in walnut veneer with a calm architectural presence for contemporary living.",
    "colors": [
      "#d5d0c4",
      "#4d382c",
      "#a6a998"
    ],
    "stock": 21,
    "sku": "NOM-0053",
    "rating": 5,
    "reviewCount": 61,
    "featured": false,
    "reviews": [
      {
        "id": "siena-desk-room-1",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-53-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-10T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "siena-desk-room-2",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-53-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-11T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "siena-desk-room-3",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-53-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-12T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 54,
    "name": "Vale Ottoman Layer",
    "category": "Furniture",
    "price": 438,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/054-vale-ottoman-layer/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/054-vale-ottoman-layer/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/054-vale-ottoman-layer/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/054-vale-ottoman-layer/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/054-vale-ottoman-layer/room.jpg"
    ],
    "badge": "Made to Order",
    "description": "A refined ottoman shaped for quiet reading, crafted in vegan leather with a calm architectural presence for contemporary living.",
    "colors": [
      "#f6f0e6",
      "#34322d",
      "#a85e40"
    ],
    "stock": 26,
    "sku": "NOM-0054",
    "rating": 4.5,
    "reviewCount": 68,
    "featured": false,
    "reviews": [
      {
        "id": "vale-ottoman-layer-1",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-54-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-13T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vale-ottoman-layer-2",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-54-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-14T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vale-ottoman-layer-3",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-54-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-15T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 55,
    "name": "Moss Console Series",
    "category": "Furniture",
    "price": 455,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/055-moss-console-series/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/055-moss-console-series/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/055-moss-console-series/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/055-moss-console-series/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/055-moss-console-series/room.jpg"
    ],
    "description": "A refined console shaped for hosting nights, crafted in boucle upholstery with a calm architectural presence for contemporary living.",
    "colors": [
      "#ded6c8",
      "#202a28",
      "#8f6b52"
    ],
    "stock": 0,
    "sku": "NOM-0055",
    "rating": 4.6,
    "reviewCount": 75,
    "featured": false,
    "reviews": [
      {
        "id": "moss-console-series-1",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-55-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-16T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "moss-console-series-2",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-55-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-17T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "moss-console-series-3",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-55-2",
        "rating": 4,
        "title": "Feels custom",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-18T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 56,
    "name": "Linea Side Table Form",
    "category": "Furniture",
    "price": 472,
    "oldPrice": 540,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/056-linea-side-table-form/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/056-linea-side-table-form/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/056-linea-side-table-form/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/056-linea-side-table-form/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/056-linea-side-table-form/room.jpg"
    ],
    "description": "A refined side table shaped for entryway order, crafted in solid oak with a calm architectural presence for contemporary living.",
    "colors": [
      "#e5d8c4",
      "#23303a",
      "#b37b50"
    ],
    "stock": 5,
    "sku": "NOM-0056",
    "rating": 4.6,
    "reviewCount": 82,
    "featured": false,
    "reviews": [
      {
        "id": "linea-side-table-form-1",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-56-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-19T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "linea-side-table-form-2",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-56-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-20T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "linea-side-table-form-3",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-56-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-21T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 57,
    "name": "Astra Stool Atelier",
    "category": "Furniture",
    "price": 489,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/057-astra-stool-atelier/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/057-astra-stool-atelier/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/057-astra-stool-atelier/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/057-astra-stool-atelier/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/057-astra-stool-atelier/room.jpg"
    ],
    "badge": "Best Seller",
    "description": "A refined stool shaped for slow mornings, crafted in ash wood with a calm architectural presence for contemporary living.",
    "colors": [
      "#f0eadf",
      "#5d3b2e",
      "#c0a16b"
    ],
    "stock": 10,
    "sku": "NOM-0057",
    "rating": 4.7,
    "reviewCount": 89,
    "featured": false,
    "reviews": [
      {
        "id": "astra-stool-atelier-1",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-57-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-22T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "astra-stool-atelier-2",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-57-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-23T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "astra-stool-atelier-3",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-57-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-24T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 58,
    "name": "Terra Object Atelier",
    "category": "Decor",
    "price": 198,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/058-terra-object-atelier/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/058-terra-object-atelier/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/058-terra-object-atelier/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/058-terra-object-atelier/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/058-terra-object-atelier/room.jpg"
    ],
    "description": "A refined object shaped for quiet corners, crafted in cast metal with a calm architectural presence for contemporary living.",
    "colors": [
      "#cfc2ad",
      "#191a17",
      "#d0a45d"
    ],
    "stock": 15,
    "sku": "NOM-0058",
    "rating": 4.8,
    "reviewCount": 96,
    "featured": false,
    "reviews": [
      {
        "id": "terra-object-atelier-1",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-58-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-25T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "terra-object-atelier-2",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-58-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-01T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "terra-object-atelier-3",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-58-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-02T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 59,
    "name": "Solace Vase Mode",
    "category": "Decor",
    "price": 215,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/059-solace-vase-mode/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/059-solace-vase-mode/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/059-solace-vase-mode/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/059-solace-vase-mode/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/059-solace-vase-mode/room.jpg"
    ],
    "description": "A refined vase shaped for shelf composition, crafted in travertine with a calm architectural presence for contemporary living.",
    "colors": [
      "#e7e0d5",
      "#6f7468",
      "#a85e40"
    ],
    "stock": 20,
    "sku": "NOM-0059",
    "rating": 4.8,
    "reviewCount": 103,
    "featured": false,
    "reviews": [
      {
        "id": "solace-vase-mode-1",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-59-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-03T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "solace-vase-mode-2",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-59-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-04T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "solace-vase-mode-3",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-59-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-05T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 60,
    "name": "Arden Tray Studio",
    "category": "Decor",
    "price": 232,
    "oldPrice": 280,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/060-arden-tray-studio/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/060-arden-tray-studio/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/060-arden-tray-studio/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/060-arden-tray-studio/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/060-arden-tray-studio/room.jpg"
    ],
    "badge": "NOMA Icon",
    "description": "A refined tray shaped for tablescapes, crafted in recycled glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#f1eee7",
      "#1f211d",
      "#a6a998"
    ],
    "stock": 25,
    "sku": "NOM-0060",
    "rating": 4.8,
    "reviewCount": 110,
    "featured": true,
    "reviews": [
      {
        "id": "arden-tray-studio-1",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-60-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-06T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "arden-tray-studio-2",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-60-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-07T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "arden-tray-studio-3",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-60-2",
        "rating": 4,
        "title": "Better than expected",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-08T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 61,
    "name": "Nori Totem Reserve",
    "category": "Decor",
    "price": 249,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/061-nori-totem-reserve/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/061-nori-totem-reserve/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/061-nori-totem-reserve/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/061-nori-totem-reserve/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/061-nori-totem-reserve/room.jpg"
    ],
    "description": "A refined totem shaped for seasonal styling, crafted in smoked mirror with a calm architectural presence for contemporary living.",
    "colors": [
      "#d9c7ad",
      "#2f332e",
      "#7d8a76"
    ],
    "stock": 30,
    "sku": "NOM-0061",
    "rating": 4.9,
    "reviewCount": 117,
    "featured": false,
    "reviews": [
      {
        "id": "nori-totem-reserve-1",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-61-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-09T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "nori-totem-reserve-2",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-61-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-10T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "nori-totem-reserve-3",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-61-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-11T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 62,
    "name": "Elio Vessel Field",
    "category": "Decor",
    "price": 266,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/062-elio-vessel-field/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/062-elio-vessel-field/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/062-elio-vessel-field/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/062-elio-vessel-field/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/062-elio-vessel-field/room.jpg"
    ],
    "description": "A refined vessel shaped for entry moments, crafted in stoneware with a calm architectural presence for contemporary living.",
    "colors": [
      "#e9dfcf",
      "#744831",
      "#c0a16b"
    ],
    "stock": 4,
    "sku": "NOM-0062",
    "rating": 5,
    "reviewCount": 124,
    "featured": false,
    "reviews": [
      {
        "id": "elio-vessel-field-1",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-62-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-12T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "elio-vessel-field-2",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-62-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-13T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "elio-vessel-field-3",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-62-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-14T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 63,
    "name": "Rune Object Set",
    "category": "Decor",
    "price": 283,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/063-rune-object-set/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/063-rune-object-set/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/063-rune-object-set/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/063-rune-object-set/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/063-rune-object-set/room.jpg"
    ],
    "badge": "Carbon Neutral",
    "description": "A refined object shaped for quiet corners, crafted in cast metal with a calm architectural presence for contemporary living.",
    "colors": [
      "#c8b293",
      "#202022",
      "#b37b50"
    ],
    "stock": 9,
    "sku": "NOM-0063",
    "rating": 4.5,
    "reviewCount": 131,
    "featured": false,
    "reviews": [
      {
        "id": "rune-object-set-1",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-63-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-15T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rune-object-set-2",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-63-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-16T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rune-object-set-3",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-63-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-17T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 64,
    "name": "Kanso Vase Element",
    "category": "Decor",
    "price": 300,
    "oldPrice": 428,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/064-kanso-vase-element/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/064-kanso-vase-element/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/064-kanso-vase-element/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/064-kanso-vase-element/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/064-kanso-vase-element/room.jpg"
    ],
    "description": "A refined vase shaped for shelf composition, crafted in travertine with a calm architectural presence for contemporary living.",
    "colors": [
      "#ebe7dc",
      "#6c7567",
      "#b95f3e"
    ],
    "stock": 14,
    "sku": "NOM-0064",
    "rating": 4.6,
    "reviewCount": 138,
    "featured": false,
    "reviews": [
      {
        "id": "kanso-vase-element-1",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-64-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-18T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "kanso-vase-element-2",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-64-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-19T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "kanso-vase-element-3",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-64-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-20T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 65,
    "name": "Aurel Tray Object",
    "category": "Decor",
    "price": 317,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/065-aurel-tray-object/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/065-aurel-tray-object/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/065-aurel-tray-object/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/065-aurel-tray-object/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/065-aurel-tray-object/room.jpg"
    ],
    "description": "A refined tray shaped for tablescapes, crafted in recycled glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#d5d0c4",
      "#4d382c",
      "#a6a998"
    ],
    "stock": 19,
    "sku": "NOM-0065",
    "rating": 4.6,
    "reviewCount": 145,
    "featured": false,
    "reviews": [
      {
        "id": "aurel-tray-object-1",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-65-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-21T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aurel-tray-object-2",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-65-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-22T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aurel-tray-object-3",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-65-2",
        "rating": 4,
        "title": "Worth the wait",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-23T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 66,
    "name": "Cove Totem House",
    "category": "Decor",
    "price": 334,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/066-cove-totem-house/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/066-cove-totem-house/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/066-cove-totem-house/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/066-cove-totem-house/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/066-cove-totem-house/room.jpg"
    ],
    "badge": "Limited Run",
    "description": "A refined totem shaped for seasonal styling, crafted in smoked mirror with a calm architectural presence for contemporary living.",
    "colors": [
      "#f6f0e6",
      "#34322d",
      "#a85e40"
    ],
    "stock": 0,
    "sku": "NOM-0066",
    "rating": 4.7,
    "reviewCount": 152,
    "featured": false,
    "reviews": [
      {
        "id": "cove-totem-house-1",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-66-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-24T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cove-totem-house-2",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-66-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-25T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cove-totem-house-3",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-66-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-01T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 67,
    "name": "Loma Vessel Edition",
    "category": "Decor",
    "price": 351,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/067-loma-vessel-edition/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/067-loma-vessel-edition/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/067-loma-vessel-edition/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/067-loma-vessel-edition/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/067-loma-vessel-edition/room.jpg"
    ],
    "description": "A refined vessel shaped for entry moments, crafted in stoneware with a calm architectural presence for contemporary living.",
    "colors": [
      "#ded6c8",
      "#202a28",
      "#8f6b52"
    ],
    "stock": 29,
    "sku": "NOM-0067",
    "rating": 4.8,
    "reviewCount": 159,
    "featured": false,
    "reviews": [
      {
        "id": "loma-vessel-edition-1",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-67-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-02T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-vessel-edition-2",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-67-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-03T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-vessel-edition-3",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-67-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-04T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 68,
    "name": "Mira Object Arc",
    "category": "Decor",
    "price": 368,
    "oldPrice": 476,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/068-mira-object-arc/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/068-mira-object-arc/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/068-mira-object-arc/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/068-mira-object-arc/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/068-mira-object-arc/room.jpg"
    ],
    "description": "A refined object shaped for quiet corners, crafted in cast metal with a calm architectural presence for contemporary living.",
    "colors": [
      "#e5d8c4",
      "#23303a",
      "#b37b50"
    ],
    "stock": 34,
    "sku": "NOM-0068",
    "rating": 4.8,
    "reviewCount": 166,
    "featured": false,
    "reviews": [
      {
        "id": "mira-object-arc-1",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-68-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-05T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "mira-object-arc-2",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-68-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-06T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "mira-object-arc-3",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-68-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-07T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 69,
    "name": "Orion Vase Room",
    "category": "Decor",
    "price": 385,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/069-orion-vase-room/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/069-orion-vase-room/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/069-orion-vase-room/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/069-orion-vase-room/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/069-orion-vase-room/room.jpg"
    ],
    "badge": "Studio Pick",
    "description": "A refined vase shaped for shelf composition, crafted in travertine with a calm architectural presence for contemporary living.",
    "colors": [
      "#f0eadf",
      "#5d3b2e",
      "#c0a16b"
    ],
    "stock": 8,
    "sku": "NOM-0069",
    "rating": 4.8,
    "reviewCount": 173,
    "featured": false,
    "reviews": [
      {
        "id": "orion-vase-room-1",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-69-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-08T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "orion-vase-room-2",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-69-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-09T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "orion-vase-room-3",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-69-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-10T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 70,
    "name": "Noct Tray Layer",
    "category": "Decor",
    "price": 402,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/070-noct-tray-layer/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/070-noct-tray-layer/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/070-noct-tray-layer/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/070-noct-tray-layer/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/070-noct-tray-layer/room.jpg"
    ],
    "description": "A refined tray shaped for tablescapes, crafted in recycled glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#cfc2ad",
      "#191a17",
      "#d0a45d"
    ],
    "stock": 13,
    "sku": "NOM-0070",
    "rating": 4.9,
    "reviewCount": 180,
    "featured": true,
    "reviews": [
      {
        "id": "noct-tray-layer-1",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-70-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-11T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "noct-tray-layer-2",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-70-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-12T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "noct-tray-layer-3",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-70-2",
        "rating": 4,
        "title": "Beautifully restrained",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-13T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 71,
    "name": "Aven Totem Series",
    "category": "Decor",
    "price": 419,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/071-aven-totem-series/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/071-aven-totem-series/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/071-aven-totem-series/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/071-aven-totem-series/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/071-aven-totem-series/room.jpg"
    ],
    "description": "A refined totem shaped for seasonal styling, crafted in smoked mirror with a calm architectural presence for contemporary living.",
    "colors": [
      "#e7e0d5",
      "#6f7468",
      "#a85e40"
    ],
    "stock": 18,
    "sku": "NOM-0071",
    "rating": 5,
    "reviewCount": 23,
    "featured": false,
    "reviews": [
      {
        "id": "aven-totem-series-1",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-71-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-14T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aven-totem-series-2",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-71-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-15T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aven-totem-series-3",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-71-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-16T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 72,
    "name": "Eon Vessel Form",
    "category": "Decor",
    "price": 436,
    "oldPrice": 524,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/072-eon-vessel-form/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/072-eon-vessel-form/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/072-eon-vessel-form/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/072-eon-vessel-form/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/072-eon-vessel-form/room.jpg"
    ],
    "badge": "New Season",
    "description": "A refined vessel shaped for entry moments, crafted in stoneware with a calm architectural presence for contemporary living.",
    "colors": [
      "#f1eee7",
      "#1f211d",
      "#a6a998"
    ],
    "stock": 23,
    "sku": "NOM-0072",
    "rating": 4.5,
    "reviewCount": 30,
    "featured": false,
    "reviews": [
      {
        "id": "eon-vessel-form-1",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-72-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-17T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "eon-vessel-form-2",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-72-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-18T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "eon-vessel-form-3",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-72-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-19T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 73,
    "name": "Rhea Object Atelier",
    "category": "Decor",
    "price": 453,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/073-rhea-object-atelier/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/073-rhea-object-atelier/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/073-rhea-object-atelier/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/073-rhea-object-atelier/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/073-rhea-object-atelier/room.jpg"
    ],
    "description": "A refined object shaped for quiet corners, crafted in cast metal with a calm architectural presence for contemporary living.",
    "colors": [
      "#d9c7ad",
      "#2f332e",
      "#7d8a76"
    ],
    "stock": 28,
    "sku": "NOM-0073",
    "rating": 4.6,
    "reviewCount": 37,
    "featured": false,
    "reviews": [
      {
        "id": "rhea-object-atelier-1",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-73-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-20T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rhea-object-atelier-2",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-73-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-21T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rhea-object-atelier-3",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-73-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-22T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 74,
    "name": "Atlas Vase Mode",
    "category": "Decor",
    "price": 470,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/074-atlas-vase-mode/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/074-atlas-vase-mode/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/074-atlas-vase-mode/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/074-atlas-vase-mode/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/074-atlas-vase-mode/room.jpg"
    ],
    "description": "A refined vase shaped for shelf composition, crafted in travertine with a calm architectural presence for contemporary living.",
    "colors": [
      "#e9dfcf",
      "#744831",
      "#c0a16b"
    ],
    "stock": 33,
    "sku": "NOM-0074",
    "rating": 4.6,
    "reviewCount": 44,
    "featured": false,
    "reviews": [
      {
        "id": "atlas-vase-mode-1",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-74-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-23T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "atlas-vase-mode-2",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-74-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-24T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "atlas-vase-mode-3",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-74-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-25T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 75,
    "name": "Siena Tray Studio",
    "category": "Decor",
    "price": 67,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/075-siena-tray-studio/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/075-siena-tray-studio/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/075-siena-tray-studio/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/075-siena-tray-studio/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/075-siena-tray-studio/room.jpg"
    ],
    "badge": "Low Stock",
    "description": "A refined tray shaped for tablescapes, crafted in recycled glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#c8b293",
      "#202022",
      "#b37b50"
    ],
    "stock": 7,
    "sku": "NOM-0075",
    "rating": 4.7,
    "reviewCount": 51,
    "featured": false,
    "reviews": [
      {
        "id": "siena-tray-studio-1",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-75-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-01T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "siena-tray-studio-2",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-75-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-02T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "siena-tray-studio-3",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-75-2",
        "rating": 4,
        "title": "Precise and tactile",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-03T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 76,
    "name": "Vale Totem Reserve",
    "category": "Decor",
    "price": 84,
    "oldPrice": 152,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/076-vale-totem-reserve/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/076-vale-totem-reserve/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/076-vale-totem-reserve/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/076-vale-totem-reserve/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/076-vale-totem-reserve/room.jpg"
    ],
    "description": "A refined totem shaped for seasonal styling, crafted in smoked mirror with a calm architectural presence for contemporary living.",
    "colors": [
      "#ebe7dc",
      "#6c7567",
      "#b95f3e"
    ],
    "stock": 12,
    "sku": "NOM-0076",
    "rating": 4.8,
    "reviewCount": 58,
    "featured": false,
    "reviews": [
      {
        "id": "vale-totem-reserve-1",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-76-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-04T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vale-totem-reserve-2",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-76-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-05T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vale-totem-reserve-3",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-76-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-06T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 77,
    "name": "Sable Tray Reserve",
    "category": "Kitchen",
    "price": 93,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/077-sable-tray-reserve/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/077-sable-tray-reserve/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/077-sable-tray-reserve/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/077-sable-tray-reserve/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/077-sable-tray-reserve/room.jpg"
    ],
    "description": "A refined tray shaped for hosting prep, crafted in brushed steel with a calm architectural presence for contemporary living.",
    "colors": [
      "#d5d0c4",
      "#4d382c",
      "#a6a998"
    ],
    "stock": 0,
    "sku": "NOM-0077",
    "rating": 4.8,
    "reviewCount": 65,
    "featured": false,
    "reviews": [
      {
        "id": "sable-tray-reserve-1",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-77-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-07T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "sable-tray-reserve-2",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-77-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-08T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "sable-tray-reserve-3",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-77-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-09T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 78,
    "name": "Cala Brew Kit Field",
    "category": "Kitchen",
    "price": 110,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/078-cala-brew-kit-field/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/078-cala-brew-kit-field/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/078-cala-brew-kit-field/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/078-cala-brew-kit-field/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/078-cala-brew-kit-field/room.jpg"
    ],
    "badge": "Made to Order",
    "description": "A refined brew kit shaped for table service, crafted in borosilicate glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#f6f0e6",
      "#34322d",
      "#a85e40"
    ],
    "stock": 22,
    "sku": "NOM-0078",
    "rating": 4.8,
    "reviewCount": 72,
    "featured": false,
    "reviews": [
      {
        "id": "cala-brew-kit-field-1",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-78-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-10T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cala-brew-kit-field-2",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-78-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-11T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cala-brew-kit-field-3",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-78-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-12T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 79,
    "name": "Vela Carafe Set",
    "category": "Kitchen",
    "price": 127,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/079-vela-carafe-set/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/079-vela-carafe-set/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/079-vela-carafe-set/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/079-vela-carafe-set/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/079-vela-carafe-set/room.jpg"
    ],
    "description": "A refined carafe shaped for slow cooking, crafted in porcelain with a calm architectural presence for contemporary living.",
    "colors": [
      "#ded6c8",
      "#202a28",
      "#8f6b52"
    ],
    "stock": 27,
    "sku": "NOM-0079",
    "rating": 4.9,
    "reviewCount": 79,
    "featured": false,
    "reviews": [
      {
        "id": "vela-carafe-set-1",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-79-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-13T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vela-carafe-set-2",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-79-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-14T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vela-carafe-set-3",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-79-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-15T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 80,
    "name": "Terra Grinder Element",
    "category": "Kitchen",
    "price": 144,
    "oldPrice": 192,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/080-terra-grinder-element/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/080-terra-grinder-element/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/080-terra-grinder-element/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/080-terra-grinder-element/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/080-terra-grinder-element/room.jpg"
    ],
    "description": "A refined grinder shaped for countertop order, crafted in acacia wood with a calm architectural presence for contemporary living.",
    "colors": [
      "#e5d8c4",
      "#23303a",
      "#b37b50"
    ],
    "stock": 32,
    "sku": "NOM-0080",
    "rating": 5,
    "reviewCount": 86,
    "featured": true,
    "reviews": [
      {
        "id": "terra-grinder-element-1",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-80-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-16T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "terra-grinder-element-2",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-80-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-17T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "terra-grinder-element-3",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-80-2",
        "rating": 4,
        "title": "Instantly changed the room",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-18T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 81,
    "name": "Solace Canister Object",
    "category": "Kitchen",
    "price": 161,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/081-solace-canister-object/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/081-solace-canister-object/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/081-solace-canister-object/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/081-solace-canister-object/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/081-solace-canister-object/room.jpg"
    ],
    "badge": "Best Seller",
    "description": "A refined canister shaped for morning coffee, crafted in heatproof ceramic with a calm architectural presence for contemporary living.",
    "colors": [
      "#f0eadf",
      "#5d3b2e",
      "#c0a16b"
    ],
    "stock": 6,
    "sku": "NOM-0081",
    "rating": 4.5,
    "reviewCount": 93,
    "featured": false,
    "reviews": [
      {
        "id": "solace-canister-object-1",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-81-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-19T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "solace-canister-object-2",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-81-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-20T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "solace-canister-object-3",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-81-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-21T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 82,
    "name": "Arden Tray House",
    "category": "Kitchen",
    "price": 178,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/082-arden-tray-house/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/082-arden-tray-house/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/082-arden-tray-house/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/082-arden-tray-house/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/082-arden-tray-house/room.jpg"
    ],
    "description": "A refined tray shaped for hosting prep, crafted in brushed steel with a calm architectural presence for contemporary living.",
    "colors": [
      "#cfc2ad",
      "#191a17",
      "#d0a45d"
    ],
    "stock": 11,
    "sku": "NOM-0082",
    "rating": 4.6,
    "reviewCount": 100,
    "featured": false,
    "reviews": [
      {
        "id": "arden-tray-house-1",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-82-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-22T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "arden-tray-house-2",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-82-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-23T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "arden-tray-house-3",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-82-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-24T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 83,
    "name": "Nori Brew Kit Edition",
    "category": "Kitchen",
    "price": 195,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/083-nori-brew-kit-edition/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/083-nori-brew-kit-edition/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/083-nori-brew-kit-edition/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/083-nori-brew-kit-edition/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/083-nori-brew-kit-edition/room.jpg"
    ],
    "description": "A refined brew kit shaped for table service, crafted in borosilicate glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#e7e0d5",
      "#6f7468",
      "#a85e40"
    ],
    "stock": 16,
    "sku": "NOM-0083",
    "rating": 4.6,
    "reviewCount": 107,
    "featured": false,
    "reviews": [
      {
        "id": "nori-brew-kit-edition-1",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-83-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-25T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "nori-brew-kit-edition-2",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-83-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-01T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "nori-brew-kit-edition-3",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-83-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-02T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 84,
    "name": "Elio Carafe Arc",
    "category": "Kitchen",
    "price": 212,
    "oldPrice": 340,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/084-elio-carafe-arc/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/084-elio-carafe-arc/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/084-elio-carafe-arc/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/084-elio-carafe-arc/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/084-elio-carafe-arc/room.jpg"
    ],
    "badge": "NOMA Icon",
    "description": "A refined carafe shaped for slow cooking, crafted in porcelain with a calm architectural presence for contemporary living.",
    "colors": [
      "#f1eee7",
      "#1f211d",
      "#a6a998"
    ],
    "stock": 21,
    "sku": "NOM-0084",
    "rating": 4.7,
    "reviewCount": 114,
    "featured": false,
    "reviews": [
      {
        "id": "elio-carafe-arc-1",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-84-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-03T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "elio-carafe-arc-2",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-84-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-04T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "elio-carafe-arc-3",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-84-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-05T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 85,
    "name": "Rune Grinder Room",
    "category": "Kitchen",
    "price": 229,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/085-rune-grinder-room/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/085-rune-grinder-room/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/085-rune-grinder-room/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/085-rune-grinder-room/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/085-rune-grinder-room/room.jpg"
    ],
    "description": "A refined grinder shaped for countertop order, crafted in acacia wood with a calm architectural presence for contemporary living.",
    "colors": [
      "#d9c7ad",
      "#2f332e",
      "#7d8a76"
    ],
    "stock": 26,
    "sku": "NOM-0085",
    "rating": 4.8,
    "reviewCount": 121,
    "featured": false,
    "reviews": [
      {
        "id": "rune-grinder-room-1",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-85-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-06T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rune-grinder-room-2",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-85-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-07T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rune-grinder-room-3",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-85-2",
        "rating": 4,
        "title": "Designed with care",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-08T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 86,
    "name": "Kanso Canister Layer",
    "category": "Kitchen",
    "price": 246,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/086-kanso-canister-layer/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/086-kanso-canister-layer/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/086-kanso-canister-layer/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/086-kanso-canister-layer/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/086-kanso-canister-layer/room.jpg"
    ],
    "description": "A refined canister shaped for morning coffee, crafted in heatproof ceramic with a calm architectural presence for contemporary living.",
    "colors": [
      "#e9dfcf",
      "#744831",
      "#c0a16b"
    ],
    "stock": 31,
    "sku": "NOM-0086",
    "rating": 4.8,
    "reviewCount": 128,
    "featured": false,
    "reviews": [
      {
        "id": "kanso-canister-layer-1",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-86-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-09T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "kanso-canister-layer-2",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-86-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-10T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "kanso-canister-layer-3",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-86-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-11T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 87,
    "name": "Aurel Tray Series",
    "category": "Kitchen",
    "price": 263,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/087-aurel-tray-series/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/087-aurel-tray-series/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/087-aurel-tray-series/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/087-aurel-tray-series/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/087-aurel-tray-series/room.jpg"
    ],
    "badge": "Carbon Neutral",
    "description": "A refined tray shaped for hosting prep, crafted in brushed steel with a calm architectural presence for contemporary living.",
    "colors": [
      "#c8b293",
      "#202022",
      "#b37b50"
    ],
    "stock": 5,
    "sku": "NOM-0087",
    "rating": 4.8,
    "reviewCount": 135,
    "featured": false,
    "reviews": [
      {
        "id": "aurel-tray-series-1",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-87-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-12T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aurel-tray-series-2",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-87-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-13T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aurel-tray-series-3",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-87-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-14T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 88,
    "name": "Cove Brew Kit Form",
    "category": "Kitchen",
    "price": 280,
    "oldPrice": 388,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/088-cove-brew-kit-form/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/088-cove-brew-kit-form/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/088-cove-brew-kit-form/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/088-cove-brew-kit-form/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/088-cove-brew-kit-form/room.jpg"
    ],
    "description": "A refined brew kit shaped for table service, crafted in borosilicate glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#ebe7dc",
      "#6c7567",
      "#b95f3e"
    ],
    "stock": 0,
    "sku": "NOM-0088",
    "rating": 4.9,
    "reviewCount": 142,
    "featured": false,
    "reviews": [
      {
        "id": "cove-brew-kit-form-1",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-88-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-15T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cove-brew-kit-form-2",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-88-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-16T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cove-brew-kit-form-3",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-88-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-17T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 89,
    "name": "Loma Carafe Atelier",
    "category": "Kitchen",
    "price": 297,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/089-loma-carafe-atelier/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/089-loma-carafe-atelier/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/089-loma-carafe-atelier/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/089-loma-carafe-atelier/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/089-loma-carafe-atelier/room.jpg"
    ],
    "description": "A refined carafe shaped for slow cooking, crafted in porcelain with a calm architectural presence for contemporary living.",
    "colors": [
      "#d5d0c4",
      "#4d382c",
      "#a6a998"
    ],
    "stock": 15,
    "sku": "NOM-0089",
    "rating": 5,
    "reviewCount": 149,
    "featured": false,
    "reviews": [
      {
        "id": "loma-carafe-atelier-1",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-89-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-18T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-carafe-atelier-2",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-89-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-19T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-carafe-atelier-3",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-89-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-20T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 90,
    "name": "Mira Grinder Mode",
    "category": "Kitchen",
    "price": 314,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/090-mira-grinder-mode/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/090-mira-grinder-mode/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/090-mira-grinder-mode/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/090-mira-grinder-mode/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/090-mira-grinder-mode/room.jpg"
    ],
    "badge": "Limited Run",
    "description": "A refined grinder shaped for countertop order, crafted in acacia wood with a calm architectural presence for contemporary living.",
    "colors": [
      "#f6f0e6",
      "#34322d",
      "#a85e40"
    ],
    "stock": 20,
    "sku": "NOM-0090",
    "rating": 4.5,
    "reviewCount": 156,
    "featured": true,
    "reviews": [
      {
        "id": "mira-grinder-mode-1",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-90-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-21T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "mira-grinder-mode-2",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-90-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-22T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "mira-grinder-mode-3",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-90-2",
        "rating": 4,
        "title": "Quiet luxury",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-23T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 91,
    "name": "Orion Canister Studio",
    "category": "Kitchen",
    "price": 331,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/091-orion-canister-studio/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/091-orion-canister-studio/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/091-orion-canister-studio/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/091-orion-canister-studio/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/091-orion-canister-studio/room.jpg"
    ],
    "description": "A refined canister shaped for morning coffee, crafted in heatproof ceramic with a calm architectural presence for contemporary living.",
    "colors": [
      "#ded6c8",
      "#202a28",
      "#8f6b52"
    ],
    "stock": 25,
    "sku": "NOM-0091",
    "rating": 4.6,
    "reviewCount": 163,
    "featured": false,
    "reviews": [
      {
        "id": "orion-canister-studio-1",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-91-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-24T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "orion-canister-studio-2",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-91-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-25T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "orion-canister-studio-3",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-91-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-01T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 92,
    "name": "Noct Tray Reserve",
    "category": "Kitchen",
    "price": 348,
    "oldPrice": 436,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/092-noct-tray-reserve/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/092-noct-tray-reserve/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/092-noct-tray-reserve/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/092-noct-tray-reserve/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/092-noct-tray-reserve/room.jpg"
    ],
    "description": "A refined tray shaped for hosting prep, crafted in brushed steel with a calm architectural presence for contemporary living.",
    "colors": [
      "#e5d8c4",
      "#23303a",
      "#b37b50"
    ],
    "stock": 30,
    "sku": "NOM-0092",
    "rating": 4.6,
    "reviewCount": 170,
    "featured": false,
    "reviews": [
      {
        "id": "noct-tray-reserve-1",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-92-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-02T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "noct-tray-reserve-2",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-92-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-03T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "noct-tray-reserve-3",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-92-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-04T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 93,
    "name": "Aven Brew Kit Field",
    "category": "Kitchen",
    "price": 365,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/093-aven-brew-kit-field/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/093-aven-brew-kit-field/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/093-aven-brew-kit-field/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/093-aven-brew-kit-field/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/093-aven-brew-kit-field/room.jpg"
    ],
    "badge": "Studio Pick",
    "description": "A refined brew kit shaped for table service, crafted in borosilicate glass with a calm architectural presence for contemporary living.",
    "colors": [
      "#f0eadf",
      "#5d3b2e",
      "#c0a16b"
    ],
    "stock": 4,
    "sku": "NOM-0093",
    "rating": 4.7,
    "reviewCount": 177,
    "featured": false,
    "reviews": [
      {
        "id": "aven-brew-kit-field-1",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-93-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-05T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aven-brew-kit-field-2",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-93-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-06T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aven-brew-kit-field-3",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-93-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-07T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 94,
    "name": "Eon Carafe Set",
    "category": "Kitchen",
    "price": 382,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/094-eon-carafe-set/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/094-eon-carafe-set/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/094-eon-carafe-set/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/094-eon-carafe-set/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/094-eon-carafe-set/room.jpg"
    ],
    "description": "A refined carafe shaped for slow cooking, crafted in porcelain with a calm architectural presence for contemporary living.",
    "colors": [
      "#cfc2ad",
      "#191a17",
      "#d0a45d"
    ],
    "stock": 9,
    "sku": "NOM-0094",
    "rating": 4.8,
    "reviewCount": 20,
    "featured": false,
    "reviews": [
      {
        "id": "eon-carafe-set-1",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-94-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-08T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "eon-carafe-set-2",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-94-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-09T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "eon-carafe-set-3",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-94-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-10T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 95,
    "name": "Rhea Grinder Element",
    "category": "Kitchen",
    "price": 399,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/095-rhea-grinder-element/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/095-rhea-grinder-element/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/095-rhea-grinder-element/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/095-rhea-grinder-element/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/095-rhea-grinder-element/room.jpg"
    ],
    "description": "A refined grinder shaped for countertop order, crafted in acacia wood with a calm architectural presence for contemporary living.",
    "colors": [
      "#e7e0d5",
      "#6f7468",
      "#a85e40"
    ],
    "stock": 14,
    "sku": "NOM-0095",
    "rating": 4.8,
    "reviewCount": 27,
    "featured": false,
    "reviews": [
      {
        "id": "rhea-grinder-element-1",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-95-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-11T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rhea-grinder-element-2",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-95-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-12T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rhea-grinder-element-3",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-95-2",
        "rating": 4,
        "title": "Feels custom",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-13T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 96,
    "name": "Moss Incense Set Element",
    "category": "Wellness",
    "price": 410,
    "oldPrice": 478,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/096-moss-incense-set-element/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/096-moss-incense-set-element/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/096-moss-incense-set-element/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/096-moss-incense-set-element/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/096-moss-incense-set-element/room.jpg"
    ],
    "badge": "New Season",
    "description": "A refined incense set shaped for deep rest, crafted in cotton wick with a calm architectural presence for contemporary living.",
    "colors": [
      "#f1eee7",
      "#1f211d",
      "#a6a998"
    ],
    "stock": 19,
    "sku": "NOM-0096",
    "rating": 4.8,
    "reviewCount": 34,
    "featured": false,
    "reviews": [
      {
        "id": "moss-incense-set-element-1",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-96-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-14T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "moss-incense-set-element-2",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-96-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-15T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "moss-incense-set-element-3",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-96-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-16T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 97,
    "name": "Linea Mist Bowl Object",
    "category": "Wellness",
    "price": 427,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/097-linea-mist-bowl-object/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/097-linea-mist-bowl-object/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/097-linea-mist-bowl-object/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/097-linea-mist-bowl-object/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/097-linea-mist-bowl-object/room.jpg"
    ],
    "description": "A refined mist bowl shaped for morning breathing, crafted in essential oil blend with a calm architectural presence for contemporary living.",
    "colors": [
      "#d9c7ad",
      "#2f332e",
      "#7d8a76"
    ],
    "stock": 24,
    "sku": "NOM-0097",
    "rating": 4.9,
    "reviewCount": 41,
    "featured": false,
    "reviews": [
      {
        "id": "linea-mist-bowl-object-1",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-97-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-17T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "linea-mist-bowl-object-2",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-97-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-18T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "linea-mist-bowl-object-3",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-97-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-19T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 98,
    "name": "Astra Diffuser House",
    "category": "Wellness",
    "price": 444,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/098-astra-diffuser-house/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/098-astra-diffuser-house/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/098-astra-diffuser-house/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/098-astra-diffuser-house/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/098-astra-diffuser-house/room.jpg"
    ],
    "description": "A refined diffuser shaped for evening reset, crafted in mineral salt with a calm architectural presence for contemporary living.",
    "colors": [
      "#e9dfcf",
      "#744831",
      "#c0a16b"
    ],
    "stock": 29,
    "sku": "NOM-0098",
    "rating": 5,
    "reviewCount": 48,
    "featured": false,
    "reviews": [
      {
        "id": "astra-diffuser-house-1",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-98-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-20T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "astra-diffuser-house-2",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-98-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-21T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "astra-diffuser-house-3",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-98-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-22T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 99,
    "name": "Sable Bath Set Edition",
    "category": "Wellness",
    "price": 41,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/099-sable-bath-set-edition/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/099-sable-bath-set-edition/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/099-sable-bath-set-edition/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/099-sable-bath-set-edition/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/099-sable-bath-set-edition/room.jpg"
    ],
    "badge": "Low Stock",
    "description": "A refined bath set shaped for bath rituals, crafted in unglazed ceramic with a calm architectural presence for contemporary living.",
    "colors": [
      "#c8b293",
      "#202022",
      "#b37b50"
    ],
    "stock": 0,
    "sku": "NOM-0099",
    "rating": 4.5,
    "reviewCount": 55,
    "featured": false,
    "reviews": [
      {
        "id": "sable-bath-set-edition-1",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-99-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-23T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "sable-bath-set-edition-2",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-99-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-24T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "sable-bath-set-edition-3",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-99-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-25T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 100,
    "name": "Cala Humidifier Arc",
    "category": "Wellness",
    "price": 58,
    "oldPrice": 106,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/100-cala-humidifier-arc/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/100-cala-humidifier-arc/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/100-cala-humidifier-arc/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/100-cala-humidifier-arc/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/100-cala-humidifier-arc/room.jpg"
    ],
    "description": "A refined humidifier shaped for screen-free pauses, crafted in natural rubber with a calm architectural presence for contemporary living.",
    "colors": [
      "#ebe7dc",
      "#6c7567",
      "#b95f3e"
    ],
    "stock": 8,
    "sku": "NOM-0100",
    "rating": 4.6,
    "reviewCount": 62,
    "featured": true,
    "reviews": [
      {
        "id": "cala-humidifier-arc-1",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-100-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-01T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cala-humidifier-arc-2",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-100-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-02T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cala-humidifier-arc-3",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-100-2",
        "rating": 4,
        "title": "Better than expected",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-03T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 101,
    "name": "Vela Incense Set Room",
    "category": "Wellness",
    "price": 75,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/101-vela-incense-set-room/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/101-vela-incense-set-room/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/101-vela-incense-set-room/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/101-vela-incense-set-room/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/101-vela-incense-set-room/room.jpg"
    ],
    "description": "A refined incense set shaped for deep rest, crafted in cotton wick with a calm architectural presence for contemporary living.",
    "colors": [
      "#d5d0c4",
      "#4d382c",
      "#a6a998"
    ],
    "stock": 13,
    "sku": "NOM-0101",
    "rating": 4.6,
    "reviewCount": 69,
    "featured": false,
    "reviews": [
      {
        "id": "vela-incense-set-room-1",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-101-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-04T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vela-incense-set-room-2",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-101-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-05T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vela-incense-set-room-3",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-101-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-06T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 102,
    "name": "Terra Mist Bowl Layer",
    "category": "Wellness",
    "price": 92,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/102-terra-mist-bowl-layer/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/102-terra-mist-bowl-layer/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/102-terra-mist-bowl-layer/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/102-terra-mist-bowl-layer/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/102-terra-mist-bowl-layer/room.jpg"
    ],
    "badge": "Made to Order",
    "description": "A refined mist bowl shaped for morning breathing, crafted in essential oil blend with a calm architectural presence for contemporary living.",
    "colors": [
      "#f6f0e6",
      "#34322d",
      "#a85e40"
    ],
    "stock": 18,
    "sku": "NOM-0102",
    "rating": 4.7,
    "reviewCount": 76,
    "featured": false,
    "reviews": [
      {
        "id": "terra-mist-bowl-layer-1",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-102-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-07T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "terra-mist-bowl-layer-2",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-102-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-08T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "terra-mist-bowl-layer-3",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-102-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-09T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 103,
    "name": "Solace Diffuser Series",
    "category": "Wellness",
    "price": 109,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/103-solace-diffuser-series/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/103-solace-diffuser-series/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/103-solace-diffuser-series/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/103-solace-diffuser-series/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/103-solace-diffuser-series/room.jpg"
    ],
    "description": "A refined diffuser shaped for evening reset, crafted in mineral salt with a calm architectural presence for contemporary living.",
    "colors": [
      "#ded6c8",
      "#202a28",
      "#8f6b52"
    ],
    "stock": 23,
    "sku": "NOM-0103",
    "rating": 4.8,
    "reviewCount": 83,
    "featured": false,
    "reviews": [
      {
        "id": "solace-diffuser-series-1",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-103-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-10T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "solace-diffuser-series-2",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-103-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-11T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "solace-diffuser-series-3",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-103-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-12T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 104,
    "name": "Arden Bath Set Form",
    "category": "Wellness",
    "price": 126,
    "oldPrice": 254,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/104-arden-bath-set-form/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/104-arden-bath-set-form/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/104-arden-bath-set-form/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/104-arden-bath-set-form/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/104-arden-bath-set-form/room.jpg"
    ],
    "description": "A refined bath set shaped for bath rituals, crafted in unglazed ceramic with a calm architectural presence for contemporary living.",
    "colors": [
      "#e5d8c4",
      "#23303a",
      "#b37b50"
    ],
    "stock": 28,
    "sku": "NOM-0104",
    "rating": 4.8,
    "reviewCount": 90,
    "featured": false,
    "reviews": [
      {
        "id": "arden-bath-set-form-1",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-104-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-13T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "arden-bath-set-form-2",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-104-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-14T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "arden-bath-set-form-3",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-104-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-15T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 105,
    "name": "Nori Humidifier Atelier",
    "category": "Wellness",
    "price": 143,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/105-nori-humidifier-atelier/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/105-nori-humidifier-atelier/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/105-nori-humidifier-atelier/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/105-nori-humidifier-atelier/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/105-nori-humidifier-atelier/room.jpg"
    ],
    "badge": "Best Seller",
    "description": "A refined humidifier shaped for screen-free pauses, crafted in natural rubber with a calm architectural presence for contemporary living.",
    "colors": [
      "#f0eadf",
      "#5d3b2e",
      "#c0a16b"
    ],
    "stock": 33,
    "sku": "NOM-0105",
    "rating": 4.8,
    "reviewCount": 97,
    "featured": false,
    "reviews": [
      {
        "id": "nori-humidifier-atelier-1",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-105-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-16T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "nori-humidifier-atelier-2",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-105-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-17T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "nori-humidifier-atelier-3",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-105-2",
        "rating": 4,
        "title": "Worth the wait",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-18T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 106,
    "name": "Elio Incense Set Mode",
    "category": "Wellness",
    "price": 160,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/106-elio-incense-set-mode/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/106-elio-incense-set-mode/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/106-elio-incense-set-mode/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/106-elio-incense-set-mode/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/106-elio-incense-set-mode/room.jpg"
    ],
    "description": "A refined incense set shaped for deep rest, crafted in cotton wick with a calm architectural presence for contemporary living.",
    "colors": [
      "#cfc2ad",
      "#191a17",
      "#d0a45d"
    ],
    "stock": 7,
    "sku": "NOM-0106",
    "rating": 4.9,
    "reviewCount": 104,
    "featured": false,
    "reviews": [
      {
        "id": "elio-incense-set-mode-1",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-106-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-19T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "elio-incense-set-mode-2",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-106-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-20T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "elio-incense-set-mode-3",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-106-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-21T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 107,
    "name": "Rune Mist Bowl Studio",
    "category": "Wellness",
    "price": 177,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/107-rune-mist-bowl-studio/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/107-rune-mist-bowl-studio/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/107-rune-mist-bowl-studio/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/107-rune-mist-bowl-studio/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/107-rune-mist-bowl-studio/room.jpg"
    ],
    "description": "A refined mist bowl shaped for morning breathing, crafted in essential oil blend with a calm architectural presence for contemporary living.",
    "colors": [
      "#e7e0d5",
      "#6f7468",
      "#a85e40"
    ],
    "stock": 12,
    "sku": "NOM-0107",
    "rating": 5,
    "reviewCount": 111,
    "featured": false,
    "reviews": [
      {
        "id": "rune-mist-bowl-studio-1",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-107-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-22T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rune-mist-bowl-studio-2",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-107-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-23T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rune-mist-bowl-studio-3",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-107-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-24T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 108,
    "name": "Kanso Diffuser Reserve",
    "category": "Wellness",
    "price": 194,
    "oldPrice": 302,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/108-kanso-diffuser-reserve/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/108-kanso-diffuser-reserve/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/108-kanso-diffuser-reserve/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/108-kanso-diffuser-reserve/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/108-kanso-diffuser-reserve/room.jpg"
    ],
    "badge": "NOMA Icon",
    "description": "A refined diffuser shaped for evening reset, crafted in mineral salt with a calm architectural presence for contemporary living.",
    "colors": [
      "#f1eee7",
      "#1f211d",
      "#a6a998"
    ],
    "stock": 17,
    "sku": "NOM-0108",
    "rating": 4.5,
    "reviewCount": 118,
    "featured": false,
    "reviews": [
      {
        "id": "kanso-diffuser-reserve-1",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-108-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-25T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "kanso-diffuser-reserve-2",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-108-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-01T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "kanso-diffuser-reserve-3",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-108-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-02T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 109,
    "name": "Aurel Bath Set Field",
    "category": "Wellness",
    "price": 211,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/109-aurel-bath-set-field/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/109-aurel-bath-set-field/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/109-aurel-bath-set-field/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/109-aurel-bath-set-field/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/109-aurel-bath-set-field/room.jpg"
    ],
    "description": "A refined bath set shaped for bath rituals, crafted in unglazed ceramic with a calm architectural presence for contemporary living.",
    "colors": [
      "#d9c7ad",
      "#2f332e",
      "#7d8a76"
    ],
    "stock": 22,
    "sku": "NOM-0109",
    "rating": 4.6,
    "reviewCount": 125,
    "featured": false,
    "reviews": [
      {
        "id": "aurel-bath-set-field-1",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-109-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-03T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aurel-bath-set-field-2",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-109-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-04T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aurel-bath-set-field-3",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-109-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-05T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 110,
    "name": "Cove Humidifier Set",
    "category": "Wellness",
    "price": 228,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/110-cove-humidifier-set/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/110-cove-humidifier-set/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/110-cove-humidifier-set/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/110-cove-humidifier-set/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/110-cove-humidifier-set/room.jpg"
    ],
    "description": "A refined humidifier shaped for screen-free pauses, crafted in natural rubber with a calm architectural presence for contemporary living.",
    "colors": [
      "#e9dfcf",
      "#744831",
      "#c0a16b"
    ],
    "stock": 0,
    "sku": "NOM-0110",
    "rating": 4.6,
    "reviewCount": 132,
    "featured": true,
    "reviews": [
      {
        "id": "cove-humidifier-set-1",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-110-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-06T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cove-humidifier-set-2",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-110-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-07T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cove-humidifier-set-3",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-110-2",
        "rating": 4,
        "title": "Beautifully restrained",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-08T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 111,
    "name": "Loma Incense Set Element",
    "category": "Wellness",
    "price": 245,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/111-loma-incense-set-element/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/111-loma-incense-set-element/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/111-loma-incense-set-element/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/111-loma-incense-set-element/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/111-loma-incense-set-element/room.jpg"
    ],
    "badge": "Carbon Neutral",
    "description": "A refined incense set shaped for deep rest, crafted in cotton wick with a calm architectural presence for contemporary living.",
    "colors": [
      "#c8b293",
      "#202022",
      "#b37b50"
    ],
    "stock": 32,
    "sku": "NOM-0111",
    "rating": 4.7,
    "reviewCount": 139,
    "featured": false,
    "reviews": [
      {
        "id": "loma-incense-set-element-1",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-111-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-09T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-incense-set-element-2",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-111-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-10T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-incense-set-element-3",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-111-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-11T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 112,
    "name": "Mira Mist Bowl Object",
    "category": "Wellness",
    "price": 262,
    "oldPrice": 350,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/112-mira-mist-bowl-object/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/112-mira-mist-bowl-object/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/112-mira-mist-bowl-object/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/112-mira-mist-bowl-object/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/112-mira-mist-bowl-object/room.jpg"
    ],
    "description": "A refined mist bowl shaped for morning breathing, crafted in essential oil blend with a calm architectural presence for contemporary living.",
    "colors": [
      "#ebe7dc",
      "#6c7567",
      "#b95f3e"
    ],
    "stock": 6,
    "sku": "NOM-0112",
    "rating": 4.8,
    "reviewCount": 146,
    "featured": false,
    "reviews": [
      {
        "id": "mira-mist-bowl-object-1",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-112-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-12T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "mira-mist-bowl-object-2",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-112-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-13T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "mira-mist-bowl-object-3",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-112-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-14T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 113,
    "name": "Orion Diffuser House",
    "category": "Wellness",
    "price": 279,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/113-orion-diffuser-house/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/113-orion-diffuser-house/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/113-orion-diffuser-house/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/113-orion-diffuser-house/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/113-orion-diffuser-house/room.jpg"
    ],
    "description": "A refined diffuser shaped for evening reset, crafted in mineral salt with a calm architectural presence for contemporary living.",
    "colors": [
      "#d5d0c4",
      "#4d382c",
      "#a6a998"
    ],
    "stock": 11,
    "sku": "NOM-0113",
    "rating": 4.8,
    "reviewCount": 153,
    "featured": false,
    "reviews": [
      {
        "id": "orion-diffuser-house-1",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-113-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-15T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "orion-diffuser-house-2",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-113-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-16T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "orion-diffuser-house-3",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-113-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-17T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 114,
    "name": "Noct Bath Set Edition",
    "category": "Wellness",
    "price": 296,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/114-noct-bath-set-edition/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/114-noct-bath-set-edition/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/114-noct-bath-set-edition/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/114-noct-bath-set-edition/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/114-noct-bath-set-edition/room.jpg"
    ],
    "badge": "Limited Run",
    "description": "A refined bath set shaped for bath rituals, crafted in unglazed ceramic with a calm architectural presence for contemporary living.",
    "colors": [
      "#f6f0e6",
      "#34322d",
      "#a85e40"
    ],
    "stock": 16,
    "sku": "NOM-0114",
    "rating": 4.8,
    "reviewCount": 160,
    "featured": false,
    "reviews": [
      {
        "id": "noct-bath-set-edition-1",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-114-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-18T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "noct-bath-set-edition-2",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-114-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-19T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "noct-bath-set-edition-3",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-114-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-20T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 115,
    "name": "Atlas Runner Edition",
    "category": "Textiles",
    "price": 333,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/115-atlas-runner-edition/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/115-atlas-runner-edition/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/115-atlas-runner-edition/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/115-atlas-runner-edition/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/115-atlas-runner-edition/room.jpg"
    ],
    "description": "A refined runner shaped for layered beds, crafted in washed linen with a calm architectural presence for contemporary living.",
    "colors": [
      "#ded6c8",
      "#202a28",
      "#8f6b52"
    ],
    "stock": 21,
    "sku": "NOM-0115",
    "rating": 4.9,
    "reviewCount": 167,
    "featured": false,
    "reviews": [
      {
        "id": "atlas-runner-edition-1",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-115-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-21T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "atlas-runner-edition-2",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-115-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-22T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "atlas-runner-edition-3",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-115-2",
        "rating": 4,
        "title": "Precise and tactile",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-23T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 116,
    "name": "Siena Pillowcase Arc",
    "category": "Textiles",
    "price": 350,
    "oldPrice": 418,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/116-siena-pillowcase-arc/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/116-siena-pillowcase-arc/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/116-siena-pillowcase-arc/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/116-siena-pillowcase-arc/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/116-siena-pillowcase-arc/room.jpg"
    ],
    "description": "A refined pillowcase shaped for slow showers, crafted in alpaca blend with a calm architectural presence for contemporary living.",
    "colors": [
      "#e5d8c4",
      "#23303a",
      "#b37b50"
    ],
    "stock": 26,
    "sku": "NOM-0116",
    "rating": 5,
    "reviewCount": 174,
    "featured": false,
    "reviews": [
      {
        "id": "siena-pillowcase-arc-1",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-116-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-24T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "siena-pillowcase-arc-2",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-116-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-25T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "siena-pillowcase-arc-3",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-116-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-01T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 117,
    "name": "Vale Curtain Room",
    "category": "Textiles",
    "price": 367,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/117-vale-curtain-room/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/117-vale-curtain-room/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/117-vale-curtain-room/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/117-vale-curtain-room/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/117-vale-curtain-room/room.jpg"
    ],
    "badge": "Studio Pick",
    "description": "A refined curtain shaped for guest rooms, crafted in merino wool with a calm architectural presence for contemporary living.",
    "colors": [
      "#f0eadf",
      "#5d3b2e",
      "#c0a16b"
    ],
    "stock": 31,
    "sku": "NOM-0117",
    "rating": 4.5,
    "reviewCount": 181,
    "featured": false,
    "reviews": [
      {
        "id": "vale-curtain-room-1",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-117-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-02T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vale-curtain-room-2",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-117-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-03T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vale-curtain-room-3",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-117-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-04T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 118,
    "name": "Moss Cushion Layer",
    "category": "Textiles",
    "price": 384,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/118-moss-cushion-layer/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/118-moss-cushion-layer/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/118-moss-cushion-layer/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/118-moss-cushion-layer/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/118-moss-cushion-layer/room.jpg"
    ],
    "description": "A refined cushion shaped for sofa evenings, crafted in handwoven jute with a calm architectural presence for contemporary living.",
    "colors": [
      "#cfc2ad",
      "#191a17",
      "#d0a45d"
    ],
    "stock": 5,
    "sku": "NOM-0118",
    "rating": 4.6,
    "reviewCount": 24,
    "featured": false,
    "reviews": [
      {
        "id": "moss-cushion-layer-1",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-118-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-05T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "moss-cushion-layer-2",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-118-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-06T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "moss-cushion-layer-3",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-118-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-07T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 119,
    "name": "Linea Rug Series",
    "category": "Textiles",
    "price": 401,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/119-linea-rug-series/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/119-linea-rug-series/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/119-linea-rug-series/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/119-linea-rug-series/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/119-linea-rug-series/room.jpg"
    ],
    "description": "A refined rug shaped for floor warmth, crafted in organic cotton with a calm architectural presence for contemporary living.",
    "colors": [
      "#e7e0d5",
      "#6f7468",
      "#a85e40"
    ],
    "stock": 10,
    "sku": "NOM-0119",
    "rating": 4.6,
    "reviewCount": 31,
    "featured": false,
    "reviews": [
      {
        "id": "linea-rug-series-1",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-119-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-08T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "linea-rug-series-2",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-119-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-09T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "linea-rug-series-3",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-119-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-10T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 120,
    "name": "Astra Runner Form",
    "category": "Textiles",
    "price": 418,
    "oldPrice": 466,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/120-astra-runner-form/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/120-astra-runner-form/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/120-astra-runner-form/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/120-astra-runner-form/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/120-astra-runner-form/room.jpg"
    ],
    "badge": "New Season",
    "description": "A refined runner shaped for layered beds, crafted in washed linen with a calm architectural presence for contemporary living.",
    "colors": [
      "#f1eee7",
      "#1f211d",
      "#a6a998"
    ],
    "stock": 15,
    "sku": "NOM-0120",
    "rating": 4.7,
    "reviewCount": 38,
    "featured": true,
    "reviews": [
      {
        "id": "astra-runner-form-1",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-120-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-11T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "astra-runner-form-2",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-120-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-12T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "astra-runner-form-3",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-120-2",
        "rating": 4,
        "title": "Instantly changed the room",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-13T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 121,
    "name": "Sable Pillowcase Atelier",
    "category": "Textiles",
    "price": 435,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/121-sable-pillowcase-atelier/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/121-sable-pillowcase-atelier/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/121-sable-pillowcase-atelier/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/121-sable-pillowcase-atelier/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/121-sable-pillowcase-atelier/room.jpg"
    ],
    "description": "A refined pillowcase shaped for slow showers, crafted in alpaca blend with a calm architectural presence for contemporary living.",
    "colors": [
      "#d9c7ad",
      "#2f332e",
      "#7d8a76"
    ],
    "stock": 0,
    "sku": "NOM-0121",
    "rating": 4.8,
    "reviewCount": 45,
    "featured": false,
    "reviews": [
      {
        "id": "sable-pillowcase-atelier-1",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-121-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-14T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "sable-pillowcase-atelier-2",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-121-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-15T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "sable-pillowcase-atelier-3",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-121-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-16T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 122,
    "name": "Cala Curtain Mode",
    "category": "Textiles",
    "price": 452,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/122-cala-curtain-mode/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/122-cala-curtain-mode/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/122-cala-curtain-mode/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/122-cala-curtain-mode/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/122-cala-curtain-mode/room.jpg"
    ],
    "description": "A refined curtain shaped for guest rooms, crafted in merino wool with a calm architectural presence for contemporary living.",
    "colors": [
      "#e9dfcf",
      "#744831",
      "#c0a16b"
    ],
    "stock": 25,
    "sku": "NOM-0122",
    "rating": 4.8,
    "reviewCount": 52,
    "featured": false,
    "reviews": [
      {
        "id": "cala-curtain-mode-1",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-122-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-17T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cala-curtain-mode-2",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-122-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-18T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cala-curtain-mode-3",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-122-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-19T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 123,
    "name": "Vela Cushion Studio",
    "category": "Textiles",
    "price": 469,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/123-vela-cushion-studio/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/123-vela-cushion-studio/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/123-vela-cushion-studio/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/123-vela-cushion-studio/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/123-vela-cushion-studio/room.jpg"
    ],
    "badge": "Low Stock",
    "description": "A refined cushion shaped for sofa evenings, crafted in handwoven jute with a calm architectural presence for contemporary living.",
    "colors": [
      "#c8b293",
      "#202022",
      "#b37b50"
    ],
    "stock": 30,
    "sku": "NOM-0123",
    "rating": 4.8,
    "reviewCount": 59,
    "featured": false,
    "reviews": [
      {
        "id": "vela-cushion-studio-1",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-123-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-20T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vela-cushion-studio-2",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-123-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-21T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vela-cushion-studio-3",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-123-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-22T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 124,
    "name": "Terra Rug Reserve",
    "category": "Textiles",
    "price": 66,
    "oldPrice": 194,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/124-terra-rug-reserve/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/124-terra-rug-reserve/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/124-terra-rug-reserve/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/124-terra-rug-reserve/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/124-terra-rug-reserve/room.jpg"
    ],
    "description": "A refined rug shaped for floor warmth, crafted in organic cotton with a calm architectural presence for contemporary living.",
    "colors": [
      "#ebe7dc",
      "#6c7567",
      "#b95f3e"
    ],
    "stock": 4,
    "sku": "NOM-0124",
    "rating": 4.9,
    "reviewCount": 66,
    "featured": false,
    "reviews": [
      {
        "id": "terra-rug-reserve-1",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-124-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-23T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "terra-rug-reserve-2",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-124-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-24T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "terra-rug-reserve-3",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-124-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-25T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 125,
    "name": "Solace Runner Field",
    "category": "Textiles",
    "price": 83,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/125-solace-runner-field/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/125-solace-runner-field/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/125-solace-runner-field/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/125-solace-runner-field/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/125-solace-runner-field/room.jpg"
    ],
    "description": "A refined runner shaped for layered beds, crafted in washed linen with a calm architectural presence for contemporary living.",
    "colors": [
      "#d5d0c4",
      "#4d382c",
      "#a6a998"
    ],
    "stock": 9,
    "sku": "NOM-0125",
    "rating": 5,
    "reviewCount": 73,
    "featured": false,
    "reviews": [
      {
        "id": "solace-runner-field-1",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-125-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-01T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "solace-runner-field-2",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-125-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-02T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "solace-runner-field-3",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-125-2",
        "rating": 4,
        "title": "Designed with care",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-03T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 126,
    "name": "Arden Pillowcase Set",
    "category": "Textiles",
    "price": 100,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/126-arden-pillowcase-set/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/126-arden-pillowcase-set/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/126-arden-pillowcase-set/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/126-arden-pillowcase-set/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/126-arden-pillowcase-set/room.jpg"
    ],
    "badge": "Made to Order",
    "description": "A refined pillowcase shaped for slow showers, crafted in alpaca blend with a calm architectural presence for contemporary living.",
    "colors": [
      "#f6f0e6",
      "#34322d",
      "#a85e40"
    ],
    "stock": 14,
    "sku": "NOM-0126",
    "rating": 4.5,
    "reviewCount": 80,
    "featured": false,
    "reviews": [
      {
        "id": "arden-pillowcase-set-1",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-126-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-04T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "arden-pillowcase-set-2",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-126-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-05T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "arden-pillowcase-set-3",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-126-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-06T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 127,
    "name": "Nori Curtain Element",
    "category": "Textiles",
    "price": 117,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/127-nori-curtain-element/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/127-nori-curtain-element/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/127-nori-curtain-element/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/127-nori-curtain-element/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/127-nori-curtain-element/room.jpg"
    ],
    "description": "A refined curtain shaped for guest rooms, crafted in merino wool with a calm architectural presence for contemporary living.",
    "colors": [
      "#ded6c8",
      "#202a28",
      "#8f6b52"
    ],
    "stock": 19,
    "sku": "NOM-0127",
    "rating": 4.6,
    "reviewCount": 87,
    "featured": false,
    "reviews": [
      {
        "id": "nori-curtain-element-1",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-127-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-07T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "nori-curtain-element-2",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-127-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-08T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "nori-curtain-element-3",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-127-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-09T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 128,
    "name": "Elio Cushion Object",
    "category": "Textiles",
    "price": 134,
    "oldPrice": 242,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/128-elio-cushion-object/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/128-elio-cushion-object/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/128-elio-cushion-object/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/128-elio-cushion-object/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/128-elio-cushion-object/room.jpg"
    ],
    "description": "A refined cushion shaped for sofa evenings, crafted in handwoven jute with a calm architectural presence for contemporary living.",
    "colors": [
      "#e5d8c4",
      "#23303a",
      "#b37b50"
    ],
    "stock": 24,
    "sku": "NOM-0128",
    "rating": 4.6,
    "reviewCount": 94,
    "featured": false,
    "reviews": [
      {
        "id": "elio-cushion-object-1",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-128-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-10T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "elio-cushion-object-2",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-128-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-11T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "elio-cushion-object-3",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-128-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-12T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 129,
    "name": "Rune Rug House",
    "category": "Textiles",
    "price": 151,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/129-rune-rug-house/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/129-rune-rug-house/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/129-rune-rug-house/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/129-rune-rug-house/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/129-rune-rug-house/room.jpg"
    ],
    "badge": "Best Seller",
    "description": "A refined rug shaped for floor warmth, crafted in organic cotton with a calm architectural presence for contemporary living.",
    "colors": [
      "#f0eadf",
      "#5d3b2e",
      "#c0a16b"
    ],
    "stock": 29,
    "sku": "NOM-0129",
    "rating": 4.7,
    "reviewCount": 101,
    "featured": false,
    "reviews": [
      {
        "id": "rune-rug-house-1",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-129-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-13T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rune-rug-house-2",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-129-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-14T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rune-rug-house-3",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-129-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-15T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 130,
    "name": "Kanso Runner Edition",
    "category": "Textiles",
    "price": 168,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/130-kanso-runner-edition/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/130-kanso-runner-edition/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/130-kanso-runner-edition/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/130-kanso-runner-edition/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/130-kanso-runner-edition/room.jpg"
    ],
    "description": "A refined runner shaped for layered beds, crafted in washed linen with a calm architectural presence for contemporary living.",
    "colors": [
      "#cfc2ad",
      "#191a17",
      "#d0a45d"
    ],
    "stock": 34,
    "sku": "NOM-0130",
    "rating": 4.8,
    "reviewCount": 108,
    "featured": true,
    "reviews": [
      {
        "id": "kanso-runner-edition-1",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-130-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-16T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "kanso-runner-edition-2",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-130-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-17T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "kanso-runner-edition-3",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-130-2",
        "rating": 4,
        "title": "Quiet luxury",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-18T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 131,
    "name": "Aurel Pillowcase Arc",
    "category": "Textiles",
    "price": 185,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/131-aurel-pillowcase-arc/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/131-aurel-pillowcase-arc/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/131-aurel-pillowcase-arc/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/131-aurel-pillowcase-arc/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/131-aurel-pillowcase-arc/room.jpg"
    ],
    "description": "A refined pillowcase shaped for slow showers, crafted in alpaca blend with a calm architectural presence for contemporary living.",
    "colors": [
      "#e7e0d5",
      "#6f7468",
      "#a85e40"
    ],
    "stock": 8,
    "sku": "NOM-0131",
    "rating": 4.8,
    "reviewCount": 115,
    "featured": false,
    "reviews": [
      {
        "id": "aurel-pillowcase-arc-1",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-131-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-19T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aurel-pillowcase-arc-2",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-131-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-20T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aurel-pillowcase-arc-3",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-131-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-21T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 132,
    "name": "Cove Curtain Room",
    "category": "Textiles",
    "price": 202,
    "oldPrice": 290,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/132-cove-curtain-room/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/132-cove-curtain-room/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/132-cove-curtain-room/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/132-cove-curtain-room/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/132-cove-curtain-room/room.jpg"
    ],
    "badge": "NOMA Icon",
    "description": "A refined curtain shaped for guest rooms, crafted in merino wool with a calm architectural presence for contemporary living.",
    "colors": [
      "#f1eee7",
      "#1f211d",
      "#a6a998"
    ],
    "stock": 0,
    "sku": "NOM-0132",
    "rating": 4.8,
    "reviewCount": 122,
    "featured": false,
    "reviews": [
      {
        "id": "cove-curtain-room-1",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-132-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-22T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cove-curtain-room-2",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-132-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-23T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cove-curtain-room-3",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-132-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-24T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 133,
    "name": "Loma Cushion Layer",
    "category": "Textiles",
    "price": 219,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/133-loma-cushion-layer/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/133-loma-cushion-layer/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/133-loma-cushion-layer/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/133-loma-cushion-layer/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/133-loma-cushion-layer/room.jpg"
    ],
    "description": "A refined cushion shaped for sofa evenings, crafted in handwoven jute with a calm architectural presence for contemporary living.",
    "colors": [
      "#d9c7ad",
      "#2f332e",
      "#7d8a76"
    ],
    "stock": 18,
    "sku": "NOM-0133",
    "rating": 4.9,
    "reviewCount": 129,
    "featured": false,
    "reviews": [
      {
        "id": "loma-cushion-layer-1",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-133-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-25T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-cushion-layer-2",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-133-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-01T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "loma-cushion-layer-3",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-133-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-02T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 134,
    "name": "Aven Fire Bowl Layer",
    "category": "Outdoor",
    "price": 250,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/134-aven-fire-bowl-layer/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/134-aven-fire-bowl-layer/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/134-aven-fire-bowl-layer/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/134-aven-fire-bowl-layer/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/134-aven-fire-bowl-layer/room.jpg"
    ],
    "description": "A refined fire bowl shaped for open-air hosting, crafted in recycled stone with a calm architectural presence for contemporary living.",
    "colors": [
      "#e9dfcf",
      "#744831",
      "#c0a16b"
    ],
    "stock": 23,
    "sku": "NOM-0134",
    "rating": 5,
    "reviewCount": 136,
    "featured": false,
    "reviews": [
      {
        "id": "aven-fire-bowl-layer-1",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-134-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-03T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aven-fire-bowl-layer-2",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-134-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-04T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "aven-fire-bowl-layer-3",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-134-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-05T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 135,
    "name": "Eon Garden Stool Series",
    "category": "Outdoor",
    "price": 267,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/135-eon-garden-stool-series/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/135-eon-garden-stool-series/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/135-eon-garden-stool-series/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/135-eon-garden-stool-series/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/135-eon-garden-stool-series/room.jpg"
    ],
    "badge": "Carbon Neutral",
    "description": "A refined garden stool shaped for balcony mornings, crafted in terracotta with a calm architectural presence for contemporary living.",
    "colors": [
      "#c8b293",
      "#202022",
      "#b37b50"
    ],
    "stock": 28,
    "sku": "NOM-0135",
    "rating": 4.5,
    "reviewCount": 143,
    "featured": false,
    "reviews": [
      {
        "id": "eon-garden-stool-series-1",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-135-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-06T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "eon-garden-stool-series-2",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-135-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-07T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "eon-garden-stool-series-3",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-135-2",
        "rating": 4,
        "title": "Feels custom",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-08T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 136,
    "name": "Rhea Solar Light Form",
    "category": "Outdoor",
    "price": 284,
    "oldPrice": 352,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/136-rhea-solar-light-form/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/136-rhea-solar-light-form/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/136-rhea-solar-light-form/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/136-rhea-solar-light-form/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/136-rhea-solar-light-form/room.jpg"
    ],
    "description": "A refined solar light shaped for poolside calm, crafted in weathered teak with a calm architectural presence for contemporary living.",
    "colors": [
      "#ebe7dc",
      "#6c7567",
      "#b95f3e"
    ],
    "stock": 33,
    "sku": "NOM-0136",
    "rating": 4.6,
    "reviewCount": 150,
    "featured": false,
    "reviews": [
      {
        "id": "rhea-solar-light-form-1",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-136-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-09T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rhea-solar-light-form-2",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-136-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-10T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "rhea-solar-light-form-3",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-136-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-11T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 137,
    "name": "Atlas Planter Atelier",
    "category": "Outdoor",
    "price": 301,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/137-atlas-planter-atelier/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/137-atlas-planter-atelier/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/137-atlas-planter-atelier/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/137-atlas-planter-atelier/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/137-atlas-planter-atelier/room.jpg"
    ],
    "description": "A refined planter shaped for terrace dinners, crafted in marine rope with a calm architectural presence for contemporary living.",
    "colors": [
      "#d5d0c4",
      "#4d382c",
      "#a6a998"
    ],
    "stock": 7,
    "sku": "NOM-0137",
    "rating": 4.6,
    "reviewCount": 157,
    "featured": false,
    "reviews": [
      {
        "id": "atlas-planter-atelier-1",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-137-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-12T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "atlas-planter-atelier-2",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-137-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-13T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "atlas-planter-atelier-3",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-137-2",
        "rating": 5,
        "title": "Worth the wait",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-14T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 138,
    "name": "Siena Patio Chair Mode",
    "category": "Outdoor",
    "price": 318,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/138-siena-patio-chair-mode/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/138-siena-patio-chair-mode/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/138-siena-patio-chair-mode/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/138-siena-patio-chair-mode/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/138-siena-patio-chair-mode/room.jpg"
    ],
    "badge": "Limited Run",
    "description": "A refined patio chair shaped for garden evenings, crafted in powder-coated aluminum with a calm architectural presence for contemporary living.",
    "colors": [
      "#f6f0e6",
      "#34322d",
      "#a85e40"
    ],
    "stock": 12,
    "sku": "NOM-0138",
    "rating": 4.7,
    "reviewCount": 164,
    "featured": false,
    "reviews": [
      {
        "id": "siena-patio-chair-mode-1",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-138-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-15T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "siena-patio-chair-mode-2",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-138-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-16T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "siena-patio-chair-mode-3",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-138-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-17T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 139,
    "name": "Vale Fire Bowl Studio",
    "category": "Outdoor",
    "price": 335,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/139-vale-fire-bowl-studio/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/139-vale-fire-bowl-studio/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/139-vale-fire-bowl-studio/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/139-vale-fire-bowl-studio/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/139-vale-fire-bowl-studio/room.jpg"
    ],
    "description": "A refined fire bowl shaped for open-air hosting, crafted in recycled stone with a calm architectural presence for contemporary living.",
    "colors": [
      "#ded6c8",
      "#202a28",
      "#8f6b52"
    ],
    "stock": 17,
    "sku": "NOM-0139",
    "rating": 4.8,
    "reviewCount": 171,
    "featured": false,
    "reviews": [
      {
        "id": "vale-fire-bowl-studio-1",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-139-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-18T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vale-fire-bowl-studio-2",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-139-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-19T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vale-fire-bowl-studio-3",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-139-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-20T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 140,
    "name": "Moss Garden Stool Reserve",
    "category": "Outdoor",
    "price": 352,
    "oldPrice": 400,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/140-moss-garden-stool-reserve/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/140-moss-garden-stool-reserve/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/140-moss-garden-stool-reserve/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/140-moss-garden-stool-reserve/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/140-moss-garden-stool-reserve/room.jpg"
    ],
    "description": "A refined garden stool shaped for balcony mornings, crafted in terracotta with a calm architectural presence for contemporary living.",
    "colors": [
      "#e5d8c4",
      "#23303a",
      "#b37b50"
    ],
    "stock": 22,
    "sku": "NOM-0140",
    "rating": 4.8,
    "reviewCount": 178,
    "featured": true,
    "reviews": [
      {
        "id": "moss-garden-stool-reserve-1",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-140-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-21T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "moss-garden-stool-reserve-2",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-140-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-22T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "moss-garden-stool-reserve-3",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-140-2",
        "rating": 4,
        "title": "Better than expected",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-23T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 141,
    "name": "Linea Solar Light Field",
    "category": "Outdoor",
    "price": 369,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/141-linea-solar-light-field/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/141-linea-solar-light-field/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/141-linea-solar-light-field/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/141-linea-solar-light-field/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/141-linea-solar-light-field/room.jpg"
    ],
    "badge": "Studio Pick",
    "description": "A refined solar light shaped for poolside calm, crafted in weathered teak with a calm architectural presence for contemporary living.",
    "colors": [
      "#f0eadf",
      "#5d3b2e",
      "#c0a16b"
    ],
    "stock": 27,
    "sku": "NOM-0141",
    "rating": 4.8,
    "reviewCount": 21,
    "featured": false,
    "reviews": [
      {
        "id": "linea-solar-light-field-1",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-141-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-24T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "linea-solar-light-field-2",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-141-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-25T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "linea-solar-light-field-3",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-141-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-01T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 142,
    "name": "Astra Planter Set",
    "category": "Outdoor",
    "price": 386,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/142-astra-planter-set/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/142-astra-planter-set/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/142-astra-planter-set/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/142-astra-planter-set/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/142-astra-planter-set/room.jpg"
    ],
    "description": "A refined planter shaped for terrace dinners, crafted in marine rope with a calm architectural presence for contemporary living.",
    "colors": [
      "#cfc2ad",
      "#191a17",
      "#d0a45d"
    ],
    "stock": 32,
    "sku": "NOM-0142",
    "rating": 4.9,
    "reviewCount": 28,
    "featured": false,
    "reviews": [
      {
        "id": "astra-planter-set-1",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-142-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-02T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "astra-planter-set-2",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-142-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-03T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "astra-planter-set-3",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-142-2",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-04T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 143,
    "name": "Sable Patio Chair Element",
    "category": "Outdoor",
    "price": 403,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/143-sable-patio-chair-element/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/143-sable-patio-chair-element/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/143-sable-patio-chair-element/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/143-sable-patio-chair-element/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/143-sable-patio-chair-element/room.jpg"
    ],
    "description": "A refined patio chair shaped for garden evenings, crafted in powder-coated aluminum with a calm architectural presence for contemporary living.",
    "colors": [
      "#e7e0d5",
      "#6f7468",
      "#a85e40"
    ],
    "stock": 0,
    "sku": "NOM-0143",
    "rating": 5,
    "reviewCount": 35,
    "featured": false,
    "reviews": [
      {
        "id": "sable-patio-chair-element-1",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-143-0",
        "rating": 5,
        "title": "Designed with care",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-05T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "sable-patio-chair-element-2",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-143-1",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-06T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "sable-patio-chair-element-3",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-143-2",
        "rating": 5,
        "title": "Feels custom",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-07T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 144,
    "name": "Cala Fire Bowl Object",
    "category": "Outdoor",
    "price": 420,
    "oldPrice": 548,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/144-cala-fire-bowl-object/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/144-cala-fire-bowl-object/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/144-cala-fire-bowl-object/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/144-cala-fire-bowl-object/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/144-cala-fire-bowl-object/room.jpg"
    ],
    "badge": "New Season",
    "description": "A refined fire bowl shaped for open-air hosting, crafted in recycled stone with a calm architectural presence for contemporary living.",
    "colors": [
      "#f1eee7",
      "#1f211d",
      "#a6a998"
    ],
    "stock": 11,
    "sku": "NOM-0144",
    "rating": 4.5,
    "reviewCount": 42,
    "featured": false,
    "reviews": [
      {
        "id": "cala-fire-bowl-object-1",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-144-0",
        "rating": 5,
        "title": "Beautifully restrained",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-08T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cala-fire-bowl-object-2",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-144-1",
        "rating": 5,
        "title": "Feels custom",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-09T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "cala-fire-bowl-object-3",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-144-2",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-10T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 145,
    "name": "Vela Garden Stool House",
    "category": "Outdoor",
    "price": 437,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/145-vela-garden-stool-house/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/145-vela-garden-stool-house/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/145-vela-garden-stool-house/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/145-vela-garden-stool-house/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/145-vela-garden-stool-house/room.jpg"
    ],
    "description": "A refined garden stool shaped for balcony mornings, crafted in terracotta with a calm architectural presence for contemporary living.",
    "colors": [
      "#d9c7ad",
      "#2f332e",
      "#7d8a76"
    ],
    "stock": 16,
    "sku": "NOM-0145",
    "rating": 4.6,
    "reviewCount": 49,
    "featured": false,
    "reviews": [
      {
        "id": "vela-garden-stool-house-1",
        "author_name": "Maya Chen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-145-0",
        "rating": 5,
        "title": "Feels custom",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-02-11T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vela-garden-stool-house-2",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-145-1",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-03-12T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "vela-garden-stool-house-3",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-145-2",
        "rating": 4,
        "title": "Worth the wait",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-04-13T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 146,
    "name": "Terra Solar Light Edition",
    "category": "Outdoor",
    "price": 454,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/146-terra-solar-light-edition/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/146-terra-solar-light-edition/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/146-terra-solar-light-edition/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/146-terra-solar-light-edition/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/146-terra-solar-light-edition/room.jpg"
    ],
    "description": "A refined solar light shaped for poolside calm, crafted in weathered teak with a calm architectural presence for contemporary living.",
    "colors": [
      "#e9dfcf",
      "#744831",
      "#c0a16b"
    ],
    "stock": 21,
    "sku": "NOM-0146",
    "rating": 4.6,
    "reviewCount": 56,
    "featured": false,
    "reviews": [
      {
        "id": "terra-solar-light-edition-1",
        "author_name": "Julian Reed",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-146-0",
        "rating": 5,
        "title": "Instantly changed the room",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-03-14T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "terra-solar-light-edition-2",
        "author_name": "Elliot Hayes",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-146-1",
        "rating": 5,
        "title": "Worth the wait",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-04-15T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "terra-solar-light-edition-3",
        "author_name": "Amelia Stone",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-146-2",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-05-16T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 147,
    "name": "Solace Planter Arc",
    "category": "Outdoor",
    "price": 471,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/147-solace-planter-arc/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/147-solace-planter-arc/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/147-solace-planter-arc/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/147-solace-planter-arc/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/147-solace-planter-arc/room.jpg"
    ],
    "badge": "Low Stock",
    "description": "A refined planter shaped for terrace dinners, crafted in marine rope with a calm architectural presence for contemporary living.",
    "colors": [
      "#c8b293",
      "#202022",
      "#b37b50"
    ],
    "stock": 26,
    "sku": "NOM-0147",
    "rating": 4.7,
    "reviewCount": 63,
    "featured": false,
    "reviews": [
      {
        "id": "solace-planter-arc-1",
        "author_name": "Nora Ellis",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-147-0",
        "rating": 5,
        "title": "Worth the wait",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-04-17T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "solace-planter-arc-2",
        "author_name": "Clara Nguyen",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-147-1",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-05-18T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "solace-planter-arc-3",
        "author_name": "Noah Bennett",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-147-2",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-06-19T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 148,
    "name": "Arden Patio Chair Room",
    "category": "Outdoor",
    "price": 488,
    "oldPrice": 596,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/148-arden-patio-chair-room/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/148-arden-patio-chair-room/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/148-arden-patio-chair-room/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/148-arden-patio-chair-room/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/148-arden-patio-chair-room/room.jpg"
    ],
    "description": "A refined patio chair shaped for garden evenings, crafted in powder-coated aluminum with a calm architectural presence for contemporary living.",
    "colors": [
      "#ebe7dc",
      "#6c7567",
      "#b95f3e"
    ],
    "stock": 31,
    "sku": "NOM-0148",
    "rating": 4.8,
    "reviewCount": 70,
    "featured": false,
    "reviews": [
      {
        "id": "arden-patio-chair-room-1",
        "author_name": "Theo Martin",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-148-0",
        "rating": 5,
        "title": "Quiet luxury",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-05-20T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "arden-patio-chair-room-2",
        "author_name": "Miles Carter",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-148-1",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-06-21T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "arden-patio-chair-room-3",
        "author_name": "Eva Laurent",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-148-2",
        "rating": 5,
        "title": "Better than expected",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-01-22T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 149,
    "name": "Nori Fire Bowl Layer",
    "category": "Outdoor",
    "price": 85,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/149-nori-fire-bowl-layer/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/149-nori-fire-bowl-layer/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/149-nori-fire-bowl-layer/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/149-nori-fire-bowl-layer/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/149-nori-fire-bowl-layer/room.jpg"
    ],
    "description": "A refined fire bowl shaped for open-air hosting, crafted in recycled stone with a calm architectural presence for contemporary living.",
    "colors": [
      "#d5d0c4",
      "#4d382c",
      "#a6a998"
    ],
    "stock": 5,
    "sku": "NOM-0149",
    "rating": 4.8,
    "reviewCount": 77,
    "featured": false,
    "reviews": [
      {
        "id": "nori-fire-bowl-layer-1",
        "author_name": "Lena Ortiz",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-149-0",
        "rating": 5,
        "title": "Precise and tactile",
        "content": "A small upgrade with a big effect. The room feels more edited, softer, and easier to live in.",
        "created_at": "2026-06-23T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "nori-fire-bowl-layer-2",
        "author_name": "Iris Morgan",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-149-1",
        "rating": 5,
        "title": "Better than expected",
        "content": "It arrived safely packaged, looked exactly like the photos, and immediately felt at home in our space.",
        "created_at": "2026-01-24T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "nori-fire-bowl-layer-3",
        "author_name": "Silas Romero",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-149-2",
        "rating": 5,
        "title": "Designed with care",
        "content": "I was looking for something refined rather than loud, and this delivered that feeling perfectly.",
        "created_at": "2026-02-25T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  },
  {
    "id": 150,
    "name": "Elio Garden Stool Series",
    "category": "Outdoor",
    "price": 102,
    "image": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/150-elio-garden-stool-series/main.jpg",
    "imageHover": "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/150-elio-garden-stool-series/hover.jpg",
    "images": [
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/150-elio-garden-stool-series/main.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/150-elio-garden-stool-series/hover.jpg",
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/products/150-elio-garden-stool-series/room.jpg"
    ],
    "badge": "Made to Order",
    "description": "A refined garden stool shaped for balcony mornings, crafted in terracotta with a calm architectural presence for contemporary living.",
    "colors": [
      "#f6f0e6",
      "#34322d",
      "#a85e40"
    ],
    "stock": 10,
    "sku": "NOM-0150",
    "rating": 4.8,
    "reviewCount": 84,
    "featured": true,
    "reviews": [
      {
        "id": "elio-garden-stool-series-1",
        "author_name": "Samira Cole",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-150-0",
        "rating": 5,
        "title": "Better than expected",
        "content": "The finish feels considered from every angle and the piece makes the room feel calmer without trying too hard.",
        "created_at": "2026-01-01T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "elio-garden-stool-series-2",
        "author_name": "Jonas Vale",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-150-1",
        "rating": 5,
        "title": "Designed with care",
        "content": "The proportions are excellent. It is useful every day but still reads like an intentional design object.",
        "created_at": "2026-02-02T12:00:00.000Z",
        "is_verified_purchase": true
      },
      {
        "id": "elio-garden-stool-series-3",
        "author_name": "Avery Brooks",
        "author_avatar": "https://i.pravatar.cc/150?u=noma-150-2",
        "rating": 4,
        "title": "Beautifully restrained",
        "content": "The color is richer in person and the material quality feels substantial. I would order from NOMA again.",
        "created_at": "2026-03-03T12:00:00.000Z",
        "is_verified_purchase": true
      }
    ]
  }
];

export const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
