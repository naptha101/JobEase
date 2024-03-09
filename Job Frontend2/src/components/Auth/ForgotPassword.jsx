import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../../main';

const ForgotPassword = () => {
const location=useLocation();
const {isAuthorized}=useContext(Context);
//const [tok,setToken]=useState("");
const navigate=useNavigate();
const [data,setData]=useState({token:"",password:"",confirmPassword:""});
const HasndleSubmit=async (e)=>{
    e.preventDefault();
//console.log("helo");
    if(data.password===""||data.confirmPassword===""){
        toast.error("Please enter all the fields");

    }
    if(data.password!=data.confirmPassword){
        toast.error("password and confirm password not matching ");
    }
    setData({...data,token:location.search.split("=")[1]})
    
    await axios.put('http://localhost:8000/api/auth/handleforgot',{token:location.search.split('=')[1],password:data.password}).then((e)=>{
    if(e.data.status){
        toast.success(e.data.message);
         navigate('/login')
    }else{
        toast.error(e.data.message);
        setData({...data,password:"",confirmPassword:""});
    }
    }).catch((e)=>toast.error("Error occured"))
}
if(isAuthorized){
    navigate('/')
}
useEffect(()=>{
    console.log(isAuthorized)
if(isAuthorized){
    navigate('/')
}
},[])
    return (
    <div className='flex flex-row items-center justify-center h-screen w-full'>
<div className='w-[60%] h-[70vh] rounded-xl bg-slate-400'>
<form onSubmit={HasndleSubmit}  className=" flex flex-col gap-2 py-6 p-4 rounded-xl ">
<><h1>enter new password:</h1>
<input type='password' className='p-2 rounded-xl' onChange={(e)=>{setData({...data,password:e.target.value})}} value={data.password}></input></>
<><h1>confirm password:</h1>
<input type='password' className='p-2 rounded-xl ' onChange={(e)=>{setData({...data,confirmPassword:e.target.value})}} value={data.confirmPassword}></input></>
<button type='submit' className='p-3 rounded-xl bg-lime-300' >Change password</button>
</form>
</div>
    

    </div>
  )
}

export default ForgotPassword