
import React, { useState } from 'react';
import { Settings, X, Globe, Maximize2, Moon, Sun, Type, ZoomIn, ZoomOut } from 'lucide-react';

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
        className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all text-slate-600 dark:text-slate-300"
      >
        <Settings size={22} className={isOpen ? 'rotate-90 transition-transform' : ''} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-700 z-[70] p-8 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-xl">Pengaturan</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"><X size={20} /></button>
            </div>

            <div className="space-y-8">
              {/* Language Selection */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest"><Globe size={14}/> Translate Otomatis</label>
                <select 
                  value={lang} 
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {GOOGLE_TRANSLATE_LANGS.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
              </div>

              {/* Zoom Controls */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest"><Maximize2 size={14}/> Skala Tampilan</label>
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <button onClick={() => setZoom(Math.max(0.7, zoom - 0.1))} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl shadow-sm hover:bg-emerald-500 hover:text-white transition-colors"><ZoomOut size={18}/></button>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{Math.round(zoom * 100)}%</span>
                  <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl shadow-sm hover:bg-emerald-500 hover:text-white transition-colors"><ZoomIn size={18}/></button>
                </div>
              </div>

              {/* Display Mode */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest"><Moon size={14}/> Mode Layar</label>
                <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <button 
                    onClick={() => setDarkMode(false)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${!darkMode ? 'bg-white shadow-md text-emerald-600' : 'text-slate-400'}`}
                  >
                    <Sun size={14} /> Terang
                  </button>
                  <button 
                    onClick={() => setDarkMode(true)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${darkMode ? 'bg-slate-800 shadow-md text-amber-400' : 'text-slate-400'}`}
                  >
                    <Moon size={14} /> Gelap
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
