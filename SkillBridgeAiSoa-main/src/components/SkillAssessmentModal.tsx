import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  X,
  Zap
} from 'lucide-react';
import { CareerRole, SkillLevel, StudentProfile, StudentSkillData } from '../types';
import { SKILLS_CATALOG } from '../data/careerData';

interface SkillAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: CareerRole;
  currentStudent: StudentProfile;
  onSaveAssessment: (updatedSkills: Record<string, StudentSkillData>) => void;
}

export const SkillAssessmentModal: React.FC<SkillAssessmentModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  currentStudent,
  onSaveAssessment
}) => {
  if (!isOpen) return null;

  const [tempSkills, setTempSkills] = useState<Record<string, StudentSkillData>>({
    ...currentStudent.skills
  });

  const levelDescriptions = [
    { level: 0, title: 'Level 0 - None', desc: 'No prior experience or theoretical exposure.' },
    { level: 1, title: 'Level 1 - Beginner', desc: 'Can read syntax, follow simple tutorials, understand basic principles.' },
    { level: 2, title: 'Level 2 - Working Knowledge', desc: 'Can build functional features independently, debug common issues (Standard Junior Level).' },
    { level: 3, title: 'Level 3 - Advanced', desc: 'Production experience, performance optimization, best practices and architectures.' }
  ];

  const handleSetLevel = (skillId: string, level: SkillLevel) => {
    setTempSkills((prev) => ({
      ...prev,
      [skillId]: {
        level,
        verified: level > 0,
        lastPracticed: 'Just now'
      }
    }));
  };

  const handleSave = () => {
    onSaveAssessment(tempSkills);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Skill Self-Assessment & Verification
              </h3>
              <p className="text-[11px] text-slate-500">
                Rate your proficiency to automatically calibrate your career readiness score
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

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-800">
            <strong>Calibration Tip:</strong> Setting realistic levels ensures your roadmap doesn't waste time on what you already know, and accurately matches you with achievable internship applications.
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            {currentRole.requiredSkills.map((req) => {
              const skill = SKILLS_CATALOG[req.skillId];
              if (!skill) return null;

              const currentLvl = tempSkills[skill.id]?.level ?? 0;

              return (
                <div key={skill.id} className="pt-3 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                      <span className="text-[11px] text-slate-400 ml-2 capitalize">
                        Target: Level {req.requiredLevel} ({req.importance})
                      </span>
                    </div>
                    <span className="text-xs font-bold text-indigo-600">
                      Current: Level {currentLvl}
                    </span>
                  </div>

                  {/* Level Option Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((lvl) => {
                      const isSelected = currentLvl === lvl;
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => handleSetLevel(skill.id, lvl as SkillLevel)}
                          className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-200 font-bold text-indigo-900'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold">L{lvl}</span>
                            {isSelected && <Check className="w-3 h-3 text-indigo-600" />}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                            {lvl === 0 ? 'None' : lvl === 1 ? 'Beginner' : lvl === 2 ? 'Intermediate' : 'Advanced'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center space-x-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Update Readiness & Recalculate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
