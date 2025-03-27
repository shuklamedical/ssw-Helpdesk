import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./Topbar";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar />
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "15px" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 3, bgcolor: "white", minHeight: "100vh" }}>
        <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
