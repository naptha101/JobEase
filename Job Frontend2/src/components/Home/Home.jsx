import React, { useContext, useEffect } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import HowItWork from './HowItWork';
import PopularCompany from './PopularCompany';
import PopularCategoies from './PopularCategoies';

const Home = () => {
  const {isAuthorized,user,SetNav}=useContext(Context);
const navigate=useNavigate();

if(!isAuthorized){
  navigate('/login');
}
useEffect(()=>{
SetNav("Home");
},[])
  return (
    <section className="mt-[5%] flex-col flex gap-4">
      <HeroSection>
      </HeroSection>
      <HowItWork></HowItWork>
      <PopularCategoies></PopularCategoies>
      <PopularCompany></PopularCompany> 

    </section>
  )
}

export default Home