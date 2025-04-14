
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Film, TrendingUp, TrendingDown, MapPin, ChartBar, Copy } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

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

// New mock data for comparison with similar films
const comparisonData = {
  openingDay: [
    { name: 'Current Film', value: 37500 },
    { name: 'Pengabdi Setan 2', value: 42000 },
    { name: 'The Doll 3', value: 31200 },
    { name: 'Perempuan Tanah Jahanam', value: 29800 },
  ],
  openingWeekend: [
    { name: 'Current Film', value: 98400 },
    { name: 'Pengabdi Setan 2', value: 112500 },
    { name: 'The Doll 3', value: 85700 },
    { name: 'Perempuan Tanah Jahanam', value: 78900 },
  ],
  viewingHours: [
    { day: 'Day 1', current: 6.2, pengabdiSetan: 7.1, theDoll: 5.8, perempuan: 5.5 },
    { day: 'Day 3', current: 5.8, pengabdiSetan: 6.5, theDoll: 5.2, perempuan: 5.0 },
    { day: 'Day 7', current: 5.1, pengabdiSetan: 5.7, theDoll: 4.8, perempuan: 4.4 },
    { day: 'Day 10', current: 4.3, pengabdiSetan: 4.9, theDoll: 3.9, perempuan: 3.6 },
    { day: 'Day 13', current: 3.8, pengabdiSetan: 4.2, theDoll: 3.3, perempuan: 3.0 },
  ],
  conclusions: [
    "Current film is performing 12% below 'Pengabdi Setan 2' but 15% above 'Perempuan Tanah Jahanam'",
    "Opening weekend was stronger than expected for a film in this genre",
    "Viewer retention is higher than average, with strong day 13 numbers",
    "Expected to achieve 400,000+ total admissions based on current trajectory"
  ]
};

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
          <TabsList className="grid grid-cols-3 w-[600px]">
            <TabsTrigger value="performance">Film Performance</TabsTrigger>
            <TabsTrigger value="cities">City Analysis</TabsTrigger>
            <TabsTrigger value="comparison">Genre Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4 mt-6">
            {/* Total Admission Card - Separated from the other tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Total Admission</CardTitle>
                <CardDescription>
                  Overall performance metrics for the film
                </CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
            
            {/* Admissions Overview Card with Daily and Weekly tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Admissions Overview</CardTitle>
                <CardDescription>Daily and weekly admission statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="daily">
                  <TabsList>
                    <TabsTrigger value="daily">Daily Admission</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly Admission</TabsTrigger>
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
          
          <TabsContent value="comparison" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <ChartBar className="h-5 w-5 text-primary mr-2" />
                  <CardTitle>Comparison with Similar Genre Films</CardTitle>
                </div>
                <CardDescription>
                  Opening day, opening weekend performance and viewing hours compared to similar films
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Opening Day Comparison */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Opening Day (OD) Performance</CardTitle>
                      <CardDescription>Admissions comparison on day one</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={comparisonData.openingDay}
                            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" name="Admissions" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Opening Weekend Comparison */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Opening Weekend (OW) Performance</CardTitle>
                      <CardDescription>Weekend admissions comparison</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={comparisonData.openingWeekend}
                            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" name="Admissions" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Viewing Hours Over Time */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Viewing Hours Trends</CardTitle>
                    <CardDescription>Average viewing hours per viewer by day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={comparisonData.viewingHours}
                          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <ChartTooltip />
                          <Line 
                            type="monotone" 
                            dataKey="current" 
                            name="Current Film" 
                            stroke="#3b82f6" 
                            strokeWidth={2} 
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="pengabdiSetan" 
                            name="Pengabdi Setan 2" 
                            stroke="#ef4444" 
                            strokeWidth={2} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="theDoll" 
                            name="The Doll 3" 
                            stroke="#10b981" 
                            strokeWidth={2} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="perempuan" 
                            name="Perempuan Tanah Jahanam" 
                            stroke="#f59e0b" 
                            strokeWidth={2} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Analysis Conclusions */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <Copy className="h-5 w-5 text-primary mr-2" />
                      <CardTitle className="text-lg font-medium">Analysis Conclusions</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      {comparisonData.conclusions.map((conclusion, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {conclusion}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FilmProjectDetails;
