import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../main';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { SetAuthorized, SetUser, isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login/", { email, password, role }, { withCredentials: true });

      if (response.data.status) {
        SetAuthorized(true);
        SetUser(response.data.existingUser);
        localStorage.setItem("user", JSON.stringify(response.data.existingUser));
        toast.success("You are Logged In");
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error Occurred");
    }
  }
  const handleForgot=async ()=>{
    try{
await axios.post('http://localhost:8000/api/auth/forgotpassword',{email:email},{withCredentials:true}).then((e)=>{
  if(e.data.status){
  toast.success(e.data.message)}
  else{
    toast.error(e.data.message);
  }
})

    }
    catch(err){
///console.log(err);
    }
  }

  return (
    <div className='flex flex-col md:flex-row h-screen w-full items-center gap-9 my-6'>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full md:w-3/4 max-w-lg">
          <div className='flex flex-col items-center'>
            <form onSubmit={handleLogin} className='flex flex-col items-center p-2 md:p-7 border-4 border-gray-300 rounded-lg shadow-md bg-slate-400'>
              <h1 className="text-lg font-semibold mt-4">Enter Email</h1>
              <input type='email' placeholder='yash@gmail.com' value={email} className="rounded-md px-4 py-1" onChange={(e) => setEmail(e.target.value)} ></input>

              <h1 className="text-lg font-semibold mt-4">Enter Password</h1>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md px-4 py-1  focus:scale-105 focus:border-1 focus:border-black"  ></input>

              <h1 className="text-lg font-semibold mt-4">Select Role:</h1>
              <select value={role} className="rounded-md px-4 py-1" onChange={(e) => setRole(e.target.value)} >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job seeker">Job Seeker</option>
              </select>

              <button type='submit' className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-6 hover:bg-blue-600 transition duration-300">Login</button>
            </form>
<div className='flex flex-row gap-3 bg-transparent text-pretty'>
  <h1>If new get yourself registerd <Link to='/register'>Register</Link></h1>
  <h1 onClick={()=>handleForgot()} className='hover:cursor-pointer' > Forgot Password</h1>
</div>

          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center">
        <div className="marquee flex flex-col">
          <span className='text-7xl font-serif' >Get Yourself</span>
          <span className='text-7xl font-serif' >  Hired Here..</span>
        </div>
      </div>
    </div>
  )
}

export default Login;
