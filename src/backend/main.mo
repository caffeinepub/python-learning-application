import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type Tutorial = {
    id : Nat;
    title : Text;
    content : Text;
    difficulty : Text;
  };

  type Exercise = {
    id : Nat;
    title : Text;
    description : Text;
    difficulty : Text;
    solution : Text;
  };

  type UserProgress = {
    completedTutorials : [Nat];
    solvedExercises : [Nat];
  };

  let tutorials : [Tutorial] = [
    {
      id = 1;
      title = "Introduction to Variables";
      content = "Variables are used to store data. In Python, you can create a variable by assigning a value to a name.";
      difficulty = "beginner";
    },
    {
      id = 2;
      title = "Data Types";
      content = "Python supports various data types like integers, floats, strings, and booleans.";
      difficulty = "beginner";
    },
    {
      id = 3;
      title = "Loops";
      content = "Loops allow you to repeat a block of code multiple times. Python supports for and while loops.";
      difficulty = "intermediate";
    },
  ];

  let exercises : [Exercise] = [
    {
      id = 1;
      title = "Sum of Two Numbers";
      description = "Write a function that returns the sum of two numbers.";
      difficulty = "beginner";
      solution = "def sum(a, b):\n  return a + b";
    },
    {
      id = 2;
      title = "Find Maximum";
      description = "Write a function that returns the maximum of two numbers.";
      difficulty = "beginner";
      solution = "def max(a, b):\n  return a if a > b else b";
    },
    {
      id = 3;
      title = "Fibonacci Sequence";
      description = "Write a function that returns the nth number in the Fibonacci sequence.";
      difficulty = "intermediate";
      solution = "def fibonacci(n):\n  if n <= 1:\n    return n\n  else:\n    return fibonacci(n-1) + fibonacci(n-2)";
    },
  ];

  let userProgress = Map.empty<Principal, UserProgress>();

  public query ({ caller }) func getTutorials(difficulty : ?Text) : async [Tutorial] {
    switch (difficulty) {
      case (null) { tutorials };
      case (?diff) {
        tutorials.filter(func(t) { t.difficulty == diff });
      };
    };
  };

  public query ({ caller }) func getExercises(difficulty : ?Text) : async [Exercise] {
    switch (difficulty) {
      case (null) { exercises };
      case (?diff) {
        exercises.filter(func(e) { e.difficulty == diff });
      };
    };
  };

  public shared ({ caller }) func completeTutorial(tutorialId : Nat) : async () {
    let progress = switch (userProgress.get(caller)) {
      case (null) {
        {
          completedTutorials = [tutorialId];
          solvedExercises = [];
        };
      };
      case (?existing) {
        if (existing.completedTutorials.any(func(id) { id == tutorialId })) {
          Runtime.trap("Tutorial already completed");
        };
        {
          completedTutorials = existing.completedTutorials.concat([tutorialId]);
          solvedExercises = existing.solvedExercises;
        };
      };
    };
    userProgress.add(caller, progress);
  };

  public shared ({ caller }) func solveExercise(exerciseId : Nat) : async () {
    let progress = switch (userProgress.get(caller)) {
      case (null) {
        {
          completedTutorials = [];
          solvedExercises = [exerciseId];
        };
      };
      case (?existing) {
        if (existing.solvedExercises.any(func(id) { id == exerciseId })) {
          Runtime.trap("Exercise already solved");
        };
        {
          completedTutorials = existing.completedTutorials;
          solvedExercises = existing.solvedExercises.concat([exerciseId]);
        };
      };
    };
    userProgress.add(caller, progress);
  };

  public query ({ caller }) func getUserProgress(user : Principal) : async UserProgress {
    switch (userProgress.get(user)) {
      case (null) {
        Runtime.trap("User has no progress yet");
      };
      case (?progress) { progress };
    };
  };
};
