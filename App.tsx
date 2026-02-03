
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Home, Book, Music, Mic, Heart, BookOpen, Menu, X, LayoutGrid, TrendingUp, Sparkles, BookMarked, Play, Pause, List, RefreshCw
} from 'lucide-react';
import SurahList from './components/SurahList';
import SurahReader from './components/SurahReader';
import JuzReader from './components/JuzReader';
import AudioPlayer from './components/AudioPlayer';
import IqroModule from './components/IqroModule';
import DoaModule from './components/DoaModule';
import TafsirModule from './components/TafsirModule';
import RecordingModule from './components/RecordingModule';
import SettingsMenu from './components/SettingsMenu';
import Footer from './components/Footer';
import { PrivacyPolicy, FAQ } from './components/LegalPages';
import { fetchDailyAyah } from './services/quranService';
import { formatHonorifics } from './utils/honorifics';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [zoom, setZoom] = useState(1.0);
  const [appLang, setAppLang] = useState('id');
  const [isReadingMode, setIsReadingMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-[#0f172a] text-[#f1f5f9]';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-[#f8fafc] text-[#0f172a]';
    }
  }, [darkMode]);

  useEffect(() => {
    if (isReadingMode) {
      document.body.classList.add('reading-mode-active');
    } else {
      document.body.classList.remove('reading-mode-active');
    }
  }, [isReadingMode]);

  const navItems = [
    { name: 'Utama', icon: <Home size={22} />, path: '/' },
    { name: 'Mushaf', icon: <Book size={22} />, path: '/mushaf' },
    { name: 'Murottal', icon: <Music size={22} />, path: '/audio' },
    { name: 'Iqro', icon: <LayoutGrid size={22} />, path: '/iqro' },
    { name: 'Doa', icon: <Heart size={22} />, path: '/doa' },
    { name: 'Recording', icon: <Mic size={22} />, path: '/record' },
  ];

  return (
    <Router>
      <div 
        className={`min-h-screen transition-colors duration-300 flex flex-col md:flex-row overflow-x-hidden`}
        style={{ fontSize: `${zoom * 16}px` }}
      >
        {/* Mobile Header */}
        {!isReadingMode && (
          <header className="md:hidden flex items-center justify-between p-5 bg-emerald-800 text-white sticky top-0 z-50 app-header shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500 rounded-xl shadow-inner">
                 <BookOpen className="text-emerald-900" size={24} />
              </div>
              <span className="font-black text-xl tracking-tight">IQRO Digital</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2.5 bg-emerald-700/50 rounded-xl">
                <Menu size={24} />
              </button>
            </div>
          </header>
        )}

        {/* Reading Mode Close Button */}
        {isReadingMode && (
          <button 
            onClick={() => setIsReadingMode(false)}
            className="fixed top-8 right-8 z-[100] p-4 bg-emerald-600 text-white rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 font-black"
          >
            <X size={24} /> Keluar Mode Baca
          </button>
        )}

        {/* Sidebar */}
        {!isReadingMode && (
          <aside className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-[#064e3b] text-white transform transition-transform duration-500 ease-in-out md:relative md:translate-x-0
            ${isSidebarOpen ? 'translate-x-0 shadow-[20px_0_60px_rgba(0,0,0,0.4)]' : '-translate-x-full'}
          `}>
            <div className="flex flex-col h-full">
              <div className="p-8 flex items-center justify-between border-b border-emerald-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-500 rounded-[1rem] shadow-2xl">
                    <BookOpen className="text-emerald-900" size={28} />
                  </div>
                  <span className="font-black text-2xl tracking-tighter">IQRO Digital</span>
                </div>
                <button className="md:hidden p-2 bg-emerald-900/50 rounded-xl" onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
              </div>

              <nav className="flex-1 px-6 py-10 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-5 px-6 py-4 rounded-[1.2rem] hover:bg-emerald-800/80 transition-all group hover:translate-x-2"
                  >
                    <span className="text-emerald-400 group-hover:text-amber-400 group-hover:scale-110 transition-all">{item.icon}</span>
                    <span className="font-black text-base">{item.name}</span>
                  </Link>
                ))}
              </nav>

              <div className="p-8 border-t border-emerald-800/50 bg-[#043d2f]">
                <button 
                  onClick={() => setIsReadingMode(true)}
                  className="w-full flex items-center justify-center gap-4 px-6 py-5 bg-emerald-800 hover:bg-emerald-700 rounded-[1.5rem] transition-all mb-8 border-2 border-emerald-600/30 font-black shadow-lg group"
                >
                  <BookMarked size={22} className="text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm uppercase tracking-widest">Mode Baca</span>
                </button>
                <div className="flex justify-center">
                   <SettingsMenu darkMode={darkMode} setDarkMode={setDarkMode} zoom={zoom} setZoom={setZoom} lang={appLang} setLang={setAppLang} />
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 md:p-14 scroll-smooth">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/mushaf" element={<SurahList />} />
              <Route path="/surah/:number" element={<SurahReader appLang={appLang} />} />
              <Route path="/juz/:number" element={<JuzReader />} />
              <Route path="/audio" element={<AudioPlayer />} />
              <Route path="/iqro" element={<IqroModule />} />
              <Route path="/doa" element={<DoaModule />} />
              <Route path="/record" element={<RecordingModule />} />
              <Route path="/tafsir/:number" element={<TafsirModule />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
            {!isReadingMode && <Footer />}
          </div>

          {/* Bottom Navigation for Mobile */}
          {!isReadingMode && (
            <nav className="md:hidden bg-white dark:bg-[#0b1121] border-t border-slate-200 dark:border-slate-800 py-4 px-6 flex justify-around items-center sticky bottom-0 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
              {navItems.slice(0, 5).map((item) => (
                <Link key={item.path} to={item.path} className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {item.icon}
                  <span className="text-[10px] uppercase font-black tracking-[0.2em]">{item.name}</span>
                </Link>
              ))}
              <div className="px-2 border-l border-slate-100 dark:border-slate-800">
                 <SettingsMenu darkMode={darkMode} setDarkMode={setDarkMode} zoom={zoom} setZoom={setZoom} lang={appLang} setLang={setAppLang} />
              </div>
            </nav>
          )}
        </main>
      </div>
    </Router>
  );
};

const Dashboard: React.FC = () => {
  const [dailyAyah, setDailyAyah] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const loadDailyAyah = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDailyAyah();
      setDailyAyah(data);
    } catch (err: any) {
      console.error("Dashboard error:", err);
      setError(err.message || "Gagal memuat ayat harian.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDailyAyah();
  }, []);

  const toggleAudio = () => {
    if (!dailyAyah) return;
    const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${dailyAyah[0].number}.mp3`;
    
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.onended = () => setIsPlaying(false);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-5xl font-black mb-4 tracking-tighter">Assalamu'alaikum</h1>
          <p className="text-emerald-50 text-xl opacity-90 max-w-lg font-bold leading-relaxed">
            Teruslah istiqomah membaca Al-Quran. Hiasi hari-hari Anda dengan lantunan wahyu Ilahi yang menentramkan jiwa.
          </p>
          <div className="mt-12 flex gap-4">
             <Link to="/mushaf" className="bg-amber-400 hover:bg-amber-500 text-emerald-950 px-10 py-5 rounded-2xl font-black text-xl transition-all transform hover:scale-105 shadow-2xl shadow-amber-500/30">
                Mulai Membaca
             </Link>
          </div>
        </div>
        <BookOpen className="absolute -right-16 -bottom-16 text-emerald-400 opacity-20 group-hover:scale-110 transition-transform duration-1000" size={400} />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 border-4 border-slate-100 dark:border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-2xl text-amber-600 shadow-inner"><Sparkles size={24}/></div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Ayat Hari Ini</h2>
           </div>
           {dailyAyah && (
             <button 
               onClick={toggleAudio}
               className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isPlaying ? 'bg-amber-500 text-white animate-pulse' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}
             >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
             </button>
           )}
        </div>
        
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-slate-100 dark:bg-slate-900 rounded-xl w-3/4 ml-auto"></div>
            <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-xl w-1/2"></div>
            <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-xl w-2/3"></div>
          </div>
        ) : error ? (
           <div className="flex flex-col items-center gap-4 py-6">
             <p className="text-slate-500 font-bold">{error}</p>
             <button onClick={loadDailyAyah} className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all">
               <RefreshCw size={16} /> Coba Lagi
             </button>
           </div>
        ) : dailyAyah && (
          <div className="space-y-8">
             <div className="text-right">
                <p className="font-quran text-4xl leading-[2.2] text-slate-950 dark:text-slate-100 font-bold" dir="rtl">
                  {dailyAyah[0].text}
                </p>
             </div>
             <div className="bg-emerald-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border-2 border-emerald-100 dark:border-emerald-900/30">
                <p className="text-slate-900 dark:text-slate-300 text-xl font-bold italic leading-relaxed">
                  "{formatHonorifics(dailyAyah[1].text)}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                   <div className="h-px bg-emerald-200 dark:bg-emerald-800 flex-1"></div>
                   <p className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-[0.3em]">
                     QS. {dailyAyah[0].surah.englishName}: {dailyAyah[0].numberInSurah}
                   </p>
                   <div className="h-px bg-emerald-200 dark:bg-emerald-800 flex-1"></div>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Progres Iqro" desc="Lanjut Belajar" icon={<TrendingUp className="text-emerald-500" />} link="/iqro" color="bg-emerald-500/10" />
        <DashboardCard title="Audio Populer" desc="Murottal Quran" icon={<Music className="text-blue-500" />} link="/audio" color="bg-blue-500/10" />
        <DashboardCard title="Hafalan Doa" desc="Doa-Doa Pilihan" icon={<Heart className="text-pink-500" />} link="/doa" color="bg-pink-500/10" />
      </div>

      <div className="bg-white dark:bg-[#0b1121] rounded-[3rem] p-12 shadow-2xl border-2 border-slate-100 dark:border-slate-800">
        <h2 className="text-3xl font-black mb-10 flex items-center gap-4 text-slate-900 dark:text-white">
          <LayoutGrid size={32} className="text-emerald-500" />
          Statistik Mushaf Digital
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatBox label="Total Surah" value="114" />
          <StatBox label="Total Ayat" value="6236" />
          <StatBox label="Makkiyah" value="86" />
          <StatBox label="Madaniyah" value="28" />
        </div>
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{title: string, desc: string, icon: React.ReactNode, link: string, color: string}> = ({title, desc, icon, link, color}) => (
  <Link to={link} className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all group hover:-translate-y-2">
    <div className={`w-16 h-16 rounded-[1.2rem] ${color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm`}>
      {icon}
    </div>
    <h3 className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-[0.2em]">{title}</h3>
    <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 group-hover:text-emerald-600 transition-colors tracking-tight">{desc}</p>
  </Link>
);

const StatBox: React.FC<{label: string, value: string}> = ({label, value}) => (
  <div className="text-center p-8 bg-slate-50 dark:bg-slate-900/30 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800/50 shadow-inner hover:scale-105 transition-transform">
    <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2">{value}</p>
    <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest">{label}</p>
  </div>
);

export default App;
