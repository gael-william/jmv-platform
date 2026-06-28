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
    name: "Nidal Christou",
    city: "Burkina Faso",
    image: "/images/home/luffy-shooting-4.jpeg",
    signal: "Repérage éditorial IA",
  },
  {
    name: "Kai Voss",
    city: "Milan",
    image: "/images/home/c16.jpg",
    signal: "Runway chrome",
  },
  {
    name: "Sienna Vale",
    city: "New York",
    image: "/images/home/c19.jpg",
    signal: "Campagne prestige",
  },
  {
    name: "Mika Saint",
    city: "Tokyo",
    image: "/images/home/c20.jpg",
    signal: "Portfolio en mouvement",
  },
];

export const fashionVideos: FashionVideo[] = [
  {
    title: "Neon Couture Walk",
    meta: "Boucle runway 4K",
    image:
      "/images/home/c21.jpg",
    videoUrl:
      "/videos/luffy.mp4",
  },
  {
    title: "Chrome Casting Room",
    meta: "Reel studio",
    image:
      "/images/home/c18.jpg",
    videoUrl:
      "/videos/chrome.mp4",
  },
  {
    title: "Afterdark Fittings",
    meta: "Montage créateur",
    image:
      "/images/home/c17.jpg",
    videoUrl:
      "/videos/afterdark.mp4",
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
