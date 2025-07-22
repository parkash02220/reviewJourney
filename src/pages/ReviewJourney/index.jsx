import React, { useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";
import useGetJourneyData from "../../hooks/useGetJourneyData";
import SingleStepCard from "./SingleStepCard";
import Loader from "../../components/Loader/Loader";

export default function ReviewJourney() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const baseUrl = queryParams.get("base_url") || "";
  const userId = queryParams.get("user_id") || "";
  const journeyId = queryParams.get("journey_id") || "";

  const { data, loading, error, getJourneyData, hasFetchedDataOnce } =
    useGetJourneyData();

  const MAX_STEPS_PER_SUMMARY = 3;

  useEffect(() => {
    if (baseUrl && userId && journeyId && !hasFetchedDataOnce) {
      getJourneyData(baseUrl, userId, journeyId);
    }
  }, [baseUrl, userId, journeyId, hasFetchedDataOnce, getJourneyData]);

  const journeyItems = useMemo(() => {
    if (!data?.summary?.length) return [];

    return data.summary
      .filter((s) => s?.journey_details)
      .flatMap((summary) => {
        const journey = summary.journey_details;

        return Array.from({ length: MAX_STEPS_PER_SUMMARY }, (_, idx) => {
          const stepIndex = idx + 1;

          const img = journey?.[`img_${stepIndex}`];
          const event = journey?.[`event_${stepIndex}`];
          const timestamp = journey?.[`timestamp_${stepIndex}`];
          const location = journey?.[`location_${stepIndex}`];

          return img || event
            ? {
                summary,
                user: data?.user,
                step: { img, event, timestamp, location },
                indexInSummary: idx,
              }
            : null;
        }).filter(Boolean);
      });
  }, [data]);

  if (loading || !hasFetchedDataOnce) {
    return (
      <Box width="100vw" height="100dvh">
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        width="100vw"
        height="100dvh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        px={2}
      >
        <Typography fontSize={24} fontWeight={800}>
          Something went wrong…
        </Typography>
        <Typography fontSize={18}>{error}</Typography>
      </Box>
    );
  }

  if (!journeyItems.length) {
    return (
      <Box
        width="100vw"
        height="100dvh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontSize={24} fontWeight={800}>
          No data to show…
        </Typography>
      </Box>
    );
  }

  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      mousewheel={{ forceToAxis: true, sensitivity: 1 }}
      modules={[Mousewheel]}
      style={{ height: "100dvh" }}
    >
      {journeyItems.map((item, idx) => (
        <SwiperSlide key={idx}>
          <Box
            width="100%"
            maxWidth={{ xs: "100%", sm: "75%", md: "50%", lg: "33.33%" }}
            height="100%"
            mx="auto"
          >
            <SingleStepCard
              summary={item.summary}
              user={item.user}
              step={item.step}
              isFirstStep={item.indexInSummary === 0}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
