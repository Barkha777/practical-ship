import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import PracticalCard from '../components/PracticalCard';
import PracticalModal from '../components/PracticalModal';
import SubjectModal from '../components/SubjectModal';
import Breadcrumbs from '../components/Breadcrumbs';
import { Plus, Search, BookOpen, FileCode, Edit3, Trash2, ShieldCheck, Filter } from 'lucide-react';

const SubjectPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { data, isAdmin, addPractical, updateSubject, deleteSubject } = useContext(DataContext);

  const [isAddPracOpen, setIsAddPracOpen] = useState(false);
  const [isEditSubOpen, setIsEditSubOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const subject = data.subjects.find((s) => s.id === subjectId);

  if (!subject) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">Subject Not Found</h2>
        <p className="text-sm text-slate-400">The requested subject does not exist or was deleted.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
          Return Home
        </Link>
      </div>
    );
  }

  const practicalsList = subject.practicals || [];

  const filteredPracticals = practicalsList.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
      `practical ${p.practicalNo}`.includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddPracticalSave = (pracObj) => {
    addPractical(subject.id, pracObj);
  };

  const handleDeleteSubject = () => {
    if (window.confirm(`Are you sure you want to delete "${subject.name}" and all its practicals?`)) {
      deleteSubject(subject.id);
      navigate('/');
    }
  };

  const gradientClass = subject.color || 'from-cyan-500 to-blue-600';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: subject.name, icon: 'book' }
        ]}
      />

      {/* Subject Header Banner */}
      <div className={`relative glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 overflow-hidden bg-slate-900/90`}>
        <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${gradientClass}`} />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 text-xs font-mono font-extrabold bg-slate-800 text-cyan-400 rounded-lg border border-slate-700">
                {subject.code}
              </span>
              <span className="px-3 py-1 text-xs font-bold bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20">
                {practicalsList.length} Practicals
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 text-slate-900 tracking-tight">
              {subject.name}
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {subject.description || 'Collection of laboratory practicals, algorithms, implementation code, and analysis notes.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <button
              onClick={() => setIsAddPracOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-purple-500/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              Add Practical
            </button>

            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditSubOpen(true)}
                  className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                  title="Edit Subject Metadata"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDeleteSubject}
                  className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete Subject"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Status Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold overflow-x-auto">
            {['All', 'Completed', 'In Progress', 'Draft'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search practicals by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Practicals List */}
      {filteredPracticals.length > 0 ? (
        <div className="space-y-4">
          {filteredPracticals.map((prac) => (
            <PracticalCard key={prac.id} practical={prac} subjectId={subject.id} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4 border border-slate-800">
          <FileCode className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-300">No practicals found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            {searchQuery || statusFilter !== 'All'
              ? `No practicals match your active filters.`
              : "This subject currently has no practicals. Click 'Add Practical' to create one."}
          </p>
          <button
            onClick={() => setIsAddPracOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 hover:bg-purple-400 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Practical
          </button>
        </div>
      )}

      {/* Add Practical Modal */}
      <PracticalModal
        isOpen={isAddPracOpen}
        onClose={() => setIsAddPracOpen(false)}
        onSave={handleAddPracticalSave}
        nextPracticalNo={practicalsList.length + 1}
      />

      {/* Edit Subject Modal */}
      <SubjectModal
        isOpen={isEditSubOpen}
        onClose={() => setIsEditSubOpen(false)}
        onSave={(updated) => updateSubject(subject.id, updated)}
        subjectToEdit={subject}
      />
    </div>
  );
};

export default SubjectPage;
