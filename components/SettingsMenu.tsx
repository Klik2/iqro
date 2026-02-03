
import React, { useState } from 'react';
import { Settings, X, Globe, Maximize2, Moon, Sun, ZoomIn, ZoomOut } from 'lucide-react';

interface SettingsMenuProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  zoom: number;
  setZoom: (val: number) => void;
  lang: string;
  setLang: (val: string) => void;
}

const GOOGLE_TRANSLATE_LANGS = [
  { code: 'id', name: 'Indonesian' }, { code: 'en', name: 'English' }, { code: 'ar', name: 'Arabic' }, 
  { code: 'ru', name: 'Russian' }, { code: 'de', name: 'German' }, { code: 'fr', name: 'French' }, 
  { code: 'es', name: 'Spanish' }, { code: 'nl', name: 'Dutch' }, { code: 'tr', name: 'Turkish' }, 
  { code: 'it', name: 'Italian' }, { code: 'sv', name: 'Swedish' }, { code: 'pl', name: 'Polish' }, 
  { code: 'pt', name: 'Portuguese' }, { code: 'zh', name: 'Chinese' }, { code: 'ja', name: 'Japanese' }, 
  { code: 'ko', name: 'Korean' }, { code: 'hi', name: 'Hindi' }, { code: 'ms', name: 'Malay' }, 
  { code: 'ph', name: 'Philippines' }, { code: 'pk', name: 'Pakistan' }, { code: 'th', name: 'Thai' }, 
  { code: 'vi', name: 'Vietnam' }, { code: 'af', name: 'African' }, { code: 'fa', name: 'Persian' }, 
  { code: 'ku', name: 'Kurdish' }, { code: 'uz', name: 'Uzbekistan' }
];

const SettingsMenu: React.FC<SettingsMenuProps> = ({ darkMode, setDarkMode, zoom, setZoom, lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-slate-100 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:scale-105 active:scale-95"
        aria-label="Settings"
      >
        <Settings size={26} className={`transition-transform duration-700 ease-in-out ${isOpen ? 'rotate-180 text-emerald-600' : 'group-hover:rotate-45'}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60] backdrop-blur-sm bg-black/30" onClick={() => setIsOpen(false)}></div>
          <div className="absolute bottom-full mb-6 right-0 md:left-0 md:right-auto w-80 bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] border-2 border-slate-50 dark:border-slate-800 z-[70] p-10 animate-in slide-in-from-bottom-4 zoom-in-95 duration-500">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">Pengaturan</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"><X size={24} /></button>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest"><Globe size={16} className="text-emerald-500" /> Translate Otomatis</label>
                <select 
                  value={lang} 
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border-2 border-slate-100 dark:border-slate-700 text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-inner text-slate-950 dark:text-white transition-all"
                >
                  {GOOGLE_TRANSLATE_LANGS.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest"><Maximize2 size={16} className="text-blue-500" /> Skala Tampilan</label>
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border-2 border-slate-100 dark:border-slate-700 shadow-inner">
                  <button onClick={() => setZoom(Math.max(0.7, zoom - 0.1))} className="w-14 h-14 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl shadow-md hover:bg-emerald-500 hover:text-white transition-all"><ZoomOut size={20}/></button>
                  <span className="text-base font-black text-emerald-600 dark:text-emerald-400">{Math.round(zoom * 100)}%</span>
                  <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="w-14 h-14 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl shadow-md hover:bg-emerald-500 hover:text-white transition-all"><ZoomIn size={20}/></button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest"><Moon size={16} className="text-amber-500" /> Mode Layar</label>
                <div className="flex p-2 bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-inner">
                  <button 
                    onClick={() => setDarkMode(false)}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-xs font-black uppercase transition-all ${!darkMode ? 'bg-white shadow-xl text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Sun size={18} /> Terang
                  </button>
                  <button 
                    onClick={() => setDarkMode(true)}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-xs font-black uppercase transition-all ${darkMode ? 'bg-slate-700 shadow-xl text-amber-400' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Moon size={18} /> Gelap
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsMenu;
