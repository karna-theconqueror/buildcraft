import { Hammer } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Hammer className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold">BuildCraft</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Master programming by building your favorite technologies from
              scratch.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/category/ai-ml" className="hover:text-white transition-colors">AI & ML</Link></li>
              <li><Link href="/category/backend" className="hover:text-white transition-colors">Backend</Link></li>
              <li><Link href="/category/database" className="hover:text-white transition-colors">Database</Link></li>
              <li><Link href="/category/frontend" className="hover:text-white transition-colors">Frontend</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Learning</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/paths" className="hover:text-white transition-colors">Learning Paths</Link></li>
              <li><Link href="/?difficulty=beginner" className="hover:text-white transition-colors">Beginner</Link></li>
              <li><Link href="/?difficulty=intermediate" className="hover:text-white transition-colors">Intermediate</Link></li>
              <li><Link href="/?difficulty=advanced" className="hover:text-white transition-colors">Advanced</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Community</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-gray-400">
          <p>
            Built with 💪 by the community. Inspired by{" "}
            <a
              href="https://github.com/codecrafters-io/build-your-own-x"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-400"
            >
              build-your-own-x
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
