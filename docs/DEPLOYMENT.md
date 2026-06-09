# תוכנית פריסה והערות DevOps - Career Readiness Hub

מסמך זה מתאר את ארכיטקטורת הפריסה (Deployment Plan) המתוכננת ואת הגדרות התשתית והאבטחה של פלטפורמת **Career Readiness Hub**.

---

## 1. ארכיטקטורת פריסה מיועדת (Target Deployment)

האפליקציה בנויה כארכיטקטורת מונורפו (Monorepo) מנותקת (Decoupled), המאפשרת פריסה של שני החלקים בנפרד לביצועים אופטימליים.

```
┌─────────────────────────────────┐
│        Next.js Frontend         │  --> Host: Vercel (Static / Serverless Node.js)
└────────────────┬────────────────┘
                 │
                 ▼ HTTPS Calls
┌─────────────────────────────────┐
│         FastAPI Backend         │  --> Host: Render / Railway / Fly.io (Python Service)
└──────┬────────────────────┬─────┘
       │                    │
       ▼                    ▼
┌──────────────┐    ┌──────────────┐
│ SQLite DB    │    │  Chroma DB   │  --> Storage: Persistent Disk Volume
│ (Relational) │    │ (Vector Store)  (Required for local SQLite/Chroma state)
└──────────────┘    └──────────────┘
```

---

## 2. יעדי פריסה מומלצים ומתוכננים

### א. צד לקוח (Frontend) - Vercel
* **ספק שירות:** [Vercel](https://vercel.com/)
* **סיבה לבחירה:** תמיכה טבעית ב-Next.js, פריסה מהירה ישירות מתוך GitHub, רשת CDN גלובלית מובנית וניהול SSL אוטומטי.
* **פקודת בנייה:** `npm run build`
* **תיקיית פלט (Output Directory):** `.next`

### ב. צד שרת (Backend) - Render / Railway
* **ספק שירות:** [Render](https://render.com/) או [Railway](https://railway.app/)
* **סיבה לבחירה:** תמיכה מלאה ביישומי Python/FastAPI, תמיכה בדיסקים קשיחים קבועים (Persistent Volumes) המאפשרים שמירה של קובץ ה-SQLite וה-Chroma DB המקומי ללא איבוד נתונים בין הפעלות מחדש (Containers Restarts).
* **פקודת הרצה (Start Command):** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### ג. בסיס נתונים ואחסון וקטורי
* **אחסון רלציוני (SQLite):** נשמר מקומית כקובץ `career_hub.db`. במהלך הפריסה לשרת, יוגדר **Persistent Volume Mount** תחת התיקייה הראשי של ה-Backend על מנת למנוע מחיקת נתונים.
* **אחסון וקטורי (Chroma DB):** נשמר מקומית בתיקייה `./chroma_db`. מאחר והוא נבנה ומאותחל אוטומטית עם בנק השאלות, הוא יישמר גם כן בנפח המאובטח או ייבנה מחדש בעת הרצת ה-Lifespan של השרת.

---

## 3. משתני סביבה נדרשים לפריסה (Environment Variables)

### Backend (`backend/.env`)
| שם המשתנה | תיאור | ערך מומלץ לייצור (Production) |
| :--- | :--- | :--- |
| `MODEL_PROVIDER` | ספק ה-AI הנוכחי | `google` (או `openai`) |
| `GOOGLE_API_KEY` | מפתח API של Gemini | *מפתח מאובטח וחסוי* |
| `LLM_MODEL` | שם המודל לשימוש | `gemini-3.5-flash` |
| `DATABASE_URL` | נתיב בסיס הנתונים | `sqlite:///./data/career_hub.db` (בתוך התיקייה המאובטחת) |
| `CHROMA_DB_DIR` | נתיב בסיס הנתונים הווקטורי | `./data/chroma_db` |
| `CORS_ORIGINS` | כתובות מורשות לפנות ל-API | `["https://your-frontend-domain.vercel.app"]` |

### Frontend (`frontend/.env.production`)
| שם המשתנה | תיאור | ערך מומלץ |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | כתובת ה-URL של השרת (Backend) | `https://your-backend-service.onrender.com` |

---

## 4. סטטוס פריסה נוכחי (Deployment Status)
* **מה שפרוס כעת:** הפרויקט נמצא בשלב מוכנות לפריסה (Deployment Ready). נבדק באופן מקומי (Local Host) ומדמה פריסה בהצלחה.
* **מה שאינו פרוס עדיין:** הפעלה בענן של השרת הציבורי ב-Render והעלאת הפרונטאנד ל-Vercel.
* **בעיות שהתגלו ונפתרו:**
  * **CORS Error:** נפתר על ידי הוספת ה-CORS Middleware ב-FastAPI המאפשר גישה ספציפית לכתובת הפרונטאנד.
  * **איבוד נתוני SQLite בשרתים מבוססי Docker:** נפתר על ידי תכנון שימוש ב-Persistent Disk Volume תחת Render/Railway.

---

## 5. הערות אבטחה בסיסיות (Security Notes)
1. **הגנת מפתחות:** מפתחות ה-API מוגדרים אך ורק דרך משתני הסביבה של לוח הבקרה בשרת (Environment Variables Settings) ואינם נדחפים בשום אופן ל-Git (נשמרים בתוך `.gitignore`).
2. **תעבורה מוצפנת (HTTPS):** התקשורת בין הפרונטאנד לבקאנד מבוצעת אך ורק תחת פרוטוקול HTTPS מאובטח המסופק אוטומטית על ידי Vercel ו-Render.
3. **הגבלת CORS:** ה-API של השרת מוגבל אך ורק לדומיין של האפליקציה שלנו כדי למנוע קריאות API זדוניות מאתרים אחרים.
