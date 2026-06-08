import Link from "next/link";

export default function Pricing() {
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
            <Link href="/resume" className="text-base font-medium text-slate-600 hover:text-teal-600 transition-colors duration-200">
              קורות חיים
            </Link>
            <Link href="/about" className="text-base font-medium text-slate-600 hover:text-teal-600 transition-colors duration-200">
              מי אנחנו
            </Link>
            <Link href="/pricing" className="text-base font-semibold text-teal-600 transition-colors duration-200">
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
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">מסלולי מנויים</h1>
          <p className="text-slate-500 text-lg">בחר את המסלול המתאים ביותר עבורך והתחל להתכונן עוד היום</p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start w-full max-w-5xl mb-12">
          
          {/* Plan 1: Teal (Monthly) */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-lg shadow-slate-100/70 flex flex-col h-full transform transition-all hover:scale-[1.02] duration-200">
            {/* Header */}
            <div className="bg-teal-600 p-8 text-center text-white relative flex flex-col items-center justify-center min-h-[160px]">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-1">מנוי חודשי</h2>
              <p className="text-teal-100 text-sm">לחודש • ביטול בכל עת</p>
            </div>
            {/* Body */}
            <div className="p-8 flex-1 flex flex-col items-center">
              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-slate-400 line-through text-lg">₪105</span>
                <span className="text-4xl font-black text-slate-900">₪59</span>
              </div>
              {/* Saving Tag */}
              <span className="inline-block text-xs font-bold px-3 py-1 bg-teal-50 text-teal-600 rounded-full mb-8">
                חיסכון של 44%
              </span>
              {/* Features */}
              <ul className="space-y-4 w-full text-right mb-8">
                <li className="flex items-center justify-between text-slate-600 text-sm">
                  <span>גישה מלאה לכל הכללים</span>
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </li>
                <li className="flex items-center justify-between text-slate-600 text-sm">
                  <span>גמישות מקסימלית</span>
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </li>
                <li className="flex items-center justify-between text-slate-600 text-sm">
                  <span>חידוש אוטומטי</span>
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </li>
                <li className="flex items-center justify-between text-slate-600 text-sm">
                  <span>ביטול בקליק אחד</span>
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </li>
              </ul>
              {/* Button */}
              <Link
                href="/pricing/mvp"
                className="w-full text-center py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl active:scale-98 transition-all duration-200 mt-auto"
              >
                התחל עכשיו
              </Link>
            </div>
          </div>

          {/* Plan 2: Orange (60 Days) - Highlighted */}
          <div className="bg-white border-2 border-orange-500 rounded-3xl overflow-visible shadow-xl shadow-orange-100/50 flex flex-col h-full transform transition-all hover:scale-[1.02] duration-200 relative">
            {/* Top Badge */}
            <div className="absolute top-0 right-1/2 translate-x-1/2 translate-y-[-50%] bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black px-4 py-1.5 rounded-full flex items-center gap-1 shadow-md z-10 whitespace-nowrap">
              <span>⭐</span>
              <span>הכי משתלם</span>
            </div>
            {/* Header */}
            <div className="bg-orange-500 p-8 text-center text-white relative flex flex-col items-center justify-center min-h-[160px]">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-1">60 יום</h2>
              <p className="text-orange-100 text-sm">תשלום חד-פעמי</p>
            </div>
            {/* Body */}
            <div className="p-8 flex-1 flex flex-col items-center">
              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-slate-400 line-through text-lg">₪249</span>
                <span className="text-4xl font-black text-slate-900">₪105</span>
              </div>
              {/* Saving Tag */}
              <span className="inline-block text-xs font-bold px-3 py-1 bg-orange-50 text-orange-600 rounded-full mb-8">
                חיסכון של 58%
              </span>
              {/* Features */}
              <ul className="space-y-4 w-full text-right mb-8">
                <li className="flex items-center justify-between text-slate-600 text-sm">
                  <span>כל מה שנכלל בתוכנית 30 יום</span>
                  <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </li>
                <li className="flex items-center justify-between text-slate-600 text-sm">
                  <span>זמן כפול להתכונן</span>
                  <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </li>
                <li className="flex items-center justify-between text-slate-600 text-sm">
                  <span>אידיאלי לחיפוש עבודה ארוך</span>
                  <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </li>
                <li className="flex items-center justify-between text-slate-600 text-sm">
                  <span>ערך מקסימלי!</span>
                  <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </li>
              </ul>
              {/* Button */}
              <Link
                href="/pricing/mvp"
                className="w-full text-center py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl active:scale-98 transition-all duration-200 mt-auto"
              >
                התחל עכשיו
              </Link>
            </div>
          </div>

          {/* Plan 3: Green (30 Days) */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-lg shadow-slate-100/70 flex flex-col h-full transform transition-all hover:scale-[1.02] duration-200">
            {/* Header */}
            <div className="bg-emerald-600 p-8 text-center text-white relative flex flex-col items-center justify-center min-h-[160px]">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-1">30 יום</h2>
              <p className="text-emerald-100 text-sm">תשלום חד-פעמי</p>
            </div>
            {/* Body */}
            <div className="p-8 flex-1 flex flex-col items-center">
              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-slate-400 line-through text-lg">₪189</span>
                <span className="text-4xl font-black text-slate-900">₪89</span>
              </div>
              {/* Saving Tag */}
              <span className="inline-block text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full mb-8">
                חיסכון של 53%
              </span>
              {/* Features */}
              <ul className="space-y-4 w-full text-right mb-8">
                <li className="flex items-center justify-between text-slate-600 text-sm">
                  <span>גישה מלאה לכל הכללים</span>
                  <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </li>
                <li className="flex items-center justify-between text-slate-600 text-sm">
                  <span>סימולציות ראיון</span>
                  <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </li>
                <li className="flex items-center justify-between text-slate-600 text-sm">
                  <span>יצירת קורות חיים AI</span>
                  <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </li>
              </ul>
              {/* Button */}
              <Link
                href="/pricing/mvp"
                className="w-full text-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl active:scale-98 transition-all duration-200 mt-auto"
              >
                התחל עכשיו
              </Link>
            </div>
          </div>

        </div>

        {/* Footer Security Badges */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center text-slate-400 text-sm border-t border-slate-100 pt-8 w-full max-w-lg">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>ביטול בכל עת</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>פרטיות מלאה</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>תשלום מאובטח</span>
          </div>
        </div>

      </main>
    </div>
  );
}
