import { Box, IconButton, Typography } from "@mui/material";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Header = () => {
  return (
    <>
      <Box width="100%" display="flex" alignItems="center" position="relative" minHeight={56}>
        {/* <IconButton sx={{ position: "absolute", left: 0 }}>
          <AiOutlineArrowLeft size={20} fontWeight={700}/>
        </IconButton> */}
        <Typography fontWeight={700} mx="auto">
          Review Journey
        </Typography>
      </Box>
    </>
  );
};
export default Header;
