import { SideBarContext } from "../context/SideBarContext";
import { useContext } from "react"

export const useSideBarContext = () => {
  const context = useContext(SideBarContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}