"use client";
import React, { useState, MouseEvent } from "react";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import MoreVertIcon from "@mui/icons-material/MoreVert";
interface PageTopBarProps {
  title: string;
  showAdd?: boolean;
  showSort?: boolean;
  showMenu?: boolean;
  onAddClick?: () => void;
  onSortClick?: () => void;
  menuOptions?: { icon: React.ReactNode; label: string; action: () => void }[];
}
const PageTopBar: React.FC<PageTopBarProps> = ({
  title,
  showAdd = true,
  showSort = true,
  showMenu = true,
  onAddClick,
  onSortClick,
  menuOptions = [],
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      {/* Title */}
      <Grid size={6}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      </Grid>
      {/* Toolbar with Icons */}
      <Grid size={6} container justifyContent="flex-end">
        {showAdd && (
          <IconButton color="primary" onClick={onAddClick}>
            <AddIcon />
          </IconButton>
        )}
        {showSort && (
          <IconButton color="primary" onClick={onSortClick}>
            <SortIcon />
          </IconButton>
        )}
        {showMenu && (
          <>
            <IconButton color="primary" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>

            {/* Menu with dynamic options */}
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              {menuOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    option.action();
                    handleMenuClose();
                  }}
                >
                  {option.icon} {option.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Grid>
    </Grid>
  );
};
export default PageTopBar;
