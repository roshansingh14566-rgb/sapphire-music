import { Home, Search, Library, Plus, Heart, Music2, X } from 'lucide-react'
import { playlists } from '../data/music.js'

export default function Sidebar({ activeView, setActiveView, onSelectPlaylist, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && <button className="fixed inset-0 z-30 bg-black/70 md:hidden" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar-shell ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="flex items-center justify-between px-6 pt-7 pb-8">
          <div className="flex items-center gap-2.5">
            <div className="brand-mark"><Music2 size={19} strokeWidth={2.8} /></div>
            <span className="text-[21px] font-extrabold tracking-[-1px] text-white">sapphire<span className="text-violet-400">.</span></span>
          </div>
          <button className="icon-button md:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        </div>

        <nav className="px-3">
          <p className="sidebar-label">MENU</p>
          <button className={`nav-link ${activeView === 'home' ? 'nav-active' : ''}`} onClick={() => { setActiveView('home'); setMobileOpen(false) }}><Home size={19} /> Home</button>
          <button className={`nav-link ${activeView === 'search' ? 'nav-active' : ''}`} onClick={() => { setActiveView('search'); setMobileOpen(false) }}><Search size={19} /> Search</button>
          <button className={`nav-link ${activeView === 'library' ? 'nav-active' : ''}`} onClick={() => { setActiveView('library'); setMobileOpen(false) }}><Library size={19} /> Your Library</button>
        </nav>

        <div className="mx-6 my-6 h-px bg-white/[0.07]" />
        <div className="px-3">
          <div className="mb-3 flex items-center justify-between px-3"><p className="sidebar-label !mb-0">YOUR PLAYLISTS</p><button className="icon-button" aria-label="Create playlist"><Plus size={18} /></button></div>
          <button className="nav-link" onClick={() => { onSelectPlaylist('liked'); setMobileOpen(false) }}><Heart size={18} className="text-violet-400" /> Liked Songs</button>
          {playlists.map((playlist) => (
            <button key={playlist.id} className="nav-link truncate" onClick={() => { onSelectPlaylist(playlist.id); setMobileOpen(false) }}>
              <img src={playlist.cover} alt="" className="h-7 w-7 rounded-md object-cover" /> <span className="truncate">{playlist.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-auto p-6"><div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4"><div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-violet-300"><Music2 size={16} /></div><p className="text-sm font-semibold text-white">Your sound, your space.</p><p className="mt-1 text-xs leading-5 text-slate-500">A little music makes every moment better.</p></div></div>
      </aside>
    </>
  )
}
