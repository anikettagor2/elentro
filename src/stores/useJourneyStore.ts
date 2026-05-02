import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type JourneyStage = 
  | 'overview' 
  | 'registration' 
  | 'manifesto'
  | 'nomination' 
  | 'scrutiny' 
  | 'withdrawal' 
  | 'campaign' 
  | 'polling' 
  | 'counting' 
  | 'result' 
  | 'certification';

interface JourneyState {
  currentStage: JourneyStage;
  completedStages: JourneyStage[];
  userData: {
    voterId?: string;
    constituency?: string;
    candidateName?: string;
    party?: string;
    votes?: number;
  };
  setStage: (stage: JourneyStage) => void;
  completeStage: (stage: JourneyStage) => void;
  updateUserData: (data: Partial<JourneyState['userData']>) => void;
  resetJourney: () => void;
}

export const useJourneyStore = create<JourneyState>()(
  persist(
    (set) => ({
      currentStage: 'overview',
      completedStages: [],
      userData: {},
      setStage: (stage) => set({ currentStage: stage }),
      completeStage: (stage) => set((state) => ({
        completedStages: state.completedStages.includes(stage) 
          ? state.completedStages 
          : [...state.completedStages, stage]
      })),
      updateUserData: (data) => set((state) => ({
        userData: { ...state.userData, ...data }
      })),
      resetJourney: () => set({ 
        currentStage: 'overview', 
        completedStages: [], 
        userData: {} 
      }),
    }),
    {
      name: 'electron-journey-storage',
    }
  )
);
