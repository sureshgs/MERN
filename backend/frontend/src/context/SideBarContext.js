import { createContext, useReducer } from 'react'

export const SideBarContext = createContext()

export const sidebarReducer = (state, action) => {
  switch (action.type) {
    case 'CLOSE_SIDEBAR':
      return { sidebar: action.payload }
    default:
      return state
  }
}

export const SidebarContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sidebarReducer, { 
    sidebar: false
  })

  console.log('AuthContext state:', state)
  
  return (
    <SideBarContext.Provider value={{ ...state, dispatch }}>
      { children }
    </SideBarContext.Provider>
  )

}