/**
 * Renders a dynamic component based on the provided configuration.
 * Supports rendering Box, Typography, and AppBar components.
 *
 * @param component The component configuration object.  This object should
 *                  have a `type` property indicating the component type (e.g., "box", "typography", "appbar").
 *                  Other properties depend on the component type (e.g., `className`, `children`, `variant`, `text`, `title`, `buttons`).
 * @returns A React element representing the rendered component, or `null` if the component type is not supported or the configuration is invalid.
 */
import React from "react";
import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";

const renderComponent = (component: any) => {
  console.log(component);
  if (!component) return null;

  switch (component.type) {
    case "box":
      return (
        <Box className={component.className}>
          {component.children?.map((child: any) => renderComponent(child))}
        </Box>
      );
    case "typography":
      return (
        <Typography variant={component.variant} className={component.className}>
          {component.text}
        </Typography>
      );
    case "appbar":
      return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">{component.title}</Typography>
            {component.buttons?.map((button: any, index: number) => (
              <Button key={index} onClick={() => console.log(button.action)}>
                {button.text}
              </Button>
            ))}
          </Toolbar>
        </AppBar>
      );

    default:
      return null;
  }
};

export default renderComponent;
