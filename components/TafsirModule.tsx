
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Loader2, Info } from 'lucide-react';
import { fetchTafsir } from '../services/quranService';

const TafsirModule: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!number) return;
      try {
        setLoading(true);
        const res = await fetchTafsir(parseInt(number));
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [number]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
      <p className="text-slate-500">Memuat Tafsir Jalalayn...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="sticky top-0 bg-white dark:bg-slate-900 z-10 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-bold text-lg">Tafsir {data.englishName}</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest">Tafsir Al-Jalalayn</p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-xl mb-8 flex gap-3 text-blue-800 dark:text-blue-300">
        <Info size={20} className="shrink-0" />
        <p className="text-sm">Tafsir memberikan penjelasan mendalam tentang makna setiap ayat Al-Quran berdasarkan pemahaman para ulama ahli tafsir.</p>
      </div>

      <div className="space-y-8">
        {data.ayahs.map((ayah: any) => (
          <div key={ayah.number} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
             <div className="flex items-center gap-2 mb-4">
                <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded">AYAT {ayah.numberInSurah}</span>
             </div>
             <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-lg">
                {ayah.text}
             </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TafsirModule;
