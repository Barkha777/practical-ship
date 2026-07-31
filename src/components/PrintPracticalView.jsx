import React from 'react';

const PrintPracticalView = ({ subject, practical }) => {
  if (!practical || !subject) return null;

  return (
    <div className="hidden print:block p-8 bg-white text-slate-900 font-sans leading-relaxed">
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{subject.name}</h1>
          <p className="text-sm font-semibold text-slate-600">Course Code: {subject.code}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-slate-900">Practical #{practical.practicalNo}</p>
          <p className="text-xs text-slate-500">Date: {practical.updatedAt || new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Aim */}
      <div className="mb-6">
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
          Aim / Title
        </h2>
        <p className="text-lg font-bold text-slate-900">{practical.title}</p>
        {practical.shortDescription && (
          <p className="text-sm text-slate-600 mt-1">{practical.shortDescription}</p>
        )}
      </div>

      {/* Information */}
      {practical.sections?.information && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
            1. Theoretical Information / Overview
          </h2>
          <div className="text-sm whitespace-pre-wrap text-slate-800">
            {practical.sections.information}
          </div>
        </div>
      )}

      {/* Procedure */}
      {practical.sections?.procedure && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
            2. Procedure / Algorithm
          </h2>
          <div className="text-sm whitespace-pre-wrap font-mono bg-slate-50 p-3 rounded border border-slate-200 text-slate-800">
            {practical.sections.procedure}
          </div>
        </div>
      )}

      {/* Code Sections */}
      {practical.sections?.codeSections && practical.sections.codeSections.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
            3. Source Code Implementation
          </h2>
          {practical.sections.codeSections.map((sec, idx) => (
            <div key={idx} className="mb-4">
              <p className="text-xs font-bold text-slate-700 mb-1">
                {sec.title} ({sec.language})
              </p>
              <pre className="text-xs font-mono bg-slate-100 p-3 rounded border border-slate-300 whitespace-pre-wrap overflow-x-auto">
                <code>{sec.code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* Comparison Table */}
      {practical.sections?.comparisonTable && practical.sections.comparisonTable.headers && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
            4. {practical.sections.comparisonTable.title || "Comparison & Analysis Table"}
          </h2>
          <table className="w-full text-xs text-left border-collapse border border-slate-400">
            <thead>
              <tr className="bg-slate-200 border-b border-slate-400">
                {practical.sections.comparisonTable.headers.map((h, i) => (
                  <th key={i} className="p-2 border border-slate-400 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {practical.sections.comparisonTable.rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-slate-300">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-2 border border-slate-300">{cell || "—"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Conclusion */}
      {practical.sections?.conclusion && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
            5. Conclusion / Observations
          </h2>
          <p className="text-sm whitespace-pre-wrap text-slate-800 italic">
            {practical.sections.conclusion}
          </p>
        </div>
      )}
    </div>
  );
};

export default PrintPracticalView;
