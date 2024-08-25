import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user profile"
        /* src={`http://localhost:3001/assets/${image}`} */
        src="http://localhost:3001/assets/default.jpg"
      />
    </Box>
  );
};

export default UserImage;