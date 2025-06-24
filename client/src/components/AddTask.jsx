import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AddTask() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const navigate = useNavigate()

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (task.trim()) {
      setTasks([...tasks, { text: task.trim(), completed: false }])
      setTask('') 
    }
  }

  const toggleTask = (index) => {
    const newTasks = [...tasks]
    newTasks[index] = { ...newTasks[index], completed: !newTasks[index].completed }
    setTasks(newTasks)
  }

  return (
    <div className="card">
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Quick reminder for future you..."
          className="task-input"
        />
        <div className="button-group">
          <button type="submit" className="submit-button">Add Task</button>
          <button onClick={() => navigate('/')} className="submit-button">Home</button>
        </div>
      </form>

      {tasks.length > 0 && (
        <div className="task-list">
          <h3>Your Tasks:</h3>
          <ul>
            {tasks.map((taskItem, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={taskItem.completed}
                    onChange={() => toggleTask(index)}
                  />
                  <span className={taskItem.completed ? 'completed' : ''}>
                    {taskItem.text}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AddTask 