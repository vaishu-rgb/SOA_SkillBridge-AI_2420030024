export type SkillCategory = 'foundational' | 'core' | 'tools' | 'soft';
export type SkillImportance = 'critical' | 'important' | 'bonus';
export type SkillLevel = 0 | 1 | 2 | 3; // 0: None, 1: Beginner, 2: Intermediate, 3: Advanced/Mastered

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  recommendedHours: number;
  freeResources: {
    title: string;
    type: 'article' | 'video' | 'interactive' | 'doc';
    url: string;
    source: string;
  }[];
}

export interface CareerRequirement {
  skillId: string;
  requiredLevel: SkillLevel; // Minimum level required for junior/internship role
  importance: SkillImportance;
}

export interface CareerRole {
  id: string;
  title: string;
  badge: string;
  description: string;
  averageSalary: string;
  demandRating: 'High' | 'Very High' | 'Moderate';
  typicalInternshipTitle: string;
  requiredSkills: CareerRequirement[];
  recommendedProjects: string[];
}

export interface LearningResource {
  title: string;
  type: 'video' | 'doc' | 'exercise' | 'project';
  url: string;
  source: string;
  durationMinutes: number;
}

export interface PlanModule {
  id: string;
  skillId: string;
  title: string;
  description: string;
  phaseNumber: number;
  estimatedHours: number;
  isEssential: boolean;
  resources: LearningResource[];
  projectPrompt?: string;
  completed: boolean;
  completedAt?: string;
}

export interface PlanPhase {
  phaseNumber: number;
  title: string;
  focus: string;
  estimatedWeeks: number;
  modules: PlanModule[];
}

export interface LearningPlan {
  id: string;
  roleId: string;
  createdAt: string;
  targetCompletionDate: string;
  weeklyHours: number;
  adaptationMode: 'balanced' | 'fast_track' | 'extended';
  phases: PlanPhase[];
  isBehindSchedule: boolean;
  behindDays?: number;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  roleType: 'internship' | 'junior_job' | 'capstone_project';
  location: 'Remote' | 'Hybrid' | 'On-site';
  compensation: string;
  durationOrType: string;
  description: string;
  requiredSkillIds: string[];
  targetRoleId: string;
  minReadinessScore: number;
  applyDeadline: string;
  link: string;
  tags: string[];
}

export interface StudentSkillData {
  level: SkillLevel;
  verified: boolean;
  lastPracticed?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  education: string;
  targetRoleId: string;
  weeklyHours: number;
  skills: Record<string, StudentSkillData>;
  completedModuleIds: string[];
  streakDays: number;
  totalHoursStudied: number;
  planCreatedDate: string;
  lastActiveDate: string;
  savedOpportunityIds: string[];
}

export interface ReadinessReport {
  overallScore: number;
  statusLabel: string;
  categoryScores: {
    foundational: number;
    core: number;
    tools: number;
    soft: number;
  };
  criticalSkillsMissing: Skill[];
  importantSkillsMissing: Skill[];
  acquiredSkills: Skill[];
  inProgressSkills: Skill[];
  estimatedWeeksToReady: number;
  totalMissingHours: number;
}
