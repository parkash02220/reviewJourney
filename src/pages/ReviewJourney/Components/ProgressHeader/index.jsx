import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import MyCircularProgress from "../../../../components/MyCircularProgress";

const ProgressHeader = () => {

  const data = [
    { name: "Health", value: 90 },
    { name: "Wealth", value: 20 },
    { name: "Happiness", value: 50 },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={3}
      padding={{ xs: "4px", sm: 2 }}
    >
      {data.map((item) => (
        <Box
          key={item.name}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="4px"
        >
          <MyCircularProgress
            value={item.value}
            size={36}
            color="green"
            fontSize={10}
            labelColor="#FFFFFF"
          />
          <Typography fontSize={10} color="#FFFFFF">
            {item.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ProgressHeader;
