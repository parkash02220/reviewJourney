import { Box, Typography } from "@mui/material";
import DecisionCard from "../Components/DecisionCard";
import ImageBox from "../Components/ImageBox";
import HobbiesTags from "../Components/HobbiesTags";
import ProgressHeader from "../Components/ProgressHeader";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useMemo } from "react";
export default function SingleStepCard({
  summary,
  user,
  step,
  isFirstStep,
  bottomeRef,
  topRef,
}) {
  const date = useMemo(() => {
    return step.timestamp
      ? new Date(step.timestamp).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";
  }, [step]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      minHeight={0}
      bgcolor="black"
      pb={4}
    >
      <Box flex="0 0 auto">
        <ProgressHeader />
      </Box>

      <Box
        className="scrollable-content"
        flex="1 1 auto"
        minHeight={0}
        overflow="auto"
        sx={{
          paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box ref={topRef} sx={{ height: "2px", width: "100%" }} />

        {step.img && <ImageBox imgSrc={step.img} name={user?.name} />}

        <Box
          mt={4}
          display={"flex"}
          flexDirection={"column"}
          gap={1}
          justifyContent={"flex-start"}
          paddingInline={2}
        >
          {(user?.name || user?.age) && (
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <AccountCircleIcon sx={{ color: "green", fontSize: 20 }} />
              <Typography color="#FFFFFF" fontWeight={700} fontSize={18}>{`${
                user?.name || ""
              }, ${user?.age || ""}`}</Typography>
            </Box>
          )}
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {step?.location && (
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <LocationOnIcon sx={{ color: "green", fontSize: 16 }} />
                <Typography color="#FFFFFF" fontSize={14}>
                  {step?.location || ""}
                </Typography>
              </Box>
            )}
            {date && (
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon sx={{ color: "green", fontSize: 16 }} />
                  <Typography fontSize={14} color="#FFFFFF">
                    {date || ""}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {step.event && (
          <Box paddingInline={2}>
            <Typography fontSize={14} color="#FFFFFF">
              {step.event}
            </Typography>
          </Box>
        )}
        <Box ref={bottomeRef} sx={{ height: "2px", width: "100%" }} />
      </Box>
    </Box>
  );
}
