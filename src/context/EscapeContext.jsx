import { useEffect } from "react";
import { useState, createContext } from "react";
// workaround so that making a search from the player works without triggering the useEffect in Home
export const EscapeContext = createContext()

export const EscapeController = ({ children }) => {
  const [escapeUE, setEscapeUE] = useState(false)

  useEffect(() => {
    console.log(escapeUE)
  },[escapeUE])

  return (
    <EscapeContext.Provider value={[escapeUE, setEscapeUE]}>
      {children}
    </EscapeContext.Provider>
  )
}