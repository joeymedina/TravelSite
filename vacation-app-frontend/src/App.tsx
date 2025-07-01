import TripList from "./pages/TripList";
import CreateTrip from "./pages/CreateTrip";
import ViewTrip from "./pages/ViewTrip";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import EditTrip from "./pages/EditTrip";

function App() {
  const location = useLocation();

  return (
    <div style={{ padding: "2rem" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/">Home</Link> |{" "}
        {location.pathname.startsWith("/trip/") && location.pathname.endsWith("/edit") ? (
          <Link to={location.pathname.replace("/edit", "")}>View Trip</Link>
        ) : location.pathname.startsWith("/trip/") ? (
          <Link to={location.pathname + "/edit"}>Edit Trip</Link>
        ) : (
          <Link to="/new">Add Trip</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<TripList />} />
        <Route path="/new" element={<CreateTrip />} />
        <Route path="/trip/:id" element={<ViewTrip />} />
        <Route path="/trip/:id/edit" element={<EditTrip />} />
      </Routes>
    </div>
  );
}

export default App;
