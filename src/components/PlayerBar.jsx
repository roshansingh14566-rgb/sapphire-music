import { useEffect } from 'react'
import { usePlayer } from '../context/PlayerContext.jsx'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Shuffle, Repeat, ListMusic } from 'lucide-react'

const timeLabel = (time) => {
  if (!Number.isFinite(time)) return '0:00'
  return `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`
}

export default function PlayerBar() {
  const { audioRef, currentTrack, isPlaying, currentTime, duration, volume, isMuted, setIsPlaying, setCurrentTime, setDuration, setVolume, setIsMuted, togglePlay, playNext, playPrevious, seek } = usePlayer()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) audio.play().catch(() => setIsPlaying(false))
    else audio.pause()
  }, [isPlaying, currentTrack, audioRef, setIsPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = isMuted
    }
  }, [volume, isMuted, audioRef])

  const changeVolume = (value) => {
    const nextVolume = Number(value)
    setVolume(nextVolume)
    setIsMuted(nextVolume === 0)
    if (audioRef.current) audioRef.current.volume = nextVolume
  }

  return (
    <>
      <audio ref={audioRef} src={currentTrack?.audio} preload="metadata" onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)} onEnded={playNext} onError={() => setIsPlaying(false)} />
      <footer className="player-shell">
        <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 md:px-7">
          <div className="flex min-w-0 items-center gap-3"><img src={currentTrack?.cover} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover md:h-14 md:w-14" /><div className="min-w-0"><p className="truncate text-xs font-bold text-white md:text-sm">{currentTrack?.title || 'Choose a track'}</p><p className="mt-1 truncate text-[11px] text-slate-500">{currentTrack?.artist}</p></div><button className="ml-1 hidden text-slate-500 transition hover:text-violet-300 sm:block" aria-label="Like track"><Heart size={17} /></button></div>
          <div className="flex w-[min(46vw,440px)] flex-col items-center gap-1.5"><div className="flex items-center gap-4 text-slate-400"><button className="hidden transition hover:text-white sm:block" aria-label="Shuffle"><Shuffle size={15} /></button><button className="transition hover:text-white" onClick={playPrevious} aria-label="Previous track"><SkipBack size={18} fill="currentColor" /></button><button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:scale-105" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" className="ml-0.5" />}</button><button className="transition hover:text-white" onClick={playNext} aria-label="Next track"><SkipForward size={18} fill="currentColor" /></button><button className="hidden transition hover:text-white sm:block" aria-label="Repeat"><Repeat size={15} /></button></div><div className="flex w-full items-center gap-2"><span className="w-8 text-right text-[10px] tabular-nums text-slate-500">{timeLabel(currentTime)}</span><input aria-label="Playback position" className="progress-slider" type="range" min="0" max={duration || 100} step="0.1" value={Math.min(currentTime, duration || 100)} onChange={(event) => seek(event.target.value)} /><span className="w-8 text-[10px] tabular-nums text-slate-500">{timeLabel(duration)}</span></div></div>
          <div className="flex items-center justify-end gap-3 text-slate-500"><button className="hidden transition hover:text-white lg:block" aria-label="Queue"><ListMusic size={18} /></button><button className="transition hover:text-white" onClick={() => { const next = !isMuted; setIsMuted(next); if (audioRef.current) audioRef.current.muted = next }} aria-label="Mute"><span className="hidden">Mute</span>{isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}</button><input aria-label="Volume" className="volume-slider hidden w-20 sm:block" type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={(event) => changeVolume(event.target.value)} /></div>
        </div>
      </footer>
    </>
  )
}
