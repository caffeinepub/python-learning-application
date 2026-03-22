import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TutorialsPage from './pages/TutorialsPage';
import TutorialDetailPage from './pages/TutorialDetailPage';
import PracticePage from './pages/PracticePage';
import ExerciseDetailPage from './pages/ExerciseDetailPage';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const tutorialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tutorials',
  component: TutorialsPage,
});

const tutorialDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tutorials/$id',
  component: TutorialDetailPage,
});

const practiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/practice',
  component: PracticePage,
});

const exerciseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/practice/$id',
  component: ExerciseDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  tutorialsRoute,
  tutorialDetailRoute,
  practiceRoute,
  exerciseDetailRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;

