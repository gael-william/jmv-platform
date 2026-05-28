export type FeedMediaType = "image" | "video";

export type FashionFeedItem = {
  id: string;
  modelName: string;
  title: string;
  description: string;
  category: string;
  photographer: string;
  stylist: string;
  location: string;
  tags: string[];
  mediaType: FeedMediaType;
  imageUrl?: string;
  videoUrl?: string;
  likes: string;
  comments: string;
};

export const fashionFeed: FashionFeedItem[] = [
  {
    id: "jmv-aurelia-noire-001",
    modelName: "Aurelia Noire",
    title: "Éditorial voile chrome",
    description:
      "Une étude monochrome de luxe, entre styling métal liquide, lumière sculptée et ambiance runway de nuit.",
    category: "Éditorial",
    photographer: "Mara Voss",
    stylist: "Eli Saint",
    location: "Paris",
    tags: ["chrome", "couture", "monochrome", "vogue-futur"],
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=88",
    likes: "28.4K",
    comments: "1.6K",
  },
  {
    id: "jmv-kai-voss-002",
    modelName: "Kai Voss",
    title: "Signal runway de minuit",
    description:
      "Un reel runway masculin futuriste, porté par un tailoring noir, des détails argent et une gestuelle millimétrée.",
    category: "Runway",
    photographer: "Noah Ren",
    stylist: "Cassian Grey",
    location: "Milan",
    tags: ["runway", "tailoring", "costume-noir", "cyber-luxe"],
    mediaType: "video",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1400&q=88",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    likes: "19.7K",
    comments: "984",
  },
  {
    id: "jmv-sienna-vale-003",
    modelName: "Sienna Vale",
    title: "Couture sous verre",
    description:
      "Une image campagne haute couture, entre textures réfléchissantes, posture sculpturale et retenue luxueuse.",
    category: "Campagne",
    photographer: "Juliette Marr",
    stylist: "Rina Kade",
    location: "New York",
    tags: ["campagne", "verre", "couture", "luxe"],
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=88",
    likes: "42.1K",
    comments: "2.4K",
  },
  {
    id: "jmv-mika-saint-004",
    modelName: "Mika Saint",
    title: "Fittings Redline Tokyo",
    description:
      "Une capsule fitting pensée pour le mouvement, avec accents cramoisis, matières techniques et énergie cyber atelier.",
    category: "Motion",
    photographer: "Akira Sol",
    stylist: "Mina Cho",
    location: "Tokyo",
    tags: ["motion", "tokyo", "redline", "atelier"],
    mediaType: "video",
    imageUrl:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1400&q=88",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    likes: "31.8K",
    comments: "1.9K",
  },
  {
    id: "jmv-luna-aster-005",
    modelName: "Luna Aster",
    title: "Code resort obsidienne",
    description:
      "Une histoire resort noire et argent, peau impeccable, styling glossy et tension éditoriale maîtrisée.",
    category: "Commercial",
    photographer: "Theo Laurent",
    stylist: "Nadia Vale",
    location: "Dubai",
    tags: ["resort", "commercial", "obsidienne", "argent"],
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=88",
    likes: "17.3K",
    comments: "742",
  },
  {
    id: "jmv-iman-cross-006",
    modelName: "Iman Cross",
    title: "Protocole denim afterdark",
    description:
      "Un éditorial street-luxe entre structure denim, accessoires chrome et lumière urbaine nocturne.",
    category: "Éditorial",
    photographer: "Selene Ward",
    stylist: "Marco Ilan",
    location: "London",
    tags: ["denim", "street-luxe", "chrome", "nuit"],
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=88",
    likes: "23.9K",
    comments: "1.1K",
  },
];
