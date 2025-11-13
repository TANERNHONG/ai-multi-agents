# Test Documentation

## Overview

This document describes the comprehensive test suite for the Todo List TypeScript application. The tests ensure reliability, correctness, and adherence to the architectural patterns defined in the copilot instructions.

## Test Framework

- **Test Runner**: Vitest 4.0.8
- **DOM Environment**: happy-dom
- **Coverage Tool**: @vitest/coverage-v8

## Test Structure

```
src/__tests__/
├── models/
│   ├── ListItem.test.ts          # Unit tests for ListItem model
│   └── FullList.test.ts          # Unit tests for FullList model
├── templates/
│   └── ListTemplate.test.ts      # Integration tests for ListTemplate
└── integration/
    └── main.test.ts              # Integration tests for main application
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

## Test Coverage

Current coverage: **98.18%**

| File              | % Stmts | % Branch | % Funcs | % Lines |
|-------------------|---------|----------|---------|---------|
| All files         | 98.18   | 83.33    | 100     | 100     |
| models/           | 96.29   | 83.33    | 100     | 100     |
| - FullList.ts     | 94.44   | 66.66    | 100     | 100     |
| - ListItem.ts     | 100     | 100      | 100     | 100     |
| templates/        | 100     | 100      | 100     | 100     |
| - ListTemplate.ts | 100     | 100      | 100     | 100     |

## Test Suites

### 1. ListItem Model Tests (15 tests)

Tests for the individual todo item data model.

**Test Categories:**
- **Constructor**: Default and provided values
- **Interface Implementation**: Validates Item interface compliance
- **Getters and Setters**: All property accessors (id, item, checked)
- **Edge Cases**: Special characters, unicode, long text, empty strings

**Key Test Scenarios:**
- ✓ Creates with default values (empty string id, empty string item, unchecked)
- ✓ Creates with provided values
- ✓ Implements Item interface correctly
- ✓ Gets and sets id, item, and checked properties
- ✓ Toggles checked status
- ✓ Handles special characters, XSS attempts, and unicode
- ✓ Handles very long text (1000+ characters)
- ✓ Maintains string type for numeric IDs

### 2. FullList Model Tests (25 tests)

Tests for the collection of todo items with localStorage persistence.

**Test Categories:**
- **Singleton Pattern**: Instance uniqueness and state sharing
- **Constructor and Initial State**: Empty list initialization
- **CRUD Operations**: Add, remove, and clear items
- **Persistence**: Save and load from localStorage
- **Integration**: Full lifecycle tests

**Key Test Scenarios:**
- ✓ Returns same singleton instance across accesses
- ✓ Maintains state across instance references
- ✓ Adds single and multiple items
- ✓ Removes items by ID
- ✓ Clears entire list
- ✓ Saves to localStorage with correct key ("myList")
- ✓ Loads items from localStorage
- ✓ Creates LitsItem instances from loaded data
- ✓ Handles empty localStorage gracefully
- ✓ Throws error on invalid JSON in localStorage
- ✓ Persists state across save/load cycles

### 3. ListTemplate Tests (29 tests)

Tests for DOM rendering and event handling.

**Test Categories:**
- **Singleton Pattern**: Instance uniqueness
- **DOM Manipulation**: Clear and render operations
- **Element Structure**: Correct HTML element creation
- **Event Handlers**: Checkbox change and delete button click
- **Security**: XSS protection validation
- **Edge Cases**: Special characters, unicode, long text
- **Accessibility**: ARIA labels, tabIndex, label associations

**Key Test Scenarios:**
- ✓ Returns same singleton instance
- ✓ Caches DOM reference to ul element
- ✓ Clears all children from ul
- ✓ Renders empty, single, and multiple items
- ✓ Clears before rendering (prevents duplication)
- ✓ Prepends items (newest first)
- ✓ Creates elements with correct classes and properties
- ✓ Uses textContent (not innerHTML) for XSS protection
- ✓ Handles checkbox change events
- ✓ Saves to localStorage on checkbox change
- ✓ Removes items and re-renders on delete button click
- ✓ Handles special characters, unicode, and emoji
- ✓ Maintains accessibility features (tabIndex, label associations)

### 4. Main Application Integration Tests (27 tests)

Tests for the complete application flow and user interactions.

**Test Categories:**
- **Application Initialization**: DOM elements and state
- **Form Submission**: Adding items
- **Clear Button**: Removing all items
- **Complete User Flows**: Multi-step interactions
- **Input Validation**: Form input requirements
- **Accessibility**: Semantic HTML and ARIA attributes
- **Form Behavior**: Event handling

**Key Test Scenarios:**
- ✓ Has all required DOM elements present
- ✓ Initializes with empty list
- ✓ Loads saved items from localStorage on init
- ✓ Adds items on form submit
- ✓ Trims whitespace from input
- ✓ Prevents adding empty or whitespace-only items
- ✓ Generates sequential IDs (1, 2, 3, ...)
- ✓ Saves to localStorage after adding
- ✓ Renders items after adding
- ✓ Clears all items on clear button click
- ✓ Saves empty list after clearing
- ✓ Completes add-check-delete flow
- ✓ Persists and reloads items correctly
- ✓ Handles rapid additions (10 items)
- ✓ Handles mixed operations (add, remove, check)
- ✓ Respects maxlength attribute (40 characters)
- ✓ Has autocomplete off
- ✓ Has placeholder text
- ✓ Has offscreen headings for accessibility
- ✓ Has proper label associations
- ✓ Has ARIA labels on buttons

## Test Patterns and Best Practices

### Singleton Testing
All models and templates use the singleton pattern. Tests:
- Verify same instance is returned on multiple accesses
- Reset state in `beforeEach` hooks
- Don't attempt to create new instances

### DOM Testing
DOM-dependent tests:
- Set up required HTML structure in `beforeAll`
- Update singleton DOM references after setup
- Clear state in `beforeEach` hooks
- Use type assertions for DOM queries

### localStorage Mocking
localStorage is mocked in tests:
```typescript
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
```

### Security Testing
Tests validate XSS protection:
- Verify `textContent` is used instead of `innerHTML`
- Test with XSS payloads like `<script>alert("xss")</script>`
- Ensure HTML is escaped in rendered output

### Edge Case Testing
Tests cover:
- Empty strings
- Whitespace-only strings
- Very long text (1000+ characters)
- Special characters (< > & " ' / \\ @ # $ %)
- Unicode and emoji (🎉 日本語 тест)
- Duplicate content with unique IDs

## Continuous Integration

Tests should be run:
- Before every commit
- In CI/CD pipelines
- Before merging pull requests
- After dependency updates

## Future Test Enhancements

Potential areas for expansion:
1. **Performance Tests**: Measure rendering performance with large lists (1000+ items)
2. **Visual Regression Tests**: Screenshot comparison for UI changes
3. **E2E Tests**: Full browser automation with Playwright
4. **Accessibility Tests**: Automated a11y audits with axe-core
5. **Stress Tests**: Concurrent operations, rapid user input

## Test Maintenance

When modifying the application:
1. **Update tests first** (TDD approach when possible)
2. **Run tests frequently** during development
3. **Maintain high coverage** (aim for >95%)
4. **Document new test scenarios** in this file
5. **Review failed tests** before changing them

## Debugging Tests

### Run specific test file
```bash
npm test -- src/__tests__/models/ListItem.test.ts
```

### Run specific test
```bash
npm test -- -t "should add item on form submit"
```

### Run tests with verbose output
```bash
npm test -- --reporter=verbose
```

### Open test UI for debugging
```bash
npm run test:ui
```

## Architectural Compliance

Tests validate adherence to copilot instructions:
- ✓ Singleton pattern for models and templates
- ✓ Private fields with getters/setters
- ✓ localStorage persistence in models
- ✓ Imperative DOM manipulation (no frameworks)
- ✓ Type assertions for DOM queries
- ✓ textContent for user data (XSS protection)
- ✓ Clear-then-render pattern
- ✓ Accessibility features (labels, ARIA, tabIndex)
- ✓ Strict TypeScript compliance
- ✓ Trim and validate user input
- ✓ Save after every mutation

## Conclusion

This comprehensive test suite ensures the Todo List application is:
- **Reliable**: 96 passing tests covering all functionality
- **Maintainable**: Clear structure and documentation
- **Secure**: XSS protection validated
- **Accessible**: ARIA and semantic HTML tested
- **Robust**: Edge cases and error conditions handled

The high test coverage (98.18%) provides confidence for refactoring and feature additions while maintaining the architectural integrity defined in the copilot instructions.
