import React from "react";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import { PinContainer } from "@/components/ui/pin-container";

interface Technology {
  technologies: string[];
  features: string[];
}

interface Project {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  url: string;
  frontend: Technology;
  backend: Technology;
  database: Technology;
  api: Technology;
  deployment: Technology;
  imageUrl: string;
}

interface ProjectDisplayProps {
  projects: Project[];
}

export default function ProjectDisplay({ projects }: ProjectDisplayProps) {
  return (
    <Container>
      <Grid container direction="row" spacing={4} sx={{}}>
        {projects.map((project, index) => (
          <>
            <Grid key={index} size={6}>
              <div className="h-[22rem] w-full flex items-center justify-center ">
                <PinContainer
                  key={index}
                  title={project?.name}
                  href={project?.url}
                >
                  <div className="tracking-tight text-slate-100/50 sm:basis-1/2 w-[30rem] h-[20rem] ">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100  line-clamp-1">
                      {project?.name}
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal line-clamp-3">
                      <span className="text-slate-500 ">
                        {project?.description}
                      </span>
                    </div>

                    <div
                      className="flex flex-1 w-auto h-[200px] rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 bg-cover bg-center"
                      style={{ backgroundImage: `url(${project?.imageUrl})` }}
                    ></div>
                  </div>
                </PinContainer>
              </div>
            </Grid>
          </>
        ))}
      </Grid>
    </Container>
  );
}
