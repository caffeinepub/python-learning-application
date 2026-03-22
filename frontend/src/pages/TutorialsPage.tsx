import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { useTutorials } from '@/hooks/useTutorials';
import { useUserProgress } from '@/hooks/useUserProgress';

export default function TutorialsPage() {
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'all'>('all');
  const { data: tutorials, isLoading } = useTutorials(difficulty === 'all' ? null : difficulty);
  const { data: progress } = useUserProgress();

  const isCompleted = (tutorialId: bigint) => {
    return progress?.completedTutorials.some(id => id === tutorialId) || false;
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading tutorials...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">Python Tutorials</h1>
        <p className="text-lg text-muted-foreground">
          Learn Python programming concepts with clear explanations and practical examples.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={(v) => setDifficulty(v as any)}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All Levels</TabsTrigger>
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials?.map((tutorial) => (
          <Card 
            key={tutorial.id.toString()} 
            className={`group hover:shadow-warm transition-all duration-300 ${
              isCompleted(tutorial.id) ? 'border-success/50 bg-success/5' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge 
                  variant={tutorial.difficulty === 'beginner' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {tutorial.difficulty}
                </Badge>
                {isCompleted(tutorial.id) && (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                )}
              </div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {tutorial.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {tutorial.content}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/tutorials/$id" params={{ id: tutorial.id.toString() }}>
                  {isCompleted(tutorial.id) ? 'Review Lesson' : 'Start Learning'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {tutorials?.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No tutorials found</h3>
          <p className="text-muted-foreground">
            Try selecting a different difficulty level.
          </p>
        </div>
      )}
    </div>
  );
}

