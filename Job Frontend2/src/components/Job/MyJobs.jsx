import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const {SetNav}=useContext(Context);
  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/jobs/myjobs', { withCredentials: true });
      if (res.data.status === true) {
        setJobs(res.data.jobs); // Corrected typo here
      }
      console.log(res);
    } catch (err) {
      toast.error(err.response.data.message); // Displaying the error message instead of the error object
    }
  };
  const [handleEdit,setEdit]=useState("");
  function setedit(id){
    setEdit(id);
  }
  function Disable(id){
    setEdit(id);
  }
  const update=async (JobId)=>{
    try{
const updated=jobs.find(job=>job._id===JobId);
await axios.put('http://localhost:8000/api/jobs/update/'+JobId,updated,{withCredentials:true}).then(()=>{
  toast.success("Job Updated");
}).catch((err)=>{toast.error(err.response.data.message)});

    }
    catch(err){
      toast(err.response.data.message)
    }
  }
const handleDelete=async (jobId)=>{
  try{
await axios.delete('http://localhost:8000/api/jobs/delete/'+jobId,{withCredentials:true}).then((res)=>{
//const de=res.data.updt;
setJobs(job=>job.filter(e=>e._id!=jobId));
toast.success("Job Deleted")
}).catch((err)=>{
  toast(err.response.data.message)
})
  }catch(err){
    toast(err.response.data.message)
  }
}
const HandleInputchange=(jobId,field,value)=>{
  setJobs(prev=>prev.map((j)=>(j._id===jobId?{...j,[field]:value}:j)));
}
  useEffect(() => {
    fetchJobs();
    SetNav("MyJob")
  }, []);

  return (
    <div className='flex flex-col w-full h-fit mt-6 min-h-screen items-center content-center'>
      <h1 className='font-bold text-5xl p-2 text-center'>Jobs Posted By You..</h1>
      <div className='flex flex-col p-2 gap-5 items-center justify-center'>
        {
        jobs.map(e=>{

return (<motion.div 
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
className='flex mt-12 bg-gray-100 p-3 flex-col w-[80vw] rounded-md gap-2 shadow-md shadow-slate-500'>
  <div className='flex gap-3'>
  <span className='font-bold'>Title:</span>
  <input type="text" disabled={handleEdit!=e._id?true:false}
  value={e.title}
  onChange={(ea)=>{
    HandleInputchange(e._id,"title",ea.target.value)
  }}
  ></input>
  </div>
  <div className='flex gap-3'>
  <span className='font-bold'>Country:</span>
  <input type="text" disabled={handleEdit!=e._id?true:false}
  value={e.country}
  onChange={(ea)=>{
    HandleInputchange(e._id,"country",ea.target.value)
  }}
  ></input>
  </div>
  <div className='flex gap-3'>
  <span className='font-bold'>City:</span>
  <input type="text" disabled={handleEdit!=e._id?true:false}
  value={e.city}
  onChange={(ea)=>{
    HandleInputchange(e._id,"city",ea.target.value)
  }}
  ></input>
  </div>
  <div className='flex gap-3'>
<span className='font-bold'>Category:</span>
  <input type="text" disabled={handleEdit!=e._id?true:false}
  value={e.category}
  onChange={(ea)=>{
    HandleInputchange(e._id,"category",ea.target.value)
  }}
  ></input>
  </div>
{
  e.fixedSalary?<span className='font-bold'>Fixed Salary:
    <input type="number" disabled={handleEdit!=e._id?true:false}
  value={e.fixedSalary}
  onChange={(ea)=>{
    HandleInputchange(e._id,"fixedSalary",ea.target.value)
  }}
  ></input>
  </span>:
  <div>
<span className='font-bold'> SalaryFrom:
    <input type="number" disabled={handleEdit!=e._id?true:false}
  value={e.salaryFrom}
  onChange={(ea)=>{
    HandleInputchange(e._id,"salaryFrom",ea.target.value)
  }}
  ></input>
  </span>
  <span className='font-bold'> Salary To:
    <input type="number" disabled={handleEdit!=e._id?true:false}
  value={e.salaryTo}
  onChange={(ea)=>{
    HandleInputchange(e._id,"salaryTo",ea.target.value)
  }}
  ></input>
  </span>
  </div>
  
}
<h1 className='font-bold' >is Expired:</h1>
<select disabled={handleEdit!=e._id?true:false}
  value={e.expired}
  onChange={(ea)=>{
    HandleInputchange(e._id,"expired",ea.target.value)
  }} >
  <option value={true}>True</option>
  <option value={false}>false</option>
</select>
<div className='flex gap-3'>
<h1 className='font-bold' >Description</h1>
<textarea 
disabled={handleEdit!=e._id?true:false}
value={e.description}
className='w-[80vw] md:h-[20vh] md:w-[40vw] h-[50vh]'
onChange={(ea)=>{
  HandleInputchange(e._id,"description",ea.target.value)
}}
></textarea>
</div>
<div className='flex gap-3'>
<span className='font-bold' >Location</span>
  <input type="text" disabled={handleEdit!=e._id?true:false}
  value={e.location}
  onChange={(ea)=>{
    HandleInputchange(e._id,"location",ea.target.value)
  }}
  ></input>
</div>
<div className='flex flex-row gap-2 items-center justify-between p-4'>
  {
  handleEdit===e._id?<>
  <button onClick={()=>{update(e._id)}} className='p-3 bg-green-400 rounded-md text-white' >Update</button>
  <button onClick={()=>Disable()} className='p-3 bg-red-400 rounded-md text-white'>Cancel</button>
  </>:
  <button onClick={()=>setEdit(e._id)} className='p-3 bg-gray-500 rounded-md text-white'>
    Edit
  </button>
  }
  <button onClick={()=>{handleDelete(e._id)}} className='p-3 bg-red-600 rounded-md text-white'>Delete</button>
 
</div>
</motion.div>)
})

        }

        
        </div> 
    
    </div>
  );
};

export default MyJobs;
