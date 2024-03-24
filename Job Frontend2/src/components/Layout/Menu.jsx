import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import { MdMapsHomeWork } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";
import userImg from '../../assets/userImg.png';
import { motion } from 'framer-motion';


const Menu = (props) => {
    const navigate = useNavigate();
    const { isAuthorized, SetAuthorized, user, SetUser,nav } = useContext(Context);
    const show=props.show;
    const setShow=props.setShow;
    const [isHidden, setIsHidden] = useState(false); 
    useEffect(() => {
      let lastScrollTop = 0;
  
      const handleScroll = () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
        if (currentScroll > lastScrollTop) {
          // Scrolling down
          setIsHidden(true);
        } else {
          // Scrolling up
          setIsHidden(false);
        }
  
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
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
    };
  
    return (
      <div className={`transition-transform duration-100 ${isHidden ? '-translate-y-full' : 'translate-y-0'} flex flex-col justify-between fixed top-0 w-full h-[50vh] p-1 py-2 bg-[#3652AD]`}>
        <div className='hover:cursor-pointer p-1 flex flex-row items-center justify-center gap-3'>
          <MdMapsHomeWork color='white' size={30} />
          <p className='text-xl font-serif text-white'>Job Ease</p>

        </div>
  <div className='w-full text-white flex justify-end items-end'>
  <TiThMenu onClick={() => { setShow(!show) }} /></div>
        <ul className={`p-1 flex flex-col gap-2 items-center justify-center text-white ${isAuthorized ? "" : "hidden"}`}>
          <li>
            <Link to='/' onClick={() => setShow(false)} className={`${nav=='Home'? "underline":"" }`} >Home</Link>
          </li>
          {user.role === 'Job seeker' &&
            <li>
              <Link to='/expert/all' className={`${nav=='Expert'? "underline":"" }`} onClick={() => setShow(false)}>Experts</Link>
            </li>}
          <li>
            <Link to='/job/getall' className={`${nav=='Job'? "underline":"" }`} onClick={() => setShow(false)}>Jobs</Link>
          </li>
          <li>
            <Link to='/application/me' className={`${nav=='Employer'||nav=="Applicant's Application"? "underline":"" }`} onClick={() => setShow(false)}>{user.role === 'Employer' ? "Applicant's Application" : "My Applications"}</Link>
          </li>
          {user.role === 'Employer' && (
            <>
              <li>
                <Link className={`${nav=='PostJob'? "underline":"" }`} onClick={() => setShow(!show)} to='/job/post'>Post Job</Link>
              </li>
              <li>
                <Link className={`${nav=='MyJob'? "underline":"" }`} onClick={() => setShow(!show)} to='/job/my'>My Jobs</Link>
              </li>
            </>
          )}
          <li>
            <button onClick={() => { handleLogout() }}>Log Out</button>
          </li>
          <li>
            <div onClick={() => { navigate('/profile/' + user._id) }} className='w-[40px] h-[35px] ml-4 rounded-full overflow-hidden'>
              <img className="w-[50px] h-[33px]" src={user.profileSet ? user.profile.url : userImg} alt="User" />
            </div>
          </li>
          
        </ul>
      </div>
      )
}

export default Menu