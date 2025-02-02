"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { iconMap } from "../InfiniMovingCards";
import IconButton from "@mui/material/IconButton";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { InfiniteMovingCards } from "@/components/InfiniMovingCards";
import { SkillsComponentData } from "@/lib/components";
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
    <Container className="py-12">
      <Typography
        variant="h2"
        sx={{
          fontWeight: 500,
          textAlign: "center",
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
          Powerful
        </Typography>{" "}
        Cutting-edge Technologies
      </Typography>
      <Box component="div" className="py-2">
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
      </Box>
      <Grid container direction="row" spacing={6}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container direction="row">
            <Typography
              variant="h3"
              className="caveat_font"
              sx={{
                fontWeight: 300,
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
              Front/Backend Developer
            </Typography>
            <Typography variant="body1" color="inherit">
              With expertise in both frontend and backend development, I build
              robust solutions that are efficient, maintainable, and optimized
              for the best user experience.
            </Typography>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption">
              Proficient in Node.js, Typescript, Python, and React, with a
              proven ability to deliver robust and scalable solutions.
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container direction="row">
            <Typography
              variant="h3"
              className="caveat_font"
              sx={{
                fontWeight: 300,
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
              Versatile Full-Stack Developer
            </Typography>
            <Typography variant="body1" color="inherit">
              I leverage a powerful tech stack, including TypeScript, React,
              Next.js, Prisma, PostgreSQL, AWS, and more, to craft
              high-performance, scalable, and intuitive web applications.
            </Typography>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption">
              Dedicated to driving innovation, streamlining workflows, and
              mentoring teams.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <InfiniteMovingCards
        skills={SkillsComponentData.props}
        direction="left"
        speed="slow"
      />
    </Container>
  );
};

export default TechnologySkillSpec;
