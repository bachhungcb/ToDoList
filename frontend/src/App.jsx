import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from './util/axios.customize'

function App() {
  useEffect(()=>{
    const fetchHelloWorld = async () =>{
      const res = await axios.get(`/app/notes`)
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
