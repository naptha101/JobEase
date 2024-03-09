import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../../main';
import { useContext } from 'react';

const VerifyEmail = () => {
    const location=useLocation();
    
    const [token,setToken]=useState("");
    const { SetAuthorized, SetUser, isAuthorized } = useContext(Context);
    useEffect(()=>{
 setToken(location.search.split('=')[1]);

 if(location.search.split('=')[1].length==0){
    toast.error("Token not found")
 }else{
 handleVerification();}
    },[location.search.split('=')[1]]);
    const navigate=useNavigate();
    const handleVerification=async ()=>{
        try{
        await axios.post('http://localhost:8000/api/auth/verifymail',{token:location.search.split('=')[1]},{withCredentials:true}).then((data)=>{
        console.log(data);    
        if(data.data.status){
           toast.success(data.data.message) 
             SetAuthorized(true);
             SetUser(data.data.user);
             localStorage.setItem("user",JSON.stringify(data.data.user))
           navigate('/')
            }else{
                toast.error(data.data.message)
            }
        })
        }catch(err){
            console.log(err);
            toast.error("error ocurred")
        }
    }


  return (
    <div>verifyEmail</div>
  )
}


export default VerifyEmail