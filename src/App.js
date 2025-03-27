import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewTicket from "./pages/NewTicket";
import TicketList from "./components/TicketList";
import TicketDetails from "./pages/TicketDetails";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const role = useSelector((state) => state.auth.role);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/tickets/new" element={<NewTicket />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketList />} />
          {/* <Route path="/tickets" element={<Tickets />} /> */}
          <Route path="/tickets/:id" element={<TicketDetails />} />
          <Route path="/admin" element={<AdminPanel /> } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
