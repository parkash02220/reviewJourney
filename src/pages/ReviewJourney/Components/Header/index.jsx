import { Box, Grid, IconButton, Typography } from "@mui/material";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Header = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 0, sm: 1, md: 2, lg: 3, xl: 4 }}></Grid>
        <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6, xl: 4 }}>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            position="relative"
            minHeight={56}
            sx={{background:"black"}}
          >
            <Typography fontWeight={700} mx="auto" color="#FFFFFF">
              Journey
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 0, sm: 1, md: 2, lg: 3, xl: 4 }}></Grid>
      </Grid>
    </>
  );
};
export default Header;
