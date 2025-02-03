"use client";
import * as React from "react";
//import prisma from "@/lib/prisma";

import HeroSectionBackground from "@/components/HeroSectionBackground";
import TechnologySkillSpec from "@/components/portfolio/TechnologySkills";
import Box from "@mui/material/Box";
import {Timeline} from "@/components/ui/timeline";

//import AccountCustom from "@/components/Account";
import { Spotlight } from "@/components/ui/spotlightv2";
import BackgroundLinesSection from "@/components/BackgroundLinesSection";
import GitHubRepoList from "@/components/github/GithubRepoList";
import ProjectDisplay from "@/components/portfolio/ProjectDisplay";
import ExperienceContent from "@/components/portfolio/ExperienceContent";
import { Projects, Experiences } from "../../data/resume";
import HeroHeader from "@/components/ui/HeroHeader";
import TestimonialsSection from "@/components/TestimonialsSection";

import { DateTime } from "luxon";
interface TimelineEntry {
  title: string;
  date?: string;
  content: React.ReactNode;
}
const HomePage = () => {

	function formatTitle (data: any) {
		if(data){
			return DateTime.fromISO(data.startDate).toFormat("MMM yyyy");
		}
		
	}
	const experienceLoop: TimelineEntry[] = Experiences.map((exp) => ({
	    title: exp.name,
	    date: formatTitle(exp),
	    content: <ExperienceContent exp={exp} />,
	  }));
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
        <HeroHeader caveat={false} title={"Powerful Cutting-edge Technologies"} h={"h1"} subtitle={""} />
      
        <TechnologySkillSpec />
        <Box>
        <HeroHeader caveat={false}  title={"Professional Experience"} h={"h1"} subtitle={""} />
        
        	<Timeline data={experienceLoop} />
        </Box>
        <Box sx={{ py: 6 }}>
        <HeroHeader caveat={false}  title={"Notable Projects"} h={"h1"} subtitle={""} />


          <ProjectDisplay projects={Projects} />
        </Box>
        <Box sx={{ py: 6 }}>
        <HeroHeader caveat={false}  title={"Github Repositories"} h={"h1"} subtitle={""} />
          <GitHubRepoList />
	
        </Box>

      	<TestimonialsSection />
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
