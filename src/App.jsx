import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import ReviewJourney from "./pages/ReviewJourney";

export default function App() {
  return (
    <Box width="100%" height="100dvh">
      <Routes>
        <Route path="/" element={<ReviewJourney />} />
      </Routes>
    </Box>
  );
}
