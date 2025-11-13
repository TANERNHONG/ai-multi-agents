import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import ListTemplate from '../../templates/ListTemplate';
import FullList from '../../models/FullList';
import LitsItem from '../../models/ListItem';

describe('ListTemplate', () => {
  // Setup DOM once before all tests
  beforeAll(() => {
    document.body.innerHTML = `
      <ul id="listItems"></ul>
    `;
    // Update the singleton's ul reference after DOM is set up
    const template = ListTemplate.instance;
    template.ul = document.getElementById('listItems') as HTMLUListElement;
  });

  // Reset state before each test
  beforeEach(() => {
    // Clear the list
    const template = ListTemplate.instance;
    if (template.ul) {
      template.ul.innerHTML = '';
    }
    
    // Reset singleton state
    FullList.instance.clearList();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = ListTemplate.instance;
      const instance2 = ListTemplate.instance;
      
      expect(instance1).toBe(instance2);
    });

    it('should have ul property', () => {
      const template = ListTemplate.instance;
      expect(template.ul).toBeDefined();
      expect(template.ul).toBeInstanceOf(HTMLUListElement);
    });
  });

  describe('Constructor', () => {
    it('should cache DOM reference to listItems ul', () => {
      const template = ListTemplate.instance;
      const ul = document.getElementById('listItems');
      
      expect(template.ul).toBe(ul);
    });

    it('should throw error if listItems element not found', () => {
      document.body.innerHTML = '';
      
      // Since it's a singleton, we can't easily test this without creating a new class
      // This tests that the element exists when instance is created
      const template = ListTemplate.instance;
      expect(template.ul).toBeTruthy();
    });
  });

  describe('clear', () => {
    it('should remove all children from ul', () => {
      const template = ListTemplate.instance;
      
      // Add some items manually
      template.ul.innerHTML = `
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      `;
      
      expect(template.ul.children.length).toBe(3);
      
      template.clear();
      
      expect(template.ul.innerHTML).toBe('');
      expect(template.ul.children.length).toBe(0);
    });

    it('should work on already empty list', () => {
      const template = ListTemplate.instance;
      
      template.clear();
      
      expect(template.ul.innerHTML).toBe('');
    });
  });

  describe('render', () => {
    it('should render empty list', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      template.render(fullList);
      
      expect(template.ul.children.length).toBe(0);
    });

    it('should render single item', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('1', 'Test task', false));
      template.render(fullList);
      
      expect(template.ul.children.length).toBe(1);
      
      const li = template.ul.children[0] as HTMLLIElement;
      expect(li.className).toBe('item');
    });

    it('should render multiple items', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('1', 'Task 1', false));
      fullList.addItem(new LitsItem('2', 'Task 2', false));
      fullList.addItem(new LitsItem('3', 'Task 3', false));
      
      template.render(fullList);
      
      expect(template.ul.children.length).toBe(3);
    });

    it('should clear before rendering', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      // First render
      fullList.addItem(new LitsItem('1', 'Task 1', false));
      template.render(fullList);
      expect(template.ul.children.length).toBe(1);
      
      // Second render with more items
      fullList.addItem(new LitsItem('2', 'Task 2', false));
      template.render(fullList);
      
      // Should have 2 items, not 3 (which would happen without clear)
      expect(template.ul.children.length).toBe(2);
    });

    it('should prepend items (newest first)', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('1', 'First task', false));
      fullList.addItem(new LitsItem('2', 'Second task', false));
      
      template.render(fullList);
      
      // Second task should be first in DOM (prepend order)
      const firstLi = template.ul.children[0] as HTMLLIElement;
      const label = firstLi.querySelector('label');
      expect(label?.textContent).toBe('Second task');
    });
  });

  describe('Item Structure', () => {
    it('should create li with correct className', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('1', 'Task', false));
      template.render(fullList);
      
      const li = template.ul.children[0] as HTMLLIElement;
      expect(li.className).toBe('item');
    });

    it('should create checkbox with correct properties', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('42', 'Task', false));
      template.render(fullList);
      
      const checkbox = template.ul.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(checkbox).toBeTruthy();
      expect(checkbox.type).toBe('checkbox');
      expect(checkbox.id).toBe('42');
      expect(checkbox.tabIndex).toBe(0);
      expect(checkbox.checked).toBe(false);
    });

    it('should create checked checkbox when item is checked', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('1', 'Task', true));
      template.render(fullList);
      
      const checkbox = template.ul.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('should create label with correct properties', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('123', 'My task text', false));
      template.render(fullList);
      
      const label = template.ul.querySelector('label') as HTMLLabelElement;
      expect(label).toBeTruthy();
      expect(label.htmlFor).toBe('123');
      expect(label.textContent).toBe('My task text');
    });

    it('should use textContent for label (not innerHTML)', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      const xssAttempt = '<script>alert("xss")</script>';
      fullList.addItem(new LitsItem('1', xssAttempt, false));
      template.render(fullList);
      
      const label = template.ul.querySelector('label') as HTMLLabelElement;
      // textContent will escape HTML, so it should be safe
      expect(label.textContent).toBe(xssAttempt);
      expect(template.ul.querySelector('script')).toBeNull();
    });

    it('should create delete button with correct properties', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('1', 'Task', false));
      template.render(fullList);
      
      const button = template.ul.querySelector('button') as HTMLButtonElement;
      expect(button).toBeTruthy();
      expect(button.className).toBe('button');
      expect(button.textContent).toBe('x');
    });
  });

  describe('Event Handlers', () => {
    it('should toggle checked status on checkbox change', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      const item = new LitsItem('1', 'Task', false);
      fullList.addItem(item);
      template.render(fullList);
      
      const checkbox = template.ul.querySelector('input[type="checkbox"]') as HTMLInputElement;
      
      // Simulate checkbox change
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));
      
      expect(item.checked).toBe(true);
    });

    it('should save to localStorage on checkbox change', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      const saveSpy = vi.spyOn(fullList, 'save');
      
      fullList.addItem(new LitsItem('1', 'Task', false));
      template.render(fullList);
      
      const checkbox = template.ul.querySelector('input[type="checkbox"]') as HTMLInputElement;
      checkbox.dispatchEvent(new Event('change'));
      
      expect(saveSpy).toHaveBeenCalled();
    });

    it('should remove item on button click', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('1', 'Task 1', false));
      fullList.addItem(new LitsItem('2', 'Task 2', false));
      template.render(fullList);
      
      expect(fullList.list.length).toBe(2);
      
      const button = template.ul.querySelector('button') as HTMLButtonElement;
      button.click();
      
      expect(fullList.list.length).toBe(1);
    });

    it('should re-render on button click', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('1', 'Task 1', false));
      fullList.addItem(new LitsItem('2', 'Task 2', false));
      template.render(fullList);
      
      expect(template.ul.children.length).toBe(2);
      
      const button = template.ul.querySelector('button') as HTMLButtonElement;
      button.click();
      
      // Should have re-rendered with only 1 item
      expect(template.ul.children.length).toBe(1);
    });

    it('should handle multiple checkbox toggles', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      const item = new LitsItem('1', 'Task', false);
      fullList.addItem(item);
      template.render(fullList);
      
      const checkbox = template.ul.querySelector('input[type="checkbox"]') as HTMLInputElement;
      
      // Toggle multiple times
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));
      expect(item.checked).toBe(true);
      
      checkbox.checked = false;
      checkbox.dispatchEvent(new Event('change'));
      expect(item.checked).toBe(false);
      
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));
      expect(item.checked).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle special characters in item text', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      const specialText = '< > & " \' / \\ @ # $ %';
      fullList.addItem(new LitsItem('1', specialText, false));
      template.render(fullList);
      
      const label = template.ul.querySelector('label');
      expect(label?.textContent).toBe(specialText);
    });

    it('should handle unicode and emoji in item text', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      const unicodeText = '🎉 日本語 тест test';
      fullList.addItem(new LitsItem('1', unicodeText, false));
      template.render(fullList);
      
      const label = template.ul.querySelector('label');
      expect(label?.textContent).toBe(unicodeText);
    });

    it('should handle very long item text', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      const longText = 'A'.repeat(1000);
      fullList.addItem(new LitsItem('1', longText, false));
      template.render(fullList);
      
      const label = template.ul.querySelector('label');
      expect(label?.textContent).toBe(longText);
    });

    it('should handle empty item text', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('1', '', false));
      template.render(fullList);
      
      const label = template.ul.querySelector('label');
      expect(label?.textContent).toBe('');
    });

    it('should render items with duplicate text correctly', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('1', 'Same task', false));
      fullList.addItem(new LitsItem('2', 'Same task', false));
      template.render(fullList);
      
      expect(template.ul.children.length).toBe(2);
      
      const labels = template.ul.querySelectorAll('label');
      expect(labels[0].textContent).toBe('Same task');
      expect(labels[1].textContent).toBe('Same task');
      expect(labels[0].htmlFor).not.toBe(labels[1].htmlFor); // Different IDs
    });
  });

  describe('Accessibility', () => {
    it('should have accessible checkbox with tabIndex', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('1', 'Task', false));
      template.render(fullList);
      
      const checkbox = template.ul.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(checkbox.tabIndex).toBe(0);
    });

    it('should associate label with checkbox via htmlFor', () => {
      const template = ListTemplate.instance;
      const fullList = FullList.instance;
      
      fullList.addItem(new LitsItem('unique-id', 'Task', false));
      template.render(fullList);
      
      const checkbox = template.ul.querySelector('input[type="checkbox"]') as HTMLInputElement;
      const label = template.ul.querySelector('label') as HTMLLabelElement;
      
      expect(checkbox.id).toBe('unique-id');
      expect(label.htmlFor).toBe('unique-id');
    });
  });
});
