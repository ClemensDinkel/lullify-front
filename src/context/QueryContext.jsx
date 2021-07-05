import { useState, useEffect, createContext } from "react";

export const QueryContext = createContext()

export const QueryController = ({ children }) => {
  const [filter, setFilter] = useState("")
  const [lang, setLang] = useState("")

  // testing
  /* useEffect(() => {
    console.log(filter)
  }, [filter]) */
  /* useEffect(() => {
    console.log(lang)
  }, [lang]) */

  return (
    <QueryContext.Provider value={{ ft: [filter, setFilter], lg: [lang, setLang] }}>
      {children}
    </QueryContext.Provider>
  )
}