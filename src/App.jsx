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
      <Box className="main__container" width={"100vw"} 
      sx={{
        minHeight:{xs:"calc(100dvh - 100px",sm:"100dvh"}
      }}
      >
        <Routes>
          <Route path="/" element={<ReviewJourney />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
