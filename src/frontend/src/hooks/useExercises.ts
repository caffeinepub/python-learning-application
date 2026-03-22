import { useQuery } from "@tanstack/react-query";
import type { Exercise } from "../backend";
import { useActor } from "./useActor";

export function useExercises(difficulty: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Exercise[]>({
    queryKey: ["exercises", difficulty],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExercises(difficulty);
    },
    enabled: !!actor && !isFetching,
  });
}
