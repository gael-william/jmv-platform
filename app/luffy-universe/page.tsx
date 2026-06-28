import { LuffyUniverseExperience } from "@/components/luffy-universe";

import { readdir } from "node:fs/promises";
import { join } from "node:path";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const videoExtensions = new Set([".mp4", ".webm", ".mov", ".m4v"]);

async function getPublicFiles(folder: "images" | "videos", extensions: Set<string>) {
  try {
    const files = await readdir(join(process.cwd(), "public", folder));

    return files
      .filter((file) => {
        const extension = file.slice(file.lastIndexOf(".")).toLowerCase();

        return extensions.has(extension);
      })
      .sort((first, second) => first.localeCompare(second, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

export default async function LuffyUniverse() {
  const [images, videos] = await Promise.all([
    getPublicFiles("images", imageExtensions),
    getPublicFiles("videos", videoExtensions),
  ]);

  return (
    <LuffyUniverseExperience
      imageSources={images.map((file) => `/images/${encodeURIComponent(file)}`)}
      videoFiles={videos}
    />
  );
}
