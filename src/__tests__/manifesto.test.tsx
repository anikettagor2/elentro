import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ManifestoGenerator } from '../components/journey/manifesto-generator';
import { useJourneyStore } from '../stores/useJourneyStore';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the store
vi.mock('../stores/useJourneyStore', () => ({
  useJourneyStore: vi.fn(),
}));

// Mock fetch
global.fetch = vi.fn();

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
    expect(screen.getByPlaceholderText(/Sustainability/i)).toBeDefined();
    expect(screen.getByText(/Generate with Gemini/i)).toBeDefined();
  });

  it('enables the button only when prompt is provided', () => {
    render(<ManifestoGenerator />);
    const button = screen.getByRole('button', { name: /Generate with Gemini/i });
    expect(button.hasAttribute('disabled')).toBe(true);

    const input = screen.getByPlaceholderText(/Sustainability/i);
    fireEvent.change(input, { target: { value: 'Test Vision' } });
    expect(button.hasAttribute('disabled')).toBe(false);
  });

  it('calls the API and displays the result on click', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ text: 'Generated Manifesto Content' }),
    });

    render(<ManifestoGenerator />);
    const input = screen.getByPlaceholderText(/Sustainability/i);
    fireEvent.change(input, { target: { value: 'Test Vision' } });
    
    const button = screen.getByRole('button', { name: /Generate with Gemini/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Generated Manifesto Content/i)).toBeDefined();
    });
  });
});
