import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  value: number | null;
  suffix: string;
}

/** Angka count-up saat terlihat. value null = placeholder "—". */
export function CountUp({ value, suffix }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === null || !inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => setDisplay(Math.round(v))
    });
    return () => controls.stop();
  }, [value, inView, reduce]);

  if (value === null) {
    return (
      <span ref={ref} aria-label="Belum diisi">
        —
      </span>);

  }

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-[0.5em] font-bold">{suffix}</span>
    </span>);

}