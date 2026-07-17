import { useState, useEffect } from 'react';

export default function useNews() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const [jakpostRes, antaraRes, antaraEkoRes] = await Promise.all([
          fetch('/api/jakpost/category/culture/environment').catch(e => null),
          fetch('/api/antara-news/warta-bumi').catch(e => null),
          fetch('/api/antara-news/ekonomi').catch(e => null)
        ]);

        let combinedNews = [];

        if (jakpostRes && jakpostRes.ok) {
          const jakpostJson = await jakpostRes.json();
          if (jakpostJson && jakpostJson.posts) {
            const mappedJakpost = jakpostJson.posts.map((item, index) => {
              const wordCount = item.headline ? item.headline.split(' ').length : 200;
              const readTime = Math.max(1, Math.ceil(wordCount / 100)) + ' menit';
              
              return {
                id: `jakpost-${index}`,
                title: item.title,
                category: item.category,
                date: item.pusblised_at,
                readTime: readTime, 
                image: item.image,
                summary: item.headline,
                content: item.headline,
                link: item.link
              };
            });
            combinedNews = [...combinedNews, ...mappedJakpost];
          }
        }

        if (antaraRes && antaraRes.ok) {
          const antaraJson = await antaraRes.json();
          if (antaraJson && antaraJson.data) {
            const mappedAntara = antaraJson.data.map((item, index) => {
              const wordCount = item.description ? item.description.split(' ').length : 200;
              const readTime = Math.max(1, Math.ceil(wordCount / 100)) + ' menit';
              
              return {
                id: `antara-bumi-${index}`,
                title: item.title,
                category: "Lingkungan",
                date: new Date(item.isoDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
                readTime: readTime, 
                image: item.image,
                summary: item.description,
                content: item.description,
                link: item.link
              };
            });
            combinedNews = [...combinedNews, ...mappedAntara];
          }
        }

        if (antaraEkoRes && antaraEkoRes.ok) {
          const antaraEkoJson = await antaraEkoRes.json();
          if (antaraEkoJson && antaraEkoJson.data) {
            const mappedAntaraEko = antaraEkoJson.data.map((item, index) => {
              const wordCount = item.description ? item.description.split(' ').length : 200;
              const readTime = Math.max(1, Math.ceil(wordCount / 100)) + ' menit';
              
              return {
                id: `antara-eko-${index}`,
                title: item.title,
                category: "Ekonomi",
                date: new Date(item.isoDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
                readTime: readTime, 
                image: item.image,
                summary: item.description,
                content: item.description,
                link: item.link
              };
            });
            combinedNews = [...combinedNews, ...mappedAntaraEko];
          }
        }

        setNewsList(combinedNews);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { newsList, loading, error };
}
