
import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Film, TrendingUp, ArrowUpDown, CalendarDays } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cn } from '@/lib/utils';

interface ShowtimeData {
  rank: number;
  title: string;
  marketShare: number;
  showtimeCount: number;
  color: string;
}

interface ShowtimeMetricsCardProps {
  className?: string;
}

// Mock data
const getMockShowtimeData = (): ShowtimeData[] => {
  return [
    { rank: 1, title: 'Interstellar 2', marketShare: 28.4, showtimeCount: 186, color: '#4361ee' },
    { rank: 2, title: 'Quantum Valley', marketShare: 19.7, showtimeCount: 142, color: '#3a0ca3' },
    { rank: 3, title: 'Blue Symphony', marketShare: 15.2, showtimeCount: 98, color: '#4895ef' },
    { rank: 4, title: 'Eternal Dawn', marketShare: 12.1, showtimeCount: 85, color: '#560bad' },
    { rank: 5, title: 'Neon Knights', marketShare: 9.6, showtimeCount: 67, color: '#7209b7' },
    { rank: 6, title: 'Other Films', marketShare: 15.0, showtimeCount: 104, color: '#b5b5b5' }
  ];
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-border/40">
        <p className="font-medium">{`${data.title}`}</p>
        <p className="text-sm text-muted-foreground">{`Rank: ${data.rank}`}</p>
        <p className="text-sm text-primary font-medium">{`Market Share: ${data.marketShare}%`}</p>
        <p className="text-sm text-muted-foreground">{`Showtimes: ${data.showtimeCount}`}</p>
      </div>
    );
  }
  return null;
};

const ShowtimeMetricsCard = ({ className }: ShowtimeMetricsCardProps) => {
  const [sortBy, setSortBy] = useState<'rank' | 'marketShare'>('rank');
  const [data, setData] = useState<ShowtimeData[]>(getMockShowtimeData());

  const handleSortChange = (value: string) => {
    const sortValue = value as 'rank' | 'marketShare';
    setSortBy(sortValue);
    
    const sortedData = [...data].sort((a, b) => {
      if (sortValue === 'rank') {
        return a.rank - b.rank;
      } else {
        return b.marketShare - a.marketShare;
      }
    });
    
    setData(sortedData);
  };

  return (
    <div className={cn("dashboard-card", className)}>
      <div className="p-4 border-b border-border/40">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary/10 flex items-center justify-center rounded-full">
              <Film size={18} className="text-primary" />
            </div>
            <h3 className="font-semibold">Daily Showtime Metrics</h3>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="rank" onValueChange={handleSortChange}>
              <SelectTrigger className="w-[130px] h-8 text-xs">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rank">
                  <div className="flex items-center gap-1">
                    <ArrowUpDown size={14} />
                    <span>By Rank</span>
                  </div>
                </SelectItem>
                <SelectItem value="marketShare">
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} />
                    <span>By Market Share</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarDays size={14} className="mr-1" />
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              domain={[0, 'dataMax']} 
              tickFormatter={(value) => `${value}%`} 
            />
            <YAxis 
              dataKey="title" 
              type="category" 
              width={150}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="marketShare" 
              radius={[0, 4, 4, 0]}
              barSize={24} 
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ShowtimeMetricsCard;
