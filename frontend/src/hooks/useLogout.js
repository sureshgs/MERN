import { useAuthContext } from './useAuthContext'
import { useAppContext } from './useAppContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchDocs } = useAppContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchDocs({ type: 'GET_DOCS', payload: null })
  }

  return { logout }
}