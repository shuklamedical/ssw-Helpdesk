import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Card, CardContent, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [ticketCounts, setTicketCounts] = useState({
    unresolved: 0,
    open: 0,
    onHold: 0,
  });

  useEffect(() => {
    const fetchTicketStats = async () => {
      try {
        const response = await axios.get("https://localhost:44384/api/tickets/stats");
        setTicketCounts(response.data);
      } catch (error) {
        console.error("Error fetching ticket stats:", error);
      }
    };
    fetchTicketStats();
  }, []);

  return (
    <Container>
          <Box sx={{ mt: 4}}>
        <Grid container spacing={3}>
          {/* Unresolved Tickets */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ cursor: "pointer" }} onClick={() => navigate("/tickets?status=Unresolved")}>
              <CardContent>
                <Typography variant="h6">Unresolved</Typography>
                <Typography variant="h4">{ticketCounts.unresolved}</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Open Tickets */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ cursor: "pointer" }} onClick={() => navigate("/tickets?status=Open")}>
              <CardContent>
                <Typography variant="h6">Open</Typography>
                <Typography variant="h4">{ticketCounts.open}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* On Hold Tickets */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ cursor: "pointer" }} onClick={() => navigate("/tickets?status=OnHold")}>
              <CardContent>
                <Typography variant="h6">On Hold</Typography>
                <Typography variant="h4">{ticketCounts.onHold}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      </Container>
    
  );
};

export default Dashboard;
