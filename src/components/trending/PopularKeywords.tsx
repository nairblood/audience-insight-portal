
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from "recharts";
import { Separator } from "@/components/ui/separator";

const POPULAR_KEYWORDS = [
  { keyword: "Godzilla x Kong", volume: 100, change: "+15%" },
  { keyword: "Dune Part Two", volume: 85, change: "+8%" },
  { keyword: "KKN di Desa Penari", volume: 75, change: "+20%" },
  { keyword: "Agak Laen", volume: 70, change: "-5%" },
  { keyword: "Siksa Kubur", volume: 65, change: "+12%" },
  { keyword: "Deadpool & Wolverine", volume: 60, change: "+2%" },
  { keyword: "The Strangers", volume: 45, change: "-3%" },
  { keyword: "Jadwal CGV", volume: 40, change: "+5%" },
  { keyword: "Tiket bioskop", volume: 35, change: "+1%" },
  { keyword: "Film Indonesia", volume: 30, change: "+4%" },
];

const CHART_DATA = [
  { name: "Week 1", Searches: 50 },
  { name: "Week 2", Searches: 65 },
  { name: "Week 3", Searches: 60 },
  { name: "Week 4", Searches: 75 },
  { name: "Week 5", Searches: 80 },
  { name: "Week 6", Searches: 100 },
];

const colorConfig = {
  Searches: { color: "#2563eb" },
};

const PopularKeywords = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Popular Keywords - Google Trends</h3>
        <p className="text-sm text-muted-foreground">Last 30 days</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-medium mb-4">Top Search Keywords</h4>
            <div className="space-y-2">
              {POPULAR_KEYWORDS.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 text-sm text-muted-foreground">{index + 1}</span>
                    <span className="font-medium">{item.keyword}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {item.volume}
                    </span>
                    <span className={`text-xs ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-medium mb-4">Search Volume Trend</h4>
            <ChartContainer config={colorConfig} className="h-[300px]">
              <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="Searches" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="text-center text-sm text-muted-foreground">
        Data sourced from Google Trends Indonesia - Entertainment & Film Category
      </div>
    </div>
  );
};

export default PopularKeywords;
