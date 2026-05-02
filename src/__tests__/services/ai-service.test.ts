import { describe, it, expect, vi, beforeEach } from "vitest";
import { AIService } from "@/services/ai-service";

// Mock global fetch
global.fetch = vi.fn();

describe("AIService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("generateManifesto", () => {
    it("should return error if prompt is empty", async () => {
      const response = await AIService.generateManifesto("");
      expect(response.error).toBe("Prompt cannot be empty");
    });

    it("should return generated text on success", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ text: "Test Manifesto" }),
      });

      const response = await AIService.generateManifesto("Education");
      expect(response.text).toBe("Test Manifesto");
      expect(response.error).toBeUndefined();
    });

    it("should handle API failure gracefully", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const response = await AIService.generateManifesto("Values");
      expect(response.error).toContain("AI API responded with status: 500");
    });
  });

  describe("analyzeResults", () => {
    it("should return analysis text on success", async () => {
       (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ text: "Analysis Report" }),
      });

      const response = await AIService.analyzeResults({ winner: "A", margin: 100 });
      expect(response.text).toBe("Analysis Report");
    });

    it("should return error on network failure", async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error("Network Error"));

      const response = await AIService.analyzeResults({});
      expect(response.error).toBe("Network Error");
    });
  });
});
