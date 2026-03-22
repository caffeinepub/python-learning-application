import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Exercise {
    id: bigint;
    title: string;
    difficulty: string;
    description: string;
    solution: string;
}
export interface UserProgress {
    completedTutorials: Array<bigint>;
    solvedExercises: Array<bigint>;
}
export interface Tutorial {
    id: bigint;
    title: string;
    content: string;
    difficulty: string;
}
export interface backendInterface {
    completeTutorial(tutorialId: bigint): Promise<void>;
    getExercises(difficulty: string | null): Promise<Array<Exercise>>;
    getTutorials(difficulty: string | null): Promise<Array<Tutorial>>;
    getUserProgress(user: Principal): Promise<UserProgress>;
    solveExercise(exerciseId: bigint): Promise<void>;
}
