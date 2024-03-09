import React, { useState, useEffect } from 'react';
import { FaBuilding, FaComputer } from "react-icons/fa6";
import { FaRegBuilding } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      url: 'https://th.bing.com/th/id/R.2360e416407aef3b0397fd0ee0c21c8a?rik=pXzMCSPTLwqi3g&pid=ImgRaw&r=0',
      description: 'Find jobs that suit your profile'
    },
    {
      url: 'https://th.bing.com/th/id/R.26b17d0098061fc5be59b940f5580d06?rik=L6FztQsOUX0gmQ&pid=ImgRaw&r=0',
      description: 'Discover new opportunities'
    },
    {
      url: 'https://th.bing.com/th/id/OIP.ipRR3nz9hJVt4mO_8UInQgHaEK?w=305&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      description: 'Join our platform today'
    },
    {
      url:'https://th.bing.com/th/id/OIP.C3kwCt4Ks59Cckve-eHqnwHaE8?w=245&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      description:"Search Job according to your expected salary and apply on them with fastest way"

    }
    // Add more image URLs and descriptions as needed
  ];

  useEffect(() => {
    // Automatically advance to the next image every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      <div className='flex flex-row shadow-md shadow-gray-500'>
        <div className='px-4 bg-slate-300 rounded-s-md' >
          <h1 className='text-3xl font-serif font-bold'>{images[currentIndex].description}</h1>
          <p className='text-xl font-serif'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, ipsa. Assumenda veritatis libero qui aliquid vel rem eius, vero impedit obcaecati soluta corrupti. Blanditiis temporibus placeat pariatur repudiandae voluptate cumque.</p>
        </div>
        <img className='w-[70vw] h-[60vh] rounded-lg' src={images[currentIndex].url} alt={`Slide ${currentIndex + 1}`} />
      </div>
      <div className='flex md:flex-row w-full justify-around md:gap-10 flex-col gap-2'>
        <p className='p-4 bg-lime-300 hover:scale-105 flex rounded-md flex-row item-center gap-3 justify-center'>3000+ Employers <CgProfile size={30}></CgProfile></p>
        <p className='p-4 bg-lime-300 hover:scale-105 flex rounded-md flex-row item-center gap-3 justify-center'>10000+ Jobs <FaComputer size={30}></FaComputer></p>
        <p className='p-4 bg-lime-300 hover:scale-105 flex rounded-md flex-row item-center gap-3 justify-center'>1000+ Comanies <FaBuilding size={30}></FaBuilding></p>
        <p className='p-4 bg-lime-300 hover:scale-105 flex rounded-md flex-row item-center gap-3 justify-center'>10000+ Job Seekers <IoPersonAddOutline size={30}></IoPersonAddOutline></p>


      </div>
    </div>
  );
}

export default HeroSection;
