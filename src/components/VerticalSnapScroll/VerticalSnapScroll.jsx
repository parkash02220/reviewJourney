import React, { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

export default function VerticalSnapScroll({
  items = [],
  renderItem,
  containerSx = {},
}) {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const isAnimatingRef = useRef(false);

  const direction = currentIndex > prevIndex ? 1 : -1;

  const variants = {
    enter: (dir) => ({
      y: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      y: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const canScrollFurther = (el, deltaY) => {
    if (!el) return false;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;
    if (deltaY > 0) {
      return scrollTop + clientHeight < scrollHeight;
    } else {
      return scrollTop > 0;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      const scrollable = e.target.closest(".scrollable-content");
      if (scrollable && canScrollFurther(scrollable, e.deltaY)) {
        return;
      }

      e.preventDefault();
      if (isAnimatingRef.current) return;

      const newDirection = e.deltaY > 0 ? 1 : -1;
      let next = currentIndex + newDirection;
      next = Math.max(0, Math.min(items.length - 1, next));

      if (next !== currentIndex) {
        setPrevIndex(currentIndex);
        setCurrentIndex(next);
        isAnimatingRef.current = true;
        setTimeout(() => (isAnimatingRef.current = false), 500);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [currentIndex, items.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let startY = 0;
    let deltaY = 0;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      deltaY = e.touches[0].clientY - startY;
    };

    const handleTouchEnd = () => {
      const newDirection = deltaY < 0 ? 1 : -1;
      let next = currentIndex + newDirection;
      next = Math.max(0, Math.min(items.length - 1, next));

      const scrollable = container.querySelector(".scrollable-content");
      if (scrollable && canScrollFurther(scrollable, -deltaY)) {
        return;
      }

      if (Math.abs(deltaY) > 50 && !isAnimatingRef.current) {
        setPrevIndex(currentIndex);
        setCurrentIndex(next);
        isAnimatingRef.current = true;
        setTimeout(() => (isAnimatingRef.current = false), 500);
      }
      startY = deltaY = 0;
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentIndex, items.length]);

  return (
    <Box
      ref={containerRef}
      sx={{
        height: "100dvh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        ...containerSx,
      }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {renderItem(items[currentIndex], currentIndex)}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
