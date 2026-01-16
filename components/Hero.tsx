
import React from 'react';

const Hero: React.FC = () => {
  const scrollToRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('register-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-24">
      <div className="absolute top-0 right-0 w-2/3 h-full bg-slate-50 -skew-x-12 translate-x-48 z-0 hidden lg:block opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 xl:col-span-6">
            
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-50 border border-[#FF8200]/20 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-[#FF8200] mr-3 animate-pulse"></span>
              <span className="text-[10px] font-black text-[#FF8200] uppercase tracking-[0.4em]">AASA 2026 • Music City Leadership</span>
            </div>
            
            <h1 className="text-6xl tracking-tight font-serif font-extrabold text-slate-900 sm:text-7xl md:text-8xl leading-[1.05]">
              Nashville's <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF8200] to-orange-600 italic">Finest Start.</span>
            </h1>

            <p className="mt-8 text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
              Join University Instructors for an exclusive leadership breakfast at <a 
                href="https://www.puckettsrestaurant.com/nashville" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-[#FF8200] hover:text-orange-600 transition-all border-b-2 border-orange-100 hover:border-orange-500"
              >Puckett's Downtown</a>. Fuel your conference day with Southern soul and educational insight.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                 <svg className="w-5 h-5 text-[#FF8200]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                 <span className="text-sm font-bold text-slate-700">Friday, Feb 13, 2026</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                 <svg className="w-5 h-5 text-[#509E2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 <span className="text-sm font-bold text-slate-700">7:00 AM CST</span>
              </div>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-5">
              <button
                onClick={scrollToRegister}
                className="inline-flex items-center justify-center px-10 py-5 border border-transparent text-sm font-black rounded-2xl text-white bg-[#FF8200] hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 uppercase tracking-[0.2em] active:scale-95"
              >
                Reserve Your Spot
              </button>
              <a
                href="#location"
                className="inline-flex items-center justify-center px-10 py-5 border-2 border-slate-100 text-sm font-black rounded-2xl text-slate-700 bg-white hover:border-[#509E2F] hover:text-[#509E2F] transition-all uppercase tracking-[0.2em]"
              >
                View Map
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white aspect-[4/5] transform rotate-2">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=1200"
                alt="Nashville Biscuits and Coffee"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 text-[#FF8200]">The Puckett's Experience</p>
                <h4 className="text-3xl font-serif font-bold italic">Authentic Nashville</h4>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
