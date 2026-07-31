import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileCode, Calendar, ChevronRight, Edit3, Trash2, CheckCircle2, Clock, FileEdit } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import PracticalModal from './PracticalModal';

const PracticalCard = ({ practical, subjectId }) => {
  const { isAdmin, updatePractical, deletePractical } = useContext(DataContext);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete Practical ${practical.practicalNo}: "${practical.title}"?`)) {
      deletePractical(subjectId, practical.id);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditOpen(true);
  };

  const handleSaveEdit = (updatedFields) => {
    updatePractical(subjectId, practical.id, updatedFields);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
            <FileEdit className="w-3.5 h-3.5" />
            Draft
          </span>
        );
    }
  };

  const pracNoStr = practical.practicalNo < 10 ? `0${practical.practicalNo}` : practical.practicalNo;

  return (
    <>
      <Link
        to={`/subject/${subjectId}/practical/${practical.id}`}
        className="group glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 dark:bg-slate-900/80 bg-white border border-slate-800/80 dark:border-slate-800 shadow-md transition-all duration-200"
      >
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-extrabold text-base font-mono shrink-0">
            P{pracNoStr}
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-mono font-bold text-cyan-400">
                Practical {pracNoStr}
              </span>
              {getStatusBadge(practical.status)}
              {practical.updatedAt && (
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {practical.updatedAt}
                </span>
              )}
            </div>

            <h4 className="text-lg font-bold text-slate-100 dark:text-slate-100 text-slate-900 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {practical.title}
            </h4>

            {practical.shortDescription && (
              <p className="text-xs text-slate-400 line-clamp-2">
                {practical.shortDescription}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
          {isAdmin && (
            <div className="flex items-center gap-1">
              <button
                onClick={handleEditClick}
                title="Edit Practical Metadata"
                className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-xl transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                title="Delete Practical"
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
            Open Lab
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </Link>

      <PracticalModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveEdit}
        practicalToEdit={practical}
      />
    </>
  );
};

export default PracticalCard;
