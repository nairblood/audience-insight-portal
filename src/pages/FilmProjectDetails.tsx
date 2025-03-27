
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Film, TrendingUp, TrendingDown, MapPin } from "lucide-react";

// Mock data for film performance
const filmPerformanceData = {
  daily: [
    { date: '2023-10-01', admissions: 12500 },
    { date: '2023-10-02', admissions: 10800 },
    { date: '2023-10-03', admissions: 9500 },
    { date: '2023-10-04', admissions: 11200 },
    { date: '2023-10-05', admissions: 13500 },
    { date: '2023-10-06', admissions: 18900 },
    { date: '2023-10-07', admissions: 21500 },
  ],
  weekly: [
    { week: 'Week 1 (Oct 1-7)', admissions: 98400 },
    { week: 'Week 2 (Oct 8-14)', admissions: 87500 },
    { week: 'Week 3 (Oct 15-21)', admissions: 76200 },
    { week: 'Week 4 (Oct 22-28)', admissions: 65100 },
  ],
  total: { admissions: 327200, screenings: 4500, avgPerScreening: 72.7 }
};

// Mock data for city performance
const cityPerformanceData = {
  bestSelling: [
    { city: 'Jakarta', admissions: 78500, percentage: '24%' },
    { city: 'Bandung', admissions: 45200, percentage: '13.8%' },
    { city: 'Surabaya', admissions: 38900, percentage: '11.9%' },
    { city: 'Yogyakarta', admissions: 32500, percentage: '9.9%' },
    { city: 'Medan', admissions: 28700, percentage: '8.8%' },
  ],
  leastPopular: [
    { city: 'Ambon', admissions: 1250, percentage: '0.4%' },
    { city: 'Palu', admissions: 1580, percentage: '0.5%' },
    { city: 'Kupang', admissions: 1890, percentage: '0.6%' },
    { city: 'Jayapura', admissions: 2150, percentage: '0.7%' },
    { city: 'Sorong', admissions: 2480, percentage: '0.8%' },
  ]
};

// Chart data for city visualization
const cityChartData = [
  { name: 'Jakarta', value: 78500 },
  { name: 'Bandung', value: 45200 },
  { name: 'Surabaya', value: 38900 },
  { name: 'Yogyakarta', value: 32500 },
  { name: 'Medan', value: 28700 },
  { name: 'Other Cities', value: 103400 },
];

const FilmProjectDetails = () => {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState("performance");
  
  // This would typically come from an API fetch based on projectId
  const projectName = "KKN di Desa Penari Analysis";
  
  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex items-center">
          <Film className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">{projectName}</h1>
        </div>
        
        <Tabs defaultValue="performance" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="performance">Film Performance</TabsTrigger>
            <TabsTrigger value="cities">City Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Admissions Overview</CardTitle>
                <CardDescription>Daily, weekly, and total admission statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="daily">
                  <TabsList>
                    <TabsTrigger value="daily">Daily Admission</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly Admission</TabsTrigger>
                    <TabsTrigger value="total">Total Admission</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="daily" className="space-y-4 mt-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={filmPerformanceData.daily}
                          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" angle={-45} textAnchor="end" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="admissions" fill="#3b82f6" name="Admissions" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Admissions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filmPerformanceData.daily.map((day) => (
                          <TableRow key={day.date}>
                            <TableCell>{day.date}</TableCell>
                            <TableCell className="text-right">{day.admissions.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="weekly" className="space-y-4 mt-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={filmPerformanceData.weekly}
                          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" angle={-45} textAnchor="end" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="admissions" fill="#3b82f6" name="Admissions" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Week Period</TableHead>
                          <TableHead className="text-right">Admissions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filmPerformanceData.weekly.map((week) => (
                          <TableRow key={week.week}>
                            <TableCell>{week.week}</TableCell>
                            <TableCell className="text-right">{week.admissions.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="total" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Total Admissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">{filmPerformanceData.total.admissions.toLocaleString()}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Total Screenings</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">{filmPerformanceData.total.screenings.toLocaleString()}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Per Screening</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">{filmPerformanceData.total.avgPerScreening}</div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cities" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                    <CardTitle>Best-Selling Cities</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>City</TableHead>
                        <TableHead className="text-right">Admissions</TableHead>
                        <TableHead className="text-right">% of Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cityPerformanceData.bestSelling.map((city) => (
                        <TableRow key={city.city}>
                          <TableCell className="font-medium">{city.city}</TableCell>
                          <TableCell className="text-right">{city.admissions.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{city.percentage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center">
                    <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                    <CardTitle>Least Popular Cities</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>City</TableHead>
                        <TableHead className="text-right">Admissions</TableHead>
                        <TableHead className="text-right">% of Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cityPerformanceData.leastPopular.map((city) => (
                        <TableRow key={city.city}>
                          <TableCell className="font-medium">{city.city}</TableCell>
                          <TableCell className="text-right">{city.admissions.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{city.percentage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <CardTitle>City Distribution</CardTitle>
                </div>
                <CardDescription>
                  Admissions distribution across major cities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={cityChartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" name="Admissions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FilmProjectDetails;
