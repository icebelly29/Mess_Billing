# Contributing to Mess Billing

First off, thank you for considering contributing to Mess Billing! It's people like you that make Mess Billing such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When you are creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain why the enhancement would be useful

### Your First Code Contribution

1. Set up your development environment
   ```bash
   npm install
   ```

2. Create a new branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes
   - Follow the coding style
   - Add comments as needed
   - Update tests if necessary

4. Test your changes
   ```bash
   npm run lint
   # Add more test commands as needed
   ```

5. Commit your changes
   ```bash
   git add .
   git commit -m "feat: describe your changes"
   ```

### Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation with details of any new features
3. The PR will be merged once you have the sign-off of a maintainer

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on a device/emulator:
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## Styleguides

### Git Commit Messages

* Use the present tense ("add feature" not "added feature")
* Use the imperative mood ("move cursor to..." not "moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### TypeScript Styleguide

* Use TypeScript for all new code
* Follow the existing code style
* Use meaningful variable names
* Add types for all variables and function parameters

### Documentation Styleguide

* Use Markdown for documentation
* Reference functions and classes appropriately
* Include code examples where relevant

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `hacktoberfest` - Participating in Hacktoberfest

Thank you for contributing! 🎉
