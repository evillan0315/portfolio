import React from "react";
import { Grid, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { SiTypescript, SiPython, SiReact, SiNextdotjs, SiMaterialui, SiAmazonaws, SiPostgresql, SiPrisma } from "react-icons/si";
import techStack from "./techStack.json";

// Map icon names to actual React components
const iconMap: Record<string, React.ElementType> = {
  SiTypescript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiMaterialui,
  SiAmazonaws,
  SiPostgresql,
  SiPrisma,
};

const TechStackGrid: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {techStack.map((tech, index) => {
        const IconComponent = iconMap[tech.icon];

        return (
          <Grid item xs={3} key={index}>
            <Box className="text-4xl p-2 w-full mx-auto text-center">
              <Tooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">{tech.name}</Typography>
                    <em>{"A powerful"}</em> <b>{"technology"}</b> <u>{"for modern development"}</u>.{" "}
                    {tech.description}
                  </React.Fragment>
                }
                arrow
              >
                <IconButton sx={{ fontSize: "3rem" }} color={tech.color} disableRipple>
                  {IconComponent && <IconComponent />}
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TechStackGrid;

