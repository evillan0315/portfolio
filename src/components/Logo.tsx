"use client";
import { Box } from "@mui/material";
import React from "react";
import ImageWithFallback from "./ImageWithFallback";

interface LogoProps {
  image?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width, height }) => {
  const logo = "eddie_profile_pic_480_le2wvc";
  return (
    <Box>
      <ImageWithFallback
        src={logo}
        fallbackSrc={"eddie_profile_pic_480_le2wvc"}
        width={width}
        height={height}
        alt="Eddie Villanueva"
        className="filter grayscale shadow-md rounded-full"
      />
    </Box>
  );
};

export default Logo;
