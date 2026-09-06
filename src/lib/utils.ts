import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

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

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    "ai-ml": "🧠",
    backend: "⚙️",
    database: "💾",
    devops: "🐳",
    frontend: "🎨",
    game: "🎮",
    language: "📝",
    network: "🌐",
    os: "💻",
    security: "🔒",
  };
  return icons[category] || "📦";
}
