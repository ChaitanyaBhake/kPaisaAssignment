import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext';

const Task = () => {
  const { tasks, addTask, updateTask, deleteTask, logoutUser } =
    useContext(TaskContext);

  const navigate = useNavigate();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  const handleAddTask = async () => {
    if (newTaskTitle && newTaskDesc) {
      await addTask(newTaskTitle, newTaskDesc);
      setNewTaskTitle('');
      setNewTaskDesc('');
    }
  };

  const handleLogout = () => {
    logoutUser();
  
    navigate('/login')
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className='flex justify-between mb-3'>
        <h2 className="text-2xl font-bold mb-4">Task Management</h2>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className=" bg-red-500 w-36 h-10 text-center  text-white  rounded-lg  hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Add Task */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTaskDesc}
          onChange={(e) => setNewTaskDesc(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-4">
        {Array.isArray(tasks) &&
          tasks.map((task) => (
            <li
              key={task.id}
              className="bg-gray-100 p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              <p
                className={`${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.title}: {task.description}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateTask(task.id)}
                  className="bg-green-500 text-white  p-2  w-36 h-10 rounded-lg hover:bg-green-600"
                >
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white p-2 rounded-lg w-36 h-10 text-center hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Task;
