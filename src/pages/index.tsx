"use client";
import * as React from "react";
//import prisma from "@/lib/prisma";
import BentoGridProject from "@/components/BentoGridProject";
import HeroSectionBackground from "@/components/HeroSectionBackground";
import TechnologySkillSpec from "@/components/portfolio/TechnologySkills";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import AccountCustom from "@/components/Account";
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
        <AccountCustom />
        <HeroSectionBackground />
        <TechnologySkillSpec />
        <Box sx={{ py: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 500,
              textAlign: "center",
              mb: 4,
              md: {
                fontSize: "1.5rem",
              },
              sm: {
                fontSize: "1.1rem",
              },
              xs: {
                fontSize: ".8rem",
              },
            }}
          >
            <Typography
              component="span"
              color="primary"
              variant="h1"
              className="caveat_font pr-2"
            >
              Github
            </Typography>{" "}
            Repositories
          </Typography>
          <GitHubRepoList />
        </Box>

        <Box sx={{ py: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 500,
              textAlign: "center",
              mb: 4,
              md: {
                fontSize: "1.5rem",
              },
              sm: {
                fontSize: "1.1rem",
              },
              xs: {
                fontSize: ".8rem",
              },
            }}
          >
            <Typography
              component="span"
              color="primary"
              variant="h1"
              className="caveat_font pr-2"
            >
              Notable
            </Typography>{" "}
            Projects
          </Typography>
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
