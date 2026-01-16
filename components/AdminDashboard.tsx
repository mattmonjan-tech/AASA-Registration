
import React, { useState } from 'react';
import { Registration } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  registrations: Registration[];
  onDelete: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ registrations, onDelete }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  
  const [emailConfig, setEmailConfig] = useState({
    serviceId: localStorage.getItem('emailjs_service_id') || '',
    templateId: localStorage.getItem('emailjs_template_id') || '',
    publicKey: 'ZEhOR1XtewtJHOGZf', 
  });

  const saveConfig = () => {
    localStorage.setItem('emailjs_service_id', emailConfig.serviceId);
    localStorage.setItem('emailjs_template_id', emailConfig.templateId);
    localStorage.setItem('emailjs_public_key', emailConfig.publicKey);
    setShowConfig(false);
  };

  const testConnection = async () => {
    if (!emailConfig.serviceId || !emailConfig.templateId) {
      alert("Please enter Service and Template IDs first.");
      return;
    }
    setTestStatus('testing');
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: emailConfig.serviceId,
          template_id: emailConfig.templateId,
          user_id: emailConfig.publicKey,
          template_params: {
            to_name: "Admin Test",
            to_email: "test@example.com",
            event_name: "Connection Test - UI Nashville"
          }
        })
      });
      if (response.ok) setTestStatus('success');
      else setTestStatus('error');
    } catch {
      setTestStatus('error');
    }
    setTimeout(() => setTestStatus('idle'), 3000);
  };

  const exportToCSV = () => {
    const headers = ['First Name', 'Last Name', 'Role', 'District', 'State', 'Email', 'Phone', 'Registered At'];
    const rows = registrations.map(r => [
      r.firstName, r.lastName, r.role, r.district, r.state, r.email, r.phone, r.registeredAt
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `ui_nashville_regs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const manualConfirm = (reg: Registration) => {
    const subject = encodeURIComponent('UI Leadership Breakfast Confirmation - Nashville 2026');
    const body = encodeURIComponent(`Hi ${reg.firstName},\n\nThis is a confirmation for your seat at the University Instructors Leadership Breakfast on Feb 13, 2026.\n\nVenue: Puckett's Nashville\nTime: 7:00 AM\n\nWe look forward to seeing you there!`);
    window.location.href = `mailto:${reg.email}?subject=${subject}&body=${body}`;
  };

  const stateData = registrations.reduce((acc: any[], curr) => {
    const existing = acc.find(a => a.name === curr.state);
    if (existing) existing.count += 1;
    else acc.push({ name: curr.state || 'Other', count: 1 });
    return acc;
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 overflow-y-auto pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {showConfig && (
          <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Email Setup</h2>
              
              <div className="bg-slate-50 p-5 rounded-2xl mb-6 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Template Variable Requirements</p>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-4">
                  In your EmailJS template, use these exact tags in the "To Email" and message fields:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <code className="text-[10px] bg-white border border-slate-200 p-2 rounded-lg text-[#509E2F] font-bold">{"{{to_email}}"} - Recipient Address</code>
                  <code className="text-[10px] bg-white border border-slate-200 p-2 rounded-lg text-[#509E2F] font-bold">{"{{to_name}}"} - Guest Full Name</code>
                  <code className="text-[10px] bg-white border border-slate-200 p-2 rounded-lg text-[#509E2F] font-bold">{"{{event_name}}"} - Nashville 2026</code>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Service ID</label>
                  <input type="text" value={emailConfig.serviceId} onChange={e => setEmailConfig({...emailConfig, serviceId: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm" placeholder="e.g. service_g0u1v..." />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Template ID</label>
                  <input type="text" value={emailConfig.templateId} onChange={e => setEmailConfig({...emailConfig, templateId: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#509E2F] text-sm" placeholder="e.g. template_m9k..." />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Public Key (Set by User)</label>
                  <input type="text" value={emailConfig.publicKey} readOnly className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl outline-none text-slate-400 text-sm italic" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <button onClick={saveConfig} className="flex-1 py-4 bg-[#509E2F] text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-green-100">Activate Emails</button>
                  <button onClick={() => setShowConfig(false)} className="px-6 py-4 bg-slate-100 text-slate-500 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-colors">Close</button>
                </div>
                <button 
                  onClick={testConnection} 
                  disabled={testStatus === 'testing'}
                  className={`w-full py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all border-2 ${
                    testStatus === 'success' ? 'bg-green-500 border-green-500 text-white' : 
                    testStatus === 'error' ? 'bg-red-500 border-red-500 text-white' : 
                    'bg-white border-slate-200 text-slate-500 hover:border-[#FF8200] hover:text-[#FF8200]'
                  }`}
                >
                  {testStatus === 'idle' && 'Send Test Email'}
                  {testStatus === 'testing' && 'Sending...'}
                  {testStatus === 'success' && '✓ Success! Check Dashboard Logs'}
                  {testStatus === 'error' && '✕ Failed (Check IDs)'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-serif font-bold text-slate-900">Event Dashboard</h1>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px] mt-2">University Instructors • AASA 2026</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setShowConfig(true)} className="bg-white border-2 border-slate-200 text-slate-600 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center hover:border-[#509E2F] hover:text-[#509E2F] transition-all">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              Email Setup
            </button>
            <button onClick={exportToCSV} className="bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold flex items-center shadow-2xl transition-all">
              <svg className="w-5 h-5 mr-3 text-[#FF8200]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Export CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Total RSVP</p>
              <p className="text-5xl font-black text-slate-900">{registrations.length}</p>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">State Coverage</p>
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-500">TN Based:</span>
                <span className="text-[#509E2F]">{registrations.filter(r => r.state === 'TN').length}</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">RSVP Distribution by State</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stateData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="count" fill="#FF8200" radius={[8, 8, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden mb-10">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 italic">Guest Registry</h3>
             <span className="text-[10px] font-bold text-slate-400 uppercase">{registrations.length} Confirmed Guests</span>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-widest border-b border-slate-100">
                  <tr>
                  <th className="px-8 py-5">Guest</th>
                  <th className="px-8 py-5">Role / District</th>
                  <th className="px-8 py-5">State</th>
                  <th className="px-8 py-5">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                  {registrations.length === 0 ? (
                    <tr><td colSpan={4} className="px-8 py-20 text-center"><p className="text-slate-400 font-serif italic">No guests registered yet.</p></td></tr>
                  ) : registrations.map(reg => (
                  <tr key={reg.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{reg.firstName} {reg.lastName}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{reg.email}</div>
                      </td>
                      <td className="px-8 py-6">
                      <div className="text-slate-800 font-medium text-sm">{reg.role}</div>
                      <div className="text-slate-400 text-xs">{reg.district}</div>
                      </td>
                      <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-orange-50 text-[#FF8200] rounded-lg font-black text-[10px] tracking-widest">{reg.state}</span>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2">
                           <button onClick={() => manualConfirm(reg)} className="p-2 text-slate-400 hover:text-[#509E2F] hover:bg-green-50 rounded-lg transition-colors" title="Manual Email Fallback">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                           </button>
                           <button onClick={() => window.confirm(`Remove ${reg.firstName}?`) && onDelete(reg.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Guest">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                           </button>
                         </div>
                      </td>
                  </tr>
                  ))}
              </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
