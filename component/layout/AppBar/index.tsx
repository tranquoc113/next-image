import React from "react";
import { AppBar as MuiAppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import fleekStorage from "@fleekhq/fleek-storage-js";
import { useRouter } from 'next/router'

function AppBar() {
  const router = useRouter()
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      const file = event.target.files[0];
      callApi(file);
    }

  async function callApi(file:File) {
    await fleekStorage.upload({
      apiKey:`${process.env.NEXT_PUBLIC_API_KEY}`,
      apiSecret:`${process.env.NEXT_PUBLIC_API_SECRET}`,
      key: `${Math.random().toString(36).replace('0.','update' || '')}_${Date.now()}_${file.name}`,
      data: file,
      httpUploadProgressCallback: (e) => {
        // console.log(Math.round((e.loaded / e.total) * 100) + "% done");
        const load = Math.round((e.loaded / e.total) * 100)
        if(load == 100){
          setTimeout(()=>{router.reload()},1000)
        }
      },
    });
    
  } 
  };
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
          <IconButton aria-label="upload picture" component="label">
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleFile}
            />
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
