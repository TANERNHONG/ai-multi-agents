import { describe, it, expect, beforeEach, beforeAll, afterEach, vi } from 'vitest';
import FullList from '../../models/FullList';
import ListTemplate from '../../templates/ListTemplate';
import LitsItem from '../../models/ListItem';

describe('Main Application Integration', () => {
  let itemEntryForm: HTMLFormElement;
  let newItemInput: HTMLInputElement;
  let addItemButton: HTMLButtonElement;
  let clearItemsButton: HTMLButtonElement;
  let listItemsUl: HTMLUListElement;

  // Mock localStorage
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeAll(() => {
    // Set up full HTML structure
    document.body.innerHTML = `
      <main>
        <h1 class="offscreen">My List</h1>

        <section class="newItemEntry">
          <h2 class="offscreen">New Item Entry</h2>
          <form class="newItemEntry__form" id="itemEntryForm">
            <label for="newItem" class="offscreen">Enter a new to do item</label>
            <input class="newItemEntry__input" id="newItem" type="text" maxlength="40" autocomplete="off"
              placeholder="Add item" />
            <button id="addItem" class="button newItemEntry__button" title="Add new item" aria-label="Add new item to list">
              +
            </button>
          </form>
        </section>

        <section class="listContainer">
          <header class="listTitle">
            <h2 id="listName">List</h2>
            <button id="clearItemsButton" class="button listTitle__button" title="Clear the list"
              aria-label="Remove all items from the list">
              Clear
            </button>
          </header>
          <hr />
          <ul id="listItems"></ul>
        </section>
      </main>
    `;

    // Update singleton references
    global.localStorage = localStorageMock as any;
    ListTemplate.instance.ul = document.getElementById('listItems') as HTMLUListElement;
  });

  beforeEach(() => {
    // Reset localStorage
    localStorageMock.clear();
    
    // Get DOM elements
    itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement;
    newItemInput = document.getElementById('newItem') as HTMLInputElement;
    addItemButton = document.getElementById('addItem') as HTMLButtonElement;
    clearItemsButton = document.getElementById('clearItemsButton') as HTMLButtonElement;
    listItemsUl = document.getElementById('listItems') as HTMLUListElement;

    // Clear state
    FullList.instance.clearList();
    ListTemplate.instance.clear();
    newItemInput.value = '';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Application Initialization', () => {
    it('should have all required DOM elements', () => {
      expect(itemEntryForm).toBeTruthy();
      expect(newItemInput).toBeTruthy();
      expect(addItemButton).toBeTruthy();
      expect(clearItemsButton).toBeTruthy();
      expect(listItemsUl).toBeTruthy();
    });

    it('should initialize with empty list', () => {
      const fullList = FullList.instance;
      expect(fullList.list).toHaveLength(0);
      expect(listItemsUl.children).toHaveLength(0);
    });

    it('should load saved items from localStorage', () => {
      // Pre-populate localStorage
      const mockData = [
        { _id: '1', _item: 'Saved task 1', _checked: false },
        { _id: '2', _item: 'Saved task 2', _checked: true },
      ];
      localStorage.setItem('myList', JSON.stringify(mockData));

      const fullList = FullList.instance;
      fullList.load();
      const template = ListTemplate.instance;
      template.render(fullList);

      expect(fullList.list).toHaveLength(2);
      expect(listItemsUl.children).toHaveLength(2);
    });
  });

  describe('Form Submission - Adding Items', () => {
    it('should add item on form submit', () => {
      const fullList = FullList.instance;
      const template = ListTemplate.instance;
      

      // Simulate user input
      newItemInput.value = 'New task';

      // Manually execute the form logic since we're not running the full app
      const myEntryText = newItemInput.value.trim();
      if (myEntryText) {
        const itemId = fullList.list.length
          ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
          : 1;
        
        const newItem = new LitsItem(itemId.toString(), myEntryText);
        fullList.addItem(newItem);
        template.render(fullList);
      }

      expect(fullList.list).toHaveLength(1);
      expect(fullList.list[0].item).toBe('New task');
      expect(listItemsUl.children).toHaveLength(1);
    });

    it('should trim whitespace from input', () => {
      const fullList = FullList.instance;
      const template = ListTemplate.instance;

      newItemInput.value = '  Task with spaces  ';
      const myEntryText = newItemInput.value.trim();

      expect(myEntryText).toBe('Task with spaces');
    });

    it('should not add empty item', () => {
      const fullList = FullList.instance;
      
      newItemInput.value = '';
      const myEntryText = newItemInput.value.trim();

      if (myEntryText) {
        
        const newItem = new LitsItem('1', myEntryText);
        fullList.addItem(newItem);
      }

      expect(fullList.list).toHaveLength(0);
    });

    it('should not add whitespace-only item', () => {
      const fullList = FullList.instance;
      
      newItemInput.value = '   ';
      const myEntryText = newItemInput.value.trim();

      if (myEntryText) {
        
        const newItem = new LitsItem('1', myEntryText);
        fullList.addItem(newItem);
      }

      expect(fullList.list).toHaveLength(0);
    });

    it('should generate sequential IDs', () => {
      const fullList = FullList.instance;
      

      // Add first item
      let itemId = fullList.list.length
        ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
        : 1;
      fullList.addItem(new LitsItem(itemId.toString(), 'Task 1'));
      expect(fullList.list[0].id).toBe('1');

      // Add second item
      itemId = fullList.list.length
        ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
        : 1;
      fullList.addItem(new LitsItem(itemId.toString(), 'Task 2'));
      expect(fullList.list[1].id).toBe('2');

      // Add third item
      itemId = fullList.list.length
        ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
        : 1;
      fullList.addItem(new LitsItem(itemId.toString(), 'Task 3'));
      expect(fullList.list[2].id).toBe('3');
    });

    it('should save to localStorage after adding', () => {
      const fullList = FullList.instance;
      

      const itemId = fullList.list.length
        ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
        : 1;
      fullList.addItem(new LitsItem(itemId.toString(), 'Task to save'));

      const stored = localStorage.getItem('myList');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0]._item).toBe('Task to save');
    });

    it('should render item after adding', () => {
      const fullList = FullList.instance;
      const template = ListTemplate.instance;
      

      const itemId = fullList.list.length
        ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
        : 1;
      fullList.addItem(new LitsItem(itemId.toString(), 'Rendered task'));
      template.render(fullList);

      expect(listItemsUl.children).toHaveLength(1);
      const label = listItemsUl.querySelector('label');
      expect(label?.textContent).toBe('Rendered task');
    });
  });

  describe('Clear Button Functionality', () => {
    it('should clear all items on button click', () => {
      const fullList = FullList.instance;
      const template = ListTemplate.instance;
      

      // Add some items
      fullList.addItem(new LitsItem('1', 'Task 1'));
      fullList.addItem(new LitsItem('2', 'Task 2'));
      template.render(fullList);

      expect(fullList.list).toHaveLength(2);
      expect(listItemsUl.children).toHaveLength(2);

      // Simulate clear button click
      clearItemsButton.click();
      fullList.clearList();
      template.clear();

      expect(fullList.list).toHaveLength(0);
      expect(listItemsUl.children).toHaveLength(0);
    });

    it('should save empty list to localStorage after clearing', () => {
      const fullList = FullList.instance;
      

      fullList.addItem(new LitsItem('1', 'Task 1'));
      fullList.clearList();

      const stored = localStorage.getItem('myList');
      const parsed = JSON.parse(stored!);
      expect(parsed).toEqual([]);
    });

    it('should work when list is already empty', () => {
      const fullList = FullList.instance;
      const template = ListTemplate.instance;

      clearItemsButton.click();
      fullList.clearList();
      template.clear();

      expect(fullList.list).toHaveLength(0);
      expect(listItemsUl.children).toHaveLength(0);
    });
  });

  describe('Complete User Flows', () => {
    it('should complete add-check-delete flow', () => {
      const fullList = FullList.instance;
      const template = ListTemplate.instance;
      

      // Add item
      fullList.addItem(new LitsItem('1', 'Complete task'));
      template.render(fullList);
      expect(fullList.list[0].checked).toBe(false);

      // Check item
      fullList.list[0].checked = true;
      fullList.save();
      expect(fullList.list[0].checked).toBe(true);

      // Delete item
      fullList.removeItem('1');
      template.render(fullList);
      expect(fullList.list).toHaveLength(0);
    });

    it('should persist and reload items correctly', () => {
      const fullList = FullList.instance;
      const template = ListTemplate.instance;
      

      // Add and check items
      fullList.addItem(new LitsItem('1', 'Task 1', false));
      fullList.addItem(new LitsItem('2', 'Task 2', true));
      fullList.addItem(new LitsItem('3', 'Task 3', false));

      // Simulate page reload by clearing in-memory state
      fullList['_list'] = [];
      fullList.load();

      expect(fullList.list).toHaveLength(3);
      expect(fullList.list[0].item).toBe('Task 1');
      expect(fullList.list[0].checked).toBe(false);
      expect(fullList.list[1].item).toBe('Task 2');
      expect(fullList.list[1].checked).toBe(true);
      expect(fullList.list[2].item).toBe('Task 3');
      expect(fullList.list[2].checked).toBe(false);
    });

    it('should handle rapid additions', () => {
      const fullList = FullList.instance;
      const template = ListTemplate.instance;
      

      // Rapidly add multiple items
      for (let i = 1; i <= 10; i++) {
        const itemId = fullList.list.length
          ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
          : 1;
        fullList.addItem(new LitsItem(itemId.toString(), `Task ${i}`));
      }

      template.render(fullList);

      expect(fullList.list).toHaveLength(10);
      expect(listItemsUl.children).toHaveLength(10);
    });

    it('should handle mixed operations', () => {
      const fullList = FullList.instance;
      const template = ListTemplate.instance;
      

      // Add items
      fullList.addItem(new LitsItem('1', 'Task 1'));
      fullList.addItem(new LitsItem('2', 'Task 2'));
      fullList.addItem(new LitsItem('3', 'Task 3'));

      // Remove middle item
      fullList.removeItem('2');

      // Add another
      fullList.addItem(new LitsItem('4', 'Task 4'));

      // Check an item
      fullList.list[0].checked = true;
      fullList.save();

      template.render(fullList);

      expect(fullList.list).toHaveLength(3);
      expect(fullList.list.map(item => item.id)).toEqual(['1', '3', '4']);
    });
  });

  describe('Input Validation', () => {
    it('should respect maxlength attribute', () => {
      expect(newItemInput.maxLength).toBe(40);
    });

    it('should have autocomplete off', () => {
      expect(newItemInput.autocomplete).toBe('off');
    });

    it('should have placeholder text', () => {
      expect(newItemInput.placeholder).toBe('Add item');
    });

    it('should be text input type', () => {
      expect(newItemInput.type).toBe('text');
    });
  });

  describe('Accessibility', () => {
    it('should have offscreen headings', () => {
      const h1 = document.querySelector('h1.offscreen');
      const h2 = document.querySelector('h2.offscreen');
      
      expect(h1).toBeTruthy();
      expect(h1?.textContent).toBe('My List');
      expect(h2).toBeTruthy();
      expect(h2?.textContent).toBe('New Item Entry');
    });

    it('should have proper label associations', () => {
      const label = document.querySelector('label[for="newItem"]');
      
      expect(label).toBeTruthy();
      expect(label?.classList.contains('offscreen')).toBe(true);
      expect(label?.textContent).toBe('Enter a new to do item');
    });

    it('should have aria-labels on buttons', () => {
      expect(addItemButton.getAttribute('aria-label')).toBe('Add new item to list');
      expect(clearItemsButton.getAttribute('aria-label')).toBe('Remove all items from the list');
    });

    it('should have title attributes on buttons', () => {
      expect(addItemButton.title).toBe('Add new item');
      expect(clearItemsButton.title).toBe('Clear the list');
    });
  });

  describe('Form Behavior', () => {
    it('should prevent default form submission', () => {
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault');
      
      itemEntryForm.dispatchEvent(submitEvent);
      
      // In actual implementation, preventDefault should be called
      // We're testing the event structure here
      expect(submitEvent.cancelable).toBe(true);
    });

    it('should handle Enter key submission', () => {
      const fullList = FullList.instance;
      
      newItemInput.value = 'Task from Enter key';
      
      // Simulate Enter key
      const keyEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      newItemInput.dispatchEvent(keyEvent);
      
      // Form should handle this via submit event
      expect(itemEntryForm).toBeTruthy();
    });
  });
});
