"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import Mascot from "@/components/Mascot";
import HomeView from "@/components/HomeView";
import LearningMap from "@/components/LearningMap";
import ChallengesView from "@/components/ChallengesView";
import ProfileView from "@/components/ProfileView";
import AuthOnboarding from "@/components/AuthOnboarding";
import { useGameStore } from "@/store/useGameStore";
import { useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const { hasCompletedOnboarding } = useGameStore();

  // Reset scroll to top when changing tabs with multiple methods and a small delay
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    scrollToTop();
    const timer = setTimeout(scrollToTop, 100); // Wait for transition/render
    return () => clearTimeout(timer);
  }, [activeTab]);

  if (!hasCompletedOnboarding) {
    return <AuthOnboarding />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeView key="home" />;
      case "map":
        return <LearningMap key="map" />;
      case "challenges":
        return <ChallengesView key="challenges" />;
      case "profile":
        return <ProfileView key="profile" />;
      default:
        return <HomeView key="home" />;
    }
  };

  return (
    <main className="min-h-screen max-w-md mx-auto bg-brand-light relative">
      <TopBar />
      
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <Mascot />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}
