
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
import SentimentAnalysis from "@/components/discussions/SentimentAnalysis";
import SentimentPosts from "@/components/discussions/SentimentPosts";
import WarningAlerts from "@/components/discussions/WarningAlerts";
import ContentVolume from "@/components/discussions/ContentVolume";

const Discussions = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Netizen Discussions Analysis</h1>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              MD Entertainment Films - Social Media Analysis
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sentiment-analysis" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sentiment-analysis">Sentiment Analysis</TabsTrigger>
                <TabsTrigger value="sentiment-posts">Sentiment Posts</TabsTrigger>
                <TabsTrigger value="warning-alerts">Warning Alerts</TabsTrigger>
                <TabsTrigger value="content-volume">Content Volume</TabsTrigger>
              </TabsList>
              <TabsContent value="sentiment-analysis" className="mt-4">
                <SentimentAnalysis />
              </TabsContent>
              <TabsContent value="sentiment-posts" className="mt-4">
                <SentimentPosts />
              </TabsContent>
              <TabsContent value="warning-alerts" className="mt-4">
                <WarningAlerts />
              </TabsContent>
              <TabsContent value="content-volume" className="mt-4">
                <ContentVolume />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Discussions;
