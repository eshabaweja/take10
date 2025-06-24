import { Link } from 'react-router-dom'
import Timer from './Timer'
import TaskGenerator from './TaskGenerator'

function Home() {
  return (
    <>
      <h1>Take 10</h1>
      <p className="read-the-docs">
        What should you do in this 10 minute break? <Link to="/add-task" className="add-task-link">Add a task</Link>
      </p>
      <TaskGenerator />

      <div className="card">
        <Timer />
      </div>
    </>
  )
}

export default Home 