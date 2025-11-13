# ToDo App

This is a simple ToDo app built with Vanilla TypeScript and Vite.

## Features

- Add new tasks
- Mark tasks as completed
- Delete tasks

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/xkalepar/todo-list-typescript
   ```

2. Navigate to the project directory:

   ```
   cd todo-app
   ```

3. Install the dependencies:

   ```
   npm install
   ```

## Usage

1. Start the development server:

npm run dev

```
   This will start the app and automatically open it in your default browser.
```

2. Interact with the app in your browser:

- Add new tasks by entering text in the input field and pressing Enter.
- Click on a task to mark it as completed.
- Click on the "X" button next to a task to delete it.

## Testing

This project includes a comprehensive test suite with 96 tests covering all functionality.

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage report
npm run test:coverage

# Run tests with interactive UI
npm run test:ui
```

### Test Coverage

- **Overall Coverage**: 98.18%
- **96 passing tests** across:
  - Unit tests for models (ListItem, FullList)
  - Integration tests for templates (ListTemplate)
  - Integration tests for main application flow

See [TEST_DOCUMENTATION.md](./TEST_DOCUMENTATION.md) for detailed test documentation.

## Build

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Make changes to the code:

You can modify the TypeScript files in the src directory to customize the app according to your needs.

**Important**: This project follows strict architectural patterns defined in [.github/copilot-instructions.md](../.github/copilot-instructions.md). Please review these guidelines before making changes.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

Before contributing:
1. Review the architectural guidelines in `.github/copilot-instructions.md`
2. Run tests: `npm test`
3. Ensure all tests pass
4. Add tests for new features

## License

```
This project is licensed under the MIT License.
```
## Live Demo

Check out the live demo of the ToDo app <a href="https://awesome-todo-list-nkq0.onrender.com/" target="_blank">here</a>.
