import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { MdErrorOutline } from "react-icons/md";

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password)
  }

  return (
    <div className="w-screen h-screen flex justify-center mt-56 rounded-xl">
    <form className="flex flex-col px-10 w-96 h-[450px] rounded-xl bg-white" onSubmit={handleSubmit}>
      <h3 className="mt-8 ml-0 text-lg font-bold">Sign Up</h3>
      
      <label className="mt-8">Email address:</label>
      <input
        className="input-style"  
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label className="mt-8">Password:</label>
      <input
        className="input-style"  
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading} className="mt-7 btn">Sign up</button>
      {error && <div className="error flex items-center gap-1"> <MdErrorOutline size={20} /> {error}</div>}
    </form>
    </div>
  )
}

export default Signup