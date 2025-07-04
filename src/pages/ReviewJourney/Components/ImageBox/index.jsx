import { Box } from "@mui/material";

const ImageBox = ({ imgSrc, name }) => (
  <Box
    width="100%"
    sx={{
      aspectRatio: "1 / 1",
      position: "relative",
      overflow: "hidden",
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
      alt={name || "image"}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  </Box>
);

export default ImageBox;
