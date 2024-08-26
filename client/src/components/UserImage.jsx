import { Box } from "@mui/material";

const UserImage = ({ image = "default.jpg", size = "60px", onClick}) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user profile"
        src={`http://localhost:3001/assets/${image}`}
        onClick={onClick}
      />
    </Box>
  );
};

export default UserImage;