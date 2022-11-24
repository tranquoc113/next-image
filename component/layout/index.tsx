// import AppBar from "./AppBar";
import Footer from "./Footer";
import Header from "./Header";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "./AppBar";
const drawerWidth = 240;
interface Props {
  children: JSX.Element | JSX.Element[];
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Box sx={{ display: "flex", height: "90vh" }}>
        <CssBaseline />
        <AppBar />
        {/* <SideNav/> */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
}
