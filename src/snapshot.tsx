import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithChildren, useCallback } from "react";
import { SnapshotMeasured, useSnapshot, UseSnapshotOptions } from "./use-snapshot";

/**
 * Extended options for snapshot functionality with callback support
 */
export interface WithSnapshotOptions extends UseSnapshotOptions {
  /** Callback function that receives measurement results */
  onSnapshot?: SnapshotMeasured;
}

/**
 * Props for the Snapshot component
 */
export interface SnapshotProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /** Configuration options for snapshot measurement */
  options?: WithSnapshotOptions;
}

/**
 * Snapshot component that automatically measures its dimensions and provides them to children
 * 
 * This component wraps its children in a div that measures its own dimensions automatically.
 * It's useful when you want to add measurement functionality to any content without using hooks or HOCs.
 * 
 * @param props - Component props including standard div props and snapshot options
 * @param ref - Forward ref to the wrapper div element
 * 
 * @returns A div element that measures its dimensions automatically
 * 
 * @example
 * ```tsx
 * import { Snapshot } from '@ffsm/snapshot';
 * 
 * function MyComponent() {
 *   return (
 *     <Snapshot
 *       options={{
 *         onSnapshot: (size, error) => {
 *           if (size) {
 *             console.log(`Measured: ${size.width}x${size.height}`);
 *           }
 *         },
 *         delay: 100,
 *         observer: true
 *       }}
 *       style={{ border: '1px solid #ccc', padding: '10px' }}
 *     >
 *       <h1>Content to measure</h1>
 *       <p>This container will be measured automatically</p>
 *     </Snapshot>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // With ref forwarding
 * const ref = useRef<HTMLDivElement>(null);
 * 
 * <Snapshot 
 *   ref={ref}
 *   options={{ onSnapshot: (size) => console.log(size) }}
 * >
 *   Content
 * </Snapshot>
 * ```
 * 
 * @example
 * ```tsx
 * // Simple usage without options
 * <Snapshot>
 *   <div>Content that will be measured</div>
 * </Snapshot>
 * ```
 */

export const Snapshot = forwardRef<HTMLDivElement, PropsWithChildren<SnapshotProps>>(
  function Snapshot(props, ref) {
    const { options, ...divProps } = props;
    const {
      onSnapshot = () => {},
      ...rest
    } = options || {};
    const containerRef = useSnapshot(onSnapshot, rest);
    const combineRef = useCallback((instance: HTMLDivElement | null) => {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref && typeof ref === "object" && "current" in ref) {
        ref.current = instance;
      }

      containerRef.current = instance;
    }, [ref, containerRef]);

    return (
      <div {...divProps} ref={combineRef}>
        {props.children}
      </div>
    );
  }
);

Snapshot.displayName = "Snapshot";
