import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { UserProgress } from '../backend';

export function useUserProgress() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<UserProgress | null>({
    queryKey: ['userProgress', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return null;
      
      try {
        const principal = identity.getPrincipal();
        return await actor.getUserProgress(principal);
      } catch (error) {
        // User has no progress yet, return empty progress
        return {
          completedTutorials: [],
          solvedExercises: [],
        };
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

