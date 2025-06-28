import { useState, useEffect } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function TaskGenerator({ onTaskSelected }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  const generateRandomTask = async () => {
    setLoading(true);

    try {
      const response = await fetch(` ${BACKEND_URL}/task`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Give me a random task' }),
    });

    if(!response.ok){
      throw new Error(`Server error: ${response.statusText}`);
    }
    const data = await response.json();
    setSelectedTask(data.reply);
    // console.log(data.reply);
    
    // Trigger visibility transition
    setIsVisible(false)
    setTimeout(() => setIsVisible(true), 50)
    onTaskSelected?.()
    } catch (error) {
      setSelectedTask(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
}

  const generateMyTask = () => {
    // Filter out completed tasks
    const uncompletedTasks = tasks.filter(task => !task.completed)
    
    if (uncompletedTasks.length === 0) {
      setSelectedTask('Add some tasks or uncheck completed ones!')
    } else {
      const randomIndex = Math.floor(Math.random() * uncompletedTasks.length)
      setSelectedTask(uncompletedTasks[randomIndex].text)
    }
    
    // Trigger visibility transition
    setIsVisible(false)
    setTimeout(() => setIsVisible(true), 50)
    onTaskSelected?.()
  }

  return (
    <div className='task-generator'>
        <div className="button-group">
          <button onClick={generateRandomTask}>{loading ? 'Generating...' : 'Random Task'}</button>
          <button onClick={generateMyTask}>My Task</button>
        </div>
        <div className="task-display">
          <p className={isVisible ? 'visible' : ''}>
            {selectedTask || 'Click above buttons to get a task'}
          </p>
        </div>
    </div>
  )
}

export default TaskGenerator
