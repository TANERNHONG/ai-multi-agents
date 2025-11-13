import { describe, it, expect } from 'vitest';
import LitsItem, { Item } from '../../models/ListItem';

describe('ListItem', () => {
  describe('Constructor', () => {
    it('should create a ListItem with default values', () => {
      const item = new LitsItem();
      
      expect(item.id).toBe('');
      expect(item.item).toBe('');
      expect(item.checked).toBe(false);
    });

    it('should create a ListItem with provided values', () => {
      const item = new LitsItem('1', 'Buy groceries', true);
      
      expect(item.id).toBe('1');
      expect(item.item).toBe('Buy groceries');
      expect(item.checked).toBe(true);
    });
  });

  describe('Interface Implementation', () => {
    it('should implement Item interface correctly', () => {
      const item: Item = new LitsItem('1', 'Test item', false);
      
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('item');
      expect(item).toHaveProperty('checked');
    });
  });

  describe('Getters and Setters', () => {
    describe('id', () => {
      it('should get id value', () => {
        const item = new LitsItem('123', 'Test', false);
        expect(item.id).toBe('123');
      });

      it('should set id value', () => {
        const item = new LitsItem();
        item.id = '456';
        expect(item.id).toBe('456');
      });
    });

    describe('item', () => {
      it('should get item text', () => {
        const item = new LitsItem('1', 'Read a book', false);
        expect(item.item).toBe('Read a book');
      });

      it('should set item text', () => {
        const item = new LitsItem('1', 'Original text', false);
        item.item = 'Updated text';
        expect(item.item).toBe('Updated text');
      });

      it('should handle empty string', () => {
        const item = new LitsItem('1', '', false);
        expect(item.item).toBe('');
      });

      it('should handle long text', () => {
        const longText = 'A'.repeat(100);
        const item = new LitsItem('1', longText, false);
        expect(item.item).toBe(longText);
      });
    });

    describe('checked', () => {
      it('should get checked status', () => {
        const item = new LitsItem('1', 'Test', true);
        expect(item.checked).toBe(true);
      });

      it('should set checked status', () => {
        const item = new LitsItem('1', 'Test', false);
        item.checked = true;
        expect(item.checked).toBe(true);
      });

      it('should toggle checked status', () => {
        const item = new LitsItem('1', 'Test', false);
        item.checked = !item.checked;
        expect(item.checked).toBe(true);
        item.checked = !item.checked;
        expect(item.checked).toBe(false);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle special characters in item text', () => {
      const specialText = '<script>alert("test")</script>';
      const item = new LitsItem('1', specialText, false);
      expect(item.item).toBe(specialText);
    });

    it('should handle unicode characters', () => {
      const unicodeText = '🎉 Buy 日本語 items';
      const item = new LitsItem('1', unicodeText, false);
      expect(item.item).toBe(unicodeText);
    });

    it('should handle numeric id as string', () => {
      const item = new LitsItem('12345', 'Test', false);
      expect(item.id).toBe('12345');
      expect(typeof item.id).toBe('string');
    });
  });
});
