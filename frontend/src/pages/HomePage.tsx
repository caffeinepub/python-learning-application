import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgressDashboard from '@/components/ProgressDashboard';

export default function HomePage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20 p-8 md:p-12 mb-12">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Learn Python Programming the Easy Way
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Master Python fundamentals through interactive tutorials and hands-on practice exercises. 
            Start your coding journey today with beginner-friendly lessons designed for everyone.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link to="/tutorials">
                <BookOpen className="mr-2 h-5 w-5" />
                Start Learning
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/practice">
                <Code className="mr-2 h-5 w-5" />
                Practice Coding
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
          <img 
            src="/assets/generated/python-hero.dim_800x400.png" 
            alt="Python Learning" 
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Progress Dashboard */}
      <ProgressDashboard />

      {/* Navigation Cards */}
      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <Card className="group hover:shadow-warm transition-all duration-300 border-2 hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <img 
                  src="/assets/generated/tutorials-icon.dim_256x256.png" 
                  alt="Tutorials" 
                  className="w-12 h-12"
                />
              </div>
              <ArrowRight className="h-6 w-6 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
            <CardTitle className="text-2xl">Interactive Tutorials</CardTitle>
            <CardDescription className="text-base">
              Learn Python concepts step-by-step with clear explanations and code examples. 
              Perfect for beginners starting their programming journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/tutorials">
                Explore Tutorials
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-warm transition-all duration-300 border-2 hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <img 
                  src="/assets/generated/practice-icon.dim_256x256.png" 
                  alt="Practice" 
                  className="w-12 h-12"
                />
              </div>
              <ArrowRight className="h-6 w-6 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
            <CardTitle className="text-2xl">Practice Exercises</CardTitle>
            <CardDescription className="text-base">
              Apply what you've learned by solving real coding challenges. 
              Write and run Python code directly in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/practice">
                Start Practicing
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-3xl mr-3">📚</span>
              Structured Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Follow a carefully designed curriculum that takes you from basics to intermediate concepts.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-3xl mr-3">💻</span>
              Hands-On Practice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Write real Python code and see results instantly with our interactive code editor.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-3xl mr-3">📈</span>
              Track Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Monitor your learning journey and celebrate your achievements as you complete lessons.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

