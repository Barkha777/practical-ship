import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import Breadcrumbs from '../components/Breadcrumbs';
import DynamicCodeManager from '../components/DynamicCodeManager';
import DynamicTableEditor from '../components/DynamicTableEditor';
import PrintPracticalView from '../components/PrintPracticalView';
import {
  FileText,
  Save,
  Printer,
  Edit3,
  CheckCircle2,
  Clock,
  FileEdit,
  Code2,
  Table,
  BookOpen,
  Info,
  ListOrdered,
  Award,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';

const PracticalDetailsPage = () => {
  const { subjectId, practicalId } = useParams();
  const navigate = useNavigate();
  const { data, isAdmin, updatePractical, deletePractical } = useContext(DataContext);

  const subject = data.subjects.find((s) => s.id === subjectId);
  const practical = subject?.practicals?.find((p) => p.id === practicalId);

  // Local state for full editing form
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [practicalNo, setPracticalNo] = useState(1);
  const [shortDescription, setShortDescription] = useState('');
  const [status, setStatus] = useState('Draft');
  const [information, setInformation] = useState('');
  const [procedure, setProcedure] = useState('');
  const [codeSections, setCodeSections] = useState([]);
  const [comparisonTable, setComparisonTable] = useState(null);
  const [conclusion, setConclusion] = useState('');
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    if (practical) {
      setTitle(practical.title || '');
      setPracticalNo(practical.practicalNo || 1);
      setShortDescription(practical.shortDescription || '');
      setStatus(practical.status || 'Draft');
      setInformation(practical.sections?.information || '');
      setProcedure(practical.sections?.procedure || '');
      setCodeSections(practical.sections?.codeSections || []);
      setComparisonTable(
        practical.sections?.comparisonTable || {
          title: 'Comparison & Analysis Matrix',
          headers: ['Metric / Property', 'Approach 1', 'Approach 2'],
          rows: [
            ['Time Complexity', '', ''],
            ['Space Complexity', '', '']
          ]
        }
      );
      setConclusion(practical.sections?.conclusion || '');
    }
  }, [practical]);

  if (!subject || !practical) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">Practical Not Found</h2>
        <p className="text-sm text-slate-400">The requested practical content could not be located.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Subjects
        </Link>
      </div>
    );
  }

  const handleSaveAll = () => {
    const updatedPrac = {
      title,
      practicalNo: Number(practicalNo) || 1,
      shortDescription,
      status,
      sections: {
        information,
        procedure,
        codeSections,
        comparisonTable,
        conclusion
      }
    };
    updatePractical(subject.id, practical.id, updatedPrac);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete Practical #${practical.practicalNo}: "${practical.title}"?`)) {
      deletePractical(subject.id, practical.id);
      navigate(`/subject/${subject.id}`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const pracNoStr = practicalNo < 10 ? `0${practicalNo}` : practicalNo;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Printable Sheet View (Hidden on web UI, active on print) */}
      <PrintPracticalView subject={subject} practical={practical} />

      {/* Screen Web Interface */}
      <div className="print:hidden space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: subject.name, to: `/subject/${subject.id}`, icon: 'book' },
            { label: `Practical ${pracNoStr}`, icon: 'file' }
          ]}
        />

        {/* Top Header & Admin Control Toolbar */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 bg-slate-900/90">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 text-xs font-mono font-extrabold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg">
                  Practical {pracNoStr}
                </span>

                {isEditing ? (
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-xs font-bold text-slate-100"
                  >
                    <option value="Draft">Draft</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : status === 'In Progress'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {status === 'Completed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : status === 'In Progress' ? (
                      <Clock className="w-3.5 h-3.5" />
                    ) : (
                      <FileEdit className="w-3.5 h-3.5" />
                    )}
                    {status}
                  </span>
                )}

                <span className="text-xs text-slate-500">
                  Last Updated: {practical.updatedAt || 'Recently'}
                </span>
              </div>

              {/* Title / Aim */}
              {isEditing ? (
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Title / Aim *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Aim / Title for this practical..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="text"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Short description summary..."
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 text-slate-900 tracking-tight leading-snug">
                    {practical.title}
                  </h1>
                  {practical.shortDescription && (
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                      {practical.shortDescription}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Admin Toolbar buttons */}
            <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold transition-colors"
                title="Print Lab Practical Sheet"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                Print / Export PDF
              </button>

              {isAdmin && (
                <>
                  {isEditing ? (
                    <button
                      onClick={handleSaveAll}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/25 hover:brightness-110 transition-all"
                    >
                      <Save className="w-4 h-4 stroke-[2.5]" />
                      Save Practical Content
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all"
                    >
                      <Edit3 className="w-4 h-4 stroke-[2.5]" />
                      Edit Practical Content
                    </button>
                  )}

                  <button
                    onClick={handleDelete}
                    className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete Practical"
                  >
                    <FileEdit className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {isAdmin && (
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                {isEditing ? 'Live Editing Mode Active — Fill in section details below and click Save.' : 'Admin Privileges Active — Click Edit Practical Content to make changes.'}
              </span>
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-slate-400 hover:text-slate-200 underline"
                >
                  Discard / Cancel Edit
                </button>
              )}
            </div>
          )}
        </div>

        {/* Practical Sections Grid / Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sticky Quick Section Links */}
          <div className="lg:col-span-1 space-y-3">
            <div className="sticky top-24 glass-panel rounded-2xl p-4 border border-slate-800 bg-slate-950/80 space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                Practical Sections
              </p>

              {[
                { id: 'info', label: '1. Information', icon: Info },
                { id: 'procedure', label: '2. Procedure / Algo', icon: ListOrdered },
                { id: 'code', label: '3. Code Implementations', icon: Code2 },
                { id: 'table', label: '4. Comparison Table', icon: Table },
                { id: 'conclusion', label: '5. Conclusion', icon: Award }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <a
                    key={tab.id}
                    href={`#section-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{tab.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Main Content Sections Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Section 1: Information / Overview */}
            <div
              id="section-info"
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/60 space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Info className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 text-slate-900">
                  1. Information & Overview
                </h2>
              </div>

              {isEditing || isAdmin ? (
                <div className="space-y-2">
                  <textarea
                    rows="6"
                    value={information}
                    onChange={(e) => setInformation(e.target.value)}
                    placeholder="Enter theoretical background, concepts, definition, and complexity definitions..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
                  />
                </div>
              ) : (
                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {practical.sections?.information ? (
                    practical.sections.information
                  ) : (
                    <p className="text-slate-500 italic">No information entered yet for this practical.</p>
                  )}
                </div>
              )}
            </div>

            {/* Section 2: Procedure / Algorithm */}
            <div
              id="section-procedure"
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/60 space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <ListOrdered className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 text-slate-900">
                  2. Procedure & Algorithm Steps
                </h2>
              </div>

              {isEditing || isAdmin ? (
                <div className="space-y-2">
                  <textarea
                    rows="8"
                    value={procedure}
                    onChange={(e) => setProcedure(e.target.value)}
                    placeholder="Enter step-by-step procedure or algorithmic logic (e.g. Step 1: Start, Step 2: Input...)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-100 font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed"
                  />
                </div>
              ) : (
                <div className="text-sm text-slate-300 leading-relaxed font-mono whitespace-pre-wrap bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  {practical.sections?.procedure ? (
                    practical.sections.procedure
                  ) : (
                    <p className="text-slate-500 italic font-sans">No procedure steps entered yet.</p>
                  )}
                </div>
              )}
            </div>

            {/* Section 3: Code Implementations */}
            <div
              id="section-code"
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/60 space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Code2 className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 text-slate-900">
                  3. Source Code Implementations
                </h2>
              </div>

              <DynamicCodeManager
                codeSections={codeSections}
                onChange={setCodeSections}
                isAdmin={isEditing || isAdmin}
              />
            </div>

            {/* Section 4: Custom Comparison Table */}
            <div
              id="section-table"
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/60 space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Table className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 text-slate-900">
                  4. Custom Comparison Table
                </h2>
              </div>

              <DynamicTableEditor
                tableData={comparisonTable}
                onChange={setComparisonTable}
                isAdmin={isEditing || isAdmin}
              />
            </div>

            {/* Section 5: Conclusion */}
            <div
              id="section-conclusion"
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/60 space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 text-slate-900">
                  5. Conclusion & Observations
                </h2>
              </div>

              {isEditing || isAdmin ? (
                <div className="space-y-2">
                  <textarea
                    rows="4"
                    value={conclusion}
                    onChange={(e) => setConclusion(e.target.value)}
                    placeholder="Enter lab result conclusion, output verification notes, or final inferences..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
                  />
                </div>
              ) : (
                <div className="text-sm text-slate-300 leading-relaxed italic bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
                  {practical.sections?.conclusion ? (
                    `"${practical.sections.conclusion}"`
                  ) : (
                    <p className="text-slate-500 not-italic">No conclusion entered yet.</p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Save Bar for Admin */}
            {isAdmin && (
              <div className="glass-panel rounded-2xl p-4 border border-cyan-500/30 flex items-center justify-between bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900">
                <p className="text-xs text-slate-400">
                  Make sure to save changes before leaving this page.
                </p>
                <button
                  onClick={handleSaveAll}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                >
                  <Save className="w-4 h-4" /> Save Practical
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticalDetailsPage;
