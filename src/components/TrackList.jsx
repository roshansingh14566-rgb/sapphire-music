import { usePlayer } from '../context/PlayerContext.jsx'
import { Play, Pause, MoreHorizontal } from 'lucide-react'

export function TrackList({ tracks, title = 'Popular tracks' }) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer()
  const formatDuration = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

  return (
    <section className="mt-9">
      <div className="mb-4 flex items-center justify-between"><h2 className="section-title">{title}</h2><span className="text-xs font-medium text-slate-500">{tracks.length} songs</span></div>
      <div className="track-heading grid grid-cols-[34px_minmax(0,1.7fr)_minmax(0,1fr)_70px] gap-3 px-3 pb-3 text-[11px] font-semibold uppercase tracking-[1.3px] text-slate-500"><span>#</span><span>Title</span><span className="hidden sm:block">Album</span><span className="text-right">Time</span></div>
      <div className="h-px bg-white/[0.07]" />
      <div className="mt-2 space-y-1">
        {tracks.map((track, index) => {
          const active = currentTrack?.id === track.id
          return (
            <button key={track.id} onClick={() => active ? togglePlay() : playTrack(track)} className={`track-row grid w-full grid-cols-[34px_minmax(0,1.7fr)_minmax(0,1fr)_70px] items-center gap-3 rounded-xl px-3 py-2.5 text-left ${active ? 'track-current' : ''}`}>
              <span className="flex items-center justify-center text-sm text-slate-500">{active ? (isPlaying ? <span className="equalizer"><i /><i /><i /></span> : <Play size={15} className="fill-violet-400 text-violet-400" />) : <><span className="row-number">{index + 1}</span><Play size={15} className="row-play fill-white text-white" /></>}</span>
              <span className="flex min-w-0 items-center gap-3"><img src={track.cover} alt="" className="h-11 w-11 shrink-0 rounded-lg object-cover" /><span className="min-w-0"><span className={`block truncate text-sm font-semibold ${active ? 'text-violet-300' : 'text-white'}`}>{track.title}</span><span className="mt-1 block truncate text-xs text-slate-500">{track.artist}</span></span></span>
              <span className="hidden truncate text-xs text-slate-500 sm:block">{track.album}</span>
              <span className="flex items-center justify-end gap-2 text-xs tabular-nums text-slate-500"><span>{formatDuration(track.seconds)}</span><MoreHorizontal size={17} className="hidden text-slate-500 md:block" /></span>
            </button>
          )
        })}
        {tracks.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No tracks found. Try another search.</p>}
      </div>
    </section>
  )
}
