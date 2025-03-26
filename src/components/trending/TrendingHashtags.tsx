
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  AreaChart, 
  Area, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const HASHTAGS_DATA = [
  { 
    id: 1, 
    platform: "X", 
    hashtag: "#GodzillaVsKong", 
    volume: "125K", 
    change: "+32%",
    avatar: "https://ui-avatars.com/api/?name=X&background=000&color=fff"
  },
  { 
    id: 2, 
    platform: "TikTok", 
    hashtag: "#DuneMovie", 
    volume: "98K", 
    change: "+18%",
    avatar: "https://ui-avatars.com/api/?name=TT&background=000&color=fff"
  },
  { 
    id: 3, 
    platform: "TikTok", 
    hashtag: "#KKNdiDesaPenari", 
    volume: "87K", 
    change: "+25%",
    avatar: "https://ui-avatars.com/api/?name=TT&background=000&color=fff"
  },
  { 
    id: 4, 
    platform: "X", 
    hashtag: "#FilmIndonesia", 
    volume: "72K", 
    change: "+15%",
    avatar: "https://ui-avatars.com/api/?name=X&background=000&color=fff"
  },
  { 
    id: 5, 
    platform: "TikTok", 
    hashtag: "#SiksaKubur", 
    volume: "65K", 
    change: "+40%",
    avatar: "https://ui-avatars.com/api/?name=TT&background=000&color=fff"
  },
  { 
    id: 6, 
    platform: "X", 
    hashtag: "#DeadpoolAndWolverine", 
    volume: "59K", 
    change: "+10%",
    avatar: "https://ui-avatars.com/api/?name=X&background=000&color=fff"
  }
];

const TREND_DATA = [
  {
    date: "Jan",
    X: 45,
    TikTok: 60,
  },
  {
    date: "Feb",
    X: 52,
    TikTok: 68,
  },
  {
    date: "Mar", 
    X: 48,
    TikTok: 73,
  },
  {
    date: "Apr",
    X: 61,
    TikTok: 79,
  },
  {
    date: "May",
    X: 55,
    TikTok: 85,
  },
  {
    date: "Jun",
    X: 67,
    TikTok: 90,
  },
];

const colorConfig = {
  X: { color: "#1DA1F2" },
  TikTok: { color: "#000000" },
};

const TrendingHashtags = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Trending Hashtags - X & TikTok</h3>
        <p className="text-sm text-muted-foreground">Last 7 days</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-medium mb-4">Top Film Hashtags</h4>
            <div className="space-y-3">
              {HASHTAGS_DATA.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <img src={item.avatar} alt={item.platform} />
                    </Avatar>
                    <div>
                      <p className="font-medium">{item.hashtag}</p>
                      <p className="text-xs text-muted-foreground">{item.platform}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-semibold">{item.volume}</span>
                    <span className="text-xs text-green-500">{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-medium mb-4">Hashtag Volume Trend</h4>
            <ChartContainer config={colorConfig} className="h-[300px]">
              <LineChart data={TREND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="X" stroke="#1DA1F2" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="TikTok" stroke="#000000" activeDot={{ r: 8 }} strokeWidth={2} />
                <Legend />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        Data sourced from X (Twitter) and TikTok APIs - Film & Entertainment related hashtags in Indonesia
      </div>
    </div>
  );
};

export default TrendingHashtags;
