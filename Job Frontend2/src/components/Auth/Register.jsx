import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';

const Register = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const [role,setRole]=useState("");
  const [phone,SetPhone]=useState("");
  const [image,setImage]=useState(null)
  const {SetAuthorized,SetUser,isAuthorized}=useContext(Context);
  const navigate=useNavigate();
  if(isAuthorized)navigate('/')
  const handleRegister=async (e)=>{try{
e.preventDefault();
//console.log({email,password,username,role,phone});
const form=new FormData();
form.append("email",email);
form.append("password",password);
form.append("username",username);
form.append("role",role);
form.append("phone",phone);
if(image){
  form.append("profile",image);

}
const udata=await axios.post("http://localhost:8000/api/auth/register/",form,{withCredentials:true});
console.log(udata);
if(udata.data.status){
  toast.success(udata.data.message);
  //navigate('/');
}else{
  toast.error(udata.data.message);
}

//console.log(udata);
// if(udata.data.status==true){
//   SetAuthorized(true);
//   console.log(udata)
//   SetUser(udata.data.user);
//   //toast.success("You are Registered")
// //navigate('/');
// }  
}
  catch(err){
    toast.error(err);
  }
  }
  return (
    <div className='flex flex-col justify-center items-center gap-9 my-6'>
      <div className='flex flex-col justify-center items-center'>
        <img alt="Image" src=""></img>
      <h1>Please Register Here</h1>
      </div>
 <div className='flex flex-col items-center'>
  <form onSubmit={handleRegister} className='flex flex-col items-center p-2 md:p-7 border-4 border-black'>
<h1>Enter Email</h1>
<input type='email' placeholder='yash@gmail.com' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
<h1>Enter Username</h1>
<input type='text' placeholder='yys12' value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
<h1>Enter Password</h1>
<input type='password' value={password}  onChange={(e)=>{setPassword(e.target.value)}}></input>
<h1>Enter Phone</h1>
<input type='number' value={phone}  onChange={(e)=>{SetPhone(e.target.value)}}></input>
<h1>Enter Role:</h1>
<select value={role} onChange={(e)=>setRole(e.target.value)}>
  <option value="">Select Role</option>
  <option value="Employer">Employer</option>
  <option value="Job seeker">Job Seeker</option>
</select>
<input type='file' onChange={(e)=>{setImage(e.target.files[0])}}></input>
<button type='submit' value="Register">Register</button>
  </form>
 </div>
    </div>
  )
}

export default Register