import React, { useState, useEffect } from 'react';
import { X, FileCode, Hash, ListCheck } from 'lucide-react';

const STATUS_OPTIONS = ['Draft', 'In Progress', 'Completed'];

const PracticalModal = ({ isOpen, onClose, onSave, practicalToEdit = null, nextPracticalNo = 1 }) => {
  const [practicalNo, setPracticalNo] = useState(nextPracticalNo);
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [status, setStatus] = useState('Draft');

  useEffect(() => {
    if (practicalToEdit) {
      setPracticalNo(practicalToEdit.practicalNo || 1);
      setTitle(practicalToEdit.title || '');
      setShortDescription(practicalToEdit.shortDescription || '');
      setStatus(practicalToEdit.status || 'Draft');
    } else {
      setPracticalNo(nextPracticalNo);
      setTitle('');
      setShortDescription('');
      setStatus('Draft');
    }
  }, [practicalToEdit, isOpen, nextPracticalNo]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      practicalNo: Number(practicalNo) || 1,
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      status
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 dark:bg-slate-900 dark:border-slate-800 bg-white border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100 dark:text-slate-100 text-slate-900">
                {practicalToEdit ? 'Edit Practical Metadata' : 'Add New Practical'}
              </h2>
              <p className="text-xs text-slate-400">
                {practicalToEdit ? 'Modify title, number, or completion status' : 'Create an empty practical entry to add content'}
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
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Practical No. *
              </label>
              <input
                type="number"
                min="1"
                required
                value={practicalNo}
                onChange={(e) => setPracticalNo(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Title / Aim *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Implementation of Quick Sort Algorithm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Short Description (Optional)
            </label>
            <textarea
              rows="3"
              placeholder="Brief summary displayed on practical cards..."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
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
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:brightness-110 shadow-lg shadow-purple-500/25 transition-all"
            >
              {practicalToEdit ? 'Update Metadata' : 'Create Practical'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PracticalModal;
