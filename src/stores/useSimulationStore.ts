import { create } from 'zustand';

/**
 * Interface representing the global state of the election simulation.
 */
interface SimulationState {
  /** Target country for the simulation */
  country: string;
  /** Type of election being modeled */
  electionType: string;
  /** Role of the user in the simulation */
  role: string;
  /** Detailed user profile metadata */
  userProfile: {
    age: number;
    state: string;
    registrationStatus: string;
  };
  /** Update the target country */
  setCountry: (country: string) => void;
  /** Update the election type */
  setElectionType: (type: string) => void;
  /** Update the user role */
  setRole: (role: string) => void;
  /** Update user profile information */
  setUserProfile: (profile: { age: number; state: string; registrationStatus: string }) => void;
  /** Update the campaign budget allocation */
  setBudgetSplit: (budget: { digital: number; ground: number; traditional: number }) => void;
  /** Toggle a strategic decision on/off */
  toggleDecision: (decision: string) => void;
  /** Reset the simulation to initial values */
  reset: () => void;
  /** Current campaign budget split percentages */
  budgetSplit: {
    digital: number;
    ground: number;
    traditional: number;
  };
  /** List of active strategic decisions */
  keyDecisions: string[];
}

const initialState = {
  country: 'India',
  electionType: 'General',
  role: 'Voter',
  userProfile: {
    age: 25,
    state: 'Delhi',
    registrationStatus: 'Registered',
  },
  budgetSplit: {
    digital: 33,
    ground: 34,
    traditional: 33,
  },
  keyDecisions: [],
};

export const useSimulationStore = create<SimulationState>((set) => ({
  ...initialState,
  setCountry: (country) => set({ country }),
  setElectionType: (electionType) => set({ electionType }),
  setRole: (role) => set({ role }),
  setUserProfile: (userProfile) => set({ userProfile }),
  setBudgetSplit: (budgetSplit) => set({ budgetSplit }),
  toggleDecision: (decision) => set((state) => ({
    keyDecisions: state.keyDecisions.includes(decision)
      ? state.keyDecisions.filter((d) => d !== decision)
      : [...state.keyDecisions, decision],
  })),
  reset: () => set(initialState),
}));
