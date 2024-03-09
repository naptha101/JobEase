import React, { useContext, useState } from 'react';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import { MdMapsHomeWork } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";
import userImg from '../../assets/userImg.png';

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthorized, SetAuthorized, user, SetUser } = useContext(Context);
  const [show, setShow] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/auth/logout', { withCredentials: true });
      console.log(res);
      if (res) {
        SetAuthorized(false);
        toast.success(res.data.message);
        localStorage.removeItem("user");
        navigate('/login');
      }
    } catch (err) {
      navigate('/login');
      toast.error(err.message);
    }
  }

  return (
    <div className='flex flex-row justify-between fixed top-0 w-full h-fit p-2 py-2 bg-gray-500'>
      <div className='hover:cursor-pointer p-1 flex flex-row items-center justify-center gap-5'>
        <MdMapsHomeWork size={35} />
        <p className='text-2xl font-serif'>Job Ease</p>
      </div>
      
      <ul className={ `p-1 flex flex-row gap-2 text-white w-fit h-full ${isAuthorized ? "" : "hidden"}`}>
        <li>
          <Link to='/' onClick={()=>{setShow(false)}}>Home</Link>
        </li>
        <li>
          <Link to='/job/getall' onClick={()=>{setShow(false)}} >Jobs</Link>
        </li>
        <li>
          <Link to='/application/me' onClick={()=>{setShow(false)}}>{user.role==='Employer'?"Applicant's Application":"My Applications"}</Link>
        </li> 
        {user.role==='Employer' && (
          <>
            <li>
              <Link onClick={()=>{setShow(!show)}} to='/job/post'>Post Job</Link>
            </li>
            <li>
              <Link onClick={()=>{setShow(!show)}}  to='/job/my'>My Jobs</Link>
           
            </li>
          </>
        )}
        <li>
          <button onClick={()=>{handleLogout()}}>Log Out</button>
        </li> 
        <li>
          <div onClick={()=>{navigate('/profile/'+user._id)}} className='w-[40px] h-[35px] ml-10 rounded-full overflow-hidden'>
            <img className="w-[50px] h-[35px]" src={user.profileSet ? user.profile.url : userImg} alt="User" />
          </div>
         
        </li>
        <TiThMenu onClick={()=>{setShow(!show)}} />
      </ul>
    </div>
  );
}

export default NavBar;
