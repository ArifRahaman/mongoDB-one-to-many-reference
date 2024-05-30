import { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.css';
import Signup  from './Signup';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Login';
import Home from "./Home"

// Put any other imports below so that CSS from your
// components takes precedence over default styles.

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    {/* <h1>Hello world!!</h1> */}
    {/* <Signup/> */}
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/home"element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
