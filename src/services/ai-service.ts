/**
 * AI Service
 * 
 * Centralized service for interacting with AI endpoints.
 * Handles prompt construction, error management, and response formatting.
 */

export interface AIResponse {
  text: string;
  error?: string;
}

export class AIService {
  /**
   * Generates a political manifesto based on user prompt.
   * @param prompt User input of core values
   * @returns AI generated manifesto text
   */
  static async generateManifesto(prompt: string): Promise<AIResponse> {
    if (!prompt.trim()) {
      return { text: "", error: "Prompt cannot be empty" };
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Generate a professional election manifesto based on these core values: ${prompt}. Format it with sections: Vision, Education, Economy, and Environment. Use a formal, inspiring tone.`
        })
      });

      if (!response.ok) {
        throw new Error(`AI API responded with status: ${response.status}`);
      }

      const data = await response.json();
      return { text: data.text || "No response text found." };
    } catch (error) {
      console.error("[AIService] Failed to generate manifesto:", error);
      return { text: "", error: error instanceof Error ? error.message : "Unknown error occurred" };
    }
  }

  /**
   * Performs strategic post-election analysis.
   * @param resultData Electoral result statistics
   * @returns Analytical mandate report
   */
  static async analyzeResults(resultData: { winner: string; margin: number; totalVotes: number }): Promise<AIResponse> {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Perform a post-election strategic analysis on these results: ${JSON.stringify(resultData)}. Provide a 'Political Mandate Report' covering demographic shifts and future policy recommendations.`
        })
      });

      if (!response.ok) {
        throw new Error(`AI API responded with status: ${response.status}`);
      }

      const data = await response.json();
      return { text: data.text || "No analysis available." };
    } catch (error) {
      console.error("[AIService] Failed to analyze results:", error);
      return { text: "", error: error instanceof Error ? error.message : "Failed to generate report" };
    }
  }
}
