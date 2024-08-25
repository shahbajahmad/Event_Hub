
import './App.css'
import Navbar from './component/Navbar'

import Footer from './component/Footer'
import { Routes, Route,  } from 'react-router-dom'
import MainRouter from './component/MainRouter'



function App() {
 
  return (
    <> 
 
    <Routes>

   <Route path={"/*"}  element={ <MainRouter/>}></Route>
  
    </Routes>

 
    </>
  )
}

export default App
