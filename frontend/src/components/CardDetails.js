import { useAppContext } from '../hooks/useAppContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CardDetails = ({ doc }) => {
  const { dispatch } = useAppContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/challenges/' + doc._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_DOC', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{doc.title}</h4>
      <p><strong>Description: </strong>{doc.desc}</p>
      <p><strong>Type: </strong>{doc.type}</p>
      <p>{formatDistanceToNow(new Date(doc.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default CardDetails