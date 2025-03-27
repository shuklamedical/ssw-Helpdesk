import React, { useEffect, useState } from "react";
import axios from "axios";
import {Container, Typography, Box,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl, InputLabel} from "@mui/material";

const AdminPanel = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:44384/api/user"); 
        console.log("Users Fetched Admin:", response.data); 
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("https://localhost:44384/api/tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  const assignTicket = async (ticketId) => {
    try {
      await axios.put(`https://localhost:44384/api/tickets/${ticketId}/assign`, { assignedTo: selectedUser });
      alert("Ticket Assigned!");
    } catch (error) {
      console.error("Error assigning ticket:", error);
    }
  };

  return (
    <Container>
        <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>

        <Typography variant="h5" gutterBottom>
          Under Development
        </Typography>
      {/* <Typography variant="h4" sx={{ my: 3 }}>
        Admin Panel - Ticket Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Assigned To</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>{ticket.assignedTo || "Unassigned"}</TableCell>
                <TableCell>
                    <FormControl fullWidth key={ticket.id}>
                        <InputLabel sx={{ mt: -1 }}>Select Agent</InputLabel>
                        <Select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.fullName}>
                                {user.fullName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => assignTicket(ticket.id)}> Assign </Button>
                    <Button variant="contained" color="error" sx={{ ml: 2, mt:1 }}> Close </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      </Paper>
      </Box>
    </Container>
  );
};

export default AdminPanel;
