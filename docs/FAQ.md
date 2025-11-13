# Frequently Asked Questions (FAQ)

Common questions about the ai-multi-agents repository and the todo list application.

## General Questions

### What is this repository?

This repository demonstrates AI-assisted development using multiple specialized agents. It contains:
- A TypeScript todo list application
- AI agent templates for different development tasks
- A systematic code understanding workflow
- Comprehensive documentation and analysis results

### Who is this for?

- **Developers** learning AI-assisted development patterns
- **Teams** wanting to use AI agents in their workflow
- **Students** studying TypeScript and clean architecture
- **Anyone** interested in systematic code documentation

### Can I use this for my own project?

Absolutely! The templates, workflows, and patterns are designed to be reusable:
- Copy agent templates from `prompt-templates/`
- Adapt the code understanding workflow
- Use the documentation structure as a template
- Follow the architectural patterns shown

---

## Todo Application Questions

### What technologies does the app use?

**Core:**
- TypeScript 5.0.2+ (strict mode)
- Vite 4.4.5 (build tool)
- Vanilla JavaScript (no frameworks)

**Storage:**
- localStorage (browser-based)

**Styling:**
- Plain CSS (no preprocessors)

### Why no UI framework?

This is intentional to demonstrate:
- Clean TypeScript without framework complexity
- Direct DOM manipulation patterns
- Singleton pattern for state management
- Educational simplicity

### Is this production-ready?

The todo app is a **demonstration project** that shows:
- ✅ Clean architecture patterns
- ✅ TypeScript best practices
- ✅ Proper separation of concerns

For production, you might want to add:
- Unit tests
- E2E tests
- Error handling
- Analytics
- Backend integration
- User authentication

### Can I deploy this?

Yes! Build and deploy:
```bash
cd todo-list-typescript-main
npm run build
# Deploy the 'dist/' folder to any static host
```

**Deployment options:**
- GitHub Pages
- Netlify
- Vercel
- Any static file host

---

## AI Agent Questions

### What are AI agent templates?

Templates in `prompt-templates/` define specialized roles for AI assistants:
- **Documenter** - Creates documentation
- **Scaffolder** - Generates new features
- **Refactoring** - Improves code quality
- **Test Engineer** - Writes tests
- **Code Supervisor** - Reviews code

Each template includes instructions, responsibilities, and guidelines.

### How do I use an agent template?

**Method 1: Reference in prompt**
```
Use the documenter agent template to create API documentation.
```

**Method 2: Load template**
```
Load prompt-templates/documenter.md, then document the new feature.
```

**Method 3: Copy and customize**
1. Copy template to your project
2. Add project-specific rules
3. Reference in your workflow

### Do I need GitHub Copilot?

No, the templates work with any AI assistant:
- GitHub Copilot
- ChatGPT
- Claude
- Other coding assistants

The `.github/copilot-instructions.md` file is specifically for GitHub Copilot but the patterns apply generally.

### Can I create my own agents?

Yes! Follow the template structure:
```markdown
---
name: [agent-name]
description: [brief description]
---

[Role definition]

Focus on the following instructions:
- [Responsibility 1]
- [Responsibility 2]
```

See [Agent Templates Guide](./AGENT_TEMPLATES.md) for details.

---

## Code Understanding Workflow Questions

### What is the code understanding workflow?

A 6-step process for analyzing codebases:
1. Determine tech stack
2. Categorize files
3. Identify architecture
4. Domain deep dive
5. Generate style guides
6. Build instructions

Located in `understanding-code/instruction-generation/`.

### Why use this workflow?

**Benefits:**
- Systematic and thorough
- Produces reusable documentation
- Perfect for AI assistant context
- Great for onboarding
- Creates living documentation

### How long does it take?

Depends on project size:
- **Small project** (like this): 1-2 hours
- **Medium project**: Half day
- **Large project**: 1-2 days

Can be done incrementally - one step at a time.

### Do I need to do all steps?

For best results, yes. Each step builds on previous ones:
- Step 1 → Identifies foundation
- Step 2 → Categorizes based on foundation
- Step 3 → Documents patterns from categories
- Step 4 → Deep dives into patterns
- Step 5 → Creates guides from patterns
- Step 6 → Combines everything

But you can adapt and skip steps if needed.

### Can I automate this?

Partially. The workflow is designed for AI assistants:
- Feed prompts to AI one by one
- Review and save outputs
- AI generates comprehensive docs

Not fully automatic - human review is important.

---

## Development Questions

### How do I get started?

**Quick start:**
```bash
git clone https://github.com/TANERNHONG/ai-multi-agents.git
cd ai-multi-agents/todo-list-typescript-main
npm install
npm run dev
```

See [Development Guide](./DEVELOPMENT.md) for details.

### What if `npm install` fails?

**Try:**
```bash
# Use a different registry
npm install --registry=https://registry.npmjs.org/

# Clear cache
npm cache clean --force
npm install

# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Why are there no tests?

This is a demonstration project focused on:
- Architecture patterns
- TypeScript conventions
- AI-assisted documentation

Tests were intentionally omitted to keep it simple. For production, add:
- Unit tests (Jest, Vitest)
- E2E tests (Playwright, Cypress)
- Integration tests

### Can I add a backend?

Yes! The architecture supports it:
1. Replace localStorage with API calls
2. Update `save()` and `load()` methods in `FullList`
3. Add error handling
4. Handle async operations

Example:
```typescript
async save(): Promise<void> {
  await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(this._list)
  });
}
```

### How do I add new features?

**Follow the workflow:**
1. Review [GitHub Copilot instructions](../.github/copilot-instructions.md)
2. Check [style guides](../.results/5-style-guides/)
3. Use relevant patterns from [TypeScript Patterns](./TYPESCRIPT_PATTERNS.md)
4. Consider using [scaffolder agent](../prompt-templates/scaffolder.md)
5. Test your changes
6. Update documentation

---

## Pattern Questions

### Why use the Singleton pattern?

**Reasons:**
- Single source of truth for data
- Simple state management
- No prop drilling
- Consistent access pattern

**When to use:**
- Global application state
- Single renderer instances
- Resource managers
- Configuration

**When NOT to use:**
- Need multiple instances
- Complex state management
- Multi-user scenarios

### Why private fields with getters/setters?

**Benefits:**
- Encapsulation
- Future flexibility
- Can add validation later
- Clear public API

**Alternatives:**
- Public fields (simpler but less flexible)
- Proxy objects (more complex)
- Immutable objects (different paradigm)

### Why localStorage instead of a database?

**For this demo:**
- No backend needed
- Works offline
- Simple to understand
- Fast development

**For production:**
- Consider adding backend
- Use proper database
- Handle multiple users
- Add synchronization

---

## Architecture Questions

### Can I use React/Vue/Angular?

You can, but it defeats the purpose:
- This demonstrates vanilla TypeScript
- Shows DOM manipulation patterns
- Teaches fundamental concepts

For a framework version:
- Create separate branch
- Port the patterns
- Keep the architecture concepts

### Why no TypeScript strict null checks?

They **are** enabled! Check `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true
  }
}
```

All nullable types are properly handled.

### How does data flow work?

**Unidirectional flow:**
```
User Input → Event Handler → Model Update → Save → Template Render → DOM Update
```

**Example:**
1. User adds todo
2. Event handler validates input
3. Creates new ListItem
4. Adds to FullList
5. FullList saves to localStorage
6. Template re-renders DOM
7. User sees new todo

---

## Documentation Questions

### How is documentation organized?

**Root level:**
- `README.md` - Main overview

**docs/ directory:**
- `PROJECT_STRUCTURE.md` - Repository layout
- `AGENT_TEMPLATES.md` - AI agent usage
- `CODE_UNDERSTANDING.md` - Analysis workflow
- `DEVELOPMENT.md` - Setup and dev guide
- `TYPESCRIPT_PATTERNS.md` - Code patterns
- `FAQ.md` - This file

**Application specific:**
- `todo-list-typescript-main/README.md`

**Analysis results:**
- `.results/` - Generated documentation

### How do I update documentation?

**For code changes:**
1. Update relevant docs in `docs/`
2. Update style guides if patterns change
3. Update examples in copilot-instructions.md

**For new features:**
1. Document in appropriate guide
2. Add examples
3. Update README if significant

**For workflow changes:**
1. Update CODE_UNDERSTANDING.md
2. Update prompt files if needed
3. Re-run workflow to update results

### Can I generate documentation automatically?

Partially:
- Use code understanding workflow
- Feed prompts to AI assistant
- Review and edit outputs
- Commit to repository

Not fully automatic - human review essential.

---

## Troubleshooting Questions

### Port 5173 is already in use

**Solution:**
```bash
# Find and kill process
lsof -ti:5173 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5173   # Windows - then taskkill

# Or use different port
npm run dev -- --port 3000
```

### Changes not reflected in browser

**Try:**
1. Hard refresh (Ctrl+Shift+R)
2. Clear browser cache
3. Check console for errors
4. Restart dev server
5. Clear Vite cache: `rm -rf node_modules/.vite`

### localStorage not working

**Possible causes:**
- Private browsing mode
- Browser privacy settings
- Incognito mode
- Storage quota exceeded

**Solutions:**
- Use regular browsing mode
- Check browser settings
- Clear localStorage
- Try different browser

### TypeScript errors in editor

**Solutions:**
```bash
# Restart TypeScript server (VSCode)
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# Check TypeScript version
npx tsc --version

# Reinstall
rm -rf node_modules
npm install
```

---

## Contributing Questions

### How can I contribute?

**Ways to contribute:**
- Report bugs
- Suggest improvements
- Add examples
- Improve documentation
- Create new agent templates
- Share your workflows

### Can I use this in my course/workshop?

Yes! This is an educational resource. Please:
- Give attribution
- Link back to original repo
- Share improvements back
- Follow any license terms

### Can I create a fork?

Absolutely! Fork and:
- Adapt to your needs
- Add features
- Experiment with patterns
- Share back if useful

---

## Still Have Questions?

**Check these resources:**
- [Development Guide](./DEVELOPMENT.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [TypeScript Patterns](./TYPESCRIPT_PATTERNS.md)
- [GitHub Issues](https://github.com/TANERNHONG/ai-multi-agents/issues)

**Create an issue if:**
- Question not answered here
- Found a bug
- Have a suggestion
- Need clarification

---

**Last Updated:** 2025-11-13  
**Help us improve:** Found an error or have a question? [Open an issue](https://github.com/TANERNHONG/ai-multi-agents/issues)!
