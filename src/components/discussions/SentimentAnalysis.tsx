
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowDown, ArrowUp, Info } from "lucide-react";

// Mock data for sentiment trend
const SENTIMENT_TREND_DATA = [
  { date: 'Jan 1', positive: 65, negative: 15, neutral: 20 },
  { date: 'Jan 8', positive: 60, negative: 25, neutral: 15 },
  { date: 'Jan 15', positive: 55, negative: 30, neutral: 15 },
  { date: 'Jan 22', positive: 70, negative: 10, neutral: 20 },
  { date: 'Jan 29', positive: 75, negative: 15, neutral: 10 },
  { date: 'Feb 5', positive: 65, negative: 20, neutral: 15 },
  { date: 'Feb 12', positive: 80, negative: 10, neutral: 10 },
];

// Mock data for pie chart
const SENTIMENT_DISTRIBUTION = [
  { name: 'Positive', value: 68, color: '#10b981' },
  { name: 'Negative', value: 17, color: '#ef4444' },
  { name: 'Neutral', value: 15, color: '#6b7280' },
];

const lineChartColors = {
  positive: { color: "#10b981" },
  negative: { color: "#ef4444" },
  neutral: { color: "#6b7280" },
};

const SentimentAnalysis = () => {
  // Calculate trend indicators
  const positiveChange = SENTIMENT_TREND_DATA[SENTIMENT_TREND_DATA.length - 1].positive - 
                         SENTIMENT_TREND_DATA[0].positive;
  const negativeChange = SENTIMENT_TREND_DATA[SENTIMENT_TREND_DATA.length - 1].negative - 
                         SENTIMENT_TREND_DATA[0].negative;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <CardTitle className="text-base font-medium">Positive Sentiment</CardTitle>
            <div className={`flex items-center ${positiveChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {positiveChange >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              <span className="text-sm font-medium">{Math.abs(positiveChange)}%</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SENTIMENT_DISTRIBUTION[0].value}%</div>
            <p className="text-xs text-muted-foreground">over the last 6 weeks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <CardTitle className="text-base font-medium">Negative Sentiment</CardTitle>
            <div className={`flex items-center ${negativeChange <= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {negativeChange <= 0 ? <ArrowDown className="h-4 w-4 mr-1" /> : <ArrowUp className="h-4 w-4 mr-1" />}
              <span className="text-sm font-medium">{Math.abs(negativeChange)}%</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SENTIMENT_DISTRIBUTION[1].value}%</div>
            <p className="text-xs text-muted-foreground">over the last 6 weeks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <CardTitle className="text-base font-medium">Neutral Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SENTIMENT_DISTRIBUTION[2].value}%</div>
            <p className="text-xs text-muted-foreground">over the last 6 weeks</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Trend</CardTitle>
            <CardDescription>
              Timeline of sentiment analysis over the past 6 weeks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={lineChartColors} className="h-[300px]">
              <LineChart 
                data={SENTIMENT_TREND_DATA}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="positive" 
                  stroke="#10b981" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="negative" 
                  stroke="#ef4444" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="neutral" 
                  stroke="#6b7280" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
            <CardDescription>
              Overall sentiment distribution for MD Entertainment films
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SENTIMENT_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {SENTIMENT_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Analysis Conclusion</AlertTitle>
        <AlertDescription>
          Overall sentiment towards MD Entertainment films is positive (68%). There has been a 15% increase in 
          positive sentiment over the past 6 weeks, likely due to the successful release of "KKN di Desa Penari" 
          and "Agak Laen". Negative sentiment has decreased by 5%, showing improved audience reception.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SentimentAnalysis;
