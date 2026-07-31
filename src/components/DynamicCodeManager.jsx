import React, { useState } from 'react';
import { Code2, Copy, Check, Plus, Trash2, ChevronUp, ChevronDown, Terminal, FileCode2 } from 'lucide-react';

const SUPPORTED_LANGUAGES = [
  { id: 'cpp', name: 'C++' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'c', name: 'C Language' },
  { id: 'pseudocode', name: 'Pseudocode' },
  { id: 'sql', name: 'SQL' },
  { id: 'html', name: 'HTML / CSS' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' }
];

const DynamicCodeManager = ({ codeSections = [], onChange, isAdmin = false }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text || '');
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const addCodeSection = () => {
    const newSection = {
      id: `code-${Date.now()}`,
      title: `Code Snippet #${codeSections.length + 1}`,
      language: 'cpp',
      code: ''
    };
    onChange([...codeSections, newSection]);
  };

  const updateSection = (id, key, value) => {
    const updated = codeSections.map(sec => sec.id === id ? { ...sec, [key]: value } : sec);
    onChange(updated);
  };

  const deleteSection = (id) => {
    if (window.confirm("Remove this code snippet?")) {
      onChange(codeSections.filter(sec => sec.id !== id));
    }
  };

  const moveSection = (index, direction) => {
    const newArr = [...codeSections];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newArr.length) return;
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;
    onChange(newArr);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span>Code Implementations ({codeSections.length})</span>
        </div>

        {isAdmin && (
          <button
            type="button"
            onClick={addCodeSection}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Language Code Snippet
          </button>
        )}
      </div>

      {codeSections.length === 0 ? (
        <div className="p-8 rounded-2xl border border-dashed border-slate-800 text-center space-y-2">
          <Code2 className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-xs text-slate-500">
            {isAdmin
              ? "No code snippets added yet. Click 'Add Language Code Snippet' above to insert implementation code."
              : "No code implementation available for this practical."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {codeSections.map((sec, idx) => (
            <div
              key={sec.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-lg"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-3 flex-1 mr-4">
                  {isAdmin ? (
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => updateSection(sec.id, 'title', e.target.value)}
                      placeholder="Snippet Title (e.g. C++ Recursive Implementation)"
                      className="bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1 text-xs text-slate-100 font-semibold focus:outline-none focus:border-cyan-500 max-w-xs"
                    />
                  ) : (
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                      <FileCode2 className="w-4 h-4 text-cyan-400" />
                      {sec.title || `Snippet #${idx + 1}`}
                    </span>
                  )}

                  {isAdmin ? (
                    <select
                      value={sec.language}
                      onChange={(e) => updateSection(sec.id, 'language', e.target.value)}
                      className="bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-cyan-400 font-mono focus:outline-none"
                    >
                      {SUPPORTED_LANGUAGES.map(lang => (
                        <option key={lang.id} value={lang.id}>{lang.name}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="px-2.5 py-0.5 text-[11px] font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md">
                      {SUPPORTED_LANGUAGES.find(l => l.id === sec.language)?.name || sec.language}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(sec.id, sec.code)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    {copiedId === sec.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {isAdmin && (
                    <>
                      <button
                        type="button"
                        onClick={() => moveSection(idx, -1)}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSection(idx, 1)}
                        disabled={idx === codeSections.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteSection(sec.id)}
                        className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4 overflow-x-auto">
                {isAdmin ? (
                  <textarea
                    rows="10"
                    value={sec.code}
                    onChange={(e) => updateSection(sec.id, 'code', e.target.value)}
                    placeholder="Enter or paste implementation source code here..."
                    className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 leading-relaxed"
                  />
                ) : (
                  <pre className="font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                    <code>{sec.code || "// No code entered."}</code>
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicCodeManager;
