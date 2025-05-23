# Contributing to GitHub Actions MCP Server

Thank you for considering contributing to the GitHub Actions MCP Server! This document outlines the process for contributing to this project and how to get started.

## Content

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Development Environment Setup](#development-environment-setup)
- [Contribution Guidelines](#contribution-guidelines)
  - [Pull Request Process](#pull-request-process)
  - [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)
- [Community](#community)

## Getting Started

### Development Environment Setup

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/github-actions-mcp.git
   cd github-actions-mcp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up your GitHub Token**:
   ```bash
   export GITHUB_TOKEN=your_personal_access_token
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Contribution Guidelines

### Pull Request Process

1. **Create a branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them with clear, descriptive commit messages:
   ```bash
   git commit -m "Add feature: brief description of changes"
   ```

3. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** against the `main` branch of the original repository.

5. **Describe your changes** in the PR description, including:
   - What problem does it solve?
   - How does it work?
   - How has it been tested?

6. **Update the README.md** if necessary with details of changes to the interface.

7. **Ensure your code passes all checks** and reviews before merging.

### Coding Standards

- **TypeScript**: Follow the existing coding style and TypeScript configuration.
- **ES Modules**: Use ES module syntax (`import`/`export`) consistently.
- **Code Formatting**: We recommend using an editor with TypeScript support.
- **Comments**: Add JSDoc comments to functions, especially for exported functions.

Example of a well-documented function:

```typescript
/**
 * Retrieves workflow run information from GitHub
 * 
 * @param {object} args - The arguments object
 * @param {string} args.owner - Repository owner
 * @param {string} args.repo - Repository name
 * @param {number} args.runId - The ID of the workflow run
 * @returns {Promise<WorkflowRun>} The workflow run details
 */
async function getWorkflowRun(args, octokit) {
  // Implementation...
}
```

## Testing

Currently, the project doesn't have automated tests. If you'd like to contribute by adding tests, here are some suggestions:

- Unit tests for individual tool functions
- Integration tests for GitHub API interactions
- End-to-end tests for MCP server communication

When adding tests, please consider using a framework like Jest or Mocha.

## Documentation

Good documentation is crucial for this project. When contributing, please:

1. Update any relevant README sections
2. Document new tools in the README's Tools section
3. Add JSDoc comments to your code
4. Update example configurations if applicable

## Issue Reporting

When reporting issues, please include:

1. **Description**: Clear description of the issue
2. **Reproduction Steps**: How to reproduce the issue
3. **Expected vs. Actual Behavior**: What you expected vs. what happened
4. **Environment**: Node.js version, OS, etc.
5. **Logs**: Any relevant error messages or logs
6. **Possible Solution**: If you have ideas on how to fix it

## Feature Requests

Feature requests are welcome! When requesting a feature, please:

1. **Check existing issues** to see if it's already been requested
2. **Describe the feature** and why it would be valuable
3. **Provide examples** of how it might work
4. **Indicate if you're willing to help implement** the feature

## Community

- Feel free to reach out with questions
- Be respectful and considerate in all communications
- Help others who are contributing to the project

## License

By contributing to this project, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).

Thank you for contributing to GitHub Actions MCP Server!
