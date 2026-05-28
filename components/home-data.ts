import { Camera, Crown, Film, Sparkles, type LucideIcon } from "lucide-react";

export type FeaturedModel = {
  name: string;
  city: string;
  image: string;
  signal: string;
};

export type FashionVideo = {
  title: string;
  meta: string;
  image: string;
  videoUrl: string;
};

export type Category = {
  label: string;
  count: string;
  icon: LucideIcon;
};

export const navItems = [
  { label: "Mannequins", href: "#models" },
  { label: "Runway", href: "#runway" },
  { label: "Vidéos", href: "#videos" },
  { label: "Studios", href: "#studios" },
];

export const featuredModels: FeaturedModel[] = [
  {
    name: "Aurelia Noire",
    city: "Paris",
    image: "/images/c12.jpeg",
    signal: "Repérage éditorial IA",
  },
  {
    name: "Kai Voss",
    city: "Milan",
    image: "/images/c7.jpeg",
    signal: "Runway chrome",
  },
  {
    name: "Sienna Vale",
    city: "New York",
    image: "/images/c8.jpeg",
    signal: "Campagne prestige",
  },
  {
    name: "Mika Saint",
    city: "Tokyo",
    image: "/images/c9.jpeg",
    signal: "Portfolio en mouvement",
  },
];

export const fashionVideos: FashionVideo[] = [
  {
    title: "Neon Couture Walk",
    meta: "Boucle runway 4K",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    videoUrl:
      "/videos/luffy.mp4",
  },
  {
    title: "Chrome Casting Room",
    meta: "Reel studio",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
  {
    title: "Afterdark Fittings",
    meta: "Montage créateur",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
];

export const categories: Category[] = [
  { label: "Éditorial", count: "128", icon: Camera },
  { label: "Runway", count: "94", icon: Sparkles },
  { label: "Commercial", count: "212", icon: Crown },
  { label: "Motion", count: "76", icon: Film },
];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};
