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
    enter: (dir) => ({ y: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir) => ({ y: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  /** Check if an element can scroll further in the given deltaY direction */
  const canScrollFurther = (el, deltaY) => {
    if (!el) return false;
    const { scrollTop, scrollHeight, clientHeight } = el;
    return deltaY > 0
      ? scrollTop + clientHeight < scrollHeight // can scroll down
      : scrollTop > 0; // can scroll up
  };

  /** Snap to given index safely */
  const snapToIndex = (next) => {
    next = Math.max(0, Math.min(items.length - 1, next));
    if (next !== currentIndex) {
      setPrevIndex(currentIndex);
      setCurrentIndex(next);
      isAnimatingRef.current = true;
      setTimeout(() => (isAnimatingRef.current = false), 500);
    }
  };

  /** Handle mouse wheel (desktop) */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      const scrollable = container.querySelector(".scrollable-content");
      if (scrollable && canScrollFurther(scrollable, e.deltaY)) {
        // let inner content scroll
        return;
      }

      if (e.cancelable) e.preventDefault();
      if (isAnimatingRef.current) return;

      const newDirection = e.deltaY > 0 ? 1 : -1;
      snapToIndex(currentIndex + newDirection);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [currentIndex, items.length]);

  /** Handle touch (mobile) */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startY = 0;
    let deltaY = 0;
    let startTime = 0;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      deltaY = 0;
      startTime = Date.now();
    };

    const handleTouchMove = (e) => {
      deltaY = e.touches[0].clientY - startY;
      const scrollable = container.querySelector(".scrollable-content");

      if (scrollable) {
        const goingDown = deltaY < 0;
        const canScroll = canScrollFurther(scrollable, -deltaY);

        if (canScroll) {
          // inner content can still scroll → let native scroll happen
          return;
        } else if (e.cancelable) {
          // can't scroll further → block native scroll to allow swipe
          e.preventDefault();
        }
      } else if (e.cancelable) {
        e.preventDefault(); // no scrollable content → treat as swipe
      }
    };

    const handleTouchEnd = () => {
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000; // seconds
      const velocity = deltaY / duration;
      const newDirection = deltaY < 0 ? 1 : -1;

      const fastFlick = Math.abs(velocity) > 1000;
      const longSwipe = Math.abs(deltaY) > 50;

      const scrollable = container.querySelector(".scrollable-content");

      if (scrollable) {
        const canScroll = canScrollFurther(scrollable, -deltaY);
        if (!canScroll && (fastFlick || longSwipe) && !isAnimatingRef.current) {
          snapToIndex(currentIndex + newDirection);
        }
        // else: user was still able to scroll inner → do nothing
      } else {
        if ((fastFlick || longSwipe) && !isAnimatingRef.current) {
          snapToIndex(currentIndex + newDirection);
        }
      }

      startY = 0;
      deltaY = 0;
      startTime = 0;
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
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
        touchAction: "none",
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
