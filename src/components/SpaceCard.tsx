import { useContext } from "react"
import { AppContext } from "../context/AppContext"

const SpaceCard = ({ space }: any) => {
  const context = useContext(AppContext)

if (!context) return null

const { reserveSpace } = context

  return (
    <div>
      <h3>{space.name}</h3>
      <p>{space.type}</p>
      <p>${space.pricePerHour}</p>
      <p>{space.available ? "Disponible" : "No disponible"}</p>

      {space.available && (
        <button onClick={() => reserveSpace(space.id, 2)}>
          Reservar 2h
        </button>
      )}
    </div>
  )
}

export default SpaceCard