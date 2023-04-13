import { PropsWithChildren, useContext, useRef } from 'react';
import { GliderContext } from '../Glider/GliderContext';
import styles from './Glider.module.scss';

export interface GliderSlideProps {
  className?: string;
}

export function GliderSlide(props: PropsWithChildren<GliderSlideProps>) {
  const { className, children } = props;

  const {} = useContext(GliderContext);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={[styles.slide, className].join(' ')}>
      {children}
    </div>
  );
}
