"use client";

import Link from "next/link";
import { CategoryInfo } from "@/types";
import {
  Brain, Server, Database, Container, Layout,
  Gamepad2, Code2, Globe, Monitor, Shield,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="h-6 w-6" />,
  Server: <Server className="h-6 w-6" />,
  Database: <Database className="h-6 w-6" />,
  Container: <Container className="h-6 w-6" />,
  Layout: <Layout className="h-6 w-6" />,
  Gamepad2: <Gamepad2 className="h-6 w-6" />,
  Code2: <Code2 className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
  Monitor: <Monitor className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
};

export default function CategoryCard({ category }: { category: CategoryInfo }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 transition-all hover:border-white/20 hover:shadow-lg hover:shadow-orange-500/10"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}
      />
      <div className="relative">
        <div
          className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${category.color} p-3 text-white`}
        >
          {iconMap[category.icon] || <Code2 className="h-6 w-6" />}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-400">{category.description}</p>
      </div>
    </Link>
  );
}
