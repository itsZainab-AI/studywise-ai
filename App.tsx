
import React, { useState } from 'react';
import { AppView } from './types';
import { Navigation } from './components/Navigation';
import { StudyConsultant } from './components/StudyConsultant';
import { ScholarshipSearch } from './components/ScholarshipSearch';
import { SOPLORGuide } from './components/SOPLORGuide';

const Dashboard: React.FC<{ onNavigate: (v: AppView) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-20">
      <header className="bg-gradient-to-br from-blue-900 to-indigo-800 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <span className="text-9xl">🎓</span>
        </div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black">Dreams without Borders.</h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
            Expert-level study abroad guidance for Indian students. From scholarship matching to SOP drafting, 
            we manage the complexity so you can focus on your future.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate(AppView.CONSULTANT)}
              className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Free Consultation
            </button>
            <button 
              onClick={() => onNavigate(AppView.SOP_LOR)}
              className="bg-blue-800/40 backdrop-blur-md border border-blue-400/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-800/60 transition-colors"
            >
              Review my SOP/LOR
            </button>
          </div>
        </div>
      </header>

      <section>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Expert Toolset</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => onNavigate(AppView.CONSULTANT)}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🤖</div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Smart Counselor</h4>
            <p className="text-slate-500 leading-relaxed text-sm">Personalized university matching based on your GPA, budget, and career goals.</p>
          </div>
          <div 
            onClick={() => onNavigate(AppView.SCHOLARSHIPS)}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">💰</div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Scholarship Radar</h4>
            <p className="text-slate-500 leading-relaxed text-sm">Real-time tracking of funding for Indian students with verified links.</p>
          </div>
          <div 
            onClick={() => onNavigate(AppView.SOP_LOR)}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">✍️</div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">SOP/LOR Expert</h4>
            <p className="text-slate-500 leading-relaxed text-sm">Deep analysis and structural improvements for your application documents.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 p-8 rounded-[2rem] border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Why StudyWise AI?</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex gap-3 text-slate-700">
            <span className="text-green-500 font-bold">✓</span> 
            Zero Commission Bias: No paid university tie-ups.
          </li>
          <li className="flex gap-3 text-slate-700">
            <span className="text-green-500 font-bold">✓</span> 
            Focus on ROI: Find the best education at the lowest cost.
          </li>
          <li className="flex gap-3 text-slate-700">
            <span className="text-green-500 font-bold">✓</span> 
            Admissions Expert: AI trained on top university acceptance data.
          </li>
          <li className="flex gap-3 text-slate-700">
            <span className="text-green-500 font-bold">✓</span> 
            Document Refinement: Line-by-line expert editing tips.
          </li>
        </ul>
      </section>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onNavigate={setCurrentView} />;
      case AppView.CONSULTANT:
        return <StudyConsultant />;
      case AppView.SCHOLARSHIPS:
        return <ScholarshipSearch />;
      case AppView.SOP_LOR:
        return <SOPLORGuide />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pl-64">
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
      <main className="p-4 md:p-12 max-w-7xl mx-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
