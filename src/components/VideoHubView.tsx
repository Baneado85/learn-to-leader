"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Play, Search } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { useEffect } from "react";

interface Video {
  id: string;
  title: string;
  author: string;
  duration: string;
}

interface Category {
  title: string;
  videos: Video[];
}

interface VideoHubProps {
  onBack: () => void;
  onSelectVideo: (video: { id: string; title: string }) => void;
}

export default function VideoHubView({ onBack, onSelectVideo }: VideoHubProps) {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }, []);

  const categories: Category[] = [
    {
      title: t('home.hub.catEmployability'),
      videos: [
        { id: "SO8QfM4brDk", title: t('home.videos.cv'), author: t('home.videos.cvAuthor'), duration: "12 min" },
        { id: "7yPw7WoL9zk", title: t('home.videos.interview'), author: t('home.videos.interviewAuthor'), duration: "15 min" },
        { id: "uzFdxoT4oBw", title: t('home.videos.linkedin'), author: t('home.videos.linkedinAuthor'), duration: "15 min" },
        { id: "AY9k0-60v8Q", title: t('home.videos.networking'), author: t('home.videos.networkingAuthor'), duration: "10 min" },
      ]
    },
    {
      title: t('home.hub.catSoftSkills'),
      videos: [
        { id: "dk6qWf762K8", title: t('home.videos.leadership'), author: t('home.videos.leadershipAuthor'), duration: "10 min" },
        { id: "t76cFrt2jUw", title: t('home.videos.negotiation'), author: t('home.videos.negotiationAuthor'), duration: "14 min" },
        { id: "0vS6S996Vrc", title: t('home.videos.comm'), author: t('home.videos.commAuthor'), duration: "20 min" },
      ]
    },
    {
      title: t('home.hub.catDigitalTools'),
      videos: [
        { id: "3UAjnXXOVaw", title: t('home.videos.social'), author: t('home.videos.socialAuthor'), duration: "18 min" },
        { id: "H0ath6TwDaY", title: t('home.videos.nocode'), author: t('home.videos.nocodeAuthor'), duration: "25 min" },
        { id: "y8K1_Y_6S8o", title: t('home.videos.aiPro'), author: t('home.videos.aiProAuthor'), duration: "12 min" },
      ]
    }
  ];

  const getThumbnail = (id: string) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-brand-light/30 pb-32"
    >
      {/* Header */}
      <div className="bg-brand-light/40 backdrop-blur-md px-6 pt-20 pb-6 sticky top-0 z-20 border-b border-brand-light/50 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-3 mt-2 bg-white/80 hover:bg-white rounded-2xl transition-all active:scale-95 shadow-sm border border-brand-light"
        >
          <ArrowLeft className="text-brand-dark" size={24} />
        </button>
        <h2 className="text-2xl mt-2 font-fredoka text-brand-dark drop-shadow-sm">{t('home.hub.exploreAll')}</h2>
      </div>

      {/* Search Bar (Visual) */}
      <div className="px-6 mt-6">
        <div className="bg-white border-2 border-brand-light rounded-2xl p-3 flex items-center gap-3 shadow-sm">
          <Search className="text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar videos..." 
            className="flex-1 bg-transparent outline-none text-sm font-medium"
            readOnly
          />
        </div>
      </div>

      {/* Categories Feed */}
      <div className="flex flex-col gap-10 mt-8">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <h3 className="text-xl font-fredoka text-brand-dark px-6">{cat.title}</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 px-6 scrollbar-hide">
              {cat.videos.map((vid) => (
                <motion.button 
                  key={vid.id} 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectVideo({ id: vid.id, title: vid.title })}
                  className="min-w-[280px] text-left bg-white border-2 border-brand-light rounded-3xl overflow-hidden shadow-sm flex flex-col group"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={getThumbnail(vid.id)} 
                      alt={vid.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-brand-primary/90 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={24} fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 rounded text-white text-[10px] font-bold">
                      {vid.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-base text-brand-dark leading-snug mb-1 line-clamp-2">{vid.title}</p>
                    <p className="text-xs text-gray-400 font-medium">Canal: {vid.author}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
