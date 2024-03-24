import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const ExpertSuccess = () => {
    const { user } = useContext(Context);
    const [expert, setExpert] = useState({});
    const params = useParams();

    const fetchUser = async () => {
        try {
            const { id } = params;
            const res = await axios.get(`http://localhost:8000/api/auth/getby/${id}`, { withCredentials: true });
            if (res.data.status) {
               // console.log(res.data);
                setExpert(res.data.data);
                sendMail(res.data.data);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [params.id]);

    const sendMail = async (e) => {
        try {
            console.log(e);
            const mail = await axios.post('http://localhost:8000/api/expert/send', { email: e.email, User: user._id,ExpId:e._id });
            if(mail.data.status){
                toast.success(mail.data.message+' Our expert will get in contat with you soon')
            }
        } catch (err) {
            toast.error("Can't send Mail");
        }
    }

    return (
        <div
        className='h-screen w-full flex justify-center items-center'
        >
            
            <p>ExpertSuccess</p></div>
    );
}

export default ExpertSuccess;
