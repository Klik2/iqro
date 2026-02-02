
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2, List, Grid3X3, Layers } from 'lucide-react';
import { Surah } from '../types';
import { fetchSurahs } from '../services/quranService';

const SurahList: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'surah' | 'juz'>('surah');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurahs().then(setSurahs).finally(() => setLoading(false));
  }, []);

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(search.toLowerCase()) || 
    s.name.includes(search)
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="animate-spin text-emerald-600" size={50} />
        <p className="text-slate-400 font-bold animate-pulse">Menghubungkan ke Mushaf Digital...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Mushaf Al-Quran</h1>
          <p className="text-slate-500 font-medium">Baca dan pahami makna setiap ayat suci.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari surah..."
              className="pl-12 pr-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-80 shadow-sm font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
             <button 
               onClick={() => setViewMode('surah')}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'surah' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-md' : 'text-slate-400'}`}
             >
                <List size={18}/> Surah
             </button>
             <button 
               onClick={() => setViewMode('juz')}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'juz' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-md' : 'text-slate-400'}`}
             >
                <Layers size={18}/> Juz
             </button>
          </div>
        </div>
      </div>

      {viewMode === 'surah' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSurahs.map((surah) => (
            <button 
              key={surah.number}
              onClick={() => navigate(`/surah/${surah.number}`)}
              className="flex items-center gap-5 p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all text-left shadow-sm group hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center font-black text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                {surah.number}
              </div>
              <div className="flex-1">
                <h3 className="font-black text-slate-900 dark:text-white text-lg">{surah.englishName}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                  {surah.englishNameTranslation} • {surah.numberOfAyahs} Ayat
                </p>
              </div>
              <div className="text-right">
                <span className="font-quran text-2xl text-emerald-600 dark:text-emerald-400 block">{surah.name}</span>
                <p className="text-[9px] uppercase font-black text-slate-300 dark:text-slate-600 tracking-tighter">{surah.revelationType}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
           {Array.from({length: 30}, (_, i) => i + 1).map(juz => (
             <button 
               key={juz}
               className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 text-center hover:border-emerald-500 transition-all font-black text-xl hover:shadow-md"
             >
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Juz</p>
                {juz}
             </button>
           ))}
        </div>
      )}
    </div>
  );
};

export default SurahList;
