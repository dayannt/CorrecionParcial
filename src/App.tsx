import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import SpacesPage from "./Pages/SpacesPage"
import ReservationsPage from "./Pages/ReservationsPage"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Espacios</Link> |{" "}
        <Link to="/reservations">Reservas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SpacesPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App