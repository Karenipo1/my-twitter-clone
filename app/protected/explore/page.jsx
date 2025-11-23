"use client";

import { trendingTags, suggestedAccounts } from "./data";

export default function ExplorePage() {
  return (
    <div className="font-semibold text-[rgb(var(--color-text))] pt-8">
      <h2 className="text-xl font-bold px-4 py-3">Explore</h2>

      {/* Tendencias */}
      <section>
        <h3 className="font-semibold mb-2">Trendy</h3>
        {trendingTags.map((t, i) => (
          <div key={i} className="py-2 border-b">
            <p className="font-medium">{t.tag}</p>
            <p className="text-sm text-gray-500">{t.tweets} tweets</p>
          </div>
        ))}
      </section>

      {/* Cuentas sugeridas */}
      <section>
        <h3 className="font-semibold mb-2">Who to follow</h3>

        {suggestedAccounts.map((acc) => (
          <div key={acc.id} className="flex items-center gap-3 py-2">
            <img
              src={acc.avatar}
              className="w-10 h-10 rounded-full"
              alt={acc.username}
            />
            <div className="flex flex-col">
              <span className="font-medium">{acc.name}</span>
              <span className="text-gray-500 text-sm">{acc.username}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
