export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "beginner":
      return "text-green-500 bg-green-500/10 border-green-500/20";
    case "intermediate":
      return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    case "advanced":
      return "text-red-500 bg-red-500/10 border-red-500/20";
    default:
      return "text-gray-500 bg-gray-500/10 border-gray-500/20";
  }
}
