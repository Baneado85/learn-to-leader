"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Rocket, TrendingUp, Trophy, Play, Calendar, X, MessageSquare, Send, ArrowRight } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useTranslation } from "@/lib/i18n/useTranslation";
import VideoHubView from "./VideoHubView";
import FeedSection from "./FeedSection";

interface Comment {
  id: number;
  user: string;
  text: string;
  isExpert: boolean;
  time: string;
}

export default function HomeView() {
  const { user, selectedPath, level } = useGameStore();
  const { t } = useTranslation();
  const [showVideoHub, setShowVideoHub] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);
  
  const [videoComments, setVideoComments] = useState<Record<string, Comment[]>>({
    "SO8QfM4brDk": [
      { id: 1, user: "Juan P.", text: "¡Muy buena explicación sobre el CV! Me ayudó mucho.", isExpert: false, time: "2h" },
      { id: 2, user: "Coach Sofía", text: "¡De nada Juan! Éxitos con tu postulación.", isExpert: true, time: "1h" },
    ],
    "7yPw7WoL9zk": [
      { id: 3, user: "Maria G.", text: "¿Cómo puedo resaltar mi perfil de LinkedIn sin experiencia?", isExpert: false, time: "5h" },
      { id: 4, user: "Diego Ruiz", text: "Enfócate en tus proyectos personales y habilidades blandas.", isExpert: true, time: "4h" },
    ],
    "t76cFrt2jUw": [
      { id: 5, user: "Carlos L.", text: "La negociación me da un poco de miedo, ¿algún tip?", isExpert: false, time: "10m" },
    ]
  });

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };
    scrollToTop();
    const timer = setTimeout(scrollToTop, 100);
    return () => clearTimeout(timer);
  }, [showVideoHub, activeVideo]);

  const employabilityVideos = [
    { id: "SO8QfM4brDk", title: t('home.videos.cv'), author: t('home.videos.cvAuthor'), duration: "12 min" },
    { id: "7yPw7WoL9zk", title: t('home.videos.interview'), author: t('home.videos.interviewAuthor'), duration: "15 min" },
    { id: "dk6qWf762K8", title: t('home.videos.leadership'), author: t('home.videos.leadershipAuthor'), duration: "10 min" },
  ];

  const businessVideos = [
    { id: "3UAjnXXOVaw", title: t('home.videos.social'), author: t('home.videos.socialAuthor'), duration: "18 min" },
    { id: "H0ath6TwDaY", title: t('home.videos.nocode'), author: t('home.videos.nocodeAuthor'), duration: "25 min" },
    { id: "t76cFrt2jUw", title: t('home.videos.negotiation'), author: t('home.videos.negotiationAuthor'), duration: "14 min" },
  ];

  const videos = selectedPath === 'work' ? employabilityVideos : businessVideos;
  const getThumbnail = (id: string) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  const currentComments = activeVideo ? (videoComments[activeVideo.id] || []) : [];

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !activeVideo) return;
    const comment: Comment = {
      id: Date.now(),
      user: user?.name || t('common.defaultUser'),
      text: newComment.trim(),
      isExpert: false,
      time: "ahora"
    };
    setVideoComments(prev => ({ ...prev, [activeVideo.id]: [...(prev[activeVideo.id] || []), comment] }));
    setNewComment("");
  };

  return (
    <div className="relative min-h-screen">
      {/* Main Home Content */}
      <div className={`px-6 pt-24 pb-32 flex flex-col gap-8 transition-opacity duration-300 ${showVideoHub ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <header>
          <h1 className="text-3xl font-fredoka text-brand-dark">
            {t('common.welcome', { name: user?.name || t('common.defaultUser') })} 👋
          </h1>
          <p className="text-gray-500 font-medium">
            {selectedPath === 'work' ? t('home.workPath') : t('home.businessPath')}
          </p>
        </header>

        {/* Video Resources */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-fredoka text-brand-dark px-1">{t('home.suggestedVideos')}</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {videos.map((vid) => (
              <motion.button 
                key={vid.id} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveVideo({ id: vid.id, title: vid.title })}
                className="min-w-[240px] text-left bg-white border-2 border-brand-light rounded-2xl overflow-hidden shadow-sm flex flex-col group"
              >
                <div className="bg-gray-100 h-32 relative flex items-center justify-center overflow-hidden">
                  <img src={getThumbnail(vid.id)} alt={vid.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20" />
                  <Play className="absolute text-white w-10 h-10 drop-shadow-lg" />
                  <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-white text-[10px] font-bold">{vid.duration}</div>
                </div>
                <div className="p-3">
                  <p className="font-bold text-sm text-brand-dark leading-tight mb-1 line-clamp-1">{vid.title}</p>
                  <p className="text-xs text-gray-400">Por {vid.author}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowVideoHub(true)}
            className="w-full py-4 bg-white border-2 border-brand-primary/20 rounded-2xl text-brand-primary font-bold text-sm flex items-center justify-center gap-2"
          >
            {t('home.hub.exploreAll')}
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Feed & Stats */}
        <div className="flex flex-col gap-8">
          <div className="bg-white border-2 border-brand-light rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-fredoka text-lg text-brand-dark">{t('home.upcomingWorkshops')}</h3>
              <Calendar className="text-brand-primary w-5 h-5" />
            </div>
            <div className="flex flex-col gap-3">
              {[{ date: `${t('home.today')} 18:00`, title: t('home.workshops.liveInterview'), type: t('home.webinar') }].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl">
                  <div className="bg-brand-primary/10 px-2 py-1 rounded-lg text-center min-w-[60px]">
                    <span className="text-[10px] font-bold text-brand-primary uppercase">{item.date}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-brand-dark">{item.title}</p>
                    <p className="text-[10px] text-gray-400">{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-fredoka text-brand-dark px-1">{t('home.feed.sectionTitle')}</h3>
            <FeedSection />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-4 flex flex-col items-center text-center">
              <TrendingUp className="text-blue-500 mb-2" />
              <span className="text-2xl font-fredoka text-blue-700">Top 5%</span>
              <span className="text-[10px] font-bold text-blue-400 uppercase">{t('home.inYourCity')}</span>
            </div>
            <div className="bg-purple-50 border-2 border-purple-100 rounded-2xl p-4 flex flex-col items-center text-center">
              <Trophy className="text-purple-500 mb-2" />
              <span className="text-2xl font-fredoka text-purple-700">{t('common.level')} {level}</span>
              <span className="text-[10px] font-bold text-purple-400 uppercase">{t('home.rankSilver')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Hub Overlay */}
      <AnimatePresence>
        {showVideoHub && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute inset-0 z-[40] bg-brand-light"
          >
            <VideoHubView 
              onBack={() => setShowVideoHub(false)} 
              onSelectVideo={(vid) => setActiveVideo(vid)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-md z-[100] flex items-end justify-center overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full h-[90vh] rounded-t-[40px] relative shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-white sticky top-0 z-10">
                <h4 className="font-fredoka text-brand-dark flex-1 pr-4 truncate">{activeVideo.title}</h4>
                <button onClick={() => setActiveVideo(null)} className="bg-gray-100 p-2 rounded-full text-gray-500 transition-colors hover:bg-gray-200"><X size={20} /></button>
              </div>

              <div className="aspect-video w-full bg-black">
                <iframe src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&modestbranding=1&rel=0`} className="w-full h-full" frameBorder="0" allowFullScreen></iframe>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="text-brand-primary" size={20} />
                  <h3 className="font-fredoka text-xl text-brand-dark">{t('home.qa.title')}</h3>
                </div>
                <div key={activeVideo.id} className="flex flex-col gap-4">
                  {currentComments.length === 0 ? (
                    <p className="text-center text-gray-400 py-10 italic">{t('home.qa.noComments')}</p>
                  ) : (
                    currentComments.map(comment => (
                      <div key={comment.id} className={`flex flex-col gap-1 ${comment.isExpert ? 'bg-brand-primary/5 p-4 rounded-2xl border-l-4 border-brand-primary' : 'bg-gray-50 p-3 rounded-2xl'}`}>
                        <div className="flex justify-between items-center">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${comment.isExpert ? 'text-brand-primary' : 'text-gray-500'}`}>{comment.user}</span>
                          <span className="text-[10px] text-gray-300 font-bold">{comment.time}</span>
                        </div>
                        <p className="text-sm text-brand-dark font-medium leading-relaxed">{comment.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handlePostComment} className="flex gap-2 bg-gray-100 p-2 rounded-2xl">
                  <input 
                    type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t('home.qa.askPlaceholder')}
                    className="flex-1 bg-transparent px-3 py-2 text-sm outline-none font-bold text-brand-dark"
                  />
                  <button type="submit" disabled={!newComment.trim()} className="bg-brand-primary text-white p-2 rounded-xl transition-all active:scale-95 shadow-md shadow-brand-primary/20"><Send size={20} /></button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
