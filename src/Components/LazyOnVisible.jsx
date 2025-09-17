// src/LazyOnVisible.jsx
import { useEffect, useRef, useState } from 'react';

export default function LazyOnVisible({ children, rootMargin = '400px' }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some(e => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return <div ref={ref}>{show ? children : null}</div>;
}
