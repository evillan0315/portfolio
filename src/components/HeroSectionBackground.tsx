"use client";

import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

import Button from "@mui/material/Button";
import Drawer from "./ui/drawer";

import { LayoutGridComponent } from "./LayoutGridComponent";
import LoadingComponent from "./ui/loader";
import WordProcessor from "./ui/word-processor";
import { DM_Sans, Caveat } from "@/theme";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import UserInfo from "@/components/portfolio/UserInfo";

import { HiDocumentText } from "react-icons/hi2";

import ProjectDisplay from "@/components/portfolio/ProjectDisplay";
import { Projects } from "../../data/resume";
type Props = {
  primaryButtonClick?: () => void;
};

const HeroSectionBackground: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // To manage loading state
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const headline = `Build Scalable & Modern Applications`;
  const words = `I specialize in building dynamic, scalable, and high-performance web applications. From intuitive frontends to powerful backends, my full stack expertise ensures seamless functionality, modern design, and future-ready solutions tailored to your needs.`;
  //const words2 = `Dedicated to driving innovation, streamlining workflows, and mentoring teams to exceed business objectives`

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const loadDrawerContent = useCallback(async (kind: string) => {
    setLoading(true);
    // Simulate a delay (e.g., fetching data from an API)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (kind === "contact") {
      setContent(<LayoutGridComponent />);
    } else {
      setContent(<ProjectDisplay projects={Projects} />);
    }
    setLoading(false);
    setOpen(true);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    loadDrawerContent("project");
  };
  const handleDrawerContact = () => {
    setOpen(true);
    loadDrawerContent("contact");
  };
  return (
    <>
      <Box className="py-12 md:py-20">
        <Container>
          <Grid container direction="row" spacing={4}>
            <Grid size={{ xs: 12 }} component="div" className="pb-6">
              <Box component="div" className="text-justify max-w-5xl mx-auto">
                <WordProcessor text={headline} animate headline />
              </Box>
              <Box component="div" className="text-justify max-w-5xl mx-auto">
                <WordProcessor text={words} animate />
              </Box>
            </Grid>
            <Grid size={{ md: 7, xs: 12 }}>
              <Grid
                container
                direction="row"
                sx={{
                  justifyContent: "center",
                  alignItems: "baseline",
                }}
              >
                <UserInfo />
              </Grid>
            </Grid>

            <Grid size={{ md: 5, xs: 12 }} alignItems="flex-start">
              <Box component="div">
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 300,
                  }}
                  className={`${Caveat.className} caveat_font`}
                >
                  Software Engineer
                </Typography>

                <Typography variant="caption" className="antialiased">
                  I am a seasoned{" "}
                  <Typography
                    component="span"
                    color={"secondary"}
                    className={`${Caveat.className} text-lg  caveat_font`}
                  >
                    Software Engineer
                  </Typography>{" "}
                  with over 12 years of experience. Dedicated to driving
                  innovation, streamlining workflows, and mentoring teams.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleDrawerOpen}
                    endIcon={<DoubleArrowIcon />}
                    className={`${DM_Sans.className}`}
                    size="small"
                  >
                    View Projects
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleDrawerContact}
                    startIcon={<HiDocumentText />}
                    className={`${DM_Sans.className}`}
                    size="small"
                  >
                    Resume
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Drawer
          content={loading ? <LoadingComponent /> : content} // Show loader or content
          open={open}
          onClose={handleDrawerClose}
        />
      </Box>
    </>
  );
};

export default HeroSectionBackground;
