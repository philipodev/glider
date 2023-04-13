import { createContext } from 'react';

export interface GliderContextValue {
  index: number;
  count: number;
  size: {
    width: number;
    height: number;
  };

  next: () => void;
  prev: () => void;
}

export const GliderContext = createContext<GliderContextValue>(null as any);
