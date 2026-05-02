import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useJourneyStore } from '../stores/useJourneyStore';

describe('Journey Store Logic', () => {
  beforeEach(() => {
    // We don't need to mock the store if we test the actual logic, 
    // but for unit tests we check state transitions
  });

  it('initializes with overview stage', () => {
    const state = useJourneyStore.getState();
    expect(state.currentStage).toBe('overview');
  });

  it('updates stage correctly', () => {
    const { setStage } = useJourneyStore.getState();
    setStage('registration');
    expect(useJourneyStore.getState().currentStage).toBe('registration');
  });

  it('completes stages and tracks progress', () => {
    const { completeStage } = useJourneyStore.getState();
    completeStage('registration');
    expect(useJourneyStore.getState().completedStages).toContain('registration');
  });

  it('resets journey state', () => {
    const { setStage, resetJourney, completeStage } = useJourneyStore.getState();
    setStage('polling');
    completeStage('registration');
    resetJourney();
    
    const state = useJourneyStore.getState();
    expect(state.currentStage).toBe('overview');
    expect(state.completedStages).toHaveLength(0);
  });
});
