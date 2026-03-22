import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, CheckCircle2 } from 'lucide-react';
import { useExercises } from '@/hooks/useExercises';
import { useUserProgress } from '@/hooks/useUserProgress';

export default function PracticePage() {
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'all'>('all');
  const { data: exercises, isLoading } = useExercises(difficulty === 'all' ? null : difficulty);
  const { data: progress } = useUserProgress();

  const isSolved = (exerciseId: bigint) => {
    return progress?.solvedExercises.some(id => id === exerciseId) || false;
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading exercises...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">Practice Exercises</h1>
        <p className="text-lg text-muted-foreground">
          Apply your Python knowledge by solving coding challenges. Write and test your code in real-time.
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
        {exercises?.map((exercise) => (
          <Card 
            key={exercise.id.toString()} 
            className={`group hover:shadow-warm transition-all duration-300 ${
              isSolved(exercise.id) ? 'border-success/50 bg-success/5' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge 
                  variant={exercise.difficulty === 'beginner' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {exercise.difficulty}
                </Badge>
                {isSolved(exercise.id) && (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                )}
              </div>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                {exercise.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {exercise.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/practice/$id" params={{ id: exercise.id.toString() }}>
                  {isSolved(exercise.id) ? 'Review Solution' : 'Solve Challenge'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {exercises?.length === 0 && (
        <div className="text-center py-12">
          <Code className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No exercises found</h3>
          <p className="text-muted-foreground">
            Try selecting a different difficulty level.
          </p>
        </div>
      )}
    </div>
  );
}

