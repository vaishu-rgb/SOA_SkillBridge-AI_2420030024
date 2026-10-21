import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  Layers,
  PlayCircle,
  RefreshCw,
  Sparkles,
  Sliders
} from 'lucide-react';
import { CareerRole, LearningPlan, PlanModule, StudentProfile } from '../types';

interface LearningPlanViewProps {
  currentRole: CareerRole;
  currentStudent: StudentProfile;
  plan: LearningPlan;
  onToggleModule: (moduleId: string, skillId: string, willBeCompleted: boolean) => void;
  onOpenAdaptation: () => void;
  onNavigateTab: (tab: 'dashboard' | 'gap_analysis' | 'learning_plan' | 'opportunities') => void;
}

export const LearningPlanView: React.FC<LearningPlanViewProps> = ({
  currentRole,
  currentStudent,
  plan,
  onToggleModule,
  onOpenAdaptation,
  onNavigateTab
}) => {
  const allModules = plan.phases.flatMap(p => p.modules);
  const completedCount = allModules.filter(m => m.completed).length;
  const totalCount = allModules.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const totalPlannedHours = allModules.reduce((acc, m) => acc + m.estimatedHours, 0);
  const completedHours = allModules.filter(m => m.completed).reduce((acc, m) => acc + m.estimatedHours, 0);

  return (
    <div className="space-y-6">
      {/* Plan Header & Adaptive Status Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Personalized Adaptive Roadmap</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-bold capitalize">
                Mode: {plan.adaptationMode.replace('_', ' ')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Roadmap to {currentRole.title}
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Dynamically generated curriculum matching your missing skills, calibrated to {plan.weeklyHours} study hours per week.
            </p>
          </div>

          {/* Adaptation Action Button */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAdaptation}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>Adapt & Recalibrate Plan</span>
            </button>
          </div>
        </div>

        {/* Schedule Health State (On Track vs Behind Schedule) */}
        <div className="mt-6">
          {plan.isBehindSchedule ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-rose-900">
                    You're currently behind schedule by ~{plan.behindDays} days
                  </div>
                  <div className="text-xs text-rose-700 mt-0.5">
                    Missed recent module milestones? Adapt your plan to recalibrate weekly targets, streamline optional topics, or shift your target completion date.
                  </div>
                </div>
              </div>
              <button
                onClick={onOpenAdaptation}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer"
              >
                Auto-Adapt Roadmap
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-emerald-900">
                    Plan Health: On Track & Pacing Well
                  </div>
                  <div className="text-xs text-emerald-700">
                    Projected graduation to internship readiness by {plan.targetCompletionDate}.
                  </div>
                </div>
              </div>
              <button
                onClick={onOpenAdaptation}
                className="text-xs font-bold text-emerald-800 hover:underline hidden sm:block cursor-pointer"
              >
                Adjust Schedule
              </button>
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div>
            <div className="text-xs text-slate-500 font-medium">Roadmap Progress</div>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5">
              {progressPercent}%
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
              <div
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 font-medium">Modules Completed</div>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5">
              {completedCount} / {totalCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {totalCount - completedCount} modules left
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 font-medium">Weekly Commitment</div>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5">
              {plan.weeklyHours} hrs/week
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              ~{Math.round(plan.weeklyHours / 5 * 10) / 10}h / study day
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 font-medium">Target Completion</div>
            <div className="text-xl font-extrabold text-indigo-600 mt-0.5">
              {plan.targetCompletionDate}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {plan.phases.reduce((acc, p) => acc + p.estimatedWeeks, 0)} total weeks
            </div>
          </div>
        </div>
      </div>

      {/* Chronological Roadmap Phases */}
      <div className="space-y-6">
        {plan.phases.map((phase, pIndex) => {
          const phaseModules = phase.modules;
          const phaseCompletedCount = phaseModules.filter(m => m.completed).length;
          const phaseTotal = phaseModules.length;
          const isPhaseDone = phaseCompletedCount === phaseTotal && phaseTotal > 0;

          return (
            <div
              key={phase.phaseNumber}
              className={`bg-white rounded-2xl border transition-all ${
                isPhaseDone ? 'border-emerald-200' : 'border-slate-200'
              } p-6 shadow-xs`}
            >
              {/* Phase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">
                      {phase.phaseNumber}
                    </span>
                    <h2 className="text-lg font-extrabold text-slate-900">{phase.title}</h2>
                    {isPhaseDone && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Phase Mastered
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{phase.focus}</p>
                </div>

                <div className="text-xs font-semibold text-slate-600 flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>~{phase.estimatedWeeks} weeks</span>
                  </span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                    {phaseCompletedCount} of {phaseTotal} finished
                  </span>
                </div>
              </div>

              {/* Modules in this Phase */}
              <div className="space-y-3 mt-4">
                {phase.modules.map((module) => {
                  return (
                    <div
                      key={module.id}
                      className={`rounded-xl border p-4 transition-all ${
                        module.completed
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-white border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                        {/* Checkbox & Details */}
                        <div className="flex items-start space-x-3">
                          <button
                            onClick={() => onToggleModule(module.id, module.skillId, !module.completed)}
                            className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                              module.completed
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 hover:border-indigo-500 bg-white'
                            }`}
                            aria-label={`Mark ${module.title} as ${module.completed ? 'incomplete' : 'complete'}`}
                          >
                            {module.completed && <CheckCircle2 className="w-4 h-4" />}
                          </button>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3
                                className={`text-sm font-bold ${
                                  module.completed ? 'text-slate-500 line-through' : 'text-slate-900'
                                }`}
                              >
                                {module.title}
                              </h3>

                              {module.isEssential ? (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                                  Essential Requirement
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                                  Recommended
                                </span>
                              )}

                              <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>~{module.estimatedHours} hrs</span>
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {module.description}
                            </p>

                            {module.projectPrompt && (
                              <div className="mt-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                                <span className="font-bold text-slate-900">Hands-on Task: </span>
                                {module.projectPrompt}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Resource links */}
                        <div className="flex flex-col sm:flex-row md:flex-col items-end gap-1.5 shrink-0 self-start">
                          {module.resources.slice(0, 2).map((res, rIdx) => (
                            <a
                              key={rIdx}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-indigo-600 hover:text-indigo-800 hover:underline flex items-center space-x-1 font-semibold"
                            >
                              <BookOpen className="w-3 h-3 text-indigo-500" />
                              <span>{res.source}: {res.title.slice(0, 26)}...</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 text-center">
        <h3 className="text-base font-bold text-indigo-950">Feeling ready for interviews or internships?</h3>
        <p className="text-xs text-indigo-700 max-w-xl mx-auto mt-1 mb-4">
          Check which real company internships and open-source contributor programs match your validated competencies right now.
        </p>
        <button
          onClick={() => onNavigateTab('opportunities')}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer inline-flex items-center space-x-2"
        >
          <span>Explore Matched Opportunities</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
