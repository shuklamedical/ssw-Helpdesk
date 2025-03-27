import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, Container, Box, TableHead, TableRow, Paper, Button } from "@mui/material";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const statusFilter = queryParams.get("status");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`https://localhost:44384/api/tickets?status=${statusFilter || ""}`);
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, [statusFilter]);

  return (
    <Container>
        <Box sx={{ mt: 4}}>
          
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Title</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Created By</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.status}</TableCell>
                      <TableCell>{ticket.createdBy}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={() => navigate(`/tickets/${ticket.id}`)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
         
        </Box>
    </Container>
  );
};

export default TicketList;
