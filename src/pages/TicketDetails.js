import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Box, Paper, Button, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import { useSelector } from "react-redux";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const [ticket, setTicket] = useState(null);
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  const [priority, setPriority] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketRes, usersRes] = await Promise.all([
          axios.get(`https://localhost:44384/api/tickets/${id}`),
          axios.get("https://localhost:44384/api/users"),
        ]);

        setTicket(ticketRes.data);
        setAssignedTo(ticketRes.data.assignedTo || "");
        setPriority(ticketRes.data.priority || "Medium");
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const assignTicket = async () => {
    try {
      await axios.put(
        `https://localhost:44384/api/tickets/${ticket.id}/assign`,
        { assignedTo },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setTicket((prev) => ({ ...prev, assignedTo }));
      alert("Ticket Assigned Successfully!");
    } catch (error) {
      console.error("Error assigning ticket:", error);
      alert("Failed to assign ticket!");
    }
  };

  const closeTicket = async () => {
    try {
      await axios.put(`https://localhost:44384/api/tickets/${ticket.id}/close`);
      alert("Ticket Closed!");
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error closing ticket:", error);
    }
  };

  const updatePriority = async () => {
    try {
      await axios.put(
        `https://localhost:44384/api/tickets/${ticket.id}/updatePriority`,
        { priority },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setTicket((prev) => ({ ...prev, priority }));
      alert("Priority Updated Successfully!");
    } catch (error) {
      console.error("Error updating priority:", error);
      alert("Failed to update priority!");
    }
  };

  const deleteTicket = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      await axios.delete(`https://localhost:44384/api/tickets/${ticket.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Ticket Deleted!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket!");
    }
  };
  const cleanText = (text) => text.replace(/<\/?[^>]+(>|$)/g, "").trim(); 
  const getPriorityColor = (priority) => {
    if (!priority || typeof priority !== "string") {
      return "#d3d3d3";
    }
    priority = cleanText(priority); // Remove HTML tags
    switch (priority.toLowerCase()) {
      case "high": return "#ff4d4d";
      case "medium": return "#ffa500";
      case "low": return "#62e22b";
      default: return "#d3d3d3";
    }
  };
  
  console.log("User Role:", role);
  if (!ticket) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>

        {/* <Typography variant="h5" gutterBottom>
          Under Development
        </Typography> */}

          <Typography variant="h5">{ticket.title}</Typography>
          <Typography>Status: {ticket.status}</Typography>
          <Typography>Created By: {ticket.createdBy}</Typography>
          <Typography>Description: {ticket.description}</Typography>

          <Typography>
            Priority: 
            <span style={{ color: getPriorityColor(ticket?.priority || ""), fontWeight: "bold", marginLeft: "5px" }}>
              {ticket.priority || "N/A"}
            </span>
          </Typography>
          <Typography>Assigned To: {ticket.assignedTo || "Unassigned"}</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Critical">Critical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button variant="contained" color="secondary" fullWidth onClick={updatePriority}>
                  Update Priority
                </Button>
              </Grid>
              {(role === "Admin") ? (
               <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Assign To</InputLabel>
                  <Select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.fullName}>
                        {user.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> 
              ): null }
              {(role === "Admin") ? (
              <Grid item xs={12} md={6}>
                <Button variant="contained" color="primary" fullWidth onClick={assignTicket}>
                  Assign Ticket
                </Button>
              </Grid>
              ): null }
              <Grid item xs={12} md={6}>
                <Button variant="contained" color="error" fullWidth onClick={closeTicket}>
                  Close Ticket
                </Button>
              </Grid>
              {(role === "Admin") ? (
              <Grid item xs={12} md={6}>
                <Button variant="contained" color="error" fullWidth onClick={deleteTicket}>
                  Delete Ticket
                </Button>
              </Grid>
              ): null }
            </Grid>
          
        </Paper>
      </Box>
    </Container>
  );
};

export default TicketDetails;
