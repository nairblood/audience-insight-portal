
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ShowtimeMetricsCard from '@/components/ShowtimeMetricsCard';
import TicketSalesCard from '@/components/TicketSalesCard';
import CinemaHeatmapCard from '@/components/CinemaHeatmapCard';
import MovieCard from '@/components/MovieCard';
import MovieMetricsCard from '@/components/MovieMetricsCard';
import TopMoviesTable from '@/components/TopMoviesTable';

// Mock data for movies
const topMovies = [
  {
    id: 'm1',
    title: 'Interstellar 2',
    posterUrl: 'https://placehold.co/300x450/4361ee/FFFFFF?text=Interstellar+2',
    genre: 'Sci-Fi',
    duration: 165,
    year: 2023,
    rating: 9.2,
    showTimes: 186,
    marketShare: 28.4
  },
  {
    id: 'm2',
    title: 'Quantum Valley',
    posterUrl: 'https://placehold.co/300x450/3a0ca3/FFFFFF?text=Quantum+Valley',
    genre: 'Thriller',
    duration: 142,
    year: 2023,
    rating: 8.7,
    showTimes: 142,
    marketShare: 19.7
  },
  {
    id: 'm3',
    title: 'Blue Symphony',
    posterUrl: 'https://placehold.co/300x450/4895ef/FFFFFF?text=Blue+Symphony',
    genre: 'Drama',
    duration: 128,
    year: 2023,
    rating: 8.3,
    showTimes: 98,
    marketShare: 15.2
  },
  {
    id: 'm4',
    title: 'Eternal Dawn',
    posterUrl: 'https://placehold.co/300x450/560bad/FFFFFF?text=Eternal+Dawn',
    genre: 'Fantasy',
    duration: 156,
    year: 2023,
    rating: 7.9,
    showTimes: 85,
    marketShare: 12.1
  }
];

// Mock data for top movies table
const topMoviesTableData = [
  { id: 'm1', rank: 1, previousRank: 1, title: 'Interstellar 2', genre: 'Sci-Fi', year: 2023, rating: 9.2, ticketsSold: 15284, marketShare: 28.4 },
  { id: 'm2', rank: 2, previousRank: 3, title: 'Quantum Valley', genre: 'Thriller', year: 2023, rating: 8.7, ticketsSold: 10572, marketShare: 19.7 },
  { id: 'm3', rank: 3, previousRank: 2, title: 'Blue Symphony', genre: 'Drama', year: 2023, rating: 8.3, ticketsSold: 8196, marketShare: 15.2 },
  { id: 'm4', rank: 4, previousRank: 4, title: 'Eternal Dawn', genre: 'Fantasy', year: 2023, rating: 7.9, ticketsSold: 6521, marketShare: 12.1 },
  { id: 'm5', rank: 5, previousRank: 6, title: 'Neon Knights', genre: 'Action', year: 2023, rating: 7.6, ticketsSold: 5145, marketShare: 9.6 },
  { id: 'm6', rank: 6, previousRank: 5, title: 'Silent Echo', genre: 'Mystery', year: 2023, rating: 7.4, ticketsSold: 4023, marketShare: 7.5 },
  { id: 'm7', rank: 7, previousRank: 8, title: 'Crystal Memories', genre: 'Romance', year: 2022, rating: 7.2, ticketsSold: 2178, marketShare: 4.1 },
  { id: 'm8', rank: 8, previousRank: 7, title: 'Desert Bloom', genre: 'Adventure', year: 2022, rating: 6.9, ticketsSold: 1845, marketShare: 3.4 }
];

// Data for pie charts
const genreData = [
  { name: 'Action', value: 32, color: '#4361EE' },
  { name: 'Drama', value: 21, color: '#3A0CA3' },
  { name: 'Comedy', value: 18, color: '#7209B7' },
  { name: 'Sci-Fi', value: 15, color: '#4895EF' },
  { name: 'Other', value: 14, color: '#B5B5B5' }
];

const yearData = [
  { name: '2023', value: 65, color: '#4361EE' },
  { name: '2022', value: 25, color: '#7209B7' },
  { name: 'Earlier', value: 10, color: '#B5B5B5' }
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-pulse-subtle text-primary font-medium">Loading dashboard data...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {topMovies.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterUrl={movie.posterUrl}
            genre={movie.genre}
            duration={movie.duration}
            year={movie.year}
            rating={movie.rating}
            showTimes={movie.showTimes}
            marketShare={movie.marketShare}
            className="animate-scale-in"
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ShowtimeMetricsCard className="lg:col-span-2 animate-fade-in" />
        <TicketSalesCard className="animate-fade-in" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MovieMetricsCard 
          title="Movies by Genre" 
          data={genreData} 
          className="animate-fade-in"
        />
        <MovieMetricsCard 
          title="Movies by Release Year" 
          data={yearData}
          className="animate-fade-in"
        />
        <div className="animate-fade-in flex flex-col justify-between">
          <div className="dashboard-card mb-3 p-4 h-1/2">
            <div className="flex flex-col h-full justify-center items-center">
              <span className="text-4xl font-bold text-primary mb-2">53</span>
              <span className="card-title">Cinemas</span>
            </div>
          </div>
          <div className="dashboard-card p-4 h-1/2">
            <div className="flex flex-col h-full justify-center items-center">
              <span className="text-4xl font-bold text-primary mb-2">682</span>
              <span className="card-title">Total Showtimes Today</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <CinemaHeatmapCard className="animate-fade-in" />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <TopMoviesTable data={topMoviesTableData} className="animate-fade-in" />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
