import { useEffect, useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import useGetJourneyData from "../../hooks/useGetJourneyData";
import VerticalSnapScroll from "../../components/VerticalSnapScroll";
import Header from "./Components/Header";
import Loader from "../../components/Loader/Loader";
import SingleStepCard from "./SingleStepCard";

export default function ReviewJourney() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const baseUrl = queryParams.get("base_url");
  const user_id = queryParams.get("user_id");
  const journey_id = queryParams.get("journey_id");

  const { data, loading, error, getJourneyData, hasFetchedDataOnce } =
    useGetJourneyData();

  useEffect(() => {
    if (baseUrl && user_id && journey_id && !hasFetchedDataOnce) {
      getJourneyData(baseUrl, user_id, journey_id);
    }
  }, [baseUrl, user_id, journey_id, hasFetchedDataOnce]);

  const items = useMemo(() => {
    return (
      data?.summary
        ?.filter((summary) => summary?.journey_details)
        ?.flatMap((summary) => {
          const journey = summary.journey_details;
          const maxSteps = 3;
          const steps = [];

          for (let i = 1; i <= maxSteps; i++) {
            const img = journey?.[`img_${i}`];
            const event = journey?.[`event_${i}`];
            const timestamp = journey?.[`timestamp_${i}`];
            const location = journey?.[`location_${i}`];

            if (img || event) {
              steps.push({
                summary,
                user: data?.user,
                step: { img, event, timestamp, location },
                indexInSummary: i - 1,
              });
            }
          }
          return steps;
        }) || []
    );
  }, [data]);

  if (error) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography fontSize={24} fontWeight={800}>
          Something went wrong...
        </Typography>
        <Typography fontSize={18} fontWeight={500}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (loading || !hasFetchedDataOnce) {
    return (
      <Box width="100vw" height="100vh">
        <Loader />
      </Box>
    );
  }

  if (!loading && hasFetchedDataOnce && items.length === 0) {
    return (
      <Box width="100vw" height="100vh">
        <Typography fontSize={24} fontWeight={800}>
          No data to show...
        </Typography>
      </Box>
    );
  }

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Header />
      <VerticalSnapScroll
        items={items}
        renderItem={(item, index) => (
          <Grid
            container
            spacing={2}
            sx={{
              height: "calc(100dvh - 56px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid size={{ xs: 0, sm: 1, md: 2, lg: 3, xl: 4 }}></Grid>
            <Grid
              size={{ xs: 12, sm: 10, md: 8, lg: 6, xl: 4 }}
              height={"100%"}
            >
              <SingleStepCard
                summary={item.summary}
                user={item.user}
                step={item.step}
                isFirstStep={item.indexInSummary === 0}
              />
            </Grid>
            <Grid size={{ xs: 0, sm: 1, md: 2, lg: 3, xl: 4 }}></Grid>
          </Grid>
        )}
        onIndexChange={(index) => console.log("Visible index:", index)}
        containerSx={{
          height: "calc(100dvh - 56px)",
        }}
      />
    </Box>
  );
}
