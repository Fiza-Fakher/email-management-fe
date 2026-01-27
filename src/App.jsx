import './index.css'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from "./pages/auth/login/index"
import Detail from "./pages/detail/index"

function App() {
  
  return (
   <>
   <Routes>
   <Route path='/' element={<Dashboard/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/detail/:id' element={<Detail/>}/>
   </Routes>
   </>
  )
}

export default App
