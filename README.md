# AI Multi-Agents Repository

This repository demonstrates an AI-assisted development workflow using multiple specialized agents to build, document, and maintain a TypeScript todo list application.

## 🎯 Repository Purpose

This project showcases:
- **Multi-agent AI development patterns** - Using specialized AI agents for different development tasks
- **Code understanding workflows** - Systematic approaches to analyzing and documenting codebases
- **Documentation generation** - Automated creation of comprehensive project instructions
- **TypeScript best practices** - A clean, well-structured todo application built with vanilla TypeScript

## 📁 Repository Structure

```
.
├── todo-list-typescript-main/    # Main TypeScript todo list application
├── prompt-templates/             # Reusable AI agent prompt templates
├── understanding-code/           # Code analysis workflow instructions
├── .results/                     # Generated analysis outputs
├── .github/
│   ├── agents/                   # Agent-specific instructions
│   └── copilot-instructions.md   # Comprehensive project guide
└── README.md                     # This file
```

### Key Components

#### 1. Todo List Application (`todo-list-typescript-main/`)
A minimalist todo list application built with:
- **Vanilla TypeScript** (no frameworks)
- **Vite** for build tooling
- **localStorage** for data persistence
- **Singleton pattern** for state management

**[→ View Application Documentation](./todo-list-typescript-main/README.md)**

#### 2. AI Agent Templates (`prompt-templates/`)
Reusable templates for specialized development agents:
- `documenter.md` - Documentation specialist
- `scaffolder.md` - Feature scaffolding expert
- `refactoring.md` - Code refactoring specialist
- `testengineer.md` - Test development expert
- `codesupervisor.md` - Code review and quality assurance

**[→ Learn About Agent Templates](./docs/AGENT_TEMPLATES.md)**

#### 3. Code Understanding Workflow (`understanding-code/`)
A systematic approach to analyzing codebases using AI:
1. Determine tech stack and domain
2. Categorize files by function
3. Identify architectural patterns
4. Deep-dive into domain concepts
5. Generate style guides
6. Create build instructions

**[→ Explore Code Understanding Process](./docs/CODE_UNDERSTANDING.md)**

#### 4. Analysis Results (`.results/`)
Generated outputs from the code understanding workflow:
- Tech stack analysis
- File categorization
- Architectural domains
- Domain-specific style guides

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git

### Running the Todo Application

```bash
cd todo-list-typescript-main
npm install
npm run dev
```

The application will be available at `http://localhost:5173/`

### Building for Production

```bash
cd todo-list-typescript-main
npm run build
npm run preview
```

## 📚 Documentation

### Core Documentation
- **[Project Structure Guide](./docs/PROJECT_STRUCTURE.md)** - Detailed overview of all directories and files
- **[Agent Templates Guide](./docs/AGENT_TEMPLATES.md)** - How to use AI agent templates
- **[Code Understanding Workflow](./docs/CODE_UNDERSTANDING.md)** - Step-by-step analysis process
- **[Development Guide](./docs/DEVELOPMENT.md)** - Setup and development workflows

### Application Documentation
- **[Todo App Architecture](./todo-list-typescript-main/README.md)** - Application-specific documentation
- **[TypeScript Patterns](./docs/TYPESCRIPT_PATTERNS.md)** - Coding patterns used in the project

## 🤖 Using AI Agents

This repository includes templates and instructions for specialized AI agents. Each agent has a specific role:

### Available Agents

| Agent | Purpose | Template |
|-------|---------|----------|
| **Documenter** | Creates and maintains documentation | [documenter.md](./prompt-templates/documenter.md) |
| **Scaffolder** | Generates new features and components | [scaffolder.md](./prompt-templates/scaffolder.md) |
| **Refactoring** | Improves code structure and quality | [refactoring.md](./prompt-templates/refactoring.md) |
| **Test Engineer** | Writes and maintains tests | [testengineer.md](./prompt-templates/testengineer.md) |
| **Code Supervisor** | Reviews code for quality and standards | [codesupervisor.md](./prompt-templates/codesupervisor.md) |

**[→ Learn More About Agents](./docs/AGENT_TEMPLATES.md)**

## 🏗️ Architecture Overview

The todo application follows a clean architecture with clear separation of concerns:

- **Models** (`src/models/`) - Data structures and business logic
  - `ListItem.ts` - Individual todo item
  - `FullList.ts` - Todo list collection with persistence
  
- **Templates** (`src/templates/`) - UI rendering
  - `ListTemplate.ts` - DOM manipulation and rendering
  
- **Entry Point** (`src/main.ts`) - Application initialization and event handling

**Key Patterns:**
- Singleton pattern for global instances
- Interface-first design
- Private fields with getters/setters
- Automatic localStorage persistence

**[→ Read Full Architecture Guide](./.github/copilot-instructions.md)**

## 🔄 Code Understanding Workflow

This repository demonstrates a systematic approach to understanding and documenting code:

1. **Determine Tech Stack** - Identify languages, frameworks, and patterns
2. **Categorize Files** - Group files by architectural role
3. **Identify Architecture** - Document key architectural patterns
4. **Domain Deep Dive** - Analyze domain-specific concepts
5. **Generate Style Guides** - Create coding conventions
6. **Build Instructions** - Document development workflows

**[→ Follow the Workflow](./docs/CODE_UNDERSTANDING.md)**

## 📖 Examples

### Example: Adding a New Feature

1. Review the [architecture patterns](./.github/copilot-instructions.md)
2. Use the [scaffolder template](./prompt-templates/scaffolder.md)
3. Follow the [style guides](./.results/5-style-guides/)
4. Run tests and build

### Example: Understanding Existing Code

1. Start with [tech stack analysis](./.results/1-techstack.md)
2. Review [file categorization](./.results/2-file-categorization.json)
3. Read [domain documentation](./.results/4-domains/)
4. Check [architectural patterns](./.results/3-architectural-domains.json)

## 🤝 Contributing

Contributions are welcome! Whether you want to report a bug, suggest an enhancement, improve documentation, or contribute code, please see our [Contributing Guide](./CONTRIBUTING.md).

**Quick ways to contribute:**
- Report bugs or issues
- Improve documentation
- Add examples or tutorials
- Create new agent templates
- Share your workflows

**To use these patterns in your own project:**

1. **Copy relevant templates** from `prompt-templates/`
2. **Adapt the workflow** from `understanding-code/` to your needs
3. **Use the analysis structure** from `.results/` as a guide
4. **Customize agent instructions** in `.github/agents/`

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the individual project files for details.

## 🔗 Related Resources

- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Copilot](https://github.com/features/copilot)
- [AI-Assisted Development Patterns](https://github.com/features/copilot/patterns)

## 📝 Additional Documentation

- [Contributing Guide](./CONTRIBUTING.md) - How to contribute to this project
- [Changelog](./docs/CHANGELOG.md) - Project history and updates
- [FAQ](./docs/FAQ.md) - Frequently asked questions
- [Quick Reference](./docs/QUICK_REFERENCE.md) - Fast access to commands and patterns

---

**Last Updated:** 2025-11-13  
**Maintained By:** AI Multi-Agents Team
