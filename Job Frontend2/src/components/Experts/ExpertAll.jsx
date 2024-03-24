import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import userImg from '../../assets/userImg.png';
import { loadStripe } from '@stripe/stripe-js';

const ExpertAll = () => {
  const [expert, setExperts] = useState([]);
  const { user,SetNav } = useContext(Context);
  const navigate = useNavigate();

  const fetchExpert = async () => {
    try {
      const data = await axios.get('http://localhost:8000/api/auth/expert/all');
      if (data.data.status) {
        toast.success(data.data.message);
        setExperts(data.data.experts);
      } else {
        toast.error(data.data.message);
      }
    } catch (err) {
      toast.error("Error Occurred");
    }
  }

  useEffect(() => {
    SetNav("Expert");
    fetchExpert();
  }, []);
  
  
  
  const makePayment = async (e) => {
    try {
        const expert={name:e.username,price:e.expertDes.fees,id:e._id};
      const response = await axios.post('http://localhost:8000/payment', { expert:expert });
      const { sessionId } = response.data;
      const stripePromise = loadStripe('pk_test_51OuqngSC1axPl2WrFWcObEpnJCc7pEA03sCG9rwxYuyWyddAgLQpG9MCWQGGAw5h73dGJEkGvUrV5lkDYD9jhsDv00o1ozRFtD');
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) {
        console.log(result.error);
        toast.error("Error in payment");
      }
    } catch (error) {
      console.error("Error making payment:", error);
      toast.error("Error in payment");
    }
  }

  const SendMail = async (e) => {
    try {
       // console.log(expert);
      const mail = await axios.post('http://localhost:8000/api/expert/send', { email:user.email, User: user._id,ExpId:e._id });
      console.log(mail);
    } catch (err) {
      toast.error("Can't send Mail");
    }
  }

  return (
    <div className='pt-3 w-full min-h-screen mt-7'>
      <h1 className='text-5xl text-center'>Get in contact with our experts with counseling and Resume Review</h1>
      <div className='mt-16 overflow-y p-2 h-[80vh] gap-3 flex flex-col bg-gray-200'>
        {/* <button onClick={makePayment}>Pay</button> */}
        {expert.length > 0 ? expert.map((e, i) => (
          <div key={i} className="flex flex-col gap-1 w-[100%] shadow-md shadow-gray-600 bg-white cursor-pointer rounded-md p-4">
            <div className=' '>
              <div className='flex justify-between items-center'>
                <div className='flex justify-between items-center'>
                  <p className='text-2xl font-bold' onClick={() => navigate('/userprofile/' + e._id)}>{e.username}</p>
                  <p className='text-xl ms-5 font-semibold px-2 py-3 bg-blue-300 rounded-md ' onClick={()=>{if(e.expertDes.free)makePayment(e)}} >{e.expertDes.free ? "Free" :`${e.expertDes.fees}`}</p>
                </div>
                <div className='w-[40%] flex justify-between mt-5'>
                  <p className=' font-semibold'>Experience:{e.expertDes.experience}</p>
                  <p className=' font-semibold'>Joined On:{e.createdAt.toString().substring(0, 10)}</p>
                 { e.expertDes.free&&<button className='underline' onClick={()=>SendMail(e)}>Contact</button>}

                </div>
                <div className='w-[100px] h-[100px] border border-black border-2 rounded-full overflow-hidden'>
                  <img className="w-[125px] h-[125px] " src={e.profileSet ? e.profile.url : userImg} alt="user profile" />
                </div>
              </div>
            </div>
          </div>
        )) : <h1 className='text-4xl align-middle text-center '> No Experts To show</h1>}
      </div>
    </div>
  );
}

export default ExpertAll;
