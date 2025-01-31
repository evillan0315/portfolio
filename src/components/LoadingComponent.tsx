import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
//import Skeleton from "@mui/material/Skeleton";

interface LoadingComponentProps {
  message?: string;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ message }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bgcolor="rgba(0, 0, 0, 0.4)"
      zIndex={1300}
      gap={2}
    >
      <CircularProgress color="info" />
      {message && <Typography color="white">{message}</Typography>}
      {/* <Box sx={{ width: "100%", maxWidth: 300 }}>
        <Skeleton variant="text" height={30} sx={{ background: "blue" }} />
        <Skeleton variant="rectangular" height={118} sx={{ my: 1, background: "cyan" }} />
        <Skeleton variant="text" height={20} sx={{ background: "cyan" }} />
        <Skeleton variant="text" height={20} sx={{ background: "cyan" }} />
        <Skeleton variant="text" height={20} sx={{ background: "cyan" }} />
      </Box> */}
    </Box>
  );
};

export default LoadingComponent;
