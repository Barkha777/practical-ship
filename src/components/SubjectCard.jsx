import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, ChevronRight, Trash2, Edit3, ShieldAlert } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import SubjectModal from './SubjectModal';

const SubjectCard = ({ subject }) => {
  const { isAdmin, updateSubject, deleteSubject } = useContext(DataContext);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${subject.name}"? All associated practicals will be deleted.`)) {
      deleteSubject(subject.id);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditOpen(true);
  };

  const handleSaveEdit = (updatedFields) => {
    updateSubject(subject.id, updatedFields);
  };

  const practicalCount = subject.practicals ? subject.practicals.length : 0;
  const completedCount = subject.practicals
    ? subject.practicals.filter((p) => p.status === 'Completed').length
    : 0;

  const gradientClass = subject.color || 'from-cyan-500 to-blue-600';

  return (
    <>
      <Link
        to={`/subject/${subject.id}`}
        className="group relative glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between overflow-hidden dark:bg-slate-900/80 bg-white border border-slate-800/80 dark:border-slate-800 shadow-md transition-all duration-300"
      >
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradientClass}`} />

        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-800 text-slate-200 rounded-md border border-slate-700">
                {subject.code || `SUB-${subject.id.slice(-4)}`}
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold bg-cyan-500/10 text-cyan-400 rounded-md border border-cyan-500/20">
                {practicalCount} {practicalCount === 1 ? 'Practical' : 'Practicals'}
              </span>
            </div>

            {isAdmin && (
              <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleEditClick}
                  title="Edit Subject"
                  className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDelete}
                  title="Delete Subject"
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <h3 className="text-xl font-extrabold text-slate-100 dark:text-slate-100 text-slate-900 group-hover:text-cyan-400 transition-colors mb-2 line-clamp-1">
            {subject.name}
          </h3>

          <p className="text-sm text-slate-400 dark:text-slate-400 text-slate-600 line-clamp-2 mb-6 leading-relaxed">
            {subject.description || 'Collection of laboratory practicals, procedure notes, and reference code.'}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>{completedCount} of {practicalCount} completed</span>
          </div>

          <span className="flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
            View Practicals
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </Link>

      <SubjectModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveEdit}
        subjectToEdit={subject}
      />
    </>
  );
};

export default SubjectCard;
