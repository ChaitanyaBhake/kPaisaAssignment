import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';

const AuthenticatedRoute = ({ children }) => {
  const { user } = useContext(TaskContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Please log in to access this page.</h2>
        <button 
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Login!
        </button>
      </div>
    );
  }

  return children;
};

export default AuthenticatedRoute;
