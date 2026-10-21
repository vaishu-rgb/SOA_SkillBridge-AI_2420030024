import React, { useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  Check,
  Clock,
  FastForward,
  RefreshCw,
  Sliders,
  Sparkles,
  X,
  Zap
} from 'lucide-react';
import { CareerRole, LearningPlan, StudentProfile } from '../types';

interface AdaptivePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: CareerRole;
  currentStudent: StudentProfile;
  currentPlan: LearningPlan;
  onSaveAdaptedPlan: (newWeeklyHours: number, mode: 'balanced' | 'fast_track' | 'extended') => void;
}

export const AdaptivePlanModal: React.FC<AdaptivePlanModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  currentStudent,
  currentPlan,
  onSaveAdaptedPlan
}) => {
  if (!isOpen) return null;

  const [weeklyHours, setWeeklyHours] = useState<number>(currentPlan.weeklyHours || 12);
  const [selectedMode, setSelectedMode] = useState<'balanced' | 'fast_track' | 'extended'>(
    currentPlan.isBehindSchedule ? 'extended' : currentPlan.adaptationMode
  );

  // Compute live recalculated projection
  const totalModules = currentPlan.phases.flatMap(p => p.modules).length;
  const remainingModules = currentPlan.phases.flatMap(p => p.modules).filter(m => !m.completed);
  const remainingHours = remainingModules.reduce((sum, m) => sum + m.estimatedHours, 0);

  // If fast track, discount bonus/optional modules (~25% hours saved)
  const adjustedHours = selectedMode === 'fast_track' ? Math.round(remainingHours * 0.72) : remainingHours;
  const recalculatedWeeks = Math.max(Math.ceil(adjustedHours / Math.max(weeklyHours, 4)), 1);

  const previewDate = new Date();
  previewDate.setDate(previewDate.getDate() + recalculatedWeeks * 7);
  const formattedPreviewDate = previewDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleApply = () => {
    onSaveAdaptedPlan(weeklyHours, selectedMode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Adaptive Plan Recalibration
              </h3>
              <p className="text-[11px] text-slate-500">
                Adjust study pace and catch up when academic or work schedule changes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Health Status Indicator */}
          {currentPlan.isBehindSchedule ? (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Behind Target Pace:</span> We detected {currentPlan.behindDays} days of missed milestone targets. Selecting either <em>Extend Timeline</em> or <em>Fast-Track Core Only</em> will re-balance your active curriculum.
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-800 flex items-start space-x-2.5">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Proactive Schedule Tuning:</span> Adjust your weekly study availability whenever exam season arrives or semester breaks open up free time.
              </div>
            </div>
          )}

          {/* 1. Weekly Hours Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Available Weekly Study Commitment
              </label>
              <span className="text-sm font-black text-indigo-600 px-2.5 py-0.5 rounded-lg bg-indigo-50 border border-indigo-100">
                {weeklyHours} Hours / Week
              </span>
            </div>

            <input
              type="range"
              min={4}
              max={35}
              step={1}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />

            <div className="flex justify-between text-[11px] text-slate-400">
              <span>4 hrs (Light / Exam Weeks)</span>
              <span>12 hrs (Balanced)</span>
              <span>30+ hrs (Bootcamp Pace)</span>
            </div>
          </div>

          {/* 2. Adaptation Strategy Mode */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800">
              Select Adaptation Strategy
            </label>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Option 1: Extended Timeline */}
              <div
                onClick={() => setSelectedMode('extended')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedMode === 'extended'
                    ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-200'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-bold text-xs text-slate-900">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>Gentle Pace (Extend Timeline)</span>
                  </div>
                  {selectedMode === 'extended' && (
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 pl-6">
                  Spreads out the remaining modules evenly over more weeks. Perfect when dealing with heavy university exam workloads.
                </p>
              </div>

              {/* Option 2: Fast-Track to Minimum Viable Readiness */}
              <div
                onClick={() => setSelectedMode('fast_track')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedMode === 'fast_track'
                    ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-200'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-bold text-xs text-slate-900">
                    <FastForward className="w-4 h-4 text-emerald-600" />
                    <span>Fast-Track (Core Requirements Only)</span>
                  </div>
                  {selectedMode === 'fast_track' && (
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 pl-6">
                  Defers optional and bonus skills (Docker, advanced CI/CD) and focuses 100% on the core skills needed to qualify for entry internships ~3-4 weeks faster.
                </p>
              </div>

              {/* Option 3: Balanced Standard */}
              <div
                onClick={() => setSelectedMode('balanced')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedMode === 'balanced'
                    ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-200'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-bold text-xs text-slate-900">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Balanced Standard Mastery</span>
                  </div>
                  {selectedMode === 'balanced' && (
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 pl-6">
                  Covers all essential, important, and portfolio capstone modules according to standard industry benchmarks.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Live Impact Preview Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-800">Recalibration Preview</div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-slate-400 block text-[11px]">New Projected Duration:</span>
                <span className="font-bold text-slate-900">
                  {recalculatedWeeks} weeks ({adjustedHours} hrs remaining)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Updated Completion Date:</span>
                <span className="font-bold text-indigo-600 flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formattedPreviewDate}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center space-x-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Apply Adapted Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
