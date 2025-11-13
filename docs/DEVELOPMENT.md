# Development Guide

This guide covers setting up the development environment, running the application, and contributing to the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Building and Testing](#building-and-testing)
- [Project Scripts](#project-scripts)
- [Development Tools](#development-tools)
- [Code Style](#code-style)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Node.js** version 16.x or higher
- **npm** version 7.x or higher (comes with Node.js)
- **Git** for version control

### Verify Installation

```bash
node --version   # Should be v16.0.0 or higher
npm --version    # Should be v7.0.0 or higher
git --version    # Any recent version
```

### Optional Tools

- **Visual Studio Code** - Recommended editor with TypeScript support
- **GitHub Copilot** - AI assistant (works with instructions in this repo)
- **Chrome/Firefox DevTools** - For debugging

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/TANERNHONG/ai-multi-agents.git
cd ai-multi-agents
```

### 2. Navigate to Application Directory

```bash
cd todo-list-typescript-main
```

### 3. Install Dependencies

```bash
npm install
```

This installs:
- **TypeScript** (v5.0.2+) - Type checking and compilation
- **Vite** (v4.4.5) - Build tool and dev server

**Note:** This project has **zero runtime dependencies**. Only build tools are installed.

### 4. Verify Installation

```bash
npm run dev
```

The application should start at `http://localhost:5173/`

Press `Ctrl+C` to stop the server.

## Development Workflow

### Starting Development Server

```bash
cd todo-list-typescript-main
npm run dev
```

**What this does:**
- Starts Vite development server
- Watches for file changes
- Hot-reloads on save
- Provides error messages in browser
- Serves at `http://localhost:5173/`

### Making Changes

**1. Edit source files:**
- `src/main.ts` - Entry point and event handlers
- `src/models/*.ts` - Data models
- `src/templates/*.ts` - UI rendering
- `src/css/style.css` - Styles
- `index.html` - HTML structure

**2. Save the file**
- Browser automatically reloads
- Check console for errors
- Test your changes

**3. Verify in browser:**
- Open DevTools (F12)
- Check Console for errors
- Test functionality
- Verify visual changes

### TypeScript Development

**Type checking happens automatically:**
- Vite uses `tsc` in the background
- Errors show in terminal and browser
- Hover in VSCode for type info

**Check types manually:**
```bash
npx tsc --noEmit
```

### Hot Module Replacement (HMR)

Vite provides fast HMR:
- **CSS changes** - Instant update without reload
- **TypeScript changes** - Fast recompile and reload
- **HTML changes** - Full page reload

**No HMR for:**
- Changes to `package.json`
- Changes to `tsconfig.json`
- Changes to `vite.config.js` (if added)

→ Restart dev server after config changes

## Building and Testing

### Development Build

```bash
npm run dev
```

**Features:**
- Source maps for debugging
- Fast rebuilds
- Detailed error messages
- Not optimized (larger files)

### Production Build

```bash
npm run build
```

**What happens:**
1. TypeScript compiles to JavaScript
2. Vite bundles all files
3. Output goes to `dist/`
4. Files are minified
5. Source maps generated (optional)

**Output structure:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other-assets]
└── vite.svg
```

### Preview Production Build

```bash
npm run preview
```

**Serves the built application:**
- Uses files from `dist/`
- Runs on different port (usually 4173)
- Tests production bundle
- Verifies build output

### Manual Testing

**Test checklist:**

1. **Add Task**
   - Enter text in input
   - Press Enter or click button
   - Task appears in list
   
2. **Complete Task**
   - Click checkbox
   - Task gets line-through and gray text
   - Status persists on reload
   
3. **Delete Task**
   - Click X button
   - Task removed from list
   - Change persists on reload
   
4. **Clear All**
   - Click "Clear" button
   - All tasks removed
   - localStorage cleared
   
5. **Persistence**
   - Add several tasks
   - Reload page
   - Tasks still present
   
6. **Empty Input**
   - Try submitting empty input
   - Nothing should happen
   
7. **Keyboard Navigation**
   - Tab through elements
   - Focus visible
   - Enter works where expected

### Browser Testing

**Recommended browsers:**
- Chrome/Edge (Chromium)
- Firefox
- Safari (if available)

**Open DevTools:**
- **Console** - Check for errors
- **Network** - Verify resources load
- **Application** - Inspect localStorage
- **Elements** - Inspect DOM structure

## Project Scripts

Located in `todo-list-typescript-main/package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### Script Details

**`npm run dev`**
- Starts development server
- Enables HMR
- Use for development

**`npm run build`**
- Type checks with `tsc`
- Builds with Vite
- Outputs to `dist/`
- Use before deploying

**`npm run preview`**
- Serves built files
- Tests production build
- Use to verify build

### Custom Scripts (if needed)

**Add to package.json:**

```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist",
    "lint": "eslint src --ext .ts"
  }
}
```

## Development Tools

### Visual Studio Code

**Recommended extensions:**
- **TypeScript and JavaScript Language Features** (built-in)
- **GitHub Copilot** (optional, uses repo instructions)
- **ESLint** (if you add ESLint)
- **Prettier** (if you add Prettier)

**VSCode settings for this project:**

Create `.vscode/settings.json`:
```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

### Browser DevTools

**Chrome DevTools tips:**

**Console:**
- `localStorage` - Check stored data
- `localStorage.clear()` - Clear storage
- `localStorage.getItem('myList')` - View list data

**Application Tab:**
- View localStorage keys/values
- Clear storage
- Inspect cookies (if any)

**Elements Tab:**
- Inspect DOM structure
- Check computed styles
- Test CSS changes

### Git Workflow

**Create feature branch:**
```bash
git checkout -b feature/my-feature
```

**Make changes and commit:**
```bash
git add .
git commit -m "Add my feature"
```

**Push to remote:**
```bash
git push origin feature/my-feature
```

**Create pull request:**
- Use GitHub UI
- Request review
- Address feedback

## Code Style

### TypeScript

**Conventions:**
- Strict mode enabled
- Explicit return types
- No `any` types
- Type all parameters

**Example:**
```typescript
// ✅ Good
function addItem(item: string): void {
  // ...
}

// ❌ Bad
function addItem(item) {
  // ...
}
```

### Naming

**Classes:** PascalCase
```typescript
class ListItem { }
class FullList { }
```

**Variables/Functions:** camelCase
```typescript
const itemId = 1;
function renderList() { }
```

**Private fields:** Underscore prefix
```typescript
private _id: string;
private _list: Item[];
```

**Constants:** UPPER_SNAKE_CASE (if true constants)
```typescript
const MAX_ITEMS = 100;
```

### CSS

**Conventions:**
- BEM-like naming
- Single global stylesheet
- Mobile-first approach

**Example:**
```css
/* Block */
.newItemEntry { }

/* Element */
.newItemEntry__form { }
.newItemEntry__button { }

/* State */
.item>input[type="checkbox"]:checked+label { }
```

### File Organization

**New files should go in appropriate directories:**

- Models → `src/models/`
- Templates → `src/templates/`
- Utilities → `src/utils/` (create if needed)
- Styles → `src/css/`
- Types → `src/types/` (create if needed)

## Troubleshooting

### Development Server Issues

**Port already in use:**
```bash
# Find and kill process on port 5173
# Linux/Mac:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Module not found:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Type errors:**
```bash
# Check TypeScript directly
npx tsc --noEmit

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Build Issues

**Build fails:**
```bash
# Clean and rebuild
rm -rf dist
npm run build
```

**TypeScript errors:**
- Check `tsconfig.json` settings
- Verify all types are defined
- Check for `any` types
- Review error messages carefully

**Missing files in build:**
- Check file paths
- Verify imports
- Check `tsconfig.json` includes/excludes

### Runtime Issues

**localStorage not working:**
- Check browser privacy settings
- Try incognito mode
- Check console for errors
- Verify key name: `'myList'`

**Styles not applied:**
- Check CSS import in `main.ts`
- Verify class names match
- Check browser DevTools
- Clear browser cache

**Events not firing:**
- Check event listener setup
- Verify element IDs match
- Check DOM is loaded first
- Review console for errors

### Common Mistakes

**❌ Forgetting to call save():**
```typescript
// Bad - changes not persisted
this._list.push(item);

// Good - changes saved
this._list.push(item);
this.save();
```

**❌ Not waiting for DOM:**
```typescript
// Bad - DOM not ready
const form = document.getElementById('form');

// Good - wait for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
});
```

**❌ Using multiple instances:**
```typescript
// Bad - creates new instance
const list = new FullList();

// Good - use singleton
const list = FullList.instance;
```

## Getting Help

### Resources

- **TypeScript Docs:** https://www.typescriptlang.org/docs/
- **Vite Docs:** https://vitejs.dev/guide/
- **MDN Web Docs:** https://developer.mozilla.org/

### Repository Documentation

- [README.md](../README.md) - Repository overview
- [Project Structure](./PROJECT_STRUCTURE.md) - Directory layout
- [Code Understanding](./CODE_UNDERSTANDING.md) - Analysis workflow
- [TypeScript Patterns](./TYPESCRIPT_PATTERNS.md) - Code patterns

### GitHub Issues

Found a bug? Have a question?
- Check existing issues first
- Create new issue with details
- Include error messages
- Provide reproduction steps

---

## Next Steps

**Now that you're set up:**

1. **Explore the code** - Start with `src/main.ts`
2. **Make small changes** - Try modifying styles
3. **Follow patterns** - Review `.github/copilot-instructions.md`
4. **Use AI agents** - Try agent templates in `prompt-templates/`
5. **Read documentation** - Check `docs/` directory

Happy coding! 🚀
