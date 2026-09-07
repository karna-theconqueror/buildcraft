"use client";

import { useProgressStore } from "@/store/progress";
import { Award, Download, Share2 } from "lucide-react";

export default function Certificate({ tutorialSlug, title }: { tutorialSlug: string; title: string }) {
  const completedTutorials = useProgressStore((s) => s.completedTutorials);
  const isCompleted = completedTutorials.includes(tutorialSlug);

  // Escape HTML to prevent XSS
  const escapeHtml = (str: string) => str.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return map[c] || c;
  });
  const safeTitle = escapeHtml(title);

  if (!isCompleted) return null;

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownload = () => {
    const certContent = `
      <html>
      <head>
        <style>
          body { font-family: Georgia, serif; text-align: center; padding: 40px; }
          .border { border: 3px solid #f97316; padding: 60px; max-width: 800px; margin: 0 auto; }
          h1 { color: #f97316; font-size: 36px; margin-bottom: 10px; }
          h2 { color: #333; font-size: 24px; margin: 20px 0; }
          p { color: #666; font-size: 16px; line-height: 1.8; }
          .name { font-size: 28px; color: #000; font-weight: bold; }
          .date { color: #999; margin-top: 30px; }
          .logo { font-size: 48px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="border">
          <div class="logo">🔨</div>
          <h1>Certificate of Completion</h1>
          <h2>BuildCraft</h2>
          <p>This certifies that you have successfully completed</p>
          <p class="name">${safeTitle}</p>
          <p>on ${date}</p>
          <p class="date">BuildCraft - Master Programming by Building</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([certContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `buildcraft-certificate-${tutorialSlug}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const text = `I just completed "${title}" on BuildCraft! 🔨`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "BuildCraft Certificate", text });
      } else {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // Silently handle share/clipboard errors
    }
  };

  return (
    <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Award className="h-8 w-8 text-green-500" />
        <div>
          <h3 className="text-lg font-semibold text-green-400">Congratulations!</h3>
          <p className="text-sm text-gray-400">You completed this tutorial</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors"
        >
          <Download className="h-4 w-4" />
          Download Certificate
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>
    </div>
  );
}
