import { Box, Typography } from "@mui/material";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

const ImageBox = ({ imgSrc, name }) => {
  return (
    <Box
      width="100%"
      sx={{
        aspectRatio: "1 / 1",
        position: "relative",
      }}
    >
      <Box
        component="img"
        src={imgSrc}
        alt={name || "image"}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </Box>
  );
};

export default ImageBox;
