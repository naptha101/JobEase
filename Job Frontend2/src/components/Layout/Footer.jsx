import React, { useContext } from 'react';
import { Context } from '../../main';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <footer className={`flex flex-row w-full py-4 px-10 items-center bg-gray-800 text-white ${isAuthorized ? '' : 'hidden'}`}>
      <div className='flex flex-col items-center'> &copy; All Rights Reserved By Yash</div>
      <ul className='flex flex-row justify-center gap-5'>
        <li>
          <Link to='/' target='_blank'><FaFacebook/></Link>
        </li>
        <li>
          <Link to='/' target='_blank'><FaLinkedin/></Link>
        </li>
        <li>
          <Link to='/' target='_blank'><FaGithub/></Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
