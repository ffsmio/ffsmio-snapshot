import { useCallback, useEffect, useRef } from "react";
import { requestTimeout } from "@ffsm/requester";

/**
 * Enum representing possible errors that can occur during snapshot operations
 */
export enum SnapshotError {
  /** Parent element not found in DOM */
  PARENT_NOT_FOUND = "PARENT_NOT_FOUND",
  /** Element size is below the specified bounds */
  INVALID_SIZE = "INVALID_SIZE",
}

/**
 * Configuration options for the useSnapshot hook
 */
export interface UseSnapshotOptions {
  /** Delay in milliseconds before taking measurements (default: 0) */
  delay?: number;
  /** Minimum width required for valid measurements (default: 320) */
  lowerWidthBound?: number;
  /** Number of retry attempts for measurements (default: 1) */
  retryInit?: number;
  /** Whether the hook is in loading state */
  loading?: boolean;
  /** Current error state */
  error?: SnapshotError | null;
  /** Whether to use ResizeObserver for automatic re-measurements (default: true) */
  observer?: boolean;
  /** Callback function called on retry attempts */
  onRetry?(): void;
}

/**
 * Represents the dimensions of a measured element
 */
export interface SnapshotSize {
  /** Width in pixels */
  width: number;
  /** Height in pixels */
  height: number;
}

/**
 * Callback function type for handling measurement results
 * @param size - The measured dimensions or null if measurement failed
 * @param error - Any error that occurred during measurement, or null if successful
 */
export type SnapshotMeasured = (size: SnapshotSize | null, error: SnapshotError | null) => void;

/**
 * React hook for measuring DOM element dimensions with automatic retry and resize observation
 * 
 * This hook provides functionality to measure the dimensions of a parent element and handle
 * various edge cases such as elements not being ready, size validation, and automatic
 * re-measurement on resize events.
 * 
 * @param measured - Callback function that receives measurement results
 * @param options - Configuration options for the hook behavior
 * 
 * @returns A ref to attach to the element you want to measure (the parent will be measured)
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const containerRef = useSnapshot(
 *     (size, error) => {
 *       if (error) {
 *         console.error('Measurement failed:', error);
 *       } else {
 *         console.log('Size:', size);
 *       }
 *     },
 *     {
 *       delay: 100,
 *       lowerWidthBound: 300,
 *       retryInit: 3,
 *       observer: true,
 *       onRetry: () => console.log('Retrying measurement...')
 *     }
 *   );
 * 
 *   return <div ref={containerRef}>Content to measure</div>;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Simple usage
 * const ref = useSnapshot((size) => {
 *   setDimensions(size);
 * });
 * ```
 */
export function useSnapshot(measured: SnapshotMeasured, options: UseSnapshotOptions = {}) {
  const {
    delay = 0,
    lowerWidthBound = 320,
    retryInit = 1,
    loading = false,
    error = null,
    onRetry,
    observer: isObserver = true
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const retryCount = useRef(0);

  const measure = useCallback(() => {
    const parent = containerRef.current?.parentElement;

    if (!parent) {
      measured(null, SnapshotError.PARENT_NOT_FOUND);
      return;
    }

    const width = parent.clientWidth;
    const height = parent.clientHeight;

    if (width >= lowerWidthBound) {
      measured({ width, height }, null);
    } else if (retryCount.current < retryInit) {
      retryCount.current++;
      onRetry?.();
      requestTimeout(measure, delay);
    } else {
      measured(null, SnapshotError.INVALID_SIZE);
    }
  }, [delay, lowerWidthBound, retryInit, measured, onRetry]);

  useEffect(() => {
    retryCount.current = 0;
    return requestTimeout(measure, delay).cancel;
  }, [measure]);

  useEffect(() => {
    if (!isObserver || loading || error || !containerRef.current?.parentElement || typeof ResizeObserver === "undefined") {
      return;
    }

    const parent = containerRef.current?.parentElement;
    const observer = new ResizeObserver(() => {
      retryCount.current = 0;
      measure();
    });

    observer.observe(parent);
    return observer.disconnect.bind(observer);
  }, [loading, error, isObserver, measure])

  return containerRef;
}
