import { useContext } from "react"
import { AppContext } from "../context/AppContext"

const ReservationsPage = () => {
      const context = useContext(AppContext)

if (!context) return null

const { reservations, cancelReservation } = context


  const totalIncome = reservations.reduce((acc, r) => acc + r.total, 0)

  return (
    <div>
      <h1>Reservas</h1>

      <p>Total reservas: {reservations.length}</p>
      <p>Ingreso total: ${totalIncome}</p>

      {reservations.map(r => (
        <div key={r.id}>
          <p>Espacio ID: {r.spaceId}</p>
          <p>Horas: {r.hours}</p>
          <button onClick={() => cancelReservation(r.id)}>
            Cancelar
          </button>
        </div>
      ))}
    </div>
  )
}

export default ReservationsPage