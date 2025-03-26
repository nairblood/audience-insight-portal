
import { Badge } from "@/components/ui/badge";
import { 
  ChevronUp, 
  ArrowRight, 
  Youtube,
  Facebook, 
  Instagram,
  Search, 
  Twitter
} from "lucide-react";

interface TrendingTopic {
  id: number;
  topic: string;
  volume: number;
  source: "instagram" | "x" | "tiktok" | "youtube" | "facebook" | "google" | "news";
  trend: "up" | "down" | "stable";
  percentage: number;
}

const TRENDING_TOPICS: TrendingTopic[] = [
  { id: 1, topic: "Godzilla x Kong: The New Empire", volume: 27500, source: "youtube", trend: "up", percentage: 12 },
  { id: 2, topic: "Dune: Part Two", volume: 25300, source: "x", trend: "up", percentage: 8 },
  { id: 3, topic: "KKN di Desa Penari", volume: 19800, source: "tiktok", trend: "up", percentage: 15 },
  { id: 4, topic: "Agak Laen", volume: 18200, source: "instagram", trend: "down", percentage: 3 },
  { id: 5, topic: "Siksa Kubur", volume: 16900, source: "google", trend: "up", percentage: 10 },
  { id: 6, topic: "Deadpool & Wolverine", volume: 15600, source: "youtube", trend: "stable", percentage: 0 },
  { id: 7, topic: "Imlie - Season 3", volume: 14300, source: "news", trend: "up", percentage: 5 },
  { id: 8, topic: "The Strangers: Chapter 1", volume: 12800, source: "facebook", trend: "down", percentage: 2 }
];

const getSourceIcon = (source: TrendingTopic["source"]) => {
  switch (source) {
    case "youtube": return <Youtube className="h-4 w-4 text-red-500" />;
    case "instagram": return <Instagram className="h-4 w-4 text-pink-500" />;
    case "facebook": return <Facebook className="h-4 w-4 text-blue-500" />;
    case "x": return <Twitter className="h-4 w-4 text-black" />;
    case "tiktok": return <div className="h-4 w-4 flex items-center justify-center font-bold text-xs">TT</div>;
    case "google": return <Search className="h-4 w-4 text-green-500" />;
    case "news": return <div className="h-4 w-4 flex items-center justify-center font-bold text-xs">N</div>;
    default: return null;
  }
};

const CurrentTrendingTopics = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Current Trending Topics</h3>
        <p className="text-sm text-muted-foreground">Based on social media & search trends in Indonesia</p>
      </div>
      
      <div className="space-y-3">
        {TRENDING_TOPICS.map((topic) => (
          <div 
            key={topic.id} 
            className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary">{topic.id}</span>
              <div className="flex items-center gap-2 font-medium">
                {topic.topic}
                <Badge variant="outline" className="ml-2 flex items-center gap-1">
                  {getSourceIcon(topic.source)}
                  <span className="text-xs capitalize">{topic.source}</span>
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">
                {topic.volume.toLocaleString()} mentions
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                topic.trend === 'up' 
                  ? 'text-green-500' 
                  : topic.trend === 'down' 
                    ? 'text-red-500' 
                    : 'text-gray-500'
              }`}>
                {topic.trend === 'up' && <ChevronUp className="h-4 w-4" />}
                {topic.trend === 'down' && <ChevronUp className="h-4 w-4 rotate-180" />}
                {topic.percentage > 0 && '+'}
                {topic.percentage}%
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-sm text-center text-muted-foreground mt-4">
        Data sources: X, TikTok, Google Trends, Facebook, YouTube, Instagram, News Platforms
      </div>
    </div>
  );
};

export default CurrentTrendingTopics;
