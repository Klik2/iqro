
import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, Loader2, ListMusic } from 'lucide-react';
import { QARIS } from '../constants';
import { fetchSurahs } from '../services/quranService';
import { Surah } from '../types';

const AudioPlayer: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [selectedQari, setSelectedQari] = useState(QARIS[0].identifier);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurahs().then(setSurahs).finally(() => setLoading(false));
  }, []);

  const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${selectedQari}/${selectedSurah}.mp3`;

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="animate-spin text-emerald-600" size={40} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-black mb-2">Murottal Al-Quran</h1>
        <p className="text-slate-500">Dengarkan lantunan ayat suci dari Qari terbaik dunia.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg relative overflow-hidden group">
            <Music size={80} className="opacity-20 absolute" />
            <div className="relative z-10 text-center">
              <span className="block text-4xl font-bold mb-1">QS</span>
              <span className="text-2xl font-black">{selectedSurah}</span>
            </div>
          </div>

          <div className="flex-1 space-y-6 w-full">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Pilih Qari</label>
              <select 
                value={selectedQari}
                onChange={(e) => setSelectedQari(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                {QARIS.map(q => <option key={q.identifier} value={q.identifier}>{q.name}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Pilih Surah</label>
              <select 
                value={selectedSurah}
                onChange={(e) => setSelectedSurah(parseInt(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                {surahs.map(s => <option key={s.number} value={s.number}>{s.number}. {s.englishName}</option>)}
              </select>
            </div>

            <div className="pt-4">
               <div className="flex items-center justify-center gap-6">
                  <button className="p-3 text-slate-400 hover:text-emerald-600 transition-colors">
                    <SkipBack size={24} />
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
                  >
                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                  </button>
                  <button className="p-3 text-slate-400 hover:text-emerald-600 transition-colors">
                    <SkipForward size={24} />
                  </button>
               </div>
            </div>

            {isPlaying && (
              <div className="text-center animate-pulse">
                <p className="text-emerald-500 text-sm font-bold">Sedang Memutar Audio...</p>
                <audio 
                  autoPlay 
                  src={audioUrl} 
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-emerald-600/10 dark:bg-emerald-400/5 rounded-2xl p-6 border border-emerald-500/20">
         <h3 className="font-bold flex items-center gap-2 text-emerald-700 dark:text-emerald-400 mb-4">
            <ListMusic size={20} />
            Daftar Putar Populer
         </h3>
         <div className="space-y-2">
            {[1, 18, 36, 67, 114].map(num => (
               <button 
                 key={num}
                 onClick={() => setSelectedSurah(num)}
                 className="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl hover:shadow-md transition-all text-sm font-medium"
               >
                 <span>Surah {surahs.find(s => s.number === num)?.englishName || num}</span>
                 <Play size={14} className="text-emerald-500" />
               </button>
            ))}
         </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
