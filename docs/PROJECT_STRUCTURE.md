# Project Structure Guide

This document provides a comprehensive overview of the repository structure and the purpose of each directory and file.

## Directory Tree

```
ai-multi-agents/
├── .github/
│   ├── agents/                      # Agent-specific instructions
│   │   ├── code-supervisor.md       # Code review agent instructions
│   │   ├── documenter.md            # Documentation agent instructions
│   │   ├── refactoring.md           # Refactoring agent instructions
│   │   ├── scaffolder.md            # Scaffolding agent instructions
│   │   └── testengineer.md          # Test engineer agent instructions
│   └── copilot-instructions.md      # Comprehensive project guide for GitHub Copilot
│
├── .results/                        # Generated analysis outputs
│   ├── 1-techstack.md               # Tech stack analysis results
│   ├── 2-file-categorization.json   # File categories mapping
│   ├── 3-architectural-domains.json # Architecture patterns identified
│   ├── 4-domains/                   # Domain-specific deep dives
│   │   ├── accessibility.md
│   │   ├── application-initialization.md
│   │   ├── data-layer.md
│   │   ├── event-handling.md
│   │   ├── styling.md
│   │   ├── typescript-configuration.md
│   │   └── ui-rendering.md
│   └── 5-style-guides/              # Code style guides by category
│       ├── entry-point.md
│       ├── models.md
│       ├── styles.md
│       └── templates.md
│
├── docs/                            # Repository documentation
│   ├── PROJECT_STRUCTURE.md         # This file
│   ├── AGENT_TEMPLATES.md           # Agent templates guide
│   ├── CODE_UNDERSTANDING.md        # Code analysis workflow
│   ├── DEVELOPMENT.md               # Development setup guide
│   └── TYPESCRIPT_PATTERNS.md       # TypeScript patterns reference
│
├── prompt-templates/                # Reusable AI agent templates
│   ├── codesupervisor.md            # Code supervisor template
│   ├── documenter.md                # Documenter template
│   ├── plan-template.md             # Planning template
│   ├── plan.chatmode.md             # Chat mode planning
│   ├── refactoring.md               # Refactoring template
│   ├── scaffolder.md                # Scaffolder template
│   ├── tdd.chatmode.md              # TDD chat mode
│   └── testengineer.md              # Test engineer template
│
├── todo-list-typescript-main/       # Main application
│   ├── src/
│   │   ├── css/
│   │   │   └── style.css            # Application styles
│   │   ├── models/
│   │   │   ├── FullList.ts          # Todo list collection
│   │   │   └── ListItem.ts          # Individual todo item
│   │   ├── templates/
│   │   │   └── ListTemplate.ts      # UI rendering template
│   │   └── main.ts                  # Application entry point
│   ├── public/
│   │   └── vite.svg                 # Vite logo
│   ├── index.html                   # HTML template
│   ├── package.json                 # Dependencies and scripts
│   ├── tsconfig.json                # TypeScript configuration
│   └── README.md                    # Application documentation
│
├── understanding-code/              # Code analysis workflow
│   └── instruction-generation/      # Step-by-step prompts
│       ├── 1-determine-techstack.md
│       ├── 2-categorize-files.md
│       ├── 3-identify-architecture.md
│       ├── 4-domain-deep-dive.md
│       ├── 5-styleguide-generation.md
│       └── 6-build-instructions.md
│
├── .gitignore                       # Git ignore rules
├── grey-text-completed-items.md     # Feature implementation plan
├── understanding-code.md            # Workflow overview
└── README.md                        # Main repository documentation
```

## Directory Details

### `.github/`

Contains GitHub-specific configurations and AI agent instructions.

#### `.github/agents/`
Individual instruction files for specialized AI agents. These define the role, responsibilities, and guidelines for each agent type.

- **code-supervisor.md** - Ensures code quality, reviews changes, checks for issues
- **documenter.md** - Creates and maintains all project documentation
- **refactoring.md** - Improves code structure while maintaining functionality
- **scaffolder.md** - Generates new features and components
- **testengineer.md** - Writes and maintains test suites

#### `.github/copilot-instructions.md`
Comprehensive guide for GitHub Copilot with:
- Architecture patterns and conventions
- File category references
- Feature scaffolding guides
- Integration rules and constraints
- Domain-specific notes

### `.results/`

Contains generated outputs from the code understanding workflow.

#### `1-techstack.md`
Analysis of the project's technology stack including:
- Programming languages and frameworks
- Domain specificity
- Application boundaries
- Architectural philosophy

#### `2-file-categorization.json`
JSON mapping of files to their architectural roles:
- `entry-point` - Application initialization files
- `models` - Data structures and business logic
- `templates` - UI rendering components
- `styles` - CSS stylesheets
- `build-configuration` - Build and TypeScript configs

#### `3-architectural-domains.json`
Identified architectural patterns and domains (structure varies by analysis).

#### `4-domains/`
Deep-dive documentation for each architectural domain:
- **accessibility.md** - Accessibility features and patterns
- **application-initialization.md** - App startup and bootstrapping
- **data-layer.md** - Data models and persistence
- **event-handling.md** - User interaction patterns
- **styling.md** - CSS architecture and conventions
- **typescript-configuration.md** - TypeScript setup and rules
- **ui-rendering.md** - DOM manipulation patterns

#### `5-style-guides/`
Code style guides for each file category:
- **entry-point.md** - Main entry point conventions
- **models.md** - Model class patterns
- **styles.md** - CSS conventions
- **templates.md** - Template class patterns

### `docs/`

Repository-wide documentation.

- **PROJECT_STRUCTURE.md** (this file) - Directory structure overview
- **AGENT_TEMPLATES.md** - How to use AI agent templates
- **CODE_UNDERSTANDING.md** - Code analysis workflow guide
- **DEVELOPMENT.md** - Development setup and workflows
- **TYPESCRIPT_PATTERNS.md** - TypeScript patterns reference

### `prompt-templates/`

Reusable templates for AI-assisted development.

Each template defines:
- Agent name and description
- Core responsibilities
- Focus areas
- Best practices
- Example use cases

Templates can be:
1. Used directly with AI assistants
2. Adapted for specific projects
3. Combined for complex tasks
4. Extended with project-specific rules

### `todo-list-typescript-main/`

The main TypeScript todo list application.

#### Application Structure

**`src/`** - Source code
- **`css/style.css`** - All application styles (single stylesheet)
- **`models/`** - Data models
  - `ListItem.ts` - Individual todo item with id, text, checked status
  - `FullList.ts` - Collection of items with localStorage persistence
- **`templates/`** - UI components
  - `ListTemplate.ts` - Renders todo list to DOM
- **`main.ts`** - Entry point, event handlers, initialization

**`public/`** - Static assets served as-is

**Configuration Files:**
- **`package.json`** - npm dependencies (TypeScript, Vite only)
- **`tsconfig.json`** - TypeScript compiler options (strict mode)
- **`index.html`** - HTML template with semantic markup

### `understanding-code/`

Contains the systematic workflow for analyzing and documenting codebases.

#### `instruction-generation/`
Step-by-step prompts that guide AI through code analysis:

1. **1-determine-techstack.md** - Identify languages, frameworks, domain
2. **2-categorize-files.md** - Group files by architectural function
3. **3-identify-architecture.md** - Document patterns and conventions
4. **4-domain-deep-dive.md** - Analyze specific domains in depth
5. **5-styleguide-generation.md** - Create category-specific style guides
6. **6-build-instructions.md** - Generate comprehensive project guide

Each step outputs to `.results/` for use in subsequent steps.

## File Categories

### Documentation Files
- `README.md` - Main repository overview
- `todo-list-typescript-main/README.md` - Application documentation
- `docs/*.md` - Detailed guides
- `.results/4-domains/*.md` - Domain documentation
- `.results/5-style-guides/*.md` - Style guides

### Configuration Files
- `.gitignore` - Git ignore patterns
- `todo-list-typescript-main/package.json` - npm configuration
- `todo-list-typescript-main/tsconfig.json` - TypeScript settings

### Source Code
- `todo-list-typescript-main/src/**/*.ts` - TypeScript source files
- `todo-list-typescript-main/src/css/style.css` - Styles
- `todo-list-typescript-main/index.html` - HTML structure

### Templates and Instructions
- `prompt-templates/*.md` - AI agent templates
- `.github/agents/*.md` - Agent-specific instructions
- `understanding-code/instruction-generation/*.md` - Analysis workflow

### Analysis Results
- `.results/*.md` - Markdown analysis outputs
- `.results/*.json` - JSON analysis outputs

## Navigation Tips

### For Developers
1. Start with [README.md](../README.md) for overview
2. Read [DEVELOPMENT.md](./DEVELOPMENT.md) for setup
3. Check [todo-list-typescript-main/README.md](../todo-list-typescript-main/README.md) for app details
4. Review [.github/copilot-instructions.md](../.github/copilot-instructions.md) for patterns

### For AI Agents
1. Load relevant template from `prompt-templates/`
2. Review agent-specific instructions in `.github/agents/`
3. Check `.github/copilot-instructions.md` for comprehensive guide
4. Reference `.results/` for existing analysis

### For Understanding Code
1. Follow workflow in `understanding-code/instruction-generation/`
2. Execute prompts in order (1-6)
3. Review outputs in `.results/`
4. Compare with existing analysis

## File Naming Conventions

- **Markdown files**: `UPPERCASE_WITH_UNDERSCORES.md` or `lowercase-with-dashes.md`
- **TypeScript files**: `PascalCase.ts` for classes, `camelCase.ts` for utilities
- **CSS files**: `lowercase.css`
- **JSON files**: `lowercase-with-dashes.json`
- **Templates**: `lowercase.md` in `prompt-templates/`

## Related Documentation

- [Agent Templates Guide](./AGENT_TEMPLATES.md) - Using AI agent templates
- [Code Understanding Workflow](./CODE_UNDERSTANDING.md) - Analysis process
- [Development Guide](./DEVELOPMENT.md) - Setup and workflows
- [TypeScript Patterns](./TYPESCRIPT_PATTERNS.md) - Coding patterns

---

**Note:** This structure is designed for clarity and AI-assisted development. Each directory serves a specific purpose in the documentation, analysis, and development workflow.
