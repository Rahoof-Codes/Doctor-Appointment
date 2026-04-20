# 🏥 DocBook — Doctor Appointment Booking App

> **Your health, brighter and better.**  
> Browse verified doctors and book appointments instantly via WhatsApp — no forms, no waiting rooms.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-green?style=flat-square&logo=supabase)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)

---

## ✨ Features

- 🔍 **Browse Doctors** — Explore 10+ verified specialists across multiple medical fields
- 📱 **WhatsApp Booking** — One tap sends a pre-filled appointment message directly to the doctor
- 🎨 **Premium UI Design** — Soft mint/teal wellness aesthetic, far from the typical "hospital blue"
- ⚡ **Real-time Data** — Doctor profiles fetched live from Supabase
- 📱 **Fully Responsive** — Works beautifully on mobile, tablet, and desktop
- 🔒 **Secure** — Row Level Security (RLS) enabled on Supabase
- 💀 **Skeleton Loading** — Smooth animated placeholders while data loads
- 🏷️ **Specialty Badges** — Color-coded badges for each medical specialty

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | React framework with SSR/SSG |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Supabase** | PostgreSQL database + Auth + RLS |
| **Vercel** | Deployment & hosting |

---

## 📁 Project Structure

```
doctor-appointment/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main application page
├── lib/
│   └── supabase.ts       # Supabase client configuration
├── public/               # Static assets
├── .env.local            # Environment variables (not committed)
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) account
- A [Vercel](https://vercel.com) account (for deployment)

### 1. Clone the repository

```bash
git clone https://github.com/Rahoof-Codes/Doctor-Appointment.git
cd Doctor-Appointment/doctor-appointment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the `doctor-appointment/` folder:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set up the database

Go to your **Supabase SQL Editor** and run the following script:

```sql
DROP TABLE IF EXISTS doctors CASCADE;

CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  experience_years INT NOT NULL,
  image_url TEXT,
  description TEXT,
  location TEXT,
  whatsapp_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE doctors DISABLE ROW LEVEL SECURITY;
```

Then insert the 10 seed doctors from `docbook_supabase.sql`.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Set **Root Directory** to `doctor-appointment`
4. Add these **Environment Variables** in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy** 🎉

---

## 📱 How It Works

```
1. User visits DocBook
        ↓
2. App fetches doctors from Supabase
        ↓
3. User browses doctor cards
        ↓
4. User clicks "Book via WhatsApp"
        ↓
5. Pre-filled message opens in WhatsApp
        ↓
6. User sends message → Doctor confirms slot
```

---

## 🗄️ Database Schema

```sql
Table: doctors
┌──────────────────┬───────────────┬────────────┐
│ Column           │ Type          │ Notes      │
├──────────────────┼───────────────┼────────────┤
│ id               │ UUID          │ Primary Key│
│ name             │ TEXT          │ Not null   │
│ specialty        │ TEXT          │ Not null   │
│ experience_years │ INT           │ Not null   │
│ image_url        │ TEXT          │ Unsplash   │
│ description      │ TEXT          │            │
│ location         │ TEXT          │ Clinic name│
│ whatsapp_number  │ TEXT          │ With code  │
│ created_at       │ TIMESTAMPTZ   │ Auto       │
└──────────────────┴───────────────┴────────────┘
```

---

## 👨‍⚕️ Available Specialties

- ❤️ Cardiologist
- 👶 Pediatrician
- 🦴 Orthopedic Surgeon
- 🌿 Dermatologist
- 🧠 Neurologist
- 👩 Gynecologist
- 🦷 Dentist
- 🔬 Endocrinologist
- 🫁 Pulmonologist
- 🧘 Psychiatrist

---

## 🙏 Acknowledgements

- [Supabase](https://supabase.com) — for the amazing open-source backend
- [Unsplash](https://unsplash.com) — for the doctor profile images
- [Tailwind CSS](https://tailwindcss.com) — for the utility-first CSS framework
- [Vercel](https://vercel.com) — for seamless deployment

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/Rahoof-Codes">Rahoof</a>
</div>
