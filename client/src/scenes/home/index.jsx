import { Box } from "@mui/material";
import MakePost from "components/MakePost";
import Nav from "scenes/nav";
import PostsWidget from "scenes/widgets/PostsWidget";
import { useSelector } from "react-redux";

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