import TripList from "./pages/TripList";
import CreateTrip from "./pages/CreateTrip";
import ViewTrip from "./pages/ViewTrip";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/">Home</Link> | <Link to="/new">Add Trip</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TripList />} />
        <Route path="/new" element={<CreateTrip />} />
        <Route path="/trip/:id" element={<ViewTrip />} />
      </Routes>
    </div>
  );
}

export default App;
