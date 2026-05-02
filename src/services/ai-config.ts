export type AIModel = 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'claude-3-5-sonnet' | 'gpt-4o';

export interface AIResponse {
  text: string;
  tokens: number;
  model: AIModel;
}

export const AI_CONFIG = {
  defaultModel: 'gemini-1.5-pro' as AIModel,
  retryAttempts: 3,
  timeout: 30000,
};
