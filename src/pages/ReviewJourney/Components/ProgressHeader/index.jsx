import { Box, Typography } from "@mui/material";
import MyCircularProgress from "../../../../components/MyCircularProgress";

export default function ProgressHeader() {
    const data = [{name:"Health",value:90},{name:"Wealth",value:20},{name:"Happiness",value:50},]
  return (
    <Box sx={{ display: "flex", gap: 3,flex:"0 0 auto",padding:2,justifyContent:'center',alignItems:'center' }}>
        {
            data?.map((item,i)=>{
                return (
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={1}>
                    <MyCircularProgress value={item.value} size={50} color="green" fontSize={10} labelColor="#FFFFFF"/>
                      <Typography fontSize={10} color="#FFFFFF" fontWeight={700}>{item.name}</Typography>
                      </Box>
                )
            })
        }
    </Box>
  );
}
