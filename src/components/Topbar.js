import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Avatar, Box, Menu, MenuItem, IconButton } from "@mui/material";
import { useNavigate , Link} from "react-router-dom";
import { logout } from "../redux/authSlice"; // Import logout action
import userImage from "../assets/images/users/avatar-8.jpg";

const TopBar = () => {
  const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handle menu open
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Logout function (clears everything)
  const handleLogout = () => {
    dispatch(logout()); // Clear Redux store

    localStorage.clear(); // Clear local storage
    sessionStorage.clear(); // Clear session storage

    window.location.href = "/"; // Hard reload to reset state
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        backgroundColor: "#1976d2",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Helpdesk System
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.fullName || "Guest"}!
          </Typography>

          {/* Avatar Button */}
          <IconButton onClick={handleClick}>
            <Avatar src={userImage} alt="User" />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
