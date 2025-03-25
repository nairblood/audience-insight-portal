
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MovieDetails from "./pages/MovieDetails";
import CinemaMetrics from "./pages/CinemaMetrics";
import NotFound from "./pages/NotFound";
import Discussions from "./pages/Discussions";
import Trending from "./pages/Trending";
import FilmAnalysis from "./pages/FilmAnalysis";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/cinema-metrics" element={<CinemaMetrics />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/film-analysis" element={<FilmAnalysis />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
