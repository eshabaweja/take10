import { useState, useEffect } from 'react'

function TaskGenerator() {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  const generateRandomTask = () => {
    // Filter out completed tasks
    const uncompletedTasks = tasks.filter(task => !task.completed)
    
    if (uncompletedTasks.length === 0) {
      setSelectedTask('Add some tasks or uncheck completed ones!')
      return
    }
    const randomIndex = Math.floor(Math.random() * uncompletedTasks.length)
    setSelectedTask(uncompletedTasks[randomIndex].text)
  }

  return (
    <div className='task-generator'>
        <button>Random Task</button>
        <button onClick={generateRandomTask}>My Task</button>
        <div className="task-display">
          <p>{selectedTask || 'Click above buttons to get a task'}</p>
        </div>
    </div>
  )
}

export default TaskGenerator
