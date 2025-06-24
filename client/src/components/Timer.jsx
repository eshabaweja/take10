import { useState, useEffect, useRef } from 'react'
import Confetti from 'react-confetti'

// Utility function to generate random wind value
const getRandomWind = () => (Math.random() * 0.8 - 0.4).toFixed(2)

function Timer() {
  const [timeLeft, setTimeLeft] = useState(600) // minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [showStartConfetti, setShowStartConfetti] = useState(false)
  const [showEndConfetti, setShowEndConfetti] = useState(false)
  const [wind, setWind] = useState(0)
  const audioRef = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    let intervalId
    if (isRunning && timeLeft > 0) {
      startTimeRef.current = Date.now() - (600 - timeLeft) * 1000
      // Show start confetti with random wind
      setWind(getRandomWind())
      setShowStartConfetti(true)
      
      intervalId = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
        const remaining = Math.max(0, 600 - elapsed)
        
        if (remaining === 0) {
          setIsRunning(false)
          setWind(getRandomWind())
          setShowEndConfetti(true)
          audioRef.current?.play()
        }
        setTimeLeft(remaining)
      }, 100)
    } else if (!isRunning) {
      setShowStartConfetti(false)
    }
    return () => clearInterval(intervalId)
  }, [isRunning])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setTimeLeft(600)
    setIsRunning(false)
    setShowStartConfetti(false)
    setShowEndConfetti(false)
    startTimeRef.current = null
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="timer">
      {showStartConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          wind={Number(wind)}
          gravity={0.3}
          colors={['#FFD700', '#FFA500', '#FF69B4', '#87CEEB']}
          tweenDuration={5000}
          run={isRunning}
        />
      )}
      {showEndConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.3}
          colors={['#FFD700', '#FFA500', '#FF69B4', '#87CEEB']}
          tweenDuration={5000}
          run={!isRunning}
        />
      )}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
        preload="auto"
      />
      <h2>{formatTime(timeLeft)}</h2>
      <div className="timer-controls">
        <button 
          onClick={toggleTimer} 
          disabled={timeLeft === 0}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  )
}

export default Timer 