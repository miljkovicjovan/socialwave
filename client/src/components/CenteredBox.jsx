import { Box } from "@mui/material";
import { styled } from "@mui/system";

const CenteredBox = styled(Box)({
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    minHeight:"100vh",
})

export default CenteredBox;