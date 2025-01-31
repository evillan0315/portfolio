"use client";

import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";


import Button from "@mui/material/Button";
import Drawer from "./ui/drawer";
import MasonryImageList from "./ui/masonry-images";
import { LayoutGridComponent } from "./LayoutGridComponent";
//import { CardStackComponent } from "@/components/CardStackComponent";
import LoadingComponent from "./ui/loader";
import WordProcessor from "./ui/word-processor";
import { DM_Sans } from "@/theme";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import Image from "next/image"
type Props = {
  primaryButtonClick?: () => void;
};

const HeroSectionBackground: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // To manage loading state
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const headline = `Build awesome applications with Eddie!`;
  const words = `Hello, my name is Eddie Villanueva, I am a seasoned software engineer with over 12 years of experience in full-stack development, cloud engineering, and DevOps.`;
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
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            
            <Grid size={{md:6,xs:12}}>
              <Typography variant="h2" sx={{ pb: 4 }}>
                Innovation & Leadership Excellence
              </Typography>
              <Typography
                variant="body1"
                color={"text-neutral-400"}
                sx={{ pb: 2 }}
              >
                Dedicated to driving innovation, streamlining workflows, and
                mentoring teams to exceed business objectives.
              </Typography>
              <Grid
                container
                spacing={{ xs: 3, md: 4 }}
                direction="row"
                gap={2}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Button
                  color={"primary"}
                  variant="contained"
                  onClick={handleDrawerOpen}
                  endIcon={<DoubleArrowIcon />}
                  size="large"
                  className={`${DM_Sans.className}rounded-xl  bg-orange-800 text-white font-bold shadow shadow-neutral-950`}
                >
                  View Projects
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleDrawerContact}
                  endIcon={<SendIcon />}
                  size="large"
                  className={`${DM_Sans.className} rounded-xl  text-white font-bold shadow shadow-neutral-950`}
                >
                  Get in Touch
                </Button>
                <Drawer
                  content={loading ? <LoadingComponent /> : content} // Show loader or content
                  open={open}
                  onClose={handleDrawerClose}
                />
              </Grid>
              
            </Grid>
            <Grid size={{md:6,xs:12}} >
              
                <Box className="mx-auto" sx={{}}>
                  
<Image src="https://avatars.githubusercontent.com/u/192534455?v=4" width={200} height={200} alt="Eddie Villanueva"/>
                </Box>

                  
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HeroSectionBackground;
