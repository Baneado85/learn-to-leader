"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, Language } from "@/store/useGameStore";
import { Briefcase, Rocket, ChevronRight, Sparkles, Globe } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { getAssetUrl } from "@/lib/assetUrl";

export default function AuthOnboarding() {
  const [step, setStep] = useState(1); // 1: Login, 2: Selection
  const [name, setName] = useState("");
  const { login, setPath, completeOnboarding, language, setLanguage } = useGameStore();
  const { t } = useTranslation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name, getAssetUrl("/newUserLogo.webp"));
      setStep(2);
    }
  };

  const handlePathSelect = (path: 'work' | 'digitalize') => {
    setPath(path);
    completeOnboarding();
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'pt', label: 'PT', flag: '🇧🇷' },
  ];

  return (
    <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-6 text-center">
      {/* Language selector for onboarding */}
      <div className="absolute top-8 flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition-all ${
              language === lang.code 
              ? "border-brand-primary bg-brand-primary text-white" 
              : "border-white bg-white text-gray-400"
            }`}
          >
            {lang.flag} {lang.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-sm"
          >
            <div className="mb-8">
              <div className="w-28 h-28 mx-auto mb-4 animate-bobbing">
                <img 
                  src={getAssetUrl("/assets/images/logoLearnToLeader.webp")} 
                  alt="Logo Learn to Leader" 
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </div>
              <h1 className="text-4xl font-fredoka text-brand-dark mb-2">Learn to Leader</h1>
              <p className="text-gray-500 font-medium italic">{t('onboarding.empowering')}</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder={t('onboarding.whatsYourName')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border-2 border-brand-light rounded-2xl py-4 px-6 font-bold text-brand-dark focus:border-brand-primary outline-none transition-colors text-center"
                required
              />
              <button type="submit" className="btn-primary w-full py-4 text-lg">
                {t('onboarding.startJourney')}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="selection"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md flex flex-col gap-6"
          >
            <h2 className="text-3xl font-fredoka text-brand-dark">
              {t('onboarding.welcomeName', { name })}
            </h2>
            <p className="text-gray-500 font-bold text-lg mb-4">{t('onboarding.whatsYourGoal')}</p>

            <div className="grid gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePathSelect('work')}
                className="bg-white border-2 border-brand-primary rounded-3xl p-6 text-left flex items-center gap-4 group"
              >
                <div className="bg-brand-primary/10 p-4 rounded-2xl group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <Briefcase className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-fredoka text-brand-dark">{t('onboarding.work')}</h3>
                  <p className="text-sm text-gray-500">{t('onboarding.workDesc')}</p>
                </div>
                <ChevronRight className="text-gray-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePathSelect('digitalize')}
                className="bg-white border-2 border-brand-accent rounded-3xl p-6 text-left flex items-center gap-4 group"
              >
                <div className="bg-brand-accent/10 p-4 rounded-2xl group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Rocket className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-fredoka text-brand-dark">{t('onboarding.digitalize')}</h3>
                  <p className="text-sm text-gray-500">{t('onboarding.digitalizeDesc')}</p>
                </div>
                <ChevronRight className="text-gray-300" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
