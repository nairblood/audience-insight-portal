
import { 
  AlertCircle, 
  ArrowUpRight, 
  Calendar, 
  Eye, 
  MessageCircle, 
  ThumbsUp 
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock data for warning alerts
const WARNING_ALERTS = [
  {
    id: 1,
    username: "film_critic_id",
    profileImage: "https://ui-avatars.com/api/?name=F+C",
    platform: "Twitter",
    post: "KKN di Desa Penari's ending was completely ruined by poor CGI. MD Entertainment really dropped the ball on what could have been a perfect horror film. #DisappointedFan #KKNdiDesaPenari",
    engagements: 1876,
    impressions: 12450,
    reaches: 9800,
    date: "2023-05-20",
    severity: "medium",
  },
  {
    id: 2,
    username: "cinema_expert",
    profileImage: "https://ui-avatars.com/api/?name=C+E",
    platform: "Instagram",
    post: "Agak Laen is the worst MD Entertainment production to date. Incoherent storytelling, terrible acting, and a waste of a good concept. Save your money and skip this one. #AgakLaen #Flop",
    engagements: 3542,
    impressions: 28750,
    reaches: 24100,
    date: "2023-06-03",
    severity: "high",
  },
  {
    id: 3,
    username: "movie_watcher",
    profileImage: "https://ui-avatars.com/api/?name=M+W",
    platform: "TikTok",
    post: "Just found out that scenes from Siksa Kubur were plagiarized from a Korean horror film. MD Entertainment needs to address this issue immediately. #Plagiarism #SiksaKubur @MDEntertainment",
    engagements: 5678,
    impressions: 42300,
    reaches: 36500,
    date: "2023-06-25",
    severity: "critical",
  },
];

const WarningAlerts = () => {
  return (
    <div className="space-y-6">
      <Alert variant="destructive" className="bg-red-50 border-red-200">
        <AlertCircle className="h-4 w-4 text-red-500" />
        <AlertTitle className="text-red-700">Critical Alert</AlertTitle>
        <AlertDescription className="text-red-600">
          There are 3 active warnings requiring attention, including 1 critical alert about 
          plagiarism allegations related to Siksa Kubur with high engagement.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {WARNING_ALERTS.map((alert) => (
          <Card key={alert.id} className={`border-l-4 ${
            alert.severity === 'critical' ? 'border-l-red-500' : 
            alert.severity === 'high' ? 'border-l-orange-500' : 'border-l-yellow-500'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={alert.profileImage} alt={alert.username} />
                    <AvatarFallback>{alert.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{alert.username}</h3>
                    <p className="text-xs text-muted-foreground">via {alert.platform}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  Visit <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{alert.post}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    <span><span className="font-medium">{alert.engagements.toLocaleString()}</span> engagements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span><span className="font-medium">{alert.impressions.toLocaleString()}</span> impressions</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <span><span className="font-medium">{alert.reaches.toLocaleString()}</span> reaches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Posted on <span className="font-medium">{alert.date}</span></span>
                  </div>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="py-3">
              <div className="w-full">
                <p className="text-sm font-medium mb-1">Alert Assessment:</p>
                <p className="text-sm text-muted-foreground">
                  {alert.severity === 'critical' ? (
                    'Critical issue requiring immediate PR response and official statement from MD Entertainment.'
                  ) : alert.severity === 'high' ? (
                    'High-visibility negative sentiment with significant engagement. Consider addressing in social media response.'
                  ) : (
                    'Monitor this sentiment trend, but not requiring immediate action at this time.'
                  )}
                </p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Warning Alert Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Out of 3 warning alerts, the plagiarism allegation for Siksa Kubur is most critical with 5,678 engagements 
            and 42,300 impressions. Recommended actions include: 1) Official statement addressing the plagiarism claims, 
            2) Direct engagement with key influencers discussing the topic, and 3) Content strategy highlighting the 
            film's original elements to counter the narrative.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WarningAlerts;
