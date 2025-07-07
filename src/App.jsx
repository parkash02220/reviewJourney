import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ReviewJourney from "./pages/ReviewJourney";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Box
        className="main__container"
        width="100%"
        height="100dvh"
        overflow={'auto'}
        // sx={{
        //   scrollbarWidth: "none",
        //   msOverflowStyle: "none",
        //   "&::-webkit-scrollbar": { display: "none" }
        // }}
      >
        <Routes>
          <Route path="/" element={<ReviewJourney />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
