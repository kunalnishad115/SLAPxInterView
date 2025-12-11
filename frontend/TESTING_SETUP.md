# Testing Setup Instructions

## Quick Start

Follow these steps to set up and run the test suite:

### 1. Install Dependencies

```bash
cd frontend
npm install --save-dev \
  vitest@^1.0.4 \
  @vitest/ui@^1.0.4 \
  @testing-library/react@^14.1.2 \
  @testing-library/jest-dom@^6.1.5 \
  @testing-library/user-event@^14.5.1 \
  jsdom@^23.0.1 \
  happy-dom@^12.10.3
```

### 2. Update package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### 3. Set Up Environment Variables

Create a `.env.test` file (optional, for testing):

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_mock_key_for_testing
```

### 4. Run Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Run in watch mode
npm test -- --watch
```

## What's Been Added

### Configuration Files

1. **vitest.config.js** - Vitest configuration
   - React plugin integration
   - jsdom environment
   - Test setup file reference
   - Coverage configuration

2. **src/tests/setup.js** - Global test setup
   - Jest-DOM matchers
   - Environment variable mocking
   - Window API mocks (matchMedia, IntersectionObserver)
   - Automatic cleanup after each test

### Test Files

1. **src/App.test.jsx** (60+ tests)
   - Signed in/out state routing
   - Navigation and redirects
   - Component integration
   - Edge cases

2. **src/pages/AuthPage.test.jsx** (80+ tests)
   - Component rendering
   - Brand and hero sections
   - Features list
   - CTA button
   - Accessibility
   - Content validation

3. **src/pages/HomePage.test.jsx** (25+ tests)
   - Basic rendering
   - UserButton integration
   - Component structure
   - Accessibility

4. **src/main.test.jsx** (50+ tests)
   - Environment validation
   - Root creation
   - Provider configuration
   - Bootstrap sequence
   - Error handling

5. **src/styles/auth.css.test.js** (100+ tests)
   - CSS syntax validation
   - Required classes
   - Layout properties
   - Color scheme
   - Typography
   - Visual effects
   - Responsive design

6. **src/index.css.test.js** (50+ tests)
   - Global styles
   - CSS reset
   - Body styles
   - Dark theme
   - Font stack

### Documentation

1. **TEST_README.md** - Comprehensive test documentation
2. **TESTING_SETUP.md** - This file, setup instructions

## File Structure