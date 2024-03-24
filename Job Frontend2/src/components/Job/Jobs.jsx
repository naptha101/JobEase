import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { FaRegEye } from "react-icons/fa";
import axios from 'axios';
import { CiLocationOn } from "react-icons/ci";
import toast from 'react-hot-toast';
import userImg from '../../assets/userImg.png'
import { Link, useNavigate } from 'react-router-dom';
import { IoReload } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { easeInOut, motion } from 'framer-motion';

const Jobs = () => {
  const [by,setBy]=useState([]);
  
  const [jobs, setJobs] = useState([]);
  const [copy, setCopy] = useState([]);
  const [seekValue, setSeek] = useState(0);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [radio, setRadio] = useState(""); // State to hold the selected radio button value
  const { isAuthorized ,SetNav} = useContext(Context);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/jobs/getall', { withCredentials: true });
      if (res.data.status === true) {
        setCopy(res.data.jobs);
        setJobs(res.data.jobs);
        res.data.jobs.map((e,i)=>(
          fetchBy(e,i)
        ))
        toast.success("Here are your jobs");
      } else {
        toast.error("Cannot fetch jobs");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const fetchBy=async (e,i)=>{
    try{
      console.log(by);
      //console.log(e.postedBy);
const data=await axios.get(`http://localhost:8000/api/auth/getby/${e.postedBy}`).then((data)=>{
  setBy([...by,by.push(data.data.data)])
console.log(by[i]);
})
    }catch(err){
toast.success(err);
    }
  }

  useEffect(() => {
    fetchJobs();
    SetNav("Job")
  }, [Jobs]);

  const handleFilter = (e) => {
    e.preventDefault();
    let filteredJobs = copy.filter(job => {
      if (job.fixedSalary) {
        return job.fixedSalary >= seekValue * 1000 && (category === "" || job.category === category) && (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.category.toLowerCase().includes(searchTerm.toLowerCase()));
      } else {
        return job.salaryFrom >= seekValue * 1000 && (category === "" || job.category === category) && (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.category.toLowerCase().includes(searchTerm.toLowerCase()));
      }
    });

    setJobs(filteredJobs);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    const filteredJobs = copy.filter(job => job.title.toLowerCase().includes(e.target.value.toLowerCase()) || job.category.toLowerCase().includes(e.target.value.toLowerCase()));
    setJobs(filteredJobs);
  };

  const HandleDate = () => {
    let filteredJobs = [...jobs]; 
    if (radio === "Latest") {
      filteredJobs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (radio === "Oldest") {
      filteredJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setJobs(filteredJobs); 
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen  max-h-fit w-full'>
      <div className='flex flex-row my-12 w-3/10 mx-8 py-6  '>
        <fieldset className='border-2 rounded-sm border border-[#3652AD]   '>
          <legend className='p-1 text-md'>Filters</legend>
          <form className='p-2 w-full flex-col md:flex-row h-full' onSubmit={handleFilter}>
            <div className='flex flex-row items-center gap-1 p-2'>
              <input
                type="text"
                placeholder="Title or Category"
                value={searchTerm}
                className='rounded-md underline-offset-4 focus:border-none underline focus:bg-slate-100'
                onChange={handleChange}
              />
              <IoSearch onClick={handleChange} className='hover:scale-105 cursor-pointer'></IoSearch>
            </div>
            <hr className='h-[0.4%] w-full  bg-blue-700 my-5'></hr>
            <div className='flex flex-row gap-2 my-5'>
            <input
              type="range"
              onChange={(e) => setSeek(e.target.value)}
              value={seekValue}
              min="0"
              max="1000"
              id="seekbar"
            />
            <p>Salary: <span id="seekbarValue">{seekValue * 1000}</span></p>
            </div>
            <div className='flex gap-2 my-5'>
            <label>Search by Category:</label>
            <select className='bg-gray-200 p-1 rounded-md' onChange={(e) => { setCategory(e.target.value); }}>
              <option value={""}>Select</option>
              <option value={"Engineering"}>Engineering</option>
              <option value={"Android"}>Android</option>
              <option value={"Software"}>Software</option>
              <option value={"Non-Tech"}>Non-Tech</option>
            </select>
            </div>
            <div className='flex flex-col md:flex-row my-3 justify-around'>
              <button className='hover:cursor-pointer bg-[#3652AD] text-white hover:scale-105 duration-100 px-4 rounded-md' type='submit'>Apply</button>
              <IoReload size={35} onClick={() => { console.log(copy); setJobs(copy) }}></IoReload>
            </div>
            <div className='flex p-3 items-center justify-center gap-3 rounded-md bg-slate-300'>
              <IoFilter></IoFilter>
              <label><input type='radio' value={"Latest"} onChange={(e) => { setRadio(e.target.value); HandleDate() }} name='date' ></input> Latest</label>
              <label><input type='radio' value={"Oldest"} onChange={(e) => { setRadio(e.target.value); HandleDate() }} name='date' ></input>Oldest</label>
            </div>
          </form>
        </fieldset>
      </div>
      <div className='flex flex-col gap-4 py-3 px-2 mx-3 my-4 min-h-screen w-full overflow-y-auto ' style={{ maxHeight: 'calc(100vh - 12rem)', scrollbarWidth: 'none' }}>
      {jobs.length > 0 ? jobs.map((job, i) => (
    <motion.div initial={{opacity:0,y:-50}} animate={{opacity:1,y:0}} transition={{duration:0.8}}  key={i} onClick={() => navigate('/job/' + job._id)} className="flex  flex-col gap-1 w-[100%] shadow-md shadow-gray-600  cursor-pointer rounded-md p-4">
      
        <div className=' '>
           
           <div className='flex justify-between items-center'> <p className='text-2xl fornt-bold'>{job.title}</p>
         {by[i]&&by[i].profileSet&&<div className='w-[100px] h-[100px] border border-black border-2 rounded-full overflow-hidden'>
  <img className="w-[125px] h-[125px] " src={by[i].profileSet?by[i].profile.url:userImg}></img>
</div>}
           </div>
            {/* Check if by[i] exists before accessing its properties */}
            {by[i] && <Link onClick={()=>navigate('userprofile/'+by[i]._id)}>{by[i].username}</Link>}
        </div>
        <div className="bg-[#3652AD] p-2 rounded-md w-fit text-white">{job.category}</div>
        <h2>{job.description}</h2>
        <p className='text-gray font-extralight'><CiLocationOn></CiLocationOn> {`${job.country} ${job.city} ${job.location}`}</p>
        <p className="text-xs text-right flex flex-row items-center gap-2 justify-end"><FaRegEye></FaRegEye> {job.count ? job.count : "0"}</p>
    </motion.div>
)) : <h1 className='text-4xl align-middle text-center '> No Jobs To show</h1>}

      </div>
    </div>
  );
};

export default Jobs;
