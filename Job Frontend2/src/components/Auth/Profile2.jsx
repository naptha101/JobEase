import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import userImg from '../../assets/userImg.png';
import Resume from '../../assets/Resume.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { FaRegEye } from 'react-icons/fa6';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

const Profile2 = () => {
  const [user2, setUser] = useState({});
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
   const {user}=useContext(Context);
  const fetchUser = async () => {
    await axios.get(`http://localhost:8000/api/auth/getby/${id}`, { withCredentials: true }).then((res) => {
      setUser(res.data.data);
      console.log(res.data.data)
      setCreatedAt(formatDate(res.data.data.createdAt));
      if(res.data.data.profileSet)setProfile(res.data.data.profile.url);
      fetchJobs(res.data.data._id);
      setShowProfile(true);
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const [jobs, setJobs] = useState([]);
  
  const fetchJobs = async (id) => {
    try {
      const res = await axios.post('http://localhost:8000/api/jobs/getallfor',{id2:id});
      if (res.data.status === true) {
        setJobs(res.data.jobs); // Corrected typo here
      }
      console.log(res);
    } catch (err) {
      toast.error(err.response.data.message); // Displaying the error message instead of the error object
    }
  };
  
  const makePayment = async (e) => {
    try {
   //   console.log(e);
        const expert={name:e.username,price:e.expertDes.fees,id:e._id};
      const response = await axios.post('http://localhost:8000/payment', { expert:expert });
     console.log(response)
      const { sessionId } = response.data;
      const stripePromise = loadStripe('pk_test_51OuqngSC1axPl2WrFWcObEpnJCc7pEA03sCG9rwxYuyWyddAgLQpG9MCWQGGAw5h73dGJEkGvUrV5lkDYD9jhsDv00o1ozRFtD');
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId });
     
      if (result.error) {
        console.log(result.error);
        toast.error("Error in payment");
      }
      toast.success('Payment is Initialized')
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
// useEffect(()=>{
//   fetchJobs()
// },[user]);
const navigate=useNavigate();
  return (
    <div className='flex flex-col md:flex-row w-full min-h-screen justify-center items-start bg-gray-100'>
      <div className={`flex item-center flex-col border border-2 border-gray-300 rounded-lg p-8 mx-4 md:w-2/3 bg-white ${showProfile ? "scale-in" : ""}`}>
        <h1 className='text-4xl font-bold mb-6'>User Profile</h1>
        <div className='flex flex-col gap-4'>
          <div>
            <p className='text-lg'><span className='font-bold'>Name:</span> {user2.username}</p>
          </div>
          <div>
            <p className='text-lg'><span className='font-bold'>Role:</span> {user2.role}</p>
          </div>
          <div>
            <p className='text-lg'><span className='font-bold'>Email:</span> {user2.email}</p>
          </div>
          <div>
            <p className='text-lg'><span className='font-bold'>Phone:</span> {user2.phone}</p>
          </div>
          <div>
            <p className='text-lg'><span className='font-bold'>Joined:</span> {createdAt}</p>
          </div>
        {user2.role=='Expert'&& <div className='p-4 bg-gray-300 rounded-md gap-4'>
            <p className='text-lg'><span className='font-bold'>Experiece:</span> {user2.expertDes.experience}</p>
            <p className='text-lg' ><span className='font-bold'>Fees:</span>$:<p className='p-2 rounded-md bg-blue-300 inline px-2' onClick={()=>makePayment(user2)}>{user2.expertDes.fees}</p></p>
            <p className='text-lg'><span className='font-bold caption-top'>clients:</span> {user2.expertDes.clients.length}</p>
   
       <div className='flex justify-between p-3'>
     <button>
      Contact
     </button>
      

       </div>
          </div>

        }
          <div className='flex flex-col gap-2 min-h-[80%] w-full overflow-y-auto px-3 py-4 ' style={{ maxHeight: 'calc(90vh - 12rem)',scrollbarWidth:'10px' }}>
          {
          jobs.length > 0 ? jobs.map((job, i) => (
            <div key={i} onClick={() => navigate('/job/' + job._id)} className="flex rounded-lg px-3 flex-col gap-1 w-[100%] shadow-md shadow-gray-600 p-2 bg-gray-300 cursor-pointer ">
              <p className='text-2xl fornt-bold'>{job.title}</p>
              <div className="bg-gray-400 p-2 px-3 shadow-lg shadow-slate-500 rounded-md w-fit">{job.category}</div>
              <h2>{job.description}</h2>
              <p className='text-gray font-extralight'><CiLocationOn></CiLocationOn> {`${job.country} ${job.city} ${job.location}`}</p>
              <p className='text-gray font-extralight'> Expired :{`${job.expired}`}</p>
              <p className="text-xs text-right flex flex-row items-center gap-2 justify-end"><FaRegEye></FaRegEye> {job.count ? job.count : "0"}</p>
            </div>
          )) : <h1 className='text-4xl align-middle text-center '> No Jobs To show</h1>
        }

          </div>
        </div>
      </div>
      <div className={`flex flex-col items-center justify-center border border-2 border-gray-300 rounded-lg p-8 mx-4 md:w-1/3 bg-white ${showProfile ? "slide-up" : ""}`}>
        <div className='mt-8'>
          <img src={profile ? profile : userImg} alt="User" className='rounded-full w-32 h-32 object-cover shadow-lg' />
        </div>
        <h1 className='text-2xl font-bold mt-4'>{user.username}</h1>
        {user.role === "Job seeker" &&
          <div className='flex flex-col items-center mt-8'>
            <img src={user.isResume ? user.resume : Resume} alt="Resume" className='w-20 h-20 object-cover shadow-lg' />
            <h1 className='text-lg mt-2'>{user.isResume ? "Resume Available" : "Resume Not Available"}</h1>
          </div>
        }
      </div>
    </div>
  );
};

export default Profile2;
