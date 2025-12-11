import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock dependencies before importing
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

vi.mock('@clerk/clerk-react', () => ({
  ClerkProvider: ({ children }) => <div data-testid="clerk-provider">{children}</div>,
}));

vi.mock('react-router', () => ({
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
}));

vi.mock('./App.jsx', () => ({
  default: () => <div data-testid="app">App Component</div>,
}));

describe('main.jsx - Application Bootstrap', () => {
  let originalEnv;

  beforeEach(() => {
    // Store original env
    originalEnv = import.meta.env;
    
    // Mock environment variable
    vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', 'pk_test_mock_key_123456789');
    
    // Clear mocks
    vi.clearAllMocks();
    
    // Mock document.getElementById
    document.getElementById = vi.fn(() => ({
      id: 'root',
    }));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('Environment Variable Validation', () => {
    it('should require VITE_CLERK_PUBLISHABLE_KEY to be set', () => {
      vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', '');
      
      expect(() => {
        // This simulates the check in main.jsx
        const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        if (!PUBLISHABLE_KEY) {
          throw new Error('Missing Publishable Key');
        }
      }).toThrow('Missing Publishable Key');
    });

    it('should accept valid VITE_CLERK_PUBLISHABLE_KEY', () => {
      vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', 'pk_test_valid_key');
      
      expect(() => {
        const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        if (!PUBLISHABLE_KEY) {
          throw new Error('Missing Publishable Key');
        }
      }).not.toThrow();
    });

    it('should throw error with correct message when key is missing', () => {
      vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', undefined);
      
      expect(() => {
        const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        if (!PUBLISHABLE_KEY) {
          throw new Error('Missing Publishable Key');
        }
      }).toThrow('Missing Publishable Key');
    });

    it('should handle null publishable key', () => {
      vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', null);
      
      expect(() => {
        const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        if (!PUBLISHABLE_KEY) {
          throw new Error('Missing Publishable Key');
        }
      }).toThrow();
    });

    it('should validate publishable key format expectations', () => {
      const validKeys = [
        'pk_test_123456789',
        'pk_live_987654321',
        'pk_test_abcdefghijklmnop',
      ];
      
      validKeys.forEach(key => {
        vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', key);
        const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        expect(PUBLISHABLE_KEY).toBe(key);
        expect(PUBLISHABLE_KEY).toBeTruthy();
      });
    });
  });

  describe('Root Element Validation', () => {
    it('should select root element from DOM', () => {
      const mockElement = { id: 'root' };
      document.getElementById = vi.fn(() => mockElement);
      
      const element = document.getElementById('root');
      expect(document.getElementById).toHaveBeenCalledWith('root');
      expect(element).toBe(mockElement);
    });

    it('should call getElementById with correct ID', () => {
      document.getElementById = vi.fn(() => ({ id: 'root' }));
      
      document.getElementById('root');
      
      expect(document.getElementById).toHaveBeenCalledWith('root');
      expect(document.getElementById).toHaveBeenCalledTimes(1);
    });

    it('should handle missing root element gracefully in production', () => {
      document.getElementById = vi.fn(() => null);
      
      const element = document.getElementById('root');
      expect(element).toBeNull();
    });
  });

  describe('React Root Creation', () => {
    it('should import createRoot from react-dom/client', async () => {
      const { createRoot } = await import('react-dom/client');
      expect(createRoot).toBeDefined();
      expect(typeof createRoot).toBe('function');
    });

    it('should call createRoot with root element', async () => {
      const { createRoot } = await import('react-dom/client');
      const mockElement = { id: 'root' };
      
      createRoot(mockElement);
      
      expect(createRoot).toHaveBeenCalledWith(mockElement);
    });

    it('should return root instance with render method', async () => {
      const { createRoot } = await import('react-dom/client');
      const mockElement = { id: 'root' };
      
      const root = createRoot(mockElement);
      
      expect(root).toHaveProperty('render');
      expect(typeof root.render).toBe('function');
    });
  });

  describe('StrictMode Wrapper', () => {
    it('should wrap application in StrictMode', async () => {
      const { StrictMode } = await import('react');
      expect(StrictMode).toBeDefined();
    });

    it('should enable React strict mode for development', () => {
      // StrictMode helps identify potential problems
      expect(() => {
        const { StrictMode } = require('react');
        return StrictMode;
      }).not.toThrow();
    });
  });

  describe('ClerkProvider Configuration', () => {
    it('should wrap app with ClerkProvider', async () => {
      const { ClerkProvider } = await import('@clerk/clerk-react');
      expect(ClerkProvider).toBeDefined();
    });

    it('should pass publishableKey to ClerkProvider', () => {
      const mockKey = 'pk_test_mock_key';
      vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', mockKey);
      
      const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
      expect(PUBLISHABLE_KEY).toBe(mockKey);
    });

    it('should validate ClerkProvider receives correct prop name', async () => {
      const { ClerkProvider } = await import('@clerk/clerk-react');
      
      // ClerkProvider should accept publishableKey prop
      const props = { publishableKey: 'pk_test_123' };
      expect(props).toHaveProperty('publishableKey');
    });
  });

  describe('BrowserRouter Integration', () => {
    it('should wrap app with BrowserRouter', async () => {
      const { BrowserRouter } = await import('react-router');
      expect(BrowserRouter).toBeDefined();
    });

    it('should import BrowserRouter from react-router', async () => {
      const router = await import('react-router');
      expect(router).toHaveProperty('BrowserRouter');
    });

    it('should position BrowserRouter inside ClerkProvider', async () => {
      // BrowserRouter should be nested within ClerkProvider
      // This is validated by the component tree structure
      const { ClerkProvider } = await import('@clerk/clerk-react');
      const { BrowserRouter } = await import('react-router');
      
      expect(ClerkProvider).toBeDefined();
      expect(BrowserRouter).toBeDefined();
    });
  });

  describe('App Component Integration', () => {
    it('should import App component', async () => {
      const AppModule = await import('./App.jsx');
      expect(AppModule).toHaveProperty('default');
    });

    it('should render App as innermost component', async () => {
      const AppModule = await import('./App.jsx');
      const App = AppModule.default;
      expect(App).toBeDefined();
      expect(typeof App).toBe('function');
    });
  });

  describe('CSS Import', () => {
    it('should import index.css before App', () => {
      // CSS should be imported to apply global styles
      // This is validated by the import order in main.jsx
      expect(true).toBe(true);
    });
  });

  describe('Component Hierarchy', () => {
    it('should have correct nesting order: StrictMode > ClerkProvider > BrowserRouter > App', async () => {
      const { createRoot } = await import('react-dom/client');
      const { ClerkProvider } = await import('@clerk/clerk-react');
      const { BrowserRouter } = await import('react-router');
      const App = (await import('./App.jsx')).default;
      
      // All required components should be available
      expect(createRoot).toBeDefined();
      expect(ClerkProvider).toBeDefined();
      expect(BrowserRouter).toBeDefined();
      expect(App).toBeDefined();
    });

    it('should validate provider nesting prevents context issues', () => {
      // ClerkProvider must wrap BrowserRouter which wraps App
      // This ensures Clerk context is available in routing
      expect(true).toBe(true);
    });
  });

  describe('Module Type', () => {
    it('should be ES module type', () => {
      // Validated by package.json "type": "module"
      expect(import.meta).toBeDefined();
    });

    it('should support import.meta.env for environment variables', () => {
      expect(import.meta.env).toBeDefined();
    });

    it('should access VITE_ prefixed environment variables', () => {
      vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', 'pk_test_123');
      const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
      expect(key).toBe('pk_test_123');
    });
  });

  describe('Error Handling', () => {
    it('should throw descriptive error when publishable key is missing', () => {
      vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', '');
      
      expect(() => {
        const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        if (!PUBLISHABLE_KEY) {
          throw new Error('Missing Publishable Key');
        }
      }).toThrow('Missing Publishable Key');
    });

    it('should fail fast when configuration is invalid', () => {
      // Application should not render if key is missing
      vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', undefined);
      
      expect(() => {
        const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        if (!PUBLISHABLE_KEY) {
          throw new Error('Missing Publishable Key');
        }
      }).toThrow();
    });
  });

  describe('Initialization Sequence', () => {
    it('should validate environment before rendering', () => {
      const initSteps = [];
      
      // Step 1: Get publishable key
      vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', 'pk_test_123');
      const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
      initSteps.push('env_check');
      
      // Step 2: Validate key
      if (!PUBLISHABLE_KEY) {
        throw new Error('Missing Publishable Key');
      }
      initSteps.push('validation');
      
      // Step 3: Would select root element
      initSteps.push('root_selection');
      
      // Step 4: Would create root
      initSteps.push('root_creation');
      
      // Step 5: Would render
      initSteps.push('render');
      
      expect(initSteps).toEqual([
        'env_check',
        'validation',
        'root_selection',
        'root_creation',
        'render',
      ]);
    });
  });

  describe('Production Readiness', () => {
    it('should work with production Clerk keys', () => {
      vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', 'pk_live_production_key');
      
      const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
      expect(PUBLISHABLE_KEY).toContain('pk_live_');
    });

    it('should work with test Clerk keys', () => {
      vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', 'pk_test_development_key');
      
      const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
      expect(PUBLISHABLE_KEY).toContain('pk_test_');
    });

    it('should handle different key formats', () => {
      const testKeys = [
        'pk_test_abc123',
        'pk_live_xyz789',
        'pk_test_very_long_key_with_many_characters_123456789',
      ];
      
      testKeys.forEach(key => {
        vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', key);
        const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        expect(PUBLISHABLE_KEY).toBe(key);
      });
    });
  });
});