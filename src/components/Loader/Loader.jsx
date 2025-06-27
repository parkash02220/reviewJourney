import React from "react";
import { Box } from "@mui/material";

const Loader = ({width,height}) => {
  return (
    <Box sx={{
      width:"100%",
      height:"100%",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    }}>
    <Box
      sx={{
        width: width || 60,
        height: height || 60,
        borderRadius: "50%",
        border: "6px solid transparent",}}>
          <img src="/iosLoader.gif" alt="loader" style={{width:"100%",height:"100%",objectFit:'cover',textIndent:"10000px"}} />
    </Box>
    </Box>
  );
};

export default Loader;
