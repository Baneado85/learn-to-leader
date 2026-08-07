import { create } from 'zustand';

export type Language = 'es' | 'en' | 'pt';

interface MissionContent {
  inputValue?: string;
  selectedImage?: string | null;
  feedback?: string | null;
  chatMessages?: {sender: 'user' | 'bot', text: string}[];
}

interface GameState {
  xp: number;
  streak: number;
  gems: number;
  level: number;
  language: Language;
  geminiApiKey: string | null;
  unlockedNodes: string[];
  completedMissions: string[];
  missionData: Record<string, MissionContent>;
  user: { name: string; email: string; avatar?: string | null } | null;
  hasCompletedOnboarding: boolean;
  selectedPath: 'work' | 'digitalize' | null;
  login: (name: string, avatar?: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
  setPath: (path: 'work' | 'digitalize') => void;
  setLanguage: (lang: Language) => void;
  addXp: (amount: number) => void;
  incrementStreak: () => void;
  unlockNode: (nodeId: string) => void;
  completeMission: (missionId: string, xpReward: number, data: MissionContent) => void;
  saveMissionData: (missionId: string, data: MissionContent) => void;
}

export const useGameStore = create<GameState>((set) => ({
  xp: 120, // Start with some for demo
  streak: 5,
  gems: 50,
  level: 3,
  language: 'es',
  geminiApiKey: null,
  unlockedNodes: ['e1', 'b1'], // Start with the first nodes unlocked
  completedMissions: [],
  missionData: {},
  user: null,
  hasCompletedOnboarding: false,
  selectedPath: null,
  login: (name: string, avatar?: string) => set({ 
    user: { 
      name, 
      email: `${name.toLowerCase()}@example.com`,
      avatar: avatar || null
    } 
  }),
  logout: () => set({ user: null, hasCompletedOnboarding: false, selectedPath: null }),
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
  setPath: (path: 'work' | 'digitalize') => set({ selectedPath: path }),
  setLanguage: (lang: Language) => set({ language: lang }),
  addXp: (amount) => set((state) => {
    const newXp = state.xp + amount;
    const newLevel = Math.floor(newXp / 500) + 1;
    return { xp: newXp, level: Math.max(state.level, newLevel) };
  }),
  incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
  unlockNode: (nodeId) => set((state) => ({
    unlockedNodes: state.unlockedNodes.includes(nodeId) ? state.unlockedNodes : [...state.unlockedNodes, nodeId]
  })),
  completeMission: (missionId, xpReward, data) => set((state) => {
    const isAlreadyDone = state.completedMissions.includes(missionId);
    
    const newXp = isAlreadyDone ? state.xp : state.xp + xpReward;
    const newLevel = Math.floor(newXp / 500) + 1;

    return { 
      completedMissions: isAlreadyDone ? state.completedMissions : [...state.completedMissions, missionId],
      missionData: { ...state.missionData, [missionId]: data },
      xp: newXp,
      level: Math.max(state.level, newLevel)
    };
  }),
  saveMissionData: (missionId, data) => set((state) => ({
    missionData: { ...state.missionData, [missionId]: { ...(state.missionData[missionId] || {}), ...data } }
  })),
}));
