import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const MyCircularProgress = ({
  value = 0,
  size = 60,
  thickness = 4,
  color = 'primary',
  trackColor = '#FFFFFF',
  showLabel = true,
  labelColor = 'text.primary',
  fontSize = 14,
  ...props
}) => {
  return (
    <Box position="relative" display="inline-flex" {...props}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={thickness}
        sx={{ color: trackColor }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress
          variant="determinate"
          value={value}
          size={size}
          thickness={thickness}
          sx={{ color }}
        />
      </Box>
      {showLabel && (
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            color={labelColor}
            fontSize={fontSize}
            fontWeight={700}
          >
            {`${Math.round(value)}%`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MyCircularProgress;
