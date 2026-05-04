import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import SpaceCard from "../components/SpaceCard"
import Filters from "../components/Filters"

const SpacesPage = () => {
      const context = useContext(AppContext)

      if (!context) return null

       const { spaces, filters } = context

  const filteredSpaces = spaces.filter(space => {
    if (filters.type && space.type !== filters.type) return false
    if (filters.available !== null && space.available !== filters.available) return false
    return true
  })

  return (
    <div>
      <h1>Espacios</h1>
      <Filters />

      {filteredSpaces.map(space => (
        <SpaceCard key={space.id} space={space} />
      ))}
    </div>
  )
}

export default SpacesPage