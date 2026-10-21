import React, { useState, useMemo } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  Layers,
  Search,
  SlidersHorizontal,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { CareerRole, Skill, SkillCategory, SkillLevel, StudentProfile, StudentSkillData } from '../types';
import { SKILLS_CATALOG } from '../data/careerData';

interface SkillGapAnalysisProps {
  currentRole: CareerRole;
  currentStudent: StudentProfile;
  onUpdateSkillLevel: (skillId: string, level: SkillLevel) => void;
  onNavigateTab: (tab: 'dashboard' | 'gap_analysis' | 'learning_plan' | 'opportunities') => void;
}

export const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({
  currentRole,
  currentStudent,
  onUpdateSkillLevel,
  onNavigateTab
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'missing' | 'in_progress' | 'acquired'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);

  const levelLabels = ['Not Started', 'Beginner (Basics)', 'Intermediate (Working Knowledge)', 'Advanced (Production Ready)'];

  const enrichedSkills = useMemo(() => {
    return currentRole.requiredSkills.map((req) => {
      const skill = SKILLS_CATALOG[req.skillId] || {
        id: req.skillId,
        name: req.skillId,
        category: 'core' as SkillCategory,
        description: 'Role specific technical requirement',
        recommendedHours: 20,
        freeResources: []
      };

      const studentData: StudentSkillData = currentStudent.skills[req.skillId] || { level: 0, verified: false };
      const currentLevel = studentData.level;
      const requiredLevel = req.requiredLevel;

      let status: 'acquired' | 'in_progress' | 'missing' = 'missing';
      if (currentLevel >= requiredLevel) {
        status = 'acquired';
      } else if (currentLevel > 0) {
        status = 'in_progress';
      }

      return {
        ...skill,
        requirement: req,
        currentLevel,
        requiredLevel,
        status,
        verified: studentData.verified
      };
    });
  }, [currentRole, currentStudent]);

  const filteredSkills = useMemo(() => {
    return enrichedSkills.filter((item) => {
      if (filterCategory !== 'all' && item.category !== filterCategory) return false;
      if (filterStatus !== 'all' && item.status !== filterStatus) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [enrichedSkills, filterCategory, filterStatus, searchQuery]);

  const missingCount = enrichedSkills.filter(s => s.status === 'missing').length;
  const inProgressCount = enrichedSkills.filter(s => s.status === 'in_progress').length;
  const acquiredCount = enrichedSkills.filter(s => s.status === 'acquired').length;

  return (
    <div className="space-y-6">
      {/* Overview & Quick Stats Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
              <Layers className="w-4 h-4" />
              <span>Diagnostic Gap Matrix</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Skill Requirements for {currentRole.title}
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Compare your current competence against market expectations. Click any skill to inspect learning materials or update your evaluated level.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('learning_plan')}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer self-start md:self-auto"
          >
            <span>Generate Bridging Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Counter Pills */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div
            onClick={() => setFilterStatus(filterStatus === 'missing' ? 'all' : 'missing')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              filterStatus === 'missing'
                ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700">Missing Gaps</span>
              <span className="text-lg font-black text-rose-700">{missingCount}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Need immediate acquisition</p>
          </div>

          <div
            onClick={() => setFilterStatus(filterStatus === 'in_progress' ? 'all' : 'in_progress')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              filterStatus === 'in_progress'
                ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700">In Progress</span>
              <span className="text-lg font-black text-amber-700">{inProgressCount}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Partially learned, need leveling</p>
          </div>

          <div
            onClick={() => setFilterStatus(filterStatus === 'acquired' ? 'all' : 'acquired')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              filterStatus === 'acquired'
                ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700">Satisfied Skills</span>
              <span className="text-lg font-black text-emerald-700">{acquiredCount}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Meets or exceeds requirements</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skills (e.g. React, Docker, SQL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        {/* Categories & Reset */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center space-x-1 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Domains
            </button>
            <button
              onClick={() => setFilterCategory('foundational')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterCategory === 'foundational'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Foundations
            </button>
            <button
              onClick={() => setFilterCategory('core')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterCategory === 'core'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Core Architecture
            </button>
            <button
              onClick={() => setFilterCategory('tools')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterCategory === 'tools'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tools & Cloud
            </button>
            <button
              onClick={() => setFilterCategory('soft')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterCategory === 'soft'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              System & Soft
            </button>
          </div>

          {(filterCategory !== 'all' || filterStatus !== 'all' || searchQuery !== '') && (
            <button
              onClick={() => {
                setFilterCategory('all');
                setFilterStatus('all');
                setSearchQuery('');
              }}
              className="text-xs text-indigo-600 font-bold hover:underline ml-2 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Detailed Skill Cards List */}
      <div className="space-y-3">
        {filteredSkills.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-700">No skills match the selected filter</div>
            <p className="text-xs text-slate-500 mt-1">Try resetting the filter criteria or searching for another term.</p>
          </div>
        ) : (
          filteredSkills.map((skill) => {
            const isExpanded = expandedSkillId === skill.id;

            return (
              <div
                key={skill.id}
                className={`bg-white rounded-2xl border transition-all ${
                  skill.status === 'missing' && skill.requirement.importance === 'critical'
                    ? 'border-rose-200 hover:border-rose-300'
                    : skill.status === 'in_progress'
                    ? 'border-amber-200 hover:border-amber-300'
                    : skill.status === 'acquired'
                    ? 'border-emerald-200 hover:border-emerald-300'
                    : 'border-slate-200 hover:border-slate-300'
                } p-5 shadow-xs`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Skill Details */}
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          skill.requirement.importance === 'critical'
                            ? 'bg-rose-100 text-rose-800'
                            : skill.requirement.importance === 'important'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {skill.requirement.importance} Requirement
                      </span>

                      <span className="text-[11px] font-medium text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded">
                        {skill.category}
                      </span>

                      {skill.status === 'acquired' ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-700 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Satisfied</span>
                        </span>
                      ) : skill.status === 'in_progress' ? (
                        <span className="inline-flex items-center space-x-1 text-amber-700 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Clock className="w-3 h-3" />
                          <span>Level Up Needed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-rose-700 text-xs font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          <AlertCircle className="w-3 h-3" />
                          <span>Missing Gap</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900">{skill.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{skill.description}</p>
                  </div>

                  {/* Level Controls & Gap Comparison */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                    {/* Level Indicators */}
                    <div className="space-y-1 min-w-44">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-500">Your Level:</span>
                        <span className="font-bold text-slate-800">
                          {levelLabels[skill.currentLevel].split(' ')[0]} ({skill.currentLevel}/3)
                        </span>
                      </div>

                      {/* Interactive Level Radio Buttons */}
                      <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
                        {[0, 1, 2, 3].map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => onUpdateSkillLevel(skill.id, lvl as SkillLevel)}
                            title={`Set to: ${levelLabels[lvl]}`}
                            className={`flex-1 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                              skill.currentLevel === lvl
                                ? lvl >= skill.requiredLevel
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-indigo-600 text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                            }`}
                          >
                            L{lvl}
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>Target: Level {skill.requiredLevel}</span>
                        <span>~{skill.recommendedHours}h total</span>
                      </div>
                    </div>

                    {/* Expand resources toggle */}
                    <button
                      onClick={() => setExpandedSkillId(isExpanded ? null : skill.id)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap self-stretch sm:self-auto flex items-center justify-center space-x-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isExpanded ? 'Hide Resources' : 'Free Learning Resources'}</span>
                    </button>
                  </div>
                </div>

                {/* Collapsible Learning Resources Drawer */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200 bg-slate-50/80 -mx-5 -mb-5 p-5 rounded-b-2xl">
                    <div className="text-xs font-bold text-slate-800 mb-2 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Curated Free Study Resources for {skill.name}</span>
                    </div>

                    {skill.freeResources && skill.freeResources.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {skill.freeResources.map((res, i) => (
                          <a
                            key={i}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all group"
                          >
                            <div className="space-y-0.5">
                              <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                {res.title}
                              </div>
                              <div className="text-[10px] text-slate-400 capitalize">
                                Source: {res.source} • Format: {res.type}
                              </div>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-2" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">Official documentation recommended for this standard module.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
