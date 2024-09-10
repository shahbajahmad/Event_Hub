
import './App.css'
import { Routes, Route,  } from 'react-router-dom'
import MainRouter from './component/MainRouter'
import MySnackBar from './component/MySnackBar'

function App() {

  return (
    <> 
    <MySnackBar/>
    <Routes>
  
   <Route path={"/*"}  element={ <MainRouter/>}></Route>
   
  
    </Routes>

 
    </>
  )
}

export default App
