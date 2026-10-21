import React from 'react';
import {
  Compass,
  Flame,
  Clock,
  User,
  ChevronDown,
  Briefcase,
  Layers,
  GraduationCap
} from 'lucide-react';
import { CAREER_ROLES, PRESET_STUDENTS } from '../data/careerData';
import { CareerRole, StudentProfile } from '../types';

interface HeaderProps {
  currentRole: CareerRole;
  onSelectRole: (role: CareerRole) => void;
  currentStudent: StudentProfile;
  onSelectStudent: (student: StudentProfile) => void;
  activeTab: 'dashboard' | 'gap_analysis' | 'learning_plan' | 'opportunities';
  onSelectTab: (tab: 'dashboard' | 'gap_analysis' | 'learning_plan' | 'opportunities') => void;
  readinessScore: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onSelectRole,
  currentStudent,
  onSelectStudent,
  activeTab,
  onSelectTab,
  readinessScore
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner / Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">SkillBridge</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Career Readiness Platform
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">Deterministic gap analysis & adaptive learning roadmaps</p>
            </div>
          </div>

          {/* Student Persona Switcher & Role Selector */}
          <div className="flex items-center space-x-3">
            {/* Target Role Selector */}
            <div className="relative">
              <div className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200/80 transition-colors rounded-lg px-3 py-1.5 cursor-pointer text-xs sm:text-sm font-medium text-slate-700">
                <Briefcase className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="text-slate-500 hidden lg:inline">Target:</span>
                <select
                  value={currentRole.id}
                  onChange={(e) => {
                    const found = CAREER_ROLES.find(r => r.id === e.target.value);
                    if (found) onSelectRole(found);
                  }}
                  className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
                  aria-label="Target Career Goal"
                >
                  {CAREER_ROLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Student Preset Switcher */}
            <div className="relative">
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                  {currentStudent.avatar}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="font-semibold text-slate-800 leading-tight">{currentStudent.name}</div>
                  <div className="text-[10px] text-slate-500">{currentStudent.education}</div>
                </div>
                <select
                  value={currentStudent.id}
                  onChange={(e) => {
                    const s = PRESET_STUDENTS.find(item => item.id === e.target.value);
                    if (s) onSelectStudent(s);
                  }}
                  className="bg-transparent text-xs font-medium text-slate-600 focus:outline-none cursor-pointer border-l border-slate-200 pl-1"
                  aria-label="Select Student Profile"
                >
                  {PRESET_STUDENTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.education.split(' ')[0]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="hidden md:flex items-center space-x-2 border-l border-slate-200 pl-3">
              <div
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                  readinessScore >= 75
                    ? 'bg-emerald-100 text-emerald-800'
                    : readinessScore >= 50
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
                title="Current career readiness score for this role"
              >
                <span>{readinessScore}%</span>
                <span className="font-normal text-[11px] opacity-80">Ready</span>
              </div>

              <div className="flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                <span>{currentStudent.streakDays}d streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-4 border-t border-slate-100 pt-1 pb-2 overflow-x-auto text-sm font-medium">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-indigo-50 text-indigo-700 font-bold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Career Readiness</span>
          </button>

          <button
            onClick={() => onSelectTab('gap_analysis')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'gap_analysis'
                ? 'bg-indigo-50 text-indigo-700 font-bold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Missing Skills & Gap Analysis</span>
          </button>

          <button
            onClick={() => onSelectTab('learning_plan')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'learning_plan'
                ? 'bg-indigo-50 text-indigo-700 font-bold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Personalized Learning Plan</span>
          </button>

          <button
            onClick={() => onSelectTab('opportunities')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'opportunities'
                ? 'bg-indigo-50 text-indigo-700 font-bold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Matched Internships & Jobs</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
