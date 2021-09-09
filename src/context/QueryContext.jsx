import { useState, createContext } from "react";

export const QueryContext = createContext()

export const QueryController = ({ children }) => {
  const [filter, setFilter] = useState("")
  const [lang, setLang] = useState("")

  return (
    <QueryContext.Provider value={{ ft: [filter, setFilter], lg: [lang, setLang] }}>
      {children}
    </QueryContext.Provider>
  )
}