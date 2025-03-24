
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Film, 
  Star, 
  Users, 
  Ticket,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// Sample data
const getMovieDetails = (id: string) => {
  // This would be a real API call in production
  return {
    id,
    title: 'Interstellar 2',
    tagline: 'Beyond the boundaries of space and time.',
    posterUrl: 'https://placehold.co/600x900/4361ee/FFFFFF?text=Interstellar+2',
    backdropUrl: 'https://placehold.co/1200x400/3a0ca3/FFFFFF?text=Interstellar+2+Banner',
    genre: 'Sci-Fi',
    duration: 165,
    year: 2023,
    rating: 9.2,
    description: 'In the near future, a team of explorers embark on an interstellar journey to find a new habitable planet as Earth faces extinction. Utilizing a newly discovered wormhole, they travel beyond our solar system in a race against time to save humanity.',
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    totalTickets: 15284,
    marketShare: 28.4,
    totalShowtimes: 186,
    admissions: {
      daily: [
        { date: 'Mon', tickets: 2105, showtime: 42 },
        { date: 'Tue', tickets: 1982, showtime: 40 },
        { date: 'Wed', tickets: 2344, showtime: 42 },
        { date: 'Thu', tickets: 2421, showtime: 42 },
        { date: 'Fri', tickets: 3105, showtime: 48 },
        { date: 'Sat', tickets: 3327, showtime: 52 },
        { date: 'Sun', tickets: 2916, showtime: 48 }
      ]
    },
    demographics: [
      { name: 'Under 18', value: 15 },
      { name: '18-24', value: 35 },
      { name: '25-34', value: 25 },
      { name: '35-44', value: 15 },
      { name: '45+', value: 10 }
    ],
    cityData: [
      { name: 'New York', tickets: 3850, showtime: 42 },
      { name: 'Los Angeles', tickets: 3105, showtime: 36 },
      { name: 'Chicago', tickets: 2345, showtime: 28 },
      { name: 'San Francisco', tickets: 1984, showtime: 24 },
      { name: 'Boston', tickets: 1705, showtime: 18 },
      { name: 'Other', tickets: 2295, showtime: 38 }
    ]
  };
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md border border-border/40 rounded-md">
        <p className="text-sm font-medium">{`${label}`}</p>
        <p className="text-xs text-primary">
          <span className="font-medium">{`Tickets: ${payload[0].value.toLocaleString()}`}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          <span>{`Showtimes: ${payload[1].value}`}</span>
        </p>
      </div>
    );
  }
  return null;
};

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      if (id) {
        const data = getMovieDetails(id);
        setMovie(data);
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-pulse-subtle text-primary font-medium">Loading movie data...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!movie) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-xl font-semibold mb-2">Movie not found</h2>
          <p className="text-muted-foreground mb-4">The requested movie could not be found.</p>
          <Button onClick={handleBack}>Go Back</Button>
        </div>
      </DashboardLayout>
    );
  }

  const formatDuration = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4" onClick={handleBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </Button>
        
        {/* Movie Banner */}
        <div className="rounded-xl overflow-hidden relative mb-6 animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <img 
            src={movie.backdropUrl} 
            alt={movie.title} 
            className="w-full h-[200px] md:h-[250px] object-cover"
          />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{movie.title}</h1>
            <p className="text-sm md:text-base opacity-90 mb-2">{movie.tagline}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{formatDuration(movie.duration)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Film size={16} />
                <span>{movie.genre}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Movie Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="dashboard-card p-4 animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
                <Ticket size={20} className="text-primary" />
              </div>
              <div>
                <p className="card-title">Total Tickets</p>
                <h3 className="text-2xl font-semibold">{movie.totalTickets.toLocaleString()}</h3>
              </div>
            </div>
          </div>
          
          <div className="dashboard-card p-4 animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
                <TrendingUp size={20} className="text-primary" />
              </div>
              <div>
                <p className="card-title">Market Share</p>
                <h3 className="text-2xl font-semibold">{movie.marketShare}%</h3>
              </div>
            </div>
          </div>
          
          <div className="dashboard-card p-4 animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
                <BarChart3 size={20} className="text-primary" />
              </div>
              <div>
                <p className="card-title">Total Showtimes</p>
                <h3 className="text-2xl font-semibold">{movie.totalShowtimes}</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for different views */}
        <Tabs defaultValue="overview" className="animate-fade-in">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="dashboard-card p-4">
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground">{movie.description}</p>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium">Director</h4>
                      <p className="text-muted-foreground">{movie.director}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Cast</h4>
                      <p className="text-muted-foreground">{movie.cast.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="dashboard-card h-full">
                  <img 
                    src={movie.posterUrl} 
                    alt={movie.title} 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
            
            <div className="dashboard-card p-4">
              <h3 className="font-semibold mb-4">Daily Performance</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={movie.admissions.daily}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="tickets"
                      stroke="#4361EE"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Tickets Sold"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="showtime"
                      stroke="#7209B7"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Showtimes"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <div className="dashboard-card p-4">
              <h3 className="font-semibold mb-4">Performance by City</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={movie.cityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      yAxisId="left"
                      dataKey="tickets" 
                      name="Tickets Sold" 
                      fill="#4361EE" 
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="showtime" 
                      name="Showtimes" 
                      fill="#7209B7" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="demographics" className="space-y-6">
            <div className="dashboard-card p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-primary/10 flex items-center justify-center rounded-full">
                  <Users size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold">Audience Demographics</h3>
              </div>
              
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={movie.demographics}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 'dataMax']} tickFormatter={(value) => `${value}%`} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Bar 
                      dataKey="value" 
                      fill="#4361EE" 
                      radius={[0, 4, 4, 0]}
                      name="Age Group"
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Audience Insights</h4>
                <p className="text-sm text-muted-foreground">
                  This movie has a strong appeal among younger audiences, particularly in the 18-24 age range, 
                  which constitutes 35% of total viewership. The sci-fi genre and innovative visual effects have 
                  resonated well with tech-savvy younger demographics, while still maintaining decent appeal across 
                  other age groups.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MovieDetails;
