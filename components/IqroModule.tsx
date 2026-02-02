
import React, { useState } from 'react';
import { Volume2, LayoutGrid, Info, ChevronRight, BookOpen, Sparkles, Star } from 'lucide-react';
import { HIJAIYAH_LETTERS } from '../constants';
import { speakText } from '../services/geminiService';

const IQRO_LEVELS = [
  { id: 1, title: 'Iqro 1', desc: 'Mengenal huruf Hijaiyah dasar dan harakat Fathah.', color: 'bg-emerald-500', icon: <Star size={24}/>, content: 'Tingkatan ini berfokus pada pengenalan huruf-huruf tunggal dari Alif sampai Ya.' },
  { id: 2, title: 'Iqro 2', desc: 'Belajar huruf sambung dan bacaan panjang (mad thobi’i).', color: 'bg-blue-600', icon: <Sparkles size={24}/>, content: 'Memahami bagaimana huruf berubah bentuk saat disambung di awal, tengah, dan akhir kata.' },
  { id: 3, title: 'Iqro 3', desc: "Memahami kasroh ('i'), dhommah ('u'), dan variasinya.", color: 'bg-amber-600', icon: <LayoutGrid size={24}/>, content: 'Fokus pada harakat dasar i (kasroh) dan u (dhommah) serta perubahan suaranya.' },
  { id: 4, title: 'Iqro 4', desc: 'Belajar tanwin, sukun, nun mati, qolqolah, dan lainnya.', color: 'bg-indigo-600', icon: <Info size={24}/>, content: 'Latihan membaca tanwin (an, in, un) dan huruf mati (sukun) serta pantulan suara (qolqolah).' },
  { id: 5, title: 'Iqro 5', desc: 'Hukum tajwid seperti waqof, tasydid, mad, idzhar, dan idghom.', color: 'bg-purple-600', icon: <BookOpen size={24}/>, content: 'Pendalaman hukum-hukum tajwid dalam pembacaan Al-Quran yang lebih kompleks.' },
  { id: 6, title: 'Iqro 6', desc: 'Iqlab, ikhfa, tanda waqof, serta cara membaca huruf awal surat.', color: 'bg-pink-600', icon: <ChevronRight size={24}/>, content: 'Tingkatan akhir sebelum memasuki pembacaan Mushaf Al-Quran secara penuh.' },
];

const IqroModule: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState(1);

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      <div className="text-center md:text-left">
        <h1 className="text-5xl font-black mb-4 tracking-tight">Pusat Belajar Iqro</h1>
        <p className="text-slate-500 text-lg font-medium max-w-2xl">Metode cepat dan praktis belajar membaca Al-Quran dari dasar dengan dukungan AI Guru Tahfidz.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {IQRO_LEVELS.map((lvl) => (
          <button 
            key={lvl.id}
            onClick={() => setActiveLevel(lvl.id)}
            className={`flex items-center gap-6 p-6 rounded-[2rem] border-2 transition-all text-left group ${activeLevel === lvl.id ? 'bg-emerald-600 border-emerald-500 text-white shadow-2xl shadow-emerald-600/30' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-800 hover:border-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg font-black text-xl shrink-0 ${activeLevel === lvl.id ? 'bg-white text-emerald-600' : lvl.color + ' text-white'}`}>
              {lvl.id}
            </div>
            <div className="flex-1">
               <h3 className="font-black text-xl">{lvl.title}</h3>
               <p className={`text-[11px] font-black uppercase tracking-widest ${activeLevel === lvl.id ? 'text-emerald-100' : 'text-slate-400'}`}>Tingkatan {lvl.id}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Level Detail Viewer */}
      <div className="bg-white dark:bg-[#0b1121] rounded-[3rem] p-12 shadow-2xl border-4 border-slate-100 dark:border-slate-800">
         <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-white shadow-xl ${IQRO_LEVELS.find(l => l.id === activeLevel)?.color}`}>
              {IQRO_LEVELS.find(l => l.id === activeLevel)?.icon}
            </div>
            <div className="text-center md:text-left">
               <h2 className="text-4xl font-black mb-2">{IQRO_LEVELS.find(l => l.id === activeLevel)?.title}</h2>
               <p className="text-slate-500 text-xl font-medium">{IQRO_LEVELS.find(l => l.id === activeLevel)?.desc}</p>
            </div>
         </div>

         <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] mb-12 border-2 border-slate-100 dark:border-slate-800">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xl font-medium italic">
              "{IQRO_LEVELS.find(l => l.id === activeLevel)?.content}"
            </p>
         </div>

         {/* Learning Grid */}
         {activeLevel === 1 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-4">
              {HIJAIYAH_LETTERS.map((item) => (
                <button
                  key={item.letter}
                  onClick={() => speakText(`Huruf ${item.name}`)}
                  className="aspect-square bg-white dark:bg-slate-800 rounded-3xl flex flex-col items-center justify-center gap-1 hover:bg-emerald-600 hover:text-white transition-all shadow-md hover:shadow-emerald-600/30 border-2 border-slate-100 dark:border-slate-700 active:scale-95 group"
                >
                  <span className="font-hijaiyah text-5xl leading-none group-hover:scale-110 transition-transform">{item.letter}</span>
                  <span className="text-[10px] font-black uppercase tracking-tighter opacity-60 group-hover:opacity-100">{item.name}</span>
                </button>
              ))}
            </div>
         ) : (
            <div className="space-y-12">
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {Array.from({length: 12}).map((_, i) => (
                   <button 
                     key={i}
                     onClick={() => speakText(`Pelajari bacaan materi ${i + 1} tingkat ${activeLevel}`)}
                     className="p-10 bg-white dark:bg-slate-800 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 hover:border-emerald-500 transition-all flex flex-col items-center gap-6 group hover:shadow-2xl active:scale-95"
                   >
                      <div className="font-quran text-5xl text-slate-800 dark:text-slate-100 group-hover:scale-110 transition-transform" dir="rtl">
                         بَـتَـثَ {i + 1}
                      </div>
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                         <Volume2 size={24} />
                      </div>
                   </button>
                 ))}
               </div>
               
               <div className="bg-amber-100/30 dark:bg-amber-900/10 p-10 rounded-[3rem] border-4 border-dashed border-amber-200 dark:border-amber-900/30 text-center">
                  <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-amber-500/20">
                    <Sparkles size={40} />
                  </div>
                  <h4 className="font-black text-amber-800 dark:text-amber-400 text-2xl mb-4">Fitur Guru AI Tahfidz</h4>
                  <p className="text-amber-700 dark:text-amber-500 font-bold text-lg max-w-xl mx-auto mb-10">Dengarkan panduan pelafalan yang benar sesuai kaidah tajwid langsung dari AI Guru Al-Quran kami.</p>
                  <button 
                    onClick={() => speakText(`Berikut adalah panduan membaca untuk materi Iqro level ${activeLevel}. Perhatikan panjang pendek dan harakatnya agar bacaan Anda menjadi sempurna.`)}
                    className="px-12 py-5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xl rounded-2xl shadow-2xl shadow-amber-500/40 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto"
                  >
                    <Volume2 size={28} /> Dengarkan Panduan Guru AI
                  </button>
               </div>
            </div>
         )}
      </div>
    </div>
  );
};

export default IqroModule;
