"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

import Typography from "@mui/material/Typography";
import { iconMap } from "../InfiniMovingCards";
import IconButton from "@mui/material/IconButton";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#111111",
    color: "#f5f5f5",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(10),
    border: "1px solid #dadde9",
  },
}));
const TechnologySkillSpec = () => {
  return (
    <Grid
      container
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        direction="row"
        spacing="2"
        sx={{
          color: "white",
          mt: 3,
          justifyContent: "space-between",
          alignItems: "center",
          mx: "auto",
        }}
      >
        <Grid size={4}>
          <Box className="text-4xl p-2 w-full mx-auto text-center">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Node.js</Typography>
                  <em>{"A powerful"}</em> <b>{"JavaScript runtime"}</b>{" "}
                  <u>{"built on Chrome's V8 engine"}</u>.{" "}
                  {
                    "It enables fast, scalable, and efficient backend development."
                  }
                </React.Fragment>
              }
            >
              <IconButton
                sx={{ fontSize: "4rem" }}
                color="info"
                disableRipple={true}
              >
                {iconMap["SiNodedotjs"]}
              </IconButton>
            </HtmlTooltip>
          </Box>
        </Grid>
        <Grid size={4}>
          <Box className="text-4xl p-2 w-full mx-auto text-center">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">TypeScript</Typography>
                  <em>{"A superset"}</em> <b>{"of JavaScript"}</b>{" "}
                  <u>{"that adds static typing"}</u>.{" "}
                  {"It enhances code quality and maintainability."}
                </React.Fragment>
              }
            >
              <IconButton
                sx={{ fontSize: "4rem" }}
                color="primary"
                disableRipple={true}
              >
                {iconMap["SiTypescript"]}
              </IconButton>
            </HtmlTooltip>
          </Box>
        </Grid>

        <Grid size={4}>
          <Box className="text-4xl p-2 w-full mx-auto text-center">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Python</Typography>
                  <em>{"A versatile"}</em> <b>{"and powerful"}</b>{" "}
                  <u>{"programming language"}</u>.{" "}
                  {"Great for web development, AI, and automation."}
                </React.Fragment>
              }
            >
              <IconButton
                sx={{ fontSize: "4rem" }}
                color="error"
                disableRipple={true}
              >
                {iconMap["SiPython"]}
              </IconButton>
            </HtmlTooltip>
          </Box>
        </Grid>

        <Grid size={4}>
          <Box className="text-4xl p-2 w-full mx-auto text-center">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">React</Typography>
                  <em>{"A JavaScript"}</em> <b>{"library for building"}</b>{" "}
                  <u>{"interactive UIs"}</u>.{" "}
                  {"It makes frontend development efficient and scalable."}
                </React.Fragment>
              }
            >
              <IconButton
                sx={{ fontSize: "4rem" }}
                color="primary"
                disableRipple={true}
              >
                {iconMap["SiReact"]}
              </IconButton>
            </HtmlTooltip>
          </Box>
        </Grid>

        <Grid size={4}>
          <Box className="text-4xl p-2 w-full mx-auto text-center">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Next.js</Typography>
                  <em>{"A React framework"}</em> <b>{"for server-side"}</b>{" "}
                  <u>{"and static site generation"}</u>.{" "}
                  {"Optimized for performance and SEO."}
                </React.Fragment>
              }
            >
              <IconButton
                sx={{ fontSize: "4rem" }}
                color="secondary"
                disableRipple={true}
              >
                {iconMap["SiNextdotjs"]}
              </IconButton>
            </HtmlTooltip>
          </Box>
        </Grid>

        <Grid size={4}>
          <Box className="text-4xl p-2 w-full mx-auto text-center">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Material-UI</Typography>
                  <em>{"A React"}</em> <b>{"component library"}</b>{" "}
                  <u>{"following Google's Material Design"}</u>.{" "}
                  {"It provides beautiful, responsive UI components."}
                </React.Fragment>
              }
            >
              <IconButton
                sx={{ fontSize: "4rem" }}
                color="info"
                disableRipple={true}
              >
                {iconMap["SiMaterialui"]}
              </IconButton>
            </HtmlTooltip>
          </Box>
        </Grid>

        <Grid size={4}>
          <Box className="text-4xl p-2 w-full mx-auto text-center">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">AWS</Typography>
                  <em>{"A cloud"}</em> <b>{"computing platform"}</b>{" "}
                  <u>{"offering scalable solutions"}</u>.{" "}
                  {"Great for hosting, databases, and AI services."}
                </React.Fragment>
              }
            >
              <IconButton
                sx={{ fontSize: "4rem" }}
                color="primary"
                disableRipple={true}
              >
                {iconMap["SiAmazonaws"]}
              </IconButton>
            </HtmlTooltip>
          </Box>
        </Grid>

        <Grid size={4}>
          <Box className="text-4xl p-2 w-full mx-auto text-center">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">PostgreSQL</Typography>
                  <em>{"A powerful"}</em> <b>{"open-source"}</b>{" "}
                  <u>{"relational database system"}</u>.{" "}
                  {"It ensures high performance and data integrity."}
                </React.Fragment>
              }
            >
              <IconButton
                sx={{ fontSize: "4rem" }}
                color="success"
                disableRipple={true}
              >
                {iconMap["SiPostgresql"]}
              </IconButton>
            </HtmlTooltip>
          </Box>
        </Grid>

        <Grid size={4}>
          <Box className="text-4xl p-2 w-full mx-auto text-center">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Prisma</Typography>
                  <em>{"A next-gen"}</em> <b>{"database ORM"}</b>{" "}
                  <u>{"for Node.js and TypeScript"}</u>.{" "}
                  {"It simplifies database access and migrations."}
                </React.Fragment>
              }
            >
              <IconButton
                sx={{ fontSize: "4rem" }}
                color="warning"
                disableRipple={true}
              >
                {iconMap["SiPrisma"]}
              </IconButton>
            </HtmlTooltip>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TechnologySkillSpec;
