import { Box, Typography } from "@mui/material";
import MyCircularProgress from "../../../../components/MyCircularProgress";

export default function ProgressHeader() {
  const data = [
    { name: "Health", value: 90 },
    { name: "Wealth", value: 20 },
    { name: "Happiness", value: 50 },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        padding: {xs:'4px',sm:2},
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data?.map((item, i) => {
        return (
          <Box
            key={item?.name || i}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={'4px'}
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
        );
      })}
    </Box>
  );
}
