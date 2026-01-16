import React from 'react';

const MapSection: React.FC = () => {
  return (
    <section id="location" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm text-[#FF8200] font-black tracking-[0.3em] uppercase mb-4">Venue & Transit</h2>
          <p className="text-4xl leading-tight font-serif font-extrabold sm:text-5xl">
            <span className="text-slate-400">Walking to</span> <span className="text-[#FF8200]">Puckett's</span>
          </p>
          <div className="w-12 h-1 bg-[#FF8200] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 rounded-[2rem] overflow-hidden shadow-2xl h-[600px] border border-slate-100 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3221.365406730058!2d-86.78284522434645!3d36.15764260341777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s0x886466580f488663%3A0x6d1f9cc00903828c!2sPuckett&#39;s%20Grocery%20%26%20Restaurant%20-%20Downtown%20Nashville%2C%20500%20Church%20St%2C%20Nashville%2C%20TN%2037219!3m2!1d36.1624891!2d-86.7816008!4m5!1s0x8864665f80b91e9b%3A0x1d7529f799a4e0c!2sMusic%20City%20Center%2C%20Rep.%20John%20Lewis%20Way%20South%2C%20Nashville%2C%20TN!3m2!1d36.1558299!2d-86.7770802!5e0!3m2!1sen!2sus!4v1714455000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8200] opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
              <h4 className="font-bold text-lg flex items-center mb-6">
                <span className="w-8 h-8 bg-[#FF8200] rounded-lg flex items-center justify-center text-white mr-4 text-xs font-black">WALK</span>
                Route Details
              </h4>
              <ul className="space-y-6 text-sm">
                <li className="flex items-start">
                  <span className="text-[#FF8200] font-bold mr-4 font-mono">01</span>
                  <span className="text-slate-300">Exit <strong className="text-[#FF8200]">Puckett's</strong> and head South on <strong className="text-white">6th Ave N</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF8200] font-bold mr-4 font-mono">02</span>
                  <span className="text-slate-300">Turn left onto <strong className="text-white">Church St</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF8200] font-bold mr-4 font-mono">03</span>
                  <span className="text-slate-300">Turn right onto <strong className="text-white">Rep. John Lewis Way N</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF8200] font-bold mr-4 font-mono">04</span>
                  <span className="text-slate-300">The convention center entrance is 0.4 miles ahead.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-[2rem] border-2 border-slate-50 bg-slate-50/50">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-6">Nearby Hotels</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                  <span className="text-slate-600 font-medium">Renaissance Hotel</span>
                  <span className="text-[#509E2F] font-bold">2 min</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                  <span className="text-slate-600 font-medium">Holston House</span>
                  <span className="text-[#509E2F] font-bold">3 min</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Sheraton Grand</span>
                  <span className="text-[#509E2F] font-bold">5 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;