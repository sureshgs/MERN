import { createContext, useReducer } from 'react'

export const AppContext = createContext()

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'GET_DOCS': 
      return {
        docs: action.payload
      }
    case 'CREATE_DOC':
      return {
        docs: [action.payload, ...state.docs]
      }
    case 'DELETE_DOC':
      return {
        docs: state.docs.filter((doc) => doc._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    docs: null
  })

  return (
    <AppContext.Provider value={{...state, dispatch}}>
      { children }
    </AppContext.Provider>
  )
}