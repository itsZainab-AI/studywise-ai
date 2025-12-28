
import React, { useState } from 'react';
import { searchScholarships } from '../services/geminiService';

export const ScholarshipSearch: React.FC = () => {
  const [filters, setFilters] = useState({
    country: '',
    course: '',
    eligibility: ''
  });
  const [results, setResults] = useState<{ text: string, urls: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchScholarships(filters);
      setResults(data);
    } catch (err) {
      alert("Failed to fetch scholarships. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">Scholarship Radar</h2>
        <p className="text-slate-500">Find real-time funding opportunities across the globe</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-tight">Destination Country</label>
            <input
              type="text"
              placeholder="e.g. UK, Germany, USA"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-tight">Your Course/Field</label>
            <input
              type="text"
              placeholder="e.g. MBA, CS, Arts"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
              value={filters.course}
              onChange={(e) => setFilters({ ...filters, course: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-tight">Other Criteria</label>
            <input
              type="text"
              placeholder="e.g. 80% marks, women only"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
              value={filters.eligibility}
              onChange={(e) => setFilters({ ...filters, eligibility: e.target.value })}
            />
          </div>
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all transform active:scale-95 disabled:bg-slate-300"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Scanning the Web for Scholarships...
            </span>
          ) : 'Search Scholarships'}
        </button>
      </div>

      {results && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">✨</span> Top Matches for You
            </h3>
            <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700 leading-relaxed">
              {results.text}
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Official Application Links</h3>
            <div className="flex flex-wrap gap-3">
              {results.urls.length > 0 ? results.urls.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-700 px-4 py-2 rounded-xl text-sm font-medium border border-blue-200 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                >
                  🔗 Source {i + 1}: {new URL(url).hostname}
                </a>
              )) : (
                <p className="text-blue-600/70 italic text-sm">No direct links found. Please check university official sites.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {!results && !loading && (
        <div className="text-center py-20 opacity-30">
          <span className="text-7xl block mb-4">🔍</span>
          <p className="text-lg font-medium">Enter your details to start searching</p>
        </div>
      )}
    </div>
  );
};
