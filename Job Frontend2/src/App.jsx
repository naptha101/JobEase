import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import axios from 'axios';
import { Context } from './main';
import NavBar from './components/Layout/NavBar';
import { BrowserRouter as Router,Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home/Home';
import Jobs from './components/Job/Jobs';
import JobDetails from './components/Job/JobDetails';
import MyJobs from './components/Job/MyJobs';
import PostJob from './components/Job/PostJob';
import Application from './components/Application/Application';
import MyApplication from './components/Application/MyApplication';
import NotFound from './components/NotFound/NotFound';
import Profile2 from './components/Auth/Profile2';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Layout/Footer';
import Profile from './components/Auth/Profile';
import VerifyEmail from './components/Auth/verifyEmail';
import ForgotPassword from './components/Auth/ForgotPassword';
import ExpertAll from './components/Experts/ExpertAll';
import ExpertSucess from './components/Experts/ExpertSucess';
import Contact from './components/Contact/Contact';
function App() {

  const {isAuthorized,SetAuthorized,user,SetUser}=useContext(Context);

  useEffect(()=>{
const fetchUser= async ()=>{
  try{
const res=await axios.get('http://localhost:8000/api/auth/getuser',{withCredentials:true});
if(res.data.status){
  
  SetUser(res.data.user);
  //console.log(user);
  localStorage.setItem("user",JSON.stringify(res.data.user));
  SetAuthorized(true);
 
}
  }catch(err){
    SetUser({});
SetAuthorized(false);
  }
}

fetchUser()
  },[isAuthorized])

  return (
    <div className='flex bg-white flex-col w-full h-auto gap-2'>

    <Router>
     <NavBar></NavBar> 
      <Routes>
        <Route path='/expert/all' element={<ExpertAll></ExpertAll>}></Route>
        <Route path='/success/expert/:id' element={<ExpertSucess></ExpertSucess>}></Route>
        <Route path='/profile/:id' element={<Profile></Profile>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/' element={<Home/>}></Route>
     <Route path='/job/getall' element={<Jobs></Jobs>}></Route>
     <Route path='/job/:id' element={<JobDetails></JobDetails>}></Route>
      <Route path='/job/my' element={<MyJobs></MyJobs>}></Route>
      <Route path='/job/post' element={<PostJob></PostJob>}></Route>
      <Route path='/application/:id' element={<Application></Application>}></Route>
      <Route path='/application/me' element={<MyApplication></MyApplication>}></Route>
      <Route path='*' element={<NotFound></NotFound>}></Route>
      <Route path='/userprofile/:id' element={<Profile2></Profile2>}></Route>
      <Route path='/verifyemail' element={<VerifyEmail></VerifyEmail>}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword></ForgotPassword>}></Route>
      <Route path='/contact' element={<Contact></Contact>}></Route>
      </Routes>
      <Toaster></Toaster>
    <Footer></Footer>
    </Router>

    </div>
  )
}

export default App
