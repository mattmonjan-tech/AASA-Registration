
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RegistrationForm from './components/RegistrationForm';
import MapSection from './components/MapSection';
import AdminDashboard from './components/AdminDashboard';
import ImageEditor from './components/ImageEditor';
import { Registration } from './types';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('nashville_registrations_2026');
    if (saved) {
      setRegistrations(JSON.parse(saved));
    } else {
      const mockData: Registration[] = [
        {
          id: '1',
          firstName: 'Sarah',
          lastName: 'Jenkins',
          role: 'Superintendent',
          district: 'Lincoln Public Schools',
          state: 'TN',
          email: 's.jenkins@lps.edu',
          phone: '(615) 555-0123',
          registeredAt: new Date(2025, 0, 15).toISOString()
        }
      ];
      setRegistrations(mockData);
      localStorage.setItem('nashville_registrations_2026', JSON.stringify(mockData));
    }
  }, []);

  const handleRegister = (data: Omit<Registration, 'id' | 'registeredAt'>) => {
    const newReg: Registration = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      registeredAt: new Date().toISOString()
    };
    
    const updated = [...registrations, newReg];
    setRegistrations(updated);
    localStorage.setItem('nashville_registrations_2026', JSON.stringify(updated));
    
    console.log('2026 RSVP Logged:', data.email);
  };

  const handleDeleteRegistration = (id: string) => {
    const updated = registrations.filter(reg => reg.id !== id);
    setRegistrations(updated);
    localStorage.setItem('nashville_registrations_2026', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-white selection:bg-[#509E2F] selection:text-white">
      <Navbar onAdminToggle={() => setIsAdmin(!isAdmin)} isAdmin={isAdmin} />
      
      {isAdmin ? (
        <AdminDashboard 
          registrations={registrations} 
          onDelete={handleDeleteRegistration}
        />
      ) : (
        <div className="animate-in fade-in duration-1000">
          <Hero />
          
          <section className="py-24 bg-slate-900 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF8200] rounded-full blur-[120px]"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#509E2F] rounded-full blur-[120px]"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
              <div className="group p-10 rounded-[2.5rem] bg-slate-800/40 backdrop-blur-sm border border-slate-700 hover:border-[#FF8200] transition-all">
                <div className="w-16 h-16 bg-[#FF8200] text-white rounded-2xl flex items-center justify-center mb-8 transform -rotate-6 group-hover:rotate-0 transition-transform shadow-2xl shadow-orange-900/40">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h4 className="font-bold text-white mb-4 text-2xl tracking-tight font-serif">7:00 AM Prompt</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Early access to networking. We start ahead of the AASA 2026 keynote sessions to maximize your professional connections.</p>
              </div>
              
              <div className="group p-10 rounded-[2.5rem] bg-slate-800/40 backdrop-blur-sm border border-slate-700 hover:border-[#509E2F] transition-all">
                <div className="w-16 h-16 bg-[#509E2F] text-white rounded-2xl flex items-center justify-center mb-8 transform rotate-6 group-hover:rotate-0 transition-transform shadow-2xl shadow-green-900/40">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <h4 className="font-bold text-white mb-4 text-2xl tracking-tight font-serif">UI Leadership</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Direct engagement with University Instructors executives. Gain insights into the future of educational support and innovation.</p>
              </div>
              
              <div className="group p-10 rounded-[2.5rem] bg-slate-800/40 backdrop-blur-sm border border-slate-700 hover:border-white transition-all">
                <div className="w-16 h-16 bg-white text-slate-900 rounded-2xl flex items-center justify-center mb-8 transform -rotate-3 group-hover:rotate-0 transition-transform shadow-2xl">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <h4 className="font-bold text-white mb-4 text-2xl tracking-tight font-serif">Historic Downtown</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Set in the vibrant heart of Nashville. <span className="text-[#FF8200]">Puckett's</span> provides a distinct Southern backdrop for high-level educational collaboration.</p>
              </div>
            </div>
          </section>

          <RegistrationForm onRegister={handleRegister} />
          
          <MapSection />

          <ImageEditor />

          <footer className="bg-slate-950 py-32 text-slate-500 border-t border-slate-900 relative">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="mb-16 flex flex-col items-center">
                 <a href="https://www.universityinstructors.com" target="_blank" rel="noopener noreferrer" className="group">
                   <p className="text-white text-sm font-black uppercase tracking-[0.4em] mb-2 group-hover:text-[#509E2F] transition-colors">University Instructors</p>
                 </a>
                 <p className="text-[#509E2F] text-[10px] font-black uppercase tracking-[0.5em]">Leadership Team Engagement • AASA 2026</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto mb-20 text-left">
                <a href="https://www.puckettsrestaurant.com/nashville" target="_blank" rel="noreferrer" className="p-8 bg-slate-900 rounded-[2rem] hover:bg-slate-800 transition-all border border-slate-800 group">
                  <p className="text-white font-bold mb-2 group-hover:text-[#FF8200] transition-colors">Puckett's Downtown</p>
                  <p className="text-xs font-medium text-slate-500">500 Church Street, Nashville, TN 37219</p>
                </a>
                <a href="https://nashvillemcc.com/" target="_blank" rel="noreferrer" className="p-8 bg-slate-900 rounded-[2rem] hover:bg-slate-800 transition-all border border-slate-800 group">
                  <p className="text-white font-bold mb-2 group-hover:text-[#509E2F] transition-colors">Music City Center</p>
                  <p className="text-xs font-medium text-slate-500">201 Rep. John Lewis Way S, Nashville, TN 37203</p>
                </a>
              </div>
              
              <div className="pt-16 border-t border-slate-900">
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-700">
                  © 2026 University Instructors, LLC • Educational Excellence Series
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;
