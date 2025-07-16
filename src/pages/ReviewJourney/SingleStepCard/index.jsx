import React, { useMemo, useState, useRef, useLayoutEffect, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ImageBox from "../Components/ImageBox";
import ProgressHeader from "../Components/ProgressHeader";
import Header from "../Components/Header";

export default function SingleStepCard({ summary, user, step }) {
  const [showMore, setShowMore] = useState(false);
  const slideRef = useRef(null);
  const contentRef = useRef(null);
  const imageBoxRef = useRef(null);
  const [lockedImageHeight, setLockedImageHeight] = useState(null);

  const MAX_PREVIEW_LENGTH = 135;

  const date = useMemo(
    () =>
      step?.timestamp
        ? new Date(step.timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : "",
    [step?.timestamp]
  );

  const hasLongEvent = step?.event?.length > MAX_PREVIEW_LENGTH;
  const previewText = hasLongEvent ? step?.event?.slice(0, MAX_PREVIEW_LENGTH) : step?.event || "";

useLayoutEffect(() => {
  if (!imageBoxRef.current) return;
  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      setLockedImageHeight(entry.contentRect.height);
    }
  });
  observer.observe(imageBoxRef.current);

  return () => observer.disconnect();
}, []);

  useLayoutEffect(() => {
    const slide = slideRef.current;
    const content = contentRef.current;
    if (!slide || !content) return;

    if (showMore) {
      slide.scrollTo({
        top: content.offsetTop + content.offsetHeight - slide.clientHeight,
        behavior: "smooth"
      });
    } else {
      slide.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showMore]);

  const handleToggleShowMore = (e) => {
    e.stopPropagation();
    setShowMore(prev => !prev);
  };

  return (
    <Box
      ref={slideRef}
      display="flex"
      flexDirection="column"
      height="100%"
      overflow="auto"
      bgcolor="black"
      onClick={() => { if (showMore) setShowMore(false); }}
    >
       <Box flex="0 0 auto"><Header /></Box>
      <Box flex="0 0 auto"><ProgressHeader /></Box>

      {step?.img && (
        <ImageBox
          ref={imageBoxRef}
          imgSrc={step.img}
          altText={user?.name}
          lockedHeight={lockedImageHeight}
        />
      )}

      <Box flex="0 0 auto">
        <Box mt={1} px={2} display="flex" flexDirection="column" gap={1}>
          {(user?.name || user?.age) && (
            <Box display="flex" alignItems="center" gap={1}>
              <AccountCircleIcon sx={{ color: "green", fontSize: 20 }} />
              <Typography color="#FFFFFF" fontWeight={700} fontSize={18}>
                {`${user?.name || ""}${user?.age ? `, ${user.age}` : ""}`}
              </Typography>
            </Box>
          )}

          <Box display="flex" justifyContent="space-between" alignItems="center">
            {step?.location && (
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOnIcon sx={{ color: "green", fontSize: 16 }} />
                <Typography color="#FFFFFF" fontSize={14}>{step.location}</Typography>
              </Box>
            )}
            {date && (
              <Box display="flex" alignItems="center" gap={1}>
                <AccessTimeIcon sx={{ color: "green", fontSize: 16 }} />
                <Typography color="#FFFFFF" fontSize={14}>{date}</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {step?.event && (
          <Box
            ref={contentRef}
            px={2}
            mt={1}
            sx={{
              maxHeight: showMore ? "none" : 100,
              overflow: "hidden"
            }}
          >
            <Typography fontSize={14} color="#FFFFFF" whiteSpace="pre-line">
              {showMore || !hasLongEvent ? step.event : `${previewText}...`}
            </Typography>

            {hasLongEvent && (
              <Button
                onClick={handleToggleShowMore}
                sx={{ fontSize: 14, p: 0, color: "#FFFFFF", textTransform: "none" }}
              >
                {showMore ? "See less" : "See more"}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
