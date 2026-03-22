import { Link, Outlet, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { BookOpen, Code, Home } from 'lucide-react';

export default function Layout() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold text-xl">
              Py
            </div>
            <span className="font-bold text-xl">Python Learning Hub</span>
          </Link>
          
          <nav className="flex items-center space-x-2">
            <Button
              variant={currentPath === '/' ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button
              variant={currentPath.startsWith('/tutorials') ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/tutorials">
                <BookOpen className="mr-2 h-4 w-4" />
                Tutorials
              </Link>
            </Button>
            <Button
              variant={currentPath.startsWith('/practice') ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/practice">
                <Code className="mr-2 h-4 w-4" />
                Practice
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-card py-6 mt-12">
        <div className="container flex flex-col items-center justify-center space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Python Learning Hub. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'python-learning-hub'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

