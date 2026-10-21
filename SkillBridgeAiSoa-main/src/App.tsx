import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { ReadinessDashboard } from './components/ReadinessDashboard';
import { SkillGapAnalysis } from './components/SkillGapAnalysis';
import { LearningPlanView } from './components/LearningPlanView';
import { OpportunitiesView } from './components/OpportunitiesView';
import { AdaptivePlanModal } from './components/AdaptivePlanModal';
import { SkillAssessmentModal } from './components/SkillAssessmentModal';
import { CAREER_ROLES, PRESET_STUDENTS, SKILLS_CATALOG } from './data/careerData';
import { CareerRole, LearningPlan, SkillLevel, StudentProfile, StudentSkillData } from './types';
import { calculateCareerReadiness, generateLearningPlan } from './utils/readinessCalculator';

export default function App() {
  // Load initial student from localStorage or default preset (Alex - CS Sophomore)
  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('skillbridge_student');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved student:', e);
      }
    }
    return PRESET_STUDENTS[0];
  });

  // Current Target Career Role
  const [currentRole, setCurrentRole] = useState<CareerRole>(() => {
    const found = CAREER_ROLES.find(r => r.id === currentStudent.targetRoleId);
    return found || CAREER_ROLES[0];
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'gap_analysis' | 'learning_plan' | 'opportunities'>('dashboard');

  // Plan adaptation settings
  const [weeklyHours, setWeeklyHours] = useState<number>(currentStudent.weeklyHours || 12);
  const [adaptationMode, setAdaptationMode] = useState<'balanced' | 'fast_track' | 'extended'>('balanced');
  const [forceBehind, setForceBehind] = useState<boolean>(true); // Initial realistic trigger to showcase adaptive plan recalibration

  // Modals
  const [isAdaptationModalOpen, setIsAdaptationModalOpen] = useState<boolean>(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save student to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem('skillbridge_student', JSON.stringify(currentStudent));
  }, [currentStudent]);

  // Derived: Career Readiness Analysis
  const readinessReport = useMemo(() => {
    return calculateCareerReadiness(currentStudent.skills, currentRole);
  }, [currentStudent.skills, currentRole]);

  // Derived: Automated Personalized Learning Plan
  const learningPlan: LearningPlan = useMemo(() => {
    return generateLearningPlan(
      currentStudent,
      currentRole,
      weeklyHours,
      adaptationMode,
      forceBehind
    );
  }, [currentStudent, currentRole, weeklyHours, adaptationMode, forceBehind]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handlers
  const handleSelectRole = (role: CareerRole) => {
    setCurrentRole(role);
    setCurrentStudent(prev => ({
      ...prev,
      targetRoleId: role.id
    }));
    showToast(`Target role switched to ${role.title}`);
  };

  const handleSelectStudent = (student: StudentProfile) => {
    setCurrentStudent(student);
    const role = CAREER_ROLES.find(r => r.id === student.targetRoleId) || CAREER_ROLES[0];
    setCurrentRole(role);
    setWeeklyHours(student.weeklyHours || 12);
    setAdaptationMode('balanced');
    setForceBehind(student.id === 'student_sophomore');
    showToast(`Loaded ${student.name}'s profile & progress data`);
  };

  const handleUpdateSkillLevel = (skillId: string, level: SkillLevel) => {
    setCurrentStudent(prev => {
      const updatedSkills = {
        ...prev.skills,
        [skillId]: {
          level,
          verified: level > 0,
          lastPracticed: 'Today'
        }
      };
      return {
        ...prev,
        skills: updatedSkills
      };
    });

    const skill = SKILLS_CATALOG[skillId];
    showToast(`Updated ${skill ? skill.name : skillId} to Level ${level}`);
  };

  const handleToggleModule = (moduleId: string, skillId: string, willBeCompleted: boolean) => {
    setCurrentStudent(prev => {
      const isAlreadyCompleted = prev.completedModuleIds.includes(moduleId);
      let newCompleted = [...prev.completedModuleIds];

      if (willBeCompleted && !isAlreadyCompleted) {
        newCompleted.push(moduleId);
      } else if (!willBeCompleted && isAlreadyCompleted) {
        newCompleted = newCompleted.filter(id => id !== moduleId);
      }

      // Also upgrade skill level by +1 if marking completed
      const currentSkill = prev.skills[skillId] || { level: 0, verified: false };
      const newLevel: SkillLevel = willBeCompleted
        ? (Math.min(currentSkill.level + 1, 3) as SkillLevel)
        : currentSkill.level;

      return {
        ...prev,
        completedModuleIds: newCompleted,
        totalHoursStudied: willBeCompleted ? prev.totalHoursStudied + 4 : prev.totalHoursStudied,
        streakDays: willBeCompleted ? prev.streakDays + 1 : prev.streakDays,
        skills: {
          ...prev.skills,
          [skillId]: {
            level: newLevel,
            verified: true,
            lastPracticed: 'Today'
          }
        }
      };
    });

    if (willBeCompleted) {
      showToast('Module completed! Progress & readiness updated.');
    }
  };

  const handleSaveAdaptedPlan = (newWeeklyHours: number, mode: 'balanced' | 'fast_track' | 'extended') => {
    setWeeklyHours(newWeeklyHours);
    setAdaptationMode(mode);
    setForceBehind(false); // Resolved behind schedule through adaptation!

    setCurrentStudent(prev => ({
      ...prev,
      weeklyHours: newWeeklyHours
    }));

    showToast('Plan adapted & timeline recalibrated to your schedule!');
  };

  const handleToggleSaveOpportunity = (oppId: string) => {
    setCurrentStudent(prev => {
      const isSaved = prev.savedOpportunityIds.includes(oppId);
      const newSaved = isSaved
        ? prev.savedOpportunityIds.filter(id => id !== oppId)
        : [...prev.savedOpportunityIds, oppId];
      return {
        ...prev,
        savedOpportunityIds: newSaved
      };
    });
  };

  const handleSaveAssessment = (updatedSkills: Record<string, StudentSkillData>) => {
    setCurrentStudent(prev => ({
      ...prev,
      skills: updatedSkills
    }));
    showToast('Career readiness recalculated with new self-assessment!');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center space-x-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header & Navigation */}
      <Header
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        currentStudent={currentStudent}
        onSelectStudent={handleSelectStudent}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        readinessScore={readinessReport.overallScore}
      />

      {/* Main Application Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <ReadinessDashboard
            currentRole={currentRole}
            readiness={readinessReport}
            currentStudent={currentStudent}
            onNavigateTab={setActiveTab}
            onOpenAssessment={() => setIsAssessmentModalOpen(true)}
            onOpenAdaptation={() => setIsAdaptationModalOpen(true)}
          />
        )}

        {activeTab === 'gap_analysis' && (
          <SkillGapAnalysis
            currentRole={currentRole}
            currentStudent={currentStudent}
            onUpdateSkillLevel={handleUpdateSkillLevel}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'learning_plan' && (
          <LearningPlanView
            currentRole={currentRole}
            currentStudent={currentStudent}
            plan={learningPlan}
            onToggleModule={handleToggleModule}
            onOpenAdaptation={() => setIsAdaptationModalOpen(true)}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'opportunities' && (
          <OpportunitiesView
            currentRole={currentRole}
            currentStudent={currentStudent}
            onNavigateTab={setActiveTab}
            onToggleSaveOpportunity={handleToggleSaveOpportunity}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">SkillBridge</span>
            <span>— Personalized Career Readiness & Skill Gap Analysis</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>Deterministic Diagnostic Engine</span>
            <span>•</span>
            <span>Adaptive Study Pace</span>
            <span>•</span>
            <span>Verified Internship Match</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AdaptivePlanModal
        isOpen={isAdaptationModalOpen}
        onClose={() => setIsAdaptationModalOpen(false)}
        currentRole={currentRole}
        currentStudent={currentStudent}
        currentPlan={learningPlan}
        onSaveAdaptedPlan={handleSaveAdaptedPlan}
      />

      <SkillAssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        currentRole={currentRole}
        currentStudent={currentStudent}
        onSaveAssessment={handleSaveAssessment}
      />
    </div>
  );
}
