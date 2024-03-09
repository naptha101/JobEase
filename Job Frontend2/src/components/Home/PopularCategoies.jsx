import React from 'react';

const PopularCategoies = () => {
  const categories = [
    { name: "MERN Stack" },
    { name: "Android" },
    { name: "Java Dev" },
    { name: "AI" },
    { name: "Web Development" },
    { name: "Data Science" },
    { name: "UI/UX Design" },
    { name: "Cloud Computing" },
  ];

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <div className='container mx-auto'>
        <h2 className='text-3xl font-bold mb-6'>Popular Categories</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {categories.map((category, index) => (
            <div key={index} className='p-4 bg-gray-500 rounded-lg text-white shadow-md hover:shadow-lg transition duration-300'>
              <p className='text-center text-lg font-semibold'>{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularCategoies;
