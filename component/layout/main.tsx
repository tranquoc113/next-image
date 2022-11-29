//tsrpfc
import { LayoutProps } from "@/models";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useEffect } from "react";
import { Stack } from "@mui/system";
import { Footer, Header } from "../common";

export function MainLayout({ children }: LayoutProps) {
  useEffect(()=>{
    console.log("mainlayout mouting")
    return () => console.log("mainlayout unmounting")
  },)
    return (
    <>
    <Stack minHeight="100vh">
    <Header />
        <Box component="main" flexGrow={1}>
          {/* stack còn trống thì box chiếm hết đẩy footer xuống dưới */}
          <Toolbar />
          {children}
        </Box>
      <Footer /> 
      {/* sticky footer */}
    </Stack>
     
    </>
  );
}
