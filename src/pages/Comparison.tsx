
import { useState } from 'react';
import { BarChart2, Calendar, Clock, DollarSign, Users } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type ComparisonMetric = 'admission' | 'grossIncome' | 'showtimes' | 'demographics';

const mockMovies = [
  { id: 1, title: 'Interstellar' },
  { id: 2, title: 'The Matrix' },
  { id: 3, title: 'Inception' },
  { id: 4, title: 'Pulp Fiction' },
  { id: 5, title: 'The Shawshank Redemption' },
  { id: 6, title: 'The Dark Knight' },
];

// Mock data for each metric
const mockData = {
  admission: [
    { name: 'Interstellar', value: 85000 },
    { name: 'The Matrix', value: 67000 },
    { name: 'Inception', value: 92000 },
    { name: 'Pulp Fiction', value: 45000 },
    { name: 'The Shawshank Redemption', value: 52000 },
    { name: 'The Dark Knight', value: 98000 },
  ],
  grossIncome: [
    { name: 'Interstellar', value: 1250000 },
    { name: 'The Matrix', value: 980000 },
    { name: 'Inception', value: 1430000 },
    { name: 'Pulp Fiction', value: 670000 },
    { name: 'The Shawshank Redemption', value: 780000 },
    { name: 'The Dark Knight', value: 1580000 },
  ],
  showtimes: [
    { name: 'Interstellar', value: 245 },
    { name: 'The Matrix', value: 198 },
    { name: 'Inception', value: 267 },
    { name: 'Pulp Fiction', value: 154 },
    { name: 'The Shawshank Redemption', value: 132 },
    { name: 'The Dark Knight', value: 289 },
  ],
  demographics: [
    { name: '18-24', Interstellar: 32, 'The Matrix': 28, Inception: 35, 'Pulp Fiction': 22, 'The Shawshank Redemption': 18, 'The Dark Knight': 38 },
    { name: '25-34', Interstellar: 45, 'The Matrix': 42, Inception: 40, 'Pulp Fiction': 35, 'The Shawshank Redemption': 30, 'The Dark Knight': 43 },
    { name: '35-44', Interstellar: 30, 'The Matrix': 32, Inception: 35, 'Pulp Fiction': 30, 'The Shawshank Redemption': 28, 'The Dark Knight': 31 },
    { name: '45-54', Interstellar: 20, 'The Matrix': 15, Inception: 18, 'Pulp Fiction': 25, 'The Shawshank Redemption': 32, 'The Dark Knight': 17 },
    { name: '55+', Interstellar: 12, 'The Matrix': 8, Inception: 10, 'Pulp Fiction': 18, 'The Shawshank Redemption': 22, 'The Dark Knight': 9 },
  ],
};

// Utility function to format currency values
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
};

// Function to fetch movie comparison data
const fetchMovieComparisonData = async (metric: ComparisonMetric, selectedMovies: number[]) => {
  // Simulate API call with mock data
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (metric === 'demographics') {
    return mockData.demographics;
  }
  
  // Filter data for selected movies only
  return mockData[metric].filter(item => 
    selectedMovies.some(movieId => 
      mockMovies.find(m => m.id === movieId)?.title === item.name
    )
  );
};

const ComparisonPage = () => {
  const [activeMetric, setActiveMetric] = useState<ComparisonMetric>('admission');
  const [selectedMovies, setSelectedMovies] = useState<number[]>([1, 2, 3]); // Default selected movies
  
  // Query to fetch comparison data
  const { data, isLoading } = useQuery({
    queryKey: ['movieComparison', activeMetric, selectedMovies],
    queryFn: () => fetchMovieComparisonData(activeMetric, selectedMovies),
  });

  // Get available movie options (excluding already selected ones)
  const availableMovies = mockMovies.filter(movie => !selectedMovies.includes(movie.id));

  // Handle movie selection change
  const handleAddMovie = (movieId: number) => {
    if (selectedMovies.length < 6) { // Limit to 6 movies for comparison
      setSelectedMovies([...selectedMovies, movieId]);
    }
  };

  // Handle movie removal
  const handleRemoveMovie = (movieId: number) => {
    setSelectedMovies(selectedMovies.filter(id => id !== movieId));
  };

  // Get labels and icons for metrics
  const getMetricInfo = (metric: ComparisonMetric) => {
    switch(metric) {
      case 'admission':
        return { label: 'Admission', icon: Calendar, format: (value: number) => value.toLocaleString() };
      case 'grossIncome':
        return { label: 'Gross Income', icon: DollarSign, format: formatCurrency };
      case 'showtimes':
        return { label: 'Showtimes', icon: Clock, format: (value: number) => value.toLocaleString() };
      case 'demographics':
        return { label: 'Demographics', icon: Users, format: (value: number) => `${value}%` };
    }
  };

  const metricInfo = getMetricInfo(activeMetric);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Film Comparison</h2>
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">Compare film metrics</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Comparison Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="admission" 
                value={activeMetric}
                onValueChange={(value) => setActiveMetric(value as ComparisonMetric)}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 mb-2">
                  <TabsTrigger value="admission" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Admission</span>
                  </TabsTrigger>
                  <TabsTrigger value="grossIncome" className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>Gross Income</span>
                  </TabsTrigger>
                </TabsList>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="showtimes" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Showtimes</span>
                  </TabsTrigger>
                  <TabsTrigger value="demographics" className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Demographics</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Selected Films</CardTitle>
              <CardDescription>Choose up to 6 films to compare</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {selectedMovies.map((movieId) => {
                    const movie = mockMovies.find(m => m.id === movieId);
                    return (
                      <div key={movieId} className="flex items-center bg-muted rounded-md px-3 py-1">
                        <span>{movie?.title}</span>
                        <button 
                          className="ml-2 text-muted-foreground hover:text-foreground"
                          onClick={() => handleRemoveMovie(movieId)}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
                
                {availableMovies.length > 0 && selectedMovies.length < 6 && (
                  <Select onValueChange={(value) => handleAddMovie(Number(value))}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Add film" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMovies.map((movie) => (
                        <SelectItem key={movie.id} value={movie.id.toString()}>
                          {movie.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <metricInfo.icon className="h-5 w-5" />
              <span>{metricInfo.label} Comparison</span>
            </CardTitle>
            <CardDescription>
              {activeMetric === 'admission' && "Compare total admissions across selected films"}
              {activeMetric === 'grossIncome' && "Compare total revenue generated across selected films"}
              {activeMetric === 'showtimes' && "Compare number of screenings across selected films"}
              {activeMetric === 'demographics' && "Compare audience demographics across selected films"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <p>Loading comparison data...</p>
              </div>
            ) : data && data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                {activeMetric === 'demographics' ? (
                  <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                    <Legend />
                    {selectedMovies.map((movieId) => {
                      const movie = mockMovies.find(m => m.id === movieId);
                      if (!movie) return null;
                      
                      // Generate a distinct color based on the movie ID
                      const hue = (movieId * 60) % 360;
                      const color = `hsl(${hue}, 70%, 50%)`;
                      
                      return (
                        <Bar 
                          key={movie.id} 
                          dataKey={movie.title}
                          fill={color}
                        />
                      );
                    })}
                  </BarChart>
                ) : (
                  <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => {
                      if (activeMetric === 'grossIncome') {
                        return formatCurrency(value);
                      }
                      return value.toLocaleString();
                    }} />
                    <Tooltip 
                      formatter={(value) => {
                        if (activeMetric === 'grossIncome') {
                          return [formatCurrency(value as number), 'Value'];
                        }
                        return [(value as number).toLocaleString(), 'Value'];
                      }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p>No data available. Please select at least one film to compare.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ComparisonPage;
