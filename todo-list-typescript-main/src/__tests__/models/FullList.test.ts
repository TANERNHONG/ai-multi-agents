import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import FullList from '../../models/FullList';
import LitsItem from '../../models/ListItem';

describe('FullList', () => {
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

  beforeEach(() => {
    // Reset localStorage mock before each test
    localStorageMock.clear();
    global.localStorage = localStorageMock as any;
    
    // Reset the singleton instance by clearing the list
    FullList.instance.clearList();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = FullList.instance;
      const instance2 = FullList.instance;
      
      expect(instance1).toBe(instance2);
    });

    it('should maintain state across instance accesses', () => {
      const instance1 = FullList.instance;
      const item = new LitsItem('1', 'Test item', false);
      instance1.addItem(item);
      
      const instance2 = FullList.instance;
      expect(instance2.list).toHaveLength(1);
      expect(instance2.list[0].item).toBe('Test item');
    });
  });

  describe('Constructor and Initial State', () => {
    it('should initialize with empty list', () => {
      const fullList = FullList.instance;
      expect(fullList.list).toEqual([]);
    });

    it('should have list getter', () => {
      const fullList = FullList.instance;
      expect(fullList.list).toBeDefined();
      expect(Array.isArray(fullList.list)).toBe(true);
    });
  });

  describe('addItem', () => {
    it('should add an item to the list', () => {
      const fullList = FullList.instance;
      const item = new LitsItem('1', 'Buy milk', false);
      
      fullList.addItem(item);
      
      expect(fullList.list).toHaveLength(1);
      expect(fullList.list[0]).toBe(item);
    });

    it('should add multiple items', () => {
      const fullList = FullList.instance;
      const item1 = new LitsItem('1', 'Task 1', false);
      const item2 = new LitsItem('2', 'Task 2', false);
      const item3 = new LitsItem('3', 'Task 3', false);
      
      fullList.addItem(item1);
      fullList.addItem(item2);
      fullList.addItem(item3);
      
      expect(fullList.list).toHaveLength(3);
      expect(fullList.list[0].item).toBe('Task 1');
      expect(fullList.list[1].item).toBe('Task 2');
      expect(fullList.list[2].item).toBe('Task 3');
    });

    it('should save to localStorage after adding', () => {
      const fullList = FullList.instance;
      const item = new LitsItem('1', 'Test item', false);
      
      fullList.addItem(item);
      
      const stored = localStorage.getItem('myList');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0]._item).toBe('Test item');
    });
  });

  describe('removeItem', () => {
    it('should remove an item by id', () => {
      const fullList = FullList.instance;
      const item1 = new LitsItem('1', 'Task 1', false);
      const item2 = new LitsItem('2', 'Task 2', false);
      
      fullList.addItem(item1);
      fullList.addItem(item2);
      fullList.removeItem('1');
      
      expect(fullList.list).toHaveLength(1);
      expect(fullList.list[0].id).toBe('2');
    });

    it('should not remove anything if id does not exist', () => {
      const fullList = FullList.instance;
      const item = new LitsItem('1', 'Task 1', false);
      
      fullList.addItem(item);
      fullList.removeItem('999');
      
      expect(fullList.list).toHaveLength(1);
    });

    it('should save to localStorage after removing', () => {
      const fullList = FullList.instance;
      const item1 = new LitsItem('1', 'Task 1', false);
      const item2 = new LitsItem('2', 'Task 2', false);
      
      fullList.addItem(item1);
      fullList.addItem(item2);
      fullList.removeItem('1');
      
      const stored = localStorage.getItem('myList');
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0]._id).toBe('2');
    });

    it('should handle removing the last item', () => {
      const fullList = FullList.instance;
      const item = new LitsItem('1', 'Task 1', false);
      
      fullList.addItem(item);
      fullList.removeItem('1');
      
      expect(fullList.list).toHaveLength(0);
    });
  });

  describe('clearList', () => {
    it('should remove all items from the list', () => {
      const fullList = FullList.instance;
      fullList.addItem(new LitsItem('1', 'Task 1', false));
      fullList.addItem(new LitsItem('2', 'Task 2', false));
      fullList.addItem(new LitsItem('3', 'Task 3', false));
      
      fullList.clearList();
      
      expect(fullList.list).toHaveLength(0);
    });

    it('should save empty list to localStorage', () => {
      const fullList = FullList.instance;
      fullList.addItem(new LitsItem('1', 'Task 1', false));
      
      fullList.clearList();
      
      const stored = localStorage.getItem('myList');
      const parsed = JSON.parse(stored!);
      expect(parsed).toEqual([]);
    });

    it('should work on already empty list', () => {
      const fullList = FullList.instance;
      fullList.clearList();
      
      expect(fullList.list).toHaveLength(0);
    });
  });

  describe('save', () => {
    it('should save list to localStorage with correct key', () => {
      const fullList = FullList.instance;
      const item = new LitsItem('1', 'Task 1', false);
      fullList.addItem(item);
      
      const stored = localStorage.getItem('myList');
      expect(stored).toBeTruthy();
    });

    it('should serialize items correctly', () => {
      const fullList = FullList.instance;
      const item = new LitsItem('42', 'Test task', true);
      fullList.addItem(item);
      
      const stored = localStorage.getItem('myList');
      const parsed = JSON.parse(stored!);
      
      expect(parsed[0]._id).toBe('42');
      expect(parsed[0]._item).toBe('Test task');
      expect(parsed[0]._checked).toBe(true);
    });

    it('should handle empty list serialization', () => {
      const fullList = FullList.instance;
      fullList.save();
      
      const stored = localStorage.getItem('myList');
      expect(stored).toBe('[]');
    });
  });

  describe('load', () => {
    it('should load items from localStorage', () => {
      const mockData = [
        { _id: '1', _item: 'Task 1', _checked: false },
        { _id: '2', _item: 'Task 2', _checked: true },
      ];
      localStorage.setItem('myList', JSON.stringify(mockData));
      
      const fullList = FullList.instance;
      fullList.load();
      
      expect(fullList.list).toHaveLength(2);
      expect(fullList.list[0].item).toBe('Task 1');
      expect(fullList.list[0].checked).toBe(false);
      expect(fullList.list[1].item).toBe('Task 2');
      expect(fullList.list[1].checked).toBe(true);
    });

    it('should handle empty localStorage', () => {
      const fullList = FullList.instance;
      fullList.load();
      
      expect(fullList.list).toHaveLength(0);
    });

    it('should handle invalid JSON in localStorage', () => {
      localStorage.setItem('myList', 'invalid json');
      
      const fullList = FullList.instance;
      expect(() => fullList.load()).toThrow();
    });

    it('should not load if localStorage returns null', () => {
      const fullList = FullList.instance;
      fullList.load();
      
      expect(fullList.list).toHaveLength(0);
    });

    it('should create LitsItem instances from loaded data', () => {
      const mockData = [{ _id: '1', _item: 'Task 1', _checked: false }];
      localStorage.setItem('myList', JSON.stringify(mockData));
      
      const fullList = FullList.instance;
      fullList.load();
      
      expect(fullList.list[0]).toBeInstanceOf(LitsItem);
    });

    it('should append to existing list when loading', () => {
      const fullList = FullList.instance;
      fullList.addItem(new LitsItem('1', 'Existing task', false));
      
      const mockData = [{ _id: '2', _item: 'Loaded task', _checked: false }];
      localStorage.setItem('myList', JSON.stringify(mockData));
      
      fullList.load();
      
      expect(fullList.list).toHaveLength(2);
      expect(fullList.list[0].item).toBe('Existing task');
      expect(fullList.list[1].item).toBe('Loaded task');
    });
  });

  describe('Integration - Full Lifecycle', () => {
    it('should handle add, check, save, load cycle', () => {
      // Create and add items
      const fullList = FullList.instance;
      fullList.addItem(new LitsItem('1', 'Task 1', false));
      fullList.addItem(new LitsItem('2', 'Task 2', false));
      
      // Modify an item
      fullList.list[0].checked = true;
      fullList.save();
      
      // Clear and reload
      fullList.clearList();
      fullList.load();
      
      expect(fullList.list).toHaveLength(0); // clearList saves empty array
    });

    it('should persist state across save and load', () => {
      const fullList1 = FullList.instance;
      fullList1.clearList(); // Start fresh
      fullList1.addItem(new LitsItem('1', 'Persistent task', true));
      
      // Save the current state
      const mockStored = localStorage.getItem('myList');
      expect(mockStored).toBeTruthy();
      
      // Clear the in-memory list but keep localStorage
      fullList1['_list'] = []; // Access private field for testing
      
      // Load from localStorage
      fullList1.load();
      
      expect(fullList1.list).toHaveLength(1);
      expect(fullList1.list[0].item).toBe('Persistent task');
      expect(fullList1.list[0].checked).toBe(true);
    });
  });
});
