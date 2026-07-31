import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import SubjectCard from "../components/SubjectCard";
import SubjectModal from "../components/SubjectModal";
import { Plus, Search, BookOpen, CheckCircle, FileCode, Layers, ShieldCheck } from "lucide-react";

const Home = () => {
  const { data, isAdmin, addSubject, globalSearch, setGlobalSearch } = useContext(DataContext);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredSubjects = data.subjects.filter((s) => {
    const q = globalSearch.toLowerCase().trim();
    if (!q) return true;
    const nameMatch = s.name.toLowerCase().includes(q);
    const codeMatch = s.code && s.code.toLowerCase().includes(q);
    const descMatch = s.description && s.description.toLowerCase().includes(q);
    const pracMatch = s.practicals && s.practicals.some(p => p.title.toLowerCase().includes(q));
    return nameMatch || codeMatch || descMatch || pracMatch;
  });

  const totalPracticals = data.subjects.reduce(
    (acc, s) => acc + (s.practicals ? s.practicals.length : 0),
    0
  );

  const totalCompleted = data.subjects.reduce(
    (acc, s) =>
      acc + (s.practicals ? s.practicals.filter((p) => p.status === "Completed").length : 0),
    0
  );

  const handleSaveNewSubject = (newSub) => {
    addSubject(newSub);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header Banner */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-8 overflow-hidden border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              Academic Practical & Lab Manager
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 text-slate-900 tracking-tight leading-tight">
              Organize & Document Academic Practicals
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Centralized repository for course practicals, algorithms, procedures, multi-language code snippets, and comparative analysis tables.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              Add New Subject
            </button>
          </div>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800/80 text-cyan-400 border border-slate-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-100">{data.subjects.length}</p>
              <p className="text-xs text-slate-400 font-semibold">Subjects</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800/80 text-purple-400 border border-slate-700">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-100">{totalPracticals}</p>
              <p className="text-xs text-slate-400 font-semibold">Total Practicals</p>
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
            <div className="p-2.5 rounded-xl bg-slate-800/80 text-emerald-400 border border-slate-700">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-100">{totalCompleted}</p>
              <p className="text-xs text-slate-400 font-semibold">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter subjects or codes..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          {isAdmin && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin controls active
            </span>
          )}
          <p className="text-xs text-slate-400">
            Showing {filteredSubjects.length} of {data.subjects.length} subjects
          </p>
        </div>
      </div>

      {/* Subjects Grid */}
      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4 border border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-300">No subjects found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            {globalSearch
              ? `No subjects match "${globalSearch}". Try adjusting your search query.`
              : "Get started by creating your first subject card using the button above."}
          </p>
          {!globalSearch && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              <Plus className="w-4 h-4" /> Add Subject
            </button>
          )}
        </div>
      )}

      {/* Add Subject Modal */}
      <SubjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewSubject}
      />
    </div>
  );
};

export default Home;
