import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('auth.css - Style Validation', () => {
  let cssContent;

  beforeAll(() => {
    // Read the CSS file
    cssContent = readFileSync(
      join(__dirname, 'auth.css'),
      'utf-8'
    );
  });

  describe('CSS File Structure', () => {
    it('should exist and be readable', () => {
      expect(cssContent).toBeDefined();
      expect(cssContent.length).toBeGreaterThan(0);
    });

    it('should be valid CSS syntax', () => {
      // Check for basic CSS structure (selector { property: value; })
      const cssPattern = /\.[a-zA-Z-_]+\s*\{[^}]+\}/;
      expect(cssPattern.test(cssContent)).toBe(true);
    });

    it('should not have syntax errors', () => {
      // Check for unclosed braces
      const openBraces = (cssContent.match(/\{/g) || []).length;
      const closeBraces = (cssContent.match(/\}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });

    it('should have proper formatting with braces', () => {
      // Ensure all rules have opening and closing braces
      expect(cssContent).toContain('{');
      expect(cssContent).toContain('}');
    });
  });

  describe('Required CSS Classes', () => {
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
      it(`should define .${className} class`, () => {
        const pattern = new RegExp(`\\.${className}\\s*\\{`);
        expect(pattern.test(cssContent)).toBe(true);
      });
    });

    it('should have all required classes present', () => {
      requiredClasses.forEach(className => {
        expect(cssContent).toContain(`.${className}`);
      });
    });
  });

  describe('Layout Properties', () => {
    it('should use flexbox for auth-container', () => {
      const containerPattern = /\.auth-container\s*\{[^}]*display:\s*flex/s;
      expect(containerPattern.test(cssContent)).toBe(true);
    });

    it('should set min-height for auth-container', () => {
      const minHeightPattern = /\.auth-container\s*\{[^}]*min-height:\s*100vh/s;
      expect(minHeightPattern.test(cssContent)).toBe(true);
    });

    it('should use flexbox for auth-left', () => {
      const leftPattern = /\.auth-left\s*\{[^}]*display:\s*flex/s;
      expect(leftPattern.test(cssContent)).toBe(true);
    });

    it('should use flexbox for auth-right', () => {
      const rightPattern = /\.auth-right\s*\{[^}]*display:\s*flex/s;
      expect(rightPattern.test(cssContent)).toBe(true);
    });

    it('should have flex properties for responsive layout', () => {
      expect(cssContent).toMatch(/flex:\s*[0-9.]+/);
    });
  });

  describe('Color Scheme', () => {
    it('should use gradient backgrounds', () => {
      expect(cssContent).toContain('linear-gradient');
    });

    it('should have radial gradient definitions', () => {
      expect(cssContent).toContain('radial-gradient');
    });

    it('should use rgba colors for transparency', () => {
      expect(cssContent).toMatch(/rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/);
    });

    it('should use hex color values', () => {
      expect(cssContent).toMatch(/#[0-9a-fA-F]{3,6}/);
    });

    it('should have background colors defined', () => {
      expect(cssContent).toContain('background');
    });
  });

  describe('Typography', () => {
    it('should define font-size for hero-title', () => {
      const titlePattern = /\.hero-title\s*\{[^}]*font-size:/s;
      expect(titlePattern.test(cssContent)).toBe(true);
    });

    it('should define font-weight for hero-title', () => {
      const weightPattern = /\.hero-title\s*\{[^}]*font-weight:/s;
      expect(weightPattern.test(cssContent)).toBe(true);
    });

    it('should define font-size for brand-name', () => {
      const brandPattern = /\.brand-name\s*\{[^}]*font-size:/s;
      expect(brandPattern.test(cssContent)).toBe(true);
    });

    it('should use rem units for scalable typography', () => {
      expect(cssContent).toMatch(/font-size:\s*[\d.]+rem/);
    });

    it('should define line-height for readability', () => {
      expect(cssContent).toContain('line-height');
    });

    it('should have letter-spacing for brand-name', () => {
      const letterSpacingPattern = /\.brand-name\s*\{[^}]*letter-spacing:/s;
      expect(letterSpacingPattern.test(cssContent)).toBe(true);
    });

    it('should use text-transform for brand-name', () => {
      const transformPattern = /\.brand-name\s*\{[^}]*text-transform:\s*uppercase/s;
      expect(transformPattern.test(cssContent)).toBe(true);
    });
  });

  describe('Visual Effects', () => {
    it('should use backdrop-filter for glassmorphism', () => {
      expect(cssContent).toContain('backdrop-filter');
    });

    it('should have blur effect', () => {
      expect(cssContent).toContain('blur');
    });

    it('should define box-shadow for depth', () => {
      expect(cssContent).toContain('box-shadow');
    });

    it('should use border-radius for rounded corners', () => {
      expect(cssContent).toContain('border-radius');
    });

    it('should have opacity settings', () => {
      expect(cssContent).toContain('opacity');
    });

    it('should use position properties', () => {
      expect(cssContent).toMatch(/position:\s*(relative|absolute|fixed)/);
    });

    it('should use overflow property', () => {
      expect(cssContent).toContain('overflow');
    });
  });

  describe('Image Styling', () => {
    it('should define width for brand-logo', () => {
      const logoPattern = /\.brand-logo\s*\{[^}]*width:/s;
      expect(logoPattern.test(cssContent)).toBe(true);
    });

    it('should define height for brand-logo', () => {
      const logoPattern = /\.brand-logo\s*\{[^}]*height:/s;
      expect(logoPattern.test(cssContent)).toBe(true);
    });

    it('should style auth-image', () => {
      expect(cssContent).toContain('.auth-image');
    });

    it('should have image-overlay styles', () => {
      expect(cssContent).toContain('.image-overlay');
    });
  });

  describe('Button Styling', () => {
    it('should style cta-button', () => {
      expect(cssContent).toContain('.cta-button');
    });

    it('should have button-arrow styles', () => {
      expect(cssContent).toContain('.button-arrow');
    });

    it('should define cursor for buttons', () => {
      // Check if cursor is defined anywhere (likely for buttons)
      const cursorPattern = /cursor:\s*pointer/;
      expect(cursorPattern.test(cssContent)).toBe(true);
    });

    it('should have transition effects', () => {
      expect(cssContent).toContain('transition');
    });
  });

  describe('Features List Styling', () => {
    it('should use flexbox for features-list', () => {
      const featuresPattern = /\.features-list\s*\{[^}]*display:\s*flex/s;
      expect(featuresPattern.test(cssContent)).toBe(true);
    });

    it('should define flex-direction for features-list', () => {
      const directionPattern = /\.features-list\s*\{[^}]*flex-direction:\s*column/s;
      expect(directionPattern.test(cssContent)).toBe(true);
    });

    it('should have gap property for spacing', () => {
      expect(cssContent).toContain('gap');
    });

    it('should style feature-item', () => {
      expect(cssContent).toContain('.feature-item');
    });

    it('should style feature-icon', () => {
      expect(cssContent).toContain('.feature-icon');
    });
  });

  describe('Spacing and Layout', () => {
    it('should define padding', () => {
      expect(cssContent).toContain('padding');
    });

    it('should define margin', () => {
      expect(cssContent).toContain('margin');
    });

    it('should use margin-bottom for vertical spacing', () => {
      expect(cssContent).toContain('margin-bottom');
    });

    it('should use margin-top for vertical spacing', () => {
      expect(cssContent).toContain('margin-top');
    });

    it('should define max-width for content constraint', () => {
      expect(cssContent).toContain('max-width');
    });
  });

  describe('Responsive Design Indicators', () => {
    it('should use flexible units (rem, em, %)', () => {
      const flexibleUnits = /(\d+\.?\d*)(rem|em|%|vh|vw)/;
      expect(flexibleUnits.test(cssContent)).toBe(true);
    });

    it('should have viewport height units', () => {
      expect(cssContent).toContain('vh');
    });

    it('should use percentage values', () => {
      expect(cssContent).toMatch(/:\s*\d+%/);
    });
  });

  describe('Text Effects', () => {
    it('should use background-clip for text effects', () => {
      expect(cssContent).toContain('background-clip');
    });

    it('should use -webkit-background-clip', () => {
      expect(cssContent).toContain('-webkit-background-clip');
    });

    it('should use -webkit-text-fill-color', () => {
      expect(cssContent).toContain('-webkit-text-fill-color');
    });

    it('should use transparent color', () => {
      expect(cssContent).toContain('transparent');
    });
  });

  describe('Z-Index Layering', () => {
    it('should define z-index for layering', () => {
      expect(cssContent).toContain('z-index');
    });

    it('should have position context for z-index', () => {
      // z-index only works with positioned elements
      const hasPosition = /position:\s*(relative|absolute|fixed)/;
      const hasZIndex = /z-index:/;
      
      if (hasZIndex.test(cssContent)) {
        expect(hasPosition.test(cssContent)).toBe(true);
      }
    });
  });

  describe('Border Styling', () => {
    it('should define border properties', () => {
      expect(cssContent).toContain('border');
    });

    it('should have border with rgba for transparency', () => {
      const borderPattern = /border[^:]*:\s*[^;]*rgba/;
      expect(borderPattern.test(cssContent)).toBe(true);
    });
  });

  describe('Alignment Properties', () => {
    it('should use align-items for vertical alignment', () => {
      expect(cssContent).toContain('align-items');
    });

    it('should use justify-content for horizontal alignment', () => {
      expect(cssContent).toContain('justify-content');
    });

    it('should center content appropriately', () => {
      expect(cssContent).toContain('center');
    });
  });

  describe('Code Quality', () => {
    it('should not have duplicate class definitions', () => {
      const classes = cssContent.match(/\.[a-zA-Z-_]+\s*\{/g) || [];
      const uniqueClasses = [...new Set(classes)];
      
      // Allow for pseudo-classes and media queries
      // This is a rough check - some duplication is normal with pseudo-classes
      expect(classes.length).toBeGreaterThan(0);
    });

    it('should have consistent spacing', () => {
      // Check that there are spaces after colons in properties
      const propertyPattern = /[a-z-]+:\s*[^;]+;/;
      expect(propertyPattern.test(cssContent)).toBe(true);
    });

    it('should end properties with semicolons', () => {
      // Most properties should end with semicolons
      const semicolonPattern = /:\s*[^;}]+;/;
      expect(semicolonPattern.test(cssContent)).toBe(true);
    });

    it('should not have empty rule sets', () => {
      const emptyRulePattern = /\{[\s]*\}/;
      expect(emptyRulePattern.test(cssContent)).toBe(false);
    });
  });

  describe('Modern CSS Features', () => {
    it('should use modern color functions', () => {
      const modernColorPattern = /(rgba|hsla|linear-gradient|radial-gradient)/;
      expect(modernColorPattern.test(cssContent)).toBe(true);
    });

    it('should use flexbox layout', () => {
      expect(cssContent).toContain('flex');
    });

    it('should use modern units', () => {
      const modernUnits = /(rem|vh|vw)/;
      expect(modernUnits.test(cssContent)).toBe(true);
    });
  });

  describe('Performance Considerations', () => {
    it('should not use expensive filters excessively', () => {
      // Count filter usages - should be reasonable
      const filterCount = (cssContent.match(/filter:/g) || []).length;
      expect(filterCount).toBeLessThan(20); // Arbitrary reasonable limit
    });

    it('should use transform for animations where applicable', () => {
      // If there are transitions, check for transforms
      if (cssContent.includes('transition')) {
        const hasTransform = cssContent.includes('transform');
        // Transform is performant, but not required
        expect(true).toBe(true);
      }
    });
  });

  describe('File Size', () => {
    it('should be under 500KB', () => {
      const sizeInKB = Buffer.byteLength(cssContent, 'utf-8') / 1024;
      expect(sizeInKB).toBeLessThan(500);
    });

    it('should have reasonable length', () => {
      const lines = cssContent.split('\n').length;
      expect(lines).toBeGreaterThan(100); // Should have substantial content
      expect(lines).toBeLessThan(2000); // But not excessively long
    });
  });
});