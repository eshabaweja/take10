import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Timer from './components/Timer'

function App() {
  return (
    <>
      <h1>Take 10</h1>
      <p className="read-the-docs">
        Your AI assistant for taking 10 minute breaks
      </p>
      <div className="card">
        <Timer />
      </div>

    </>
  )
}

export default App
