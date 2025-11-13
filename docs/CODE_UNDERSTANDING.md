# Code Understanding Workflow

This guide explains the systematic workflow for analyzing and documenting codebases using AI assistants. The workflow is defined in `understanding-code/instruction-generation/` and demonstrated in this repository.

## Overview

The code understanding workflow is a multi-step process that helps AI assistants comprehensively analyze a codebase and generate useful documentation. Each step builds on the previous one, creating a complete picture of the project's architecture, patterns, and conventions.

**Workflow Location:** [understanding-code/instruction-generation/](../understanding-code/instruction-generation/)

**Results Location:** [.results/](../.results/)

**Final Output:** [.github/copilot-instructions.md](../.github/copilot-instructions.md)

## Workflow Steps

### Step 1: Determine Tech Stack
**File:** [1-determine-techstack.md](../understanding-code/instruction-generation/1-determine-techstack.md)  
**Output:** [.results/1-techstack.md](../.results/1-techstack.md)

**Purpose:** Identify the project's technology foundation and domain.

**Analysis Areas:**

**Core Technology:**
- Programming languages used
- Primary framework or library
- Secondary frameworks
- State management approach
- Build tools and tooling

**Domain Specificity:**
- Problem domain (e.g., todo app, e-commerce, data visualization)
- Core domain concepts
- User interaction types
- Primary data structures

**Application Boundaries:**
- Features in scope
- Architecturally inconsistent features
- Specialized libraries or constraints

**Output Example:**
```markdown
# Tech Stack Analysis

## Core Technology Analysis
- TypeScript (v5.0.2+) - Strict mode
- Vite (v4.4.5) - Build tool
- No UI framework (vanilla TypeScript)

## Domain Specificity Analysis
- Todo List / Task Management Application
- CRUD operations on tasks
- Local persistence with localStorage

## Application Boundaries
✅ Supported: Single-user, local storage, CRUD
❌ Out of Scope: Multi-user, backend API, real-time sync
```

---

### Step 2: Categorize Files
**File:** [2-categorize-files.md](../understanding-code/instruction-generation/2-categorize-files.md)  
**Output:** [.results/2-file-categorization.json](../.results/2-file-categorization.json)

**Purpose:** Group files by their architectural role and function.

**Categories:**
- **entry-point** - Application initialization
- **models** - Data structures and business logic
- **templates** - UI rendering components
- **event-handlers** - User interaction handling
- **styles** - CSS stylesheets
- **html-templates** - HTML structure
- **build-configuration** - Build and TypeScript configs
- **documentation** - README and docs
- **assets** - Images, icons, etc.

**Output Example:**
```json
{
  "models": [
    "./src/models/ListItem.ts",
    "./src/models/FullList.ts"
  ],
  "templates": [
    "./src/templates/ListTemplate.ts"
  ],
  "entry-point": [
    "./src/main.ts"
  ],
  "styles": [
    "./src/css/style.css"
  ]
}
```

**Why This Matters:**
- Understand file organization
- Identify architectural layers
- Find related files quickly
- Guide new file placement

---

### Step 3: Identify Architecture
**File:** [3-identify-architecture.md](../understanding-code/instruction-generation/3-identify-architecture.md)  
**Output:** [.results/3-architectural-domains.json](../.results/3-architectural-domains.json)

**Purpose:** Document key architectural patterns and design decisions.

**Identified Patterns:**
- Design patterns (Singleton, Factory, Observer, etc.)
- Code organization principles
- Separation of concerns
- Data flow patterns
- Naming conventions

**Analysis Focus:**
- How components interact
- State management approach
- Event handling patterns
- Persistence strategy
- Type system usage

**Output Example:**
```json
{
  "patterns": {
    "singleton": ["FullList", "ListTemplate"],
    "mvc-like": "Separation of models, templates, and controllers"
  },
  "data-flow": "Unidirectional: Model → Template → DOM",
  "persistence": "localStorage with automatic save",
  "conventions": {
    "classes": "PascalCase",
    "fields": "Private with underscore prefix",
    "methods": "Public getters/setters"
  }
}
```

---

### Step 4: Domain Deep Dive
**File:** [4-domain-deep-dive.md](../understanding-code/instruction-generation/4-domain-deep-dive.md)  
**Output:** [.results/4-domains/](../.results/4-domains/)

**Purpose:** Analyze each architectural domain in depth.

**Created Documents:**
- [accessibility.md](../.results/4-domains/accessibility.md) - Accessibility features
- [application-initialization.md](../.results/4-domains/application-initialization.md) - Startup process
- [data-layer.md](../.results/4-domains/data-layer.md) - Data models and persistence
- [event-handling.md](../.results/4-domains/event-handling.md) - User interactions
- [styling.md](../.results/4-domains/styling.md) - CSS architecture
- [typescript-configuration.md](../.results/4-domains/typescript-configuration.md) - TypeScript setup
- [ui-rendering.md](../.results/4-domains/ui-rendering.md) - DOM manipulation

**Each Domain Document Covers:**
- **Purpose** - What this domain handles
- **Key Files** - Related source files
- **Patterns** - How it's implemented
- **Conventions** - Coding standards
- **Examples** - Code samples
- **Integration** - How it connects to other domains

**Example: Data Layer Documentation**
```markdown
# Data Layer

## Purpose
Manages todo item data and persistence.

## Key Patterns
- Singleton pattern for global instance
- Interface-first design
- Private fields with getters/setters
- Automatic localStorage persistence

## Files
- src/models/ListItem.ts - Individual item
- src/models/FullList.ts - Collection

## Conventions
- Call save() after every mutation
- Use private constructor
- Implement interface
```

---

### Step 5: Generate Style Guides
**File:** [5-styleguide-generation.md](../understanding-code/instruction-generation/5-styleguide-generation.md)  
**Output:** [.results/5-style-guides/](../.results/5-style-guides/)

**Purpose:** Create category-specific coding guidelines.

**Created Style Guides:**
- [models.md](../.results/5-style-guides/models.md) - Model class conventions
- [templates.md](../.results/5-style-guides/templates.md) - Template patterns
- [entry-point.md](../.results/5-style-guides/entry-point.md) - Entry point structure
- [styles.md](../.results/5-style-guides/styles.md) - CSS conventions

**Each Style Guide Includes:**
- File structure template
- Naming conventions
- Required patterns
- Code examples
- Do's and don'ts

**Example: Model Style Guide**
```markdown
# Models Style Guide

## Structure
1. Define interface first
2. Create class implementing interface
3. Add static instance (singleton)
4. Private constructor with parameters
5. Private fields with underscore prefix
6. Public getters/setters
7. Persistence methods (save/load)

## Conventions
✅ DO: Use private fields with getters/setters
✅ DO: Call save() after mutations
✅ DO: Use singleton pattern
❌ DON'T: Create multiple instances
❌ DON'T: Skip interface definition
```

---

### Step 6: Build Instructions
**File:** [6-build-instructions.md](../understanding-code/instruction-generation/6-build-instructions.md)  
**Output:** [.github/copilot-instructions.md](../.github/copilot-instructions.md)

**Purpose:** Combine all analysis into comprehensive project instructions.

**Final Document Includes:**
- Overview of architecture
- File category reference with examples
- Feature scaffold guide
- Integration rules (must-follow patterns)
- Domain-specific notes
- Summary checklist

**This becomes the definitive guide for:**
- GitHub Copilot
- AI assistants
- New developers
- Code reviewers

---

## Using the Workflow

### For a New Project

**1. Navigate to workflow directory:**
```bash
cd understanding-code/instruction-generation/
```

**2. Execute each prompt in order:**
- Read prompt file
- Provide it to your AI assistant with project path
- Review and save output to `.results/`
- Continue to next step

**3. Generate final instructions:**
- Combine all outputs
- Create comprehensive guide
- Save as `.github/copilot-instructions.md`

### For This Repository

The workflow has already been executed:

**View the results:**
- Tech stack: [.results/1-techstack.md](../.results/1-techstack.md)
- File categories: [.results/2-file-categorization.json](../.results/2-file-categorization.json)
- Domains: [.results/4-domains/](../.results/4-domains/)
- Style guides: [.results/5-style-guides/](../.results/5-style-guides/)
- Final guide: [.github/copilot-instructions.md](../.github/copilot-instructions.md)

### Adapting the Workflow

**For different project types:**

1. **Library/Package:**
   - Add API documentation step
   - Focus on public interface
   - Document export patterns

2. **Backend API:**
   - Add endpoint documentation
   - Document middleware patterns
   - Cover authentication/authorization

3. **Frontend Framework App:**
   - Add component documentation
   - Document routing patterns
   - Cover state management

4. **Full-Stack Application:**
   - Document both frontend and backend
   - Cover API contracts
   - Document deployment

**Customize prompts:**
- Modify questions in each step
- Add project-specific categories
- Include domain-specific patterns
- Extend analysis depth

---

## Benefits of This Workflow

### 1. Comprehensive Understanding

By following all steps, you get:
- Complete technology inventory
- Clear architectural picture
- Documented patterns and conventions
- Reusable style guides

### 2. Consistent Documentation

Systematic approach ensures:
- No missed areas
- Uniform structure
- Connected information
- Easy to maintain

### 3. AI-Friendly Output

Generated documentation is perfect for:
- GitHub Copilot context
- AI assistant prompts
- Automated code generation
- Pattern recognition

### 4. Onboarding Aid

New team members can:
- Quickly understand architecture
- Follow established patterns
- Find relevant examples
- Avoid common mistakes

### 5. Living Documentation

Easy to update as project evolves:
- Re-run specific steps
- Update changed sections
- Add new patterns
- Refine conventions

---

## Workflow Tips

### Best Practices

**1. Be Thorough**
- Don't skip steps
- Review outputs carefully
- Provide examples in prompts
- Include edge cases

**2. Keep Outputs Organized**
- Use consistent naming
- Store in `.results/`
- Link related documents
- Version control everything

**3. Iterate When Needed**
- Re-run steps if project changes significantly
- Update specific sections as needed
- Refine prompts based on results

**4. Make It Actionable**
- Include code examples
- Provide clear do's and don'ts
- Show integration patterns
- Link to actual files

### Common Pitfalls

❌ **Skipping early steps**
- Each step builds on previous ones
- Missing foundation causes confusion

❌ **Generic descriptions**
- Be specific to your project
- Include actual examples from code

❌ **Outdated documentation**
- Update when architecture changes
- Regular review and refresh

❌ **Overly complex categories**
- Keep categories simple and clear
- Use terms that make sense for your project

---

## Example: Complete Workflow Execution

### Starting Point
```
my-project/
├── src/
│   ├── components/
│   ├── services/
│   └── utils/
└── package.json
```

### Step-by-Step

**1. Determine Tech Stack**
```
Prompt: Analyze my-project/ and identify:
- Languages and frameworks
- Domain and purpose  
- Application boundaries

Output to: .results/1-techstack.md
```

**2. Categorize Files**
```
Prompt: Using the tech stack analysis, categorize all files in src/.

Output to: .results/2-file-categorization.json
```

**3. Identify Architecture**
```
Prompt: Based on file categories, document architectural patterns.

Output to: .results/3-architectural-domains.json
```

**4. Domain Deep Dive**
```
Prompt: For each domain, create detailed documentation.

Output to: .results/4-domains/*.md
```

**5. Generate Style Guides**
```
Prompt: For each file category, create a style guide.

Output to: .results/5-style-guides/*.md
```

**6. Build Instructions**
```
Prompt: Combine all outputs into comprehensive project guide.

Output to: .github/copilot-instructions.md
```

### End Result

Complete documentation ready for AI assistants and developers:
- Clear architecture overview
- Documented patterns
- Style guides per category
- Integration rules
- Feature scaffolding guides

---

## Maintaining the Documentation

### When to Update

**Trigger updates when:**
- Adding new major features
- Changing architecture patterns
- Introducing new technologies
- Refactoring significant portions
- Onboarding raises questions

**Partial updates:**
- Re-run specific steps only
- Update affected domains
- Refresh relevant style guides

**Full refresh:**
- Major version changes
- Architectural overhauls
- Complete rewrites

### Update Process

1. **Identify changed areas**
2. **Re-run relevant workflow steps**
3. **Update affected documents**
4. **Review for consistency**
5. **Test with AI assistant**
6. **Commit updates**

---

## Related Documentation

- [Project Structure](./PROJECT_STRUCTURE.md) - Repository organization
- [Agent Templates](./AGENT_TEMPLATES.md) - Using AI agents
- [Development Guide](./DEVELOPMENT.md) - Setup and workflows

## Questions?

If the workflow doesn't fit your project:
1. Identify what's different
2. Customize relevant prompts
3. Add project-specific steps
4. Share improvements!

---

**Remember:** This workflow is a framework, not a script. Adapt it to your project's needs while keeping the systematic approach.
