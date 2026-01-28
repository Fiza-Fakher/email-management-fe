import './index.css'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from "./pages/auth/login/index"
import Detail from "./pages/detail/index"
import Web from './pages/website'

function App() {
  
  return (
   <>
   <Routes>
   <Route path='/' element={<Dashboard/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/detail/:id' element={<Detail/>}/>
   <Route path='/web' element={<Web/>}/>
   </Routes>
   </>
  )
}

export default App
