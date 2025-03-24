
import { Film, Star, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MovieTableData {
  id: string;
  rank: number;
  previousRank: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  ticketsSold: number;
  marketShare: number;
}

interface TopMoviesTableProps {
  data: MovieTableData[];
  className?: string;
}

const getRankChangeIcon = (current: number, previous: number) => {
  if (previous === 0) return <span className="w-4 h-4 flex items-center justify-center">—</span>;
  if (current < previous) {
    return <ArrowUpRight size={16} className="text-green-600" />;
  } else if (current > previous) {
    return <ArrowDownRight size={16} className="text-red-600" />;
  } else {
    return <Minus size={16} className="text-gray-400" />;
  }
};

const TopMoviesTable = ({ data, className }: TopMoviesTableProps) => {
  return (
    <div className={cn("dashboard-card", className)}>
      <div className="p-4 border-b border-border/40">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary/10 flex items-center justify-center rounded-full">
            <Film size={18} className="text-primary" />
          </div>
          <h3 className="font-semibold">Top Performing Movies</h3>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40 bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rank</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Movie</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Genre</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Year</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rating</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Tickets</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Share</th>
            </tr>
          </thead>
          <tbody>
            {data.map((movie) => (
              <tr 
                key={movie.id} 
                className="border-b border-border/20 hover:bg-muted/20 transition-colors cursor-pointer"
                onClick={() => window.location.href = `/movie/${movie.id}`}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{movie.rank}</span>
                    {getRankChangeIcon(movie.rank, movie.previousRank)}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-medium">{movie.title}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {movie.genre}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {movie.year}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span>{movie.rating.toFixed(1)}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap font-medium">
                  {movie.ticketsSold.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {movie.marketShare}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopMoviesTable;
