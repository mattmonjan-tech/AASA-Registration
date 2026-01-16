
import React, { useState } from 'react';
import { Registration } from '../types';

interface RegistrationFormProps {
  onRegister: (data: Omit<Registration, 'id' | 'registeredAt'>) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    district: '',
    state: '',
    email: '',
    phone: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate API delay
    setTimeout(() => {
      onRegister(formData);
      setIsSending(false);
      setSubmitted(true);
      document.getElementById('register-container')?.scrollIntoView({ behavior: 'smooth' });
    }, 1200);
  };

  return (
    <div id="register-container" className="scroll-mt-32 py-20 px-4">
      {submitted ? (
        <div className="max-w-2xl mx-auto bg-white rounded-[3rem] shadow-2xl p-16 text-center border border-slate-100 animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-50 text-[#509E2F] rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">You're Registered!</h3>
          <p className="text-slate-500 mb-10 leading-relaxed">We've added <strong>{formData.firstName} {formData.lastName}</strong> to the UI Leadership guest list. Check your email for event details and walking directions.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-[#FF8200] transition-colors"
          >
            Register Another Guest
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-slate-950 p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541844053589-346841d0b34c?q=80&w=800')] opacity-20 bg-cover bg-center"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <p className="text-[#FF8200] text-[10px] font-black uppercase tracking-[0.4em] mb-4">RSVP Required</p>
                <h3 className="text-4xl font-serif font-bold leading-tight">Join the <br/> <span className="text-[#509E2F]">Leadership</span> Circle.</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Start your AASA Friday with high-level networking and a gourmet Southern breakfast at Puckett's Downtown Nashville.</p>
            </div>
          </div>
          
          <div className="md:w-3/5 p-12 lg:p-16">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">First Name</label>
                  <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm font-medium transition-all" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Last Name</label>
                  <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm font-medium transition-all" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Professional Role</label>
                <input required type="text" placeholder="e.g. Superintendent" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm font-medium transition-all" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">District</label>
                  <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm font-medium transition-all" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">State</label>
                  <select required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm font-medium appearance-none" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}>
                    <option value="">Select</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                <input required type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm font-medium transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>

              <button 
                type="submit" 
                disabled={isSending}
                className="w-full py-5 bg-[#FF8200] hover:bg-orange-600 disabled:opacity-50 text-white font-black rounded-2xl transition-all shadow-xl shadow-orange-100 uppercase tracking-widest text-sm flex items-center justify-center gap-3 mt-4"
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Confirming...
                  </>
                ) : 'Confirm My Attendance'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
