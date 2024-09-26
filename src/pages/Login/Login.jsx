import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext';

const Login = () => {
  const { loginUser } = useContext(TaskContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      navigate('/tasks'); 
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className='text-xl font-bold text-gray-700 '>Login Now!</h2>
        <div>
          <div className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="placeholder-yellow-500 px-3 py-2 border"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="placeholder-yellow-500 px-3 py-2 border"
            />
          </div>
        </div>

        <button
          className="px-3 py-2 bg-blue-100 rounded-2xl"
          onClick={handleLogin}
        >
          Login
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
