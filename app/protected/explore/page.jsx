"use client";

import { trendingTags, suggestedAccounts, trendsByLocation } from "./data";
import { useState } from "react";

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("trendy");

  const tabBase =
    "cursor-pointer px-3 py-2 transition-colors duration-200 rounded hover:bg-gray-200/50 dark:hover:bg-gray-700/40";

  const tabActive = "bg-gray-200/70 dark:bg-gray-700/70 font-bold";

  return (
    <div className="font-semibold text-[rgb(var(--color-text))]">
      <h2 className="text-2xl font-bold mt-4 px-0 py-3">Explore</h2>
      
      {/* trendy */}
      <div className="flex gap-4 mb-4 text-gray-500 border-b 
        border-[rgb(var(--color-border))]  pb-2">
        <div
          className={`${tabBase} ${
            activeTab === "trendy" ? tabActive : ""
          }`}
          onClick={() => setActiveTab("trendy")}
        >
          Trending
        </div>
        
        <div
          className={`${tabBase} ${
            activeTab === "follow" ? tabActive : ""
          }`}
          onClick={() => setActiveTab("follow")}
        >
        Who to follow
        </div>

        <div
          className={`${tabBase} ${
            activeTab === "trendsByLocation" ? tabActive : ""
          }`}
          onClick={() => setActiveTab("trendsByLocation")}
        >
          News
        </div>
      </div>
      {/* ---- Panel Trendy ---- */}
      <div className={activeTab === "trendy" ? "block" : "hidden"}>
        {trendingTags.map((t, i) => (
          <div key={i} className="py-2 ">
            <p className="font-medium text-xl">{t.tag}</p>
            <p className=" text-sm text-gray-500">{t.tweets} tweets</p>
          </div>
        ))}
      </div>
      {/* ---- Panel Who to follow ---- */}
      <div className={activeTab === "follow" ? "block" : "hidden"}>
        {suggestedAccounts.map((acc) => (
          <div key={acc.id} className="flex items-center gap-3 py-2">
            <img
              src={acc.avatar}
              className="w-12 h-12 rounded-full"
              alt={acc.username}
            />
            <div className="flex flex-col text-xl">
              <span className="font-medium">{acc.name}</span>
              <span className="text-gray-500">{acc.username}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={activeTab === "trendsByLocation" ? "block" : "hidden"}>
        {trendsByLocation.global.map((t, i) => (
          <div key={i} className="py-2 ">
            <p className="font-medium text-xl">{t.topic}</p>
            <p className=" text-sm text-gray-500">News - {t.count} posts</p>
          </div>
        ))}
      </div>
    </div>
  );
}
