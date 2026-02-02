
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Bookmark, Share2, BookOpen, Loader2, Info, Eye, EyeOff, Search, ZoomIn, ZoomOut, Copy, Check } from 'lucide-react';
import { fetchSurahWithTranslation } from '../services/quranService';
import ShareModal from './ShareModal';
import { formatHonorifics } from '../utils/honorifics';

interface ReaderProps {
  appLang: string;
}

const SurahReader: React.FC<ReaderProps> = ({ appLang }) => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(42);
  const [showLatin, setShowLatin] = useState(true);
  const [shareVerse, setShareVerse] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!number) return;
      try {
        setLoading(true);
        const res = await fetchSurahWithTranslation(parseInt(number), 'id.indonesian'); 
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [number]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full py-48 gap-8">
      <Loader2 className="animate-spin text-emerald-600" size={64} />
      <p className="text-slate-500 font-black text-xl animate-pulse">Menghubungkan ke Mushaf Digital...</p>
    </div>
  );

  const arabicEd = data[0];
  const translationEd = data[1];

  const handlePlayAyah = (ayahNum: number) => {
    if (playingAyah === ayahNum) {
      audioRef.current?.pause();
      setPlayingAyah(null);
      return;
    }
    
    setPlayingAyah(ayahNum);
    // Use the Quran Cloud Audio API
    const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNum}.mp3`;
    
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    } else {
      const audio = new Audio(audioUrl);
      audio.onended = () => setPlayingAyah(null);
      audio.play();
      audioRef.current = audio;
    }
  };

  const copyAyah = (ayah: any, trans: string) => {
    const text = `${ayah.text}\n\n"${trans}"\n(QS. ${arabicEd.englishName}: ${ayah.numberInSurah})`;
    navigator.clipboard.writeText(text);
    setCopiedId(ayah.number);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-48">
      {/* Enhanced Sticky Header */}
      <div className="sticky top-0 bg-white/95 dark:bg-[#0b1121]/95 backdrop-blur-md z-40 px-6 py-8 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-8 mb-16 shadow-2xl rounded-b-[2.5rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button onClick={() => navigate('/mushaf')} className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-md group">
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h1 className="font-black text-3xl text-slate-900 dark:text-white tracking-tight">{arabicEd.englishName}</h1>
              <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] mt-1">{arabicEd.revelationType} • {arabicEd.numberOfAyahs} Ayat</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowLatin(!showLatin)} 
              title={showLatin ? "Sembunyikan Latin" : "Tampilkan Latin"}
              className={`p-4 rounded-2xl transition-all shadow-md ${showLatin ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
            >
               {showLatin ? <Eye size={22}/> : <EyeOff size={22}/>}
            </button>
            <button 
              onClick={() => navigate(`/tafsir/${number}`)} 
              className="flex items-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all"
            >
               <BookOpen size={20} /> Tafsir
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5">
           <div className="relative flex-1 w-full">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari kata dalam ayat atau terjemah..." 
                className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-slate-100 dark:border-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 font-bold transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 shadow-inner border-2 border-slate-200 dark:border-slate-700">
              <button onClick={() => setFontSize(Math.max(20, fontSize - 4))} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl shadow-sm hover:bg-emerald-500 hover:text-white transition-all"><ZoomOut size={18}/></button>
              <div className="w-14 text-center text-sm font-black text-emerald-600 dark:text-emerald-400">{fontSize}</div>
              <button onClick={() => setFontSize(Math.min(80, fontSize + 4))} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl shadow-sm hover:bg-emerald-500 hover:text-white transition-all"><ZoomIn size={18}/></button>
           </div>
        </div>
      </div>

      {/* Bismillah Header - Rule 6: Removed if already in surah header */}
      {arabicEd.number !== 1 && arabicEd.number !== 9 && (
        <div className="text-center py-20 animate-in fade-in slide-in-from-top-4 duration-1000">
           <p className="font-quran text-5xl text-slate-900 dark:text-white opacity-80 select-none" dir="rtl">
             بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
           </p>
        </div>
      )}

      {/* Verses Grid */}
      <div className="space-y-24 px-6">
        {arabicEd.ayahs.map((ayah: any, index: number) => {
          let text = ayah.text;
          
          // Rule 6: Remove starting Bismillah from text if it's already displayed in header
          if (index === 0 && arabicEd.number !== 1 && arabicEd.number !== 9) {
              const bismillah = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
              if (text.startsWith(bismillah)) {
                 text = text.substring(bismillah.length).trim();
              }
              if (!text) return null; // Edge case where verse IS just Bismillah
          }

          // Rule 1: Replace SWT, SAW, AS, RA with full phrases
          const translationText = formatHonorifics(translationEd.ayahs[index].text);
          
          // Simple transliteration simulation (real app would use a specific Latin API edition)
          const latinText = "Bismillahir-rahmanir-rahim..."; 

          if (searchQuery && !text.includes(searchQuery) && !translationText.toLowerCase().includes(searchQuery.toLowerCase())) {
            return null;
          }

          return (
            <div key={ayah.number} className="group relative animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex flex-col gap-10">
                {/* Ayah Meta Controls */}
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-[1.2rem] bg-emerald-600 text-white flex items-center justify-center text-lg font-black shadow-xl shadow-emerald-600/30">
                        {ayah.numberInSurah}
                      </div>
                      <button 
                        onClick={() => handlePlayAyah(ayah.number)}
                        className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center transition-all shadow-lg active:scale-90 ${playingAyah === ayah.number ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}
                      >
                         <Play size={24} fill="currentColor" />
                      </button>
                   </div>
                   <div className="flex items-center gap-3">
                      <button 
                        onClick={() => copyAyah(ayah, translationText)}
                        className={`p-4 rounded-2xl transition-all shadow-md ${copiedId === ayah.number ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500'}`}
                      >
                        {copiedId === ayah.number ? <Check size={22} /> : <Copy size={22} />}
                      </button>
                      <button 
                        onClick={() => setShareVerse({ arabic: ayah.text, translation: translationText, surah: arabicEd.englishName, ayah: ayah.numberInSurah })} 
                        className="p-4 bg-slate-100 dark:bg-slate-800 text-blue-500 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-md active:scale-95"
                      >
                        <Share2 size={22} />
                      </button>
                      <button className="p-4 bg-slate-100 dark:bg-slate-800 text-pink-500 rounded-2xl hover:bg-pink-500 hover:text-white transition-all shadow-md active:scale-95">
                        <Bookmark size={22} />
                      </button>
                   </div>
                </div>

                {/* Arabic Content */}
                <div className="text-right">
                  <p 
                    className="font-quran leading-[2.8] tracking-wide text-slate-900 dark:text-slate-100 w-full select-all"
                    style={{ fontSize: `${fontSize}px` }}
                    dir="rtl"
                  >
                    {text}
                  </p>
                </div>

                {/* Optional Latin Text */}
                {showLatin && (
                   <p className="text-amber-600 dark:text-amber-400 font-black italic text-xl leading-relaxed tracking-tight border-b-2 border-amber-500/10 pb-4">
                      {latinText}
                   </p>
                )}

                {/* Translation Content */}
                <div className="border-l-8 border-emerald-500/20 pl-10 py-4 group-hover:border-emerald-500 transition-colors">
                   <p className="text-slate-700 dark:text-slate-300 text-2xl leading-[1.8] font-bold tracking-tight">
                      {translationText}
                   </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {shareVerse && (
        <ShareModal 
          isOpen={!!shareVerse} 
          onClose={() => setShareVerse(null)} 
          verse={shareVerse} 
        />
      )}
    </div>
  );
};

export default SurahReader;
