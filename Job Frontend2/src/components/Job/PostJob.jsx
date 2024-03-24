import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { easeInOut, motion } from 'framer-motion';
import { MdOutlinePersonSearch } from "react-icons/md";
const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [fixedSalary, setFixedSalary] = useState(0);
  const [salaryFrom, setSalaryFrom] = useState(0);
  const [salaryTo, setSalaryTo] = useState(0);
  const { isAuthorized ,SetNav} = useContext(Context);
  const navigate = useNavigate();
  const [isFixed, setFixed] = useState("default");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
    SetNav("PostJob")
  }, []);

  const post = async (e) => {
    e.preventDefault();
    try {
      let pot = null;
      if (isFixed === 'fixed') {
        pot = await axios.post('http://localhost:8000/api/jobs/post', { title, category, description, country, city, fixedSalary, location }, { withCredentials: true })
      } else {
        pot = await axios.post('http://localhost:8000/api/jobs/post', { title, category, description, country, city, salaryFrom, salaryTo, location }, { withCredentials: true })
      }
      console.log(pot);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex min-h-screen gap-10 p-10 pt-12 max-h-fit mt-12 md:p-8'
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className='flex flex-col gap-2 md:flex-row'
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='border border-2 border-black p-4 rounded-md'
        >
           <h1 className='text-4xl underline font-bold mb-2'>Post a Job</h1>
          <form onSubmit={post} className='flex flex-col bg-[#3652AD] rounded-lg p-4 gap-3'>
           
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Enter Title" className='border border-gray-300 rounded-md p-2' />
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Enter Description" className='border border-gray-300 rounded-md p-2'></textarea>
            <input type="text" onChange={(e) => setCategory(e.target.value)} value={category} placeholder="Enter Category" className='border border-gray-300 rounded-md p-2' />
            <select onChange={(e) => { setCountry(e.target.value) }} className="border border-gray-300 rounded-md p-2">
              <option value="">Select a Country</option>
              {countries.map(country => (
                <option key={country.cca2} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
            <input type="text" onChange={(e) => setCity(e.target.value)} value={city} placeholder="Enter City" className='border border-gray-300 rounded-md p-2' />
            <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} placeholder="Enter Address" className='border border-gray-300 rounded-md p-2' />
            <select onChange={(e) => { setFixed(e.target.value) }} className="border border-gray-300 rounded-md p-2">
              <option value="default">Choose Salary</option>
              <option value="fixed">Fixed</option>
              <option value="variable">Variable</option>
            </select>
            {isFixed === 'fixed' &&
              <input type='number' onChange={(e) => setFixedSalary(e.target.value)} value={fixedSalary} placeholder="Enter Salary" className='border border-gray-300 rounded-md p-2' />
            }
            {isFixed === 'variable' &&
              <>
                <input type='number' onChange={(e) => setSalaryFrom(e.target.value)} value={salaryFrom} placeholder="Enter Salary From" className='border border-gray-300 rounded-md p-2' />
                <input type='number' onChange={(e) => setSalaryTo(e.target.value)} value={salaryTo} placeholder="Enter Salary To" className='border border-gray-300 rounded-md p-2' />
              </>
            }
            <motion.button
              
              whileTap={{ scale: 0.95 }}
              type='submit'
              className='bg-gradient-to-r border-bg-[#3652AD] border-2 border  hover:bg-white hover:text-[#3652AD] to-gray-200 py-2 rounded-md text-white text-bold text-xl'
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
   <div className='bg-slate-300 rounded-xl flex flex-col justify-center items-center w-full h-screen'>

   <motion.h1 initial={{x:"50%"}} animate={{x:"0"}} transition={{ease:easeInOut,duration:1}} className='text-6xl font-bold capitalize'>
    Get Best
   </motion.h1 >
   <motion.h1 initial={{x:"50%"}} animate={{x:"0"}} transition={{ease:easeInOut,duration:1}} className='font-bold text-6xl capitalize'>
    Deserving
   </motion.h1>
   <motion.h1 initial={{x:"50%"}} animate={{x:"0"}} transition={{ease:easeInOut,duration:1}} className='font-bold text-6xl capitalize'>Employees for you</motion.h1>

   <motion.h1 initial={{x:"-20vw"}} animate={{x:"0"}} transition={{ease:easeInOut,duration:2}} className='font-bold text-6xl mt-7 capitalize'>
    <MdOutlinePersonSearch size={80} ></MdOutlinePersonSearch>
   </motion.h1>

   </div>
    


    </motion.div>
  )
}

export default PostJob;
