import { Box, Typography } from "@mui/material";

const HobbiesTags = ({hobbies=[]}) => {
    return <>
         <Box sx={{background:"#F4F4F4",display:'flex',gap:1,flexWrap:'wrap',overflow:'hidden',p:1,justifyContent:'flex-start'}}>
     {
        hobbies?.map((hobby,index)=>{
            return <Box key={index} sx={{background:"#FFFFFF",borderRadius:'10px',p:1}}>
                <Typography fontSize={12}>
                    {hobby}
                </Typography>
            </Box>
        })
     }
    </Box>
    </>
}
export default HobbiesTags;