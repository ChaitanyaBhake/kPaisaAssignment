import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext';

const Register = () => {
  const { registerUser } = useContext(TaskContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    await registerUser(email, password);
    navigate('/login'); 
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-5 ">
        <h2 className='text-xl font-bold text-gray-700 '>Register Now!</h2>
        <div className="">
          <div className="flex flex-col gap-5  ">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="placeholder-yellow-500 px-3 py-2 border"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="placeholder-yellow-500 px-3 py-2 border"
            />
          </div>
        </div>

        <button className='px-3 py-2 bg-blue-100 rounded-2xl' onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
