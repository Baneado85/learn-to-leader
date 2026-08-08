"use client";

import { motion } from "framer-motion";
import { useGameStore, Language } from "@/store/useGameStore";
import { Award, ShieldCheck, Zap, Users, LogOut, Globe, Image as ImageIcon, UserCheck } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { getAssetUrl } from "@/lib/assetUrl";
import AvatarImage from "@/components/AvatarImage";

export default function ProfileView() {
  const { xp, level, user, logout, language, setLanguage, setAvatar } = useGameStore();
  const { t } = useTranslation();

  const achievements = [
    { id: 1, name: t('profile.achievementList.firstStep'), icon: Zap, unlocked: true },
    { id: 2, name: t('profile.achievementList.networker'), icon: Users, unlocked: true },
    { id: 3, name: t('profile.achievementList.unstoppable'), icon: ShieldCheck, unlocked: false },
    { id: 4, name: t('profile.achievementList.master'), icon: Award, unlocked: false },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
  ];

  return (
    <div className="px-6 pt-24 pb-32 flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 rounded-full border-4 border-brand-primary p-1 relative shadow-md">
          <div className="w-full h-full bg-brand-light rounded-full flex items-center justify-center overflow-hidden">
            <AvatarImage avatarUrl={user?.avatar} name={user?.name} iconSize={48} className="w-full h-full" />
          </div>
          <button 
            onClick={() => logout()}
            title="Cerrar sesión"
            className="absolute bottom-0 right-0 bg-white border-2 border-brand-light p-2 rounded-full shadow-md text-red-500 hover:bg-red-50"
          >
            <LogOut size={16} />
          </button>
        </div>

        {/* Avatar option buttons */}
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setAvatar(null)}
            className={`px-3 py-1.5 rounded-full font-bold border flex items-center gap-1 transition-all ${
              !user?.avatar
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <UserCheck size={14} /> Sin foto (Predeterminado)
          </button>
          <button
            onClick={() => setAvatar("/newUserLogo.webp")}
            className={`px-3 py-1.5 rounded-full font-bold border flex items-center gap-1 transition-all ${
              user?.avatar
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <ImageIcon size={14} /> Con foto
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-fredoka text-brand-dark">{user?.name || t('common.defaultUser')}</h2>
          <p className="text-brand-primary font-bold">{t('common.level')} {level}</p>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{user?.email}</p>
        </div>
      </div>

      {/* Language Selector */}
      <div className="bg-white border-2 border-brand-light rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="text-brand-primary w-5 h-5" />
          <h3 className="font-fredoka text-lg text-brand-dark">{t('profile.language')}</h3>
        </div>
        <div className="flex gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex-1 py-2 px-1 rounded-2xl border-2 font-bold text-xs transition-all ${
                language === lang.code 
                ? "border-brand-primary bg-brand-primary/5 text-brand-primary" 
                : "border-gray-100 text-gray-400 hover:border-brand-light"
              }`}
            >
              <span className="block text-lg mb-1">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Radar / Bars */}
      <div className="bg-white border-2 border-brand-light rounded-3xl p-6 shadow-sm">
        <h3 className="font-fredoka text-lg mb-4 text-brand-dark">{t('profile.skillsTitle')}</h3>
        <div className="flex flex-col gap-4">
          {[
            { name: t('profile.skills.communication'), val: 80, color: "bg-blue-400" },
            { name: t('profile.skills.leadership'), val: 65, color: "bg-brand-primary" },
            { name: t('profile.skills.marketing'), val: 45, color: "bg-brand-accent" },
            { name: t('profile.skills.negotiation'), val: 30, color: "bg-brand-success" },
          ].map(skill => (
            <div key={skill.name} className="flex flex-col gap-1">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                <span>{skill.name}</span>
                <span>{skill.val}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.val}%` }}
                  className={`${skill.color} h-full rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="flex flex-col gap-4">
        <h3 className="font-fredoka text-lg px-1 text-brand-dark">{t('profile.achievements')}</h3>
        <div className="grid grid-cols-4 gap-4">
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <div key={ach.id} className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${ach.unlocked ? "bg-white border-brand-accent shadow-md text-brand-accent" : "bg-gray-100 border-gray-200 text-gray-300"}`}>
                  <Icon className={ach.unlocked ? "animate-pulse-soft" : ""} />
                </div>
                <span className={`text-[8px] font-bold text-center uppercase ${ach.unlocked ? "text-brand-dark" : "text-gray-300"}`}>
                  {ach.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
