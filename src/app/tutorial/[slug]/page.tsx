"use client";

import { useParams } from "next/navigation";
import { getTutorialBySlug, getTutorialsByCategory } from "@/data/tutorials";
import { useProgressStore } from "@/store/progress";
import CodeEditor from "@/components/CodeEditor";
import StepProgress from "@/components/StepProgress";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Star,
  Code2,
  BookOpen,
  CheckCircle2,
  Video,
  ExternalLink,
} from "lucide-react";
import { getDifficultyColor } from "@/lib/utils";
import Certificate from "@/components/Certificate";
import Confetti from "@/components/Confetti";

export default function TutorialPage() {
  const params = useParams();
  const slug = params.slug as string;
  const tutorial = getTutorialBySlug(slug);
  const [currentStep, setCurrentStep] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const startTutorial = useProgressStore((s) => s.startTutorial);
  const completeTutorial = useProgressStore((s) => s.completeTutorial);
  const completeStep = useProgressStore((s) => s.completeStep);
  const completedTutorials = useProgressStore((s) => s.completedTutorials);
  const completedSteps = useProgressStore((s) => s.completedSteps);

  useEffect(() => {
    if (tutorial) {
      startTutorial(tutorial.slug);
      document.title = `${tutorial.title} | BuildCraft`;
    }
  }, [tutorial, startTutorial]);

  if (!tutorial) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Tutorial not found</h1>
          <Link href="/" className="text-orange-400 hover:text-orange-300">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = completedTutorials.includes(tutorial.slug);
  const tutorialCompletedSteps = completedSteps[tutorial.slug] || [];
  const allStepsCompleted =
    tutorialCompletedSteps.length === tutorial.steps.length;

  const handleStepComplete = () => {
    completeStep(tutorial.slug, currentStep);
    if (currentStep < tutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCodeComplete = () => {
    if (allStepsCompleted) {
      completeTutorial(tutorial.slug);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }
  };

  const relatedTutorials = getTutorialsByCategory(tutorial.category)
    .filter((t) => t.slug !== tutorial.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Confetti active={showConfetti} />
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/category/${tutorial.category}`}
          className="hover:text-white transition-colors capitalize"
        >
          {tutorial.category.replace("-", " & ")}
        </Link>
        <span>/</span>
        <span className="text-white">{tutorial.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${getDifficultyColor(
              tutorial.difficulty
            )}`}
          >
            {tutorial.difficulty}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-400">
            <Clock className="h-4 w-4" />
            {tutorial.estimatedTime}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-400">
            <Star className="h-4 w-4 text-yellow-500" />
            {tutorial.stars.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-400">
            <Code2 className="h-4 w-4" />
            {tutorial.languages.join(", ")}
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-sm text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              Completed
            </span>
          )}
        </div>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          {tutorial.title}
        </h1>
        <p className="max-w-3xl text-lg text-gray-400">
          {tutorial.description}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Steps Navigation */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-300">
              <BookOpen className="h-4 w-4" />
              Tutorial Steps
            </h3>
            <StepProgress
              tutorialSlug={tutorial.slug}
              steps={tutorial.steps}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </div>

          {/* Progress */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-orange-400">
                {tutorialCompletedSteps.length}/{tutorial.steps.length}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all"
                style={{
                  width: `${
                    (tutorialCompletedSteps.length / tutorial.steps.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Related Tutorials */}
          {relatedTutorials.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="mb-4 text-sm font-medium text-gray-300">
                Related Tutorials
              </h3>
              <div className="space-y-3">
                {relatedTutorials.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tutorial/${t.slug}`}
                    className="block rounded-lg p-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    {t.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Step Content */}
          {showContent && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Step {currentStep + 1}: {tutorial.steps[currentStep].title}
                </h2>
                <button
                  onClick={() => setShowContent(false)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Hide instructions
                </button>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">
                  {tutorial.steps[currentStep].content}
                </p>
                {tutorial.steps[currentStep].hint && (
                  <div className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
                    <p className="text-sm text-yellow-400">
                      💡 Hint: {tutorial.steps[currentStep].hint}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={handleStepComplete}
                  disabled={tutorialCompletedSteps.includes(currentStep)}
                  className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {tutorialCompletedSteps.includes(currentStep)
                    ? "Step Completed"
                    : "Mark Step Complete"}
                </button>
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex items-center gap-1 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </button>
                )}
                {currentStep < tutorial.steps.length - 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="flex items-center gap-1 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {!showContent && (
            <button
              onClick={() => setShowContent(true)}
              className="text-sm text-orange-400 hover:text-orange-300"
            >
              Show instructions
            </button>
          )}

          {/* Code Editor */}
          <CodeEditor
            initialCode={tutorial.starterCode}
            solutionCode={tutorial.solutionCode}
            tests={tutorial.tests}
            language={
              tutorial.languages[0]?.toLowerCase() === "python"
                ? "python"
                : "javascript"
            }
            onComplete={handleCodeComplete}
          />

          {/* Tests */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-4 text-lg font-semibold">Test Cases</h3>
            <div className="space-y-3">
              {tutorial.tests.map((test, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-3"
                >
                  <div>
                    <div className="text-sm font-medium">{test.name}</div>
                    <div className="text-xs text-gray-400">
                      Input: {test.input}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    Expected: {test.expectedOutput}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate */}
          <Certificate tutorialSlug={tutorial.slug} title={tutorial.title} />

          {/* Resources */}
          {(tutorial.videoUrl || tutorial.articleUrl) && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-lg font-semibold">Additional Resources</h3>
              <div className="flex flex-wrap gap-3">
                {tutorial.videoUrl && (
                  <a
                    href={tutorial.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    <Video className="h-4 w-4 text-red-500" />
                    Watch Video Tutorial
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {tutorial.articleUrl && (
                  <a
                    href={tutorial.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    Read Article
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
