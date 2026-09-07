<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Tutorials-465-orange" alt="Tutorials">
  <img src="https://img.shields.io/badge/Languages-24-green" alt="Languages">
  <img src="https://img.shields.io/badge/Categories-20-purple" alt="Categories">
</p>

<h1 align="center">BuildCraft</h1>

<p align="center">
  <strong>Build Your Own X — Interactive Edition</strong><br>
  Master programming by recreating your favorite technologies from scratch.<br>
  465+ interactive tutorials with live code editors, auto-grading, and progress tracking.
</p>

---

## Why BuildCraft?

Reading documentation is passive. Building things is how you actually learn.

BuildCraft turns the popular "Build Your Own X" concept into an interactive web app. Instead of reading static markdown files, you get:

- **Live code editors** with Monaco (the same engine as VS Code)
- **Real-time test validation** that checks your implementation
- **Step-by-step guided tutorials** with hints and explanations
- **Progress tracking** across all tutorials
- **Certificates of completion** for each finished project
- **Dark/light mode** for comfortable coding sessions
- **Cmd+K search** to instantly find any tutorial

---

## Features

### Interactive Code Editor
- Monaco Editor with syntax highlighting for 24+ languages
- Run tests directly in the browser
- Reset code to starter template or view the solution

### Tutorial System
- 465 tutorials across 20 categories
- Each tutorial has 2-5 guided steps with explanations
- Hints available when you're stuck
- Related tutorials suggested on every page

### Progress Tracking
- Automatic progress saving (localStorage)
- Continue where you left off
- Completion percentages per category and learning path
- Bookmarks/favorites for tutorials you want to revisit
- Reset progress option

### Learning Paths
6 structured curricula that take you from beginner to expert:
- **Backend Engineer** — HTTP servers, APIs, message queues, load balancers
- **AI Engineer** — Vector databases, embeddings, RAG, LLMs, agents
- **Full Stack Developer** — Web servers, React, databases, auth
- **Systems Programmer** — Shells, compilers, OS kernels, VMs
- **Game Developer** — 3D engines, physics, game engines, ray tracers
- **DevOps Engineer** — Docker, CI/CD, monitoring, service meshes

### 20 Categories
| | | | |
|---|---|---|---|
| AI/ML | Backend | Blockchain | Chat |
| Database | DevOps | Embedded | Frontend |
| Game | Language | Math/Science | Mobile |
| Network | OS | Payments | Robotics |
| Search | Security | Testing | Web |

### 24 Languages
Assembly, C, C++, CSS, Dart, GLSL, Go, Haskell, Java, JavaScript, Julia, Kotlin, Lua, Node.js, Python, React, Ruby, Rust, Scheme, Solidity, Swift, SystemVerilog, TypeScript, Verilog

---

## Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/karna-theconqueror/buildcraft.git
cd buildcraft
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
buildcraft/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage with stats, search, trending
│   │   ├── layout.tsx          # Root layout with ThemeProvider
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── sitemap.ts          # Auto-generated sitemap
│   │   ├── robots.ts           # Robots.txt
│   │   ├── loading.tsx         # Homepage loading skeleton
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx    # Category page with filters
│   │   │       └── loading.tsx
│   │   ├── tutorial/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx    # Tutorial detail page
│   │   │       └── loading.tsx
│   │   ├── paths/
│   │   │   └── page.tsx        # Learning paths overview
│   │   └── languages/
│   │       └── page.tsx        # Browse by language
│   ├── components/
│   │   ├── CodeEditor.tsx      # Monaco editor with test runner
│   │   ├── Confetti.tsx        # Completion celebration animation
│   │   ├── Navbar.tsx          # Navigation with search, mobile menu
│   │   ├── Footer.tsx          # Site footer
│   │   ├── ThemeToggle.tsx     # Dark/light mode toggle
│   │   ├── SearchModal.tsx     # Cmd+K search modal
│   │   ├── TutorialCard.tsx    # Tutorial preview card
│   │   ├── CategoryCard.tsx    # Category card with icon
│   │   ├── ProgressBar.tsx     # Global progress display
│   │   ├── StepProgress.tsx    # Tutorial step indicator
│   │   ├── Certificate.tsx     # Completion certificate (downloadable)
│   │   ├── SearchResults.tsx   # Search results display
│   │   └── Skeletons.tsx       # Loading skeleton components
│   ├── data/
│   │   ├── tutorials.ts        # 465 tutorials with code, tests, steps
│   │   ├── categories.ts       # 20 categories with colors/icons
│   │   └── paths.ts            # 6 learning paths
│   ├── store/
│   │   └── progress.ts         # Zustand store with persistence
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
├── next.config.ts              # Next.js config with security headers
├── tailwind.config.ts          # Tailwind configuration
└── package.json                # Dependencies
```

---

## Key Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd + K` / `Ctrl + K` | Open search |
| `Escape` | Close search/modal |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Monaco Editor** | VS Code-powered code editor |
| **Zustand** | Lightweight state management |
| **next-themes** | Dark/light mode |
| **Lucide React** | Icon library |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding a Tutorial

Tutorials are defined in `src/data/tutorials.ts`. Each tutorial needs:

```typescript
{
  slug: "build-your-own-thing",
  title: "Build Your Own Thing",
  description: "What you'll build",
  category: "backend",          // must match a category slug
  difficulty: "intermediate",   // beginner | intermediate | advanced
  estimatedTime: "5 hours",
  languages: ["Go", "Python"],
  icon: "Server",               // lucide-react icon name
  stars: 1200,
  steps: [
    { title: "Step 1", content: "Explanation..." },
    { title: "Step 2", content: "Explanation...", hint: "Optional hint" },
  ],
  starterCode: "// Start here...",
  solutionCode: "// Complete solution...",
  tests: [
    { name: "Test 1", input: "test input", expectedOutput: "expected" },
  ],
  videoUrl: "https://...",      // optional
  articleUrl: "https://...",    // optional
}
```

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/karna-theconqueror/buildcraft)

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### Static Export

```bash
npm run build
# Output in .next/static
```

---

## Security

- `X-Frame-Options: DENY` — prevents clickjacking
- `X-Content-Type-Options: nosniff` — prevents MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` — limits referrer info
- XSS protection via HTML escaping in certificate generation
- All external links use `rel="noopener noreferrer"`

---

## License

MIT

---

<p align="center">
  Built with care by <a href="https://github.com/karna-theconqueror">karna-theconqueror</a>
</p>
