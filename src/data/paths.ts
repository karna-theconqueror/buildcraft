import { LearningPath } from "@/types";

export const learningPaths: LearningPath[] = [
  {
    slug: "backend-engineer",
    name: "Backend Engineer",
    description: "Master server-side development from HTTP basics to distributed systems",
    icon: "Server",
    color: "from-blue-500 to-cyan-500",
    tutorials: [
      "build-your-own-web-server",
      "build-your-own-api-gateway",
      "build-your-own-message-queue",
      "build-your-own-orm",
      "build-your-own-load-balancer",
    ],
  },
  {
    slug: "ai-engineer",
    name: "AI Engineer",
    description: "Build AI systems from tokenizers to production-ready LLMs",
    icon: "Brain",
    color: "from-purple-500 to-pink-500",
    tutorials: [
      "build-your-own-vector-db",
      "build-your-own-embedding",
      "build-your-own-rag",
      "build-your-own-llm",
      "build-your-own-agent",
    ],
  },
  {
    slug: "fullstack-developer",
    name: "Full Stack Developer",
    description: "Build complete applications from frontend to backend to database",
    icon: "Layers",
    color: "from-green-500 to-emerald-500",
    tutorials: [
      "build-your-own-web-server",
      "build-your-own-react",
      "build-your-own-database",
      "build-your-own-orm",
      "build-your-own-auth",
    ],
  },
  {
    slug: "systems-programmer",
    name: "Systems Programmer",
    description: "Understand computing from OS kernels to compilers",
    icon: "Cpu",
    color: "from-orange-500 to-red-500",
    tutorials: [
      "build-your-own-shell",
      "build-your-own-compiler",
      "build-your-own-os",
      "build-your-own-virtual-machine",
      "build-your-own-docker",
    ],
  },
  {
    slug: "game-developer",
    name: "Game Developer",
    description: "Create game engines, physics systems, and 3D renderers",
    icon: "Gamepad2",
    color: "from-yellow-500 to-orange-500",
    tutorials: [
      "build-your-own-3d-engine",
      "build-your-own-physics-engine",
      "build-your-own-game-engine",
      "build-your-own-compiler",
      "build-your-own-ray-tracer",
    ],
  },
  {
    slug: "devops-engineer",
    name: "DevOps Engineer",
    description: "Master infrastructure, containers, and deployment pipelines",
    icon: "Package",
    color: "from-teal-500 to-blue-500",
    tutorials: [
      "build-your-own-docker",
      "build-your-own-ci-cd",
      "build-your-own-monitoring",
      "build-your-own-log-aggregator",
      "build-your-own-service-mesh",
    ],
  },
];

export function getLearningPathBySlug(slug: string): LearningPath | undefined {
  return learningPaths.find((p) => p.slug === slug);
}
