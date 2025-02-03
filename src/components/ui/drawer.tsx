import React from "react";
import DrawerMui from "@mui/material/Drawer";
import Box from "@mui/material/Box";

import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

interface DrawerProps {
  open: boolean;
  content: React.ReactNode;
  onClose: () => void;
}
const Drawer: React.FC<DrawerProps> = ({ open, content, onClose }) => {
  //const [drawerWidth, setDrawerWidth] = useState("50%");

  const DrawerList = (
    <>
      {content ? (
        content
      ) : (
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );

  return (
    <div>
      <DrawerMui
        anchor="bottom"
        PaperProps={{
          sx: {
            width: "100vw", // Full width
            height: "100vh", // Full height
            margin: 0, // No margins
            background: "rgba(0,0,0,0.4)",
          },
        }}
        open={open}
        onClose={onClose}
      >
        <Box
          component="div"
          className={`relative w-full px-4 py-4 h-screen mx-auto`}
        >
          <IconButton
            className="absolute"
            aria-label="close"
            size="large"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
          {DrawerList}
        </Box>
      </DrawerMui>
    </div>
  );
};

export default Drawer;
