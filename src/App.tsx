
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import Dashboard from "./pages/Dashboard";
import MovieDetails from "./pages/MovieDetails";
import CinemaMetrics from "./pages/CinemaMetrics";
import NotFound from "./pages/NotFound";
import Discussions from "./pages/Discussions";
import Trending from "./pages/Trending";

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/cinema-metrics" element={<CinemaMetrics />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
