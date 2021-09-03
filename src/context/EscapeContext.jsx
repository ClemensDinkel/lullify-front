import { useState, createContext } from "react";
// prevent useEffect on Home component on every render but the first
export const EscapeContext = createContext()

export const EscapeController = ({ children }) => {
  const [escapeUE, setEscapeUE] = useState(false)

  return (
    <EscapeContext.Provider value={[escapeUE, setEscapeUE]}>
      {children}
    </EscapeContext.Provider>
  )
}