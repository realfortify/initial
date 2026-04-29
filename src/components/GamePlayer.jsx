import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Maximize2, Volume2, VolumeX } from 'lucide-react';

export default function GamePlayer({ game, onBack }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (!isFullscreen) {
      if (iframe?.requestFullscreen) {
        iframe.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-arcade-bg flex flex-col"
    >
      <header className="flex items-center justify-between px-6 py-4 border-b border-arcade-border bg-arcade-surface">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-arcade-text-muted hover:text-arcade-text transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Exit Game</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-black text-arcade-text">{game.title}</span>
            <span className="text-[10px] text-arcade-text-muted uppercase tracking-widest font-bold">{game.category}</span>
          </div>
          <div className="w-px h-8 bg-arcade-border mx-2 hidden md:block" />
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 bg-arcade-bg hover:bg-arcade-card border border-arcade-border rounded-lg transition-colors text-arcade-text-muted"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="arcade-button flex items-center gap-2 !py-2 !px-4 !text-xs"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-arcade-bg flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 border-2 border-arcade-accent border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-arcade-accent text-[10px] font-mono animate-pulse tracking-widest uppercase">Initializing Virtual Machine...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <iframe
          id="game-iframe"
          src={game.iframeUrl}
          className="w-full h-full max-w-6xl max-h-[85vh] md:max-h-none border-none shadow-2xl shadow-arcade-accent/10"
          title={game.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin"
        />
      </main>

      <footer className="px-6 py-3 border-t border-arcade-border bg-arcade-surface flex items-center justify-between text-[10px] text-arcade-text-muted font-bold tracking-widest uppercase">
        <div className="flex items-center gap-4">
          <span>HOST: ARCADE_SVR_01</span>
          <span className="text-arcade-accent font-mono">S-LINK: ESTABLISHED</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          <span>Secure Session</span>
        </div>
      </footer>
    </motion.div>
  );
}
