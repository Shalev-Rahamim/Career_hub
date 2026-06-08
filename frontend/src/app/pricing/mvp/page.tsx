import Link from "next/link";

export default function PricingMVP() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden px-6">
      {/* Background decoration elements */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-teal-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] rounded-full bg-emerald-200/10 blur-3xl pointer-events-none" />

      {/* Info Card (Glassmorphic) */}
      <div className="max-w-xl w-full bg-white/85 backdrop-blur-md border border-slate-100 rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-100/50 text-center flex flex-col items-center relative z-10">
        
        {/* Animated Rocket/Spark Icon */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-600 shadow-lg shadow-teal-100 flex items-center justify-center mb-8 animate-pulse">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
          גרסת הרצה זמנית ( MVP )
        </h1>

        {/* Explanation Text */}
        <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed mb-8">
          <p>
            אנו שמחים מאוד על ההתעניינות שלך בפלטפורמה!
          </p>
          <p>
            האתר נמצא כעת בשלב פיתוח והרצה מוקדם ( גרסת MVP ). מסלולי התשלום והסליקה המלאים ייפתחו בהמשך הדרך עם העלייה הרשמית לאוויר.
          </p>
          <p className="font-semibold text-teal-700 bg-teal-50/50 py-2 px-4 rounded-xl border border-teal-100/20">
            בינתיים, כלל שירותי האתר פתוחים לשימוש בחינם לחלוטין!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full shadow-md shadow-teal-100 hover:translate-y-[-1px] active:translate-y-[0px] transition-all duration-200"
          >
            חזרה לדף הבית
          </Link>
          <Link
            href="/interview"
            className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-700 font-bold rounded-full border border-slate-200 hover:border-teal-200 hover:text-teal-600 hover:bg-slate-50 transition-all duration-200"
          >
            לתרגול ראיון עבודה
          </Link>
        </div>

      </div>
    </div>
  );
}
