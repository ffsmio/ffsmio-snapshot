import { ComponentType, DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { SnapshotError, SnapshotSize } from "./use-snapshot";
import { Snapshot, WithSnapshotOptions } from "./snapshot";

/**
 * Interface for components that can receive container props
 * Used to ensure the wrapped component can handle containerProps
 */
export interface PropsWithContainer {
  /** Optional props to be passed to the wrapper container div */
  containerProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

/**
 * Props type that includes snapshot data for enhanced components
 * @template P - Original component props type
 */
export type WithSnapshotProps<P = {}> = P & {
  /** Current measured dimensions of the parent element, null if measurement failed */
  snapshot?: SnapshotSize | null;
  /** Current error state, null if no error occurred */
  error?: SnapshotError | null;
};

/**
 * Higher-Order Component that adds snapshot measurement capabilities to any React component
 * 
 * This HOC wraps a component with measurement functionality, automatically measuring the 
 * dimensions of the wrapper container and passing the results as props to the wrapped component.
 * The wrapped component will receive `snapshot` and `error` props containing the measurement results.
 * 
 * @template P - The props type of the component being wrapped (must extend PropsWithContainer)
 * 
 * @param Component - The React component to enhance with snapshot capabilities
 * @param options - Configuration options for the measurement behavior (same as useSnapshot options)
 * 
 * @returns An enhanced component that includes snapshot measurement functionality
 * 
 * @example
 * ```tsx
 * // Define your component
 * interface MyComponentProps {
 *   title: string;
 *   snapshot?: SnapshotSize | null;
 *   error?: SnapshotError | null;
 *   containerProps?: HTMLAttributes<HTMLDivElement>;
 * }
 * 
 * function MyComponent({ title, snapshot, error }: MyComponentProps) {
 *   if (error) {
 *     return <div>Error: {error}</div>;
 *   }
 * 
 *   return (
 *     <div>
 *       <h1>{title}</h1>
 *       {snapshot && (
 *         <p>Size: {snapshot.width}x{snapshot.height}</p>
 *       )}
 *     </div>
 *   );
 * }
 * 
 * // Enhance with snapshot capabilities
 * const EnhancedComponent = withSnapshot(MyComponent, {
 *   delay: 100,
 *   lowerWidthBound: 300,
 *   observer: true,
 *   onRetry: () => console.log('Retrying...')
 * });
 * 
 * // Usage
 * function App() {
 *   return (
 *     <EnhancedComponent 
 *       title="My Title"
 *       containerProps={{ 
 *         style: { border: '1px solid #ccc', padding: '10px' } 
 *       }} 
 *     />
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Simple usage without options
 * const SimpleEnhanced = withSnapshot(MyComponent);
 * ```
 */
export function withSnapshot<P extends PropsWithContainer>(Component: ComponentType<WithSnapshotProps<P>>, options?: WithSnapshotOptions) {
  const WithSnapshot = function WithSnapshot(props: P) {
    const { containerProps = {}, ...remain } = props;
    const [snapshot, setSnapshot] = useState<SnapshotSize | null>(null);
    const [error, setError] = useState<SnapshotError | null>(null);

    const snapshotOptions: WithSnapshotOptions = {
      ...options,
      onSnapshot: options?.onSnapshot || ((size, error) => {
        setSnapshot(size);
        setError(error);
      })
    };

    return (
      <Snapshot {...containerProps} options={snapshotOptions}>
        <Component
          {...remain as P}
          snapshot={snapshot}
          error={error}
        />
      </Snapshot>
    );
  };

  WithSnapshot.displayName = `WithSnapshot(${Component.displayName || Component.name || 'Component'})`;
  return WithSnapshot;
}

