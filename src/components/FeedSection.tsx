"use client";

import { motion } from "framer-motion";
import { Briefcase, Trophy, Sparkles, AlertCircle, Calendar, Users, ArrowRight, ExternalLink } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";

type FeedItem = 
  | { type: 'job', title: string, company: string, location: string, tags: string[] }
  | { type: 'story', user: string, content: string, badge: string }
  | { type: 'tool', name: string, desc: string, icon: string }
  | { type: 'tip', title: string, reality: string }
  | { type: 'event', title: string, date: string, platform: string }
  | { type: 'community', progress: number, goal: string };

export default function FeedSection() {
  const { t } = useTranslation();

  const items: FeedItem[] = [
    { 
      type: 'job', 
      title: t('home.feed.jobs.job1.title'), 
      company: 'Nubank', 
      location: t('home.feed.jobs.remote'), 
      tags: [t('home.feed.jobs.noExp'), t('home.feed.jobs.job1.tag')] 
    },
    { 
      type: 'tip', 
      title: t('home.feed.tips.tip1.title'), 
      reality: t('home.feed.tips.tip1.reality') 
    },
    { 
      type: 'tool', 
      name: 'Leonardo.ai', 
      desc: t('home.feed.tools.tool1.desc'),
      icon: '🎨'
    },
    { 
      type: 'story', 
      user: 'Sofía R.', 
      content: t('home.feed.stories.story1.content'), 
      badge: '💼' 
    },
    { 
      type: 'community', 
      progress: 75, 
      goal: t('home.feed.community.goalText') 
    },
    { 
      type: 'event', 
      title: t('home.feed.events.event1.title'), 
      date: t('home.feed.events.event1.date'), 
      platform: 'Zoom / YouTube' 
    }
  ];

  return (
    <div className="flex flex-col gap-6 px-1">
      <div className="flex flex-col gap-4 overflow-hidden">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border-2 border-brand-light rounded-[32px] p-5 shadow-sm overflow-hidden relative"
          >
            {item.type === 'job' && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="bg-brand-primary/10 p-3 rounded-2xl text-brand-primary">
                    <Briefcase size={24} />
                  </div>
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {t('home.feed.jobs.subtitle')}
                  </span>
                </div>
                <div>
                  <h4 className="font-fredoka text-lg text-brand-dark">{item.title}</h4>
                  <p className="text-sm text-gray-500 font-bold">{item.company} • {item.location}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="bg-gray-50 border border-gray-100 px-3 py-1 rounded-xl text-[10px] font-bold text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="btn-primary py-3 text-sm flex items-center justify-center gap-2">
                  {t('home.feed.jobs.apply')} <ExternalLink size={16} />
                </button>
              </div>
            )}

            {item.type === 'tip' && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-brand-accent">
                  <AlertCircle size={20} />
                  <span className="font-bold text-xs uppercase tracking-widest">{t('home.feed.tips.title')}</span>
                </div>
                <div className="bg-brand-accent/5 p-4 rounded-2xl border-l-4 border-brand-accent">
                  <p className="text-sm font-bold text-brand-dark italic mb-2">&quot;{item.title}&quot;</p>
                  <p className="text-sm text-brand-dark leading-relaxed">{item.reality}</p>
                </div>
              </div>
            )}

            {item.type === 'tool' && (
              <div className="flex items-center gap-4">
                <div className="text-4xl bg-gray-50 w-16 h-16 rounded-3xl flex items-center justify-center border-2 border-gray-100 shadow-inner">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-brand-primary mb-1">
                    <Sparkles size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{t('home.feed.tools.title')}</span>
                  </div>
                  <h4 className="font-fredoka text-base text-brand-dark leading-tight">{item.name}</h4>
                  <p className="text-xs text-gray-500 font-medium line-clamp-1">{item.desc}</p>
                </div>
                <button className="p-2 bg-brand-primary/10 text-brand-primary rounded-xl">
                  <ArrowRight size={20} />
                </button>
              </div>
            )}

            {item.type === 'story' && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-600">
                    <Trophy size={20} />
                    <span className="font-bold text-xs uppercase tracking-widest">{t('home.feed.stories.title')}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-lg border border-purple-100 shadow-sm">
                    {item.badge}
                  </div>
                </div>
                <p className="text-sm text-brand-dark font-medium leading-relaxed">
                  <span className="font-bold text-purple-700">@{item.user}</span> {item.content}
                </p>
              </div>
            )}

            {item.type === 'community' && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Users size={20} />
                  <span className="font-bold text-xs uppercase tracking-widest">{t('home.feed.community.title')}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <p className="text-xs font-bold text-brand-dark max-w-[70%]">{item.goal}</p>
                    <span className="text-lg font-fredoka text-blue-600">{item.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                  </div>
                </div>
              </div>
            )}

            {item.type === 'event' && (
              <div className="flex items-center gap-4">
                <div className="bg-brand-primary/10 p-3 rounded-2xl text-brand-primary flex flex-col items-center">
                  <Calendar size={20} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">{item.date}</span>
                  <h4 className="font-fredoka text-sm text-brand-dark">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 font-bold">{item.platform}</p>
                </div>
                <button className="bg-brand-primary text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm shadow-brand-primary/20">
                  {t('home.feed.events.join')}
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
