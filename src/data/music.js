const cover = (id, width = 500) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const tracks = [
  { id: 1, title: 'Midnight City Lights', artist: 'The Midnight', album: 'After Hours', duration: '5:12', seconds: 312, genre: 'Synthwave', cover: cover('photo-1519608487953-e999c86e7455'), audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Ocean Drive', artist: 'Duke Dumont', album: 'Ocean Drive', duration: '3:46', seconds: 226, genre: 'Electronic', cover: cover('photo-1500530855697-b586d89ba3ee'), audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Golden Hour', artist: 'JVKE', album: 'this is what ____ feels like', duration: '3:29', seconds: 209, genre: 'Pop', cover: cover('photo-1470252649378-9c29740c9fa8'), audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 4, title: 'Weightless', artist: 'Marconi Union', album: 'The Ambient Transmissions', duration: '4:08', seconds: 248, genre: 'Ambient', cover: cover('photo-1470770841072-f978cf4d019e'), audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 5, title: 'Sunset Lover', artist: 'Petit Biscuit', album: 'Presence', duration: '3:57', seconds: 237, genre: 'Electronic', cover: cover('photo-1497250681960-ef046c08a56e'), audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id: 6, title: 'A Moment Apart', artist: 'ODESZA', album: 'A Moment Apart', duration: '3:54', seconds: 234, genre: 'Electronic', cover: cover('photo-1500534623283-312aade485b7'), audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { id: 7, title: 'Bloom', artist: 'ODESZA', album: 'Summer’s Gone', duration: '3:15', seconds: 195, genre: 'Chill', cover: cover('photo-1470071459604-3b5ec3a7fe05'), audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { id: 8, title: 'Night Trouble', artist: 'Petit Biscuit', album: 'Presence', duration: '3:42', seconds: 222, genre: 'Chill', cover: cover('photo-1518837695005-2083093ee35b'), audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
]

export const playlists = [
  { id: 'made-for-you', name: 'Made For You', description: 'A mix made for your day', cover: cover('photo-1519608487953-e999c86e7455'), trackIds: [1, 3, 5, 7] },
  { id: 'night-drive', name: 'Night Drive', description: 'The perfect late-night soundtrack', cover: cover('photo-1500530855697-b586d89ba3ee'), trackIds: [1, 2, 4, 8] },
  { id: 'focus-flow', name: 'Focus Flow', description: 'Find your focus and stay there', cover: cover('photo-1470770841072-f978cf4d019e'), trackIds: [4, 6, 7, 3] },
  { id: 'chill-mix', name: 'Chill Mix', description: 'Easy sounds for slow moments', cover: cover('photo-1497250681960-ef046c08a56e'), trackIds: [5, 7, 8, 4] },
]
