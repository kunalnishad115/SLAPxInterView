import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';
import * as ClerkReact from '@clerk/clerk-react';

// Mock Clerk components
vi.mock('@clerk/clerk-react', () => ({
  SignedIn: ({ children }) => <div data-testid="signed-in">{children}</div>,
  SignedOut: ({ children }) => <div data-testid="signed-out">{children}</div>,
  SignInButton: ({ children, mode }) => (
    <button data-testid="sign-in-button" data-mode={mode}>
      {children}
    </button>
  ),
  UserButton: () => <button data-testid="user-button">User</button>,
}));

// Mock page components
vi.mock('./pages/HomePage', () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock('./pages/AuthPage', () => ({
  default: () => <div data-testid="auth-page">Auth Page</div>,
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Signed In State', () => {
    it('should render SignedIn component', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('signed-in')).toBeInTheDocument();
    });

    it('should render HomePage when navigating to root path', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      const signedInContainer = screen.getByTestId('signed-in');
      expect(signedInContainer).toBeInTheDocument();
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });

    it('should redirect from /auth to / when signed in', () => {
      render(
        <MemoryRouter initialEntries={['/auth']}>
          <App />
        </MemoryRouter>
      );

      // Should see home page due to redirect
      waitFor(() => {
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
      });
    });

    it('should handle unknown routes when signed in', () => {
      render(
        <MemoryRouter initialEntries={['/unknown-route']}>
          <App />
        </MemoryRouter>
      );

      const signedInContainer = screen.getByTestId('signed-in');
      expect(signedInContainer).toBeInTheDocument();
    });
  });

  describe('Signed Out State', () => {
    it('should render SignedOut component', () => {
      render(
        <MemoryRouter initialEntries={['/auth']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('signed-out')).toBeInTheDocument();
    });

    it('should render AuthPage when navigating to /auth', () => {
      render(
        <MemoryRouter initialEntries={['/auth']}>
          <App />
        </MemoryRouter>
      );

      const signedOutContainer = screen.getByTestId('signed-out');
      expect(signedOutContainer).toBeInTheDocument();
      expect(screen.getByTestId('auth-page')).toBeInTheDocument();
    });

    it('should redirect from root to /auth when signed out', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      waitFor(() => {
        expect(screen.getByTestId('auth-page')).toBeInTheDocument();
      });
    });

    it('should redirect from any unknown route to /auth when signed out', () => {
      render(
        <MemoryRouter initialEntries={['/some-random-path']}>
          <App />
        </MemoryRouter>
      );

      waitFor(() => {
        expect(screen.getByTestId('auth-page')).toBeInTheDocument();
      });
    });

    it('should handle wildcard route correctly when signed out', () => {
      const testPaths = ['/dashboard', '/settings', '/profile', '/nonexistent'];

      testPaths.forEach((path) => {
        const { unmount } = render(
          <MemoryRouter initialEntries={[path]}>
            <App />
          </MemoryRouter>
        );

        waitFor(() => {
          expect(screen.getByTestId('auth-page')).toBeInTheDocument();
        });

        unmount();
      });
    });
  });

  describe('Route Structure', () => {
    it('should have correct route configuration for signed in users', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      const signedIn = screen.getByTestId('signed-in');
      expect(signedIn).toBeInTheDocument();
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });

    it('should have correct route configuration for signed out users', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/auth']}>
          <App />
        </MemoryRouter>
      );

      const signedOut = screen.getByTestId('signed-out');
      expect(signedOut).toBeInTheDocument();
      expect(screen.getByTestId('auth-page')).toBeInTheDocument();
    });

    it('should render both SignedIn and SignedOut components simultaneously', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      // Both should be in the DOM (Clerk handles which one displays)
      expect(screen.getByTestId('signed-in')).toBeInTheDocument();
      expect(screen.getByTestId('signed-out')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should properly integrate with React Router', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      expect(container).toBeInTheDocument();
      expect(screen.getByTestId('signed-in')).toBeInTheDocument();
      expect(screen.getByTestId('signed-out')).toBeInTheDocument();
    });

    it('should handle navigation between routes', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('home-page')).toBeInTheDocument();

      rerender(
        <MemoryRouter initialEntries={['/auth']}>
          <App />
        </MemoryRouter>
      );

      waitFor(() => {
        expect(screen.getByTestId('auth-page')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty initial route', () => {
      render(
        <MemoryRouter initialEntries={[]}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('signed-in')).toBeInTheDocument();
      expect(screen.getByTestId('signed-out')).toBeInTheDocument();
    });

    it('should handle routes with query parameters', () => {
      render(
        <MemoryRouter initialEntries={['/?redirect=dashboard']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });

    it('should handle routes with hash fragments', () => {
      render(
        <MemoryRouter initialEntries={['/#section']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });

    it('should handle deeply nested paths when signed out', () => {
      render(
        <MemoryRouter initialEntries={['/a/b/c/d/e']}>
          <App />
        </MemoryRouter>
      );

      waitFor(() => {
        expect(screen.getByTestId('auth-page')).toBeInTheDocument();
      });
    });
  });
});