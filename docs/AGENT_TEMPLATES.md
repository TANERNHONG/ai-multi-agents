# AI Agent Templates Guide

This guide explains how to use the specialized AI agent templates included in this repository for AI-assisted development workflows.

## Overview

The `prompt-templates/` directory contains reusable templates that define specialized AI agents for different development tasks. These templates help AI assistants understand their role, responsibilities, and constraints when working on specific aspects of a project.

## Available Agent Templates

### 1. Documenter (`documenter.md`)

**Purpose:** Creates and maintains comprehensive, clear project documentation.

**Responsibilities:**
- Create and update documentation files (README, CONTRIBUTING, etc.)
- Provide clear setup and installation instructions
- Explain project structure and development workflows
- Document APIs, configurations, and environment variables
- Maintain consistent writing style
- Link related documents appropriately

**Best Used For:**
- Creating new documentation
- Updating existing guides
- Writing API documentation
- Creating contribution guidelines
- Structuring documentation hierarchies

**Example Prompt:**
```
Using the documenter agent template, create comprehensive API documentation 
for the REST endpoints in src/api/. Include request/response examples, 
authentication requirements, and error codes.
```

**[→ View Template](../prompt-templates/documenter.md)**

---

### 2. Scaffolder (`scaffolder.md`)

**Purpose:** Generates new features, components, and code structures following project patterns.

**Responsibilities:**
- Create new features based on existing patterns
- Generate boilerplate code
- Follow architectural conventions
- Ensure consistency with project structure
- Set up necessary files and directories
- Integrate new code with existing systems

**Best Used For:**
- Adding new features
- Creating new components/modules
- Generating repetitive code structures
- Extending existing functionality
- Building new pages or screens

**Example Prompt:**
```
Using the scaffolder agent template, create a new priority field for todo items 
(high, medium, low) following the existing model patterns. Include necessary 
changes to models, templates, and styles.
```

**[→ View Template](../prompt-templates/scaffolder.md)**

---

### 3. Refactoring (`refactoring.md`)

**Purpose:** Improves code structure, readability, and maintainability without changing functionality.

**Responsibilities:**
- Identify code smells and anti-patterns
- Improve code organization
- Enhance readability
- Reduce duplication
- Apply design patterns appropriately
- Maintain test coverage during refactoring
- Preserve existing functionality

**Best Used For:**
- Cleaning up technical debt
- Improving code organization
- Extracting reusable components
- Simplifying complex logic
- Applying better design patterns

**Example Prompt:**
```
Using the refactoring agent template, review the event handlers in main.ts 
and suggest improvements for better separation of concerns. Extract repetitive 
patterns into helper functions.
```

**[→ View Template](../prompt-templates/refactoring.md)**

---

### 4. Test Engineer (`testengineer.md`)

**Purpose:** Writes and maintains comprehensive test suites.

**Responsibilities:**
- Write unit tests
- Create integration tests
- Develop end-to-end tests
- Ensure good test coverage
- Follow testing best practices
- Maintain test documentation
- Debug failing tests

**Best Used For:**
- Adding tests for new features
- Improving test coverage
- Setting up testing infrastructure
- Writing edge case tests
- Creating test utilities

**Example Prompt:**
```
Using the test engineer agent template, create unit tests for the FullList 
model class. Cover all methods including load, save, addItem, removeItem, 
and clearList. Include edge cases and error conditions.
```

**[→ View Template](../prompt-templates/testengineer.md)**

---

### 5. Code Supervisor (`codesupervisor.md`)

**Purpose:** Reviews code for quality, standards compliance, and potential issues.

**Responsibilities:**
- Review code changes
- Check for bugs and issues
- Verify coding standards
- Assess security concerns
- Review performance implications
- Validate architectural consistency
- Provide constructive feedback

**Best Used For:**
- Code reviews
- Quality assurance
- Security audits
- Performance reviews
- Standards compliance checks

**Example Prompt:**
```
Using the code supervisor agent template, review the recent changes to 
ListTemplate.ts. Check for potential issues with DOM manipulation, 
memory leaks, accessibility concerns, and adherence to project patterns.
```

**[→ View Template](../prompt-templates/codesupervisor.md)**

---

## Additional Templates

### Plan Template (`plan-template.md`)
Structured template for creating implementation plans with tasks, considerations, and checklists.

### Chat Mode Templates
- `plan.chatmode.md` - Planning in conversational mode
- `tdd.chatmode.md` - Test-driven development workflow

## How to Use Agent Templates

### Method 1: Direct Reference

Simply reference the template in your prompt:

```
Use the [agent name] template to [specific task].
```

### Method 2: Load Template Content

Load the template content into your AI assistant's context:

```
Load the contents of prompt-templates/documenter.md, then create documentation 
for the new authentication module.
```

### Method 3: Adapt Template

Copy and customize a template for project-specific needs:

1. Copy the template
2. Add project-specific rules
3. Include domain knowledge
4. Reference in prompts

### Method 4: Combine Templates

Use multiple templates for complex tasks:

```
Using both scaffolder and test engineer templates, create a new feature 
for task categories including implementation and comprehensive tests.
```

## Template Structure

All templates follow a consistent structure:

```markdown
---
name: [agent-name]
description: [brief description]
---

[Role definition]

Focus on the following instructions:
- [Responsibility 1]
- [Responsibility 2]
- ...

[Additional guidelines and constraints]
```

### Key Sections

1. **Front Matter** - Metadata (name, description)
2. **Role Definition** - High-level purpose
3. **Instructions** - Specific responsibilities
4. **Guidelines** - Best practices and constraints

## Agent Coordination

### Sequential Workflow

Use agents in sequence for complex tasks:

1. **Scaffolder** - Create new feature
2. **Test Engineer** - Add tests
3. **Code Supervisor** - Review implementation
4. **Documenter** - Update documentation

### Parallel Workflow

Use different agents for independent tasks:

- **Documenter** - Update API docs
- **Refactoring** - Clean up old code
- **Test Engineer** - Improve test coverage

### Iterative Workflow

Iterate with the same agent:

1. **Refactoring** - First pass improvements
2. **Code Supervisor** - Review changes
3. **Refactoring** - Address review feedback
4. **Code Supervisor** - Final approval

## Best Practices

### 1. Be Specific

❌ "Use the documenter template to update docs"
✅ "Use the documenter template to create API documentation for the new search endpoints, including examples and error codes"

### 2. Provide Context

Include relevant information:
- What already exists
- What needs to change
- Any constraints or requirements
- Related files or components

### 3. Reference Existing Patterns

Point to examples in the codebase:
- "Follow the pattern in ListItem.ts"
- "Use similar structure to existing models"
- "Match the style in current documentation"

### 4. Set Clear Boundaries

Define what should and shouldn't be changed:
- "Update documentation only, don't modify source code"
- "Refactor templates/ directory only"
- "Add tests without changing implementation"

### 5. Request Review Points

Ask for checkpoints:
- "Show the plan before implementation"
- "List files to be modified first"
- "Confirm approach before proceeding"

## Integration with GitHub Copilot

These templates work particularly well with GitHub Copilot:

### In `.github/agents/`

Agent-specific instructions are stored in `.github/agents/` and automatically loaded by GitHub Copilot when working on the repository.

### In `.github/copilot-instructions.md`

The comprehensive project guide includes:
- All architectural patterns
- File category references
- Feature scaffold guides
- Integration rules

GitHub Copilot uses this automatically for context-aware suggestions.

## Customizing Templates

### For Your Project

1. Copy the template to your project
2. Update the role definition
3. Add project-specific rules
4. Include domain knowledge
5. Reference in your workflow

### Adding Domain Knowledge

Enhance templates with:
- Industry-specific terminology
- Company coding standards
- Project-specific patterns
- Technology constraints

Example:
```markdown
---
name: documenter
description: [original description]
project: [your-project]
domain: [your-domain]
---

[Original template content]

## Project-Specific Rules
- Use company style guide v2.0
- Include compliance disclaimers
- Follow GDPR documentation requirements
```

## Template Combinations

### Common Combinations

**New Feature Development:**
```
1. Scaffolder - Create feature structure
2. Test Engineer - Add comprehensive tests  
3. Documenter - Update user guides
4. Code Supervisor - Review everything
```

**Code Quality Improvement:**
```
1. Code Supervisor - Identify issues
2. Refactoring - Fix identified problems
3. Test Engineer - Ensure tests still pass
4. Documenter - Update if patterns change
```

**Documentation Overhaul:**
```
1. Code Supervisor - Audit current docs
2. Documenter - Rewrite outdated sections
3. Scaffolder - Add code examples
4. Test Engineer - Verify example code works
```

## Troubleshooting

### Template Not Working as Expected

**Issue:** Agent doesn't follow template
**Solution:** 
- Load template explicitly
- Be more specific in instructions
- Provide examples from codebase

**Issue:** Agent goes beyond scope
**Solution:**
- Add clearer boundaries
- Specify what NOT to change
- Reference existing constraints

**Issue:** Agent asks too many questions
**Solution:**
- Provide more context upfront
- Include relevant file contents
- Reference architectural docs

### Getting Better Results

1. **Load relevant context** - Include related files
2. **Be specific** - Clear, detailed instructions
3. **Provide examples** - Show desired outcomes
4. **Set boundaries** - Define scope clearly
5. **Iterate** - Refine instructions based on results

## Examples from This Repository

### Example 1: Adding Gray Text Feature

**Task:** Style completed todo items with gray text

**Approach:**
```
Using the documenter template, create an implementation plan for adding 
gray text to completed items following the existing CSS patterns in 
src/css/style.css.
```

**Result:** [grey-text-completed-items.md](../grey-text-completed-items.md)

### Example 2: Code Understanding Workflow

**Task:** Analyze and document the codebase

**Approach:**
```
Using the documenter template, follow the workflow in understanding-code/
to create comprehensive GitHub Copilot instructions.
```

**Result:** [.github/copilot-instructions.md](../.github/copilot-instructions.md)

## Related Documentation

- [Project Structure](./PROJECT_STRUCTURE.md) - Repository organization
- [Code Understanding Workflow](./CODE_UNDERSTANDING.md) - Analysis process
- [Development Guide](./DEVELOPMENT.md) - Setup and workflows

## Contributing

To add new agent templates:

1. Create template in `prompt-templates/`
2. Follow existing template structure
3. Add front matter with name and description
4. Document responsibilities clearly
5. Include examples if helpful
6. Update this guide with the new template
7. Add to `.github/agents/` if appropriate

---

**Remember:** These templates are guidelines, not rigid rules. Adapt them to your specific needs and project requirements.
