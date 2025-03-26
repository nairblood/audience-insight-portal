
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, MessageCircle, ThumbsUp } from "lucide-react";

// Mock data for sentiment posts
const SENTIMENT_POSTS = [
  {
    id: 1,
    username: "filmfan_id",
    platform: "Instagram",
    profileImage: "https://ui-avatars.com/api/?name=F+F",
    post: "KKN di Desa Penari is absolutely terrifying! MD Entertainment has outdone themselves with this horror masterpiece. #KKNdiDesaPenari #MDEntertainment",
    sentiment: "positive",
    engagements: 1243,
    impressions: 8750,
    reaches: 7200,
    date: "2023-05-15",
  },
  {
    id: 2,
    username: "movie_critic",
    platform: "Twitter",
    profileImage: "https://ui-avatars.com/api/?name=M+C",
    post: "Not impressed with Agak Laen. The storyline is confusing and the acting is mediocre at best. Expected more from MD Entertainment. #AgakLaen",
    sentiment: "negative",
    engagements: 567,
    impressions: 3850,
    reaches: 3100,
    date: "2023-06-02",
  },
  {
    id: 3,
    username: "indonesian_cinema",
    platform: "Facebook",
    profileImage: "https://ui-avatars.com/api/?name=I+C",
    post: "Just watched Siksa Kubur. It was okay - some good scares but the plot was predictable. MD Entertainment's horror films are hit or miss. #SiksaKubur",
    sentiment: "neutral",
    engagements: 321,
    impressions: 2150,
    reaches: 1800,
    date: "2023-06-20",
  },
  {
    id: 4,
    username: "movie_enthusiast",
    platform: "TikTok",
    profileImage: "https://ui-avatars.com/api/?name=M+E",
    post: "KKN di Desa Penari deserves all the hype! The cinematography and sound design create such an immersive horror experience. MD Entertainment is raising the bar for Indonesian horror. #MDEntertainment #IndonesianCinema",
    sentiment: "positive",
    engagements: 3567,
    impressions: 25430,
    reaches: 20100,
    date: "2023-05-18",
  },
  {
    id: 5,
    username: "film_review",
    platform: "YouTube",
    profileImage: "https://ui-avatars.com/api/?name=F+R",
    post: "My detailed analysis of Agak Laen is now up on my channel! While the concept is fresh, the execution fell short. MD Entertainment needs to focus more on script development. Link in bio. #FilmReview #AgakLaen",
    sentiment: "negative",
    engagements: 1254,
    impressions: 8900,
    reaches: 7500,
    date: "2023-06-05",
  },
];

// Function to get badge color based on sentiment
const getSentimentBadge = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return <Badge className="bg-green-500 hover:bg-green-600">Positive</Badge>;
    case "negative":
      return <Badge className="bg-red-500 hover:bg-red-600">Negative</Badge>;
    case "neutral":
      return <Badge className="bg-gray-500 hover:bg-gray-600">Neutral</Badge>;
    default:
      return null;
  }
};

const SentimentPosts = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // Filter posts based on selected sentiment
  const filteredPosts = selectedFilter === "all" 
    ? SENTIMENT_POSTS 
    : SENTIMENT_POSTS.filter(post => post.sentiment === selectedFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={selectedFilter === "all" ? "default" : "outline"} 
          onClick={() => setSelectedFilter("all")}
        >
          All Posts
        </Button>
        <Button 
          variant={selectedFilter === "positive" ? "default" : "outline"} 
          onClick={() => setSelectedFilter("positive")}
          className="border-green-200 text-green-700"
        >
          Positive
        </Button>
        <Button 
          variant={selectedFilter === "negative" ? "default" : "outline"} 
          onClick={() => setSelectedFilter("negative")}
          className="border-red-200 text-red-700"
        >
          Negative
        </Button>
        <Button 
          variant={selectedFilter === "neutral" ? "default" : "outline"} 
          onClick={() => setSelectedFilter("neutral")}
          className="border-gray-200 text-gray-700"
        >
          Neutral
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sentiment Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Post</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.profileImage} alt={post.username} />
                        <AvatarFallback>{post.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{post.username}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="truncate">{post.post}</p>
                  </TableCell>
                  <TableCell>{post.platform}</TableCell>
                  <TableCell>{getSentimentBadge(post.sentiment)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        <span>{post.engagements} engagements</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        <span>{post.impressions} impressions</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        <span>{post.reaches} reaches</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="text-xs">{post.date}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Post Sentiment Conclusion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Analysis of {SENTIMENT_POSTS.length} posts shows that KKN di Desa Penari has received the most 
            positive engagement, with 60% positive sentiment and 3,567 engagements on a single TikTok post. 
            Agak Laen has more mixed reception with notable criticism about its storyline. Posts with 
            detailed film analysis tend to generate more impressions and reaches across platforms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentPosts;
