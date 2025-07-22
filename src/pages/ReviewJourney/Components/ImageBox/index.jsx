import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const ImageBox = forwardRef(
  ({ imgSrc, altText, lockedHeight, children }, ref) => {
    return (
      <Box
        ref={ref}
        position="relative"
        width="100%"
        flex={lockedHeight ? "0 0 auto" : "1 1 auto"}
        sx={{
          height: lockedHeight ? `${lockedHeight}px` : "auto",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          position="relative"
          sx={{
            aspectRatio: "1 / 1",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Box
            component="img"
            src={imgSrc}
            alt=""
            aria-hidden
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(12px)",
              transform: "scale(1.1)",
            }}
          />
          <Box
            component="img"
            src={imgSrc}
            alt={altText || "image"}
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
          />
        </Box>
        {children}
      </Box>
    );
  }
);

export default ImageBox;
