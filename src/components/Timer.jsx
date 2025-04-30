import { useState, useEffect } from 'react'

function Timer() {
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let intervalId
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            setIsRunning(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [isRunning, timeLeft])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setTimeLeft(600)
    setIsRunning(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="timer">
      <h2>{formatTime(timeLeft)}</h2>
      <div className="timer-controls">
        <button onClick={toggleTimer} disabled={timeLeft === 0}>
          {isRunning ? 'Pause' : 'Play'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  )
}

export default Timer 