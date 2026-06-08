"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "תוך כמה זמן מתקבל הניתוח לקורות החיים שלי?",
      answer: "המשוב הוא מיידי! בשנייה שתעלו את קורות החיים שלכם בפורמט PDF , המערכת תבצע ניתוח מעמיק ותציג לכם דוח מפורט הכולל נקודות חוזקה, נקודות לשיפור והמלצות לשינויי ניסוח מדויקים שתוכלו להעתיק בקליק אחד."
    },
    {
      question: "מהם הצעדים הראשונים כדי להתחיל להשתמש בפלטפורמה?",
      answer: "זה פשוט מאוד: נרשמים לאתר ללא עלות, מעלים את קובץ קורות החיים שלכם, והמערכת תתחיל לספק לכם הכוונה מותאמת אישית. לאחר מכן, תוכלו להדביק תיאור משרה שמעניינת אתכם ולהתחיל סימולציית ראיון מדומה."
    },
    {
      question: "האם הכלי מתאים לכל מקצועות ותחומי העבודה?",
      answer: "בהחלט. מודל ה- AI שלנו מותאם ומאומן על מגוון רחב של תעשיות ותפקידים - החל מעולמות ההייטק, הפיתוח והטכנולוגיה, ועד לתחומי השיווק, הפיננסים, המכירות, משאבי האנוש ועוד."
    },
    {
      question: "האם השימוש באתר כרוך בתשלום?",
      answer: "אנו מציעים גרסה חינמית המאפשרת גישה לכלים הבסיסיים של שיפור קורות חיים. בנוסף, קיימות תוכניות פרימיום מתקדמות המאפשרות הרצה של סימולציות ראיון מותאמות משרה וקבלת משוב אנליטי וניקוד מפורט לכל תשובה."
    },
    {
      question: "כיצד המערכת משפרת את הסיכויים שלי להתקבל לעבודה?",
      answer: "הפלטפורמה רותמת בינה מלאכותית בשני שלבים קריטיים: ראשית, היא מלטשת את קורות החיים שלכם כדי לעבור בהצלחה את מערכות הסינון האוטומטיות ( ATS ). שנית, היא מדמה ראיון עבודה מקצועי המבוסס בדיוק על דרישות המשרה שלכם, כך שתגיעו לראיון האמיתי בביטחון מלא ובמוכנות שיא."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            <Link href="/pricing" className="text-base font-medium text-slate-600 hover:text-teal-600 transition-colors duration-200">
              מחירים
            </Link>
            <Link href="/faq" className="text-base font-semibold text-teal-600 transition-colors duration-200">
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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            שאלות נפוצות
          </h1>
          <div className="w-20 h-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full mx-auto" />
        </div>

        {/* Accordion Container */}
        <div className="w-full space-y-4 max-w-3xl mb-12">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white/90 backdrop-blur-sm border border-slate-100/80 rounded-2xl overflow-hidden shadow-md shadow-slate-100/50 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-right cursor-pointer group"
                >
                  <span className="text-lg font-bold text-slate-800 group-hover:text-teal-600 transition-colors duration-200">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-all duration-300 ${isOpen ? "rotate-180 bg-teal-50 text-teal-600" : ""}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Accordion Body */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] opacity-100 border-t border-slate-100/80" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="p-6 text-slate-600 text-base leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
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
