"use client";
import * as React from "react";
//import prisma from "@/lib/prisma";
import BentoGridProject from "@/components/BentoGridProject";
import { InfiniteMovingCards } from "@/components/InfiniMovingCards";
import { SkillsComponentData } from "@/lib/components";
import HeroSectionBackground from "@/components/HeroSectionBackground";
import TechnologySkillSpec from "@/components/portfolio/TechnologySkills";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { Spotlight } from "@/components/ui/spotlightv2";
import BackgroundLinesSection from "@/components/BackgroundLinesSection";
import GitHubRepoList from "@/components/github/GithubRepoList";
const HomePage = () => {
  return (
    <Box>
      {/* Background starts. This must stay at the top */}
      <Box>
        <Spotlight />
        <BackgroundLinesSection />
      </Box>
      {/* End of background. Do not remove the h-screen and z-index below */}
      <Box className="h-screen relative z-20">
        <HeroSectionBackground />
        <TechnologySkillSpec />
        <InfiniteMovingCards
          skills={SkillsComponentData.props}
          direction="left"
          speed="slow"
        />

        <Box sx={{ py: 6 }}>
          <Typography variant="h3" sx={{ mb: 6 }}>
            Github Repositories
          </Typography>
          <GitHubRepoList />
        </Box>
        <Divider />
        <Box sx={{ py: 6 }}>
          <BentoGridProject />
        </Box>
      </Box>
    </Box>
  );
};
HomePage.requireAuth = false;
export default HomePage;
/* export async function getServerSideProps() {
  const data = await prisma.page.findFirst({
    where: {
      default: true,
    },
  });

  await prisma.$disconnect();
  if (!data) {
    console.log(data);
  }
  const serialize = { ...data, createdOn: data?.createdOn.toISOString() };
  return {
    props: {
      page: serialize,
    },
  };
} */
