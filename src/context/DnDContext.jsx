import { useEffect } from "react";
import { useState, createContext } from "react";
export const DnDContext = createContext()
export const DnDController = ({ children }) => {
  const [draggedItem, setDraggedItem] = useState(null)
  
  useEffect(() => {
    console.log(draggedItem)
  },[draggedItem])

  return (
    <DnDContext.Provider value={[draggedItem, setDraggedItem]}>
      {children}
    </DnDContext.Provider>
  )
}