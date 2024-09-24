import React, { useContext, useEffect } from "react";
import "./App.css";
import Header from "./components/layout/header";
import { Outlet } from "react-router-dom";
import axios from '../src/util/axios.customize';
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

const App = () =>{
  const {setAuth, appLoading, setAppLoading} = useContext(AuthContext);

  useEffect(()  =>{
    const fetchAccount = async() =>{
      setAppLoading(true);
      const res = await axios.get(`/users/account`);

      if(res && !res.message){
        setAuth({
          isAuthenticated: true,
          user:{
              email: res.email,
              name:  res.name
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
    </>
    }
  </div>)
}

export default App;
