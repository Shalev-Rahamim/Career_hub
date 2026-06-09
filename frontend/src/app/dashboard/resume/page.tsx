"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Recommendation {
  recommendation_id: string;
  section: string;
  original_text: string;
  suggested_text: string;
  rationale: string;
}

interface AnalysisData {
  resume_id: string;
  original_text: string;
  score: number;
  points_to_keep: string[];
  points_to_improve: string[];
  dynamic_recommendations: Recommendation[];
  optimized_resume_text: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ResumeOptimizerPage() {
  // Input states
  const [file, setFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState("");
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [language, setLanguage] = useState<"hebrew" | "english">("hebrew");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  // Analysis result states
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [copied, setCopied] = useState(false);

  // Chat states
  const [sessionId, setSessionId] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSendingChat, setIsSendingChat] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize session ID on mount
  useEffect(() => {
    setSessionId(`session-${Math.random().toString(36).substring(2, 11)}`);
  }, []);

  // Scroll chat window to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setRawText("");
      
      if (pdfPreviewUrl) {
        URL.revokeObjectURL(pdfPreviewUrl.split("#")[0]);
      }
      
      // Append PDF open parameters to hide sidebar, fit width, and zoom in
      const localUrl = URL.createObjectURL(selectedFile);
      setPdfPreviewUrl(`${localUrl}#view=FitH&zoom=130&navpanes=0&toolbar=0`);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !rawText.trim()) {
      setError("אנא העלה קובץ PDF או הזן את טקסט קורות החיים שלך");
      return;
    }

    setIsUploading(true);
    setError(null);
    setAnalysis(null);
    setChatMessages([]);
    setStatusMessage("מחלץ טקסט ומנתח קורות חיים עם מנוע ה-AI...");

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else {
      formData.append("raw_text", rawText);
    }
    formData.append("language", language);

    try {
      const response = await fetch("http://localhost:8000/api/resume/analyze", {
        method: "POST",
        headers: {
          "X-User-ID": "test-user-uuid-12345",
        },
        body: formData,
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.detail || "ניתוח קורות החיים נכשל");
      }

      const data: AnalysisData = await response.json();
      setAnalysis(data);
    } catch (err: any) {
      setError(err.message || "שגיאה בחיבור לשרת ה-Backend. ודא שהשרת פועל כראוי.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !analysis) return;

    const userMsg = inputMessage.trim();
    setInputMessage("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsSendingChat(true);

    try {
      const response = await fetch("http://localhost:8000/api/resume/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          resume_id: analysis.resume_id,
          user_message: userMsg,
        }),
      });

      if (!response.ok) {
        throw new Error("נכשל בקבלת תגובה מה-AI");
      }

      const data = await response.json();
      setChatMessages((prev) => [...prev, { role: "assistant", content: data.response }]);

      if (data.updated_resume_text && data.updated_resume_text !== analysis.optimized_resume_text) {
        setAnalysis((prev) => (prev ? { ...prev, optimized_resume_text: data.updated_resume_text } : null));
      }
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: `מתנצל, התרחשה שגיאה: ${err.message}` },
      ]);
    } finally {
      setIsSendingChat(false);
    }
  };

  const copyToClipboard = () => {
    if (!analysis) return;
    navigator.clipboard.writeText(analysis.optimized_resume_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to detect if a text block contains Hebrew characters
  const isHebrewText = (text: string): boolean => {
    const hebrewPattern = /[\u0590-\u05FF]/;
    return hebrewPattern.test(text);
  };

  const isOptimizedHebrew = analysis ? isHebrewText(analysis.optimized_resume_text) : true;

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 text-right" dir="rtl">
      {/* Background patterns */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-100/20 blur-3xl pointer-events-none" />

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
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 relative z-10 flex flex-col gap-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">אופטימיזציית קורות חיים</h1>
          <p className="text-slate-500">העלו את קורות החיים שלכם וקבלו ניתוח התאמה מעמיק עם גרסה משופרת לשימוש מיידי.</p>
        </div>

        {/* Form and Upload Section (Only shown if no analysis yet) */}
        {!analysis && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-slate-100/55 max-w-3xl mx-auto w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Language Selection Toggle */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 block">בחר שפת משוב וניתוח (AI Output Language)</label>
                <div className="flex bg-slate-100 p-1.5 rounded-xl max-w-md w-full gap-1">
                  <button
                    type="button"
                    onClick={() => setLanguage("hebrew")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                      language === "hebrew"
                        ? "bg-white text-teal-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    עברית (עבור משוב בעברית)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("english")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                      language === "english"
                        ? "bg-white text-teal-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    English (Feedback in English)
                  </button>
                </div>
              </div>

              {/* PDF File Upload */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 block">העלאת קובץ קורות חיים (PDF)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:border-teal-500 hover:bg-slate-50/50 transition-all text-center cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    {file ? (
                      <p className="text-slate-800 font-semibold">{file.name}</p>
                    ) : (
                      <>
                        <p className="text-slate-700 font-semibold">גררו לכאן את קובץ ה-PDF או לחצו לבחירה</p>
                        <p className="text-slate-400 text-xs">תמיכה בקבצי PDF עד נפח של 5MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative flex py-2 items-center justify-center">
                <div className="flex-grow border-t border-slate-150"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase">או הדביקו טקסט</span>
                <div className="flex-grow border-t border-slate-150"></div>
              </div>

              {/* Raw Text Area */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 block">הזנת קורות חיים כטקסט חופשי</label>
                <textarea
                  value={rawText}
                  onChange={(e) => {
                    setRawText(e.target.value);
                    if (file) {
                      setFile(null);
                      setPdfPreviewUrl(null);
                    }
                  }}
                  disabled={isUploading}
                  placeholder="הדביקו כאן את הטקסט של קורות החיים שלכם במלואו..."
                  className={`w-full h-48 px-4 py-3 border border-slate-200 rounded-2xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all resize-none text-sm ${language === "hebrew" ? "text-right font-sans" : "text-left font-mono"}`}
                  dir={language === "hebrew" ? "rtl" : "ltr"}
                />
              </div>

              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 border border-red-150 rounded-2xl p-4 flex items-start gap-3 text-red-700 text-sm">
                  <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button & Progress */}
              {isUploading ? (
                <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
                  <p className="text-teal-800 font-bold text-sm">{statusMessage}</p>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-teal-100 hover:shadow-xl hover:translate-y-[-1px] transition-all cursor-pointer text-center text-lg active:scale-98"
                >
                  נתחו ושפרו את קורות החיים שלי
                </button>
              )}
            </form>
          </div>
        )}

        {/* Results Dashboard */}
        {analysis && (
          <div className="space-y-10">
            
            {/* Top Row: Left - Original PDF Visual representation | Right - Score, Strengths, Weaknesses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Visual paper representation / iframe for PDF of original resume */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-md shadow-slate-100/50 flex flex-col h-[520px]">
                <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="font-bold text-slate-700 text-sm">קורות החיים המקוריים (תצוגה מקדימה)</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-bold">PDF / טקסט מקור</span>
                </div>
                
                {/* PDF preview or Fallback text preview */}
                <div className="flex-1 overflow-hidden bg-slate-50 rounded-2xl border border-slate-150 flex flex-col">
                  {pdfPreviewUrl ? (
                    <iframe
                      src={pdfPreviewUrl}
                      className="w-full h-full border-none"
                      title="Original PDF Resume View"
                    />
                  ) : (
                    <div className="p-6 overflow-y-auto w-full h-full shadow-inner flex flex-col">
                      <div className="bg-white border border-slate-200 p-6 shadow-sm rounded-lg min-h-[600px] font-sans text-xs leading-relaxed text-slate-800 whitespace-pre-wrap select-text text-right max-w-xl mx-auto w-full">
                        {analysis.original_text}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Score Wheel, Points to Keep, Points to Improve */}
              <div className="flex flex-col gap-6 h-[520px]">
                {/* Score card */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-md shadow-slate-100/50 flex flex-col sm:flex-row items-center gap-6">
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
                        strokeDashoffset={289.02 - (289.02 * analysis.score) / 100}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#0d9488" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute text-2xl font-black text-slate-900">{analysis.score}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg mb-1">ציון מוכנות לקריירה</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      הציון משקף את התאמת קורות החיים שלך לסטנדרט התעשייה. עיין בחוזקות ובנקודות לשיפור שזוהו על ידי מנוע ה-AI כדי להעלות את הציון.
                    </p>
                  </div>
                </div>

                {/* Keep & Improve Columns in a split card container */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-md shadow-slate-100/50 flex-1 flex flex-col gap-4 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto flex-1 pr-1">
                    
                    {/* Strengths */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-emerald-700 flex items-center gap-2 pb-2 border-b border-emerald-100">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>נקודות חוזק לשימור</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {analysis.points_to_keep.map((pt, i) => (
                          <li key={i} className="bg-emerald-50/40 border-r-4 border-emerald-500 pr-3 py-2 rounded-l-md leading-relaxed">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-amber-700 flex items-center gap-2 pb-2 border-b border-amber-100">
                        <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>טעון שיפור</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {analysis.points_to_improve.map((pt, i) => (
                          <li key={i} className="bg-amber-50/40 border-r-4 border-amber-500 pr-3 py-2 rounded-l-md leading-relaxed">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Left - Optimized Resume text block | Right - AI Chat client */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Optimized Resume */}
              <div className="bg-white border border-slate-200/80 rounded-3xl shadow-md shadow-slate-100/50 overflow-hidden flex flex-col h-[520px]">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-teal-600"></div>
                    <h3 className="font-bold text-slate-800 text-sm">גרסת קורות חיים משופרת (ATS)</h3>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>הועתק בהצלחה!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        <span>העתק קורות חיים משופרים</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto bg-slate-50/50">
                  <div 
                    dir={isOptimizedHebrew ? "rtl" : "ltr"}
                    className={`bg-white border border-slate-150 rounded-2xl p-6 min-h-[500px] font-sans text-xs leading-relaxed text-slate-800 whitespace-pre-wrap select-all max-w-xl mx-auto w-full shadow-sm ${
                      isOptimizedHebrew ? "text-right" : "text-left"
                    }`}
                  >
                    {analysis.optimized_resume_text}
                  </div>
                </div>
              </div>

              {/* Right Column: AI Chat Panel */}
              <div className="bg-white border border-slate-200/80 rounded-3xl shadow-md shadow-slate-100/50 overflow-hidden flex flex-col h-[520px]">
                {/* Chat Header */}
                <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">התייעצות צ׳אט חיה על קורות החיים</h3>
                      <p className="text-slate-400 text-xs">שאל את ה-AI שאלות על ניסוחים, הוספת ניסיון או התאמות למשרות ספציפיות</p>
                    </div>
                  </div>
                </div>

                {/* Chat Message Window */}
                <div className="flex-1 p-6 overflow-y-auto bg-slate-50/30 space-y-4">
                  {chatMessages.length === 0 && (
                    <div className="text-center text-slate-400 text-sm py-10">
                      <p>אין הודעות בצ׳אט עדיין.</p>
                      <p className="text-xs mt-1">רשום למשל: ״כיצד ניתן לנסח מחדש את סעיף ניהול הפרויקטים שלי בצורה טובה יותר?״</p>
                    </div>
                  )}
                   {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        dir="auto"
                        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-teal-600 text-white rounded-tr-none text-right"
                            : "bg-white border border-slate-200 text-slate-800 rounded-tl-none text-right"
                        }`}
                      >
                        <p className="whitespace-pre-wrap font-sans" dir="auto">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isSendingChat && (
                    <div className="flex justify-end">
                      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                        </span>
                        <span className="text-xs text-slate-400">כותב תשובה...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input form */}
                <form onSubmit={handleSendChat} className="p-4 border-t border-slate-200/80 bg-white flex gap-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="הקלד הודעה להתייעצות על קורות החיים שלך..."
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm bg-slate-50/50"
                    disabled={isSendingChat}
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isSendingChat}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-teal-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>שלח</span>
                    <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9-2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
