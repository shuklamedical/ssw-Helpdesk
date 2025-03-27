import React from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import { Home, AddCircle, AdminPanelSettings, Logout } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import logo from "../assets/images/logofinal.png";


const Sidebar = () => {

    const role = useSelector((state) => state.auth.role);

  return (
    // <Drawer
    //   variant="permanent"
    //   sx={{
    //     width: 240,
    //     flexShrink: 0,
    //     height: "100vh",
    //     [`& .MuiDrawer-paper`]: {
    //       width: 240,
    //       marginTop: "64px",
    //       height: "calc(100vh - 64px)",
    //       bgcolor: "black",
    //       color: "white",
    //     },
    //   }}
    // >
    //   <List>
    //     <ListItem disablePadding>
    //       <ListItemButton component={Link} to="/dashboard">
    //         <ListItemIcon sx={{ color: "white" }}>
    //           <DashboardIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="Dashboard" />
    //       </ListItemButton>
    //     </ListItem>
    //     <ListItem disablePadding>
    //       <ListItemButton component={Link} to="/tickets/new">
    //         <ListItemIcon sx={{ color: "white" }}>
    //           <AddIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="New Ticket" />
    //       </ListItemButton>
    //     </ListItem>
    //   </List>
    // </Drawer>
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        height: "100vh",
        [`& .MuiDrawer-paper`]: { 
          width: 240, 
          marginTop: "64px",
          height: "calc(100vh - 64px)", 
          bgcolor: "#dfdfdf", 
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        },
      }}
    >
      <img 
        src={logo} 
        alt="Helpdesk Logo" 
        style={{ width: "72px", marginTop: "10px", marginBottom: "20px" }} 
      />
      <List>
        <ListItem button component={Link} to="/dashboard" sx={{ color: "#06025f" }}>
          <ListItemIcon sx={{ color: "#06025f" }}>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/tickets/new" sx={{ color: "#06025f" }}>
          <ListItemIcon sx={{ color: "#06025f" }}>
            <AddCircle />
          </ListItemIcon>
          <ListItemText primary="New Ticket" />
        </ListItem>
        {(role === "Admin") ? (
        <ListItem button component={Link} to="/admin" sx={{ color: "#06025f" }}>
          <ListItemIcon sx={{ color: "#06025f" }}>
            <AdminPanelSettings />
          </ListItemIcon>
          <ListItemText primary="Admin Panel" />
        </ListItem>
        ): null }
        {/* <ListItem button component={Link} to="/" sx={{ color: "#06025f" }}>
          <ListItemIcon sx={{ color: "#06025f" }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem> */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
