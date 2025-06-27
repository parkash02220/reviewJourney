import { Box, Typography } from "@mui/material";
import Header from "./Header";
import DecisionCard from "./DecisionCard";
import ImageBox from "./ImageBox";
import HobbiesTags from "./HobbiesTags";

const Card = ({ summary,user }) => {
  const journey = summary?.journey_details;
  const maxSteps = 3;

  const journeySteps = [];

  for (let i = 1; i <= maxSteps; i++) {
    const img = journey?.[`img_${i}`];
    const event = journey?.[`event_${i}`];
    const timestamp = journey?.[`timestamp_${i}`];
    const location = journey?.[`location_${i}`];

    if (img || event) {
      journeySteps.push({ img, event, timestamp, location });
    }
  }

  return (
    <Box mb={4}>
      <DecisionCard age={summary?.at_age} msg={summary[summary?.user_action]} />

      {journeySteps.map((step, index) => (
        <Box key={index} mb={2} mt={2}>
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

       { index === 0 &&  <HobbiesTags hobbies={user?.hobbies} />}

          {step.event && (
            <Box mt={1}>
              <Box p={1} bgcolor="#F9FAFB" borderRadius={2}>
              <Typography fontSize={14}>  {step.event} </Typography>
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Card;
