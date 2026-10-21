import React from 'react';
import {
  Award,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Flame,
  Target,
  TrendingUp,
  Zap,
  BookOpen,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { CareerRole, ReadinessReport, StudentProfile } from '../types';
import { SKILLS_CATALOG } from '../data/careerData';

interface ReadinessDashboardProps {
  currentRole: CareerRole;
  readiness: ReadinessReport;
  currentStudent: StudentProfile;
  onNavigateTab: (tab: 'dashboard' | 'gap_analysis' | 'learning_plan' | 'opportunities') => void;
  onOpenAssessment: () => void;
  onOpenAdaptation: () => void;
}

export const ReadinessDashboard: React.FC<ReadinessDashboardProps> = ({
  currentRole,
  readiness,
  currentStudent,
  onNavigateTab,
  onOpenAssessment,
  onOpenAdaptation
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-200', light: 'bg-emerald-50' };
    if (score >= 60) return { bg: 'bg-indigo-500', text: 'text-indigo-700', border: 'border-indigo-200', light: 'bg-indigo-50' };
    if (score >= 40) return { bg: 'bg-amber-500', text: 'text-amber-700', border: 'border-amber-200', light: 'bg-amber-50' };
    return { bg: 'bg-rose-500', text: 'text-rose-700', border: 'border-rose-200', light: 'bg-rose-50' };
  };

  const scoreTheme = getScoreColor(readiness.overallScore);

  return (
    <div className="space-y-6">
      {/* Welcome & Role Context Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
              <Target className="w-4 h-4" />
              <span>Target Role: {currentRole.title}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                {currentRole.badge}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentStudent.name}’s Career Readiness
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              {currentRole.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAssessment}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Update Skill Self-Assessment</span>
            </button>
            <button
              onClick={() => onNavigateTab('learning_plan')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <span>View Learning Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Readiness Gauge & Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Readiness Gauge Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Overall Readiness</h2>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${scoreTheme.light} ${scoreTheme.text} ${scoreTheme.border} border`}>
                {readiness.statusLabel}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Based on {currentRole.requiredSkills.length} skill requirements for junior & internship roles.
            </p>

            {/* Score Ring / Progress Visualization */}
            <div className="my-6 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-slate-100"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Progress Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className={`${
                      readiness.overallScore >= 80
                        ? 'stroke-emerald-500'
                        : readiness.overallScore >= 60
                        ? 'stroke-indigo-600'
                        : readiness.overallScore >= 40
                        ? 'stroke-amber-500'
                        : 'stroke-rose-500'
                    } transition-all duration-1000 ease-out`}
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - readiness.overallScore / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-black text-slate-900 tracking-tight">
                    {readiness.overallScore}%
                  </span>
                  <span className="text-xs font-medium text-slate-500 mt-0.5">Readiness Score</span>
                </div>
              </div>
            </div>

            {/* Status explanation */}
            <div className={`rounded-xl p-3.5 ${scoreTheme.light} border ${scoreTheme.border} text-xs leading-relaxed ${scoreTheme.text}`}>
              {readiness.overallScore >= 80 ? (
                <p>
                  <strong>Excellent!</strong> You meet the threshold for most junior full-time roles and internships. Focus on capstone portfolio depth and interview mock tests.
                </p>
              ) : readiness.overallScore >= 65 ? (
                <p>
                  <strong>Great Progress!</strong> You are qualified for standard internship roles and guided open-source contributor projects. Complete 1-2 critical core skills to unlock junior roles.
                </p>
              ) : readiness.overallScore >= 45 ? (
                <p>
                  <strong>Developing Core Skills:</strong> You have the baseline syntax down. You need hands-on project work in essential frameworks and relational data.
                </p>
              ) : (
                <p>
                  <strong>Foundations Needed:</strong> Start with Phase 1 of the personalized learning plan to lock in fundamental programming and developer toolchains.
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Est. time to 85%:</span>
            </span>
            <span className="font-bold text-slate-900">
              ~{readiness.estimatedWeeksToReady} weeks ({currentStudent.weeklyHours}h/wk)
            </span>
          </div>
        </div>

        {/* Competency Category Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Skill Domain Breakdown</h2>
              <span className="text-xs font-medium text-indigo-600 cursor-pointer hover:underline" onClick={() => onNavigateTab('gap_analysis')}>
                View Detailed Matrix →
              </span>
            </div>

            <div className="space-y-4">
              {/* Foundational */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Foundational Skills</span>
                  <span className="text-slate-900 font-bold">{readiness.categoryScores.foundational}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${readiness.categoryScores.foundational}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">HTML, CSS, JS/Python basics, Git workflows</p>
              </div>

              {/* Core Technical */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Core Architecture & Frameworks</span>
                  <span className="text-slate-900 font-bold">{readiness.categoryScores.core}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${readiness.categoryScores.core}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Frameworks, Backend APIs, Relational DBs</p>
              </div>

              {/* Tools & Workflow */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Tools, Testing & Cloud</span>
                  <span className="text-slate-900 font-bold">{readiness.categoryScores.tools}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${readiness.categoryScores.tools}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Docker, CI/CD, Testing frameworks, Cloud services</p>
              </div>

              {/* Soft & Professional */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Technical Communication & System Design</span>
                  <span className="text-slate-900 font-bold">{readiness.categoryScores.soft}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-sky-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${readiness.categoryScores.soft}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Architecture trade-offs, documentation, PR reviews</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-slate-700">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>Total hours missing to 100%:</span>
            </div>
            <span className="font-bold text-slate-900">{readiness.totalMissingHours} hours</span>
          </div>
        </div>

        {/* Quick Diagnostic Insights & Market Value */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-3">Market & Role Outlook</h2>

            <div className="space-y-3">
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs">
                <div className="font-bold text-indigo-900">Industry Compensation</div>
                <div className="text-indigo-700 mt-0.5 font-medium">{currentRole.averageSalary}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Market demand: {currentRole.demandRating}</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
                <div className="font-bold text-slate-900">Typical Internship Title</div>
                <div className="text-slate-700 mt-0.5">{currentRole.typicalInternshipTitle}</div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs">
                <div className="font-bold text-amber-900 flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>Recommended Capstone Project</span>
                </div>
                <div className="text-amber-800 mt-1 leading-snug">
                  {currentRole.recommendedProjects[0]}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigateTab('opportunities')}
              className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>Browse Matched Internships & Jobs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Critical Missing Skills Warning Banner & Quick Action Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg font-bold text-slate-900">Top Missing Skills Holding You Back</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              These {readiness.criticalSkillsMissing.length} critical skills carry the highest weight for hiring managers in {currentRole.title} positions.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('gap_analysis')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 self-start sm:self-auto cursor-pointer"
          >
            Inspect All Missing Skills ({readiness.criticalSkillsMissing.length + readiness.importantSkillsMissing.length}) →
          </button>
        </div>

        {readiness.criticalSkillsMissing.length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-sm font-bold text-emerald-900">No Critical Skill Gaps!</div>
            <p className="text-xs text-emerald-700 max-w-md mx-auto mt-1">
              You have completed all mandatory technical competencies for this role. You are in prime shape to apply for internships and junior openings!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {readiness.criticalSkillsMissing.map((skill) => {
              const studentSkill = currentStudent.skills[skill.id];
              const level = studentSkill ? studentSkill.level : 0;
              return (
                <div
                  key={skill.id}
                  className="rounded-xl border border-rose-200 bg-rose-50/40 p-4 flex flex-col justify-between hover:border-rose-300 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 uppercase tracking-wide">
                        Critical Requirement
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Level {level}/2
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mt-2">{skill.name}</h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {skill.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>~{skill.recommendedHours} hrs to master</span>
                    </span>
                    <button
                      onClick={() => onNavigateTab('learning_plan')}
                      className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Study Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Student Study Routine & Plan Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
            <Flame className="w-6 h-6 fill-orange-500 text-orange-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{currentStudent.streakDays} Days</div>
            <div className="text-xs font-medium text-slate-500">Active Learning Streak</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{currentStudent.totalHoursStudied} Hours</div>
            <div className="text-xs font-medium text-slate-500">Total Practice Logged</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{readiness.acquiredSkills.length}</div>
              <div className="text-xs font-medium text-slate-500">Skills Verified & Acquired</div>
            </div>
          </div>
          <button
            onClick={onOpenAdaptation}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
          >
            Adapt Plan
          </button>
        </div>
      </div>
    </div>
  );
};
