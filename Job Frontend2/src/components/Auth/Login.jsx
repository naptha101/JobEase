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

  const handleForgot = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/forgotpassword', { email: email }, { withCredentials: true });
      if (response.data.status) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='flex flex-col md:flex-row h-screen w-full items-center gap-9 my-6'>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full md:w-3/4 max-w-lg">
          <div className='flex flex-col items-center'>
            <form onSubmit={handleLogin} className='flex flex-col items-center p-6 border-4 border-gray-300 rounded-lg shadow-md bg-blue-200'>
              <h1 className="text-lg font-semibold mt-4">Enter Email</h1>
              <input type='email' placeholder='Enter your email' value={email} className="rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:ring focus:border-blue-500" onChange={(e) => setEmail(e.target.value)} />

              <h1 className="text-lg font-semibold mt-4">Enter Password</h1>
              <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:ring focus:border-blue-500" />

              <h1 className="text-lg font-semibold mt-4">Select Role:</h1>
              <select value={role} className="rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:ring focus:border-blue-500" onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job seeker">Job Seeker</option>
                <option value="Expert">Expert</option>
              </select>

              <button type='submit' className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg mt-6 hover:bg-blue-600 transition duration-300 focus:outline-none">Login</button>
            </form>

            <div className='flex flex-row gap-3 mt-4'>
              <h1 className='text-lg text-blue-800'>If new, <Link to='/register' className='underline'>Register here</Link></h1>
              <h1 className='text-lg text-blue-800 cursor-pointer' onClick={handleForgot}>Forgot Password</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center">
        <div className="marquee flex flex-col">
          <span className='text-7xl font-serif text-blue-800'>Welcome Back!</span>
          <span className='text-7xl font-serif text-blue-800'>Login to access your account</span>
        </div>
      </div>
    </div>
  )
}

export default Login;
