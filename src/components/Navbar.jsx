import React from 'react';
import { Search, Gamepad2 } from 'lucide-react';

export default function Navbar({
  searchQuery,
  setSearchQuery,
}) {
  return (
    <nav className="h-16 border-b border-arcade-border bg-arcade-surface flex items-center justify-between px-8 shrink-0 sticky top-0 z-50">
      <div className="flex items-center gap-3 cursor-center" onClick={() => window.location.reload()}>
        <span 
          className="text-2xl font-bold text-arcade-text lowercase"
          style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
        >
          initial
        </span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search 500+ games..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-arcade-bg border border-arcade-border rounded-full py-2 px-10 text-sm w-80 focus:outline-none focus:border-arcade-accent transition-all text-arcade-text placeholder:text-arcade-text-muted"
          />
          <Search className="w-4 h-4 text-arcade-text-muted absolute left-4 top-2.5" />
        </div>
        <div className="flex gap-4 items-center border-l border-arcade-border pl-6 hidden md:flex">
          <button className="text-arcade-text-muted hover:text-arcade-text transition-colors">
            <Gamepad2 className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-arcade-card flex items-center justify-center text-xs font-bold text-arcade-text">ARC</div>
        </div>
      </div>
    </nav>
  );
}
