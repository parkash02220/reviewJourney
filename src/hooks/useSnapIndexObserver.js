import { useEffect, useState } from "react";
export default function useSnapIndexObserver(itemCount, containerRef) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setCurrentIndex(index);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      }
    );

    const children = containerRef.current.children;
    for (let i = 0; i < children.length; i++) {
      observer.observe(children[i]);
    }

    return () => observer.disconnect();
  }, [itemCount, containerRef]);

  return currentIndex;
}
