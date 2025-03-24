
import { useState, useEffect } from 'react';
import { Map, MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cn } from '@/lib/utils';

interface CinemaData {
  id: string;
  city: string;
  name: string;
  showtimes: number;
  latitude: number;
  longitude: number;
  density: 'low' | 'medium' | 'high';
}

interface CinemaHeatmapCardProps {
  className?: string;
}

// Mock data
const getMockCinemaData = (): CinemaData[] => {
  return [
    { id: '1', city: 'New York', name: 'Empire Cinema', showtimes: 56, latitude: 40.7128, longitude: -74.0060, density: 'high' },
    { id: '2', city: 'Los Angeles', name: 'Hollywood Dreams', showtimes: 42, latitude: 34.0522, longitude: -118.2437, density: 'high' },
    { id: '3', city: 'Chicago', name: 'Windy City Cinema', showtimes: 38, latitude: 41.8781, longitude: -87.6298, density: 'medium' },
    { id: '4', city: 'San Francisco', name: 'Golden Gate Movies', showtimes: 29, latitude: 37.7749, longitude: -122.4194, density: 'medium' },
    { id: '5', city: 'New York', name: 'Manhattan Screens', showtimes: 51, latitude: 40.7831, longitude: -73.9712, density: 'high' },
    { id: '6', city: 'Boston', name: 'Harbor Cinemas', showtimes: 22, latitude: 42.3601, longitude: -71.0589, density: 'low' },
    { id: '7', city: 'Seattle', name: 'Emerald Screens', showtimes: 26, latitude: 47.6062, longitude: -122.3321, density: 'medium' },
    { id: '8', city: 'Denver', name: 'Mile High Movies', showtimes: 19, latitude: 39.7392, longitude: -104.9903, density: 'low' },
  ];
};

const CinemaHeatmapCard = ({ className }: CinemaHeatmapCardProps) => {
  const [filter, setFilter] = useState<string>('all');
  const [cinemaData, setCinemaData] = useState<CinemaData[]>([]);
  
  useEffect(() => {
    const data = getMockCinemaData();
    const filtered = filter === 'all' ? data : data.filter(cinema => cinema.city === filter);
    setCinemaData(filtered);
  }, [filter]);
  
  const cities = Array.from(new Set(getMockCinemaData().map(cinema => cinema.city)));
  
  // Calculate total showtimes
  const totalShowtimes = cinemaData.reduce((sum, cinema) => sum + cinema.showtimes, 0);
  
  // Function to get color based on density
  const getDensityColor = (density: 'low' | 'medium' | 'high') => {
    switch(density) {
      case 'low': return 'bg-blue-100 text-blue-700';
      case 'medium': return 'bg-blue-200 text-blue-800';
      case 'high': return 'bg-blue-300 text-blue-900';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={cn("dashboard-card", className)}>
      <div className="p-4 border-b border-border/40">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary/10 flex items-center justify-center rounded-full">
              <Map size={18} className="text-primary" />
            </div>
            <h3 className="font-semibold">Cinema Showtimes Distribution</h3>
          </div>
          <div>
            <Select defaultValue="all" onValueChange={setFilter}>
              <SelectTrigger className="w-[150px] h-8 text-xs">
                <SelectValue placeholder="Filter by city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <p className="text-sm">
            <span className="font-semibold">{totalShowtimes}</span>{" "}
            <span className="text-muted-foreground">total showtimes across {cinemaData.length} cinemas</span>
          </p>
        </div>
      </div>
      
      <div className="relative h-[300px] bg-slate-50 flex">
        {/* Map Placeholder - In a real app, this would be a real map */}
        <div className="w-full h-full flex items-center justify-center bg-[url('https://placehold.co/800x400/e5e7eb/a3a3a3?text=Interactive+Map+Here')] bg-cover bg-center p-3 relative">
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
          
          {/* Cinema markers - would be positioned on real coordinates in production */}
          {cinemaData.map((cinema, index) => {
            // Calculate pseudo-positions for demonstration
            const top = 30 + (index * 30) % 240;
            const left = 40 + (index * 80) % 700;
            
            return (
              <div 
                key={cinema.id}
                className="absolute animate-pulse-subtle"
                style={{ 
                  top: `${top}px`, 
                  left: `${left}px`,
                }}
              >
                <div className="relative group">
                  <MapPin 
                    size={24} 
                    className="text-primary cursor-pointer" 
                    fill="rgba(59, 130, 246, 0.2)"
                  />
                  <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded-lg shadow-lg text-xs z-10 pointer-events-none animate-fade-in">
                    <div className="font-medium">{cinema.name}</div>
                    <div className="text-muted-foreground">{cinema.city}</div>
                    <div className="mt-1 flex justify-between items-center">
                      <span>Showtimes:</span>
                      <span className={`px-2 py-0.5 rounded-full ${getDensityColor(cinema.density)}`}>
                        {cinema.showtimes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-4 border-t border-border/40">
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Showtime density:
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-100"></div>
              <span className="text-xs">Low (&lt;25)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-200"></div>
              <span className="text-xs">Medium (25-40)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-300"></div>
              <span className="text-xs">High (&gt;40)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaHeatmapCard;
