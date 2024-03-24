import React from 'react';

const PopularCompany = () => {
  // Fake data for popular companies
  const popularCompanies = [
    { id: 1, name: "Sony", logo: "https://th.bing.com/th/id/OIP.BQiy0S2nNicunPzsH7UIOwHaHa?w=159&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 2, name: "YouTube", logo: "https://th.bing.com/th/id/OIP.kso2814j-OcYQp6FbQQ94AHaHa?w=161&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { id: 3, name: "Wipro", logo: "https://th.bing.com/th/id/OIP.9m0boAgdN0_B5To25o5lsgHaD4?w=317&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
    { id: 4, name: "Netflix", logo: "https://th.bing.com/th/id/OIP.oDu9P-hCFiLUEkTb3uuN-QHaHa?w=185&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7", description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <h2 className="text-3xl font-serif mb-4 text-center font-bold">Popular Companies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {popularCompanies.map(company => (
          <div className="bg-white rounded-lg shadow-md p-4" key={company.id}>
            <img src={company.logo} alt={company.name} className="mx-auto mb-4" style={{ maxWidth: '150px' }} />
            <div>
              <h3 className="text-lg font-semibold mb-2">{company.name}</h3>
              <p className="text-gray-600">{company.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCompany;
