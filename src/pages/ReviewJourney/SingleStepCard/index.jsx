import { Box, Typography } from "@mui/material";
import DecisionCard from "../Card/DecisionCard";
import ImageBox from "../Card/ImageBox";
import HobbiesTags from "../Card/HobbiesTags";

export default function SingleStepCard({ summary, user, step, isFirstStep }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      bgcolor={"#F4F4F4"}
      gap={2}
      p={2}
      pt={0}
    >
      {isFirstStep && (
        <Box flex="0 0 auto">
          <DecisionCard
            age={summary?.at_age}
            msg={summary[summary?.user_action]}
          />
        </Box>
      )}

      <Box
        className="scrollable-content"
        flex="1 1 auto"
        overflow="auto"
        minHeight={0}
      >
        {step.img && (
          <ImageBox
            imgSrc={step.img}
            age={summary?.at_age}
            location={step.location}
            name={user?.name}
            date={
              step.timestamp
                ? new Date(step.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""
            }
          />
        )}

        {isFirstStep && <HobbiesTags hobbies={user?.hobbies} />}

        {step.event && (
          <Box mt={1}>
            <Box p={1} bgcolor="#F9FAFB" borderRadius={2}>
              <Typography fontSize={14} color="#1C252E">
                {step.event}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
