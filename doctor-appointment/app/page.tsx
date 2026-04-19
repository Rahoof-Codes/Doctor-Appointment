"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// ─── TypeScript Interface ────────────────────────────────────────────────────
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience_years: number;
  image_url: string;
  description: string;
  location: string;
  whatsapp_number: string;
  created_at: string;
}

// ─── WhatsApp SVG Icon ───────────────────────────────────────────────────────
function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="white"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M16.003 2.667C8.639 2.667 2.667 8.639 2.667 16c0 2.361.633 4.669 1.835 6.693L2.667 29.333l6.825-1.789A13.29 13.29 0 0 0 16.003 29.333C23.364 29.333 29.333 23.361 29.333 16S23.364 2.667 16.003 2.667zm0 24.267a11.024 11.024 0 0 1-5.617-1.536l-.403-.239-4.048 1.061 1.079-3.941-.263-.415A10.998 10.998 0 0 1 5.001 16C5.001 9.924 9.927 5 16.003 5S27.001 9.924 27.001 16 22.079 26.934 16.003 26.934zm6.04-8.228c-.331-.165-1.957-.965-2.261-1.075-.304-.111-.525-.165-.747.165-.22.33-.855 1.075-1.049 1.296-.193.22-.386.248-.717.083-.331-.165-1.396-.514-2.659-1.641-.983-.875-1.647-1.957-1.84-2.288-.193-.331-.021-.51.145-.675.149-.148.331-.386.497-.58.165-.193.22-.33.331-.55.11-.22.055-.413-.028-.58-.083-.165-.747-1.8-1.023-2.465-.27-.647-.544-.56-.747-.57l-.635-.011c-.22 0-.58.083-.883.413-.304.33-1.159 1.133-1.159 2.762s1.187 3.204 1.352 3.426c.165.22 2.337 3.567 5.661 4.998.791.342 1.409.547 1.89.7.794.252 1.517.217 2.089.132.637-.095 1.957-.8 2.233-1.572.276-.772.276-1.434.193-1.572-.083-.138-.304-.22-.635-.386z" />
    </svg>
  );
}

// ─── Specialty Color Map ─────────────────────────────────────────────────────
const specialtyColors: Record<string, string> = {
  Cardiologist: "bg-red-100 text-red-600",
  Pediatrician: "bg-blue-100 text-blue-600",
  "Orthopedic Surgeon": "bg-purple-100 text-purple-700",
  Dermatologist: "bg-pink-100 text-pink-600",
  Neurologist: "bg-indigo-100 text-indigo-700",
  "Gynecologist & Obstetrician": "bg-rose-100 text-rose-600",
  "Dentist & Oral Surgeon": "bg-cyan-100 text-cyan-700",
  Endocrinologist: "bg-amber-100 text-amber-700",
  Pulmonologist: "bg-sky-100 text-sky-700",
  Psychiatrist: "bg-violet-100 text-violet-700",
};

// ─── Doctor Card Component ───────────────────────────────────────────────────
function DoctorCard({ doctor }: { doctor: Doctor }) {
  const handleBookWhatsApp = () => {
    const message = `Hello ${doctor.name}, I found your profile on DocBook. I would like to book an appointment with you at ${doctor.location}. Please let me know your available slots.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${doctor.whatsapp_number}?text=${encoded}`, "_blank");
  };

  const badgeClass =
    specialtyColors[doctor.specialty] ?? "bg-teal-100 text-teal-700";

  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-teal-50 hover:-translate-y-1">
      {/* Doctor Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-100">
        {doctor.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={doctor.image_url}
            alt={`Photo of ${doctor.name}`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div className="hidden absolute inset-0 flex items-center justify-center text-6xl">
          👨‍⚕️
        </div>

        {/* Experience Badge */}
        <div className="absolute top-3 right-3 bg-teal-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {doctor.experience_years} yrs exp
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* Name & Specialty */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight leading-snug">
            {doctor.name}
          </h2>
          <span
            className={`inline-block mt-1.5 text-xs font-semibold px-3 py-1 rounded-full ${badgeClass}`}
          >
            {doctor.specialty}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {doctor.description}
        </p>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-teal-700 font-medium">
          <span className="mt-0.5">📍</span>
          <span>{doctor.location}</span>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={handleBookWhatsApp}
          className="mt-2 w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#17a84f] text-white font-semibold py-3.5 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-green-200 active:scale-95 text-sm tracking-wide"
          aria-label={`Book appointment with ${doctor.name} via WhatsApp`}
        >
          <WhatsAppIcon />
          Book via WhatsApp
        </button>
      </div>
    </div>
  );
}

// ─── Loading Skeleton ────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden animate-pulse">
      <div className="h-56 bg-gray-100" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-gray-100 rounded-full w-3/4" />
        <div className="h-4 bg-gray-100 rounded-full w-1/3" />
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-5/6" />
        <div className="h-3 bg-gray-100 rounded-full w-4/6" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2 mt-2" />
        <div className="h-12 bg-gray-100 rounded-2xl mt-4" />
      </div>
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const { data, error } = await supabase
          .from("doctors")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;
        setDoctors(data ?? []);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError("Unable to load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7fdfa] font-sans">

      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-teal-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              Doc<span className="text-teal-600">Book</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-teal-50 rounded-2xl px-3 py-1.5">
            <span className="text-xs text-teal-700 font-medium">🏥 Instant WhatsApp Booking</span>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 shadow-inner">
            ✨ No apps needed · No waiting rooms
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-5">
            Your health,{" "}
            <span className="text-emerald-200">brighter</span> and{" "}
            <span className="text-emerald-200">better.</span>
          </h1>

          <p className="text-lg sm:text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed mb-10">
            Browse top-rated doctors and book your appointment instantly via WhatsApp — no forms, no wait, just care.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#doctors"
              className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-8 py-3.5 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-teal-50 transition-all duration-200 text-sm"
            >
              👨‍⚕️ Find a Doctor
            </a>
            <div className="flex items-center gap-3 text-teal-100 text-sm">
              <div className="flex -space-x-2">
                {["🧑‍⚕️", "👩‍⚕️", "🧑‍⚕️"].map((e, i) => (
                  <div key={i} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-base border-2 border-teal-600">
                    {e}
                  </div>
                ))}
              </div>
              <span>10+ Specialists available</span>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48L60 42.7C120 37.3 240 26.7 360 21.3C480 16 600 16 720 21.3C840 26.7 960 37.3 1080 40C1200 42.7 1320 37.3 1380 34.7L1440 32V48H1380C1320 48 1200 48 1080 48C960 48 840 48 720 48C600 48 480 48 360 48C240 48 120 48 60 48H0Z" fill="#f7fdfa"/>
          </svg>
        </div>
      </section>

      {/* ── Stats Strip ───────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-1">
        <div className="grid grid-cols-3 gap-4 bg-white rounded-3xl shadow-xl p-6 border border-teal-50">
          {[
            { value: "10+", label: "Expert Doctors" },
            { value: "8+", label: "Specialties" },
            { value: "⚡ Instant", label: "WhatsApp Booking" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-teal-700 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-0.5 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Doctors Grid ──────────────────────────────────────────────────── */}
      <main id="doctors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-widest mb-2">
            Our Specialists
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Meet our trusted doctors
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-base">
            All doctors are verified professionals. Click "Book via WhatsApp" to connect with them directly.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-gray-600 font-medium">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && doctors.length === 0 && (
          <div className="text-center py-24">
            <div className="text-7xl mb-5">⏳</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No doctors found</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Please run the SQL setup script in your Supabase editor and refresh the page.
            </p>
          </div>
        )}

        {/* Doctor Cards Grid */}
        {!loading && !error && doctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </main>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-t border-teal-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-widest mb-2">
            Simple Process
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-10">
            How DocBook works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                emoji: "🔍",
                title: "Browse Doctors",
                desc: "Explore verified specialists across a range of medical fields.",
              },
              {
                emoji: "📱",
                title: "Tap to Book",
                desc: "Hit the WhatsApp button — a pre-filled message is sent automatically.",
              },
              {
                emoji: "🗓️",
                title: "Confirm Slot",
                desc: "Chat with the doctor's team and lock in your appointment time.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-[#f7fdfa] rounded-3xl p-7 flex flex-col items-center gap-3 border border-teal-100"
              >
                <div className="text-5xl">{step.emoji}</div>
                <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-teal-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">D</span>
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            Doc<span className="text-teal-400">Book</span>
          </span>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} DocBook. Built with Next.js 14 &amp; Supabase.
        </p>
        <p className="text-xs mt-1 text-gray-600">
          Your health, brighter and better.
        </p>
      </footer>
    </div>
  );
}