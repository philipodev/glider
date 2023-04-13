import { MutableRefObject, useEffect } from 'react';

type Callback<T extends Event> = (event: T) => void;

export function useRefEvent<T extends HTMLElement, E extends Event>(
  ref: MutableRefObject<T | null>,
  event: string,
  callback: Callback<E>
): void {
  useEffect(() => {
    const element = ref.current;

    if (element) {
      element.addEventListener(event, callback as EventListener);
    }

    return () => {
      if (element) {
        element.removeEventListener(event, callback as EventListener);
      }
    };
  }, [ref, event, callback]);
}

export function useWindowEvent<E extends Event>(
  event: string,
  callback: Callback<E>
) {
  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR

    window.addEventListener(event, callback as EventListener);

    return () => {
      window.removeEventListener(event, callback as EventListener);
    };
  }, [event, callback]);
}
