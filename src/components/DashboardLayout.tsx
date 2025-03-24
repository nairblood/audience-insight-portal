
import { ReactNode, useState } from 'react';
import { 
  CalendarDays, 
  Film, 
  LayoutDashboard, 
  MapPin, 
  Menu, 
  Search, 
  Ticket, 
  Users, 
  X 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const sidebarLinks = [
    { icon: LayoutDashboard, name: 'Dashboard', path: '/' },
    { icon: Film, name: 'Movies', path: '/movies' },
    { icon: Ticket, name: 'Showtime', path: '/showtimes' },
    { icon: MapPin, name: 'Cinemas', path: '/cinema-metrics' },
    { icon: CalendarDays, name: 'Calendar', path: '/calendar' },
    { icon: Users, name: 'Audience', path: '/audience' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-white border-r border-border/40 ${
          isSidebarOpen ? 'w-64' : 'w-0 -translate-x-full sm:translate-x-0 sm:w-16'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            {isSidebarOpen && (
              <Link to="/" className="flex items-center gap-2">
                <Film className="text-primary h-6 w-6" />
                <span className="font-semibold text-lg">Cinetrace</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full p-1"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          <div className="mt-6 flex flex-col flex-1 px-2">
            <nav className="space-y-1">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-muted'
                  } ${!isSidebarOpen && 'justify-center'}`}
                >
                  <link.icon size={20} className={!isSidebarOpen ? 'mx-auto' : 'mr-3'} />
                  {isSidebarOpen && <span>{link.name}</span>}
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-border/40">
            {isSidebarOpen ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://ui-avatars.com/api/?name=Admin+User" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@cinetrace.com</p>
                </div>
              </div>
            ) : (
              <Avatar className="h-9 w-9 mx-auto">
                <AvatarImage src="https://ui-avatars.com/api/?name=Admin+User" />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'pl-64' : 'pl-0 sm:pl-16'
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 bg-white/90 backdrop-blur-sm px-6">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={20} />
          </Button>

          <div className="w-full flex items-center justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search movies, theaters, cities..."
                className="w-full pl-10 bg-muted/50 border-0 focus-visible:ring-1"
              />
            </div>

            <div className="flex items-center gap-4">
              <Select defaultValue="daily">
                <SelectTrigger className="w-[120px] bg-muted/50 border-0">
                  <SelectValue placeholder="View Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
