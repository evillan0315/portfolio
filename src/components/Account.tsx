import * as React from "react";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import { Account } from "@toolpad/core/Account";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

interface AccountCustomProps {}

const AccountCustom: React.FC<AccountCustomProps> = () => {
  return (
    <Container>
      <Grid
        direction="row"
        container
        spacing={2}
        sx={{
          justifyContent: "right",
          alignItems: "baseline",
        }}
      >
        <Grid size={9}></Grid>
        <Grid size={3} textAlign="right">
          <Account
            className="text-right"
            slotProps={{
              signInButton: {
                variant: "outlined",
                color: "primary",
                startIcon: <Login />,
              },
              signOutButton: {
                color: "primary",
                startIcon: <Logout />,
              },
              preview: {
                slotProps: {
                  avatarIconButton: {
                    sx: {
                      width: "fit-content",
                      margin: "auto",
                    },
                  },
                  avatar: {
                    variant: "rounded",
                  },
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountCustom;
