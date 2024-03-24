import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createContext } from 'react'
export const Context=createContext({isAuthorized:false});
const AppWrapper=()=>{
  const [isAuthorized,SetAuthorized]=useState(false);
  const [user,SetUser]=useState({});
  const [nav,SetNav]=useState("Home");
  return(
    
<Context.Provider value={{isAuthorized,SetAuthorized,user,SetUser,nav,SetNav}}>
  <App></App>
</Context.Provider>

  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
 
   <AppWrapper ></AppWrapper>
 
)
