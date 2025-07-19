# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-20

### Added
- **Snapshot component**: New React component for declarative dimension measurement
- **WithSnapshotOptions interface**: Extended options with onSnapshot callback support
- **Modular exports**: Added `@ffsm/snapshot/snapshot` export path
- **Comprehensive JSDoc**: Complete documentation for Snapshot component
- **Forward ref support**: Snapshot component supports ref forwarding

### Changed
- **withSnapshot refactor**: Now uses Snapshot component internally for better code reuse
- **Cleaner architecture**: Single source of truth for measurement logic
- **Enhanced API documentation**: Updated README with Snapshot component examples

### Improved
- **Code maintainability**: Reduced duplication between withSnapshot and core logic
- **TypeScript support**: Better type definitions for new component
- **Developer experience**: More flexible ways to use the library

## [1.0.0] - 2025-01-20

### Added
- Initial release
- `useSnapshot` hook for DOM element snapshots
- `withSnapshot` HOC for component enhancement
- TypeScript support
- CommonJS and ESM builds
- Comprehensive type definitions
