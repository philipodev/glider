import { useState, useEffect, MutableRefObject } from 'react';

type ElementSize = {
  width: number;
  height: number;
};

export function useElementSize<T extends HTMLElement>(
  ref: MutableRefObject<T | null>
): ElementSize {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const updateSize = () => {
      setSize({
        width: element.clientWidth,
        height: element.clientHeight,
      });
    };

    const resizeObserver = new ResizeObserver(updateSize);

    resizeObserver.observe(element);
    updateSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return size;
}
