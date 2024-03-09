import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import axios from 'axios';
import Resume from './resumeModel';
import { IoDocumentAttach } from "react-icons/io5";
import { Link } from 'react-router-dom';

const MyApplication = () => {
    const { user, isAuthorized } = useContext(Context);
    const [applications, setApplications] = useState([]);
    const [isImageUrl, setImageUrl] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const fetchData = async () => {
        try {
            let response = null;
            if (user.role === 'Employer') {
                response = await axios.get('http://localhost:8000/api/application/empApp', { withCredentials: true });
            } else {
                response = await axios.get('http://localhost:8000/api/application/appApp', { withCredentials: true });
            }
            console.log(response.data);
            setApplications(response.data.applications);
        } catch (error) {
            console.error('Error fetching data:', error.response.data.message);
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
            console.log(err);
        }
    }

    const openModel = (imageUrl) => {
        setImageUrl(imageUrl);
        setOpenModal(true);
    }

    const closeModel = () => {
        setOpenModal(false);
    }

    return (
        <div className='flex flex-col px-2 md:px-8 min-h-screen pt-12 max-h-fit gap-2 md:gap-4 w-full'>
            {openModal && <Resume imageurl={isImageUrl} onclose={closeModel}></Resume>}
            {!openModal && user && user.role === 'Job seeker' && (
                <>
                    <p className='text-4xl'>Your Applied Jobs</p>
                    {applications.map((e) => (
                        <div key={e._id} className='bg-white rounded-md shadow-md p-4'>
                            <h1 className='text-xl font-bold'>{e.name}</h1>
                            <p className='text-gray-500'>Posted On: {e.updatedAt}</p>
                            <p><span className='font-bold'>Address:</span> {e.address}</p>
                            <p><span className='font-bold'>Email:</span> {e.phone}</p>
                            <p><span className='font-bold'>Phone:</span> {e.email}</p>
                            <div className='flex items-center space-x-4'>
                                <p className='w-4/5'>{e.coverletter}</p>
                                <IoDocumentAttach className='text-gray-600 hover:text-blue-500 cursor-pointer' onClick={() => openModel(e.resume.url)} size={24} />
                            </div>
                        </div>
                    ))}
                </>
            )}
            {!openModal && user && user.role === 'Employer' && (
                <>
                    <p className='text-4xl'>Applicants of your Jobs</p>
                    {applications.map((e) => (
                        <div key={e._id} className='bg-white rounded-md shadow-md p-4'>
                            <h1 className='text-xl font-bold'>{e.name}</h1>
                           <Link to={'/userprofile/'+e.ApplicantId.user}><p className='text-gray-500 text-sm underline' >view Applicants Profile</p></Link>
                            <p className='text-gray-500'>Posted On: {e.updatedAt}</p>
                            <p><span className='font-bold'>Address:</span> {e.address}</p>
                            <p><span className='font-bold'>Email:</span> {e.phone}</p>
                            <p><span className='font-bold'>Phone:</span> {e.email}</p>

                            <div className='flex items-center space-x-4'>
                                <p className='w-4/5'>{e.coverletter}</p>
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
