import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-teal-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] rounded-full bg-emerald-200/10 blur-3xl pointer-events-none" />

      {/* Navigation Header (Logged In state) */}
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-100/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Right Side: Logo */}
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

          {/* Left Side: Logout Button */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-sm font-semibold text-slate-500">משתמש זמני</span>
            <Link 
              href="/" 
              className="inline-flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-full transition-all duration-200"
              title="התנתקות מהמערכת"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-16 flex flex-col items-center">
        
        {/* Welcome Header */}
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
            שלום, מוכן לשלב הבא בקריירה שלך?
          </h1>
          <p className="text-slate-500">
            בחר את הכלי שברצונך להפעיל כדי להתחיל בתרגול או בשיפור קורות החיים:
          </p>
        </div>

        {/* Dashboard Grid Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-12">
          
          {/* Card 1: Resume Builder */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-100/60 flex flex-col items-center text-center transform transition-all hover:scale-[1.02] duration-200 relative group">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-200">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">שדרוג קורות חיים</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs flex-1">
              העלו קורות חיים בפורמט PDF , קבלו דוח ניתוח מפורט מבוסס AI והעתיקו ניסוחים משופרים ישירות לקובץ שלכם.
            </p>
            <Link
              href="/dashboard/resume"
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-md shadow-teal-100 active:scale-98 transition-all duration-200 mt-auto block"
            >
              פתח שירות
            </Link>
          </div>

          {/* Card 2: Interview Simulator */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-100/60 flex flex-col items-center text-center transform transition-all hover:scale-[1.02] duration-200 relative group">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-200">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">סימולטור ראיונות</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs flex-1">
              הדביקו את תיאור המשרה שאתם מתמודדים עליה ותרגלו סימולציית שאלות ותשובות מותאמת אישית עם משוב וציון אנליטי.
            </p>
            <Link
              href="/dashboard/interview"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md shadow-emerald-100 active:scale-98 transition-all duration-200 mt-auto block"
            >
              פתח שירות
            </Link>
          </div>

        </div>

      </main>
    </div>
  );
}
