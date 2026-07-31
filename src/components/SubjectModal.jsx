import React, { useState, useEffect } from 'react';
import { X, BookOpen, Sparkles, Layers } from 'lucide-react';

const COLOR_OPTIONS = [
  { label: 'Cyan & Blue', value: 'from-cyan-500 to-blue-600' },
  { label: 'Purple & Indigo', value: 'from-purple-500 to-indigo-600' },
  { label: 'Emerald & Teal', value: 'from-emerald-500 to-teal-600' },
  { label: 'Amber & Orange', value: 'from-amber-500 to-orange-600' },
  { label: 'Rose & Pink', value: 'from-pink-500 to-rose-600' },
  { label: 'Violet & Fuchsia', value: 'from-violet-500 to-fuchsia-600' }
];

const SubjectModal = ({ isOpen, onClose, onSave, subjectToEdit = null }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(COLOR_OPTIONS[0].value);

  useEffect(() => {
    if (subjectToEdit) {
      setName(subjectToEdit.name || '');
      setCode(subjectToEdit.code || '');
      setDescription(subjectToEdit.description || '');
      setColor(subjectToEdit.color || COLOR_OPTIONS[0].value);
    } else {
      setName('');
      setCode('');
      setDescription('');
      setColor(COLOR_OPTIONS[0].value);
    }
  }, [subjectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      code: code.trim() || `CS-${Math.floor(100 + Math.random() * 900)}`,
      description: description.trim(),
      color
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 dark:bg-slate-900 dark:border-slate-800 bg-white border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100 dark:text-slate-100 text-slate-900">
                {subjectToEdit ? 'Edit Subject' : 'Add New Subject'}
              </h2>
              <p className="text-xs text-slate-400">
                {subjectToEdit ? 'Update details for this course' : 'Create a new course card for practicals'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Subject Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Design and Analysis of Algorithms (DAA)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Subject Code
            </label>
            <input
              type="text"
              placeholder="e.g. CS-401"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Course overview, syllabus summary, or lab targets..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Card Gradient Accent Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setColor(opt.value)}
                  className={`h-10 rounded-xl bg-gradient-to-r ${opt.value} flex items-center justify-center text-xs font-bold text-white transition-all ${
                    color === opt.value
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-105 shadow-md'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {opt.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/25 transition-all"
            >
              {subjectToEdit ? 'Update Subject' : 'Save Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;
