import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Code, Trophy } from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useTutorials } from '@/hooks/useTutorials';
import { useExercises } from '@/hooks/useExercises';

export default function ProgressDashboard() {
  const { data: progress } = useUserProgress();
  const { data: allTutorials } = useTutorials(null);
  const { data: allExercises } = useExercises(null);

  const completedTutorials = progress?.completedTutorials.length || 0;
  const totalTutorials = allTutorials?.length || 0;
  const solvedExercises = progress?.solvedExercises.length || 0;
  const totalExercises = allExercises?.length || 0;

  const tutorialProgress = totalTutorials > 0 ? (completedTutorials / totalTutorials) * 100 : 0;
  const exerciseProgress = totalExercises > 0 ? (solvedExercises / totalExercises) * 100 : 0;
  const overallProgress = ((completedTutorials + solvedExercises) / (totalTutorials + totalExercises)) * 100 || 0;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Your Learning Progress</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Trophy className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {Math.round(overallProgress)}%
            </div>
            <Progress value={overallProgress} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">
              {completedTutorials + solvedExercises} of {totalTutorials + totalExercises} items completed
            </p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tutorials Completed</CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {completedTutorials}/{totalTutorials}
            </div>
            <Progress value={tutorialProgress} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">
              {Math.round(tutorialProgress)}% of tutorials finished
            </p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exercises Solved</CardTitle>
            <Code className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {solvedExercises}/{totalExercises}
            </div>
            <Progress value={exerciseProgress} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">
              {Math.round(exerciseProgress)}% of exercises completed
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

