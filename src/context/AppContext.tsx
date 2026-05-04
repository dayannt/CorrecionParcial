import { createContext, useState, type ReactNode } from "react"
import { initialSpaces } from "../data/space"

type Space = {
  id: number
  name: string
  type: string
  capacity: number
  location: string
  pricePerHour: number
  available: boolean
}

type Reservation = {
  id: number
  spaceId: number
  hours: number
  total: number
}

type Filters = {
  type: string
  available: boolean | null
}

type AppContextType = {
  spaces: Space[]
  reservations: Reservation[]
  filters: Filters
  reserveSpace: (spaceId: number, hours: number) => void
  cancelReservation: (id: number) => void
  updateFilters: (filters: Partial<Filters>) => void
}


export const AppContext = createContext<AppContextType | null>(null)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [spaces, setSpaces] = useState<Space[]>(initialSpaces)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [filters, setFilters] = useState<Filters>({
    type: "",
    available: null
  })

  const reserveSpace = (spaceId: number, hours: number) => {
    setSpaces(prevSpaces => {
      const space = prevSpaces.find(s => s.id === spaceId)
      if (!space || !space.available) return prevSpaces

      const updatedSpaces = prevSpaces.map(s =>
        s.id === spaceId ? { ...s, available: false } : s
      )
      const newReservation: Reservation = {
        id: Date.now(),
        spaceId,
        hours,
        total: hours * space.pricePerHour
      }

      // actualizar reservas
      setReservations(prev => [...prev, newReservation])

      return updatedSpaces
    })
  }

  const cancelReservation = (id: number) => {
    setReservations(prevReservations => {
      const reservation = prevReservations.find(r => r.id === id)
      if (!reservation) return prevReservations

      // liberar espacio
      setSpaces(prevSpaces =>
        prevSpaces.map(s =>
          s.id === reservation.spaceId
            ? { ...s, available: true }
            : s
        )
      )

      return prevReservations.filter(r => r.id !== id)
    })
  }

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <AppContext.Provider
      value={{
        spaces,
        reservations,
        filters,
        reserveSpace,
        cancelReservation,
        updateFilters
      }}
    >
      {children}
    </AppContext.Provider>
  )
}