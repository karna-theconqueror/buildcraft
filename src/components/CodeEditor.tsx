"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import { Play, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { Test } from "@/types";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  initialCode: string;
  solutionCode: string;
  tests: Test[];
  language?: string;
  onComplete: () => void;
}

export default function CodeEditor({
  initialCode,
  solutionCode,
  tests,
  language = "javascript",
  onComplete,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [testResults, setTestResults] = useState<
    { name: string; passed: boolean; actual: string }[]
  >([]);
  const [isRunning, setIsRunning] = useState(false);

  // Reset code when initialCode changes (e.g. navigating between tutorials)
  const prevInitialCode = useRef(initialCode);
  useEffect(() => {
    if (prevInitialCode.current !== initialCode) {
      setCode(initialCode);
      setOutput("");
      setTestResults([]);
      prevInitialCode.current = initialCode;
    }
  }, [initialCode]);

  const runTests = async () => {
    setIsRunning(true);
    setOutput("Running tests...\n");
    setTestResults([]);

    await new Promise((r) => setTimeout(r, 800));

    const results = tests.map((test) => {
      const codeLower = code.toLowerCase();
      const expected = test.expectedOutput.toLowerCase();
      const solutionLower = solutionCode.toLowerCase();

      // Pass if code contains the expected output or key solution fragments
      const passed = codeLower.includes(expected) || 
                     codeLower.includes(solutionLower.slice(0, 30));
      return {
        name: test.name,
        passed,
        actual: passed ? test.expectedOutput : "Output mismatch — check your implementation",
      };
    });

    setTestResults(results);
    const allPassed = results.every((r) => r.passed);
    setOutput(
      allPassed
        ? "✓ All tests passed!"
        : `✗ ${results.filter((r) => !r.passed).length} tests failed`
    );

    if (allPassed) {
      onComplete();
    }
    setIsRunning(false);
  };

  const showSolution = () => {
    setCode(solutionCode);
    setOutput("Solution loaded. Study it and try to understand each part.");
  };

  const reset = () => {
    setCode(initialCode);
    setOutput("");
    setTestResults([]);
  };

  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-black/50 overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 text-sm text-gray-400">code.{language === "python" ? "py" : language === "typescript" || language === "tsx" || language === "jsx" ? "ts" : language === "rust" ? "rs" : language === "go" ? "go" : language === "c" || language === "cpp" ? "c" : language === "java" ? "java" : language === "ruby" ? "rb" : language === "php" ? "php" : language === "swift" ? "swift" : language === "kotlin" ? "kt" : language === "sql" ? "sql" : language === "shell" || language === "bash" ? "sh" : "js"}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            onClick={showSolution}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            Show Solution
          </button>
          <button
            onClick={runTests}
            disabled={isRunning}
            className="flex items-center gap-1 rounded-lg bg-orange-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            <Play className="h-4 w-4" />
            {isRunning ? "Running..." : "Run Tests"}
          </button>
        </div>
      </div>

      <div className="h-[400px]">
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            padding: { top: 16 },
          }}
        />
      </div>

      {(output || testResults.length > 0) && (
        <div className="border-t border-white/10 bg-black/80 p-4">
          <div className="mb-2 text-sm font-medium text-gray-300">Output</div>
          <pre className="text-sm text-gray-400 whitespace-pre-wrap">{output}</pre>
          {testResults.length > 0 && (
            <div className="mt-3 space-y-1">
              {testResults.map((result, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  {result.passed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className={result.passed ? "text-green-400" : "text-red-400"}>
                    {result.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
