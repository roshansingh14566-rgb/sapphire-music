import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { tracks } from '../data/music.js'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [currentTrack, setCurrentTrack] = useState(tracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.75)
  const [isMuted, setIsMuted] = useState(false)

  const playTrack = useCallback((track) => {
    if (!track) return
    if (currentTrack?.id === track.id) {
      setIsPlaying(true)
    } else {
      setCurrentTrack(track)
      setCurrentTime(0)
      setIsPlaying(true)
    }
  }, [currentTrack])

  const togglePlay = useCallback(() => setIsPlaying((playing) => !playing), [])
  const playNext = useCallback(() => {
    const index = tracks.findIndex((track) => track.id === currentTrack?.id)
    setCurrentTrack(tracks[(index + 1 + tracks.length) % tracks.length])
    setCurrentTime(0)
    setIsPlaying(true)
  }, [currentTrack])
  const playPrevious = useCallback(() => {
    if (currentTime > 3) {
      setCurrentTime(0)
      if (audioRef.current) audioRef.current.currentTime = 0
      return
    }
    const index = tracks.findIndex((track) => track.id === currentTrack?.id)
    setCurrentTrack(tracks[(index - 1 + tracks.length) % tracks.length])
    setCurrentTime(0)
    setIsPlaying(true)
  }, [currentTime, currentTrack])
  const seek = useCallback((value) => {
    const nextTime = Number(value)
    setCurrentTime(nextTime)
    if (audioRef.current) audioRef.current.currentTime = nextTime
  }, [])

  const value = useMemo(() => ({
    audioRef, currentTrack, isPlaying, currentTime, duration, volume, isMuted,
    setIsPlaying, setCurrentTime, setDuration, setVolume, setIsMuted,
    playTrack, togglePlay, playNext, playPrevious, seek,
  }), [currentTrack, isPlaying, currentTime, duration, volume, isMuted, playTrack, togglePlay, playNext, playPrevious, seek])

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) throw new Error('usePlayer must be used inside PlayerProvider')
  return context
}
