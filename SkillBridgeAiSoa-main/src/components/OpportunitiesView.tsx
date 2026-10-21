import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Building,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  Flame,
  Globe,
  MapPin,
  Search,
  Sparkles,
  Target,
  XCircle,
  Bookmark,
  Send,
  X,
  Award
} from 'lucide-react';
import { CareerRole, Opportunity, Skill, StudentProfile } from '../types';
import { OPPORTUNITIES, SKILLS_CATALOG } from '../data/careerData';
import { matchOpportunity } from '../utils/readinessCalculator';

interface OpportunitiesViewProps {
  currentRole: CareerRole;
  currentStudent: StudentProfile;
  onNavigateTab: (tab: 'dashboard' | 'gap_analysis' | 'learning_plan' | 'opportunities') => void;
  onToggleSaveOpportunity: (oppId: string) => void;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  currentRole,
  currentStudent,
  onNavigateTab,
  onToggleSaveOpportunity
}) => {
  const [filterType, setFilterType] = useState<'all' | 'internship' | 'junior_job' | 'capstone_project'>('all');
  const [filterTier, setFilterTier] = useState<'all' | 'ready' | 'near'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOppForApply, setSelectedOppForApply] = useState<Opportunity | null>(null);
  const [appliedOppIds, setAppliedOppIds] = useState<string[]>([]);

  // Match opportunities against current student skills
  const matchedOpportunities = useMemo(() => {
    return OPPORTUNITIES.map((opp) => {
      const matchResult = matchOpportunity(opp, currentStudent.skills);
      return {
        ...opp,
        match: matchResult,
        isSaved: currentStudent.savedOpportunityIds.includes(opp.id),
        hasApplied: appliedOppIds.includes(opp.id)
      };
    }).sort((a, b) => b.match.matchPercentage - a.match.matchPercentage);
  }, [currentStudent, appliedOppIds]);

  const readyCount = matchedOpportunities.filter(o => o.match.isReady).length;
  const nearReadyCount = matchedOpportunities.filter(o => o.match.isNearReady).length;

  const filtered = matchedOpportunities.filter((opp) => {
    if (filterType !== 'all' && opp.roleType !== filterType) return false;
    if (filterTier === 'ready' && !opp.match.isReady) return false;
    if (filterTier === 'near' && !opp.match.isNearReady) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        opp.title.toLowerCase().includes(q) ||
        opp.company.toLowerCase().includes(q) ||
        opp.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSimulateApply = (opp: Opportunity) => {
    setAppliedOppIds((prev) => [...prev, opp.id]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
              <Briefcase className="w-4 h-4" />
              <span>Career Opportunities Match Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Internships & Roles Matched to Your Skills
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Deterministic skill matching compares your current evaluated proficiency against verified job requirements.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('learning_plan')}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer self-start md:self-auto"
          >
            <span>Learn Missing Skills</span>
          </button>
        </div>

        {/* Readiness Tiers Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <div
            onClick={() => setFilterTier(filterTier === 'ready' ? 'all' : 'ready')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              filterTier === 'ready'
                ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200'
                : 'bg-emerald-50/50 border-emerald-200 hover:bg-emerald-100/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                Ready to Apply (≥75% Match)
              </span>
              <span className="text-xl font-black text-emerald-700">{readyCount}</span>
            </div>
            <p className="text-[11px] text-emerald-700/80 mt-1">
              You possess all primary skill criteria for these positions.
            </p>
          </div>

          <div
            onClick={() => setFilterTier(filterTier === 'near' ? 'all' : 'near')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              filterTier === 'near'
                ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-200'
                : 'bg-amber-50/50 border-amber-200 hover:bg-amber-100/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                Near Ready (50% - 74% Match)
              </span>
              <span className="text-xl font-black text-amber-700">{nearReadyCount}</span>
            </div>
            <p className="text-[11px] text-amber-700/80 mt-1">
              Missing only 1-2 core skills to qualify for interviews.
            </p>
          </div>

          <div
            onClick={() => setFilterTier('all')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              filterTier === 'all'
                ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Total Available Openings
              </span>
              <span className="text-xl font-black text-slate-900">{OPPORTUNITIES.length}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Covering internships, entry jobs, and open-source grants.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company, title, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        {/* Role Type Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto text-xs font-semibold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterType === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Roles
          </button>
          <button
            onClick={() => setFilterType('internship')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterType === 'internship' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Internships
          </button>
          <button
            onClick={() => setFilterType('junior_job')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterType === 'junior_job' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Junior Jobs
          </button>
          <button
            onClick={() => setFilterType('capstone_project')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterType === 'capstone_project' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Open-Source Grants
          </button>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-700">No opportunities match this filter</div>
            <p className="text-xs text-slate-500 mt-1">Try resetting filters to view all openings.</p>
          </div>
        ) : (
          filtered.map((opp) => {
            const isReady = opp.match.isReady;
            const isNear = opp.match.isNearReady;

            return (
              <div
                key={opp.id}
                className={`bg-white rounded-2xl border transition-all p-5 shadow-xs ${
                  isReady
                    ? 'border-emerald-200 hover:border-emerald-300'
                    : isNear
                    ? 'border-amber-200 hover:border-amber-300'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Opportunity Meta */}
                  <div className="space-y-2 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{opp.company}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-600 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{opp.location}</span>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {opp.compensation}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-500">{opp.durationOrType}</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900">{opp.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{opp.description}</p>

                    {/* Skill Match Breakdown Checklist */}
                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-slate-500 mb-1.5">
                        Required Skills Check:
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {opp.requiredSkillIds.map((skillId) => {
                          const skill = SKILLS_CATALOG[skillId];
                          const studentSkill = currentStudent.skills[skillId];
                          const hasSkill = studentSkill && studentSkill.level >= 1;

                          return (
                            <span
                              key={skillId}
                              className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                                hasSkill
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-800 border border-rose-200'
                              }`}
                            >
                              {hasSkill ? (
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <XCircle className="w-3 h-3 text-rose-500" />
                              )}
                              <span>{skill ? skill.name : skillId}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Match Meter & Action */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 shrink-0">
                    <div className="text-left lg:text-right">
                      <div
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black ${
                          isReady
                            ? 'bg-emerald-100 text-emerald-800'
                            : isNear
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>{opp.match.matchPercentage}% Skill Match</span>
                      </div>
                      <div className="text-[11px] font-medium text-slate-500 mt-1">
                        {isReady
                          ? 'Fully Qualified to Apply'
                          : isNear
                          ? `Missing ${opp.match.missingSkills.length} skill requirement`
                          : `Needs ${opp.match.missingSkills.length} prerequisite skills`}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <button
                        onClick={() => onToggleSaveOpportunity(opp.id)}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                          opp.isSaved
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900'
                        }`}
                        title={opp.isSaved ? 'Saved to bookmarks' : 'Save opportunity'}
                      >
                        <Bookmark className="w-4 h-4" fill={opp.isSaved ? 'currentColor' : 'none'} />
                      </button>

                      <button
                        onClick={() => setSelectedOppForApply(opp)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex-1 sm:flex-none flex items-center justify-center space-x-1.5 ${
                          opp.hasApplied
                            ? 'bg-slate-100 text-slate-600 border border-slate-300'
                            : isReady
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        {opp.hasApplied ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Application Logged</span>
                          </>
                        ) : (
                          <>
                            <span>Inspect & Apply</span>
                            <ExternalLink className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Application Preparation & Inspection Modal */}
      {selectedOppForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Opportunity Profile & Application Check
                </span>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {selectedOppForApply.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOppForApply(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{selectedOppForApply.company}</div>
                  <div className="text-slate-500 mt-0.5">{selectedOppForApply.location} • {selectedOppForApply.compensation}</div>
                </div>
                <span className="px-3 py-1 rounded-full font-black text-xs bg-indigo-100 text-indigo-800">
                  {matchOpportunity(selectedOppForApply, currentStudent.skills).matchPercentage}% Match
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Tailored Candidate Analysis:</h4>
                <p className="text-slate-600 leading-relaxed">
                  {selectedOppForApply.description}
                </p>
              </div>

              {/* Verified vs Missing Skills Breakdown */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Your Competency Evaluation:</h4>
                <div className="space-y-1.5">
                  {selectedOppForApply.requiredSkillIds.map((sId) => {
                    const skill = SKILLS_CATALOG[sId];
                    const studentSkill = currentStudent.skills[sId];
                    const has = studentSkill && studentSkill.level >= 1;

                    return (
                      <div
                        key={sId}
                        className={`p-2.5 rounded-lg border flex items-center justify-between ${
                          has ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {has ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500" />
                          )}
                          <span className="font-bold text-slate-800">{skill ? skill.name : sId}</span>
                        </div>
                        <span className="font-semibold text-slate-500">
                          {has ? `Level ${studentSkill.level}/3 (Satisfied)` : 'Skill Missing'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Application Checklist */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                <div className="font-bold text-amber-900">Recommended Resume & Interview Talking Points:</div>
                <ul className="list-disc pl-4 text-amber-800 space-y-0.5">
                  <li>Highlight your capstone project code on GitHub demonstrating modern web APIs.</li>
                  <li>Mention your structured consistency ({currentStudent.streakDays}-day streak and {currentStudent.totalHoursStudied} verified practice hours).</li>
                </ul>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                onClick={() => setSelectedOppForApply(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleSimulateApply(selectedOppForApply);
                  setSelectedOppForApply(null);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Application & Track in Pipeline</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
