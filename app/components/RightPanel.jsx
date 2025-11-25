"use client";
import { useEffect, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import Footer from "./Footer";

export default function RightPanel() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&pageSize=3`
        );
        const data = await response.json();
        if (data.articles){
          setArticles(data.articles);
          console.log("Fetched articles:", data.articles);
        }
        
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }
    fetchArticles();
  }, []);

  return (
    <aside className="p-0 space-y-6">
      <div className="flex justify-end">
        <ThemeSwitcher className="h-6 w-6"/>
      </div>

      <div className="bg-[rgb(var(--color-bg-hover))] rounded-2xl overflow-hidden">
        <h3 className="text-xl font-bold px-4 py-3">Today's News</h3>
        <ul className="divide-y divide-gray-200">
          {articles.map((article, index) => (
            <li key={index} className="border-b border-[rgb(var(--color-border))] mt-4 pb-2">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
              )}
              <h4 className="font font-semibold">{article.title}</h4>
              <p className="text-sm text-gray-600">{article.source.name}</p>
            </li> 
          ))}
          {articles.length === 0 && (
            <li className="px-4 py-3 text-gray-500">Loading news…</li>
          )}
        </ul> 
      </div>
      <Footer/>
    </aside>
  );
}
