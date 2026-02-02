
import { Surah, Ayah, Qari } from '../types';

const BASE_URL = 'https://api.alquran.cloud/v1';

export const fetchSurahs = async (): Promise<Surah[]> => {
  const response = await fetch(`${BASE_URL}/surah`);
  const data = await response.json();
  return data.data;
};

export const fetchSurahWithTranslation = async (surahNumber: number, lang: string = 'id.indonesian'): Promise<any> => {
  const response = await fetch(`${BASE_URL}/surah/${surahNumber}/editions/quran-uthmani,${lang}`);
  const data = await response.json();
  return data.data;
};

export const fetchTafsir = async (surahNumber: number, tafsirEdition: string = 'id.jalalayn'): Promise<any> => {
    const response = await fetch(`${BASE_URL}/surah/${surahNumber}/${tafsirEdition}`);
    const data = await response.json();
    return data.data;
};

export const fetchLanguages = async () => {
  const response = await fetch(`${BASE_URL}/language`);
  const data = await response.json();
  return data.data;
};

export const fetchJuz = async (juzNumber: number, edition: string = 'quran-uthmani') => {
  const response = await fetch(`${BASE_URL}/juz/${juzNumber}/${edition}`);
  const data = await response.json();
  return data.data;
};

export const searchQuran = async (keyword: string, surah: number | 'all', language: string) => {
  const url = `${BASE_URL}/search/${keyword}/${surah}/${language}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};

export const fetchDailyAyah = async () => {
  // Use day of year to get a consistent daily ayah
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const ayahNumber = (dayOfYear % 6236) + 1;
  const response = await fetch(`${BASE_URL}/ayah/${ayahNumber}/editions/quran-uthmani,id.indonesian`);
  const data = await response.json();
  return data.data;
};
