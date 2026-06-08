import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-teal-200/20 blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-[-20%] w-[500px] h-[500px] rounded-full bg-emerald-200/15 blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-100/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Right Side: Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-600 shadow-md shadow-teal-100">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              אימון <span className="text-teal-600 font-extrabold">AI</span>
            </span>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/interview" className="text-base font-medium text-slate-600 hover:text-teal-600 transition-colors duration-200">
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

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 flex flex-col items-center justify-center text-center pt-24 pb-32">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-100 bg-teal-50/50 shadow-sm shadow-teal-50/20 mb-8 animate-fade-in">
          <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.904-4.113L19 9l-8.904 4.113z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 10l.01-.01M15 10l.01-.01M12 12l.01-.01M12 16l.01-.01M10 14l.01-.01M14 14l.01-.01M12 8a4 4 0 110 8 4 4 0 010-8z" />
          </svg>
          <span className="text-sm font-semibold text-teal-700">טכנולוגיית AI מתקדמת</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-950 mb-6 leading-tight max-w-4xl">
          בונים ביטחון. מנצחים ראיונות.
          <span className="block mt-2 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            הכל בפלטפורמה אחת.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl font-bold text-slate-700 mb-4 max-w-3xl flex items-center justify-center gap-2">
          <span>מאיצים את הדרך לתפקיד הבא שלכם עם הכנה מבוססת AI</span>
          <span>🚀</span>
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-slate-500 max-w-3xl leading-relaxed mb-12">
          התאימו את קורות החיים שלכם אוטומטית לדרישות המשרה ועברו סימולציות ראיון מקצועיות עם ניתוח ביצועים מתקדם כדי שתגיעו לשלב הבא מוכנים וממוקדים במאה אחוזים.
        </p>

        {/* Call to Actions */}
        <div className="flex justify-center w-full">
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg shadow-teal-150/50 hover:shadow-xl hover:shadow-teal-200/50 hover:translate-y-[-2px] active:translate-y-[0px] active:scale-98 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>התחילו בחינם</span>
          </Link>
        </div>

      </main>
    </div>
  );
}
