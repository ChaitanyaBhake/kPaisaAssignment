import { createContext, useState, useEffect } from 'react';

// Create a context
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // State to hold user data (for authentication)
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || null);
  
  // State to hold task data
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    return storedTasks[user?.email] || []; 
  });

  // Function to simulate registration
  const registerUser = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        resolve(true);
      }, 500);
    });
  };

  // Function to simulate login
  const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          setUser(user);
          const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
          setTasks(storedTasks[email] || [])
          resolve(true);
        } else {
          reject('Invalid credentials');
        }
      }, 500);
    });
  };

  // Function to log out
  const logoutUser = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setTasks([]); // Clear tasks on logout
  };

  // Function to add a task
  const addTask = (title, description) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = { id: Date.now(), title, description, completed: false };
        const updatedUserTasks = [...tasks, newTask];
        const updatedTasks = { ...JSON.parse(localStorage.getItem('tasks')) || {}, [user.email]: updatedUserTasks };
        
        setTasks(updatedUserTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        resolve(newTask);
      }, 500);
    });
  };

  // Function to mark task as completed
  const updateTask = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUserTasks = tasks.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        const updatedTasks = { ...JSON.parse(localStorage.getItem('tasks')) || {}, [user.email]: updatedUserTasks };

        setTasks(updatedUserTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        resolve(updatedUserTasks);
      }, 500);
    });
  };

  // Function to delete a task
  const deleteTask = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUserTasks = tasks.filter(task => task.id !== id);
        const updatedTasks = { ...JSON.parse(localStorage.getItem('tasks')) || {}, [user.email]: updatedUserTasks };

        setTasks(updatedUserTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        resolve(updatedUserTasks);
      }, 500);
    });
  };

  // Context value to pass to components
  const contextValue = {
    user,
    tasks,
    registerUser,
    loginUser,
    logoutUser,
    addTask,
    updateTask,
    deleteTask,
  };

  // Update tasks in localStorage whenever they change
  useEffect(() => {
    if (user) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
      setTasks(storedTasks[user.email] || []); 
    }
  }, [user]);

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};
