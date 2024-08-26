import { Box } from "@mui/material";
import MakePost from "components/MakePost";
import Nav from "scenes/nav";

const Home = () => {
    return (
        <Box>
            <Nav/>
            <MakePost/>
        </Box>
    );
}
export default Home;