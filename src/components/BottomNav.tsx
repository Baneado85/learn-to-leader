"use client";

import { Home, Map as MapIcon, Zap, User } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const { t } = useTranslation();

  const tabs = [
    { id: "home", icon: Home, label: t('nav.home') },
    { id: "map", icon: MapIcon, label: t('nav.map') },
    { id: "challenges", icon: Zap, label: t('nav.challenges') },
    { id: "profile", icon: User, label: t('nav.profile') },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t-2 border-brand-light h-20 flex justify-around items-center px-2 z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center justify-center w-full h-full relative"
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute top-0 w-12 h-1 bg-brand-primary rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Icon 
              className={`w-6 h-6 mb-1 ${isActive ? "text-brand-primary" : "text-gray-400"}`} 
              fill={isActive ? "currentColor" : "none"}
            />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-brand-primary" : "text-gray-400"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
