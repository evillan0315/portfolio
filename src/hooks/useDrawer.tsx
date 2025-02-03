import { DrawerProps } from "@mui/material";
import { useState, useCallback } from "react";

/**
 * Custom hook for managing the state and content of a Material UI Drawer component.
 *
 * @returns An object containing the drawer's state and control functions.
 */
const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<DrawerProps | undefined>(undefined); // Allow content to be undefined initially

  /**
   * Opens the drawer.
   */
  const openDrawer = useCallback(() => setIsOpen(true), []);

  /**
   * Closes the drawer.
   */
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  /**
   * Toggles the drawer's open/close state.
   */
  const toggleDrawer = useCallback(() => setIsOpen((prev) => !prev), []);

  /**
   * Updates the content of the drawer and opens it.
   *
   * @param newContent The new content to display in the drawer.
   */
  const updateContent = useCallback((newContent: DrawerProps) => {
    setContent(newContent);
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    content,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    updateContent,
  };
};

export default useDrawer;
