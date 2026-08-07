"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { Check, Lock, Star } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import InteractiveMission from "./InteractiveMission";

export default function LearningMap() {
  const { unlockedNodes, selectedPath, completedMissions } = useGameStore();
  const { t } = useTranslation();
  const [activeMission, setActiveMission] = useState<{ id: string, title: string, type: 'text' | 'image' | 'chat', videoId: string } | null>(null);

  const employabilityNodes = [
    { id: "e1", label: t('map.nodes.e1'), x: 50, type: 'text', videoId: 'uOcR1JD3ryk' },
    { id: "e2", label: t('map.nodes.e2'), x: 20, type: 'image', videoId: 'uzFdxoT4oBw' },
    { id: "e3", label: t('map.nodes.e3'), x: 70, type: 'image', videoId: 'AY9k0-60v8Q' },
    { id: "e4", label: t('map.nodes.e4'), x: 40, type: 'chat', videoId: '761ae_KDg_Q' },
    { id: "e5", label: t('map.nodes.e5'), x: 80, type: 'chat', videoId: 'dQw4w9WgXcQ' },
  ];

  const businessNodes = [
    { id: "b1", label: t('map.nodes.b1'), x: 50, type: 'text', videoId: 'L_LUpnjuyP0' },
    { id: "b2", label: t('map.nodes.b2'), x: 20, type: 'image', videoId: 'q_D6mS_v7y8' },
    { id: "b3", label: t('map.nodes.b3'), x: 70, type: 'image', videoId: '0vS6S996Vrc' },
    { id: "b4", label: t('map.nodes.b4'), x: 40, type: 'chat', videoId: 'uzFdxoT4oBw' },
    { id: "b5", label: t('map.nodes.b5'), x: 80, type: 'chat', videoId: 'uOcR1JD3ryk' },
  ];

  const activeNodes = selectedPath === 'work' ? employabilityNodes : businessNodes;
  const pathTitle = selectedPath === 'work' ? t('map.workTitle') : t('map.businessTitle');

  const handleNodeClick = (node: any) => {
    const isUnlocked = unlockedNodes.includes(node.id);
    if (!isUnlocked) return;
    
    setActiveMission({
      id: node.id,
      title: node.label,
      type: node.type as any,
      videoId: node.videoId
    });
  };

  return (
    <div className="flex flex-col items-center pt-24 pb-32 overflow-hidden relative min-h-screen">
      
      <AnimatePresence>
        {activeMission && (
          <InteractiveMission 
            missionId={activeMission.id}
            title={activeMission.title}
            type={activeMission.type}
            videoId={activeMission.videoId}
            onClose={() => setActiveMission(null)}
          />
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-md px-10">
        <div className="flex flex-col gap-16">
          {activeNodes.map((node, index) => {
            const isUnlocked = unlockedNodes.includes(node.id);
            const isCompleted = completedMissions.includes(node.id);
            const isCurrent = unlockedNodes[unlockedNodes.length - 1] === node.id && !isCompleted;

            return (
              <div 
                key={node.id} 
                className="flex flex-col items-center"
                style={{ 
                  alignSelf: node.x < 50 ? "flex-start" : node.x > 50 ? "flex-end" : "center",
                  marginRight: node.x > 50 ? "10%" : "0",
                  marginLeft: node.x < 50 ? "10%" : "0"
                }}
              >
                <motion.button
                  whileHover={isUnlocked ? { scale: 1.1 } : {}}
                  whileTap={isUnlocked ? { scale: 0.9 } : {}}
                  onClick={() => handleNodeClick(node)}
                  className={`
                    w-20 h-20 rounded-full flex items-center justify-center shadow-[0_6px_0_0_rgba(0,0,0,0.1)]
                    relative transition-colors duration-300
                    ${isUnlocked 
                      ? isCompleted 
                        ? "bg-brand-success border-4 border-green-600 shadow-green-100" 
                        : "bg-brand-primary border-4 border-orange-700 animate-pulse-soft"
                      : "bg-gray-200 border-4 border-gray-300 cursor-not-allowed"}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-10 h-10 text-white stroke-[3px]" />
                  ) : isUnlocked ? (
                    <Star className="w-10 h-10 text-white fill-white" />
                  ) : (
                    <Lock className="w-8 h-8 text-gray-400" />
                  )}
                  
                  {isCurrent && (
                    <div className="absolute -top-12 bg-white px-3 py-1 rounded-xl shadow-md border-2 border-brand-primary animate-bounce">
                      <span className="text-xs font-bold text-brand-primary whitespace-nowrap uppercase">
                        {t('map.tapHere')}
                      </span>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-brand-primary"></div>
                    </div>
                  )}
                </motion.button>
                <span className={`mt-3 font-fredoka text-sm text-center max-w-[100px] ${isUnlocked ? "text-brand-dark" : "text-gray-400"}`}>
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
