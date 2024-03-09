import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../main'
import userImg from '../../assets/userImg.png'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Resume from '../Application/resumeModel';
import { FaRegEdit } from "react-icons/fa";
const Profile = () => {
  const user=JSON.parse(localStorage.getItem("user"));
  const {id}=useParams();
const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [profile,profileSet]=useState(null);
  const [newpass,SetNewPass]=useState(true);
  const [updateInfo,setUpdateInfo]=useState({username:"",email:"",phone:"",password:"",newPassword:"",resume:null,isResume:""})
  const fetchUser=async ()=>{
    //console.log(user);
    await axios.get(`http://localhost:8000/api/auth/getby/${id}`,{withCredentials:true}).then((res)=>{
    if(!res.data.status){
setError(true);
    }else{
    console.log(res.data);
   
      res.data.data.profileSet?profileSet(res.data.data.profile.url):profileSet(null);
      setUpdateInfo({...updateInfo,username:res.data.data.username,email:res.data.data.email,phone:res.data.data.phone,role:res.data.data.role,resume:res.data.data.resume,isResume:res.data.data.isResume})
     // console.log(res.data.data);
    }
    })
  }
  const updateFunction=async ()=>{
    try{
    const formData=new FormData();
   await axios.put('http://localhost:8000/api/auth/update/'+id,{username:updateInfo.username,email:updateInfo.email,phone:updateInfo.phone,password:updateInfo.password,newPassword:updateInfo.newPassword},{withCredentials:true}).then((e)=>{
    console.log(e);
   })

    }catch(err){
    console.log(err);
    }
  }
  const [updt,SetUpdata]=useState(true);
  const addResume=async (e)=>{
    e.preventDefault();
    try{
  const formdata=new FormData();
  formdata.append('resume',updateInfo.resume);
  await axios.post('http://localhost:8000/api/auth/setresume/'+id,formdata,{withCredentials:true}).then((e)=>{
   // console.log(e);
   localStorage.setItem("user",JSON.stringify(e.data.ek));
   setUpdateInfo({...updateInfo,resume:e.data.ek.resume,isResume:true});
   toast.success("Resume Uploaded")
   
  })
    }catch(err){
      console.log(err);
    }
  }
  const handleEditIconClick = () => {
    // Trigger click event on the file input element
    setFlag(!flag);
    fileInputRef.current.click();
  };
  const [flag,setFlag]=useState(true);
  const fileInputRef = useRef(null);
//console.log(user)
const ProfileChange=async (e)=>{
  e.preventDefault();

  try{
    const formdata=new FormData();
    formdata.append("profile",profile);
 await axios.post('http://localhost:8000/api/auth/setprofile',formdata,{withCredentials:true}).then((res)=>{
 localStorage.setItem("user",JSON.stringify(res.data.user));
  profileSet(res.data.user.profile.url);
setFlag(true);
  //console.log(res.data);
  toast.success("Resume Uploaded")
 })

  }
  catch(err){
    setFlag(true)
    console.log(err);
  }
}
const [OpenModal, setOpenModal] = useState(false);
const [isImageUrl, setUrl] = useState('');
const openModel=(ImageUrl)=>{
  setUrl(ImageUrl)
  setOpenModal(true);
}
const closeModel=()=>{
  setOpenModal(false);
}
useEffect(()=>{
fetchUser()
//console.log(user) 
},[])
return (
 <div>
 {
  OpenModal&&<Resume imageurl={isImageUrl} onclose={closeModel}></Resume>
}
  {!OpenModal&&<div className='flex flex-col md:flex-row w-[100%] min-h-screen max-h-fit'>

        <div className='flex item-center flex-col border border-2 border-black gap-2 w-[70%]'>
        <h1 className='text-4xl'>Your Profile</h1>
        <div>   
          <p>name:-</p>
         <input type="text" value={updateInfo.username} disabled={updt} onChange={(e)=>{setUpdateInfo({...updateInfo,username:e.target.value})}} ></input>
        </div>
        <div>
          <p>role:-</p>
          <h1>{user.role}</h1>
        </div>
        <div>
        <p>email:-</p>
         <input type="text" value={updateInfo.email} disabled={updt} onChange={(e)=>{setUpdateInfo({...updateInfo,email:e.target.value})}} ></input>
        </div>
        <div>      
        <p>phone:-</p>
         <input type="number" value={updateInfo.phone} disabled={updt} onChange={(e)=>{setUpdateInfo({...updateInfo,phone:e.target.value})}} ></input>
        </div>
{!updt&&<div>
 <div className='bg-amber-100 flex flex-col'>
  <h1>Enter Your Password</h1>
<input type='password' value={updateInfo.password} onChange={(e)=>{setUpdateInfo({...updateInfo,password:e.target.value})}} ></input>
<div>
        <label>
          <input type='radio' checked={!newpass} onClick={() => { SetNewPass(!newpass) }} />
          Change Password
        </label>
      </div>
</div>
{!newpass&&<div className='bg-amber-100 flex flex-col'><h1>Enter Your New Password</h1>
<input type='password' value={updateInfo.newPasswordpassword} onChange={(e)=>{setUpdateInfo({...updateInfo,newPassword:e.target.value})}} ></input>
</div>
}
 <button className='bg-amber-400' onClick={()=>{updateFunction()}}> Update Profile</button>
 </div>
  
}


    {
      <button className='p-4 bg-red-600' onClick={()=>{SetUpdata(!updt)}} >{updt?"Edit":"Cancel"}   <FaRegEdit></FaRegEdit></button>
    }

        </div>
        <div className='flex border border-2 border-black flex-col gap-2 w-[30%]'>
<div className='mt-20  flex flex-col justify-center items-center'>
  <div className='relative'>
  
   <img className='w-40 border border-2 border-black p-1 h-40 rounded-full md:rounded-full md:h-60 md:w-60' src={profile?profile:userImg}></img>
   <form onSubmit={ProfileChange}>
   <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => {profileSet(e.target.files[0]) }} /> 
              <FaRegEdit className={'hover:cursor-pointer absolute bottom-4 right-4'} size={30} onClick={handleEditIconClick} /> 
   <button type="submit" hidden={flag} disabled={flag} className='p-2 bg-amber-400' >Update</button>
   </form>
   </div>
<h1 className='text-3xl font-serif text-center'>{user.username}</h1>

</div>      
      <div className='flex flex-col items-center justify-center'>
      {updateInfo.isResume==true&&<div>
{console.log(updateInfo)}
      <img onClick={()=>{ openModel(updateInfo.resume)} } src={updateInfo.isResume?updateInfo.resume:Resume} className='w-[8/10] h-[7/10]'/>
        </div>}
        
           {<form onSubmit={addResume} className=''>
            <h1>Update or add Your resume</h1>
            <input type='file' onChange={(e)=>{setUpdateInfo({...updateInfo,resume:e.target.files[0]})}} ></input>
            <button type='submit' className='p-2 bg-amber-400'>Update</button>
           </form>
           }
           </div>
        </div>
      
    </div>}
    </div>
  )
}

export default Profile