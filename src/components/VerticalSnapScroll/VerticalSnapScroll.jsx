import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

export default function VerticalSnapScroll({
  items = [],
  renderItem,
  containerSx = {},
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const isAnimatingRef = useRef(false);

  const direction = currentIndex > prevIndex ? 1 : -1;

  const goToNext = () => {
    if (isAnimatingRef.current) return;
    if (currentIndex < items.length - 1) {
      setPrevIndex(currentIndex);
      setCurrentIndex((i) => i + 1);
      isAnimatingRef.current = true;
      setTimeout(() => (isAnimatingRef.current = false), 500);
    }
  };

  const goToPrev = () => {
    if (isAnimatingRef.current) return;
    if (currentIndex > 0) {
      setPrevIndex(currentIndex);
      setCurrentIndex((i) => i - 1);
      isAnimatingRef.current = true;
      setTimeout(() => (isAnimatingRef.current = false), 500);
    }
  };

  return (
    <Box
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
          variants={{
            enter: (dir) => ({ y: dir > 0 ? 100 : -100, opacity: 0 }),
            center: { y: 0, opacity: 1 },
            exit: (dir) => ({ y: dir > 0 ? -100 : 100, opacity: 0 }),
          }}
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
          {renderItem(items[currentIndex], currentIndex, {
            onReachTop: goToPrev,
            onReachBottom: goToNext,
          })}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
