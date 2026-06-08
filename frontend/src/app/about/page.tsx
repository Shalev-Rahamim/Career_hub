import Link from "next/link";

export default function About() {
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
            <Link href="/about" className="text-base font-semibold text-teal-600 transition-colors duration-200">
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
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-16 flex flex-col items-center">
        
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            קצת עלינו
          </h1>
          <div className="w-20 h-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full mx-auto" />
        </div>

        {/* Text Card (Glassmorphic) */}
        <div className="w-full bg-white/85 backdrop-blur-md border border-slate-100 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-100/50 mb-10">
          
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              האתר הזה נולד מתוך השטח, כפרויקט הגמר המעשי שלנו במסגרת האקתון אינטנסיבי
              <br />
              במכללת CyberProAI . 
              כסטודנטים לפיתוח תוכנה שנמצאים בעצמם עמוק בתוך תהליכי הגשה, מיונים וראיונות לתעשיית ההייטק, הרגשנו על בשרנו את האתגרים הגדולים ביותר של מחפשי העבודה כיום: 
              איך לבלוט בסינון קורות החיים ואיך להגיע מוכנים וממוקדים לראיונות המקצועיים.
            </p>

            <p>
              מתוך הצורך האישי שלנו ושל חברינו לספסל הלימודים, החלטנו לרתום את הטכנולוגיות המתקדמות ביותר של עולם <span className="font-semibold text-teal-600">AI</span> כדי 
              לבנות כלי שיעניק יתרון אמיתי בשוק העבודה. הפלטפורמה שפיתחנו מיישמת מודלי שפה, ניתוח וקטורי מתקדם בשיטת RAG וארכיטקטורת 
              קוד מודרנית המשלבת FastAPI וכן Next.js – הכל במטרה לקחת את קורות החיים שלכם, ללטש אותם לרמה הגבוהה ביותר, 
              ולייצר עבורכם סימולציות ראיון מדויקות ומותאמות אישית לדרישות המשרה הספציפית אליה אתם מתמודדים.
            </p>

            <p>
              אנחנו מאמינים שטכנולוגיה צריכה לפתור בעיות אמיתיות של אנשים אמיתיים, ונשמח שהכלים שפיתחנו כאן יעזרו גם לכם לעבור את תהליך הקבלה הבא שלכם בהצלחה ולנחות בתפקיד הבא.
            </p>
          </div>

          {/* Signature Block */}
          <div className="mt-12 flex flex-col items-end text-left">
            <div className="border-r-4 border-teal-600 pr-4">
              <p className="font-bold text-slate-900 text-lg">צוות הפיתוח</p>
              <p className="text-slate-500 text-sm">האקתון CyberProAI</p>
            </div>
          </div>

        </div>

        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-600 font-bold rounded-full border border-slate-200 hover:border-teal-600 hover:text-teal-600 active:scale-95 transition-all duration-200"
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
