import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Container, TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl, Paper} from "@mui/material";
import Sidebar from "../components/Sidebar"; 

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:44384/api/user"); 
        console.log("Users Fetched:", response.data); 
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("https://localhost:44384/api/tickets", {
        title,
        description,
        priority,
        assignedTo,
        status: "Open"
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    
     
      <Container>
          <Box sx={{ mt: 4}}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Create New Ticket
              </Typography>
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                fullWidth
                label="Description"
                margin="normal"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Critical">Critical</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Assign To</InputLabel>
                <Select value={assignedTo || ""} onChange={(e) => setAssignedTo(e.target.value)}>
                  {users.length > 0 ? (users.map((user) => (
                      <MenuItem key={user.id} value={user.fullName}>
                        {user.fullName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No users available</MenuItem>
                  )}
                </Select>
              </FormControl>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                Submit
              </Button>
            </Paper>
          </Box>
      </Container>
     

  );
};

export default NewTicket;
