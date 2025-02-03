"use client";

import React, { ReactNode } from "react";
import AppTheme from "@/shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";

//import useDrawer from "@/hooks/useDrawer";

const DynamicLayout = ({
  children,
}: {
  children?: ReactNode;
  drawer?: any;
}) => {
  /* useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await fetch(
          "/api/layout?id=75beccb6-5a7d-405b-8d38-60eef9cad455"
        );
        const data = await response.json();
        //handleOpenDrawer();
        setLayoutData(data);
      } catch (error) {
        console.error("Failed to fetch layout:", error);
      }
    };

    fetchLayout();
  }, [setLayoutData]); */

  /*   if (!layoutData) {
    return <LinearProgress />;
  } */

  return (
    <AppTheme disableCustomTheme={false}>
      <CssBaseline enableColorScheme />
      <Box
        component="main"
        className="h-screen w-full  bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden"
      >
        <Box component="div" className="w-full h-screen overflow-auto">
          {children}
        </Box>
      </Box>
    </AppTheme>
  );
};
export default DynamicLayout;
