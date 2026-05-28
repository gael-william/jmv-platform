"use client";

import { useRef } from "react";

import { AnimatedBackground } from "@/components/animated-background";
import { Categories } from "@/components/categories";
import { FeedContainer, type FeedContainerHandle } from "@/components/feed-container";
import { FeaturedModels } from "@/components/featured-models";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { LuffyButton } from "@/components/luffy-button";
import { Navbar } from "@/components/navbar";
import { TrendingVideos } from "@/components/trending-videos";
import { UploadModal } from "@/components/upload-modal";

export function JmvHome() {
  const feedRef = useRef<FeedContainerHandle>(null);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <FeaturedModels />
      <TrendingVideos />
      <FeedContainer ref={feedRef} />
      <Categories />
      <LuffyButton />
      <Footer />
      <UploadModal onUploadSuccess={() => feedRef.current?.refetch()} />
    </main>
  );
}
