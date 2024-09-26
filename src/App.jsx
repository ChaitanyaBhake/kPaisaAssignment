import { Route, Routes } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Task from './pages/Task/Task';
import AuthenticatedRoute from './components/AuthenticatedRoute'; // Import the AuthenticatedRoute

function App() {
  return (
    <TaskProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/tasks" 
          element={
            <AuthenticatedRoute>
              <Task />
            </AuthenticatedRoute>
          } 
        />
      </Routes>
    </TaskProvider>
  );
}

export default App;
