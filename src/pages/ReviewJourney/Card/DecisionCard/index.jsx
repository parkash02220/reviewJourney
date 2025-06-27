import { Box, Typography } from "@mui/material";

const DecisionCard = ({age,msg}) => {
    return <>
     <Box width={'100%'} sx={{background:"#1E4A75",padding:2}}>
      <Typography color="#FFFFFF" textAlign={'center'} fontWeight={700}>{`Took a decision! at ${age} years old`}</Typography>
      <Typography  color="#FFFFFF" textAlign={'center'} fontSize={14}>{msg}</Typography>
     </Box>
    </>
}
export default DecisionCard;