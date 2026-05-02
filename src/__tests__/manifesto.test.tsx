import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ManifestoGenerator } from '../components/journey/manifesto-generator';
import { useJourneyStore } from '../stores/useJourneyStore';
import { AIService } from '../services/ai-service';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the store
vi.mock('../stores/useJourneyStore', () => ({
  useJourneyStore: vi.fn(),
}));

// Mock AIService
vi.mock('../services/ai-service', () => ({
  AIService: {
    generateManifesto: vi.fn(),
  }
}));

describe('ManifestoGenerator Component', () => {
  const mockSetStage = vi.fn();
  const mockCompleteStage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useJourneyStore as any).mockReturnValue({
      setStage: mockSetStage,
      completeStage: mockCompleteStage,
    });
  });

  it('renders the input field and generate button', () => {
    render(<ManifestoGenerator />);
    expect(screen.getByPlaceholderText(/Sustainability/i)).toBeInTheDocument();
    expect(screen.getByText(/Generate with Gemini/i)).toBeInTheDocument();
  });

  it('enables the button only when prompt is provided', () => {
    render(<ManifestoGenerator />);
    const button = screen.getByRole('button', { name: /Generate with Gemini/i });
    expect(button).toBeDisabled();

    const input = screen.getByPlaceholderText(/Sustainability/i);
    fireEvent.change(input, { target: { value: 'Test Vision' } });
    expect(button).not.toBeDisabled();
  });

  it('calls AIService and displays the result on click', async () => {
    (AIService.generateManifesto as any).mockResolvedValueOnce({
      text: 'Generated Manifesto Content',
    });

    render(<ManifestoGenerator />);
    const input = screen.getByPlaceholderText(/Sustainability/i);
    fireEvent.change(input, { target: { value: 'Test Vision' } });
    
    const button = screen.getByRole('button', { name: /Generate with Gemini/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Generated Manifesto Content/i)).toBeInTheDocument();
    });
  });
});
