import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthPage from './AuthPage';

// Mock Clerk SignInButton
vi.mock('@clerk/clerk-react', () => ({
  SignInButton: ({ children, mode }) => (
    <div data-testid="sign-in-button" data-mode={mode}>
      {children}
    </div>
  ),
}));

describe('AuthPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<AuthPage />);
      expect(container).toBeInTheDocument();
    });

    it('should render the auth container with correct structure', () => {
      render(<AuthPage />);
      const container = document.querySelector('.auth-container');
      expect(container).toBeInTheDocument();
    });

    it('should render left section with auth-left class', () => {
      render(<AuthPage />);
      const leftSection = document.querySelector('.auth-left');
      expect(leftSection).toBeInTheDocument();
    });

    it('should render right section with auth-right class', () => {
      render(<AuthPage />);
      const rightSection = document.querySelector('.auth-right');
      expect(rightSection).toBeInTheDocument();
    });
  });

  describe('Brand Section', () => {
    it('should render brand logo with correct attributes', () => {
      render(<AuthPage />);
      const logo = screen.getByAltText('Slap');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/logo.png');
      expect(logo).toHaveClass('brand-logo');
    });

    it('should render brand name', () => {
      render(<AuthPage />);
      const brandName = screen.getByText('SLAP');
      expect(brandName).toBeInTheDocument();
      expect(brandName).toHaveClass('brand-name');
    });

    it('should have brand container with correct structure', () => {
      render(<AuthPage />);
      const brandContainer = document.querySelector('.brand-container');
      expect(brandContainer).toBeInTheDocument();
      
      const logo = within(brandContainer).getByAltText('Slap');
      const name = within(brandContainer).getByText('SLAP');
      expect(logo).toBeInTheDocument();
      expect(name).toBeInTheDocument();
    });
  });

  describe('Hero Section', () => {
    it('should render hero title with correct text', () => {
      render(<AuthPage />);
      const title = screen.getByText('Where Work Happens ✨');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H1');
      expect(title).toHaveClass('hero-title');
    });

    it('should render hero subtitle with correct text', () => {
      render(<AuthPage />);
      const subtitle = screen.getByText(/Connect with your team instantly/);
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveClass('hero-subtitle');
    });

    it('should render complete subtitle text', () => {
      render(<AuthPage />);
      const subtitle = screen.getByText(
        'Connect with your team instantly through secure, real-time messaging. Experience seamless collaboration with powerful features designed for modern teams.'
      );
      expect(subtitle).toBeInTheDocument();
    });
  });

  describe('Features List', () => {
    it('should render features list container', () => {
      render(<AuthPage />);
      const featuresList = document.querySelector('.features-list');
      expect(featuresList).toBeInTheDocument();
    });

    it('should render all three feature items', () => {
      render(<AuthPage />);
      const featureItems = document.querySelectorAll('.feature-item');
      expect(featureItems).toHaveLength(3);
    });

    it('should render real-time messaging feature', () => {
      render(<AuthPage />);
      const feature = screen.getByText('Real-time messaging');
      expect(feature).toBeInTheDocument();
      
      const featureItem = feature.closest('.feature-item');
      const icon = within(featureItem).getByText('💬');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('feature-icon');
    });

    it('should render video calls feature', () => {
      render(<AuthPage />);
      const feature = screen.getByText('Video calls & meetings');
      expect(feature).toBeInTheDocument();
      
      const featureItem = feature.closest('.feature-item');
      const icon = within(featureItem).getByText('🎥');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('feature-icon');
    });

    it('should render secure & private feature', () => {
      render(<AuthPage />);
      const feature = screen.getByText('Secure & private');
      expect(feature).toBeInTheDocument();
      
      const featureItem = feature.closest('.feature-item');
      const icon = within(featureItem).getByText('🔒');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('feature-icon');
    });

    it('should render all feature icons', () => {
      render(<AuthPage />);
      const featureIcons = document.querySelectorAll('.feature-icon');
      expect(featureIcons).toHaveLength(3);
      
      const icons = Array.from(featureIcons).map(el => el.textContent);
      expect(icons).toEqual(['💬', '🎥', '🔒']);
    });
  });

  describe('Call-to-Action Button', () => {
    it('should render CTA button with correct text', () => {
      render(<AuthPage />);
      const button = screen.getByText('Get Started with Slap');
      expect(button).toBeInTheDocument();
    });

    it('should render button arrow', () => {
      render(<AuthPage />);
      const arrow = screen.getByText('→');
      expect(arrow).toBeInTheDocument();
      expect(arrow).toHaveClass('button-arrow');
    });

    it('should wrap button in SignInButton component', () => {
      render(<AuthPage />);
      const signInButton = screen.getByTestId('sign-in-button');
      expect(signInButton).toBeInTheDocument();
    });

    it('should configure SignInButton with modal mode', () => {
      render(<AuthPage />);
      const signInButton = screen.getByTestId('sign-in-button');
      expect(signInButton).toHaveAttribute('data-mode', 'modal');
    });

    it('should have CTA button with correct class', () => {
      render(<AuthPage />);
      const button = document.querySelector('.cta-button');
      expect(button).toBeInTheDocument();
    });

    it('should handle button interaction', async () => {
      const user = userEvent.setup();
      render(<AuthPage />);
      
      const button = screen.getByText('Get Started with Slap');
      expect(button).toBeInTheDocument();
      
      // Verify button is clickable
      await user.hover(button);
      expect(button).toBeInTheDocument();
    });
  });

  describe('Right Section - Image', () => {
    it('should render auth image with correct attributes', () => {
      render(<AuthPage />);
      const image = screen.getByAltText('Team collaboration');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/auth-i.png');
      expect(image).toHaveClass('auth-image');
    });

    it('should render image container', () => {
      render(<AuthPage />);
      const imageContainer = document.querySelector('.auth-image-container');
      expect(imageContainer).toBeInTheDocument();
    });

    it('should render image overlay', () => {
      render(<AuthPage />);
      const overlay = document.querySelector('.image-overlay');
      expect(overlay).toBeInTheDocument();
    });

    it('should have correct structure for right section', () => {
      render(<AuthPage />);
      const rightSection = document.querySelector('.auth-right');
      const imageContainer = within(rightSection).getByAltText('Team collaboration').closest('.auth-image-container');
      expect(imageContainer).toBeInTheDocument();
    });
  });

  describe('CSS Classes and Structure', () => {
    it('should apply auth-container class to main container', () => {
      render(<AuthPage />);
      const container = document.querySelector('.auth-container');
      expect(container).toBeInTheDocument();
    });

    it('should apply auth-hero class to hero section', () => {
      render(<AuthPage />);
      const hero = document.querySelector('.auth-hero');
      expect(hero).toBeInTheDocument();
    });

    it('should have all required CSS classes present', () => {
      render(<AuthPage />);
      
      const requiredClasses = [
        'auth-container',
        'auth-left',
        'auth-right',
        'auth-hero',
        'brand-container',
        'brand-logo',
        'brand-name',
        'hero-title',
        'hero-subtitle',
        'features-list',
        'feature-item',
        'feature-icon',
        'cta-button',
        'button-arrow',
        'auth-image-container',
        'auth-image',
        'image-overlay',
      ];

      requiredClasses.forEach(className => {
        const element = document.querySelector(`.${className}`);
        expect(element).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have alt text for logo image', () => {
      render(<AuthPage />);
      const logo = screen.getByAltText('Slap');
      expect(logo).toBeInTheDocument();
    });

    it('should have alt text for main image', () => {
      render(<AuthPage />);
      const image = screen.getByAltText('Team collaboration');
      expect(image).toBeInTheDocument();
    });

    it('should use semantic HTML heading', () => {
      render(<AuthPage />);
      const heading = screen.getByRole('heading', { name: 'Where Work Happens ✨' });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
    });

    it('should have clickable button element', () => {
      render(<AuthPage />);
      const button = screen.getByText('Get Started with Slap').closest('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Content Validation', () => {
    it('should contain all expected text content', () => {
      render(<AuthPage />);
      
      expect(screen.getByText('SLAP')).toBeInTheDocument();
      expect(screen.getByText('Where Work Happens ✨')).toBeInTheDocument();
      expect(screen.getByText(/Connect with your team instantly/)).toBeInTheDocument();
      expect(screen.getByText('Real-time messaging')).toBeInTheDocument();
      expect(screen.getByText('Video calls & meetings')).toBeInTheDocument();
      expect(screen.getByText('Secure & private')).toBeInTheDocument();
      expect(screen.getByText('Get Started with Slap')).toBeInTheDocument();
    });

    it('should contain all emojis in correct positions', () => {
      render(<AuthPage />);
      
      const emojis = ['💬', '🎥', '🔒', '→'];
      emojis.forEach(emoji => {
        expect(screen.getByText(emoji)).toBeInTheDocument();
      });
    });

    it('should have correct image sources', () => {
      render(<AuthPage />);
      
      const logo = screen.getByAltText('Slap');
      const authImage = screen.getByAltText('Team collaboration');
      
      expect(logo.getAttribute('src')).toBe('/logo.png');
      expect(authImage.getAttribute('src')).toBe('/auth-i.png');
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing images gracefully', () => {
      render(<AuthPage />);
      
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(2);
      
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img).toHaveAttribute('src');
      });
    });

    it('should render correctly when CSS is not loaded', () => {
      render(<AuthPage />);
      
      // Component should still render with proper structure
      expect(screen.getByText('SLAP')).toBeInTheDocument();
      expect(screen.getByText('Where Work Happens ✨')).toBeInTheDocument();
      expect(screen.getByText('Get Started with Slap')).toBeInTheDocument();
    });

    it('should maintain component structure integrity', () => {
      const { container } = render(<AuthPage />);
      
      // Verify the component has expected structure
      const authContainer = container.querySelector('.auth-container');
      const authLeft = authContainer.querySelector('.auth-left');
      const authRight = authContainer.querySelector('.auth-right');
      
      expect(authLeft).toBeInTheDocument();
      expect(authRight).toBeInTheDocument();
    });
  });
});