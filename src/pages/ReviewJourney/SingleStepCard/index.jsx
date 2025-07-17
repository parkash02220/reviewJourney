import React, { useMemo, useState, useRef, useLayoutEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ImageBox from "../Components/ImageBox";
import ProgressHeader from "../Components/ProgressHeader";
import Header from "../Components/Header";

export default function SingleStepCard({ user, step }) {
  const [showMore, setShowMore] = useState(false);
  const contentBoxRef = useRef(null);
  const imageBoxRef = useRef(null);
  const cardRef = useRef(null);
  const [lockedImageHeight, setLockedImageHeight] = useState(null);
  const [overflowShift, setOverflowShift] = useState(0);

  const MAX_PREVIEW_LENGTH = 135;

  const date = useMemo(() => {
    if (!step?.timestamp) return "";
    return new Date(step.timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [step?.timestamp]);

  const hasLongEvent = step?.event?.length > MAX_PREVIEW_LENGTH;
  const previewText = step?.event?.slice(0, MAX_PREVIEW_LENGTH);

  useLayoutEffect(() => {
    if (!imageBoxRef?.current || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = entry?.contentRect?.height;
        if (!isNaN(height) && height > 0) {
          setLockedImageHeight(height);
        }
      }
    });

    observer.observe(imageBoxRef?.current);
    return () => observer.disconnect();
  }, []);

  const handleToggleShowMore = (e) => {
    e.stopPropagation();
    const next = !showMore;
    setShowMore(next);

    requestAnimationFrame(() => {
      setTimeout(() => {
        const cardBottom = cardRef.current?.getBoundingClientRect().bottom || 0;
        const contentBottom =
          contentBoxRef.current?.getBoundingClientRect().bottom || 0;

        const overflow = contentBottom - cardBottom;
        setOverflowShift(next && overflow > 8 ? overflow : 0);
      }, 10);
    });
  };

  return (
    <Box
      ref={cardRef}
      position="relative"
      display="flex"
      flexDirection="column"
      height="100%"
      bgcolor="black"
      onClick={() => {
        if (showMore) setShowMore(false);
      }}
    >
      <Box flex="0 0 auto">
        <Header />
      </Box>
      <Box flex="0 0 auto">
        <ProgressHeader />
      </Box>

      {step?.img && (
        <ImageBox
          ref={imageBoxRef}
          imgSrc={step.img}
          altText={user?.name}
          lockedHeight={lockedImageHeight}
        >
          {showMore && overflowShift > 0 && (
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: `${overflowShift}px`,
                background:
                  "linear-gradient(to top, rgba(15, 15, 15, 0.6), rgba(15, 15, 15, 0.3))",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
                boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.3)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
          )}
        </ImageBox>
      )}

      <Box flex="1 1 auto">
        <Box
          ref={contentBoxRef}
          mt={1}
          px={2}
          display="flex"
          flexDirection="column"
          gap={1}
          sx={{
            transform:
              showMore && overflowShift > 0
                ? `translateY(-${overflowShift}px)`
                : "none",
            transition: "transform 0.3s ease",
            zIndex: 2,
            position: "relative",
            height: "100%",
          }}
        >
          {(user?.name || user?.age) && (
            <Box display="flex" alignItems="center" gap={1}>
              <AccountCircleIcon sx={{ color: "green", fontSize: 20 }} />
              <Typography color="#FFFFFF" fontWeight={700} fontSize="18px">
                {`${user?.name || ""}${user?.age ? `, ${user.age}` : ""}`}
              </Typography>
            </Box>
          )}

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {step?.location && (
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOnIcon sx={{ color: "green", fontSize: 16 }} />
                <Typography color="#FFFFFF" fontSize="14px">
                  {step.location}
                </Typography>
              </Box>
            )}
            {date && (
              <Box display="flex" alignItems="center" gap={1}>
                <AccessTimeIcon sx={{ color: "green", fontSize: 16 }} />
                <Typography color="#FFFFFF" fontSize="14px">
                  {date}
                </Typography>
              </Box>
            )}
          </Box>

          {step?.event && (
            <Box>
              <Box
                sx={{
                  visibility: "hidden",
                  position: "absolute",
                  pointerEvents: "none",
                  height: 0,
                }}
              >
                <Typography fontSize="14px" whiteSpace="pre-line" data-measure>
                  {`${previewText}...`}
                </Typography>
                <Typography fontSize="14px" whiteSpace="pre-line" data-measure>
                  {step.event}
                </Typography>
              </Box>

              <Typography fontSize="14px" color="#FFFFFF" whiteSpace="pre-line">
                {showMore || !hasLongEvent ? step.event : `${previewText}...`}
              </Typography>

              {hasLongEvent && (
                <Button
                  aria-label={
                    showMore ? "Collapse full text" : "Expand full text"
                  }
                  onClick={handleToggleShowMore}
                  sx={{
                    fontSize: "14px",
                    p: 0,
                    color: "#FFFFFF",
                    textTransform: "none",
                  }}
                >
                  {showMore ? "See less" : "See more"}
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
