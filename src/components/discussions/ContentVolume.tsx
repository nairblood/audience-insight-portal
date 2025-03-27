
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Users } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

// Mock data for volume metrics over time
const VOLUME_DATA = [
  { date: 'Jan 1', accounts: 120, engagements: 4500, impressions: 12000, reaches: 8500 },
  { date: 'Jan 8', accounts: 135, engagements: 5200, impressions: 14500, reaches: 10200 },
  { date: 'Jan 15', accounts: 128, engagements: 4800, impressions: 13200, reaches: 9600 },
  { date: 'Jan 22', accounts: 145, engagements: 6100, impressions: 16800, reaches: 12400 },
  { date: 'Jan 29', accounts: 168, engagements: 7500, impressions: 20500, reaches: 15800 },
  { date: 'Feb 5', accounts: 152, engagements: 6800, impressions: 18500, reaches: 14200 },
  { date: 'Feb 12', accounts: 175, engagements: 8200, impressions: 22500, reaches: 17500 },
];

// Total metrics
const TOTAL_METRICS = {
  accounts: 1023,
  engagements: 43100,
  impressions: 118000,
  reaches: 88200
};

const lineChartColors = {
  accounts: { color: "#8884d8" },
  engagements: { color: "#82ca9d" },
  impressions: { color: "#ffc658" },
  reaches: { color: "#ff7300" },
};

const ContentVolume = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <CardTitle className="text-base font-medium">Total Accounts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{TOTAL_METRICS.accounts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">accounts posted about MD Entertainment films</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <CardTitle className="text-base font-medium">Total Engagements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{TOTAL_METRICS.engagements.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">likes, comments, shares, retweets</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <CardTitle className="text-base font-medium">Total Impressions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{TOTAL_METRICS.impressions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">times content was displayed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <CardTitle className="text-base font-medium">Total Reaches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{TOTAL_METRICS.reaches.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">unique users who saw the content</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Engagement Metrics Over Time</CardTitle>
          <CardDescription>
            Timeline of account activity and engagement metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineChartColors} className="h-[300px]">
            <LineChart 
              data={VOLUME_DATA}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="accounts" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
                name="Active Accounts"
              />
              <Line 
                type="monotone" 
                dataKey="engagements" 
                stroke="#82ca9d" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reach & Impression Metrics</CardTitle>
          <CardDescription>
            Timeline of content reach and impression metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineChartColors} className="h-[300px]">
            <LineChart 
              data={VOLUME_DATA}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="impressions" 
                stroke="#ffc658" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="reaches" 
                stroke="#ff7300" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Content Volume Conclusion</AlertTitle>
        <AlertDescription>
          Analysis shows a 45% increase in account activity and engagement over the past 6 weeks, 
          with KKN di Desa Penari generating the highest volume at 22,500 impressions during the 
          week of Feb 12. The growth in reaches (106%) outpaces impressions (87%), indicating 
          increasing content reach efficiency and broader audience expansion for MD Entertainment films.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ContentVolume;
