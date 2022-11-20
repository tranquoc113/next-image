import React from "react";
import { AppBar as MuiAppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

function AppBar() {
  return (
    <MuiAppBar
      color="inherit"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Update Photos
        </Typography>
        <Stack direction="row" spacing={2}>
          <IconButton aria-label="delete">
            <UploadIcon />
          </IconButton>
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Connect wallet
          </Button>
        </Stack>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
