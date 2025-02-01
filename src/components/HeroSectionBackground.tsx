"use client";

import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

import Button from "@mui/material/Button";
import Drawer from "./ui/drawer";
import MasonryImageList from "./ui/masonry-images";
import { LayoutGridComponent } from "./LayoutGridComponent";
import LoadingComponent from "./ui/loader";
import WordProcessor from "./ui/word-processor";
import { DM_Sans, Caveat } from "@/theme";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { IconBrandGithub, IconMail, IconPhone } from "@tabler/icons-react";
import { HiDocumentText } from "react-icons/hi2";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import Logo from "./Logo";

type Props = {
  primaryButtonClick?: () => void;
};

const HeroSectionBackground: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // To manage loading state
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const headline = `Build Scalable & Modern Web`;
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
      setContent(<MasonryImageList />);
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
      <Box className="my-6 xs:mb-10 relative z-20">
        <Container>
          <Box component="div">
            <WordProcessor text={headline} animate headline />
            <Box component="div" sx={{ minHeight: "120px" }}>
              <WordProcessor text={words} animate />
            </Box>
          </Box>
          <Grid
            container
            direction="row"
            spacing={4}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid size={{ md: 7, xs: 12 }}>
              <Grid
                container
                direction="row"
                spacing={2}
                sx={{
                  mb: 2,
                  alignItems: "center",
                }}
              >
                <Grid
                  container
                  direction={{ sm: "row", xs: "column" }}
                  spacing={2}
                  alignItems="center"
                  sx={{
                    mb: 2,
                  }}
                >
                  <Grid size={{ md: 3, sm: 4, xs: 12 }}>
                    <Logo width={130} height={130} />
                  </Grid>
                  <Grid size={{ md: 9, sm: 8, xs: 12 }}>
                    <Typography
                      variant="h1"
                      color="primary"
                      sx={{
                        fontWeight: 500,
                        fontSize: {
                          lg: "3rem",
                          md: "2rem",
                          sm: "1.7rem",
                          xs: "1.2rem",
                        },
                      }}
                      className={`${DM_Sans.className}`}
                    >
                      Eddie Villanueva
                    </Typography>
                    <Grid
                      container
                      direction={{ sm: "row", xs: "column" }}
                      spacing={1}
                      justifyContent={"left"}
                      className="text-left"
                    >
                      <Stack direction="row" alignItems="center">
                        <IconButton>
                          <IconPhone />
                        </IconButton>
                        <Typography variant="body1">
                          (+63) 962 764 2283
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center">
                        <IconButton>
                          <IconMail />
                        </IconButton>

                        <Typography variant="body1">
                          evillan0315@gmail.com
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems={"center"}>
                        <Typography variant="body1">Connect with me</Typography>
                        <IconButton>
                          <IconBrandGithub />
                        </IconButton>
                        <IconButton>
                          <LinkedInIcon />
                        </IconButton>
                        <IconButton>
                          <FacebookIcon />
                        </IconButton>
                        <IconButton>
                          <XIcon />
                        </IconButton>
                      </Stack>
                      <Typography variant="caption">
                        Open to hybrid or remote work with occasional onsite
                        collaboration.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid size={{ md: 5, xs: 12 }} alignItems="flex-start">
              <Box component="div">
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 300,
                  }}
                  className={`${Caveat.className}`}
                >
                  Full-Stack Developer
                </Typography>

                <Typography variant="caption">
                  I am a seasoned{" "}
                  <Box
                    component="span"
                    color={"secondary"}
                    className={`${Caveat.className} text-lg`}
                  >
                    Software Engineer
                  </Box>{" "}
                  with over 12 years of experience. Dedicated to driving
                  innovation, streamlining workflows, and mentoring teams.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleDrawerOpen}
                    endIcon={<DoubleArrowIcon />}
                    size="small"
                  >
                    View Projects
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleDrawerContact}
                    endIcon={<HiDocumentText />}
                    size="small"
                  >
                    Download Resume
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
