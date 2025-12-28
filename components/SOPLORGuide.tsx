
import React, { useState, useRef, useEffect } from 'react';
import { analyzeSOPLOR } from '../services/geminiService';

const PREDEFINED_TEMPLATES = {
  SOP: [
    {
      name: "Computer Science (MS/PhD)",
      category: "STEM",
      content: "Statement of Purpose\n\nMy journey into the world of Computer Science began with a fascination for how logic can solve complex real-world problems. During my undergraduate studies at [University Name], I focused heavily on [Specific Field, e.g., Machine Learning], maintaining a GPA of [Your GPA].\n\nOne significant project I led involved [Describe a Project]. This experience taught me [Skill Learned]. I am now eager to pursue a Master’s at [Target University] because of its pioneering research in [Specific Lab/Professor Name]. My long-term goal is to [Your Career Goal] and contribute to the evolution of [Field]."
    },
    {
      name: "MBA / Management",
      category: "Business",
      content: "Statement of Purpose\n\nWith [Number] years of experience in [Industry], I have witnessed firsthand the impact of strategic decision-making on organizational growth. At [Current Company], I managed [Project/Team], achieving a [Number]% increase in efficiency. \n\nHowever, to transition into a global leadership role, I recognize the need for a rigorous business education. The MBA program at [University Name] is my top choice due to its [Specific Feature, e.g., Case Study Method]. I look forward to collaborating with a diverse cohort and leveraging my background in [Your Background] to add value to the classroom discussions."
    },
    {
      name: "Public Health / Medicine",
      category: "Healthcare",
      content: "Statement of Purpose\n\nMy commitment to public health stems from observing the disparities in healthcare accessibility in [Your Region/City]. During my tenure as a [Role/Intern] at [Organization], I realized that systemic change requires [Insight]. \n\nI am applying for the [Program Name] at [University] to gain the analytical skills necessary to design equitable health policies. I am particularly drawn to your focus on [Specific Research Area], as it aligns with my passion for [Specific Goal]."
    },
    {
      name: "Arts & Humanities",
      category: "Creative",
      content: "Statement of Purpose\n\nArt is more than expression; it is a tool for social commentary and historical preservation. Having completed my Bachelor’s in [Subject] from [University], I have spent the last two years exploring the intersection of [Interest A] and [Interest B].\n\nYour program’s emphasis on [Unique Program Feature] provides the ideal environment for me to refine my craft. I intend to use my time at [University] to develop a thesis on [Topic], which I hope to eventually expand into [Professional Goal]."
    }
  ],
  LOR: [
    {
      name: "Academic (Technical Professor)",
      category: "Education",
      content: "To the Admissions Committee,\n\nIt is my pleasure to recommend [Student Name] for admission to your [Degree Name] program. I have known [Student Name] for [Time] in my capacity as their professor for [Course Name] at [University]. \n\n[Student Name] consistently ranked in the top [Percentage]% of the class. What stood out most was their analytical thinking, especially during the final project where they [Specific Achievement]. They possess the academic rigor and intellectual curiosity required for graduate studies. I recommend them without reservation."
    },
    {
      name: "Professional (Direct Manager)",
      category: "Corporate",
      content: "Letter of Recommendation\n\nI am writing to highly recommend [Name] for the [Program Name]. As their direct supervisor at [Company] for [Time], I have closely observed their professional growth. \n\n[Name] played a pivotal role in [Major Project]. Their ability to lead a team under pressure was exceptional. They are a dedicated professional with a keen eye for detail and a proactive approach to problem-solving. I am confident they will be a valuable asset to your institution."
    },
    {
      name: "Research Supervisor LOR",
      category: "Academic",
      content: "Subject: Recommendation for [Name]\n\nI am writing to provide my strongest recommendation for [Name], who worked under my supervision as a Research Assistant for [Duration] on the project '[Project Title]'.\n\n[Name] demonstrated exceptional research acumen, particularly in [Specific Skill/Methodology]. Their contribution led to [Specific Outcome/Publication]. Their dedication to academic excellence and ability to work independently make them an ideal candidate for your research-intensive program."
    }
  ]
};

export const SOPLORGuide: React.FC = () => {
  const [docType, setDocType] = useState<'SOP' | 'LOR'>('SOP');
  const [draft, setDraft] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowTemplates(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAnalyze = async () => {
    if (!draft.trim()) return;
    setLoading(true);
    try {
      const result = await analyzeSOPLOR(draft, docType);
      setAnalysis(result);
    } catch (err) {
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyTemplate = (content: string) => {
    if (draft.trim() && draft.length > 50) {
      if (!window.confirm("Choosing a template will replace your current text. Do you want to continue?")) {
        return;
      }
    }
    setDraft(content);
    setShowTemplates(false);
    setAnalysis(null);
  };

  const structuralTips = {
    SOP: [
      { title: "The Hook", content: "Start with a specific incident or project that sparked your interest. Avoid generic 'Since childhood' openings." },
      { title: "Academic Background", content: "Focus on technical skills and research projects. Mention GPA only if it adds significant value." },
      { title: "Why this University?", content: "Name specific professors, labs, or courses. Connect them to your long-term career goals." }
    ],
    LOR: [
      { title: "Context", content: "State the capacity in which the recommender knows you (Professor, Manager) and for how long." },
      { title: "Quantifiable Impact", content: "Use numbers. 'Improved efficiency by 20%' or 'Top 5% of a class of 100'." },
      { title: "Soft Skills", content: "Highlight leadership, teamwork, and resilience with specific examples." }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">SOP & LOR Expert</h2>
        <p className="text-slate-500">Industry-standard document preparation for international admissions</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        {/* Toggle Switch */}
        <div className="flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner w-full sm:w-auto">
          <button 
            onClick={() => { setDocType('SOP'); setAnalysis(null); setDraft(''); }}
            className={`flex-1 sm:flex-none px-10 py-2.5 rounded-xl font-bold transition-all ${docType === 'SOP' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            SOP
          </button>
          <button 
            onClick={() => { setDocType('LOR'); setAnalysis(null); setDraft(''); }}
            className={`flex-1 sm:flex-none px-10 py-2.5 rounded-xl font-bold transition-all ${docType === 'LOR' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            LOR
          </button>
        </div>
        
        {/* Template Dropdown */}
        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
          <button 
            onClick={() => setShowTemplates(!showTemplates)}
            className="w-full sm:w-64 flex items-center justify-between gap-3 px-6 py-3 bg-white border border-blue-200 text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-sm group"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">🪄</span>
              {docType} Templates
            </span>
            <span className={`transition-transform duration-200 ${showTemplates ? 'rotate-180' : ''}`}>▼</span>
          </button>
          
          {showTemplates && (
            <div className="absolute top-full right-0 mt-3 w-72 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Select a structure to populate
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {PREDEFINED_TEMPLATES[docType].map((temp, i) => (
                  <button
                    key={i}
                    onClick={() => applyTemplate(temp.content)}
                    className="w-full text-left p-4 hover:bg-blue-50 transition-colors border-b border-slate-50 last:border-0"
                  >
                    <p className="text-sm font-bold text-slate-800">{temp.name}</p>
                    <p className="text-[10px] text-blue-500 font-medium uppercase tracking-tighter mt-0.5">{temp.category}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Editor (The Input) */}
        <div className="flex flex-col">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-lg flex flex-col h-full ring-1 ring-slate-100">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Document Workspace
              </h3>
              <div className="flex items-center gap-3">
                 {draft.length > 0 && (
                   <button 
                    onClick={() => { if(confirm("Clear all text?")) setDraft(''); }} 
                    className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
                   >
                     CLEAR ALL
                   </button>
                 )}
                 <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
                 <span className="text-[10px] font-black text-slate-500 px-3 py-1 bg-slate-100 rounded-full">
                   {draft.split(/\s+/).filter(Boolean).length} WORDS
                 </span>
              </div>
            </div>
            
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Paste your ${docType} here or select a template from the menu above to get started...`}
              className="flex-1 min-h-[500px] w-full p-8 border-none rounded-3xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none text-slate-700 leading-relaxed resize-none font-serif text-lg transition-all"
            />
            
            <button
              onClick={handleAnalyze}
              disabled={loading || !draft.trim()}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 text-white font-black py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  CONSULTING AI EXPERT...
                </span>
              ) : `RUN EXPERT ANALYSIS`}
            </button>
          </div>
        </div>

        {/* AI Analysis Output */}
        <div className="flex flex-col">
          {analysis ? (
            <div className="bg-white p-10 rounded-[2.5rem] border border-blue-50 shadow-xl h-full flex flex-col ring-1 ring-blue-50 overflow-hidden">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">✨</div>
                  <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-tighter">AI Expert Feedback</h3>
                    <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">In-depth Review</p>
                  </div>
                </div>
                <button 
                  onClick={() => setAnalysis(null)}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-xl text-[10px] font-black transition-colors"
                >
                  RETURN TO TIPS
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar prose prose-blue prose-p:text-slate-600 prose-headings:text-slate-800 prose-strong:text-blue-700 max-w-none">
                <div className="whitespace-pre-wrap text-base leading-relaxed">
                  {analysis}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center h-full min-h-[600px]">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-sm mb-8 animate-bounce">📋</div>
              <h4 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Document Review Portal</h4>
              <p className="text-slate-500 max-w-sm mb-12 text-sm font-medium leading-relaxed">
                Provide your draft to unlock comprehensive structural feedback, line-by-line grammar improvements, and university-standard tone adjustments.
              </p>
              
              <div className="w-full space-y-4 max-w-md">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Structural Tips</p>
                {structuralTips[docType].map((tip, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 text-left shadow-sm hover:border-blue-200 transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black">
                        0{i+1}
                      </span>
                      <p className="text-sm font-black text-blue-900 uppercase tracking-tight">{tip.title}</p>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium pl-9">{tip.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
