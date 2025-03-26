
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrentTrendingTopics from "@/components/trending/CurrentTrendingTopics";
import PopularKeywords from "@/components/trending/PopularKeywords";
import TrendingHashtags from "@/components/trending/TrendingHashtags";
import KeywordForecast from "@/components/trending/KeywordForecast";
import { TrendingUp } from "lucide-react";

const Trending = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Trending Topics & Forecasts</h1>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Trending Analysis
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="current-trends" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="current-trends">Current Trends</TabsTrigger>
                <TabsTrigger value="popular-keywords">Popular Keywords</TabsTrigger>
                <TabsTrigger value="trending-hashtags">Trending Hashtags</TabsTrigger>
                <TabsTrigger value="keyword-forecast">Keyword Forecast</TabsTrigger>
              </TabsList>
              <TabsContent value="current-trends" className="mt-4">
                <CurrentTrendingTopics />
              </TabsContent>
              <TabsContent value="popular-keywords" className="mt-4">
                <PopularKeywords />
              </TabsContent>
              <TabsContent value="trending-hashtags" className="mt-4">
                <TrendingHashtags />
              </TabsContent>
              <TabsContent value="keyword-forecast" className="mt-4">
                <KeywordForecast />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Trending;
