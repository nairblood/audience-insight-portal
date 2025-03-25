
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart2, 
  Calendar, 
  DollarSign, 
  Film, 
  Users, 
  Ticket, 
  Clock,
  LineChart,
  PieChart,
  BarChart,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ComparisonType = 
  | "admission" 
  | "gross" 
  | "showtimes" 
  | "demographic" 
  | "openingDay" 
  | "openingWeek" 
  | "ticketSales"
  | "realtime";

type TimeFrame = "daily" | "weekly" | "monthly" | "yearly";

type FilmOption = {
  id: string;
  title: string;
};

type ComparisonMenuType = "filmComparison" | "timeComparison" | "demographicComparison";

const FilmAnalysis = () => {
  const [selectedComparison, setSelectedComparison] = useState<ComparisonType>("admission");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");
  const [selectedFilms, setSelectedFilms] = useState<string[]>(["film1", "film2"]);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [comparisonMenuType, setComparisonMenuType] = useState<ComparisonMenuType>("filmComparison");

  // Sample film options
  const filmOptions: FilmOption[] = [
    { id: "film1", title: "Interstellar" },
    { id: "film2", title: "Inception" },
    { id: "film3", title: "The Dark Knight" },
    { id: "film4", title: "Dune" },
    { id: "film5", title: "Oppenheimer" },
  ];

  const comparisonOptions = [
    { 
      id: "admission" as ComparisonType, 
      name: "Admission", 
      icon: Users, 
      description: "Compare film admissions across different time periods"
    },
    { 
      id: "gross" as ComparisonType, 
      name: "Gross Income", 
      icon: DollarSign, 
      description: "Compare box office earnings across films"
    },
    { 
      id: "showtimes" as ComparisonType, 
      name: "Showtimes", 
      icon: Clock, 
      description: "Compare number of showtimes across different films"
    },
    { 
      id: "demographic" as ComparisonType, 
      name: "Demographics", 
      icon: Users, 
      description: "Compare audience demographics between films"
    },
    { 
      id: "openingDay" as ComparisonType, 
      name: "Opening Day (OD)", 
      icon: Calendar, 
      description: "Compare first-day performance between films"
    },
    { 
      id: "openingWeek" as ComparisonType, 
      name: "Opening Week (OW)", 
      icon: Calendar, 
      description: "Compare first-week performance between films"
    },
    { 
      id: "ticketSales" as ComparisonType, 
      name: "Ticket Sales", 
      icon: Ticket, 
      description: "Compare ticket sales data from various platforms"
    },
    { 
      id: "realtime" as ComparisonType, 
      name: "Real-time Figures", 
      icon: LineChart, 
      description: "View real-time figures and interactive data"
    },
  ];

  const comparisonMenuOptions = [
    {
      id: "filmComparison" as ComparisonMenuType,
      name: "Film Comparison",
      description: "Compare metrics between different films"
    },
    {
      id: "timeComparison" as ComparisonMenuType,
      name: "Time-based Comparison",
      description: "Compare film performance across different time periods"
    },
    {
      id: "demographicComparison" as ComparisonMenuType,
      name: "Demographic Comparison",
      description: "Compare audience demographics for selected films"
    }
  ];

  const getComparisonTitle = () => {
    const comparison = comparisonOptions.find(c => c.id === selectedComparison);
    return comparison ? `${comparison.name} Comparison (${timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)})` : "Film Comparison";
  };

  // Find the selected comparison option to get its icon
  const selectedOption = comparisonOptions.find(c => c.id === selectedComparison);
  const SelectedIcon = selectedOption ? selectedOption.icon : null;

  const toggleFilmSelection = (filmId: string) => {
    if (selectedFilms.includes(filmId)) {
      setSelectedFilms(selectedFilms.filter(id => id !== filmId));
    } else {
      setSelectedFilms([...selectedFilms, filmId]);
    }
  };

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Film Analysis</h1>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Film className="mr-2 h-4 w-4" />
                  Select Films ({selectedFilms.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {filmOptions.map((film) => (
                  <DropdownMenuItem
                    key={film.id}
                    className={cn(
                      "cursor-pointer",
                      selectedFilms.includes(film.id) && "bg-accent"
                    )}
                    onClick={() => toggleFilmSelection(film.id)}
                  >
                    {film.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex gap-1">
              <Button 
                variant={chartType === "bar" ? "default" : "outline"} 
                size="icon" 
                onClick={() => setChartType("bar")}
              >
                <BarChart className="h-4 w-4" />
              </Button>
              <Button 
                variant={chartType === "line" ? "default" : "outline"} 
                size="icon" 
                onClick={() => setChartType("line")}
              >
                <LineChart className="h-4 w-4" />
              </Button>
              <Button 
                variant={chartType === "pie" ? "default" : "outline"} 
                size="icon" 
                onClick={() => setChartType("pie")}
              >
                <PieChart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Comparison Options
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Comparison Type</div>
                  <div className="flex flex-col space-y-1 w-full">
                    {comparisonMenuOptions.map((option) => (
                      <Button
                        key={option.id}
                        variant={comparisonMenuType === option.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setComparisonMenuType(option.id)}
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        {option.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Select Metric</div>
                  <div className="flex flex-col space-y-1 w-full">
                    {comparisonOptions.map((option) => (
                      <Button
                        key={option.id}
                        variant={selectedComparison === option.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedComparison(option.id)}
                      >
                        <option.icon className="mr-2 h-4 w-4" />
                        {option.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Time Frame</div>
                  <Tabs value={timeFrame} onValueChange={(v) => setTimeFrame(v as TimeFrame)}>
                    <TabsList className="grid grid-cols-2 gap-1 mb-2">
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    </TabsList>
                    <TabsList className="grid grid-cols-2 gap-1">
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {getComparisonTitle()}
              </CardTitle>
              {SelectedIcon && <SelectedIcon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  {selectedComparison === "admission" && "Admission comparison data will appear here"}
                  {selectedComparison === "gross" && "Gross income comparison data will appear here"}
                  {selectedComparison === "showtimes" && "Showtimes comparison data will appear here"}
                  {selectedComparison === "demographic" && "Demographic comparison data will appear here"}
                  {selectedComparison === "openingDay" && "Opening day comparison data will appear here"}
                  {selectedComparison === "openingWeek" && "Opening week comparison data will appear here"}
                  {selectedComparison === "ticketSales" && "Ticket sales comparison data will appear here"}
                  {selectedComparison === "realtime" && "Real-time figures and interactive tables will appear here"}
                </p>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Comparing {selectedFilms.length} films: {selectedFilms.map(id => 
                    filmOptions.find(f => f.id === id)?.title).join(", ")}
                  </p>
                  <p className="mt-2">Chart type: {chartType === "bar" ? "Bar Chart" : chartType === "line" ? "Line Chart" : "Pie Chart"}</p>
                  <p className="mt-2">Comparison mode: {comparisonMenuOptions.find(o => o.id === comparisonMenuType)?.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FilmAnalysis;
