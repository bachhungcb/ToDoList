import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() =>{
    const fetchHelloWorld = async()  =>{
      const res = await axios.get("http://localhost:5000/app/notes");
      console.log(">>check res: ", res);
    }
    fetchHelloWorld();
  }, [])
  return (
    <>
      Hello World
    </>
  );
}

export default App;
