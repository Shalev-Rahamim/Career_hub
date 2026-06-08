"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

interface Question {
  question_id: string;
  question_text: string;
  category: string;
}

interface EvaluationDetail {
  question_id: string;
  score: number;
  rationale: string;
  model_answer: string;
  improved_phrasing: string;
}

interface EvaluationResult {
  overall_score: number;
  general_feedback: string;
  evaluations: EvaluationDetail[];
}

export default function InterviewSimulatorPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [solutionText, setSolutionText] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState<"easy" | "medium" | "hard">("medium");
  const [numQuestions, setNumQuestions] = useState(5);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Loading files indicators
  const [isLoadingDescFile, setIsLoadingDescFile] = useState(false);
  const [isLoadingSolFile, setIsLoadingSolFile] = useState(false);

  // Refs for file inputs
  const descFileRef = useRef<HTMLInputElement>(null);
  const solFileRef = useRef<HTMLInputElement>(null);

  // Simulation states
  const [interviewId, setInterviewId] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [qId: string]: string }>({});
  
  // Grading states
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  // Sample templates for testing
  const sampleAssignmentDesc = `Home Assignment Guidelines:
Develop a backend Cache Service in Python.
The cache must be fast, store key-value pairs, and run on a local server.
Requirements:
1. Thread safety for concurrent web requests.
2. Prevention of memory leaks under continuous operation.
3. Resilience against downstream API outages.`;

  const sampleStudentSolution = `class CacheService:
    def __init__(self):
        self.store = {}
        
    def get(self, key):
        # Read from dictionary
        return self.store.get(key)
        
    def set(self, key, value):
        # Insert value into dictionary
        self.store[key] = value`;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "desc" | "sol") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    // Show loading
    if (target === "desc") setIsLoadingDescFile(true);
    else setIsLoadingSolFile(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/api/interview/parse-file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "קריאת הקובץ נכשלה");
      }

      const data = await response.json();
      if (target === "desc") {
        setAssignmentDescription(data.text);
      } else {
        setSolutionText(data.text);
      }
    } catch (err: any) {
      setError(err.message || "שגיאה בפיענוח הקובץ. אנא העלה קובץ PDF או TXT תקין.");
    } finally {
      if (target === "desc") setIsLoadingDescFile(false);
      else setIsLoadingSolFile(false);
      // Reset input value
      e.target.value = "";
    }
  };

  const handleStartDefense = async () => {
    if (!assignmentDescription.trim()) {
      setError("אנא הזן או העלה את הנחיות המטלה");
      return;
    }
    if (!solutionText.trim()) {
      setError("אנא הזן או העלה את פתרון המטלה");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/interview/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": "test-user-uuid-12345",
        },
        body: JSON.stringify({
          assignment_description: assignmentDescription,
          solution_text: solutionText,
          difficulty_level: difficultyLevel,
          num_questions: numQuestions,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.detail || "נכשל בייצור שאלות הגנה מ-AI");
      }

      const data = await response.json();
      setInterviewId(data.interview_id);
      setQuestions(data.questions);
      
      // Initialize answer fields
      const initAnswers: { [qId: string]: string } = {};
      data.questions.forEach((q: Question) => {
        initAnswers[q.question_id] = "";
      });
      setAnswers(initAnswers);

      setStep(2);
    } catch (err: any) {
      setError(err.message || "שגיאה בחיבור לשרת ה-Backend. ודא שהשרת פועל כראוי.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerChange = (qId: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: text }));
  };

  const handleSubmitDefense = async () => {
    // Verify answers are not empty
    const unanswered = Object.values(answers).some((val) => !val.trim());
    if (unanswered) {
      setError("אנא מלא את כל התשובות לשאלות ההגנה לפני הגשה");
      return;
    }

    setIsEvaluating(true);
    setError(null);

    const formattedAnswers = Object.entries(answers).map(([qId, text]) => ({
      question_id: qId,
      answer_text: text,
    }));

    try {
      const response = await fetch("http://localhost:8000/api/interview/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interview_id: interviewId,
          assignment_description: assignmentDescription,
          solution_text: solutionText,
          answers: formattedAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error("הערכת התשובות נכשלה");
      }

      const data = await response.json();
      setEvaluation(data);
      setStep(3);
    } catch (err: any) {
      setError(err.message || "שגיאה בניתוח והערכת התשובות בשרת.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleRestart = () => {
    setStep(1);
    setAssignmentDescription("");
    setSolutionText("");
    setQuestions([]);
    setAnswers({});
    setEvaluation(null);
    setError(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 text-right font-sans" dir="rtl">
      {/* Background patterns */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] rounded-full bg-teal-100/20 blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-600 shadow-md shadow-teal-100">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                אימון <span className="text-teal-600 font-extrabold">AI</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-bold text-teal-600 hover:text-teal-700 bg-teal-50 px-4 py-2 rounded-full transition-all"
            >
              חזרה ללוח בקרה
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 relative z-10 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">סימולטור הגנה על משימות בית</h1>
          <p className="text-slate-500">העלו את הנחיות המטלה ואת הפתרון שלכם, ותרגלו התגוננות מפני שאלות קשות של רשי אצוות ומראיינים בדרגות קושי שונות.</p>
        </div>

        {/* Step Progression Bar */}
        <div className="max-w-xl w-full mx-auto bg-white border border-slate-200/80 rounded-2xl p-4 flex justify-between items-center shadow-sm text-xs font-bold text-slate-400">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-teal-600" : ""}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 1 ? "border-teal-600 bg-teal-50" : "border-slate-200"}`}>1</span>
            <span>העלאת פרויקט</span>
          </div>
          <div className="w-12 border-t border-slate-200"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-teal-600" : ""}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 2 ? "border-teal-600 bg-teal-50" : "border-slate-200"}`}>2</span>
            <span>סימולציית הגנה</span>
          </div>
          <div className="w-12 border-t border-slate-200"></div>
          <div className={`flex items-center gap-2 ${step >= 3 ? "text-teal-600" : ""}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 3 ? "border-teal-600 bg-teal-50" : "border-slate-200"}`}>3</span>
            <span>דוח הערכה</span>
          </div>
        </div>

        {/* STEP 1: Dual Input Ingestion Form */}
        {step === 1 && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-slate-100/55 max-w-5xl mx-auto w-full space-y-6">
            
            {/* Quick Template Loading */}
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setAssignmentDescription(sampleAssignmentDesc);
                  setSolutionText(sampleStudentSolution);
                }}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-teal-700 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                📄 טען מטלה ופתרון לדוגמה (Cache Service)
              </button>
            </div>

            {/* Two Column Layout for Description and Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Column 1: Assignment guidelines */}
              <div className="space-y-3 flex flex-col">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-800">1. הנחיות ודרישות המטלה (Assignment Instructions)</label>
                  <button
                    type="button"
                    onClick={() => descFileRef.current?.click()}
                    disabled={isLoadingDescFile}
                    className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 cursor-pointer bg-teal-50 px-2.5 py-1 rounded-lg"
                  >
                    {isLoadingDescFile ? "מפענח..." : "📤 העלה PDF / TXT"}
                  </button>
                  <input
                    type="file"
                    ref={descFileRef}
                    onChange={(e) => handleFileUpload(e, "desc")}
                    accept=".pdf,.txt"
                    className="hidden"
                  />
                </div>
                <textarea
                  value={assignmentDescription}
                  onChange={(e) => setAssignmentDescription(e.target.value)}
                  placeholder="הדבק כאן את הוראות המטלה, דרישות המערכת או תיאור הפרויקט שקיבלת..."
                  className="w-full h-80 px-4 py-3 border border-slate-200 rounded-2xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-right resize-none text-sm leading-relaxed"
                />
              </div>

              {/* Column 2: Student solution */}
              <div className="space-y-3 flex flex-col">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-800">2. פתרון המטלה שכתבת (Your Solution)</label>
                  <button
                    type="button"
                    onClick={() => solFileRef.current?.click()}
                    disabled={isLoadingSolFile}
                    className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 cursor-pointer bg-teal-50 px-2.5 py-1 rounded-lg"
                  >
                    {isLoadingSolFile ? "מפענח..." : "📤 העלה PDF / TXT"}
                  </button>
                  <input
                    type="file"
                    ref={solFileRef}
                    onChange={(e) => handleFileUpload(e, "sol")}
                    accept=".pdf,.txt"
                    className="hidden"
                  />
                </div>
                <textarea
                  value={solutionText}
                  onChange={(e) => setSolutionText(e.target.value)}
                  placeholder="הדבק כאן את קוד הפתרון שלך, תיאור הארכיטקטורה שמימשת או קובץ הטקסט של הפרויקט..."
                  className="w-full h-80 px-4 py-3 border border-slate-200 rounded-2xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-left font-mono text-xs leading-relaxed resize-none"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Wizard options: Difficulty and Questions Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
              
              {/* Difficulty Level Selector */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 block">רמת קושי של שאלות ההגנה</label>
                <div className="flex gap-3 max-w-md">
                  {(["easy", "medium", "hard"] as const).map((level) => {
                    const label = level === "easy" ? "קל" : level === "medium" ? "בינוני" : "קשה";
                    const color = level === "easy" ? "hover:border-emerald-350" : level === "medium" ? "hover:border-amber-350" : "hover:border-red-350";
                    const activeColor = level === "easy" ? "bg-emerald-600 border-emerald-600 text-white shadow-emerald-50" :
                                        level === "medium" ? "bg-amber-500 border-amber-500 text-white shadow-amber-50" :
                                        "bg-red-600 border-red-600 text-white shadow-red-50";
                    
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setDifficultyLevel(level)}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                          difficultyLevel === level
                            ? `${activeColor} shadow-md`
                            : `bg-white border-slate-200 text-slate-600 ${color}`
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Questions count select */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 block">מספר שאלות הגנה מבוקש (5 עד 10 שאלות)</label>
                <div className="flex gap-2 flex-wrap">
                  {[5, 6, 7, 8, 9, 10].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNumQuestions(n)}
                      className={`w-12 h-10 flex items-center justify-center text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                        numQuestions === n
                          ? "bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-50"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-350"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-150 rounded-2xl p-4 flex items-start gap-3 text-red-700 text-sm">
                <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {isGenerating ? (
              <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
                <p className="text-teal-800 font-bold text-sm">מנתח את המטלה והפתרון ומייצר שאלות הגנה מותאמות אישית לרמת {difficultyLevel === "easy" ? "קל" : difficultyLevel === "medium" ? "בינוני" : "קשה"}...</p>
              </div>
            ) : (
              <button
                onClick={handleStartDefense}
                className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-teal-100 hover:shadow-xl hover:translate-y-[-1px] transition-all cursor-pointer text-center text-lg active:scale-98"
              >
                התחילו בהגנה על המטלה
              </button>
            )}
          </div>
        )}

        {/* STEP 2: Defense Simulator (Questions) */}
        {step === 2 && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-slate-100/55 max-w-4xl mx-auto w-full space-y-8">
            <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800">סימולציית ההגנה התחילה</h3>
                <p className="text-slate-400 text-xs mt-1">ענו על שאלות ההגנה בצורה ממוקדת. הציפיות מותאמות לרמת קושי: {difficultyLevel === "easy" ? "קל" : difficultyLevel === "medium" ? "בינוני" : "קשה"}.</p>
              </div>
              <span className={`text-xs font-black px-3 py-1.5 rounded-lg text-white ${
                difficultyLevel === "easy" ? "bg-emerald-600" : difficultyLevel === "medium" ? "bg-amber-500" : "bg-red-650"
              }`}>
                רמת {difficultyLevel === "easy" ? "קל" : difficultyLevel === "medium" ? "בינוני" : "קשה"}
              </span>
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => (
                <div key={q.question_id} className="space-y-2 border-b border-slate-50 pb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                      {q.category}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">שאלה {idx + 1} מתוך {questions.length}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-base leading-relaxed text-left font-mono" dir="ltr">
                    {q.question_text}
                  </h4>
                  <textarea
                    value={answers[q.question_id] || ""}
                    onChange={(e) => handleAnswerChange(q.question_id, e.target.value)}
                    disabled={isEvaluating}
                    placeholder="הקלד כאן את ההתגוננות הטכנית וההסבר שלך לקוד באנגלית..."
                    className="w-full h-32 px-4 py-3 border border-slate-200 rounded-2xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-left font-mono text-sm resize-none"
                    dir="ltr"
                  />
                </div>
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-150 rounded-2xl p-4 flex items-start gap-3 text-red-700 text-sm">
                <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {isEvaluating ? (
              <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
                <p className="text-teal-800 font-bold text-sm">מעריך ומנתח את התשובות הטכניות מול מודלים אידיאליים לרמת {difficultyLevel === "easy" ? "קל" : difficultyLevel === "medium" ? "בינוני" : "קשה"}...</p>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={handleSubmitDefense}
                  className="flex-1 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-teal-100 hover:shadow-xl hover:translate-y-[-1px] transition-all cursor-pointer text-center text-base"
                >
                  שלח תשובות להערכה
                </button>
                <button
                  onClick={handleRestart}
                  className="px-6 py-4 bg-white border border-slate-200 hover:border-slate-350 text-slate-600 font-bold rounded-2xl transition-all cursor-pointer"
                >
                  התחל מחדש
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Analytical Grading Dashboard */}
        {step === 3 && evaluation && (
          <div className="space-y-8">
            
            {/* Top Score Indicator */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-md shadow-slate-100/50 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto w-full">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="46"
                      stroke="#f1f5f9"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="46"
                      stroke="url(#tealGradient)"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={289.02}
                      strokeDashoffset={289.02 - (289.02 * evaluation.overall_score) / 100}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0d9488" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute text-2xl font-black text-slate-900">{evaluation.overall_score}</span>
                </div>
                <div className="space-y-1 text-center sm:text-right">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <h3 className="font-bold text-slate-800 text-lg">ציון הגנה כללי</h3>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded text-white ${
                      difficultyLevel === "easy" ? "bg-emerald-600" : difficultyLevel === "medium" ? "bg-amber-500" : "bg-red-655"
                    }`}>
                      רמת {difficultyLevel === "easy" ? "קל" : difficultyLevel === "medium" ? "בינוני" : "קשה"}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                    {evaluation.general_feedback}
                  </p>
                </div>
              </div>

              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-teal-50 cursor-pointer whitespace-nowrap"
              >
                הרצת משימה חדשה
              </button>
            </div>

            {/* Detailed Question grading comparison list */}
            <div className="space-y-6 max-w-4xl mx-auto w-full">
              <h3 className="font-bold text-slate-800 text-lg">פירוט ציונים ומשוב לכל שאלה</h3>
              
              {evaluation.evaluations.map((item, idx) => {
                const questionText = questions.find(q => q.question_id === item.question_id)?.question_text || "";
                return (
                  <div key={item.question_id} className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-md shadow-slate-100/50 space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="font-bold text-slate-800 text-sm">שאלה {idx + 1}</span>
                      <span className={`font-bold px-3 py-1 rounded-full text-xs ${
                        item.score >= 85 ? "bg-emerald-50 text-emerald-700" :
                        item.score >= 70 ? "bg-amber-50 text-amber-700" :
                        "bg-red-50 text-red-700"
                      }`}>
                        ציון: {item.score}
                      </span>
                    </div>

                    {/* Question Text */}
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-400 block">שאלה שנשאלה:</span>
                      <p className="font-bold text-slate-800 text-sm leading-relaxed text-left font-mono" dir="ltr">
                        {questionText}
                      </p>
                    </div>

                    {/* Rationale feedback */}
                    <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 text-xs leading-relaxed text-slate-600">
                      <span className="font-bold text-teal-800 block mb-1">משוב הבוחן (בעברית):</span>
                      <p>{item.rationale}</p>
                    </div>

                    {/* Phrasing comparison grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-50 pt-4">
                      {/* Candidate Answer */}
                      <div className="bg-slate-50/50 rounded-xl p-4 space-y-1">
                        <span className="text-xs font-bold text-slate-400 block">התשובה שכתבת:</span>
                        <p className="text-xs text-slate-700 text-left font-mono" dir="ltr">
                          {answers[item.question_id] || "לא ניתנה תשובה."}
                        </p>
                      </div>

                      {/* Phrasing correction */}
                      <div className="bg-teal-50/20 border border-teal-50/80 rounded-xl p-4 space-y-1">
                        <span className="text-xs font-bold text-teal-700 block">ניסוח מומלץ באנגלית (Senior Technical Phrasing):</span>
                        <p className="text-xs text-slate-800 font-bold text-left font-mono leading-relaxed" dir="ltr">
                          {item.improved_phrasing}
                        </p>
                      </div>
                    </div>

                    {/* Ideal Model Answer */}
                    <div className="bg-emerald-50/10 border-t border-emerald-50/50 pt-3">
                      <span className="text-xs font-bold text-emerald-800 block">תשובת מודל אידיאלית (Ideal Answer Reference):</span>
                      <p className="text-xs text-slate-500 text-left font-mono leading-relaxed mt-1" dir="ltr">
                        {item.model_answer}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
