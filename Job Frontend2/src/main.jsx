import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createContext } from 'react'
export const Context=createContext({isAuthorized:false});
const AppWrapper=()=>{
  const [isAuthorized,SetAuthorized]=useState(false);
  const [user,SetUser]=useState({});
  return(
<Context.Provider value={{isAuthorized,SetAuthorized,user,SetUser}}>
  <App></App>
</Context.Provider>

  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
 
   <AppWrapper ></AppWrapper>
 
)
