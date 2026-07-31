import React from 'react';
import { Table, Plus, Trash2, Edit3 } from 'lucide-react';

const DynamicTableEditor = ({ tableData, onChange, isAdmin = false }) => {
  const defaultData = {
    title: "Comparison & Analysis Table",
    headers: ["Parameter / Metric", "Method A", "Method B"],
    rows: [
      ["Time Complexity", "", ""],
      ["Space Complexity", "", ""]
    ]
  };

  const current = tableData && Array.isArray(tableData.headers) ? tableData : defaultData;

  const updateTitle = (val) => {
    onChange({ ...current, title: val });
  };

  const updateHeader = (colIndex, val) => {
    const newHeaders = [...current.headers];
    newHeaders[colIndex] = val;
    onChange({ ...current, headers: newHeaders });
  };

  const updateCell = (rowIndex, colIndex, val) => {
    const newRows = current.rows.map((row, rIdx) => {
      if (rIdx === rowIndex) {
        const copyRow = [...row];
        copyRow[colIndex] = val;
        return copyRow;
      }
      return row;
    });
    onChange({ ...current, rows: newRows });
  };

  const addColumn = () => {
    const newHeaders = [...current.headers, `Column ${current.headers.length + 1}`];
    const newRows = current.rows.map(row => [...row, ""]);
    onChange({ ...current, headers: newHeaders, rows: newRows });
  };

  const removeColumn = (colIndex) => {
    if (current.headers.length <= 1) return;
    const newHeaders = current.headers.filter((_, idx) => idx !== colIndex);
    const newRows = current.rows.map(row => row.filter((_, idx) => idx !== colIndex));
    onChange({ ...current, headers: newHeaders, rows: newRows });
  };

  const addRow = () => {
    const emptyRow = new Array(current.headers.length).fill("");
    onChange({ ...current, rows: [...current.rows, emptyRow] });
  };

  const removeRow = (rowIndex) => {
    if (current.rows.length <= 1) return;
    const newRows = current.rows.filter((_, idx) => idx !== rowIndex);
    onChange({ ...current, rows: newRows });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Table className="w-5 h-5 text-emerald-400" />
          {isAdmin ? (
            <input
              type="text"
              value={current.title || ""}
              onChange={(e) => updateTitle(e.target.value)}
              placeholder="Table Title (e.g. Sorting Algorithms Comparison)"
              className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          ) : (
            <h3 className="text-base font-bold text-slate-200">
              {current.title || "Custom Comparison Table"}
            </h3>
          )}
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={addColumn}
              className="px-3 py-1 text-xs font-semibold bg-slate-800 text-cyan-400 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Column
            </button>
            <button
              type="button"
              onClick={addRow}
              className="px-3 py-1 text-xs font-semibold bg-slate-800 text-emerald-400 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Row
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 shadow-lg">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
            <tr>
              {current.headers.map((h, colIdx) => (
                <th key={colIdx} className="px-4 py-3 font-bold border-r border-slate-800/80 last:border-r-0">
                  {isAdmin ? (
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={h}
                        onChange={(e) => updateHeader(colIdx, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs font-semibold text-slate-100 focus:outline-none"
                      />
                      {current.headers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeColumn(colIdx)}
                          className="p-1 text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <span>{h}</span>
                  )}
                </th>
              ))}
              {isAdmin && <th className="px-3 py-3 w-10"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {current.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-slate-900/40 transition-colors">
                {row.map((cell, colIdx) => (
                  <td key={colIdx} className="px-4 py-3 border-r border-slate-800/80 last:border-r-0 text-slate-300">
                    {isAdmin ? (
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
                        placeholder="Cell value..."
                        className="w-full bg-slate-950/80 border border-slate-700/60 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                      />
                    ) : (
                      <span>{cell || "—"}</span>
                    )}
                  </td>
                ))}
                {isAdmin && (
                  <td className="px-3 py-3 text-center">
                    {current.rows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRow(rowIdx)}
                        className="p-1 text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTableEditor;
