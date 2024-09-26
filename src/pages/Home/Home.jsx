import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className='text-xl font-bold text-gray-700 '>Register first to add tasks</div>
        <div>
          <button className='bg-blue-100 px-3 py-2 rounded-2xl' onClick={() => navigate('/register')}>Register ➡️</button>
        </div>
        <div>
          <span>Already have an account?</span>
          <button className="ml-2 bg-blue-100 px-3 py-2 rounded-2xl" onClick={() => navigate('/login')}>Login ➡️</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
