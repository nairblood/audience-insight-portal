
import { Film, Clock, Star, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
  genre: string;
  duration: number;
  year: number;
  rating: number;
  showTimes?: number;
  marketShare?: number;
  className?: string;
}

const MovieCard = ({
  id,
  title,
  posterUrl,
  genre,
  duration,
  year,
  rating,
  showTimes,
  marketShare,
  className,
}: MovieCardProps) => {
  const formatDuration = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div 
      className={cn(
        "dashboard-card hover-scale group cursor-pointer h-full flex flex-col",
        className
      )}
      onClick={() => window.location.href = `/movie/${id}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl || 'https://placehold.co/300x450/EEE/31343C?text=No+Image'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-3 w-full">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              </div>
              {marketShare && (
                <div className="px-2 py-0.5 bg-primary/90 rounded-full text-xs font-medium">
                  {marketShare}% Share
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-3">
        <h3 className="font-medium line-clamp-1 mb-1">{title}</h3>
        <div className="text-xs text-muted-foreground space-y-1 mt-auto">
          <div className="flex items-center gap-1">
            <Film size={12} />
            <span>{genre}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{formatDuration(duration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{year}</span>
          </div>
          {showTimes && (
            <div className="mt-2 pt-2 border-t border-border/40 flex justify-between items-center">
              <span className="text-xs font-medium">Daily Showtimes</span>
              <span className="text-primary font-semibold">{showTimes}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
