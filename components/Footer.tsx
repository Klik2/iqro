
import React from 'react';
import { Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-24 py-20 px-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1121] transition-colors">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Contact Info */}
        <div className="flex flex-col items-center gap-4 mb-14 text-center">
          <div className="w-16 h-16 bg-emerald-600/10 rounded-full flex items-center justify-center mb-2 shadow-inner">
            <Mail size={32} className="text-emerald-600" />
          </div>
          <a 
            href="mailto:hijr.time+iqroquran@gmail.com" 
            className="text-2xl font-black text-slate-800 dark:text-slate-200 hover:text-emerald-500 transition-colors tracking-tight"
          >
            Contact us
          </a>
        </div>

        {/* Support Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 w-full max-w-2xl">
          <a 
            href="https://sociabuzz.com/syukrankatsiron/tribe" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:flex-1 flex items-center justify-center gap-4 px-10 py-5 bg-[#e94d89] hover:bg-[#d63d78] text-white rounded-[1.8rem] font-black text-xl transition-all transform hover:scale-105 shadow-2xl shadow-pink-500/30"
          >
            <Heart size={28} fill="currentColor" />
            Support us
          </a>

          <a 
            href="https://ko-fi.com/syukran/tip" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:flex-1 transform transition-all hover:scale-105"
          >
            <div className="flex items-center justify-center gap-4 px-10 py-5 bg-white dark:bg-slate-100 text-slate-900 border-4 border-slate-100 rounded-[1.8rem] shadow-2xl hover:shadow-slate-200 transition-all font-black text-xl">
               <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Ko-fi" className="h-8" />
               Support me on Ko-fi
            </div>
          </a>
        </div>

        {/* Legal & Copyright Info */}
        <div className="text-center pt-12 border-t border-slate-100 dark:border-slate-800/60 w-full">
          <div className="flex justify-center flex-wrap gap-10 mb-8 text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
             <a href="#/privacy" className="hover:text-emerald-500 transition-colors">Privacy Policy</a>
             <a href="#/tos" className="hover:text-emerald-500 transition-colors">Terms of Service</a>
             <a href="#/faq" className="hover:text-emerald-500 transition-colors">FAQ</a>
          </div>
          <p className="text-lg font-black text-slate-400 dark:text-slate-600 tracking-tight">
            Te_eR™ Inovative @2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
