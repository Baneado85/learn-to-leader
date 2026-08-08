"use client";

import { useGameStore } from "@/store/useGameStore";
import { Flame, Star, Hexagon } from "lucide-react";
import { motion } from "framer-motion";
import { getAssetUrl } from "@/lib/assetUrl";
import AvatarImage from "@/components/AvatarImage";

export default function TopBar() {
  const { streak, xp, gems, user } = useGameStore();

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-b-2 border-brand-light z-50 px-4 h-16 flex items-center justify-between shadow-sm">
      <div className="flex gap-3">
        {/* Streak */}
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-1"
        >
          <Flame className="w-5 h-5 text-brand-primary fill-brand-primary" />
          <span className="font-fredoka text-brand-primary font-bold text-sm">{streak}</span>
        </motion.div>

        {/* XP */}
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-1"
        >
          <Star className="w-5 h-5 text-brand-accent fill-brand-accent" />
          <span className="font-fredoka text-brand-accent font-bold text-sm">{xp}</span>
        </motion.div>
      </div>

      {/* Center Logo/Title */}
      <div className="flex-1 flex justify-center">
        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-brand-light">
          <img 
            src={getAssetUrl("/assets/images/logoLearnToLeader.webp")} 
            alt="Logo" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Gems */}
        <div className="flex items-center gap-1">
          <Hexagon className="w-5 h-5 text-blue-500 fill-blue-500" />
          <span className="font-fredoka text-blue-500 font-bold text-sm">{gems}</span>
        </div>
        
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-brand-light border-2 border-brand-primary flex items-center justify-center text-[10px] font-bold overflow-hidden shadow-sm">
          <AvatarImage avatarUrl={user?.avatar} name={user?.name} iconSize={16} />
        </div>
      </div>
    </div>
  );
}

