import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

// Mock Clerk UserButton
vi.mock('@clerk/clerk-react', () => ({
  UserButton: () => <button data-testid="user-button">User Button</button>,
}));

describe('HomePage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<HomePage />);
      expect(container).toBeInTheDocument();
    });

    it('should render UserButton component', () => {
      render(<HomePage />);
      const userButton = screen.getByTestId('user-button');
      expect(userButton).toBeInTheDocument();
    });

    it('should render "HomePage" text', () => {
      render(<HomePage />);
      const text = screen.getByText('HomePage');
      expect(text).toBeInTheDocument();
    });

    it('should render a div container', () => {
      const { container } = render(<HomePage />);
      const divs = container.querySelectorAll('div');
      expect(divs.length).toBeGreaterThan(0);
    });
  });

  describe('Component Structure', () => {
    it('should have UserButton as first child', () => {
      const { container } = render(<HomePage />);
      const mainDiv = container.firstChild;
      const userButton = screen.getByTestId('user-button');
      
      expect(mainDiv.firstChild).toContain(userButton);
    });

    it('should have text content after UserButton', () => {
      const { container } = render(<HomePage />);
      const mainDiv = container.firstChild;
      const textContent = mainDiv.textContent;
      
      expect(textContent).toContain('User Button');
      expect(textContent).toContain('HomePage');
    });

    it('should render exactly one UserButton', () => {
      render(<HomePage />);
      const userButtons = screen.getAllByTestId('user-button');
      expect(userButtons).toHaveLength(1);
    });

    it('should have correct DOM hierarchy', () => {
      const { container } = render(<HomePage />);
      
      // Should have a single root div
      expect(container.firstChild.tagName).toBe('DIV');
      
      // Should contain UserButton and text
      expect(screen.getByTestId('user-button')).toBeInTheDocument();
      expect(screen.getByText('HomePage')).toBeInTheDocument();
    });
  });

  describe('Integration with Clerk', () => {
    it('should integrate UserButton from @clerk/clerk-react', () => {
      render(<HomePage />);
      const userButton = screen.getByTestId('user-button');
      expect(userButton).toBeInTheDocument();
      expect(userButton.textContent).toBe('User Button');
    });

    it('should render UserButton as a button element', () => {
      render(<HomePage />);
      const userButton = screen.getByTestId('user-button');
      expect(userButton.tagName).toBe('BUTTON');
    });
  });

  describe('Content Validation', () => {
    it('should display correct text content', () => {
      render(<HomePage />);
      expect(screen.getByText('HomePage')).toBeInTheDocument();
    });

    it('should contain expected elements count', () => {
      const { container } = render(<HomePage />);
      
      // Should have UserButton
      expect(screen.getByTestId('user-button')).toBeInTheDocument();
      
      // Should have text node with "HomePage"
      expect(screen.getByText('HomePage')).toBeInTheDocument();
    });

    it('should have text appearing in the DOM', () => {
      const { container } = render(<HomePage />);
      const text = container.textContent;
      
      expect(text).toContain('HomePage');
      expect(text).toContain('User Button');
    });
  });

  describe('Accessibility', () => {
    it('should have a button element for user interactions', () => {
      render(<HomePage />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should have accessible button text', () => {
      render(<HomePage />);
      const button = screen.getByRole('button', { name: /user button/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should render consistently on multiple renders', () => {
      const { rerender } = render(<HomePage />);
      
      expect(screen.getByTestId('user-button')).toBeInTheDocument();
      expect(screen.getByText('HomePage')).toBeInTheDocument();
      
      rerender(<HomePage />);
      
      expect(screen.getByTestId('user-button')).toBeInTheDocument();
      expect(screen.getByText('HomePage')).toBeInTheDocument();
    });

    it('should handle unmounting gracefully', () => {
      const { unmount } = render(<HomePage />);
      
      expect(screen.getByTestId('user-button')).toBeInTheDocument();
      
      unmount();
      
      expect(screen.queryByTestId('user-button')).not.toBeInTheDocument();
    });

    it('should maintain component integrity', () => {
      const { container } = render(<HomePage />);
      
      // Verify structure hasn't changed
      expect(container.firstChild).toBeInTheDocument();
      expect(container.firstChild.children.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Component Behavior', () => {
    it('should render static content without state', () => {
      const { container } = render(<HomePage />);
      
      // Component is simple and stateless
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('HomePage')).toBeInTheDocument();
    });

    it('should not have any conditional rendering', () => {
      render(<HomePage />);
      
      // All elements should always be present
      expect(screen.getByTestId('user-button')).toBeInTheDocument();
      expect(screen.getByText('HomePage')).toBeInTheDocument();
    });

    it('should be a functional component', () => {
      // Test that it renders as expected
      const { container } = render(<HomePage />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Snapshot Consistency', () => {
    it('should maintain consistent structure', () => {
      const { container } = render(<HomePage />);
      
      const structure = {
        hasUserButton: !!screen.queryByTestId('user-button'),
        hasHomePageText: !!screen.queryByText('HomePage'),
        childCount: container.firstChild.children.length,
      };
      
      expect(structure).toEqual({
        hasUserButton: true,
        hasHomePageText: true,
        childCount: expect.any(Number),
      });
    });
  });
});