# Test Suite Documentation

This document provides comprehensive information about the test suite for the SLAP frontend application.

## Overview

The test suite covers all components and styles modified in the current branch, including:
- React components (App.jsx, AuthPage.jsx, HomePage.jsx, main.jsx)
- CSS stylesheets (index.css, auth.css)
- Integration with Clerk authentication
- React Router routing logic

## Test Framework

- **Testing Framework**: Vitest (optimized for Vite projects)
- **React Testing Library**: For component testing
- **DOM Environment**: jsdom
- **Coverage Provider**: v8

## Installation

Install test dependencies:

```bash
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom happy-dom
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- App.test.jsx

# Run tests matching pattern
npm test -- --grep "AuthPage"
```

## Test Structure

### Component Tests

#### App.test.jsx (60+ tests)
Tests the main application routing and authentication flow:
- **Signed In State**: Validates authenticated user routing
- **Signed Out State**: Validates unauthenticated user redirects
- **Route Structure**: Validates route configuration
- **Component Integration**: Tests React Router integration
- **Edge Cases**: Tests query parameters, hash fragments, deep paths

#### AuthPage.test.jsx (80+ tests)
Comprehensive tests for the authentication page:
- **Rendering**: Basic component rendering
- **Brand Section**: Logo and brand name validation
- **Hero Section**: Title and subtitle content
- **Features List**: All three feature items with icons
- **CTA Button**: SignInButton integration with modal mode
- **Right Section**: Image and overlay rendering
- **CSS Classes**: All required classes present
- **Accessibility**: Alt text, semantic HTML, ARIA attributes
- **Content Validation**: All text and emojis present
- **Edge Cases**: Missing images, CSS not loaded

#### HomePage.test.jsx (25+ tests)
Tests for the home page component:
- **Rendering**: Component structure
- **Component Structure**: DOM hierarchy
- **Integration with Clerk**: UserButton integration
- **Content Validation**: Text content verification
- **Accessibility**: Button elements and labels
- **Edge Cases**: Multiple renders, unmounting
- **Component Behavior**: Stateless rendering

#### main.test.jsx (50+ tests)
Tests for application bootstrap and initialization:
- **Environment Variable Validation**: VITE_CLERK_PUBLISHABLE_KEY checks
- **Root Element Validation**: DOM element selection
- **React Root Creation**: createRoot functionality
- **StrictMode Wrapper**: Development mode validation
- **ClerkProvider Configuration**: Authentication setup
- **BrowserRouter Integration**: Routing setup
- **App Component Integration**: Main component loading
- **Component Hierarchy**: Correct nesting order
- **Module Type**: ES module validation
- **Error Handling**: Missing configuration errors
- **Initialization Sequence**: Bootstrap order validation
- **Production Readiness**: Different key format support

### Style Tests

#### auth.css.test.js (100+ tests)
Validates the authentication page stylesheet:
- **CSS File Structure**: Syntax validation, brace matching
- **Required CSS Classes**: All 17+ classes present
- **Layout Properties**: Flexbox, min-height, positioning
- **Color Scheme**: Gradients, rgba colors, hex values
- **Typography**: Font sizes, weights, line heights
- **Visual Effects**: Backdrop filters, blur, shadows
- **Image Styling**: Logo and auth image styles
- **Button Styling**: CTA button and transitions
- **Features List Styling**: Flex layout and gap
- **Spacing and Layout**: Padding, margin, max-width
- **Responsive Design**: Flexible units, viewport units
- **Text Effects**: Background-clip, gradient text
- **Z-Index Layering**: Stacking context
- **Border Styling**: Border properties and transparency
- **Alignment Properties**: Flexbox alignment
- **Code Quality**: No duplicates, consistent spacing
- **Modern CSS Features**: Gradients, flexbox, modern units
- **Performance**: Filter usage, transform animations
- **File Size**: Under 500KB limit

#### index.css.test.js (50+ tests)
Validates global stylesheet:
- **CSS File Structure**: Valid syntax
- **Universal Selector Reset**: margin, padding, box-sizing
- **Body Styles**: Font-family, background-color, color
- **Color Scheme**: Dark theme implementation
- **CSS Best Practices**: Formatting, semicolons
- **Global Reset Purpose**: Box model normalization
- **Font Stack**: System fonts, fallbacks
- **File Size**: Minimal size
- **Selector Specificity**: Low specificity approach
- **Dark Theme**: #121212 background, #ffffff text

## Test Coverage Goals

- **Component Coverage**: 100% of changed components
- **Line Coverage**: Target 90%+
- **Branch Coverage**: Target 85%+
- **Function Coverage**: Target 95%+

## Mocking Strategy

### Clerk Authentication
```javascript
vi.mock('@clerk/clerk-react', () => ({
  SignedIn: ({ children }) => <div data-testid="signed-in">{children}</div>,
  SignedOut: ({ children }) => <div data-testid="signed-out">{children}</div>,
  SignInButton: ({ children, mode }) => (
    <button data-testid="sign-in-button" data-mode={mode}>
      {children}
    </button>
  ),
  UserButton: () => <button data-testid="user-button">User</button>,
  ClerkProvider: ({ children }) => <div data-testid="clerk-provider">{children}</div>,
}));
```

### React Router
```javascript
vi.mock('react-router', () => ({
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
}));
```

### Environment Variables
```javascript
vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', 'pk_test_mock_key_123456789');
```

## Writing New Tests

### Component Test Template
```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import YourComponent from './YourComponent';

// Mock dependencies
vi.mock('./dependency', () => ({
  default: () => <div>Mocked</div>,
}));

describe('YourComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  // Add more tests...
});
```

### CSS Test Template
```javascript
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('your-style.css', () => {
  let cssContent;

  beforeAll(() => {
    cssContent = readFileSync(join(__dirname, 'your-style.css'), 'utf-8');
  });

  it('should have required class', () => {
    expect(cssContent).toContain('.your-class');
  });

  // Add more tests...
});
```

## CI/CD Integration

Add to your CI pipeline:

```yaml
- name: Run Tests
  run: npm test -- --run

- name: Generate Coverage
  run: npm run test:coverage

- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

## Troubleshooting

### Common Issues

1. **Module not found errors**
   - Ensure all dependencies are installed: `npm install`
   - Check that vitest.config.js is properly configured

2. **Environment variable errors**
   - Verify .env file exists and has VITE_CLERK_PUBLISHABLE_KEY
   - Check that setup.js properly stubs the environment

3. **DOM not available**
   - Ensure jsdom is installed
   - Verify vitest.config.js has `environment: 'jsdom'`

4. **Mock not working**
   - Clear mocks between tests: `vi.clearAllMocks()`
   - Check mock is defined before component import

## Best Practices

1. **Test Naming**: Use descriptive names that explain what is being tested
2. **Test Organization**: Group related tests with `describe` blocks
3. **Assertions**: Use specific matchers (toBeInTheDocument, toHaveClass, etc.)
4. **Setup/Teardown**: Use beforeEach/afterEach for common setup
5. **Mocking**: Mock external dependencies, not internal logic
6. **Coverage**: Aim for high coverage but prioritize meaningful tests
7. **Performance**: Keep tests fast by mocking heavy operations

## Test Statistics

Current test suite includes:
- **Total Test Files**: 6
- **Total Tests**: 350+
- **Component Tests**: 4 files (220+ tests)
- **Style Tests**: 2 files (150+ tests)
- **Mocked Dependencies**: Clerk, React Router, Environment

## Maintenance

- Review and update tests when components change
- Add tests for new features before implementation (TDD)
- Keep test coverage above 90%
- Refactor tests along with component refactoring
- Document complex test scenarios

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)