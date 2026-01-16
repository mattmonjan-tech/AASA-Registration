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
    <div className="relative overflow-hidden bg-white pt-10 pb-24">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-slate-50 -skew-x-12 translate-x-48 z-0 hidden lg:block opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 xl:col-span-6">
            
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-[#509E2F]/20 mb-10">
              <span className="flex h-2 w-2 rounded-full bg-[#509E2F] mr-3 animate-pulse"></span>
              <span className="text-[10px] font-black text-[#509E2F] uppercase tracking-[0.4em]">AASA 2026 • Music City</span>
            </div>
            
            <h1 className="text-6xl tracking-tight font-serif font-extrabold text-slate-900 sm:text-7xl md:text-8xl leading-[1.05]">
              The Morning <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF8200] to-orange-600">Glow of <br/> Leadership</span>
            </h1>

            <div className="mt-10 flex flex-wrap gap-5">
              <div className="px-8 py-5 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-5">
                 <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF8200]">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                 </div>
                 <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Friday</p>
                   <p className="text-base font-bold text-slate-900">Feb 13, 2026</p>
                 </div>
              </div>
              <div className="px-8 py-5 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-5">
                 <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#509E2F]">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 </div>
                 <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Arrival</p>
                   <p className="text-base font-bold text-slate-900">7:00 AM CST</p>
                 </div>
              </div>
            </div>
            
            <p className="mt-10 text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
              Join University Instructors for an exclusive breakfast at <a 
                href="https://www.puckettsrestaurant.com/nashville" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-[#FF8200] hover:text-orange-600 transition-all border-b-2 border-orange-100 hover:border-orange-500"
              >Puckett's Downtown Nashville</a>. Start your day with Southern hospitality and meaningful connection.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-5">
              <button
                onClick={scrollToRegister}
                className="inline-flex items-center justify-center px-12 py-6 border border-transparent text-sm font-black rounded-[2rem] text-white bg-[#FF8200] hover:bg-orange-600 transition-all shadow-2xl shadow-orange-300 uppercase tracking-[0.2em] active:scale-95"
              >
                Reserve Your Spot
              </button>
              <a
                href="#location"
                className="inline-flex items-center justify-center px-12 py-6 border-2 border-slate-100 text-sm font-black rounded-[2rem] text-slate-700 bg-white hover:border-[#509E2F] hover:text-[#509E2F] transition-all uppercase tracking-[0.2em]"
              >
                Venue Details
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 relative mt-12 lg:mt-0">
            <div className="relative z-10 rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border-[16px] border-white group aspect-[4/5] rotate-2">
              <img
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-[-2deg]"
                src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=1200"
                alt="Southern Nashville Gourmet Breakfast"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-16 left-16 text-white">
                <p className="text-[11px] font-black uppercase tracking-[0.5em] mb-4 text-[#FF8200]">Music City Morning</p>
                <h4 className="text-4xl font-serif font-bold italic mb-3">Puckett's Nashville</h4>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-slate-400"></div>
                  <p className="text-[10px] text-slate-300 font-bold tracking-widest uppercase">Church Street District</p>
                </div>
              </div>
            </div>
            
            {/* Decorative Floating Elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            
            <div className="absolute -left-12 top-1/3 w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-[#509E2F] z-20 animate-bounce cursor-default border border-slate-50">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;