import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Bell, ChevronDown, Clock3, Menu, Play, Search, Sparkles } from 'lucide-react'
import Sidebar from './components/Sidebar.jsx'
import PlayerBar from './components/PlayerBar.jsx'
import { TrackList } from './components/TrackList.jsx'
import { playlists, tracks } from './data/music.js'
import { usePlayer } from './context/PlayerContext.jsx'

export default function App() {
  const [activeView, setActiveView] = useState('home')
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { playTrack } = usePlayer()

  const selected = playlists.find((playlist) => playlist.id === selectedPlaylist)
  const visibleTracks = useMemo(() => {
    if (activeView === 'search') {
      const term = search.trim().toLowerCase()
      if (!term) return tracks
      return tracks.filter((track) => `${track.title} ${track.artist} ${track.album} ${track.genre}`.toLowerCase().includes(term))
    }
    if (selectedPlaylist === 'liked') return tracks.slice(0, 5)
    if (selected) return selected.trackIds.map((id) => tracks.find((track) => track.id === id)).filter(Boolean)
    return tracks
  }, [activeView, search, selectedPlaylist, selected])

  const choosePlaylist = (id) => {
    setSelectedPlaylist(id)
    setActiveView('home')
  }

  const pageTitle = activeView === 'search' ? 'Search' : activeView === 'library' ? 'Your Library' : selectedPlaylist === 'liked' ? 'Liked Songs' : selected?.name || 'Good evening'

  return (
    <div className="app-frame">
      <Sidebar activeView={activeView} setActiveView={(view) => { setActiveView(view); setSelectedPlaylist(null) }} onSelectPlaylist={choosePlaylist} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="main-shell">
        <header className="topbar">
          <div className="flex items-center gap-3"><button className="icon-button md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={21} /></button><button className="circle-nav" aria-label="Go back"><ArrowLeft size={17} /></button><button className="circle-nav" aria-label="Go forward"><ArrowRight size={17} /></button><div className="search-box ml-2 hidden sm:flex"><Search size={17} className="shrink-0 text-slate-400" /><input value={search} onChange={(event) => { setSearch(event.target.value); setActiveView('search'); setSelectedPlaylist(null) }} placeholder="What do you want to listen to?" aria-label="Search songs" /></div></div>
          <div className="flex items-center gap-3"><button className="icon-button hidden sm:flex" aria-label="Notifications"><Bell size={18} /></button><button className="profile-pill"><span className="profile-avatar">S</span><span className="hidden text-xs font-semibold text-white sm:block">Student</span><ChevronDown size={14} className="text-slate-400" /></button></div>
        </header>
        <div className="mobile-search search-box mx-5 mt-3 flex sm:hidden"><Search size={17} className="shrink-0 text-slate-400" /><input value={search} onChange={(event) => { setSearch(event.target.value); setActiveView('search'); setSelectedPlaylist(null) }} placeholder="Search songs, artists..." aria-label="Search songs" /></div>

        <div className="content-scroll">
          {selected && activeView !== 'search' ? (
            <section className="playlist-hero" style={{ backgroundImage: `linear-gradient(0deg, #11151d 0%, rgba(17,21,29,.65) 54%, rgba(17,21,29,.05) 100%), url(${selected.cover})` }}>
              <span className="eyebrow">PLAYLIST</span><h1>{selected.name}</h1><p>{selected.description} · {visibleTracks.length} songs</p><button className="play-cta mt-6" onClick={() => playTrack(visibleTracks[0])} disabled={!visibleTracks.length}><Play size={18} fill="currentColor" /> Play</button>
            </section>
          ) : selectedPlaylist === 'liked' && activeView !== 'search' ? (
            <section className="playlist-hero liked-hero"><span className="eyebrow">PLAYLIST</span><h1>Liked Songs</h1><p>Your favourite tracks, all in one place · {visibleTracks.length} songs</p><button className="play-cta mt-6" onClick={() => playTrack(visibleTracks[0])}><Play size={18} fill="currentColor" /> Play</button></section>
          ) : (
            <section className="welcome-block"><div><div className="eyebrow flex items-center gap-2"><Sparkles size={13} /> YOUR PERSONAL SOUNDTRACK</div><h1>{pageTitle}</h1><p>{activeView === 'search' ? 'Find a song, artist, album or mood.' : activeView === 'library' ? 'All your playlists and favourite sounds in one place.' : 'Music for every mood, moment and memory.'}</p></div><div className="welcome-orb"><div className="orb-inner"><span>♪</span></div></div></section>
          )}

          {activeView === 'home' && !selectedPlaylist && <>
            <section className="mt-8"><div className="mb-4 flex items-center justify-between"><h2 className="section-title">Made for your mood</h2><button className="see-all" onClick={() => setActiveView('library')}>See all</button></div><div className="playlist-grid">{playlists.map((playlist, index) => <button key={playlist.id} className="playlist-card" onClick={() => choosePlaylist(playlist.id)}><div className="playlist-image-wrap"><img src={playlist.cover} alt="" className="playlist-image" /><span className="card-play"><Play size={18} fill="currentColor" /></span></div><span className="mt-3 block truncate text-sm font-bold text-white">{playlist.name}</span><span className="mt-1 block line-clamp-2 text-xs leading-5 text-slate-500">{playlist.description}</span></button>)}</div></section>
            <div className="feature-banner mt-9"><div className="relative z-10"><span className="eyebrow !text-violet-200">SAPPHIRE MIX</span><h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">Press play. Find your flow.</h2><p className="mt-2 max-w-md text-sm leading-6 text-violet-100/70">A handpicked collection of electronic, chill and feel-good sounds to keep your day moving.</p><button className="mt-5 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-slate-950 transition hover:scale-105" onClick={() => playTrack(tracks[0])}>Listen now</button></div><div className="banner-art"><div className="banner-disc"><span>♪</span></div></div></div>
          </>}

          {activeView === 'library' && <div className="mt-7"><div className="playlist-grid">{playlists.map((playlist) => <button key={playlist.id} className="playlist-card" onClick={() => choosePlaylist(playlist.id)}><div className="playlist-image-wrap"><img src={playlist.cover} alt="" className="playlist-image" /><span className="card-play"><Play size={18} fill="currentColor" /></span></div><span className="mt-3 block truncate text-sm font-bold text-white">{playlist.name}</span><span className="mt-1 block text-xs text-slate-500">Playlist · {playlist.trackIds.length} songs</span></button>)}</div></div>}

          <TrackList tracks={visibleTracks} title={activeView === 'search' ? (search ? 'Search results' : 'Explore all tracks') : selected ? 'In this playlist' : selectedPlaylist === 'liked' ? 'Your liked tracks' : 'Popular right now'} />
          <div className="mt-12 flex items-center justify-between border-t border-white/[0.06] pt-5 pb-5 text-[11px] text-slate-600"><span>© 2026 Sapphire Music · Student Project</span><span className="flex items-center gap-1"><Clock3 size={12} /> Built with React + HTML5 Audio</span></div>
        </div>
      </main>
      <PlayerBar />
    </div>
  )
}
