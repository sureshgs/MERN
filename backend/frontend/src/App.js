import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import { useSideBarContext } from './hooks/useSideBarContext'

function App() {
  const { user } = useAuthContext()
  const {sidebar} =  useSideBarContext();

  return (
    <div className="dark:bg-black h-screen w-screen bg-gray-100 overflow-hidden">
      <BrowserRouter>
        <Navbar />
        {sidebar ? <SideBar /> : <SideBar className='sidebar-close'/> }
        <div className="pages h-screen w-screen bg-gray-100">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
