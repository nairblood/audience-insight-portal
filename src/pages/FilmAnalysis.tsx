
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart2, 
  BarChart, 
  Calendar, 
  DollarSign, 
  Film, 
  Users, 
  Ticket, 
  Clock 
} from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type ComparisonType = 
  | "admission" 
  | "gross" 
  | "showtimes" 
  | "demographic" 
  | "openingDay" 
  | "openingWeek" 
  | "ticketSales";

type TimeFrame = "daily" | "weekly" | "monthly" | "yearly";

const FilmAnalysis = () => {
  const [selectedComparison, setSelectedComparison] = useState<ComparisonType>("admission");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");

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
  ];

  const getComparisonTitle = () => {
    const comparison = comparisonOptions.find(c => c.id === selectedComparison);
    return comparison ? `${comparison.name} Comparison (${timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)})` : "Film Comparison";
  };

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Film Analysis</h1>
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
                  <div className="text-sm font-medium">Select Metric</div>
                  <NavigationMenu orientation="vertical" className="max-w-full w-full">
                    <NavigationMenuList className="flex flex-col space-y-1 w-full">
                      {comparisonOptions.map((option) => (
                        <NavigationMenuItem key={option.id} className="w-full">
                          <Button
                            variant={selectedComparison === option.id ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setSelectedComparison(option.id)}
                          >
                            <option.icon className="mr-2 h-4 w-4" />
                            {option.name}
                          </Button>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
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
              {comparisonOptions.find(c => c.id === selectedComparison)?.icon && (
                <comparisonOptions.find(c => c.id === selectedComparison)!.icon className="h-4 w-4 text-muted-foreground" />
              )}
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
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FilmAnalysis;
