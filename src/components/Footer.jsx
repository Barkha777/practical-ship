import React from 'react';
import { BookOpen, Heart, Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-slate-200">PracticalMemo</span>
          <span>— Academic Lab & Practical Management System</span>
        </div>

        <p className="flex items-center gap-1">
          <span>Organize procedures, algorithms, code & conclusions seamlessly</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
