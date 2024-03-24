import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { FaPaperclip } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CiLocationOn } from 'react-icons/ci';
import userImg from '../../assets/userImg.png';
const Application = () => {
 const { isAuthorized, user ,SetNav} = useContext(Context);
  const { id } = useParams();
  const [job,setJob]=useState({});
  const [username, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [coverletter, setCover] = useState("");
  const [resume, setResume] = useState(null);
  const [by,setBy]=useState({});
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", username);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("coverletter", coverletter);
      formData.append("resume", resume);
      formData.append("address", address);
      formData.append("JobId", id);

      await axios.post('http://localhost:8000/api/application/post', formData, { withCredentials: true }).then((data) => {
        toast.success(data.data.message)
        console.log(data);
      }).catch((err) => {
        toast.error(err.response.data.message);
      })
    }
    catch (err) {
      toast.error(err.response.data.message);
    }
  }
const fetchJob=async ()=>{
  try{
    const data=await axios.get('http://localhost:8000/api/jobs/'+id,{withCredentials:true}).then((e)=>{
      setJob(e.data.job);
      fetchBy(e.data.job);
     console.log(e.data.job); 
       toast.success(e.data.message);
     }).catch(err)(
       toast.error("Error occured")
     )

  }
  catch(err){
    //toast.error("cant find job")
  }
}
const fetchBy=async (e)=>{
  try{
    console.log(e.postedBy);
const data=await axios.get(`http://localhost:8000/api/auth/getby/${e.postedBy}`).then((data)=>{
setBy(data.data.data);
console.log(data);
})
  }catch(err){
toast.success(err);
  }
}

  useEffect(() => {
   fetchJob();
  }, [user])
useEffect(()=>{
  SetNav("Application");
},[])

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-row w-full">
        {/* Left Section - Application Form */}
        <div className="w-1/2 p-8 bg-slate-400 m-2 rounded-md">
          <form onSubmit={handleUpload} className="space-y-4">
            <h1 className="text-2xl font-bold">Apply for the Job</h1>
            <input type='text' onChange={(e) => { setName(e.target.value) }} value={username} placeholder="Full Name" className="border border-gray-400 px-3 py-2 m-2 rounded-md focus:outline-none focus:border-black"></input>
            <input type='text' onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="Email Address" className="border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:border-black"></input>
            <input type='number' onChange={(e) => { setPhone(e.target.value) }} value={phone} placeholder="Phone Number" className="border border-gray-400 px-3 py-2 m-2 rounded-md focus:outline-none focus:border-black"></input>
            <input type='text' onChange={(e) => { setAddress(e.target.value) }} value={address} placeholder="Address" className="border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:border-black"></input>
            <textarea onChange={(e) => { setCover(e.target.value) }} value={coverletter} placeholder="Cover Letter" className="m-2 border h-[150%] w-[80%] border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:border-black"></textarea>
            <div className="flex items-center space-x-2">
              <label htmlFor="resume" className="border border-gray-400 px-3 py-2 rounded-md cursor-pointer bg-slate-600 hover:bg-slate-700 mx-2 text-white ">Upload Resume</label>
              <input type='file' id="resume" onChange={(e) => { setResume(e.target.files[0]) }} className="hidden"></input>
              {resume && <span className="text-gray-500">{resume.name}</span>}
            </div>
            <button type="submit" value={"Submit"} className='text-bold cursor-pointer flex flex-row item-center justify-center bg-slate-600 hover:bg-slate-700 mx-2 text-white px-6 py-3 rounded-md'>
             Apply <FaPaperclip className='m-1'></FaPaperclip>
            </button>
          </form>
        </div>
        {/* Right Section - Job Image and Title */}
        <div className="w-1/2 p-8 flex flex-col justify-center items-center">

          <div className='w-[300px] h-[300px] border border-black border-2 rounded-full overflow-hidden'>
  <img className="w-[300px] h-[230px] " src={by.profileSet?by.profile.url:userImg}></img>
</div>
          <h1 className="text-3xl font-bold">{job.title?job.title:"Undefiened"}</h1>
          <Link to={'/userprofile/'+by._id}><h1>{by.username}</h1></Link>
          <h1 className="text-xl font-bold"><CiLocationOn></CiLocationOn>{job.location?job.country+" "+job.city+" "+job.location:"Undefiened"}</h1>
        </div>
      </div>
    </div>
  )
}

export default Application;
