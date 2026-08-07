"use client";

import { motion } from "framer-motion";
import { Zap, CheckCircle2, Circle } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useTranslation } from "@/lib/i18n/useTranslation";
import confetti from "canvas-confetti";

export default function ChallengesView() {
  const { addXp, selectedPath, streak } = useGameStore();
  const { t } = useTranslation();

  const employabilityTasks = [
    { id: 1, title: t('challenges.tasks.linkedin'), xp: 50, progress: 0, total: 1 },
    { id: 2, title: t('challenges.tasks.videos'), xp: 30, progress: 2, total: 3 },
    { id: 3, title: t('challenges.tasks.networking'), xp: 20, progress: 1, total: 1 },
  ];

  const businessTasks = [
    { id: 1, title: t('challenges.tasks.reel'), xp: 50, progress: 0, total: 1 },
    { id: 2, title: t('challenges.tasks.messages'), xp: 30, progress: 4, total: 5 },
    { id: 3, title: t('challenges.tasks.catalog'), xp: 20, progress: 0, total: 1 },
  ];

  const dailyTasks = selectedPath === 'work' ? employabilityTasks : businessTasks;

  const handleClaim = (xp: number) => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.8 },
      colors: ["#E76F51", "#2A9D8F", "#E9C46A"]
    });
    addXp(xp);
  };

  return (
    <div className="px-6 pt-24 pb-32 flex flex-col gap-6">
      <header className="bg-brand-primary rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-fredoka">{t('challenges.streakTitle', { streak: streak.toString() })}</h2>
          <p className="opacity-90 font-medium">{t('challenges.streakSubtitle')}</p>
        </div>
        <Zap className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12" />
      </header>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-fredoka text-brand-dark px-1">{t('challenges.title')}</h3>
        
        {dailyTasks.map((task) => {
          const isDone = task.progress >= task.total;
          
          return (
            <div key={task.id} className="bg-white border-2 border-brand-light rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {isDone ? (
                    <CheckCircle2 className="text-brand-success w-6 h-6" />
                  ) : (
                    <Circle className="text-gray-300 w-6 h-6" />
                  )}
                  <span className={`font-bold ${isDone ? "text-gray-400 line-through" : "text-brand-dark"}`}>
                    {task.title}
                  </span>
                </div>
                <span className="text-sm font-fredoka text-brand-primary">+{task.xp} {t('common.xp')}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(task.progress / task.total) * 100}%` }}
                    className="bg-brand-primary h-full rounded-full"
                  />
                </div>
                <span className="text-xs font-bold text-gray-500">{task.progress}/{task.total}</span>
              </div>

              {isDone && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClaim(task.xp)}
                  className="w-full bg-brand-success text-white font-fredoka py-2 rounded-xl text-sm"
                >
                  {t('challenges.claim')}
                </motion.button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
