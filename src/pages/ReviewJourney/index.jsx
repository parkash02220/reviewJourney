import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import Header from "./Card/Header";
import useGetJourneyData from "../../hooks/useGetJourneyData";
import Card from "./Card";
import Loader from "../../components/Loader/Loader";

export default function ReviewJourney() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const baseUrl = queryParams.get("base_url");
  const user_id = queryParams.get("user_id");
  const journey_id = queryParams.get("journey_id");

  const { data, loading, error, getJourneyData, hasFetchedDataOnce } = useGetJourneyData();

  useEffect(() => {
    if (baseUrl && user_id && journey_id && !hasFetchedDataOnce) {
      getJourneyData(baseUrl, user_id, journey_id);
    }
  }, [baseUrl, user_id, journey_id]);

  if (error) {
    return (
      <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Typography fontSize={24} fontWeight={800}>Something went wrong...</Typography>
        <Typography fontSize={18} fontWeight={500}>{error}</Typography>
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

  if (!loading && hasFetchedDataOnce && !data) {
    return (
      <Box width="100vw" height="100vh">
        <Typography fontSize={24} fontWeight={800}>No data to show...</Typography>
      </Box>
    );
  }

  return (
    <Box className="reviewJourney__container" p={2}>
      <Grid container spacing={2}>
        <Grid size={4}></Grid>
        <Grid size={4}>
          <Box width="100%" paddingInline="8px">
            <Header />
            {data?.summary
              ?.filter((summary) => summary?.journey_details)
              .map((summary, index) => (
                <Card key={summary?._id || index} summary={summary} user={data?.user} />
              ))}
          </Box>
        </Grid>
        <Grid size={4}></Grid>
      </Grid>
    </Box>
  );
}
