# Contributing to @ffsm/snapshot

Thank you for your interest in contributing to @ffsm/snapshot! This document provides guidelines and information about contributing to this project.

## Code of Conduct

By participating in this project, you are expected to uphold our code of conduct. Please be respectful, inclusive, and considerate in all interactions.

## How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Use the issue template** when available
3. **Provide clear reproduction steps** for bugs
4. **Include relevant environment information** (Node.js version, React version, etc.)

### Suggesting Features

We welcome feature suggestions! Please:

1. **Check existing feature requests** first
2. **Describe the use case** and why it would be valuable
3. **Consider the API design** and how it fits with existing functionality
4. **Be open to discussion** about implementation approaches

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/ffsmio-snapshot.git
   cd ffsmio-snapshot
   ```

3. **Install dependencies**:
   ```bash
   yarn install
   ```

4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

### Development Scripts

- `yarn dev` - Start development build with watch mode
- `yarn build` - Build the package for production
- `yarn clean` - Clean the dist directory
- `yarn typecheck` - Run TypeScript type checking
- `yarn test` - Run tests (when available)

### Making Changes

1. **Follow existing code style** and patterns
2. **Add JSDoc comments** for new public APIs
3. **Update TypeScript types** as needed
4. **Test your changes** thoroughly
5. **Update documentation** if needed

### Code Standards

- **TypeScript**: All code should be written in TypeScript
- **ESLint**: Follow the existing linting rules
- **Formatting**: Code is automatically formatted
- **JSDoc**: Document all public APIs with comprehensive JSDoc comments

### Commit Guidelines

We follow conventional commit format:

- `feat: add new feature`
- `fix: fix bug`
- `docs: update documentation`
- `refactor: refactor code without changing functionality`
- `test: add or update tests`
- `chore: update build process, dependencies, etc.`

Example:
```
feat: add retry configuration to useSnapshot hook

- Add retryInit option to control retry attempts
- Update JSDoc documentation
- Add examples to README
```

### Pull Request Process

1. **Create a pull request** from your feature branch
2. **Fill out the PR template** completely
3. **Link related issues** using GitHub keywords (fixes #123)
4. **Ensure all checks pass** (build, type checking, etc.)
5. **Request review** from maintainers
6. **Address feedback** promptly and respectfully

### Pull Request Checklist

- [ ] Code follows project conventions and style
- [ ] Changes are tested and working
- [ ] TypeScript types are updated if needed
- [ ] JSDoc comments are added for new APIs
- [ ] Documentation is updated (README, etc.)
- [ ] Commit messages follow conventional format
- [ ] PR description explains the changes clearly

## Project Structure

```
src/
├── index.ts          # Main exports
├── use-snapshot.ts   # useSnapshot hook implementation
└── with-snapshot.tsx # withSnapshot HOC implementation

dist/                 # Built files (auto-generated)
├── *.js             # CommonJS builds
├── *.esm.js         # ES module builds
└── *.d.ts           # TypeScript declarations
```

## API Design Principles

When contributing new features:

1. **Keep it simple** - APIs should be intuitive and easy to use
2. **TypeScript first** - Provide excellent type safety and IDE support
3. **Performance conscious** - Consider impact on render cycles and memory
4. **Backward compatible** - Avoid breaking changes when possible
5. **Well documented** - Include comprehensive JSDoc and examples

## Testing

Currently, the project relies on manual testing and type checking. When adding features:

1. **Test in different scenarios** (various component structures, React versions)
2. **Verify TypeScript types** work correctly
3. **Test both CJS and ESM builds**
4. **Check performance implications**

## Documentation

When making changes that affect the public API:

1. **Update JSDoc comments** with detailed descriptions and examples
2. **Update README.md** with new usage examples
3. **Update CHANGELOG.md** following semantic versioning
4. **Consider adding TypeScript examples**

## Release Process

Releases are handled by maintainers:

1. Version bumping follows [semantic versioning](https://semver.org/)
2. CHANGELOG.md is updated with all changes
3. npm publish is done after successful CI builds

## Questions or Need Help?

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: s3tech.vn@gmail.com for direct contact

## Recognition

Contributors are recognized in:
- CHANGELOG.md for their specific contributions
- GitHub contributors page
- Special thanks in release notes for significant contributions

Thank you for contributing to @ffsm/snapshot! 🎉
