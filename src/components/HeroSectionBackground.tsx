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
import { DM_Sans } from "@/theme";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import  TechnologySkillSpec from "@/components/portfolio/TechnologySkills";
import { IconBrandGithub, IconMail, IconPhone } from "@tabler/icons-react";
import { HiDocumentText } from "react-icons/hi2";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
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
      <Box className="h-screen py-6">
        <Container>
          <Grid size={12}>
            <Box className="py-2">
              <WordProcessor text={headline} animate headline />
              <Box component="div" sx={{ minHeight: "120px" }}>
                <WordProcessor text={words} animate />
              </Box>
            </Box>
          </Grid>
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
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                
                    <Grid
                      container
                      direction={{ sm: "row", xs: "column" }}
                      spacing={2}
                      sx={{
                        mb: 2,
                     
                      }}
                    >
                      <Grid size={{ md: 2, sm: 4, xs: 12 }}>
                        <Logo width={150} height={150} />
                      </Grid>
                      <Grid size={{ md: 10, sm: 8, xs: 12 }}>
                        <Typography
                          variant="h2"
                          sx={{
                            fontWeight: 500,
                            fontSize: {
                              lg: "3.5rem",
                              md: "3rem",
                              sm: "2rem",
                              xs: "1.2rem",
                            },
                          }}
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
                          <Stack direction="row" spacing={2}>
                            <IconPhone />
                            <Typography variant="body1">
                              (+63) 962 764 2283
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={2}>
                            <IconMail />{" "}
                            <Typography variant="body1">
                              evillan0315@gmail.com
                            </Typography>
                          </Stack>
                        </Grid>
                        <Typography variant="caption" sx={{ pb: 2 }}>
                          Open to hybrid or remote work with occasional onsite
                          collaboration.
                        </Typography>
                      </Grid>
                    </Grid>

              </Grid>

              <Grid
                container
                spacing={{ xs: 3, md: 4 }}
                direction="row"
                gap={2}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  mt: 2,
                }}
              >
                <Typography
                  variant="h2"
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
                <Typography variant="body1" color="inherit" sx={{ pr: 4 }}>
                I leverage a powerful tech stack, including TypeScript, React, Next.js, Prisma, PostgreSQL, AWS, and more, to craft high-performance, scalable, and intuitive web applications. 
                </Typography>
                <Typography variant="body1" color="inherit" sx={{ pr: 4 }}>
                With expertise in both frontend and backend development, I build robust solutions that are efficient, maintainable, and optimized for the best user experience. 
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    color={"primary"}
                    variant="contained"
                    onClick={handleDrawerOpen}
                    endIcon={<DoubleArrowIcon />}
                    size="small"
                    className={`${DM_Sans.className} rounded-xl   text-white font-bold shadow shadow-neutral-950`}
                  >
                    View Projects
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleDrawerContact}
                    endIcon={<HiDocumentText />}
                    size="small"
                    className={`${DM_Sans.className} rounded-xl  text-white font-bold shadow shadow-neutral-950`}
                  >
                    Resume
                  </Button>
                  <Stack direction="row" spacing={1}>
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
                </Stack>
                <Drawer
                  content={loading ? <LoadingComponent /> : content} // Show loader or content
                  open={open}
                  onClose={handleDrawerClose}
                />
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption">
                  Dedicated to driving innovation, streamlining workflows, and
                  mentoring teams.
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ md: 5, xs: 12 }}>
              <Box className="mx-auto" sx={{}}>
              <Typography variant="h5" sx={{fontWeight:500}}>
              Building Scalable & Modern Applications with Cutting-Edge Technologies
              
              </Typography>
              
     		<TechnologySkillSpec />
     		<Typography variant="body1">

              
              Proficient in Node.js, Typescript, Python, and React, with a
                  proven ability to deliver robust and scalable solutions.
              </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HeroSectionBackground;
