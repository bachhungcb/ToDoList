import React from "react";
import ToDoList from "./ToDoList";
import NavBar from './components/NavBar'
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Events from "./pages/events";
import AnnualReport from "./pages/annual";
import Teams from "./pages/team";
import Blogs from "./pages/blogs";
import SignUp from "./pages/signup";


function App(){
  return(
  <Router>
    <NavBar/>
      <Routes>
                <Route path="/" element={<ToDoList/>} />
                <Route path="/about" element={<ToDoList/>} />
                <Route
                    path="/events"
                    element={<Events />}
                />
                <Route
                    path="/annual"
                    element={<AnnualReport />}
                />
                <Route path="/team" element={<Teams />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route
                    path="/sign-up"
                    element={<SignUp />}
                />
      </Routes>
  </Router>

  );
}

export default App;