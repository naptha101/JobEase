import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  
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
  }, []);

  return (
    <div className='flex flex-col w-full h-fit items-center content-center'>
      <div className='flex flex-col p-2 gap-5 items-center justify-center'>
        {
        jobs.map(e=>{

return (<div className='flex flex-col w-[80vw] rounded-md gap-2 shadow-md shadow-slate-500'>
  <span>title</span>
  <input type="text" disabled={handleEdit!=e._id?true:false}
  value={e.title}
  onChange={(ea)=>{
    HandleInputchange(e._id,"title",ea.target.value)
  }}
  ></input>
  <span>Country</span>
  <input type="text" disabled={handleEdit!=e._id?true:false}
  value={e.country}
  onChange={(ea)=>{
    HandleInputchange(e._id,"country",ea.target.value)
  }}
  ></input>
  <span>City:</span>
  <input type="text" disabled={handleEdit!=e._id?true:false}
  value={e.city}
  onChange={(ea)=>{
    HandleInputchange(e._id,"city",ea.target.value)
  }}
  ></input>
<span>category</span>
  <input type="text" disabled={handleEdit!=e._id?true:false}
  value={e.category}
  onChange={(ea)=>{
    HandleInputchange(e._id,"category",ea.target.value)
  }}
  ></input>
{
  e.fixedSalary?<span>Fixed Salary:
    <input type="number" disabled={handleEdit!=e._id?true:false}
  value={e.fixedSalary}
  onChange={(ea)=>{
    HandleInputchange(e._id,"fixedSalary",ea.target.value)
  }}
  ></input>
  </span>:
  <div>
<span> SalaryFrom:
    <input type="number" disabled={handleEdit!=e._id?true:false}
  value={e.salaryFrom}
  onChange={(ea)=>{
    HandleInputchange(e._id,"salaryFrom",ea.target.value)
  }}
  ></input>
  </span>
  <span> Salary To:
    <input type="number" disabled={handleEdit!=e._id?true:false}
  value={e.salaryTo}
  onChange={(ea)=>{
    HandleInputchange(e._id,"salaryTo",ea.target.value)
  }}
  ></input>
  </span>
  </div>
  
}
<h1>is Expired:</h1>
<select disabled={handleEdit!=e._id?true:false}
  value={e.expired}
  onChange={(ea)=>{
    HandleInputchange(e._id,"expired",ea.target.value)
  }} >
  <option value={true}>True</option>
  <option value={false}>false</option>
</select>
<h1>Description</h1>
<textarea 
disabled={handleEdit!=e._id?true:false}
value={e.description}
onChange={(ea)=>{
  HandleInputchange(e._id,"description",ea.target.value)
}}
></textarea>
<span>Location</span>
  <input type="text" disabled={handleEdit!=e._id?true:false}
  value={e.location}
  onChange={(ea)=>{
    HandleInputchange(e._id,"location",ea.target.value)
  }}
  ></input>

<div className='flex flex-row gap-2 items-center justify-center'>
  {
  handleEdit===e._id?<>
  <button onClick={()=>{update(e._id)}} >Update</button>
  <button onClick={()=>Disable()}>Cancel</button>
  </>:
  <button onClick={()=>setEdit(e._id)}>
    Edit
  </button>
  }
  <button onClick={()=>{handleDelete(e._id)}}>Delete</button>
 
</div>
</div>)
})

        }

        
        </div> 
    
    </div>
  );
};

export default MyJobs;
