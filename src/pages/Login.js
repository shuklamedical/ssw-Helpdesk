import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Box, Typography, Paper } from "@mui/material";
import loginImage from "../assets/images/logofinal.png"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://localhost:44384/api/user/login", { email, password });
      console.log("API Response:", response.data);

      if (response.status === 200) {
        const { token, user, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", role);
        dispatch(loginSuccess({ user, role }));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <Container maxWidth="xs">
      
      <Box sx={{ mt: 8, textAlign: "center" }}>
        {/* Image Box */}
        <Box sx={{ mb: 2 }}>
          <img src={loginImage} alt="Login Logo" style={{ width: "100px", height: "100px" }} />
        </Box>

        <Typography variant="h5" gutterBottom>
          Helpdesk Login
        </Typography>
        <Paper sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        </Paper>
      </Box>
     
    </Container>
  );
};

export default Login;
