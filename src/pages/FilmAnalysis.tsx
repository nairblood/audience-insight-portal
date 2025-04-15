
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "@/components/DashboardLayout";
import { Film, Plus, X, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Form schema
const formSchema = z.object({
  projectName: z.string().min(3, {
    message: "Project name must be at least 3 characters.",
  }),
  description: z.string().optional(),
  movie: z.string().optional(),
  keyword: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Latest films data
const latestFilms = [
  "KKN di Desa Penari",
  "Mencuri Raden Saleh",
  "Pengabdi Setan 2",
  "Perjanjian Gaib",
  "Sri Asih",
  "Waktu Magrib",
  "Mumun",
  "Ngeri-Ngeri Sedap",
  "Layangan Putus",
  "Ben & Jody"
];

// Mock projects data
const initialProjects = [
  {
    id: "1",
    name: "KKN di Desa Penari Analysis",
    description: "Sentiment and audience reception analysis",
    createdAt: "2023-08-15",
    movies: ["KKN di Desa Penari"],
    keywords: ["Horror", "Indonesian Cinema", "Adaptation"],
  },
  {
    id: "2",
    name: "Mencuri Raden Saleh Impact",
    description: "Cultural impact and social media analysis",
    createdAt: "2023-10-02",
    movies: ["Mencuri Raden Saleh"],
    keywords: ["Heist", "Historical", "Action"],
  },
];

const FilmAnalysis = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [open, setOpen] = useState(false);
  const [movies, setMovies] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const navigate = useNavigate();
  
  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      description: "",
      movie: "",
      keyword: "",
    },
  });
  
  const onSubmit = (values: FormValues) => {
    const newProject = {
      id: Date.now().toString(),
      name: values.projectName,
      description: values.description || "",
      createdAt: new Date().toISOString().split('T')[0],
      movies: [...movies],
      keywords: [...keywords],
    };
    
    setProjects([...projects, newProject]);
    toast.success("Project created successfully!");
    form.reset();
    setMovies([]);
    setKeywords([]);
    setOpen(false);
  };

  // Handle adding a movie from select dropdown
  const handleSelectMovie = (value: string) => {
    if (!movies.includes(value)) {
      setMovies([...movies, value]);
      form.setValue("movie", "");
      toast.success(`"${value}" added to project`);
    }
  };

  // Handle removing a movie
  const handleRemoveMovie = (movie: string) => {
    setMovies(movies.filter((m) => m !== movie));
    toast.info(`"${movie}" removed from project`);
  };

  // Handle adding a keyword
  const handleAddKeyword = () => {
    const keywordValue = form.getValues("keyword")?.trim();
    if (keywordValue && !keywords.includes(keywordValue)) {
      setKeywords([...keywords, keywordValue]);
      form.setValue("keyword", "");
      toast.success(`Keyword "${keywordValue}" added`);
    }
  };

  // Handle removing a keyword
  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
    toast.info(`Keyword "${keyword}" removed`);
  };

  // Handle deleting a project
  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
    toast.success("Project deleted successfully!");
  };

  // Handle opening a project
  const handleOpenProject = (projectId: string) => {
    navigate(`/film-analysis/${projectId}`);
  };

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Film Analysis Projects</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Analysis Project</DialogTitle>
                <DialogDescription>
                  Enter details for your new film analysis project.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter project description" 
                            className="min-h-[80px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Movie section */}
                  <div className="space-y-2">
                    <FormLabel>Select Movies</FormLabel>
                    <Select onValueChange={handleSelectMovie}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a movie" />
                      </SelectTrigger>
                      <SelectContent>
                        {latestFilms.map((film) => (
                          <SelectItem key={film} value={film}>
                            <div className="flex items-center gap-2">
                              <Film className="h-4 w-4" />
                              {film}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {movies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {movies.map((movie, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                            <Film className="h-3 w-3" />
                            {movie}
                            <button 
                              type="button" 
                              className="ml-1 text-destructive hover:bg-destructive/10 rounded-full p-0.5"
                              onClick={() => handleRemoveMovie(movie)}
                              aria-label={`Remove ${movie}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Keywords section */}
                  <div className="space-y-2">
                    <FormLabel>Keywords</FormLabel>
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="keyword"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input 
                                placeholder="Add a keyword" 
                                {...field} 
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddKeyword();
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleAddKeyword}
                        className="flex items-center gap-1"
                      >
                        <Tag className="h-4 w-4" />
                        Add
                      </Button>
                    </div>
                    
                    {keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {keywords.map((keyword, index) => (
                          <Badge key={index} className="flex items-center gap-1 px-3 py-1">
                            <Tag className="h-3 w-3" />
                            {keyword}
                            <button 
                              type="button" 
                              className="ml-1 text-destructive hover:bg-destructive/10 rounded-full p-0.5"
                              onClick={() => handleRemoveKeyword(keyword)}
                              aria-label={`Remove keyword ${keyword}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <DialogFooter className="mt-6">
                    <Button type="submit" disabled={!form.formState.isValid}>Create Project</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Film className="h-5 w-5 text-primary" />
                    {project.name}
                  </div>
                  <Button
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(project.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete project</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Created on {project.createdAt}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {project.description || "No description provided"}
                </p>
                
                {project.movies.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Movies:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.movies.map((movie, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          <Film className="h-3 w-3" />
                          {movie}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {project.keywords.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleOpenProject(project.id)}
                >
                  Open Project
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FilmAnalysis;

