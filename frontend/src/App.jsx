import React, { useContext, useEffect } from "react";
import "./App.css";
import Header from "./components/layout/header";
import { Outlet } from "react-router-dom";
import axios from '../src/util/axios.customize';
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";
import { Toaster } from "@/components/ui/toaster";
// function getPayload(jwt){
//   // A JWT has 3 parts separated by '.'
//   // The middle part is a base64 encoded JSON
//   // decode the base64 
//   return atob(jwt.split(".")[1])
// }

// const payload = getPayload();

const App = () =>{
  const {setAuth, appLoading, setAppLoading} = useContext(AuthContext);

  useEffect(()  =>{
    const fetchAccount = async() =>{
      setAppLoading(true);
      const res = await axios.get(`/users/account`); //get user information

      if(res && !res.message){
        setAuth({
          isAuthenticated: true,
          user:{
              email: res.email,
              name:  res.name,
              _id: res._id, //add userId infor
              role: res.role
          }
        })
      }
      setAppLoading(false);
    }

    fetchAccount();
  }, []);

  return (
  <div>
    {appLoading == true ?
     <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
     }}>
      <Spin>

      </Spin>
    </div>
    :
    <>
      <Header/>
      <Outlet/>
      <Toaster/>
    </>
    }
  </div>)
}

export default App;
