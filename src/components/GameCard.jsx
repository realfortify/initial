import React from 'react';
import { motion } from 'motion/react';
import { Play, Star } from 'lucide-react';

export const GameCard = ({ game, onSelect }) => {
  return (
    <motion.div
      layoutId={`card-${game.id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
      onClick={() => onSelect(game)}
    >
      <div className="aspect-video bg-arcade-card rounded-2xl mb-3 border border-arcade-border group-hover:border-arcade-accent/50 transition-all flex items-center justify-center relative overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${game.id}/400/225`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/60 transition-colors" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-arcade-accent rounded-full flex items-center justify-center shadow-lg shadow-arcade-accent/30 scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="text-white fill-white ml-1 w-5 h-5" />
          </div>
        </div>
        
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/40 opacity-60">
          ID: {game.id}
        </div>
      </div>
      
      <h4 className="font-semibold text-sm text-arcade-text group-hover:text-arcade-accent transition-colors truncate">
        {game.title}
      </h4>
      <div className="flex items-center gap-2 mt-0.5">
        <span className="text-[10px] text-arcade-text-muted uppercase font-bold tracking-tight">{game.category}</span>
        <div className="w-1 h-1 bg-arcade-border rounded-full" />
        <div className="flex items-center gap-1 text-arcade-text-muted">
          <Star className="w-2.5 h-2.5 fill-arcade-accent text-arcade-accent" />
          <span className="text-[10px] font-bold">4.8 Rating</span>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
