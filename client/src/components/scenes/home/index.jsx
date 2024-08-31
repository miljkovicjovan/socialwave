import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import MakePost from "components/MakePost";
import Nav from "../nav";
import PostsWidget from "components/widgets/PostsWidget";

const Home = () => {
    const { _id } = useSelector((state) => state.user);

    return (
        <Box>
            <Nav/>
            <PostsWidget userId={_id}/>
            <MakePost/>
        </Box>
    );
}
export default Home;