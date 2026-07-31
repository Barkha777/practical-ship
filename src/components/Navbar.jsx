import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Shield, ShieldCheck, Sun, Moon, Download, Upload, RotateCcw, Search, Menu, X, Layers } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { isAdmin, toggleAdmin, exportData, importData, resetData, globalSearch, setGlobalSearch } = useContext(DataContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showBackupMenu, setShowBackupMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const success = importData(json);
        if (success) {
          alert("Backup data restored successfully!");
        } else {
          alert("Invalid backup JSON format.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                  PracticalMemo
                </span>
                {isAdmin && (
                  <span className="px-2 py-0.5 text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full animate-pulse">
                    ADMIN MODE
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">Academic Practical Manager</p>
            </div>
          </Link>

          {/* Quick Global Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Quick search subjects or practicals..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Admin Toggle */}
            <button
              onClick={toggleAdmin}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                isAdmin
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Toggle Admin Privileges to Edit Subjects & Practicals"
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Admin Mode ON</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Admin Mode OFF</span>
                </>
              )}
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
              title="Toggle Dark / Light Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Backup & Tools Menu */}
            <div className="relative">
              <button
                onClick={() => setShowBackupMenu(!showBackupMenu)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Data Backup & Restore"
              >
                <Download className="w-4 h-4" />
                <span className="hidden lg:inline">Data</span>
              </button>

              {showBackupMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1 text-xs">
                  <button
                    onClick={() => { exportData(); setShowBackupMenu(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800 font-medium transition-colors text-left"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    Export Backup (JSON)
                  </button>

                  <label className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800 font-medium transition-colors cursor-pointer text-left">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    Import Backup (JSON)
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => { handleFileUpload(e); setShowBackupMenu(false); }}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={() => {
                      if (window.confirm("Reset all subjects and practicals to default clean state?")) {
                        resetData();
                        setShowBackupMenu(false);
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 font-medium transition-colors text-left"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset All Data
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-400">Admin Privileges</span>
            <button
              onClick={toggleAdmin}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                isAdmin ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isAdmin ? 'Admin ON' : 'Admin OFF'}
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-400">Theme</span>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200"
            >
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <button
              onClick={() => { exportData(); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-xs text-cyan-400 font-semibold flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export Backup
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
