import Link from "next/link";

export default function InterviewLanding() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-teal-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] rounded-full bg-emerald-200/10 blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-100/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Right Side: Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
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

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/interview" className="text-base font-semibold text-teal-600 transition-colors duration-200">
              הכנה לראיון עבודה
            </Link>
            <Link href="/resume" className="text-base font-medium text-slate-600 hover:text-teal-600 transition-colors duration-200">
              קורות חיים
            </Link>
            <Link href="/about" className="text-base font-medium text-slate-600 hover:text-teal-600 transition-colors duration-200">
              מי אנחנו
            </Link>
            <Link href="/pricing" className="text-base font-medium text-slate-600 hover:text-teal-600 transition-colors duration-200">
              מחירים
            </Link>
            <Link href="/faq" className="text-base font-medium text-slate-600 hover:text-teal-600 transition-colors duration-200">
              שאלות נפוצות
            </Link>
          </nav>

          {/* Left Side: Login Button */}
          <div>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white font-semibold text-sm rounded-full shadow-md shadow-teal-55/40 hover:bg-teal-700 active:scale-95 transition-all duration-200"
            >
              <span>כניסה למערכת</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
          סימולטור ראיונות עבודה מבוסס <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">AI</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed mb-12">
          הדביקו את תיאור המשרה והתאמנו בסימולציה מותאמת אישית הכוללת ציון, הערכה ומשוב מפורט לשיפור התשובות שלכם.
        </p>

        {/* Horizontal Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 max-w-4xl">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-full shadow-sm">
            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">התאמה מדויקת לדרישות המשרה</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-full shadow-sm">
            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">הערכה מיידית לכל תשובה</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-full shadow-sm">
            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">הנחיות לתיקון ולניסוח מנצח</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-full shadow-sm">
            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">ציון אנליטי משוקלל</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg shadow-teal-100 hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] active:scale-98 transition-all duration-200 mb-20"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>התחילו סימולציה חכמה</span>
        </Link>

        {/* Three Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          
          {/* Card 1: Custom Questions */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-100/50 hover:shadow-lg transition-shadow flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">שאלות מותאמות משרה</h3>
              <p className="text-slate-500 text-xs mt-1">סינתזה מדויקת של שאלות ראיון</p>
            </div>
          </div>

          {/* Card 2: Interactive Practice */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-100/50 hover:shadow-lg transition-shadow flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">תרגול אינטראקטיבי</h3>
              <p className="text-slate-500 text-xs mt-1">סימולציה מבוססת טקסט במבנה מבחן</p>
            </div>
          </div>

          {/* Card 3: Analytical Feedback */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-100/50 hover:shadow-lg transition-shadow flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.18 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">משוב אנליטי</h3>
              <p className="text-slate-500 text-xs mt-1">ציון מפורט והצעות לשיפור הניסוח</p>
            </div>
          </div>

        </div>

        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-600 font-bold rounded-full border border-slate-200 hover:border-teal-600 hover:text-teal-600 active:scale-95 transition-all duration-200 mt-16"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span>חזרה לדף הבית</span>
        </Link>

      </main>
    </div>
  );
}
