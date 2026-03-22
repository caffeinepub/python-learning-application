import { useParams, Link, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useTutorials } from '@/hooks/useTutorials';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useCompleteTutorial } from '@/hooks/useQueries';

export default function TutorialDetailPage() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const { data: tutorials } = useTutorials(null);
  const { data: progress } = useUserProgress();
  const completeTutorial = useCompleteTutorial();

  const tutorial = tutorials?.find(t => t.id.toString() === id);
  const isCompleted = progress?.completedTutorials.some(tutId => tutId.toString() === id) || false;

  const handleComplete = async () => {
    if (!tutorial || isCompleted) return;
    
    try {
      await completeTutorial.mutateAsync(tutorial.id);
    } catch (error) {
      console.error('Error completing tutorial:', error);
    }
  };

  if (!tutorial) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Tutorial not found</h2>
          <Button asChild>
            <Link to="/tutorials">Back to Tutorials</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/tutorials">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tutorials
        </Link>
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant={tutorial.difficulty === 'beginner' ? 'default' : 'secondary'} className="capitalize">
              {tutorial.difficulty}
            </Badge>
            {isCompleted && (
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Completed</span>
              </div>
            )}
          </div>
          <CardTitle className="text-3xl">{tutorial.title}</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            {tutorial.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Code Example Section */}
          <div className="mt-8 p-6 bg-muted rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">Example Code:</h3>
            <pre className="bg-card p-4 rounded-md overflow-x-auto border">
              <code className="text-sm font-mono">
                {tutorial.difficulty === 'beginner' && tutorial.title.includes('Variables') && 
                  `# Creating variables in Python\nname = "Python Learner"\nage = 25\nis_learning = True\n\nprint(f"Hello, {name}!")\nprint(f"Age: {age}")`
                }
                {tutorial.difficulty === 'beginner' && tutorial.title.includes('Data Types') && 
                  `# Different data types in Python\ninteger_num = 42\nfloat_num = 3.14\ntext = "Hello, World!"\nis_true = True\n\nprint(type(integer_num))  # <class 'int'>\nprint(type(float_num))    # <class 'float'>\nprint(type(text))         # <class 'str'>\nprint(type(is_true))      # <class 'bool'>`
                }
                {tutorial.difficulty === 'intermediate' && tutorial.title.includes('Loops') && 
                  `# For loop example\nfor i in range(5):\n    print(f"Count: {i}")\n\n# While loop example\ncount = 0\nwhile count < 3:\n    print(f"While count: {count}")\n    count += 1\n\n# Loop through a list\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)`
                }
              </code>
            </pre>
          </div>

          <div className="mt-8 flex gap-4">
            {!isCompleted ? (
              <Button 
                size="lg" 
                onClick={handleComplete}
                disabled={completeTutorial.isPending}
              >
                {completeTutorial.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Marking Complete...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Mark as Complete
                  </>
                )}
              </Button>
            ) : (
              <Button size="lg" variant="outline" asChild>
                <Link to="/practice">
                  Practice What You Learned
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

