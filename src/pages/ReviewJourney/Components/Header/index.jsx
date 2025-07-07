import { Box, Grid, IconButton, Typography } from "@mui/material";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Header = () => {
  return (
    <>
      <Grid container>
      <Grid size={{ xs: 0, sm: 3,md:4 }}></Grid>
        <Grid  size={{ xs: 12, sm:6,md:4  }}>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            position="relative"
            minHeight={48}
            sx={{ background: "black" }}
          >
            <Typography fontWeight={700} mx="auto" color="#FFFFFF">
              Journey
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 0, sm: 3,md:4 }}></Grid>
      </Grid>
    </>
  );
};
export default Header;
