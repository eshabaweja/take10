import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddTask() {
  const [task, setTask] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Add task to your task list
    console.log('New task:', task)
  }

  return (
    <div className="card">
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task"
          className="task-input"
        />
        <button type="submit" className="submit-button">Add Task</button>
        <button onClick={() => navigate('/')} className="submit-button">Home</button>
      </form>
    </div>
  )
}

export default AddTask 