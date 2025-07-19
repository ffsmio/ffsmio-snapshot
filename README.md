# @ffsm/snapshot

[![npm version](https://badge.fury.io/js/@ffsm%2Fsnapshot.svg)](https://badge.fury.io/js/@ffsm%2Fsnapshot)
[![npm downloads](https://img.shields.io/npm/dm/@ffsm/snapshot)](https://www.npmjs.com/package/@ffsm/snapshot)
[![license](https://img.shields.io/npm/l/@ffsm/snapshot)](https://github.com/ffsmio/ffsmio-snapshot/blob/master/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%20|%2019-blue.svg)](https://reactjs.org/)

React snapshot utilities for capturing and measuring DOM elements.

## Installation

```bash
npm install @ffsm/snapshot
# or
yarn add @ffsm/snapshot
```

## Usage

### useSnapshot Hook

```tsx
import { useSnapshot } from '@ffsm/snapshot';

function MyComponent() {
  const containerRef = useSnapshot(
    (size, error) => {
      if (error) {
        console.error('Measurement failed:', error);
      } else if (size) {
        console.log('Element dimensions:', size);
        // size.width and size.height are available
      }
    },
    {
      delay: 100,
      lowerWidthBound: 300,
      retryInit: 3,
      observer: true,
      onRetry: () => console.log('Retrying measurement...')
    }
  );

  return <div ref={containerRef}>Content to measure</div>;
}
```

### Snapshot Component

```tsx
import { Snapshot } from '@ffsm/snapshot';

function MyComponent() {
  return (
    <Snapshot
      options={{
        onSnapshot: (size, error) => {
          if (error) {
            console.error('Measurement failed:', error);
          } else if (size) {
            console.log(`Measured: ${size.width}x${size.height}`);
          }
        },
        delay: 100,
        observer: true
      }}
      style={{ border: '1px solid #ccc', padding: '10px' }}
    >
      <h1>Content to measure</h1>
      <p>This container will be measured automatically</p>
    </Snapshot>
  );
}
```

### Simple Usage

```tsx
import { useSnapshot, Snapshot } from '@ffsm/snapshot';

// Hook approach
function SimpleHook() {
  const ref = useSnapshot((size, error) => {
    if (size) {
      console.log(`Size: ${size.width}x${size.height}`);
    }
  });

  return <div ref={ref}>Content</div>;
}

// Component approach
function SimpleComponent() {
  return (
    <Snapshot options={{ onSnapshot: (size) => console.log(size) }}>
      <div>Content</div>
    </Snapshot>
  );
}
```

### withSnapshot HOC

```tsx
import { withSnapshot } from '@ffsm/snapshot';

function MyComponent({ snapshot, error, containerProps }) {
  if (error) {
    return <div>Measurement error: {error}</div>;
  }

  return (
    <div>
      {snapshot ? (
        <p>Dimensions: {snapshot.width}x{snapshot.height}</p>
      ) : (
        <p>Measuring...</p>
      )}
    </div>
  );
}

const EnhancedComponent = withSnapshot(MyComponent, {
  delay: 100,
  lowerWidthBound: 300,
  observer: true
});

// Usage
function App() {
  return (
    <EnhancedComponent 
      containerProps={{ 
        style: { border: '1px solid #ccc' } 
      }} 
    />
  );
}
```

## API

### useSnapshot(measured, options?)

Hook for measuring DOM element dimensions with automatic retry and resize observation.

#### Parameters

- `measured: (size: SnapshotSize | null, error: SnapshotError | null) => void`
  - Callback function that receives measurement results
  - `size`: Object with `width` and `height` properties, or `null` if measurement failed
  - `error`: Error type if measurement failed, or `null` if successful

- `options?: UseSnapshotOptions` (optional)
  - `delay?: number` - Delay in milliseconds before taking measurements (default: 0)
  - `lowerWidthBound?: number` - Minimum width required for valid measurements (default: 320)
  - `retryInit?: number` - Number of retry attempts (default: 1)
  - `loading?: boolean` - Whether the hook is in loading state
  - `error?: SnapshotError | null` - Current error state
  - `observer?: boolean` - Use ResizeObserver for automatic re-measurements (default: true)
  - `onRetry?: () => void` - Callback function called on retry attempts

#### Returns

- `containerRef: RefObject<HTMLDivElement>` - Ref to attach to the element (parent will be measured)

### Snapshot Component

React component that automatically measures its dimensions and provides them via callback.

#### Props

- `options?: WithSnapshotOptions` - Configuration options for measurement
  - `onSnapshot?: (size: SnapshotSize | null, error: SnapshotError | null) => void` - Measurement callback
  - All other options from `UseSnapshotOptions`
- `...divProps` - All standard HTML div attributes (className, style, etc.)
- `children` - Content to be wrapped and measured

#### Usage

```tsx
<Snapshot 
  options={{ onSnapshot: (size) => console.log(size) }}
  className="my-wrapper"
>
  Content to measure
</Snapshot>
```

### withSnapshot(Component, options?)

Higher-order component for adding snapshot functionality to React components.

#### Parameters

- `Component: ComponentType<WithSnapshotProps<P>>` - Component to enhance
- `options?: WithSnapshotOptions` - Same options as useSnapshot hook plus onSnapshot callback

#### Enhanced Component Props

The wrapped component receives additional props:
- `snapshot?: SnapshotSize | null` - Current measured dimensions
- `error?: SnapshotError | null` - Current error state
- `containerProps?: HTMLAttributes<HTMLDivElement>` - Props for the wrapper container

#### Error Types

- `SnapshotError.PARENT_NOT_FOUND` - Parent element not found in DOM
- `SnapshotError.INVALID_SIZE` - Element size is below the specified bounds

## License

MIT
