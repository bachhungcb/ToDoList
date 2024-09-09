import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  useEffect(()=>{
    const fetchHelloWorld = async () =>{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/app/notes`)
      console.log(">>check res: ", res);
    }
    fetchHelloWorld();
  }, [])
  return (
    <>
      Hello World
    </>
  )
}

export default App
