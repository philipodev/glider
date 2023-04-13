import * as React from 'react';
import {
  PropsWithChildren,
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { GliderContext, GliderContextValue } from '../Glider/GliderContext';
import { useElementSize } from '../hooks/use-element-size';
import { useRefEvent, useWindowEvent } from '../hooks/use-ref-event';
import styles from './Glider.module.scss';

export interface GliderProps {
  scrollThreshold?: number;
  spaceBetween?: number;
}

export function Glider(props: PropsWithChildren<GliderProps>) {
  const { children, scrollThreshold = 30, spaceBetween = 0 } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(ref);

  const [index, setIndex] = useState(0);
  const [x, setX] = useState(-1);
  const [tempX, setTempX] = useState(0);

  const next = useCallback(() => setIndex((i) => i + 1), [setIndex]);
  const prev = useCallback(() => setIndex((i) => i - 1), [setIndex]);

  useRefEvent(ref, 'mousedown', (e: MouseEvent) => {
    setX(e.x);
  });

  useWindowEvent('mouseup', (e: MouseEvent) => {
    setX(-1);
    setTempX(0);

    const direction = x > e.x ? 1 : -1;
    const pixelsMoved = Math.abs(x - e.x);
    const percentMoved = pixelsMoved / width;

    console.info(percentMoved);

    if (percentMoved > scrollThreshold / 100) {
      direction > 0 ? next() : prev();
    }
  });

  useRefEvent(ref, 'mousemove', (e: MouseEvent) => {
    if (x < 0) return;

    setTempX(e.x - x);
  });

  const translateX = useMemo(() => {
    return index * width - tempX + index * spaceBetween;
  }, [width, index, tempX]);

  const contextValue: GliderContextValue = {
    index,
    count: React.Children.count(children),
    size: {
      width,
      height,
    },

    next,
    prev,
  };

  return (
    <GliderContext.Provider value={contextValue}>
      <>
        <div ref={ref} className={styles.slider}>
          <div
            className={styles.inner}
            style={{
              gap: spaceBetween,
              transform: `translate(-${translateX}px, 0)`,
            }}
          >
            {children}
          </div>
        </div>

        <div>
          <GliderContext.Consumer>
            {(value) => (
              <pre>
                {JSON.stringify(
                  {
                    //
                    translateX,
                    tempX,
                    x,
                    ...value,
                  },
                  undefined,
                  2
                )}
              </pre>
            )}
          </GliderContext.Consumer>
        </div>
      </>
    </GliderContext.Provider>
  );
}
