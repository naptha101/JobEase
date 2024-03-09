import React from 'react';

const HowItWork = () => {
  return (
    <div className='flex flex-col items-center justify-between'>
      <h5 className='font-bold text-2xl mb-4'>How Job Ease Works</h5>
      <div className='flex flex-row justify-around gap-3'>
        <div className='flex flex-col items-center p-2 text-white rounded-xl bg-slate-500'>
          <img src='https://th.bing.com/th/id/OIP.fc4X97l7oBh-Fxm9_EsC9gHaE8?w=261&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7' alt='Create Account' className='w-60 h-60 mb-2 rounded-md' />
          <p className='text-center'>Create Account</p>
        </div>
        <div className='flex flex-col items-center p-2 text-white rounded-xl bg-slate-500'>
          <img src='https://th.bing.com/th/id/OIP.0MRWUraGqsxyzz1K3S7R7QHaE8?w=250&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7' alt='Find/Post a Job' className='w-60 h-60 mb-2 rounded-md' />
          <p className='text-center text-xl'>Find/Post a Job</p>
        </div>
        <div className='flex flex-col items-center p-2 text-white rounded-xl bg-slate-500'>
          <img src='https://th.bing.com/th/id/R.82e740d011c5e0e0a5c352b55a1239a9?rik=U7Ii1MOadnBllw&pid=ImgRaw&r=0' alt='Apply on Jobs or Check Applicants' className='w-60 h-60 mb-2 rounded-md' />
          <p className='text-center text-xl'>Apply on Jobs or Check Applicants</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWork;
