import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const ImageBox = forwardRef(
  ({ imgSrc, altText, lockedHeight, children }, ref) => {
    return (
      <Box
        ref={ref}
        width="100%"
        position="relative"
        flex={lockedHeight ? "0 0 auto" : "0 1 auto"}
        sx={{
          height: lockedHeight ? `${lockedHeight}px` : "auto",
          aspectRatio: lockedHeight ? "auto" : "1 / 1",
          overflow: "hidden",
          maxHeight: 650,
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
        {children}
      </Box>
    );
  }
);

export default ImageBox;
