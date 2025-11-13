# TypeScript Patterns Reference

This document explains the TypeScript patterns and conventions used in the todo list application. These patterns are demonstrated in the codebase and documented for consistency.

## Table of Contents

- [Design Patterns](#design-patterns)
- [Type System](#type-system)
- [Class Patterns](#class-patterns)
- [Data Persistence](#data-persistence)
- [DOM Manipulation](#dom-manipulation)
- [Event Handling](#event-handling)
- [Best Practices](#best-practices)

## Design Patterns

### Singleton Pattern

**Purpose:** Ensure only one instance of a class exists throughout the application.

**Implementation:**
```typescript
export default class FullList implements List {
  // Static instance - only one exists
  static instance: FullList = new FullList();

  // Private constructor - prevents external instantiation
  private constructor(private _list: LitsItem[] = []) {}
  
  // Access via FullList.instance
}
```

**Usage:**
```typescript
// ✅ Correct - use singleton instance
const fullList = FullList.instance;

// ❌ Wrong - cannot create new instances
const fullList = new FullList(); // Error: constructor is private
```

**When to use:**
- Global state management (FullList)
- Single UI renderer (ListTemplate)
- Configuration objects
- Resource managers

**Example from codebase:**
- `FullList.instance` - Single todo list
- `ListTemplate.instance` - Single template renderer

---

### Interface-First Design

**Purpose:** Define contracts before implementation.

**Pattern:**
```typescript
// 1. Define interface
export interface Item {
  id: string;
  item: string;
  checked: boolean;
}

// 2. Implement with class
export default class LitsItem implements Item {
  constructor(
    private _id: string = "",
    private _item: string = "",
    private _checked: boolean = false
  ) {}
  
  // Implementation...
}
```

**Benefits:**
- Clear contracts
- Type safety
- Easy to test
- Documentation

**When to use:**
- All data models
- All template classes
- Public APIs
- Reusable components

---

## Type System

### Strict Mode

**Configuration in `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

**What this means:**
- ✅ All types must be explicit
- ✅ Null/undefined handled properly
- ✅ Function types checked strictly
- ❌ No `any` types allowed

---

### Type Annotations

**Always annotate:**

**Function parameters and returns:**
```typescript
// ✅ Good
function addItem(item: string): void {
  // ...
}

// ❌ Bad
function addItem(item) {
  return null;
}
```

**Variables when not obvious:**
```typescript
// ✅ Good - explicit when needed
const storedList: string | null = localStorage.getItem("myList");

// ✅ Good - inferred from initialization
const itemId = 1; // inferred as number

// ❌ Bad - implicit any
let data = JSON.parse(input);
```

**Event handlers:**
```typescript
// ✅ Good - typed event
itemEntryForm.addEventListener("submit", (e: SubmitEvent): void => {
  e.preventDefault();
  // ...
});

// ❌ Bad - untyped
itemEntryForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
```

---

### DOM Type Assertions

**Pattern:**
```typescript
// Type assert DOM queries to specific types
const form = document.getElementById("itemEntryForm") as HTMLFormElement;
const input = document.getElementById("newItem") as HTMLInputElement;
const button = document.getElementById("clearButton") as HTMLButtonElement;
```

**Common DOM types:**
- `HTMLElement` - Generic element
- `HTMLFormElement` - Form
- `HTMLInputElement` - Input field
- `HTMLButtonElement` - Button
- `HTMLUListElement` - Unordered list
- `HTMLLIElement` - List item
- `HTMLLabelElement` - Label

**Why this matters:**
- Provides correct properties
- Enables autocomplete
- Catches type errors

**Example:**
```typescript
// ✅ Good - has .value property
const input = document.getElementById("newItem") as HTMLInputElement;
const text = input.value;

// ❌ Bad - .value not on HTMLElement
const input = document.getElementById("newItem");
const text = input.value; // Error
```

---

## Class Patterns

### Private Fields with Getters/Setters

**Pattern:**
```typescript
export default class LitsItem implements Item {
  // Private fields with underscore prefix
  constructor(
    private _id: string = "",
    private _item: string = "",
    private _checked: boolean = false
  ) {}
  
  // Public getters
  get id(): string {
    return this._id;
  }
  
  // Public setters
  set id(id: string) {
    this._id = id;
  }
  
  // Repeat for other fields...
}
```

**Why this pattern:**
- Encapsulation - internals hidden
- Control - can add validation
- Flexibility - can change implementation
- Consistency - uniform access

**When to use:**
- All model classes
- Any class with state
- Classes that need encapsulation

**Note:** Keep setters pure (no side effects like auto-save).

---

### Constructor Patterns

**Private constructor (Singleton):**
```typescript
class FullList {
  static instance: FullList = new FullList();
  
  private constructor(private _list: LitsItem[] = []) {}
}
```

**Public constructor with defaults:**
```typescript
class LitsItem {
  constructor(
    private _id: string = "",
    private _item: string = "",
    private _checked: boolean = false
  ) {}
}
```

**Benefits of default parameters:**
- Flexible instantiation
- Fewer overloads needed
- Clear defaults

---

## Data Persistence

### localStorage Pattern

**Save pattern:**
```typescript
save(): void {
  localStorage.setItem("myList", JSON.stringify(this._list));
}
```

**Load pattern:**
```typescript
load(): void {
  const storedList: string | null = localStorage.getItem("myList");
  
  // Handle null case
  if (typeof storedList !== "string") return;
  
  // Type the parsed data
  const parsedList: { 
    _id: string; 
    _item: string; 
    _checked: boolean 
  }[] = JSON.parse(storedList);
  
  // Reconstruct objects
  parsedList.forEach((itemObj) => {
    const newListItem = new LitsItem(
      itemObj._id,
      itemObj._item,
      itemObj._checked
    );
    this.addItem(newListItem);
  });
}
```

**Key points:**
- Always type localStorage results as `string | null`
- Check for null before parsing
- Type the parsed JSON
- Reconstruct class instances (don't use parsed objects directly)

---

### Auto-Save Pattern

**Call save() after every mutation:**
```typescript
addItem(itemObj: LitsItem): void {
  this._list.push(itemObj);
  this.save(); // Always save after mutation
}

removeItem(id: string): void {
  this._list = this._list.filter((item) => item.id !== id);
  this.save(); // Always save after mutation
}

clearList(): void {
  this._list = [];
  this.save(); // Always save after mutation
}
```

**Why this works:**
- Simple - no manual save calls needed
- Consistent - data always persisted
- Reliable - no forgotten saves

---

## DOM Manipulation

### createElement Pattern

**Pattern:**
```typescript
// Create with type assertion
const li = document.createElement("li") as HTMLLIElement;
const check = document.createElement("input") as HTMLInputElement;
const label = document.createElement("label") as HTMLLabelElement;

// Set properties individually
li.className = "item";
check.type = "checkbox";
check.id = item.id;
check.checked = item.checked;
label.htmlFor = item.id;
label.textContent = item.item;

// Append in order
li.append(check);
li.append(label);
```

**Key practices:**
- ✅ Type assert every createElement
- ✅ Set properties (not attributes)
- ✅ Use textContent (not innerHTML for user data)
- ✅ Append elements individually
- ❌ Don't use innerHTML for dynamic content
- ❌ Don't use template literals for DOM

---

### Rendering Pattern

**Clear-then-render:**
```typescript
render(fullList: FullList): void {
  // Always clear first
  this.clear();
  
  // Then rebuild
  fullList.list.forEach((item) => {
    const li = this.createListItem(item);
    this.ul.prepend(li); // prepend for newest first
  });
}

clear(): void {
  this.ul.innerHTML = "";
}
```

**Why prepend:**
- New items appear at top
- More natural for todo lists
- Latest first ordering

---

## Event Handling

### Event Listener Pattern

**Form submission:**
```typescript
itemEntryForm.addEventListener("submit", (e: SubmitEvent): void => {
  // Always preventDefault first for forms
  e.preventDefault();
  
  // Get and validate input
  const input = document.getElementById("newItem") as HTMLInputElement;
  const text: string = input.value.trim();
  if (!text) return; // Early return for empty
  
  // Update model
  const newItem = new LitsItem(id, text);
  fullList.addItem(newItem);
  
  // Update view
  template.render(fullList);
});
```

**Button click:**
```typescript
button.addEventListener("click", () => {
  fullList.removeItem(item.id);
  this.render(fullList);
});
```

**Checkbox change:**
```typescript
check.addEventListener("change", () => {
  item.checked = !item.checked;
  fullList.save();
});
```

**Key patterns:**
- Type event parameter when using event properties
- preventDefault() for forms
- Trim user input
- Update model first
- Then update view

---

### Inline Event Handlers

**Pattern:**
```typescript
fullList.list.forEach((item) => {
  const button = document.createElement("button") as HTMLButtonElement;
  
  // Inline arrow function captures loop variable
  button.addEventListener("click", () => {
    fullList.removeItem(item.id); // 'item' captured
    this.render(fullList);
  });
});
```

**Why this works:**
- Arrow function captures `item` correctly
- Each iteration gets its own closure
- Clean and readable

---

## Best Practices

### Initialization Pattern

**Wait for DOM:**
```typescript
const initApp = (): void => {
  // All DOM queries and event listeners here
  const fullList = FullList.instance;
  const template = ListTemplate.instance;
  
  // ... setup code
};

// Only run after DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
```

**Why:**
- DOM must exist before querying
- Prevents null reference errors
- Standard best practice

---

### Validation Pattern

**Input validation:**
```typescript
const text: string = input.value.trim();
if (!text) return; // Early return for invalid

// Proceed with valid input
processInput(text);
```

**localStorage validation:**
```typescript
const storedList: string | null = localStorage.getItem("myList");
if (typeof storedList !== "string") return;

// Proceed with valid data
const parsed = JSON.parse(storedList);
```

---

### ID Generation Pattern

**Sequential IDs:**
```typescript
const itemId: number = fullList.list.length
  ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
  : 1;

const newItem = new LitsItem(itemId.toString(), text);
```

**Why strings for IDs:**
- Consistent type across DOM and data
- Easier for HTML id attributes
- Flexible for other ID schemes

---

### Import Pattern

**CSS first:**
```typescript
// Import CSS before JavaScript modules
import "./css/style.css";
import FullList from "./models/FullList";
import LitsItem from "./models/ListItem";
```

**Why:**
- Ensures styles load first
- Prevents FOUC (Flash of Unstyled Content)
- Vite convention

---

## Common Patterns Summary

### Models (Data Layer)
```typescript
export interface Item { /* ... */ }

export default class LitsItem implements Item {
  constructor(private _field: type = default) {}
  get field(): type { return this._field; }
  set field(value: type) { this._field = value; }
}
```

### Collections (State Management)
```typescript
export default class FullList {
  static instance: FullList = new FullList();
  private constructor(private _list: Item[] = []) {}
  
  // Mutations always call save()
  addItem(item: Item): void {
    this._list.push(item);
    this.save();
  }
}
```

### Templates (UI Layer)
```typescript
export default class Template {
  static instance: Template = new Template();
  
  private constructor() {
    this.ul = document.getElementById("id") as HTMLUListElement;
  }
  
  clear(): void { this.ul.innerHTML = ""; }
  
  render(model: Model): void {
    this.clear();
    // Rebuild DOM
  }
}
```

### Entry Point (Initialization)
```typescript
import "./css/style.css";
import Model from "./models/Model";

const initApp = (): void => {
  const model = Model.instance;
  // Setup event listeners
  // Load data
  // Initial render
};

document.addEventListener("DOMContentLoaded", initApp);
```

---

## Anti-Patterns to Avoid

### ❌ Multiple Instances
```typescript
// Bad - breaks singleton pattern
const list1 = new FullList(); // Error anyway (private constructor)
```

### ❌ Skip Type Annotations
```typescript
// Bad - implicit any
function doSomething(data) {
  return data.value;
}
```

### ❌ Direct DOM in Models
```typescript
// Bad - models shouldn't touch DOM
class FullList {
  addItem(item: Item): void {
    this._list.push(item);
    document.getElementById("list").innerHTML = "..."; // No!
  }
}
```

### ❌ innerHTML for User Data
```typescript
// Bad - XSS vulnerability
label.innerHTML = userInput;

// Good - safe text content
label.textContent = userInput;
```

### ❌ Forget to Save
```typescript
// Bad - changes not persisted
addItem(item: Item): void {
  this._list.push(item);
  // Missing: this.save();
}
```

---

## Related Documentation

- [Development Guide](./DEVELOPMENT.md) - Setup and workflows
- [Project Structure](./PROJECT_STRUCTURE.md) - File organization
- [Code Understanding](./CODE_UNDERSTANDING.md) - Analysis process
- [Style Guides](../.results/5-style-guides/) - Category-specific guides

---

**Remember:** These patterns prioritize clarity and type safety. Follow them for consistency across the codebase.
