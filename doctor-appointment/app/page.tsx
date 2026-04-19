'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience_years: number;
  image_url: string | null;
};

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchDoctors() {
      try {
        const { data, error } = await supabase
          .from('doctors')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching doctors:', error);
          if (isMounted) setErrorMsg('Failed to load doctors. Please try again later.');
        } else {
          if (isMounted) setDoctors(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        if (isMounted) setErrorMsg('An unexpected error occurred.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDoctors();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">DocBook</h1>
          <p className="text-sm text-gray-500">Salem, Tamil Nadu</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-2">Find a Doctor</h2>
        <p className="text-gray-600 mb-8">Book appointments easily</p>

        {loading ? (
          <div className="text-center py-12 text-lg">Loading doctors...</div>
        ) : errorMsg ? (
          <div className="text-center py-12 text-red-600 bg-red-50 rounded-xl border border-red-100">
            {errorMsg}
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No doctors found.<br />Please add at least one doctor in Supabase.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                {doctor.image_url ? (
                  <img 
                    src={doctor.image_url} 
                    alt={`Dr. ${doctor.name}`} 
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="h-52 w-full bg-gray-200 flex items-center justify-center text-8xl">
                    👨‍⚕️
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold">{doctor.name}</h3>
                  <p className="text-blue-600 text-lg">{doctor.specialty}</p>
                  <p className="text-gray-500 mt-1">{doctor.experience_years} years experience</p>

                  <div className="mt-auto pt-8">
                    <button 
                      className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-4 rounded-xl text-lg font-medium"
                      onClick={() => alert(`Booking for ${doctor.name} - Coming soon!`)}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
