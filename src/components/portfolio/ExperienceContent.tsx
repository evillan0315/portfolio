"use client";

import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import DateFormat from "@/components/DateFormat";
import HeroHeader from "@/components/ui/HeroHeader";
import WorkIcon from "@mui/icons-material/Work";
type ExperienceType = {
  position: string;
  name: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
};
interface ExperienceContentProps {
  exp: ExperienceType;
}
const ExperienceContent: React.FC<ExperienceContentProps> = ({ exp }) => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Typography variant="h1">
          <WorkIcon sx={{ fontSize: "4rem", p: 0 }} />
        </Typography>
        <HeroHeader
          caveat={false}
          align="left"
          title={exp.position}
          subtitle={exp.name}
          h={"h3"}
        />
      </Stack>

      <Box className="mb-10 pl-20">
        <Stack direction="row" spacing={1} className="mb-4 italic">
          <Typography variant="caption">
            <DateFormat date={exp.startDate} format="MMM yyyy" />
          </Typography>
          <Typography>to</Typography>

          <Typography>
            {exp.endDate !== "Present" ? (
              <DateFormat date={exp.endDate} format="MMM yyyy" />
            ) : (
              exp.endDate
            )}
          </Typography>
        </Stack>
        <Box className="mb-4">
          <Typography variant="h6" className="font-light">
            Job Description
          </Typography>
          <Typography variant="body1">{exp.summary}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" className="font-light antialiased">
            Highlights
          </Typography>
          <Typography variant="body2">{exp.highlights}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default ExperienceContent;
