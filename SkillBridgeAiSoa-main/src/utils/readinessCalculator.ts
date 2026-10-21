import { CAREER_ROLES, SKILLS_CATALOG } from '../data/careerData';
import {
  CareerRole,
  LearningPlan,
  Opportunity,
  PlanModule,
  PlanPhase,
  ReadinessReport,
  Skill,
  StudentProfile,
  StudentSkillData
} from '../types';

export function calculateCareerReadiness(
  skills: Record<string, StudentSkillData>,
  role: CareerRole
): ReadinessReport {
  let totalPossibleWeight = 0;
  let totalEarnedWeight = 0;

  const categoryTotals: Record<string, { earned: number; possible: number }> = {
    foundational: { earned: 0, possible: 0 },
    core: { earned: 0, possible: 0 },
    tools: { earned: 0, possible: 0 },
    soft: { earned: 0, possible: 0 }
  };

  const criticalSkillsMissing: Skill[] = [];
  const importantSkillsMissing: Skill[] = [];
  const acquiredSkills: Skill[] = [];
  const inProgressSkills: Skill[] = [];

  let totalMissingHours = 0;

  for (const req of role.requiredSkills) {
    const skill = SKILLS_CATALOG[req.skillId];
    if (!skill) continue;

    const studentSkill = skills[req.skillId];
    const currentLevel = studentSkill ? studentSkill.level : 0;

    // Weighting multiplier
    let weight = 1;
    if (req.importance === 'critical') weight = 3;
    else if (req.importance === 'important') weight = 2;

    const maxPointsForSkill = req.requiredLevel * weight;
    const earnedPoints = Math.min(currentLevel, req.requiredLevel) * weight;

    totalPossibleWeight += maxPointsForSkill;
    totalEarnedWeight += earnedPoints;

    const cat = skill.category;
    if (categoryTotals[cat]) {
      categoryTotals[cat].possible += maxPointsForSkill;
      categoryTotals[cat].earned += earnedPoints;
    }

    // Gap analysis categorization
    if (currentLevel >= req.requiredLevel) {
      acquiredSkills.push(skill);
    } else {
      const remainingLevelFraction = (req.requiredLevel - currentLevel) / req.requiredLevel;
      totalMissingHours += Math.round(skill.recommendedHours * remainingLevelFraction);

      if (currentLevel > 0) {
        inProgressSkills.push(skill);
      }

      if (req.importance === 'critical') {
        criticalSkillsMissing.push(skill);
      } else if (req.importance === 'important') {
        importantSkillsMissing.push(skill);
      }
    }
  }

  const rawPercentage = totalPossibleWeight > 0 ? (totalEarnedWeight / totalPossibleWeight) * 100 : 0;
  const overallScore = Math.round(rawPercentage);

  let statusLabel = 'Getting Started';
  if (overallScore >= 85) statusLabel = 'Job & Internship Ready';
  else if (overallScore >= 70) statusLabel = 'Internship Ready';
  else if (overallScore >= 50) statusLabel = 'Building Competencies';
  else statusLabel = 'Foundations Phase';

  const categoryScores = {
    foundational: categoryTotals.foundational.possible > 0
      ? Math.round((categoryTotals.foundational.earned / categoryTotals.foundational.possible) * 100)
      : 100,
    core: categoryTotals.core.possible > 0
      ? Math.round((categoryTotals.core.earned / categoryTotals.core.possible) * 100)
      : 0,
    tools: categoryTotals.tools.possible > 0
      ? Math.round((categoryTotals.tools.earned / categoryTotals.tools.possible) * 100)
      : 0,
    soft: categoryTotals.soft.possible > 0
      ? Math.round((categoryTotals.soft.earned / categoryTotals.soft.possible) * 100)
      : 0
  };

  const estimatedWeeksToReady = Math.ceil(totalMissingHours / 12);

  return {
    overallScore,
    statusLabel,
    categoryScores,
    criticalSkillsMissing,
    importantSkillsMissing,
    acquiredSkills,
    inProgressSkills,
    estimatedWeeksToReady: Math.max(estimatedWeeksToReady, 1),
    totalMissingHours
  };
}

export function generateLearningPlan(
  profile: StudentProfile,
  role: CareerRole,
  weeklyHours: number,
  adaptationMode: 'balanced' | 'fast_track' | 'extended' = 'balanced',
  forceBehindFlag: boolean = false
): LearningPlan {
  const effectiveHoursPerWeek = Math.max(weeklyHours || 10, 4);

  // Filter skills to build modules for
  const neededRequirements = role.requiredSkills.filter(req => {
    const studentData = profile.skills[req.skillId];
    const level = studentData ? studentData.level : 0;
    if (adaptationMode === 'fast_track' && req.importance === 'bonus') {
      return false; // Fast-track skips optional bonus skills
    }
    return level < req.requiredLevel;
  });

  // Group modules into phases
  const foundationalModules: PlanModule[] = [];
  const coreModules: PlanModule[] = [];
  const toolsAndProjectsModules: PlanModule[] = [];

  for (const req of neededRequirements) {
    const skill = SKILLS_CATALOG[req.skillId];
    if (!skill) continue;

    const studentData = profile.skills[req.skillId];
    const currentLevel = studentData ? studentData.level : 0;
    const isCompleted = profile.completedModuleIds.includes(`mod_${skill.id}`);

    // Estimated hours calculated dynamically
    const remainingFraction = (req.requiredLevel - currentLevel) / req.requiredLevel;
    const estimatedHours = Math.max(Math.round(skill.recommendedHours * remainingFraction), 6);

    const planModule: PlanModule = {
      id: `mod_${skill.id}`,
      skillId: skill.id,
      title: `${skill.name} Mastery`,
      description: skill.description,
      phaseNumber: 1,
      estimatedHours,
      isEssential: req.importance === 'critical',
      completed: isCompleted,
      resources: skill.freeResources.map(r => ({
        title: r.title,
        type: r.type === 'interactive' ? 'exercise' : r.type === 'video' ? 'video' : 'doc',
        url: r.url,
        source: r.source,
        durationMinutes: Math.round((estimatedHours * 60) / Math.max(skill.freeResources.length, 1))
      })),
      projectPrompt: `Build a mini-application demonstrating ${skill.name} with clean code and tests.`
    };

    if (skill.category === 'foundational') {
      planModule.phaseNumber = 1;
      foundationalModules.push(planModule);
    } else if (skill.category === 'core') {
      planModule.phaseNumber = 2;
      coreModules.push(planModule);
    } else {
      planModule.phaseNumber = 3;
      toolsAndProjectsModules.push(planModule);
    }
  }

  // Phase 4: Capstone & Portfolio
  const capstoneHours = adaptationMode === 'fast_track' ? 15 : 25;
  const capstoneModule: PlanModule = {
    id: `mod_capstone_${role.id}`,
    skillId: 'system_design_comm',
    title: `Target Portfolio Capstone: ${role.title}`,
    description: role.recommendedProjects[0] || 'Build a full portfolio project demonstrating all core skills for this role.',
    phaseNumber: 4,
    estimatedHours: capstoneHours,
    isEssential: true,
    completed: profile.completedModuleIds.includes(`mod_capstone_${role.id}`),
    resources: [
      {
        title: 'Industry Portfolio Project Guide & Rubric',
        type: 'project',
        url: 'https://github.com/topics/fullstack-project',
        source: 'SkillBridge Rubric',
        durationMinutes: capstoneHours * 60
      }
    ],
    projectPrompt: role.recommendedProjects[0]
  };

  const phases: PlanPhase[] = [];

  if (foundationalModules.length > 0) {
    const totalHours = foundationalModules.reduce((acc, m) => acc + m.estimatedHours, 0);
    phases.push({
      phaseNumber: 1,
      title: 'Phase 1: Foundational Bridge',
      focus: 'Eliminating baseline knowledge gaps and syntax fundamentals',
      estimatedWeeks: Math.max(Math.ceil(totalHours / effectiveHoursPerWeek), 1),
      modules: foundationalModules
    });
  }

  if (coreModules.length > 0) {
    const totalHours = coreModules.reduce((acc, m) => acc + m.estimatedHours, 0);
    phases.push({
      phaseNumber: phases.length + 1,
      title: `Phase ${phases.length + 1}: Core Architecture & Technical Mastery`,
      focus: 'Deep dive into required frameworks, backend services, and database structures',
      estimatedWeeks: Math.max(Math.ceil(totalHours / effectiveHoursPerWeek), 2),
      modules: coreModules
    });
  }

  if (toolsAndProjectsModules.length > 0) {
    const totalHours = toolsAndProjectsModules.reduce((acc, m) => acc + m.estimatedHours, 0);
    phases.push({
      phaseNumber: phases.length + 1,
      title: `Phase ${phases.length + 1}: Tools, Testing & Deployment Readiness`,
      focus: 'Version control, automated testing, containerization, and professional workflows',
      estimatedWeeks: Math.max(Math.ceil(totalHours / effectiveHoursPerWeek), 1),
      modules: toolsAndProjectsModules
    });
  }

  phases.push({
    phaseNumber: phases.length + 1,
    title: `Phase ${phases.length + 1}: Capstone Showcase & Job Readiness`,
    focus: 'Ship an end-to-end portfolio proof project and refine technical interview readiness',
    estimatedWeeks: Math.max(Math.ceil(capstoneHours / effectiveHoursPerWeek), 1),
    modules: [capstoneModule]
  });

  // Calculate target date
  const totalWeeks = phases.reduce((sum, p) => sum + p.estimatedWeeks, 0);
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + totalWeeks * 7);

  // Check if behind schedule
  // e.g. student profile has completed fewer modules than expected if plan was created > 2 weeks ago
  const daysSinceCreated = Math.max(
    Math.floor((Date.now() - new Date(profile.planCreatedDate).getTime()) / (1000 * 60 * 60 * 24)),
    1
  );
  const expectedWeeksPassed = Math.floor(daysSinceCreated / 7);
  const totalModulesCount = phases.flatMap(p => p.modules).length;
  const completedCount = profile.completedModuleIds.length;
  const isBehind = forceBehindFlag || (expectedWeeksPassed >= 2 && completedCount < Math.min(expectedWeeksPassed * 1, totalModulesCount / 2));

  return {
    id: `plan_${profile.id}_${role.id}`,
    roleId: role.id,
    createdAt: profile.planCreatedDate,
    targetCompletionDate: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    weeklyHours: effectiveHoursPerWeek,
    adaptationMode,
    phases,
    isBehindSchedule: isBehind,
    behindDays: isBehind ? Math.max(Math.round(expectedWeeksPassed * 4), 6) : 0
  };
}

export function matchOpportunity(
  opportunity: Opportunity,
  studentSkills: Record<string, StudentSkillData>
): {
  matchPercentage: number;
  isReady: boolean;
  isNearReady: boolean;
  matchingSkills: Skill[];
  missingSkills: Skill[];
} {
  const reqCount = opportunity.requiredSkillIds.length;
  if (reqCount === 0) {
    return { matchPercentage: 100, isReady: true, isNearReady: false, matchingSkills: [], missingSkills: [] };
  }

  const matchingSkills: Skill[] = [];
  const missingSkills: Skill[] = [];

  for (const skillId of opportunity.requiredSkillIds) {
    const skill = SKILLS_CATALOG[skillId];
    if (!skill) continue;

    const studentSkill = studentSkills[skillId];
    if (studentSkill && studentSkill.level >= 1) {
      matchingSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  }

  const matchPercentage = Math.round((matchingSkills.length / reqCount) * 100);
  const isReady = matchPercentage >= 75;
  const isNearReady = matchPercentage >= 50 && matchPercentage < 75;

  return {
    matchPercentage,
    isReady,
    isNearReady,
    matchingSkills,
    missingSkills
  };
}

export function getRoleById(roleId: string): CareerRole {
  return CAREER_ROLES.find(r => r.id === roleId) || CAREER_ROLES[0];
}
