'use client'

import { useEffect, useRef, useState } from 'react'
import { SlingshotSlider } from './component'

type GameState = 'idle' | 'playing' | 'ended'

const generateRandomTarget = () => Math.floor(Math.random() * 101)
const GAME_TIME = 30
const TARGET_THRESHOLD = 5
const CELEBRATION_DURATION = 800

type GameStats = {
  score: number
  attempts: number
  timeLeft: number
}

export default function SlingshotSliderGame() {
  const [value, setValue] = useState<number[]>([0])
  const [target, setTarget] = useState<number>(generateRandomTarget())
  const [gameState, setGameState] = useState<GameState>('idle')
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    attempts: 0,
    timeLeft: GAME_TIME,
  })
  const [showCelebration, setShowCelebration] = useState(false)
  const celebrationTimeoutRef = useRef<NodeJS.Timeout>()
  const lastHitValueRef = useRef<number>(0)

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing') return

    const timer = setInterval(() => {
      setStats((prev) => {
        const newTimeLeft = prev.timeLeft - 1
        if (newTimeLeft <= 0) {
          setGameState('ended')
          clearInterval(timer)
          return { ...prev, timeLeft: 0 }
        }
        return { ...prev, timeLeft: newTimeLeft }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState])

  // Target hit detection
  useEffect(() => {
    if (gameState !== 'playing') return

    // Prevent duplicate celebrations for the same hit
    if (lastHitValueRef.current === value[0]) return

    const isTargetHit = Math.abs(value[0] - target) <= TARGET_THRESHOLD

    // Clear any existing celebration timeout
    if (celebrationTimeoutRef.current) {
      clearTimeout(celebrationTimeoutRef.current)
      celebrationTimeoutRef.current = undefined
    }

    if (!isTargetHit) {
      setShowCelebration(false)
      return
    }

    // Update last hit value to prevent duplicate celebrations
    lastHitValueRef.current = value[0]

    // Update score and show celebration
    setStats((prev) => ({
      ...prev,
      score: prev.score + 1,
    }))
    setShowCelebration(true)

    // Generate new target
    const newTarget = generateRandomTarget()
    setTarget(newTarget)

    // Set timeout for hiding celebration
    celebrationTimeoutRef.current = setTimeout(() => {
      setShowCelebration(false)
      lastHitValueRef.current = 0 // Reset last hit value
    }, CELEBRATION_DURATION)
  }, [value, target, gameState])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (celebrationTimeoutRef.current) {
        clearTimeout(celebrationTimeoutRef.current)
      }
    }
  }, [])

  const handleStartGame = () => {
    if (celebrationTimeoutRef.current) {
      clearTimeout(celebrationTimeoutRef.current)
    }
    setStats({
      score: 0,
      attempts: 0,
      timeLeft: GAME_TIME,
    })
    setGameState('playing')
    setTarget(generateRandomTarget())
    setValue([0])
    setShowCelebration(false)
    lastHitValueRef.current = 0
  }

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue)
    setStats((prev) => ({
      ...prev,
      attempts: prev.attempts + 1,
    }))
  }

  const getFeedbackMessage = () => {
    if (showCelebration) {
      return (
        <div className="text-sm font-medium text-primary animate-bounce">
          🎯 Amazing shot! Target hit! 🎯
        </div>
      )
    }

    const difference = Math.abs(value[0] - target)
    const isClose = difference <= TARGET_THRESHOLD

    return (
      <div
        className={`text-sm font-medium ${
          isClose ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        {isClose
          ? '🎯 Perfect shot!'
          : `${difference} points ${
              value[0] > target ? 'too high' : 'too low'
            }`}
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 p-4">
      {gameState === 'idle' && (
        <div className="text-center space-y-6 py-8">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-primary">
              Slingshot Target Game
            </h1>
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium">🎯 Your Mission:</p>
              <ul className="space-y-1">
                <li>Hit targets within ±{TARGET_THRESHOLD} points</li>
                <li>Score as many points as possible</li>
                <li>Beat the clock - only {GAME_TIME} seconds!</li>
              </ul>
            </div>
          </div>
          <button
            onClick={handleStartGame}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Start Game
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm font-medium text-muted-foreground">
                Score
              </div>
              <div className="text-2xl font-bold text-primary">
                {stats.score}
              </div>
            </div>
            <div className="space-y-1 text-right">
              <div className="text-sm font-medium text-muted-foreground">
                Time
              </div>
              <div
                className={`text-2xl font-bold ${
                  stats.timeLeft <= 10
                    ? 'text-destructive animate-pulse'
                    : 'text-primary'
                }`}
              >
                {stats.timeLeft}s
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative p-4 bg-secondary/20 rounded-xl border border-border">
              <div className="flex items-center justify-between gap-8">
                <div className="flex-1 text-center space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Target
                  </div>
                  <div className="text-4xl font-bold text-primary">
                    {target}
                  </div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="flex-1 text-center space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Your Throw
                  </div>
                  <div className="text-4xl font-bold text-primary">
                    {value[0]}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center">{getFeedbackMessage()}</div>
            </div>

            <div className="p-4 bg-secondary/20 rounded-xl">
              <SlingshotSlider
                value={value}
                onValueChange={handleSliderChange}
                maxAngle={45}
                fullPowerTime={800}
              />
            </div>
          </div>
        </div>
      )}

      {gameState === 'ended' && (
        <div className="text-center space-y-6 py-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Game Over!</h2>

            <div className="p-6 bg-secondary/20 rounded-xl space-y-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
                  Final Score
                </div>
                <div className="text-4xl font-bold text-primary">
                  {stats.score}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Attempts</div>
                  <div className="font-medium">{stats.attempts}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Time</div>
                  <div className="font-medium">
                    {GAME_TIME - stats.timeLeft}s
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
