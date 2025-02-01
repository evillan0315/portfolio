import React from "react";
import { Grid, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { iconMap } from "@/components/InfiniMovingCards";

import techStack from "./techStack.json";

const TechStackGrid: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {techStack.map((tech, index) => {
        return (
          <Grid item xs={3} key={index}>
            <Box className="text-4xl p-2 w-full mx-auto text-center">
              <Tooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">{tech.name}</Typography>
                    <em>{"A powerful"}</em> <b>{"technology"}</b>{" "}
                    <u>{"for modern development"}</u>. {tech.description}
                  </React.Fragment>
                }
                arrow
              >
                <IconButton
                  sx={{ fontSize: "3rem" }}
                  color={
                    tech.color as
                      | "primary"
                      | "error"
                      | "secondary"
                      | "info"
                      | "success"
                      | "warning"
                      | "default"
                      | "inherit"
                  }
                  disableRipple
                >
                  {iconMap[tech.icon]}
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
