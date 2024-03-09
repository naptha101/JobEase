
const Resume = ({ imageurl, onclose }) => {
  console.log(imageurl);
  return (
    <div className='flex flex-col pt-12 gap-3 w-full bg-slate-600 h-min-screen h-max-fit px-12' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <span className="p-3 bg-red-600 w-fit rounded-md hover:cursor-pointer" onClick={onclose}>&times;</span>
      <img alt='Your Resume' src={imageurl}></img>
    </div>
  );
};

export default Resume;
