
import React from 'react';

interface NavbarProps {
  onAdminToggle: () => void;
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminToggle, isAdmin }) => {
  const handleAdminClick = () => {
    if (isAdmin) {
      onAdminToggle();
    } else {
      const pass = prompt("Enter Admin Access Key:");
      if (pass === 'ui2026') {
        onAdminToggle();
      } else if (pass !== null) {
        alert("Access Denied");
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <a 
              href="https://www.universityinstructors.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center cursor-pointer group gap-4" 
            >
              <span className="text-base font-black text-[#509E2F] uppercase tracking-[0.2em] hover:text-[#458a28] transition-colors">University Instructors</span>
            </a>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="hidden lg:flex items-center space-x-6">
              <a href="#register-container" className="text-sm font-bold text-slate-600 hover:text-[#509E2F] transition-colors uppercase tracking-widest">RSVP</a>
              <a href="#location" className="text-sm font-bold text-slate-600 hover:text-[#509E2F] transition-colors uppercase tracking-widest">Venue</a>
            </div>
            <button 
              onClick={handleAdminClick}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
                isAdmin ? 'bg-[#509E2F] border-[#509E2F] text-white shadow-lg' : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-[#509E2F] hover:text-[#509E2F]'
              }`}
            >
              {isAdmin ? 'Logout' : 'Admin'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
