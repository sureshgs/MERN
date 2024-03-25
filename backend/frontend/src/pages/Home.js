import { useEffect }from 'react'
import { useAppContext } from '../hooks/useAppContext' 
import { useAuthContext } from "../hooks/useAuthContext"

// components
import CardDetails from "../components/CardDetails"
import AppForm from '../components/AppForm'

const Home = () => {
  const {docs, dispatch} = useAppContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchDocs = async () => {
      const response = await fetch('/api/challenges', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'GET_DOCS', payload: json})
      }
    }

    if (user) {
      fetchDocs()
    }
  }, [dispatch, user])

  return (
    <div className="">
      <div className="">
        {docs && docs.map((doc) => (
          <CardDetails key={doc._id} doc={doc} />
        ))}
      </div>
      <AppForm />
    </div>
  )
}

export default Home