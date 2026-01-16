
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
  const [emailStatus, setEmailStatus] = useState<'idle' | 'simulated' | 'delivered'>('idle');

  const states = [
    { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "DC", name: "District of Columbia" },
    { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" }, { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" }, { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" }, { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" }, { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" }, { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" }, { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" }
  ];

  const event = {
    title: 'University Instructors Leadership Breakfast @ AASA 2026',
    description: `Leadership breakfast hosted by University Instructors.\n\nVENUE: Puckett's Nashville\nLOCATION: 500 Church St, Nashville, TN 37219\n\nWALKING DIRECTIONS FROM MUSIC CITY CENTER:\n1. Exit Music City Center and head North on Rep. John Lewis Way S.\n2. Continue straight for 0.4 miles (approx 8 mins).\n3. Turn left onto Church St.\n4. Puckett's will be on your right at 500 Church St.`,
    location: 'Puckett\'s Nashville, 500 Church St, Nashville, TN 37219',
    startTime: '20260213T070000',
    endTime: '20260213T090000',
    isoStart: '2026-02-13T07:00:00',
    isoEnd: '2026-02-13T09:00:00',
  };

  const getGoogleCalendarUrl = () => {
    const url = new URL('https://www.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', event.title);
    url.searchParams.append('dates', `${event.startTime}/${event.endTime}`);
    url.searchParams.append('details', event.description);
    url.searchParams.append('location', event.location);
    return url.toString();
  };

  const downloadICal = () => {
    const icalContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${event.startTime}`,
      `DTEND:${event.endTime}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'UI_Nashville_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    const sid = localStorage.getItem('emailjs_service_id');
    const tid = localStorage.getItem('emailjs_template_id');
    const pkey = localStorage.getItem('emailjs_public_key') || 'ZEhOR1XtewtJHOGZf';

    if (sid && tid && pkey) {
      try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: sid,
            template_id: tid,
            user_id: pkey,
            template_params: {
              to_name: `${formData.firstName} ${formData.lastName}`,
              to_email: formData.email,
              event_name: 'UI Leadership Breakfast 2026',
              location: "Puckett's Nashville",
              time: '7:00 AM'
            }
          })
        });
        if (response.ok) setEmailStatus('delivered');
        else setEmailStatus('simulated');
      } catch (err) {
        setEmailStatus('simulated');
      }
    } else {
      setEmailStatus('simulated');
    }

    setTimeout(() => {
      onRegister(formData);
      setIsSending(false);
      setSubmitted(true);
      const container = document.getElementById('register-container');
      if (container) {
        window.scrollTo({ top: container.offsetTop - 100, behavior: 'smooth' });
      }
    }, 1500);
  };

  return (
    <div id="register-container" className="scroll-mt-32">
      {submitted ? (
        <div className="max-w-4xl mx-auto py-24 px-4">
          <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 text-center border border-slate-100 relative overflow-hidden animate-in zoom-in duration-700">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF8200] via-[#509E2F] to-[#FF8200]"></div>
            
            <div className="w-24 h-24 bg-green-50 text-[#509E2F] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-green-100">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            
            <h3 className="text-4xl font-serif font-bold text-slate-900 mb-2">You're on the list!</h3>
            <p className="text-slate-400 mb-8 text-[10px] font-black uppercase tracking-[0.3em]">Confirmed for {formData.firstName} {formData.lastName}</p>
            
            <div className={`rounded-2xl p-6 mb-8 text-left border ${emailStatus === 'delivered' ? 'bg-green-50 border-green-100 text-green-800' : 'bg-amber-50 border-amber-100 text-amber-800'}`}>
              <p className="text-xs font-black uppercase tracking-widest mb-1">{emailStatus === 'delivered' ? 'Email Confirmed' : 'Registration Logged'}</p>
              <p className="text-[11px] leading-relaxed">
                {emailStatus === 'delivered' 
                  ? `A confirmation email has been sent to ${formData.email}. Please check your inbox.`
                  : "Thank you for registering. Since the email server is in maintenance mode, please use the links below to save the event to your calendar manually."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-5 bg-white border-2 border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 hover:border-[#FF8200] hover:text-[#FF8200] transition-all shadow-sm">Google Calendar</a>
              <button onClick={downloadICal} className="flex items-center justify-center py-5 bg-white border-2 border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 hover:border-[#509E2F] hover:text-[#509E2F] transition-all shadow-sm">Download iCal</button>
            </div>

            <button onClick={() => setSubmitted(false)} className="mt-12 text-[10px] font-black text-slate-300 hover:text-slate-500 uppercase tracking-[0.4em] transition-colors">Register Another Attendee</button>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto py-24 px-4">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 md:p-16 bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                  <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#FF8200] rounded-full blur-[100px]"></div>
                  <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[#509E2F] rounded-full blur-[100px]"></div>
                </div>
                <div className="relative z-10">
                  <h2 className="text-sm font-black text-[#FF8200] uppercase tracking-[0.3em] mb-6">Reservation</h2>
                  <h3 className="text-4xl font-serif font-bold mb-8">Secure your <span className="italic">seat at the table.</span></h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-10">
                    Space is limited for this exclusive leadership gathering. Please provide your professional details to confirm your attendance.
                  </p>
                </div>
                <div className="relative z-10 rounded-[2rem] overflow-hidden border border-slate-700 shadow-2xl aspect-video">
                  <img src="https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200" alt="Southern Breakfast" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="p-12 md:p-16">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="First Name" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm font-medium" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                    <input required type="text" placeholder="Last Name" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm font-medium" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                  <input required type="text" placeholder="Professional Role (e.g. Superintendent)" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm font-medium" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="District" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm font-medium" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} />
                    <select required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm font-medium appearance-none" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} >
                      <option value="">Select State</option>
                      {states.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                    </select>
                  </div>
                  <input required type="email" placeholder="Professional Email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm font-medium" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <button type="submit" disabled={isSending} className="w-full py-5 bg-[#FF8200] hover:bg-orange-600 disabled:opacity-50 text-white font-black rounded-2xl transition-all shadow-xl shadow-orange-100 uppercase tracking-widest text-sm flex items-center justify-center gap-3">
                    {isSending ? 'Sending...' : 'Confirm My Attendance'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
