import Link from "next/link";

export default function ResumeLanding() {
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
            <Link href="/interview" className="text-base font-medium text-slate-600 hover:text-teal-600 transition-colors duration-200">
              הכנה לראיון עבודה
            </Link>
            <Link href="/resume" className="text-base font-semibold text-teal-600 transition-colors duration-200">
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
          שדרוג קורות חיים עם <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">AI</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed mb-12">
          בצעו אופטימיזציה מקצועית לקורות החיים שלכם ובלטו מעל כולם בתהליך המיון תוך דקות ספורות.
        </p>

        {/* Horizontal Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 max-w-4xl">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-full shadow-sm">
            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">מבנה מותאם תעשייה</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-full shadow-sm">
            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">כתיבה שיווקית וממוקדת</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-full shadow-sm">
            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">תואם מערכות סינון ATS</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-full shadow-sm">
            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">תמיכה מלאה דו-לשונית</span>
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
          <span>שפרו את קורות החיים שלכם</span>
        </Link>

        {/* Three Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          
          {/* Card 1: Fast Optimization */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-100/50 hover:shadow-lg transition-shadow flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">אופטימיזציה מהירה</h3>
              <p className="text-slate-500 text-xs mt-1">ניתוח מעמיק ומיידי תוך דקות</p>
            </div>
          </div>

          {/* Card 2: Professional Layout */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-100/50 hover:shadow-lg transition-shadow flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">מבנה תעשייתי</h3>
              <p className="text-slate-500 text-xs mt-1">פריסה נקייה ומותאמת למגייסים</p>
            </div>
          </div>

          {/* Card 3: Easy Export */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-100/50 hover:shadow-lg transition-shadow flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">ייצוא נוח</h3>
              <p className="text-slate-500 text-xs mt-1">הורדת קובץ בפורמט Word או PDF</p>
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
