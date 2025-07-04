import { Box, Typography } from "@mui/material";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

const ImageBox = ({ imgSrc, age, name, date, location }) => {
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

      {/* Overlay content */}
      {/* <Box
        position="absolute"
        bottom={0}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap={2}
        bgcolor="rgba(0, 0, 0, 0.4)"
        p={2}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            border: "1px solid #FFFFFF",
            borderRadius: "12px",
            padding: "6px 12px",
            minWidth: 60,
          }}
        >
          <Typography color="#FFFFFF" fontWeight={800} fontSize={18}>
            {age}
          </Typography>
          <Typography color="#FFFFFF" fontSize={12}>
            YRS OLD
          </Typography>
        </Box>

        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          color="#FFFFFF"
        >
          {name && (
            <Typography fontWeight={800} fontSize={20} ml={0.5}>
              {name}
            </Typography>
          )}
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            {location && (
              <Box display="flex" alignItems="center" gap={1}>
                <MdLocationOn size={16} color="white" />
                <Typography fontSize={13}>{location}</Typography>
              </Box>
            )}
            {date && (
              <Box display="flex" alignItems="center" gap={1}>
                <AiOutlineClockCircle size={16} color="white" />
                <Typography fontSize={13}>{date}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box> */}
    </Box>
  );
};

export default ImageBox;
