import { useState, useEffect } from 'react'

function TaskGenerator({ onTaskSelected }) {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

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
          <button>Random Task</button>
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
