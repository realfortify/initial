import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LayoutGrid, Flame, Trophy, Search, Play, Settings, Moon, Sun, X } from 'lucide-react';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(gamesData.map((g) => g.category))];
    return cats;
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredGame = gamesData[0];

  return (
    <div className="h-screen bg-arcade-bg text-arcade-text font-sans overflow-hidden flex flex-col selection:bg-arcade-accent selection:text-white transition-colors duration-300">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-arcade-surface border-r border-arcade-border p-6 flex flex-col gap-8 shrink-0 hidden lg:flex">
          <section>
            <h3 className="text-[10px] font-black text-arcade-text-muted uppercase tracking-widest mb-4">Main Menu</h3>
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${selectedCategory === 'All' ? 'bg-arcade-accent text-white' : 'text-arcade-text-muted hover:text-arcade-text'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Lobby</span>
                </button>
              </li>
              <li><button className="w-full flex items-center gap-3 px-3 py-2 text-arcade-text-muted hover:text-arcade-text transition-colors"><Flame className="w-4 h-4" /><span>Trending</span></button></li>
              <li><button className="w-full flex items-center gap-3 px-3 py-2 text-arcade-text-muted hover:text-arcade-text transition-colors"><Trophy className="w-4 h-4" /><span>Leaderboards</span></button></li>
            </ul>
          </section>

          <section>
            <h3 className="text-[10px] font-black text-arcade-text-muted uppercase tracking-widest mb-4">Categories</h3>
            <ul className="space-y-1">
              {categories.filter(c => c !== 'All').map(category => (
                <li key={category}>
                  <button 
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category ? 'text-arcade-accent font-bold' : 'text-arcade-text-muted hover:text-arcade-text'}`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-auto flex flex-col gap-2">
            <button 
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-arcade-text-muted hover:text-arcade-text transition-colors hover:bg-arcade-accent/10"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar flex flex-col gap-8">
          {/* Game Grid */}
          <section className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black flex items-center gap-2 text-arcade-text">
                <span className="w-1.5 h-6 bg-arcade-accent rounded-full"></span>
                {selectedCategory === 'All' ? 'Top Pick Games' : `${selectedCategory} Hits`}
              </h2>
              <span className="text-xs font-mono text-arcade-text-muted">{filteredGames.length} Available</span>
            </div>
            
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onSelect={(g) => setSelectedGame(g)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
                <Search className="w-12 h-12 mb-4 text-arcade-text-muted" />
                <h3 className="text-lg font-bold text-arcade-text">Incompatibility Detected</h3>
                <p className="text-xs text-arcade-text-muted">No games found matching your active filters.</p>
              </div>
            )}
          </section>

          {/* Simple Footer */}
          <footer className="flex items-center justify-between mt-auto border-t border-arcade-border pt-6 pb-2 shrink-0">
            <div className="text-[10px] text-arcade-text-muted flex gap-4 uppercase font-bold tracking-widest">
              <span>© 2026 INITIAL BASE</span>
              <a href="#" className="hover:text-arcade-text">Privacy</a>
              <a href="#" className="hover:text-arcade-text">Terms</a>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] text-arcade-text-muted uppercase tracking-tighter font-mono">System Online</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-arcade-surface border border-arcade-border rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-arcade-border flex items-center justify-between">
                <div className="flex items-center gap-3 text-arcade-text">
                  <Settings className="w-5 h-5 text-arcade-accent" />
                  <h2 className="text-xl font-bold">Settings</h2>
                </div>
                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-arcade-accent/10 rounded-full transition-colors text-arcade-text">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-8">
                <section>
                  <h3 className="text-xs font-black text-arcade-text-muted uppercase tracking-widest mb-4">Appearance</h3>
                  <div className="flex items-center justify-between p-4 glass-card">
                    <div className="flex items-center gap-4 text-arcade-text">
                      {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                      <span className="font-medium">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                    </div>
                    <button 
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="w-12 h-6 bg-arcade-accent rounded-full relative transition-colors"
                    >
                      <motion.div 
                        animate={{ x: isDarkMode ? 24 : 4 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                      />
                    </button>
                  </div>
                </section>
                <section>
                  <h3 className="text-xs font-black text-arcade-text-muted uppercase tracking-widest mb-4">About</h3>
                  <div className="p-4 glass-card space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-arcade-text-muted">Version</span>
                      <span className="font-mono text-arcade-text">2.4.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-arcade-text-muted">Build</span>
                      <span className="font-mono text-arcade-text">INITIAL_BASE</span>
                    </div>
                  </div>
                </section>
              </div>
              <div className="p-6 bg-arcade-accent/5 flex justify-end">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="arcade-button !px-6 !py-2 !text-sm"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Game Player Modal */}
      <AnimatePresence>
        {selectedGame && (
          <GamePlayer
            game={selectedGame}
            onBack={() => setSelectedGame(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
