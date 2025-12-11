import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('index.css - Global Styles Validation', () => {
  let cssContent;

  beforeAll(() => {
    cssContent = readFileSync(
      join(__dirname, 'index.css'),
      'utf-8'
    );
  });

  describe('CSS File Structure', () => {
    it('should exist and be readable', () => {
      expect(cssContent).toBeDefined();
      expect(cssContent.length).toBeGreaterThan(0);
    });

    it('should have valid CSS syntax', () => {
      const openBraces = (cssContent.match(/\{/g) || []).length;
      const closeBraces = (cssContent.match(/\}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });
  });

  describe('Universal Selector Reset', () => {
    it('should have universal selector (*)', () => {
      expect(cssContent).toContain('*');
    });

    it('should reset margin to 0', () => {
      const marginPattern = /\*\s*\{[^}]*margin:\s*0/s;
      expect(marginPattern.test(cssContent)).toBe(true);
    });

    it('should reset padding to 0', () => {
      const paddingPattern = /\*\s*\{[^}]*padding:\s*0/s;
      expect(paddingPattern.test(cssContent)).toBe(true);
    });

    it('should set box-sizing to border-box', () => {
      const boxSizingPattern = /\*\s*\{[^}]*box-sizing:\s*border-box/s;
      expect(boxSizingPattern.test(cssContent)).toBe(true);
    });

    it('should have all three reset properties in universal selector', () => {
      const universalBlock = cssContent.match(/\*\s*\{[^}]*\}/s);
      expect(universalBlock).toBeTruthy();
      if (universalBlock) {
        expect(universalBlock[0]).toContain('margin');
        expect(universalBlock[0]).toContain('padding');
        expect(universalBlock[0]).toContain('box-sizing');
      }
    });
  });

  describe('Body Styles', () => {
    it('should have body selector', () => {
      expect(cssContent).toContain('body');
    });

    it('should define font-family for body', () => {
      const fontPattern = /body\s*\{[^}]*font-family:/s;
      expect(fontPattern.test(cssContent)).toBe(true);
    });

    it('should use system fonts fallback', () => {
      const bodyBlock = cssContent.match(/body\s*\{[^}]*\}/s);
      expect(bodyBlock).toBeTruthy();
      if (bodyBlock) {
        const fonts = bodyBlock[0];
        // Should have multiple fonts for fallback
        expect((fonts.match(/,/g) || []).length).toBeGreaterThan(2);
      }
    });

    it('should include Segoe UI in font stack', () => {
      const bodyBlock = cssContent.match(/body\s*\{[^}]*\}/s);
      expect(bodyBlock).toBeTruthy();
      if (bodyBlock) {
        expect(bodyBlock[0]).toMatch(/Segoe UI/i);
      }
    });

    it('should have sans-serif as fallback font', () => {
      const bodyBlock = cssContent.match(/body\s*\{[^}]*\}/s);
      expect(bodyBlock).toBeTruthy();
      if (bodyBlock) {
        expect(bodyBlock[0]).toContain('sans-serif');
      }
    });

    it('should define background-color for body', () => {
      const bgPattern = /body\s*\{[^}]*background-color:/s;
      expect(bgPattern.test(cssContent)).toBe(true);
    });

    it('should use dark background color', () => {
      const bodyBlock = cssContent.match(/body\s*\{[^}]*\}/s);
      expect(bodyBlock).toBeTruthy();
      if (bodyBlock) {
        expect(bodyBlock[0]).toContain('#121212');
      }
    });

    it('should define text color for body', () => {
      const colorPattern = /body\s*\{[^}]*color:/s;
      expect(colorPattern.test(cssContent)).toBe(true);
    });

    it('should use white text color', () => {
      const bodyBlock = cssContent.match(/body\s*\{[^}]*\}/s);
      expect(bodyBlock).toBeTruthy();
      if (bodyBlock) {
        expect(bodyBlock[0]).toContain('#ffffff');
      }
    });

    it('should have exactly three properties in body', () => {
      const bodyBlock = cssContent.match(/body\s*\{[^}]*\}/s);
      expect(bodyBlock).toBeTruthy();
      if (bodyBlock) {
        const properties = bodyBlock[0].match(/[a-z-]+:/g) || [];
        expect(properties.length).toBe(3);
      }
    });
  });

  describe('Color Scheme', () => {
    it('should use dark theme colors', () => {
      expect(cssContent).toContain('#121212'); // Dark background
      expect(cssContent).toContain('#ffffff'); // White text
    });

    it('should use hex color values', () => {
      expect(cssContent).toMatch(/#[0-9a-fA-F]{6}/);
    });

    it('should provide good contrast for accessibility', () => {
      // Dark background (#121212) with white text (#ffffff) is high contrast
      expect(cssContent).toContain('#121212');
      expect(cssContent).toContain('#ffffff');
    });
  });

  describe('CSS Best Practices', () => {
    it('should have consistent formatting', () => {
      // Check for spaces after colons
      const propertyPattern = /[a-z-]+:\s+/;
      expect(propertyPattern.test(cssContent)).toBe(true);
    });

    it('should end properties with semicolons', () => {
      const semicolonPattern = /:\s*[^;}]+;/;
      expect(semicolonPattern.test(cssContent)).toBe(true);
    });

    it('should not have empty rule sets', () => {
      const emptyRulePattern = /\{[\s]*\}/;
      expect(emptyRulePattern.test(cssContent)).toBe(false);
    });

    it('should have opening braces on same line as selector', () => {
      const bracePattern = /[*a-z]+\s*\{/;
      expect(bracePattern.test(cssContent)).toBe(true);
    });
  });

  describe('Global Reset Purpose', () => {
    it('should normalize box model across browsers', () => {
      expect(cssContent).toContain('box-sizing: border-box');
    });

    it('should remove default browser spacing', () => {
      expect(cssContent).toContain('margin: 0');
      expect(cssContent).toContain('padding: 0');
    });

    it('should establish baseline styles', () => {
      // Body should set up base font and colors
      expect(cssContent).toMatch(/body\s*\{[^}]*font-family/s);
      expect(cssContent).toMatch(/body\s*\{[^}]*background-color/s);
      expect(cssContent).toMatch(/body\s*\{[^}]*color/s);
    });
  });

  describe('Font Stack', () => {
    it('should have proper font-family quotes', () => {
      const bodyBlock = cssContent.match(/body\s*\{[^}]*\}/s);
      expect(bodyBlock).toBeTruthy();
      if (bodyBlock) {
        // Fonts with spaces should be quoted
        expect(bodyBlock[0]).toContain("'Segoe UI'");
      }
    });

    it('should include common system fonts', () => {
      const bodyBlock = cssContent.match(/body\s*\{[^}]*\}/s);
      expect(bodyBlock).toBeTruthy();
      if (bodyBlock) {
        const commonFonts = ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'];
        commonFonts.forEach(font => {
          expect(bodyBlock[0]).toContain(font);
        });
      }
    });

    it('should provide cross-platform font coverage', () => {
      // Should include fonts for Windows, Mac, and generic fallback
      expect(cssContent).toContain('Segoe UI'); // Windows
      expect(cssContent).toContain('sans-serif'); // Generic fallback
    });
  });

  describe('File Size and Performance', () => {
    it('should be minimal in size', () => {
      const sizeInBytes = Buffer.byteLength(cssContent, 'utf-8');
      expect(sizeInBytes).toBeLessThan(1024); // Less than 1KB
    });

    it('should have concise content', () => {
      const lines = cssContent.split('\n').length;
      expect(lines).toBeLessThan(20); // Should be very short
    });

    it('should not import other stylesheets', () => {
      expect(cssContent).not.toContain('@import');
    });
  });

  describe('Selector Specificity', () => {
    it('should use low specificity selectors', () => {
      // Universal selector and element selectors are low specificity
      expect(cssContent).toContain('*');
      expect(cssContent).toContain('body');
    });

    it('should not use ID selectors', () => {
      expect(cssContent).not.toContain('#');
    });

    it('should not use class selectors in global styles', () => {
      // Global styles typically don't need class selectors
      const classPattern = /\.[a-zA-Z-_]+\s*\{/;
      expect(classPattern.test(cssContent)).toBe(false);
    });
  });

  describe('Dark Theme Implementation', () => {
    it('should implement dark theme correctly', () => {
      expect(cssContent).toContain('#121212'); // Very dark gray, not pure black
      expect(cssContent).toContain('#ffffff'); // Pure white for contrast
    });

    it('should use appropriate dark mode color', () => {
      // #121212 is a common dark mode background (not pure black #000000)
      expect(cssContent).toContain('#121212');
      expect(cssContent).not.toContain('#000000');
    });

    it('should use maximum contrast text color', () => {
      expect(cssContent).toContain('#ffffff');
    });
  });

  describe('CSS Resets vs Normalize', () => {
    it('should use CSS reset approach', () => {
      // This is a reset (zeroing out), not normalize.css
      expect(cssContent).toContain('margin: 0');
      expect(cssContent).toContain('padding: 0');
    });

    it('should apply reset universally', () => {
      expect(cssContent).toContain('*');
    });
  });
});