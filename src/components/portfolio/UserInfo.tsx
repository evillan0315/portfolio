"use client";
import React from "react";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Logo from "@/components/Logo";
import IconButton from "@mui/material/IconButton";

import { IconMail, IconPhone } from "@tabler/icons-react";
import ResumeData from "../../../data/resume";
import HeroHeader from "@/components/ui/HeroHeader";
import IconComponent from "@/components/IconComponent";

export default function UserInfo() {
  return (
    <Card
      component="div"
      variant="outlined"
      sx={{ width: "100%", background: "none" }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ md: 3, xs: 12 }}>
          <Box className="w-[130px] md:w-auto mx-auto">
            <Logo width={130} height={130} image={ResumeData.basics.image} />
          </Box>
        </Grid>
        <Grid
          size={{ md: 9, xs: 12 }}
          className="text-center mx-auto md:text-left"
        >
          <HeroHeader
            align="left"
            caveat={true}
            title={ResumeData.basics.name}
            h={"h1"}
            subtitle={""}
          />
          <Grid
            container
            direction={"row"}
            spacing={1}
            justifyContent={{ xs: "center", md: "left" }}
            className="text-sm w-full"
          >
            <Grid size={{ md: 6 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton disableRipple={true} sx={{ p: 0 }}>
                  <IconPhone />
                </IconButton>
                <Typography variant="caption">
                  {ResumeData.basics.phone}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ md: 6 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton disableRipple={true} sx={{ p: 0 }}>
                  <IconMail />
                </IconButton>

                <Typography variant="caption">
                  {ResumeData.basics.email}
                </Typography>
              </Stack>
            </Grid>
            <Typography variant="caption">
              {ResumeData.basics.work_status}
            </Typography>

            <Stack direction="row" spacing={1} alignItems={"center"}>
              <Typography variant="body1">Connect with me</Typography>
              {ResumeData.basics.profiles.map((profile, index) => (
                <button
                  key={index}
                  onClick={() => window.open(profile.url, "_blank")}
                >
                  <IconComponent iconName={profile.icon} />
                </button>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
