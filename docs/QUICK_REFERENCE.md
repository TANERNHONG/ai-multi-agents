# Quick Reference Guide

Fast access to common tasks, commands, and patterns.

## Table of Contents

- [Installation & Setup](#installation--setup)
- [Common Commands](#common-commands)
- [Code Patterns](#code-patterns)
- [File Locations](#file-locations)
- [Agent Templates](#agent-templates)
- [Troubleshooting](#troubleshooting)

---

## Installation & Setup

### Quick Start
```bash
git clone https://github.com/TANERNHONG/ai-multi-agents.git
cd ai-multi-agents/todo-list-typescript-main
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

---

## Common Commands

### Development
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
```

### TypeScript
```bash
npx tsc --noEmit        # Type check without output
npx tsc --watch         # Watch mode type checking
```

### Git
```bash
git status              # Check status
git add .               # Stage all changes
git commit -m "msg"     # Commit changes
git push                # Push to remote
```

### Debugging
```bash
# In browser console:
localStorage              # View storage
localStorage.clear()      # Clear storage
localStorage.getItem('myList')  # Get todo data
```

---

## Code Patterns

### Creating a Model
```typescript
export interface MyModel {
  id: string;
  name: string;
}

export default class MyModel implements MyModel {
  constructor(
    private _id: string = "",
    private _name: string = ""
  ) {}
  
  get id(): string { return this._id; }
  set id(id: string) { this._id = id; }
  
  get name(): string { return this._name; }
  set name(name: string) { this._name = name; }
}
```

### Creating a Singleton
```typescript
export default class MySingleton {
  static instance: MySingleton = new MySingleton();
  
  private constructor() {
    // Initialize
  }
  
  // Methods...
}

// Usage:
const instance = MySingleton.instance;
```

### DOM Manipulation
```typescript
// Query with type assertion
const button = document.getElementById("myBtn") as HTMLButtonElement;

// Create element
const li = document.createElement("li") as HTMLLIElement;
li.className = "item";
li.textContent = "Text";

// Append
parentElement.append(li);
```

### Event Handlers
```typescript
// Form submission
form.addEventListener("submit", (e: SubmitEvent): void => {
  e.preventDefault();
  // Handle form
});

// Click handler
button.addEventListener("click", (): void => {
  // Handle click
});

// Change handler
checkbox.addEventListener("change", (): void => {
  // Handle change
});
```

### localStorage
```typescript
// Save
localStorage.setItem("key", JSON.stringify(data));

// Load
const stored: string | null = localStorage.getItem("key");
if (typeof stored === "string") {
  const data = JSON.parse(stored);
  // Use data
}

// Clear
localStorage.removeItem("key");
localStorage.clear();
```

---

## File Locations

### Source Code
```
todo-list-typescript-main/src/
├── main.ts              # Entry point
├── models/
│   ├── ListItem.ts      # Todo item model
│   └── FullList.ts      # List collection
├── templates/
│   └── ListTemplate.ts  # UI renderer
└── css/
    └── style.css        # Styles
```

### Documentation
```
docs/
├── PROJECT_STRUCTURE.md   # Repository layout
├── AGENT_TEMPLATES.md     # AI agents guide
├── CODE_UNDERSTANDING.md  # Analysis workflow
├── DEVELOPMENT.md         # Dev setup
├── TYPESCRIPT_PATTERNS.md # Code patterns
├── FAQ.md                 # Common questions
├── CHANGELOG.md           # Version history
└── QUICK_REFERENCE.md     # This file
```

### Configuration
```
todo-list-typescript-main/
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
└── index.html            # HTML template
```

### Analysis Results
```
.results/
├── 1-techstack.md
├── 2-file-categorization.json
├── 3-architectural-domains.json
├── 4-domains/
│   ├── accessibility.md
│   ├── application-initialization.md
│   ├── data-layer.md
│   ├── event-handling.md
│   ├── styling.md
│   ├── typescript-configuration.md
│   └── ui-rendering.md
└── 5-style-guides/
    ├── entry-point.md
    ├── models.md
    ├── styles.md
    └── templates.md
```

---

## Agent Templates

### Using an Agent
```
Load prompt-templates/[agent].md and [instruction]
```

### Available Agents

**Documenter** - Documentation
```
Use documenter template to create API docs for [component]
```

**Scaffolder** - New Features
```
Use scaffolder template to add [feature] following existing patterns
```

**Refactoring** - Code Quality
```
Use refactoring template to improve [file/component]
```

**Test Engineer** - Testing
```
Use test engineer template to add tests for [component]
```

**Code Supervisor** - Code Review
```
Use code supervisor template to review [changes]
```

---

## TypeScript Quick Ref

### Types
```typescript
// Primitives
const str: string = "text";
const num: number = 42;
const bool: boolean = true;

// Arrays
const arr: string[] = ["a", "b"];
const arr2: Array<number> = [1, 2];

// Objects
const obj: { name: string; age: number } = { name: "John", age: 30 };

// Functions
function add(a: number, b: number): number {
  return a + b;
}

// Arrow functions
const multiply = (a: number, b: number): number => a * b;
```

### Interfaces
```typescript
interface User {
  id: string;
  name: string;
  email?: string;  // Optional
}

class UserImpl implements User {
  constructor(
    public id: string,
    public name: string,
    public email?: string
  ) {}
}
```

### DOM Types
```typescript
HTMLElement           // Generic element
HTMLFormElement       // <form>
HTMLInputElement      // <input>
HTMLButtonElement     // <button>
HTMLDivElement        // <div>
HTMLUListElement      // <ul>
HTMLLIElement         // <li>
HTMLLabelElement      // <label>
```

---

## CSS Quick Ref

### BEM-like Naming
```css
/* Block */
.todoList { }

/* Element */
.todoList__item { }
.todoList__button { }

/* State/Modifier */
.todoList__item--completed { }
```

### Common Patterns
```css
/* Flexbox */
.container {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

/* Hover + Focus */
.button:hover,
.button:focus {
  color: limegreen;
}

/* Checked State */
input[type="checkbox"]:checked + label {
  text-decoration: line-through;
  color: #999;
}
```

---

## Troubleshooting

### Dev Server Won't Start
```bash
# Kill process on port
lsof -ti:5173 | xargs kill -9

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check types
npx tsc --noEmit

# Restart TS server (VSCode)
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Build Fails
```bash
# Clean and rebuild
rm -rf dist
npm run build
```

### Changes Not Showing
1. Hard refresh: `Ctrl + Shift + R`
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Restart dev server
4. Check console for errors

### localStorage Issues
```javascript
// In browser console:
localStorage.clear()           // Clear all
localStorage.removeItem('myList')  // Remove specific
```

---

## Common Tasks

### Add New Model
1. Create file in `src/models/`
2. Define interface
3. Implement class
4. Use singleton if needed
5. Add getters/setters
6. Implement save/load if needed

### Add New Feature
1. Review `.github/copilot-instructions.md`
2. Check relevant style guide in `.results/5-style-guides/`
3. Update model if needed
4. Update template if needed
5. Add event handlers in `main.ts`
6. Test in browser

### Update Styles
1. Edit `src/css/style.css`
2. Follow BEM-like naming
3. Test hover + focus together
4. Check mobile and desktop
5. Verify accessibility

### Debug Issue
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for failed requests
4. Check Application tab for localStorage
5. Use debugger or console.log
6. Review recent changes

---

## Keyboard Shortcuts

### VSCode
```
Cmd/Ctrl + P          # Quick open file
Cmd/Ctrl + Shift + P  # Command palette
Cmd/Ctrl + `          # Toggle terminal
Cmd/Ctrl + B          # Toggle sidebar
F12                   # Go to definition
Shift + F12           # Find references
```

### Browser DevTools
```
F12                   # Open/close DevTools
Cmd/Ctrl + Shift + C  # Inspect element
Cmd/Ctrl + Shift + J  # Console
Cmd/Ctrl + R          # Reload
Cmd/Ctrl + Shift + R  # Hard reload
```

---

## Resource Links

### Documentation
- [Main README](../README.md)
- [Development Guide](./DEVELOPMENT.md)
- [TypeScript Patterns](./TYPESCRIPT_PATTERNS.md)
- [FAQ](./FAQ.md)

### External
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## Cheat Sheet

### Project Layout
```
ai-multi-agents/
├── todo-list-typescript-main/  → Main app
├── prompt-templates/           → AI templates
├── understanding-code/         → Analysis workflow
├── .results/                   → Analysis outputs
├── docs/                       → Documentation
└── README.md                   → Start here
```

### Key Files
- **Entry:** `src/main.ts`
- **Models:** `src/models/*.ts`
- **Templates:** `src/templates/*.ts`
- **Styles:** `src/css/style.css`
- **Config:** `package.json`, `tsconfig.json`
- **Guide:** `.github/copilot-instructions.md`

### Key Patterns
- **Singleton:** `ClassName.instance`
- **Interface First:** Define before implement
- **Private Fields:** `_fieldName` with getters/setters
- **Auto-Save:** Call `save()` after mutations
- **Type Assert DOM:** `as HTMLElementType`
- **Clear-Render:** `clear()` then rebuild

---

**Pro Tip:** Bookmark this page for quick access to common patterns and commands!
