# 📋 מסמך העברת מקל - AI-Driven Career Readiness Hub

ברוך הבא לפרויקט **Career Readiness Hub**!  
קובץ זה נועד לתת לך תמונה מלאה של המערכת, ההחלטות הטכנולוגיות שקיבלנו, מבנה הנתונים, ממשקי ה-API והסברים מפורטים כיצד להרים ולהריץ את הפרויקט מקומית בצורה המהירה ביותר.

---

## 1. סקירת המערכת ומטרותיה
המערכת משמשת כפלטפורמה המבוססת על בינה מלאכותית (AI) להכנת מועמדים לתהליכי גיוס והייטק:
1. **משפר ומנתח קורות חיים (Resume Builder & Optimizer)**: ניתוח קובצי PDF של קורות חיים, מתן ציון מפורט, חוזקות, חולשות, הצעות שיפור ממוקדות שורה-שורה, ואפשרות לצ'אט אינטראקטיבי מול קורות החיים לביצוע מקצים ושינויים.
2. **סימולטור הגנת פרויקט בית (Home Assignment Defense Simulator)**: סימולטור ייחודי שבו המועמד מעלה את הוראות תרגיל הבית ואת קוד הפתרון שלו. השרת מתשאל מסד נתונים וקטורי (Chroma DB) ומייצר 3-5 שאלות הגנה טכניות מותאמות אישית, מדרג את תשובות המועמד ומספק משוב עמוק לצד ניסוחים מקצועיים אלטרנטיביים.

---

## 2. בחירות טכנולוגיות (Technology Stack Decisions)

| טכנולוגיה | שימוש בפרויקט | למה דווקא היא? |
| :--- | :--- | :--- |
| **FastAPI (Python)** | שרת ה-Backend | ביצועים אסינכרוניים (Async) גבוהים ביותר, תמיכה מובנית ב-Pydantic לצורך וולידציה מהירה של נתונים, ואינטגרציה קלה עם ספריות Data Science ו-AI. |
| **Next.js 15+ (App Router)** | שרת ה-Frontend | סביבה מודרנית וריאקטיבית לפיתוח UI עשיר, תמיכה מובנית ברינדור צד-שרת (SSR/RSC) וקלות בבניית ממשקים רספונסיביים תומכי עברית (RTL). |
| **Google Gemini 3.5 Flash** | מודל השפה (LLM) | מהירות תגובה פנומנלית, חלון קונטקסט עצום התומך בהעלאת קבצי פרויקט שלמים (באמצעות ה-Files API), ויכולת דיוק גבוהה בהחזרת פלטים מובנים (Structured JSON Output). |
| **Chroma DB** | מסד נתונים וקטורי (Vector Database) | כלי קל ומהיר להרצה מקומית בזיכרון או בדיסק (Persistent Client). משמש לשמירת מאגר שאלות ארכיטקטורה ועיצוב גנריות (16 שאלות ליבה) וביצוע חיפוש סמנטי (Semantic Similarity Search) לצורך השבחת הפרומפטים. |
| **SQLite (SQLAlchemy)** | בסיס הנתונים הטרנזקציונלי | פתרון קל משקל שאינו דורש התקנת שרתים נפרדים. שומר את היסטוריית המשתמשים, קורות החיים, הצ'אטים, הראיונות וההערכות. |
| **LangChain** | שכבת ניהול ה-LLM | משמשת בייחוד לקישור (Chaining), ניהול פרומפטים מובנים, ועיבוד פלט מובנה (Structured Output mapping עם Pydantic) עבור שירות קורות החיים. |

---

## 3. ארכיטקטורת המערכת והפרדת השירותים (Decoupling Strategy)

המערכת בנויה בצורת **Monorepo** עם הפרדה מוחלטת (Decoupled Services) בין שני הפיצ'רים המרכזיים:
- **שירות קורות החיים (Resume Service)**: משתמש ב-LangChain ופרומפטים מובנים על גבי Gemini.
- **שירות הסימולטור (Defense Service)**: משתמש ישירות ב-Google GenAI SDK (עבור עבודה מול Files API של גוגל להעלאת מסמכי קוד גדולים) לצד Chroma DB לשליפת שאלות רקע רלוונטיות.

```
                          ┌────────────────────────┐
                          │    Next.js Frontend    │
                          └───────────┬────────────┘
                                      │
                       ┌───────────────┴───────────────┐
                       ▼                               ▼
            /api/resume/* Endpoints        /api/interview/* Endpoints
                       │                               │
             ┌─────────▼─────────┐           ┌─────────▼─────────┐
             │   Resume Service  │           │ Defense Service   │
             └─────────┬─────────┘           └─────────┬─────────┘
                       │                               │
             ┌─────────▼─────────┐           ┌─────────▼─────────┐
             │ LangChain Prompt  │           │ Vector Store RAG  │
             │ (Structured JSON) │           │ (Architecture DB) │
             └───────────────────┘           └───────────────────┘
```

---

## 4. מבנה בסיס הנתונים (Database Schemas)

בסיס הנתונים מנוהל באמצעות SQLAlchemy ([models.py](file:///c:/Users/Shalev/Coding/CyberProAi/Career_Hub/backend/app/models.py)) ומורכב מהטבלאות הבאות:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Database Schema (MVP)                          │
├─────────────────────────────────────────────────────────────────────────┤
│  Users Table:                                                           │
│  - user_id (UUID, Primary Key)                                          │
│  - email (String, Nullable)                                             │
│  - created_at (DateTime)                                                │
│                                                                         │
│  Resumes Table:                                                         │
│  - resume_id (UUID, Primary Key)                                        │
│  - user_id (Foreign Key -> users.user_id)                               │
│  - original_text (TEXT)                                                 │
│  - optimized_text (TEXT)                                                │
│  - score (INTEGER)                                                      │
│  - points_to_keep (JSON - List of Strings)                              │
│  - points_to_improve (JSON - List of Strings)                           │
│  - dynamic_recommendations (JSON - List of Dicts)                       │
│                                                                         │
│  ChatMessages Table (עבור צ'אט קורות חיים):                              │
│  - message_id (UUID, Primary Key)                                       │
│  - session_id (String, Index)                                           │
│  - role (String: "user" / "assistant")                                  │
│  - content (TEXT)                                                       │
│                                                                         │
│  Interviews Table (סימולטור):                                           │
│  - interview_id (UUID, Primary Key)                                     │
│  - user_id (Foreign Key -> users.user_id)                               │
│  - assignment_file_uri (String - נתיבי קבצי המטלה בגוגל מופרדים בפסיקים)     │
│  - solution_file_uri (String - נתיבי קבצי הפתרון בגוגל מופרדים בפסיקים)       │
│  - difficulty_level (String - easy/medium/hard)                         │
│  - num_questions (Integer)                                              │
│  - language (String)                                                    │
│  - questions_json (JSON - השאלות שנוצרו לסימולציה)                         │
│                                                                         │
│  InterviewEvaluations Table (הערכת הסימולציה):                          │
│  - evaluation_id (UUID, Primary Key)                                    │
│  - interview_id (Foreign Key -> interviews.interview_id, Unique)        │
│  - overall_score (INTEGER)                                              │
│  - general_feedback (TEXT)                                              │
│  - evaluations_json (JSON - תוצאות הערכה מפורטות לכל שאלה)                │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. ממשקי ה-API וחוזי תקשורת (API Contracts)

השרת מגדיר ממשק מסודר מול ה-Frontend תחת קובץ ה-Schemas ([schemas.py](file:///c:/Users/Shalev/Coding/CyberProAi/Career_Hub/backend/app/schemas.py)). להלן נקודות הקצה העיקריות:

### א. מודול קורות החיים (Resume Optimizer)
1. **ניתוח קורות חיים (`POST /api/resume/analyze`)**
   - **סוג קלט**: `multipart/form-data` (קובץ PDF או טקסט חופשי).
   - **פרמטרים**: `file` (קובץ PDF), `raw_text` (טקסט גיבוי), `language` (hebrew/english).
   - **פלט**: אובייקט JSON המכיל ציון (`score`), מערך נקודות לשימור ולשיפור, והצעות שינוי ממוקדות (`dynamic_recommendations` המכיל `original_text`, `suggested_text`, `rationale`).
2. **צ'אט אינטראקטיבי (`POST /api/resume/chat`)**
   - **סוג קלט**: `application/json`.
   - **פרמטרים**: `session_id`, `resume_id`, `user_message`.
   - **פלט**: תשובת ה-AI (`response`) וטקסט קורות חיים מעודכן במידה ובוצע שינוי.

### ב. מודול סימולטור הגנה (Defense Simulator)
1. **יצירת שאלות סימולציה (`POST /api/interview/generate-questions`)**
   - **סוג קלט**: `multipart/form-data`.
   - **פרמטרים**: `assignment_file` (קובץ הנחיות), `solution_file` (קובץ קוד/פתרון), `difficulty_level`, `num_questions`, `language`.
   - **פלט**: מזהה ראיון (`interview_id`) ורשימת שאלות שנוצרו (`questions`) עם קטגוריה וטקסט השאלה.
2. **הערכת תשובות המשתמש (`POST /api/interview/evaluate`)**
   - **סוג קלט**: `application/json`.
   - **פרמטרים**: `interview_id`, מערך של תשובות (`answers` המכיל `question_id`, `answer_text`).
   - **פלט**: ציון כללי (`overall_score`), משוב כללי, והערכה פרטנית לכל שאלה (`evaluations` המכיל ציון, הסבר, תשובה למופת וניסוח מקצועי מומלץ).

---

## 6. מדריך הקמה והרצה מקומית (Setup Guide)

### א. הגדרת Backend (FastAPI)
1. ניווט לתיקיית השרת:
   ```bash
   cd backend
   ```
2. יצירת סביבה וירטואלית והפעלתה:
   ```bash
   python -m venv .venv
   # Windows:
   .venv\Scripts\activate
   # Mac/Linux:
   source .venv/bin/activate
   ```
3. התקנת התלויות:
   ```bash
   pip install -r requirements.txt
   ```
4. הגדרת קובץ משתני הסביבה `.env` בתוך תיקיית `backend`:
   ```env
   MODEL_PROVIDER=google
   GOOGLE_API_KEY=your_api_key_here
   LLM_MODEL=gemini-3.5-flash
   DATABASE_URL=sqlite:///./career_hub.db
   CORS_ORIGINS=["http://localhost:3000", "http://127.0.0.1:3000"]
   CHROMA_DB_DIR=./chroma_db
   ```
5. הרצת השרת:
   ```bash
   uvicorn app.main:app --reload
   ```
   *הערה: עם עליית השרת בפעם הראשונה, יתבצע באופן אוטומטי Seed של 16 שאלות הארכיטקטורה הגנריות לתוך Chroma DB.*

### ב. הגדרת Frontend (Next.js)
1. ניווט לתיקיית הממשק:
   ```bash
   cd frontend
   ```
2. התקנת חבילות ה-NPM:
   ```bash
   npm install
   ```
3. הרצת שרת הפיתוח:
   ```bash
   npm run dev
   ```
4. פתח את הדפדפן בכתובת [http://localhost:3000](http://localhost:3000).

---

## 7. רשימת משימות והמשך עבודה (Future Checklist)
אם אתה ממשיך את הפיתוח, אלו המקומות המרכזיים שכדאי להתמקד בהם:
- [ ] חיבור עמוק יותר של ה-UI ב-Next.js לקצוות ה-API (כיום חלק ממסכי ה-Frontend משתמשים בלוגיקת מעבר בסיסית, יש לוודא חיבור של כל הטפסים והעלאות הקבצים לשרת ה-FastAPI).
- [ ] ניהול שגיאות קצה במקרה שמשתמש מעלה קבצים שאינם נתמכים או ריקים.
- [ ] הוספת אפשרות להורדת קורות החיים המעובדים ישירות כקובץ PDF מעוצב.

בהצלחה! הפרויקט בנוי בצורה נקייה מאוד ומודולרית.
