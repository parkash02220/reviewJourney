import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion, animate } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import ImageBox from "../Components/ImageBox";
import ProgressHeader from "../Components/ProgressHeader";

export default function SingleStepCard({ summary, user, step, isFirstStep }) {
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);

  const date = useMemo(() => {
    return step.timestamp
      ? new Date(step.timestamp).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";
  }, [step]);

  const toggleShowMore = (e) => {
    e.stopPropagation();
    setShowMore((prev) => !prev);
  };

  const closeShowMore = () => {
    if (showMore) setShowMore(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      minHeight={0}
      bgcolor="black"
    >
      <Box flex="0 0 auto">
        <ProgressHeader />
      </Box>

      <Box
        flex="1 1 auto"
        minHeight={0}
        onClick={closeShowMore}
      >
        {step?.img && <ImageBox imgSrc={step.img} name={user?.name} />}

        <Box mt={1} display="flex" flexDirection="column" gap={1} px={2}>
          {(user?.name || user?.age) && (
            <Box display="flex" alignItems="center" gap={1}>
              <AccountCircleIcon sx={{ color: "green", fontSize: 20 }} />
              <Typography color="#FFFFFF" fontWeight={700} fontSize={18}>
                {`${user?.name || ""}${user?.age ? `, ${user.age}` : ""}`}
              </Typography>
            </Box>
          )}

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {step?.location && (
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOnIcon sx={{ color: "green", fontSize: 16 }} />
                <Typography color="#FFFFFF" fontSize={14}>
                  {step.location}
                </Typography>
              </Box>
            )}
            {date && (
              <Box display="flex" alignItems="center" gap={1}>
                <AccessTimeIcon sx={{ color: "green", fontSize: 16 }} />
                <Typography fontSize={14} color="#FFFFFF">
                  {date}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {step?.event && (
          <Box px={2} mt={1} ref={contentRef}>
            <Typography fontSize={14} color="#FFFFFF">
              {showMore ? step.event : `${step.event.slice(0, 100)}...`}
            </Typography>

            {step.event.length > 100 && (
              <Button
                onClick={toggleShowMore}
                sx={{
                  fontSize: 14,
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

        <Box
          className="bottom-ref-box"
          sx={{ height: "2px", width: "100%" }}
        />
      </Box>
    </Box>
  );
}
