"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Login: Redirect to dashboard after a brief delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-x-hidden px-6">
      {/* Background decoration elements */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-teal-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] rounded-full bg-emerald-200/10 blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="max-w-md w-full bg-white/85 backdrop-blur-md border border-slate-100 rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-100/50 relative z-10 flex flex-col">
        
        {/* Logo Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-600 shadow-md shadow-teal-100">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              אימון <span className="text-teal-600 font-extrabold">AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">כניסה למערכת</h1>
          <p className="text-slate-400 text-sm mt-1">הזן אימייל וסיסמה כדי להתחבר לחשבונך</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email field */}
          <div className="space-y-1.5 text-right">
            <label className="text-sm font-bold text-slate-700 block">כתובת אימייל</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-left transition-all duration-200"
            />
          </div>

          {/* Password field */}
          <div className="space-y-1.5 text-right">
            <div className="flex justify-between items-center mb-1">
              <Link href="#" className="text-xs text-teal-600 hover:text-teal-700 hover:underline">
                שכחת סיסמה?
              </Link>
              <label className="text-sm font-bold text-slate-700">סיסמה</label>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-left transition-all duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-teal-100 hover:shadow-xl hover:shadow-teal-200/50 hover:translate-y-[-1px] active:translate-y-[0px] disabled:opacity-50 active:scale-98 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>מתחבר...</span>
              </>
            ) : (
              <span>התחברות</span>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 text-sm text-slate-500">
          אין לך חשבון?{" "}
          <Link href="#" className="font-semibold text-teal-600 hover:text-teal-700 hover:underline">
            להרשמה חינם
          </Link>
        </div>

      </div>
    </div>
  );
}
