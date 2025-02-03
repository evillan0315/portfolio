"use client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import { Variant } from "@mui/material/styles/createTypography";

type Props = {
  title: string;
  subtitle?: string;
  h?: string;
  caveat?: boolean;
  align?: string;
  sx?: any;
};

function HeroHeader({ title, subtitle, h, caveat, align }: Props) {
  if (!align) align = "center";
  return (
    <Box sx={{ textAlign: `${align}` }}>
      <Typography
        variant={h as Variant}
        className={`bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-400 dark:from-neutral-500 dark:to-white font-sans relative z-20 tracking-tight font-normal md:font-medium ${caveat ? `caveat_font` : ``}`}
        sx={{
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        className="leading-normal bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-300 dark:from-white-400 dark:to-zinc-500 font-sans elative z-20 font-light tracking-tight  line-clamp-3 text-md sm:text-lg md:text-xl"
        sx={{}}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default HeroHeader;
