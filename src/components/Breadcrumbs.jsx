import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, BookOpen, FileCode } from 'lucide-react';

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 dark:text-slate-400 text-slate-600 mb-6 overflow-x-auto py-1 no-scrollbar">
      <Link
        to="/"
        className="flex items-center gap-1.5 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors shrink-0"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {item.to ? (
            <Link
              to={item.to}
              className="flex items-center gap-1.5 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors shrink-0 line-clamp-1 max-w-[200px]"
            >
              {item.icon === 'book' && <BookOpen className="w-3.5 h-3.5 text-cyan-500" />}
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className="text-slate-900 dark:text-slate-100 font-semibold shrink-0 line-clamp-1 max-w-[240px] flex items-center gap-1.5">
              {item.icon === 'file' && <FileCode className="w-3.5 h-3.5 text-purple-400" />}
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
