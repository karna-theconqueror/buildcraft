export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Category =
  | "ai-ml"
  | "backend"
  | "blockchain"
  | "chat"
  | "database"
  | "devops"
  | "embedded"
  | "frontend"
  | "game"
  | "language"
  | "math-science"
  | "mobile"
  | "network"
  | "os"
  | "payments"
  | "robotics"
  | "search"
  | "security"
  | "testing"
  | "web";

export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  estimatedTime: string;
  languages: string[];
  icon: string;
  stars: number;
  videoUrl?: string;
  articleUrl?: string;
  steps: Step[];
  starterCode: string;
  solutionCode: string;
  tests: Test[];
}

export interface Step {
  title: string;
  content: string;
  hint?: string;
}

export interface Test {
  name: string;
  input: string;
  expectedOutput: string;
}

export interface CategoryInfo {
  slug: Category;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface LearningPath {
  slug: string;
  name: string;
  description: string;
  icon: string;
  tutorials: string[];
  color: string;
}

export interface UserProgress {
  completedTutorials: string[];
  startedTutorials: string[];
  currentTutorial: string | null;
}
