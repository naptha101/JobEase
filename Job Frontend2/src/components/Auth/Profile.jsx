import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../main';
import userImg from '../../assets/userImg.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Resume from '../Application/resumeModel';
import { FaRegEdit } from "react-icons/fa";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const {SetUser}=useContext(Context);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState(null);
  const [newpass, setNewPass] = useState(true);
  const [updateInfo, setUpdateInfo] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
    resume: null,
    isResume: ""
  });

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/auth/getby/${id}`, { withCredentials: true });
      if (!res.data.status) {
        setError(true);
      } else {
        res.data.data.profileSet ? setProfile(res.data.data.profile.url) : setProfile(null);
        setUpdateInfo({
          ...updateInfo,
          username: res.data.data.username,
          email: res.data.data.email,
          phone: res.data.data.phone,
          role: res.data.data.role,
          resume: res.data.data.resume,
          isResume: res.data.data.isResume
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateFunction = async () => {
    try {
      const formData = new FormData();
      await axios.put(`http://localhost:8000/api/auth/update/${id}`, {
        username: updateInfo.username,
        email: updateInfo.email,
        phone: updateInfo.phone,
        password: updateInfo.password,
        newPassword: updateInfo.newPassword
      }, { withCredentials: true }).then((res)=>{
        if(res.data.status){
          SetUser(res.data.e);
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  const [updt, setUpdata] = useState(true);

  const addResume = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('resume', updateInfo.resume);
      const res = await axios.post(`http://localhost:8000/api/auth/setresume/${id}`, formData, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(res.data.ek));
      setUpdateInfo({
        ...updateInfo,
        resume: res.data.ek.resume,
        isResume: true
      });
      toast.success("Resume Uploaded");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditIconClick = () => {
    fileInputRef.current.click();
  };

  const [flag, setFlag] = useState(true);
  const fileInputRef = useRef(null);

  const ProfileChange = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profile", profile);
      const res = await axios.post('http://localhost:8000/api/auth/setprofile', formData, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setProfile(res.data.user.profile.url);
      setFlag(true);
      toast.success("Profile Picture Uploaded");
    } catch (err) {
      setFlag(true);
      console.log(err);
    }
  };

  const [OpenModal, setOpenModal] = useState(false);
  const [isImageUrl, setUrl] = useState('');

  const openModel = (ImageUrl) => {
    setUrl(ImageUrl);
    setOpenModal(true);
  };

  const closeModel = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {OpenModal && <Resume imageurl={isImageUrl} onclose={closeModel}></Resume>}
      {!OpenModal && (
        <div className='flex flex-col md:flex-row w-full md:mt-10 md:p-10 min-h-screen max-h-fit'>
          <div className='flex item-center flex-col border-blue-500 border-4 border  rounded-lg p-4 md:p-10  gap-2 w-full md:w-[70%]'>
            <h1 className='text-4xl font-bold'>Your Profile</h1>
            <div className='bg-blue-300 p-4 rounded-xl text-white'>   
              <p className='md:text-3xl text-xl'>Name:-</p>
              <input type="text" className='p-2 md:text-4xl  text-xl font-bold rounded-lg focus:bg-gray-400' value={updateInfo.username} disabled={updt} onChange={(e) => setUpdateInfo({ ...updateInfo, username: e.target.value })} />
            </div>
            <div>
              <p>role:-</p>
              <h1>{user.role}</h1>
            </div>
            <div>
              <p>email:-</p>
              <input type="text" className="font-bold text-xl" value={updateInfo.email} disabled={updt} onChange={(e) => setUpdateInfo({ ...updateInfo, email: e.target.value })} />
            </div>
            <div>      
              <p>phone:-</p>
              <input type="number" className="font-bold text-xl" value={updateInfo.phone} disabled={updt} onChange={(e) => setUpdateInfo({ ...updateInfo, phone: e.target.value })} />
            </div>
            {!updt && (
              <div>
                <div className='bg-amber-100 flex flex-col'>
                  <h1>Enter Your Password</h1>
                  <input type='password' className="font-bold text-xl" value={updateInfo.password} onChange={(e) => setUpdateInfo({ ...updateInfo, password: e.target.value })} />
                  <div>
                    <label>
                      <input type='radio' className="font-bold text-xl" checked={!newpass} onClick={() => { setNewPass(!newpass) }} />
                      Change Password
                    </label>
                  </div>
                </div>
                {!newpass && (
                  <div className='bg-amber-100 flex flex-col'>
                    <h1>Enter Your New Password</h1>
                    <input type='password' value={updateInfo.newPassword} onChange={(e) => setUpdateInfo({ ...updateInfo, newPassword: e.target.value })} />
                  </div>
                )}
                <button className='bg-amber-400' onClick={() => { updateFunction() }}>Update Profile</button>
              </div>
            )}
            <button className='p-2 items-center text-2xl flex justify-center rounded-md gap-4  bg-red-500'  onClick={() => { setUpdata(!updt) }}>{updt ? "Edit" : "Cancel"} <FaRegEdit /></button>
          </div>
          <div className='flex border-t-4 border-b-4 border-r-4 border-blue-500 border rounded-md flex-col gap-2 w-full md:w-[30%]'>
            <div className='mt-20  flex flex-col justify-center items-center'>
              <div className='relative'>
                <div className={`overflow-hidden ${profile ? `bg-cover bg-center bg-no-repeat` : `bg-cover bg-center bg-no-repeat`} md:h-60 md:w-60 w-40 border border-2 rounded-full border-black p-1 h-40`} style={{ backgroundImage: `url(${profile ? profile : userImg})` }}>
                  {/* Content goes here */}
                </div>
                <form onSubmit={ProfileChange}>
                  <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => setProfile(e.target.files[0])} />
                  <FaRegEdit className={'hover:cursor-pointer absolute bottom-4 right-4'} size={30} onClick={handleEditIconClick} />
                  <button type="submit" hidden={flag} disabled={flag} className='p-2 bg-amber-400'>Update</button>
                </form>
              </div>
              <h1 className='text-3xl font-serif text-center'>{user.username}</h1>
            </div>
            <div className='flex flex-col items-center justify-center '>
              {updateInfo.isResume == true && (
                <div>
                  <img onClick={() => { openModel(updateInfo.resume) }} src={updateInfo.isResume ? updateInfo.resume : Resume} className='w-[8/10] h-[7/10]' />
                </div>
              )}
              <form onSubmit={addResume}>
                <h1>Update or add Your resume</h1>
                <input type='file' onChange={(e) => setUpdateInfo({ ...updateInfo, resume: e.target.files[0] })} />
                <button type='submit' className='p-2 bg-amber-400'>Update</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

