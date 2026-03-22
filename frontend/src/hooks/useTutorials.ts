import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Tutorial } from '../backend';

export function useTutorials(difficulty: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Tutorial[]>({
    queryKey: ['tutorials', difficulty],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTutorials(difficulty);
    },
    enabled: !!actor && !isFetching,
  });
}

