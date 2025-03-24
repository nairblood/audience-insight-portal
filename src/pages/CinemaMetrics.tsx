
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  MapPin, 
  Ticket, 
  Film, 
  Users,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CinemaHeatmapCard from '@/components/CinemaHeatmapCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CinemaData {
  id: string;
  name: string;
  city: string;
  state: string;
  totalShowtimes: number;
  totalTickets: number;
  occupancyRate: number;
  totalRevenue: number;
  averageTicketPrice: number;
  topMovie: {
    title: string;
    showtimes: number;
  };
}

const CinemaMetrics = () => {
  const [cinemas, setCinemas] = useState<CinemaData[]>([]);
  const [filteredCinemas, setFilteredCinemas] = useState<CinemaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');

  // Mock data
  const getMockCinemaData = (): CinemaData[] => {
    return [
      {
        id: 'c1',
        name: 'Empire Cinema',
        city: 'New York',
        state: 'NY',
        totalShowtimes: 56,
        totalTickets: 3850,
        occupancyRate: 82,
        totalRevenue: 61600,
        averageTicketPrice: 16,
        topMovie: { title: 'Interstellar 2', showtimes: 12 }
      },
      {
        id: 'c2',
        name: 'Manhattan Screens',
        city: 'New York',
        state: 'NY',
        totalShowtimes: 51,
        totalTickets: 3105,
        occupancyRate: 74,
        totalRevenue: 52785,
        averageTicketPrice: 17,
        topMovie: { title: 'Quantum Valley', showtimes: 10 }
      },
      {
        id: 'c3',
        name: 'Hollywood Dreams',
        city: 'Los Angeles',
        state: 'CA',
        totalShowtimes: 42,
        totalTickets: 3105,
        occupancyRate: 86,
        totalRevenue: 49680,
        averageTicketPrice: 16,
        topMovie: { title: 'Interstellar 2', showtimes: 11 }
      },
      {
        id: 'c4',
        name: 'LA Cineplex',
        city: 'Los Angeles',
        state: 'CA',
        totalShowtimes: 38,
        totalTickets: 2765,
        occupancyRate: 78,
        totalRevenue: 44240,
        averageTicketPrice: 16,
        topMovie: { title: 'Blue Symphony', showtimes: 9 }
      },
      {
        id: 'c5',
        name: 'Windy City Cinema',
        city: 'Chicago',
        state: 'IL',
        totalShowtimes: 38,
        totalTickets: 2345,
        occupancyRate: 68,
        totalRevenue: 37520,
        averageTicketPrice: 16,
        topMovie: { title: 'Interstellar 2', showtimes: 8 }
      },
      {
        id: 'c6',
        name: 'Chicago Screens',
        city: 'Chicago',
        state: 'IL',
        totalShowtimes: 34,
        totalTickets: 2105,
        occupancyRate: 72,
        totalRevenue: 33680,
        averageTicketPrice: 16,
        topMovie: { title: 'Quantum Valley', showtimes: 7 }
      },
      {
        id: 'c7',
        name: 'Golden Gate Movies',
        city: 'San Francisco',
        state: 'CA',
        totalShowtimes: 29,
        totalTickets: 1984,
        occupancyRate: 76,
        totalRevenue: 33728,
        averageTicketPrice: 17,
        topMovie: { title: 'Interstellar 2', showtimes: 7 }
      },
      {
        id: 'c8',
        name: 'Harbor Cinemas',
        city: 'Boston',
        state: 'MA',
        totalShowtimes: 22,
        totalTickets: 1705,
        occupancyRate: 82,
        totalRevenue: 27280,
        averageTicketPrice: 16,
        topMovie: { title: 'Eternal Dawn', showtimes: 6 }
      }
    ];
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const data = getMockCinemaData();
      setCinemas(data);
      setFilteredCinemas(data);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters
    let results = cinemas;
    
    if (searchQuery) {
      results = results.filter(cinema => 
        cinema.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cinema.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (cityFilter !== 'all') {
      results = results.filter(cinema => cinema.city === cityFilter);
    }
    
    setFilteredCinemas(results);
  }, [searchQuery, cityFilter, cinemas]);

  const cities = Array.from(new Set(cinemas.map(cinema => cinema.city)));
  
  // Calculate totals
  const totalShowtimes = filteredCinemas.reduce((sum, cinema) => sum + cinema.totalShowtimes, 0);
  const totalTickets = filteredCinemas.reduce((sum, cinema) => sum + cinema.totalTickets, 0);
  const totalRevenue = filteredCinemas.reduce((sum, cinema) => sum + cinema.totalRevenue, 0);
  const avgOccupancy = filteredCinemas.length > 0 
    ? Math.round(filteredCinemas.reduce((sum, cinema) => sum + cinema.occupancyRate, 0) / filteredCinemas.length) 
    : 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-pulse-subtle text-primary font-medium">Loading cinema metrics...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Cinema Performance</h1>
          <p className="text-muted-foreground">Track and analyze metrics across all cinema locations</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search cinemas..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all" onValueChange={setCityFilter}>
            <SelectTrigger className="w-[120px]">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="dashboard-card p-4 animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
              <MapPin size={20} className="text-primary" />
            </div>
            <div>
              <p className="card-title">Total Cinemas</p>
              <h3 className="text-2xl font-semibold">{filteredCinemas.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card p-4 animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
              <Film size={20} className="text-primary" />
            </div>
            <div>
              <p className="card-title">Total Showtimes</p>
              <h3 className="text-2xl font-semibold">{totalShowtimes}</h3>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card p-4 animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
              <Ticket size={20} className="text-primary" />
            </div>
            <div>
              <p className="card-title">Total Tickets</p>
              <h3 className="text-2xl font-semibold">{totalTickets.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card p-4 animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
              <Users size={20} className="text-primary" />
            </div>
            <div>
              <p className="card-title">Avg. Occupancy</p>
              <h3 className="text-2xl font-semibold">{avgOccupancy}%</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <CinemaHeatmapCard className="animate-fade-in" />
      </div>
      
      <Tabs defaultValue="table" className="animate-fade-in">
        <TabsList className="mb-4">
          <TabsTrigger value="table">Cinema Table</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="table">
          <div className="dashboard-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cinema Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Showtimes</TableHead>
                  <TableHead className="text-right">Tickets Sold</TableHead>
                  <TableHead className="text-right">Occupancy</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead>Top Movie</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCinemas.map((cinema) => (
                  <TableRow key={cinema.id}>
                    <TableCell className="font-medium">{cinema.name}</TableCell>
                    <TableCell>{`${cinema.city}, ${cinema.state}`}</TableCell>
                    <TableCell className="text-right">{cinema.totalShowtimes}</TableCell>
                    <TableCell className="text-right">{cinema.totalTickets.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        cinema.occupancyRate >= 80 ? 'bg-green-100 text-green-800' :
                        cinema.occupancyRate >= 70 ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {cinema.occupancyRate}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">${cinema.totalRevenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Film size={14} className="mr-1 text-primary" />
                        <span>{cinema.topMovie.title}</span>
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({cinema.topMovie.showtimes})
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue">
          <div className="dashboard-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-lg mb-1">${totalRevenue.toLocaleString()}</h3>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-lg mb-1">
                  ${(totalRevenue / totalTickets).toFixed(2)}
                </h3>
                <p className="text-sm text-muted-foreground">Average Ticket Price</p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-lg mb-1">
                  ${(totalRevenue / totalShowtimes).toFixed(2)}
                </h3>
                <p className="text-sm text-muted-foreground">Revenue Per Showtime</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">Revenue Insights</h4>
              <p className="text-sm text-muted-foreground">
                The highest performing cinemas in terms of revenue are located in urban centers, 
                with New York and Los Angeles leading the way. Empire Cinema in New York shows the 
                highest occupancy rate at 82%, contributing significantly to its strong revenue 
                performance. Interstellar 2 continues to be the top-grossing film across most 
                cinemas, appearing as the top movie in 5 out of 8 locations.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default CinemaMetrics;
