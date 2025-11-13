# Contributing to AI Multi-Agents

Thank you for your interest in contributing! This project welcomes contributions of all kinds: bug reports, documentation improvements, new features, code refactoring, and more.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Documentation Standards](#documentation-standards)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## Code of Conduct

This project follows a simple principle: **Be respectful and constructive.**

- Treat all contributors with respect
- Welcome newcomers
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

**Before submitting a bug report:**
1. Check [existing issues](https://github.com/TANERNHONG/ai-multi-agents/issues) - it may already be reported
2. Try the latest version - the bug may be fixed
3. Collect information about the bug

**When submitting a bug report, include:**
- Clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Environment details (OS, Node version, browser)
- Screenshots if applicable
- Error messages or console output

**Example:**
```markdown
**Title:** Dev server fails to start on Windows

**Steps to Reproduce:**
1. Clone repository
2. Run `npm install`
3. Run `npm run dev`

**Expected:** Server starts on port 5173
**Actual:** Error "EADDRINUSE: address already in use"

**Environment:**
- OS: Windows 11
- Node: v18.16.0
- npm: 9.5.1

**Error Output:**
```
[error message here]
```
```

### Suggesting Enhancements

**Before suggesting an enhancement:**
1. Check if it already exists
2. Verify it aligns with project goals
3. Consider if it fits the architecture

**When suggesting an enhancement, include:**
- Clear, descriptive title
- Detailed explanation of the feature
- Why it would be useful
- Possible implementation approach
- Examples or mockups if applicable

### Improving Documentation

Documentation improvements are always welcome!

**Types of documentation contributions:**
- Fixing typos and grammar
- Clarifying confusing sections
- Adding missing information
- Creating new guides or tutorials
- Improving code examples
- Adding diagrams or illustrations

**Documentation guidelines:**
- Use clear, simple language
- Include code examples
- Link to related documentation
- Follow existing structure
- Test code examples work

### Contributing Code

**Types of code contributions:**
- Bug fixes
- New features
- Performance improvements
- Code refactoring
- Test coverage improvements

See [Development Process](#development-process) below.

## Getting Started

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/ai-multi-agents.git
cd ai-multi-agents
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/TANERNHONG/ai-multi-agents.git
```

### 4. Create a Branch

```bash
git checkout -b feature/my-feature
# or
git checkout -b fix/bug-description
```

**Branch naming:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation only
- `refactor/` - Code refactoring
- `test/` - Test additions

### 5. Set Up Development Environment

```bash
cd todo-list-typescript-main
npm install
npm run dev
```

See [Development Guide](./docs/DEVELOPMENT.md) for details.

## Development Process

### 1. Make Your Changes

**For code changes:**
- Follow existing patterns (see [TypeScript Patterns](./docs/TYPESCRIPT_PATTERNS.md))
- Review [style guides](../.results/5-style-guides/)
- Check [Copilot instructions](../.github/copilot-instructions.md)
- Write clear, commented code
- Test your changes

**For documentation changes:**
- Follow existing structure
- Use clear language
- Include examples
- Test all links
- Verify formatting

### 2. Test Your Changes

**For code:**
```bash
# Type check
npx tsc --noEmit

# Build
npm run build

# Test in browser
npm run dev
# Then manually test functionality
```

**For documentation:**
- Read through your changes
- Check all links work
- Verify code examples
- Test markdown rendering

### 3. Commit Your Changes

Use clear, descriptive commit messages:

```bash
git add .
git commit -m "Add priority field to todo items"
```

**Commit message format:**
```
[Type]: Brief description (50 chars or less)

Longer explanation if needed. Wrap at 72 characters.
Explain the what and why, not the how.

- Bullet points are okay
- Use present tense ("Add feature" not "Added feature")
- Reference issues: "Fixes #123" or "Relates to #456"
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 4. Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main
```

Or merge if you prefer:
```bash
git merge upstream/main
```

### 5. Push to Your Fork

```bash
git push origin feature/my-feature
```

## Coding Standards

### TypeScript

**Follow project patterns:**
- Strict mode enabled - no `any` types
- Explicit return types on functions
- Type all parameters
- Use interfaces before implementation
- Private fields with underscore prefix
- Getters/setters for encapsulation

**Example:**
```typescript
export interface MyInterface {
  id: string;
  name: string;
}

export default class MyClass implements MyInterface {
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

See [TypeScript Patterns](./docs/TYPESCRIPT_PATTERNS.md) for details.

### CSS

**Follow BEM-like naming:**
```css
.blockName { }
.blockName__element { }
.blockName--modifier { }
```

**Other rules:**
- Mobile-first approach
- Use flexbox for layouts
- Style hover and focus together
- Use rem/em for spacing
- Maintain accessibility

See [Style Guide](../.results/5-style-guides/styles.md) for details.

### General

- **Consistency** - Match existing code style
- **Clarity** - Write clear, readable code
- **Simplicity** - Keep it simple
- **Comments** - Only when needed to explain why
- **No dead code** - Remove unused code
- **DRY principle** - Don't repeat yourself

## Documentation Standards

### Structure

- Use clear headings hierarchy
- Include table of contents for long docs
- Add code examples
- Link to related documentation
- Include "Last Updated" date

### Writing Style

- **Clear and concise** - Avoid jargon
- **Present tense** - "This function does X"
- **Active voice** - "Click the button" not "The button should be clicked"
- **Short paragraphs** - 3-4 sentences max
- **Lists** - Use for multiple items
- **Code blocks** - Use syntax highlighting

### Code Examples

```typescript
// ✅ Good - shows complete, working example
const input = document.getElementById("input") as HTMLInputElement;
const text = input.value.trim();
if (text) {
  processInput(text);
}

// ❌ Bad - incomplete or unclear
const x = document.getElementById("input");
process(x);
```

### Links

- Use relative paths: `[link](./file.md)`
- Verify links work
- Link to related docs
- Use descriptive link text

## Pull Request Process

### 1. Create Pull Request

On GitHub, create a PR from your branch to `main`.

### 2. Fill Out PR Template

**Include:**
- Clear description of changes
- Why the changes are needed
- Any breaking changes
- Testing performed
- Screenshots (if UI changes)
- Related issues

**Example PR description:**
```markdown
## Description
Adds priority field to todo items (high, medium, low).

## Motivation
Users requested ability to prioritize tasks.

## Changes
- Added `priority` field to `ListItem` interface
- Updated `FullList` to handle priority
- Added priority selector in UI
- Updated styles to show priority colors

## Testing
- [x] Tested adding items with priority
- [x] Tested localStorage persistence
- [x] Verified type checking passes
- [x] Tested in Chrome, Firefox, Safari

## Screenshots
[Include screenshots if applicable]

## Related Issues
Closes #123
```

### 3. Respond to Feedback

- Address review comments
- Make requested changes
- Push updates to your branch
- Be open to suggestions

### 4. Merge

Once approved:
- Maintainer will merge your PR
- Your changes will be in the next release
- You'll be credited as a contributor!

## Style Guide Checklist

Before submitting, verify:

**Code:**
- [ ] Follows existing patterns
- [ ] TypeScript strict mode passes
- [ ] No console.log (unless intentional)
- [ ] Code is commented where needed
- [ ] Tested manually

**Documentation:**
- [ ] Clear and concise
- [ ] Examples included
- [ ] Links verified
- [ ] Markdown renders correctly
- [ ] No typos

**Git:**
- [ ] Clear commit messages
- [ ] Branch up to date with main
- [ ] No merge conflicts
- [ ] Commits are logical

## Using AI Agents

This project encourages using AI agents for contributions!

**Available agents:**
- [Documenter](./prompt-templates/documenter.md) - For documentation
- [Scaffolder](./prompt-templates/scaffolder.md) - For new features
- [Refactoring](./prompt-templates/refactoring.md) - For improvements
- [Test Engineer](./prompt-templates/testengineer.md) - For tests
- [Code Supervisor](./prompt-templates/codesupervisor.md) - For review

See [Agent Templates Guide](./docs/AGENT_TEMPLATES.md) for usage.

## Community

### Getting Help

- **Questions?** Open a [discussion](https://github.com/TANERNHONG/ai-multi-agents/discussions)
- **Issues?** Check [FAQ](./docs/FAQ.md) first
- **Stuck?** Ask in your PR or issue

### Recognition

Contributors are recognized in:
- Commit history
- Pull request acknowledgments
- Release notes
- Contributors list (if added)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Questions?

If you have questions about contributing:
1. Check this guide
2. Review [documentation](./docs/)
3. Check [FAQ](./docs/FAQ.md)
4. Ask in an issue or discussion

---

Thank you for contributing! Every contribution, no matter how small, makes this project better. 🎉

**Happy contributing!** 🚀
