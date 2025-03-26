
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// Mock data for the word cloud
// In a real application, this would be calculated based on keyword frequency
const WORD_CLOUD_DATA = [
  { text: "Godzilla", value: 100, color: "#2563eb" },
  { text: "Dune", value: 85, color: "#8b5cf6" },
  { text: "Deadpool", value: 78, color: "#ef4444" },
  { text: "KKN", value: 75, color: "#10b981" },
  { text: "Siksa Kubur", value: 65, color: "#6366f1" },
  { text: "Wolverine", value: 60, color: "#f59e0b" },
  { text: "Kong", value: 58, color: "#84cc16" },
  { text: "Film Indonesia", value: 54, color: "#06b6d4" },
  { text: "Horror", value: 50, color: "#ec4899" },
  { text: "CGV", value: 48, color: "#3b82f6" },
  { text: "Cinema", value: 45, color: "#14b8a6" },
  { text: "Bioskop", value: 43, color: "#a855f7" },
  { text: "Film Baru", value: 40, color: "#f43f5e" },
  { text: "XXI", value: 38, color: "#0ea5e9" },
  { text: "Tiket", value: 35, color: "#22c55e" },
  { text: "Premier", value: 32, color: "#eab308" },
  { text: "IMAX", value: 30, color: "#64748b" },
  { text: "Movie", value: 28, color: "#6b7280" },
  { text: "Hollywood", value: 25, color: "#8b5cf6" }
];

const KeywordForecast = () => {
  const [timeframe, setTimeframe] = useState("7days");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Keyword Forecast Visualization</h3>
        <Select defaultValue={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Next 7 days</SelectItem>
            <SelectItem value="14days">Next 14 days</SelectItem>
            <SelectItem value="30days">Next 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="wordcloud" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="wordcloud">Word Cloud</TabsTrigger>
          <TabsTrigger value="forecast">Forecast Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="wordcloud" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md relative">
                <div className="word-cloud-container p-8">
                  {WORD_CLOUD_DATA.map((word, index) => (
                    <span
                      key={index}
                      style={{
                        fontSize: `${Math.max(word.value / 10, 1)}rem`,
                        color: word.color,
                        position: "absolute",
                        left: `${30 + Math.random() * 40}%`,
                        top: `${20 + Math.random() * 60}%`,
                        transform: `rotate(${Math.random() * 30 - 15}deg)`,
                        opacity: word.value / 100,
                        transition: "all 0.3s ease",
                        fontWeight: word.value > 60 ? "bold" : "normal",
                      }}
                      className="select-none hover:scale-110 transition-transform cursor-pointer"
                    >
                      {word.text}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground mt-4">
                Word size represents predicted search volume in the selected timeframe
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forecast" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Detailed forecast trends will be implemented in the next update</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="bg-muted/20 p-4 rounded-md">
        <h4 className="font-medium mb-2">About Keyword Forecasting</h4>
        <p className="text-sm text-muted-foreground">
          This visualization predicts upcoming trending topics based on historical data patterns, 
          social media momentum, and upcoming film releases. The algorithm analyzes search volume growth, 
          social media engagement, and promotional activity to anticipate which keywords will trend in the near future.
        </p>
      </div>
    </div>
  );
};

export default KeywordForecast;
