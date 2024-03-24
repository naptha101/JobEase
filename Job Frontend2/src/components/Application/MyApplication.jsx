import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import axios from 'axios';
import Resume from './resumeModel';
import { IoDocumentAttach, IoFilter, IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

const MyApplication = () => {
    const { user, isAuthorized ,SetNav} = useContext(Context);
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [usr, setUsr] = useState([]);
    const [isImageUrl, setImageUrl] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [radio, setRadio] = useState("");
    const fetchData = async () => {
        try {
            let response = null;
            if (user.role === 'Employer') {
                response = await axios.get('http://localhost:8000/api/application/empApp', { withCredentials: true });
            } else {
                response = await axios.get('http://localhost:8000/api/application/appApp', { withCredentials: true });
            }
            setApplications(response.data.applications);
            fetchUser(response.data.applications);
        } catch (error) {
            console.error('Error fetching data:', error.response.data.message);
        }
    };

    const fetchUser = async (applications) => {
        try {
            const users = await Promise.all(applications.map(async (element) => {
                const response = await axios.get('http://localhost:8000/api/auth/getby/' + element.employerId.user, { withCredentials: true });
                return response.data;
            }));
            console.log(users);
            setUsr(users);
        } catch (err) {
            console.error('Error fetching data:', err.response.data.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user.role]);

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:8000/api/application/appdel/' + id, { withCredentials: true });
            setApplications(applications.filter(e => e._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = () => {
        const filteredApplications = applications.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase())||app.email.toLowerCase().includes(searchTerm.toLowerCase()));
        setApplications(filteredApplications);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(e.target.vaule);
        handleSearch();
    };
    const HandleDate = () => {
        let filteredApplication = [...applications]; 
        if (radio === "Latest") {
            filteredApplication.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (radio === "Oldest") {
            filteredApplication.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        console.log(filteredApplication);
        setApplications([...filteredApplication]); // Update state with a new array
    };
    const openModel = (imageUrl) => {
        setImageUrl(imageUrl);
        setOpenModal(true);
    };

    const closeModel = () => {
        setOpenModal(false);
    };
    useEffect(()=>{
        SetNav("Applicant's Application");
      },[])
    return (
        <div className='flex flex-col px-2 md:px-8 min-h-screen pt-12 max-h-fit gap-2 md:gap-4 w-full'>
            {openModal && <Resume imageurl={isImageUrl} onclose={closeModel}></Resume>}
            {!openModal && user && user.role === 'Job seeker' && (
                <>
                    <div className='flex justify-between item-center'>
                        <p className='text-4xl'>Your Applied Jobs</p>
                        <div className='mr-4'>
                            <input type="text" className="outline-none px-2 border border-2 border-gray-400 rounded-md"  value={searchTerm} onChange={(e)=>handleInputChange(e)}></input>
                            <button onClick={handleSearch}><IoSearch /></button>
                        </div>
                        <div className='flex p-3 items-center justify-center gap-3 rounded-md bg-slate-300'>
              <IoFilter></IoFilter>
              <label><input type='radio' value={"Latest"} onChange={(e) => { setRadio(e.target.value); HandleDate() }} name='date' ></input> Latest</label>
              <label><input type='radio' value={"Oldest"} onChange={(e) => { setRadio(e.target.value); HandleDate() }} name='date' ></input>Oldest</label>
            </div>
                      
            
                    </div>
                    {applications.map((e,i) => (
                        <div key={e._id} className='bg-white rounded-md shadow-md p-4'>
                            
                            <div><h1 className='text-xl font-bold'>{e.name}</h1> {usr.length>0&&usr[i]&&<Link className='underline' to={'/userprofile/'+usr[i].data._id}><h1>{"for job posted by:"+usr[i].data.username}</h1></Link>}</div>
                            <p className='text-gray-500'>Posted On: {e.updatedAt}</p>
                            <p><span className='font-bold'>Address:</span> {e.address}</p>
                            <p><span className='font-bold'>Email:</span> {e.phone}</p>
                            <p><span className='font-bold'>Phone:</span> {e.email}</p>
                            <div className='flex items-center space-x-4'>
                                <p className='w-4/5 bg-slate-300 p-3 rounded-md text-bold min-h-[10vh]'>{e.coverletter}</p>
                                <IoDocumentAttach className='text-gray-600 hover:text-blue-500 cursor-pointer' onClick={() => openModel(e.resume.url)} size={24} />
                           <MdDelete className='text-gray-600 hover:text-blue-500 cursor-pointer' onClick={() => handleDelete(e._id)} size={24}></MdDelete>
                            </div>
                        </div>
                    ))}
                </>
            )}
            {!openModal && user && user.role === 'Employer' && (
                <>
                    <p className='text-4xl'>Applicants of your Jobs</p>
                    <div className='flex justify-between item-center'>
                        <p className='text-4xl'>Your Applied Jobs</p>
                        <div className='mr-4'>
                            <input type="text" className="outline-none border border-2 px-2 border-gray-400 rounded-md" value={searchTerm} onChange={(e)=>handleInputChange(e)}></input>
                            <button onClick={handleSearch}><IoSearch /></button>
                        </div>
                        <div className='flex p-3 items-center justify-center gap-3 rounded-md bg-slate-300'>
              <IoFilter></IoFilter>
              <label><input type='radio' value={"Latest"} onChange={(e) => { setRadio(e.target.value); HandleDate() }} name='date' ></input> Latest</label>
              <label><input type='radio' value={"Oldest"} onChange={(e) => { setRadio(e.target.value); HandleDate() }} name='date' ></input>Oldest</label>
            </div>
                      
            
                    </div>
                    {applications.map((e, index) => (
                        <div key={index} className='bg-white rounded-md shadow-md p-4'>
                           <div> <h1 className='text-xl font-bold'>{e.name}</h1> {usr&&usr.length>0&&usr[index]&&<Link to={'/userprofile/'+usr[index].data._id}>
                            <h1>View Applicant: {[usr[index].data.username]}</h1>
                            </Link>} </div>
                            <Link to={'/userprofile/' + e.ApplicantId.user}><p className='text-gray-500 text-sm underline'>view Applicants Profile</p></Link>
                            <p className='text-gray-500'>Posted On: {e.updatedAt}</p>
                            <p><span className='font-bold'>Address:</span> {e.address}</p>
                            <p><span className='font-bold'>Email:</span> {e.phone}</p>
                            <p><span className='font-bold'>Phone:</span> {e.email}</p>
                            <div className='flex items-center space-x-4'>
                                <p className='w-4/5 bg-slate-300 p-3 rounded-md text-bold min-h-[10vh]'>{e.coverletter}</p>
                                <IoDocumentAttach className='text-gray-600 hover:text-blue-500 cursor-pointer' onClick={() => openModel(e.resume.url)} size={24} />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default MyApplication;
