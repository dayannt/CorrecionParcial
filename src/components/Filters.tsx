import { useContext } from "react"
import { AppContext } from "../context/AppContext"

const Filters = () => {
    const context = useContext(AppContext)

if (!context) return null

const { updateFilters } = context


  return (
    <div>
      <select onChange={(e) => updateFilters({ type: e.target.value })}>
        <option value="">Todos</option>
        <option value="meeting room">Meeting</option>
        <option value="private office">Office</option>
      </select>

      <select onChange={(e) => updateFilters({ available: e.target.value === "true" })}>
        <option value="">Todos</option>
        <option value="true">Disponibles</option>
        <option value="false">No disponibles</option>
      </select>
    </div>
  )
}

export default Filters