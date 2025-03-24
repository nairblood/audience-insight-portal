
import { useEffect, useState } from 'react';
import { Ticket, ArrowUp, ArrowDown } from 'lucide-react';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';

interface TicketSalesData {
  id: string;
  cityName: string;
  cinemaName: string;
  totalTickets: number;
  previousTotal: number;
  percentChange: number;
  lastUpdated: string;
}

interface TicketSalesCardProps {
  cityFilter?: string;
  className?: string;
}

// Mock data function
const getMockTicketData = (): TicketSalesData[] => {
  return [
    {
      id: '1',
      cityName: 'New York',
      cinemaName: 'Empire Cinema',
      totalTickets: 823,
      previousTotal: 756,
      percentChange: 8.9,
      lastUpdated: '15 minutes ago'
    },
    {
      id: '2',
      cityName: 'Los Angeles',
      cinemaName: 'Hollywood Dreams',
      totalTickets: 612,
      previousTotal: 680,
      percentChange: -10.0,
      lastUpdated: '5 minutes ago'
    },
    {
      id: '3',
      cityName: 'Chicago',
      cinemaName: 'Windy City Cinema',
      totalTickets: 405,
      previousTotal: 387,
      percentChange: 4.7,
      lastUpdated: '10 minutes ago'
    },
    {
      id: '4',
      cityName: 'San Francisco',
      cinemaName: 'Golden Gate Movies',
      totalTickets: 347,
      previousTotal: 302,
      percentChange: 14.9,
      lastUpdated: '12 minutes ago'
    },
    {
      id: '5',
      cityName: 'New York',
      cinemaName: 'Manhattan Screens',
      totalTickets: 289,
      previousTotal: 321,
      percentChange: -9.9,
      lastUpdated: '8 minutes ago'
    }
  ];
};

const TicketSalesCard = ({ cityFilter, className }: TicketSalesCardProps) => {
  const [ticketData, setTicketData] = useState<TicketSalesData[]>([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('');
  const [overallChange, setOverallChange] = useState(0);

  useEffect(() => {
    // Simulate fetching data
    const data = getMockTicketData();
    const filteredData = cityFilter 
      ? data.filter(item => item.cityName === cityFilter) 
      : data;
    
    setTicketData(filteredData);
    
    // Calculate totals
    const currentTotal = filteredData.reduce((sum, item) => sum + item.totalTickets, 0);
    const previousTotal = filteredData.reduce((sum, item) => sum + item.previousTotal, 0);
    const changePercent = previousTotal > 0 
      ? ((currentTotal - previousTotal) / previousTotal) * 100 
      : 0;
    
    setTotalTickets(currentTotal);
    setOverallChange(parseFloat(changePercent.toFixed(1)));
    setLastUpdated(filteredData[0]?.lastUpdated || 'Unknown');
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTicketData(prevData => {
        return prevData.map(item => {
          // Randomly update some items
          if (Math.random() > 0.7) {
            const change = Math.floor(Math.random() * 20) - 5;
            const newTotal = Math.max(0, item.totalTickets + change);
            const newPercent = ((newTotal - item.previousTotal) / item.previousTotal) * 100;
            return {
              ...item,
              totalTickets: newTotal,
              percentChange: parseFloat(newPercent.toFixed(1)),
              lastUpdated: 'Just now'
            };
          }
          return item;
        });
      });
    }, 15000); // Update every 15 seconds
    
    return () => clearInterval(interval);
  }, [cityFilter]);

  // Calculate max tickets for progress bar
  const maxTickets = Math.max(...ticketData.map(item => item.totalTickets), 1);

  return (
    <div className={cn("dashboard-card", className)}>
      <div className="p-4 border-b border-border/40">
        <div className="flex justify-between items-center">
          <div>
            <span className="card-title">Near Real-Time Ticket Sales</span>
            <h3 className="text-2xl font-semibold mt-1">{totalTickets.toLocaleString()}</h3>
            <div className="flex items-center gap-1 mt-1">
              <span className={`text-sm font-medium ${overallChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {overallChange >= 0 ? (
                  <ArrowUp size={16} className="inline mr-1" />
                ) : (
                  <ArrowDown size={16} className="inline mr-1" />
                )}
                {Math.abs(overallChange)}%
              </span>
              <span className="text-xs text-muted-foreground">vs yesterday</span>
            </div>
          </div>
          <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
            <Ticket size={20} className="text-primary" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Last updated: {lastUpdated}</p>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {ticketData.map(item => (
            <div key={item.id} className="animate-fade-in">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <p className="text-sm font-medium">{item.cinemaName}</p>
                  <p className="text-xs text-muted-foreground">{item.cityName}</p>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{item.totalTickets}</span>
                  <span 
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      item.percentChange >= 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {item.percentChange >= 0 ? '+' : ''}{item.percentChange}%
                  </span>
                </div>
              </div>
              <Progress 
                value={(item.totalTickets / maxTickets) * 100} 
                className="h-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketSalesCard;
