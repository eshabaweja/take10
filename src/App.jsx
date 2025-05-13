import './App.css'
import Timer from './components/Timer'
import TaskGenerator from './components/TaskGenerator'

function App() {
  return (
    <>
      <h1>Take 10</h1>
      <p className="read-the-docs">
        What should you do in this 10 minute break?
      </p>
      <TaskGenerator />

      <div className="card">
        <Timer />
      </div>

    </>
  )
}

export default App
