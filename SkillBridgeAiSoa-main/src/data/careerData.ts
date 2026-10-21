import { CareerRole, Opportunity, Skill, StudentProfile } from '../types';

export const SKILLS_CATALOG: Record<string, Skill> = {
  // Foundational Web & Programming
  'html_css': {
    id: 'html_css',
    name: 'HTML5 & Responsive CSS',
    category: 'foundational',
    description: 'Semantic markup, modern layout models (Flexbox & CSS Grid), media queries, and accessible UI structure.',
    recommendedHours: 25,
    freeResources: [
      { title: 'MDN Web Docs: CSS Layouts', type: 'doc', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout', source: 'MDN' },
      { title: 'Responsive Web Design Certification', type: 'interactive', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', source: 'freeCodeCamp' }
    ]
  },
  'javascript': {
    id: 'javascript',
    name: 'Modern JavaScript (ES6+)',
    category: 'foundational',
    description: 'Scope, closures, async/await, promises, array methods, DOM manipulation, and modern syntax patterns.',
    recommendedHours: 35,
    freeResources: [
      { title: 'JavaScript.info - The Modern Tutorial', type: 'interactive', url: 'https://javascript.info', source: 'JavaScript.info' },
      { title: 'Eloquent JavaScript (Free Book)', type: 'article', url: 'https://eloquentjavascript.net', source: 'Marijn Haverbeke' }
    ]
  },
  'python': {
    id: 'python',
    name: 'Python Programming',
    category: 'foundational',
    description: 'Data structures, object-oriented concepts, virtual environments, file I/O, and idiomatic Pythonic scripting.',
    recommendedHours: 30,
    freeResources: [
      { title: 'Python Official Tutorial', type: 'doc', url: 'https://docs.python.org/3/tutorial/', source: 'Python.org' },
      { title: 'Scientific Computing with Python', type: 'interactive', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/', source: 'freeCodeCamp' }
    ]
  },
  'git': {
    id: 'git',
    name: 'Git & GitHub Collaboration',
    category: 'tools',
    description: 'Branching models, pull requests, resolving merge conflicts, conventional commits, and team collaboration.',
    recommendedHours: 15,
    freeResources: [
      { title: 'Git Pro Book', type: 'doc', url: 'https://git-scm.com/book/en/v2', source: 'Git SCM' },
      { title: 'GitHub Skills Interactive Courses', type: 'interactive', url: 'https://skills.github.com/', source: 'GitHub' }
    ]
  },

  // Core Frontend & Fullstack
  'typescript': {
    id: 'typescript',
    name: 'TypeScript',
    category: 'core',
    description: 'Static typing, interfaces, generics, type narrowing, utility types, and integration with modern frameworks.',
    recommendedHours: 30,
    freeResources: [
      { title: 'TypeScript Handbook', type: 'doc', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', source: 'TypeScript Team' },
      { title: 'Total TypeScript Essentials', type: 'interactive', url: 'https://www.totaltypescript.com/tutorials', source: 'Matt Pocock' }
    ]
  },
  'react': {
    id: 'react',
    name: 'React.js & State Architecture',
    category: 'core',
    description: 'Component lifecycles, hooks (useState, useEffect, useMemo), custom hooks, context, and client state.',
    recommendedHours: 40,
    freeResources: [
      { title: 'React Official Documentation & Interactive Sandbox', type: 'doc', url: 'https://react.dev/learn', source: 'React.dev' },
      { title: 'Full Stack Open: Part 1 - React', type: 'interactive', url: 'https://fullstackopen.com/en/part1', source: 'University of Helsinki' }
    ]
  },
  'nodejs': {
    id: 'nodejs',
    name: 'Node.js & Express REST APIs',
    category: 'core',
    description: 'HTTP servers, middleware pipelines, route controllers, authentication (JWT), error handling, and API security.',
    recommendedHours: 35,
    freeResources: [
      { title: 'Express.js Guide & Best Practices', type: 'doc', url: 'https://expressjs.com/en/starter/installing.html', source: 'Express' },
      { title: 'The Odin Project: NodeJS Course', type: 'interactive', url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs', source: 'The Odin Project' }
    ]
  },
  'sql_databases': {
    id: 'sql_databases',
    name: 'SQL & Relational Databases (PostgreSQL)',
    category: 'core',
    description: 'Relational schema design, normalization, complex JOIN queries, indexes, transactions, and ORMs.',
    recommendedHours: 25,
    freeResources: [
      { title: 'PostgreSQL Tutorial', type: 'interactive', url: 'https://www.postgresqltutorial.com/', source: 'Postgres Tutorial' },
      { title: 'SQLBolt - Learn SQL Interactively', type: 'interactive', url: 'https://sqlbolt.com/', source: 'SQLBolt' }
    ]
  },
  'docker': {
    id: 'docker',
    name: 'Docker & Containerization',
    category: 'tools',
    description: 'Writing Dockerfiles, multi-stage builds, container networks, docker-compose for multi-service environments.',
    recommendedHours: 20,
    freeResources: [
      { title: 'Docker 101 Tutorial', type: 'interactive', url: 'https://www.docker.com/101-tutorial/', source: 'Docker' },
      { title: 'Docker Curriculum by Prakhar Srivastav', type: 'article', url: 'https://docker-curriculum.com/', source: 'Docker Curriculum' }
    ]
  },
  'automated_testing': {
    id: 'automated_testing',
    name: 'Automated Testing (Unit & Integration)',
    category: 'tools',
    description: 'Writing maintainable test suites with Vitest/Jest, React Testing Library, API mocking, and test coverage.',
    recommendedHours: 20,
    freeResources: [
      { title: 'Testing JavaScript Principles', type: 'article', url: 'https://kentcdodds.com/blog/write-tests', source: 'Kent C. Dodds' }
    ]
  },

  // Data & Machine Learning Skills
  'pandas_numpy': {
    id: 'pandas_numpy',
    name: 'Data Manipulation with Pandas & NumPy',
    category: 'core',
    description: 'DataFrames, series indexing, aggregation, cleaning dirty datasets, reshaping, and vectorized array operations.',
    recommendedHours: 30,
    freeResources: [
      { title: '10 Minutes to Pandas', type: 'doc', url: 'https://pandas.pydata.org/docs/user_guide/10min.html', source: 'Pandas.pydata' },
      { title: 'Kaggle Pandas Course', type: 'interactive', url: 'https://www.kaggle.com/learn/pandas', source: 'Kaggle' }
    ]
  },
  'data_visualization': {
    id: 'data_visualization',
    name: 'Data Visualization (Matplotlib, Seaborn, BI)',
    category: 'tools',
    description: 'Chart selection, distribution plots, heatmaps, interactive dashboards, and storytelling with data.',
    recommendedHours: 20,
    freeResources: [
      { title: 'Kaggle Data Visualization Course', type: 'interactive', url: 'https://www.kaggle.com/learn/data-visualization', source: 'Kaggle' }
    ]
  },
  'machine_learning': {
    id: 'machine_learning',
    name: 'Core Machine Learning & Scikit-Learn',
    category: 'core',
    description: 'Supervised vs unsupervised learning, regression, classification, cross-validation, and metrics (F1, ROC-AUC).',
    recommendedHours: 45,
    freeResources: [
      { title: 'Google Machine Learning Crash Course', type: 'interactive', url: 'https://developers.google.com/machine-learning/crash-course', source: 'Google Developers' }
    ]
  },

  // Cloud & DevOps Skills
  'linux_bash': {
    id: 'linux_bash',
    name: 'Linux Shell & Bash Scripting',
    category: 'foundational',
    description: 'File permissions, process management, piping, SSH key authentication, grep/sed, and automated cron jobs.',
    recommendedHours: 20,
    freeResources: [
      { title: 'Linux Journey Guide', type: 'interactive', url: 'https://linuxjourney.com/', source: 'Linux Journey' }
    ]
  },
  'ci_cd': {
    id: 'ci_cd',
    name: 'CI/CD Pipelines (GitHub Actions)',
    category: 'tools',
    description: 'Automated test workflows, build verification, linting checks, environment secrets, and deployment triggers.',
    recommendedHours: 15,
    freeResources: [
      { title: 'GitHub Actions Documentation', type: 'doc', url: 'https://docs.github.com/en/actions', source: 'GitHub' }
    ]
  },
  'cloud_aws_gcp': {
    id: 'cloud_aws_gcp',
    name: 'Cloud Computing Essentials (GCP / AWS)',
    category: 'core',
    description: 'Compute instances, Cloud Run/App Runner, object storage (S3/GCS), IAM roles, VPCs, and serverless hosting.',
    recommendedHours: 35,
    freeResources: [
      { title: 'AWS Cloud Practitioner / GCP Free Tiers', type: 'doc', url: 'https://cloud.google.com/free', source: 'Cloud Providers' }
    ]
  },

  // UI/UX & Design Skills
  'figma_ui': {
    id: 'figma_ui',
    name: 'Figma & UI Component Systems',
    category: 'core',
    description: 'Auto-layout, responsive constraints, token systems, variants, interactive prototypes, and developer handoffs.',
    recommendedHours: 25,
    freeResources: [
      { title: 'Figma Community Tutorials & Best Practices', type: 'video', url: 'https://help.figma.com/hc/en-us/categories/360002051613', source: 'Figma' }
    ]
  },
  'user_research': {
    id: 'user_research',
    name: 'User Research & Usability Testing',
    category: 'foundational',
    description: 'Formulating interview protocols, synthesizing affinity maps, journey mapping, heuristic evaluations, and user testing.',
    recommendedHours: 20,
    freeResources: [
      { title: 'Nielsen Norman Group Articles', type: 'article', url: 'https://www.nngroup.com/articles/', source: 'NN/g' }
    ]
  },

  // Cybersecurity Skills
  'network_security': {
    id: 'network_security',
    name: 'Networking & OWASP Security Basics',
    category: 'core',
    description: 'TCP/IP, DNS, SSL/TLS certificates, OWASP Top 10 web vulnerabilities (SQLi, XSS, CSRF), and defensive coding.',
    recommendedHours: 30,
    freeResources: [
      { title: 'OWASP Top 10 Web Application Security Risks', type: 'doc', url: 'https://owasp.org/www-project-top-ten/', source: 'OWASP' }
    ]
  },

  // Professional & Soft Skills
  'system_design_comm': {
    id: 'system_design_comm',
    name: 'Technical Communication & System Design',
    category: 'soft',
    description: 'Explaining architecture trade-offs, writing technical documentation, PR code reviews, and structured interviewing.',
    recommendedHours: 15,
    freeResources: [
      { title: 'System Design Primer', type: 'doc', url: 'https://github.com/donnemartin/system-design-primer', source: 'GitHub' }
    ]
  },
  'problem_solving': {
    id: 'problem_solving',
    name: 'Algorithmic Thinking & Data Structures',
    category: 'foundational',
    description: 'Arrays, hash maps, linked lists, binary search, time & space complexity analysis (Big-O notation).',
    recommendedHours: 30,
    freeResources: [
      { title: 'NeetCode Core Roadmap', type: 'interactive', url: 'https://neetcode.io/roadmap', source: 'NeetCode' }
    ]
  }
};

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'fullstack_dev',
    title: 'Full-Stack Software Engineer',
    badge: 'Most Popular for Interns',
    description: 'Builds end-to-end web applications, interactive user interfaces, robust REST APIs, and scalable database systems.',
    averageSalary: '$85,000 - $115,000',
    demandRating: 'Very High',
    typicalInternshipTitle: 'Software Engineering Intern (Web/Full-Stack)',
    requiredSkills: [
      { skillId: 'javascript', requiredLevel: 2, importance: 'critical' },
      { skillId: 'react', requiredLevel: 2, importance: 'critical' },
      { skillId: 'nodejs', requiredLevel: 2, importance: 'critical' },
      { skillId: 'sql_databases', requiredLevel: 2, importance: 'critical' },
      { skillId: 'git', requiredLevel: 2, importance: 'critical' },
      { skillId: 'typescript', requiredLevel: 1, importance: 'important' },
      { skillId: 'html_css', requiredLevel: 2, importance: 'important' },
      { skillId: 'automated_testing', requiredLevel: 1, importance: 'important' },
      { skillId: 'docker', requiredLevel: 1, importance: 'bonus' },
      { skillId: 'system_design_comm', requiredLevel: 1, importance: 'bonus' }
    ],
    recommendedProjects: [
      'Full-Stack Collaborative Workspace with live CRUD and PostgreSQL persistence',
      'E-commerce Storefront with Stripe Checkout, Auth, and admin inventory dashboard'
    ]
  },
  {
    id: 'data_analyst_ml',
    title: 'Data Analyst & ML Specialist',
    badge: 'High Industry Growth',
    description: 'Analyzes organizational datasets, constructs predictive models, transforms data pipelines, and creates executive dashboards.',
    averageSalary: '$80,000 - $110,000',
    demandRating: 'High',
    typicalInternshipTitle: 'Data Science & Analytics Intern',
    requiredSkills: [
      { skillId: 'python', requiredLevel: 2, importance: 'critical' },
      { skillId: 'pandas_numpy', requiredLevel: 2, importance: 'critical' },
      { skillId: 'sql_databases', requiredLevel: 2, importance: 'critical' },
      { skillId: 'data_visualization', requiredLevel: 2, importance: 'important' },
      { skillId: 'git', requiredLevel: 1, importance: 'important' },
      { skillId: 'machine_learning', requiredLevel: 1, importance: 'important' },
      { skillId: 'problem_solving', requiredLevel: 1, importance: 'bonus' },
      { skillId: 'system_design_comm', requiredLevel: 1, importance: 'bonus' }
    ],
    recommendedProjects: [
      'End-to-End Customer Churn Prediction Engine with interactive Streamlit dashboard',
      'Exploratory Data Analysis on Public Healthcare or Financial Market Data'
    ]
  },
  {
    id: 'cloud_devops',
    title: 'Cloud & DevOps Engineer',
    badge: 'High Earning Potential',
    description: 'Automates deployment pipelines, provisions containerized microservices, monitors cloud infrastructure, and guarantees uptime.',
    averageSalary: '$90,000 - $125,000',
    demandRating: 'Very High',
    typicalInternshipTitle: 'Cloud Operations / DevOps Intern',
    requiredSkills: [
      { skillId: 'linux_bash', requiredLevel: 2, importance: 'critical' },
      { skillId: 'docker', requiredLevel: 2, importance: 'critical' },
      { skillId: 'git', requiredLevel: 2, importance: 'critical' },
      { skillId: 'ci_cd', requiredLevel: 2, importance: 'critical' },
      { skillId: 'cloud_aws_gcp', requiredLevel: 1, importance: 'important' },
      { skillId: 'python', requiredLevel: 1, importance: 'important' },
      { skillId: 'network_security', requiredLevel: 1, importance: 'bonus' },
      { skillId: 'system_design_comm', requiredLevel: 1, importance: 'bonus' }
    ],
    recommendedProjects: [
      'Automated GitOps deployment pipeline using GitHub Actions to deploy containerized apps',
      'Infrastructure as Code template provisioning multi-tier environment on GCP or AWS'
    ]
  },
  {
    id: 'frontend_engineer',
    title: 'Frontend Web Engineer',
    badge: 'Creative & Technical',
    description: 'Crafts performant, accessible, and delighting web experiences with modern JavaScript frameworks and design systems.',
    averageSalary: '$80,000 - $105,000',
    demandRating: 'High',
    typicalInternshipTitle: 'Frontend Engineering Intern',
    requiredSkills: [
      { skillId: 'html_css', requiredLevel: 3, importance: 'critical' },
      { skillId: 'javascript', requiredLevel: 2, importance: 'critical' },
      { skillId: 'react', requiredLevel: 2, importance: 'critical' },
      { skillId: 'git', requiredLevel: 2, importance: 'critical' },
      { skillId: 'typescript', requiredLevel: 2, importance: 'important' },
      { skillId: 'figma_ui', requiredLevel: 1, importance: 'important' },
      { skillId: 'automated_testing', requiredLevel: 1, importance: 'bonus' }
    ],
    recommendedProjects: [
      'Accessible Design System with documented components, theme tokens, and storybook',
      'Real-time Analytics Dashboard with responsive charts, filters, and keyboard navigation'
    ]
  },
  {
    id: 'ui_ux_designer',
    title: 'UI/UX Product Designer',
    badge: 'Design & Human Factors',
    description: 'Researches user needs, conceptualizes interfaces, validates wireframes, and prototypes responsive product designs.',
    averageSalary: '$75,000 - $100,000',
    demandRating: 'Moderate',
    typicalInternshipTitle: 'Product Design / UX Intern',
    requiredSkills: [
      { skillId: 'figma_ui', requiredLevel: 3, importance: 'critical' },
      { skillId: 'user_research', requiredLevel: 2, importance: 'critical' },
      { skillId: 'html_css', requiredLevel: 1, importance: 'important' },
      { skillId: 'system_design_comm', requiredLevel: 2, importance: 'important' }
    ],
    recommendedProjects: [
      'Comprehensive Case Study: Redesigning a campus course registration portal with usability testing',
      'Design System token library with auto-layout mobile & desktop mockups'
    ]
  },
  {
    id: 'cybersecurity_analyst',
    title: 'Cybersecurity Analyst',
    badge: 'Critical Defense Role',
    description: 'Guards systems against breaches, audits application vulnerabilities, investigates security logs, and enforces compliance.',
    averageSalary: '$85,000 - $115,000',
    demandRating: 'Very High',
    typicalInternshipTitle: 'Information Security Intern',
    requiredSkills: [
      { skillId: 'network_security', requiredLevel: 2, importance: 'critical' },
      { skillId: 'linux_bash', requiredLevel: 2, importance: 'critical' },
      { skillId: 'python', requiredLevel: 1, importance: 'important' },
      { skillId: 'git', requiredLevel: 1, importance: 'important' },
      { skillId: 'system_design_comm', requiredLevel: 1, importance: 'bonus' }
    ],
    recommendedProjects: [
      'Web Application Vulnerability Audit and remediation report adhering to OWASP standards',
      'Automated log parser detecting suspicious SSH brute-force patterns in Python'
    ]
  }
];

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp_techcorp_swe_intern',
    title: 'Software Engineering Summer Intern',
    company: 'Vanguard Systems',
    roleType: 'internship',
    location: 'Remote',
    compensation: '$38 - $46 / hr',
    durationOrType: '12 Weeks (Summer)',
    description: 'Join our customer platform team building features with React, Node.js, and PostgreSQL. You will ship code directly to production under dedicated mentor supervision.',
    requiredSkillIds: ['javascript', 'react', 'git', 'sql_databases'],
    targetRoleId: 'fullstack_dev',
    minReadinessScore: 70,
    applyDeadline: 'Open for Fall/Spring applicants',
    link: '#apply-vanguard',
    tags: ['Paid Mentorship', 'Direct Mentorship', 'High Conversion to Fulltime']
  },
  {
    id: 'opp_stride_junior_dev',
    title: 'Junior Full-Stack Web Developer',
    company: 'Stride Technologies',
    roleType: 'junior_job',
    location: 'Hybrid',
    compensation: '$78,000 - $92,000 / yr',
    durationOrType: 'Full-time Entry Level',
    description: 'Looking for an ambitious new grad or self-starter with solid foundations in React, TypeScript, and REST APIs. Great culture and supportive senior developers.',
    requiredSkillIds: ['javascript', 'typescript', 'react', 'nodejs', 'sql_databases', 'git'],
    targetRoleId: 'fullstack_dev',
    minReadinessScore: 80,
    applyDeadline: 'Rolling Admissions',
    link: '#apply-stride',
    tags: ['Health Benefits', 'Flexible Hours', 'Dedicated Learning Budget']
  },
  {
    id: 'opp_open_source_capstone',
    title: 'Open Source Community Full-Stack Contributor',
    company: 'DevBridge Foundation',
    roleType: 'capstone_project',
    location: 'Remote',
    compensation: 'Portfolio Verified & $1,500 Milestone Grant',
    durationOrType: 'Self-Paced (4-6 Weeks)',
    description: 'Work alongside senior maintainers to build accessibility features and API endpoints for a widely used developer education platform. Outstanding resume builder.',
    requiredSkillIds: ['javascript', 'react', 'git', 'html_css'],
    targetRoleId: 'fullstack_dev',
    minReadinessScore: 50,
    applyDeadline: 'Immediate Start Available',
    link: '#join-opensource',
    tags: ['Resume Highlight', 'Code Review from Staff Devs', 'Grant Eligible']
  },
  {
    id: 'opp_finflow_data_intern',
    title: 'Data & Business Intelligence Intern',
    company: 'FinFlow Analytics',
    roleType: 'internship',
    location: 'Remote',
    compensation: '$34 - $40 / hr',
    durationOrType: '10 Weeks',
    description: 'Clean, query, and visualize transactional datasets to derive actionable user retention metrics. Work with Python, Pandas, and PostgreSQL.',
    requiredSkillIds: ['python', 'pandas_numpy', 'sql_databases', 'data_visualization'],
    targetRoleId: 'data_analyst_ml',
    minReadinessScore: 68,
    applyDeadline: 'Open across all regions',
    link: '#apply-finflow',
    tags: ['Finance Tech', 'SQL Heavy', 'Executive Presentations']
  },
  {
    id: 'opp_insight_data_entry',
    title: 'Junior Associate Data Analyst',
    company: 'Insight Metrics Co.',
    roleType: 'junior_job',
    location: 'Hybrid',
    compensation: '$72,000 - $85,000 / yr',
    durationOrType: 'Full-time Entry Level',
    description: 'Analyze marketing campaigns, maintain ETL scripts, and build self-serve dashboards for product managers.',
    requiredSkillIds: ['python', 'pandas_numpy', 'sql_databases', 'data_visualization', 'git'],
    targetRoleId: 'data_analyst_ml',
    minReadinessScore: 78,
    applyDeadline: 'Closing in 3 weeks',
    link: '#apply-insight',
    tags: ['Hybrid Work', 'Cross-functional', 'Mentorship Program']
  },
  {
    id: 'opp_cloudscale_devops_intern',
    title: 'Cloud Infrastructure & SRE Intern',
    company: 'CloudScale Global',
    roleType: 'internship',
    location: 'Remote',
    compensation: '$40 - $48 / hr',
    durationOrType: '12 Weeks',
    description: 'Help manage CI/CD pipelines and Docker container deployments across Google Cloud and AWS. Learn production reliability practices.',
    requiredSkillIds: ['linux_bash', 'docker', 'git', 'ci_cd'],
    targetRoleId: 'cloud_devops',
    minReadinessScore: 70,
    applyDeadline: 'Rolling Basis',
    link: '#apply-cloudscale',
    tags: ['DevOps Tooling', 'High Demand', 'Cloud Certification Support']
  },
  {
    id: 'opp_pixelcraft_ui_intern',
    title: 'UI/UX Design Apprentice',
    company: 'PixelCraft Interactive',
    roleType: 'internship',
    location: 'Remote',
    compensation: '$28 - $35 / hr',
    durationOrType: '8 Weeks',
    description: 'Assist in drafting Figma wireframes, running 1-on-1 user interviews, and auditing usability bottlenecks across mobile and desktop interfaces.',
    requiredSkillIds: ['figma_ui', 'user_research', 'system_design_comm'],
    targetRoleId: 'ui_ux_designer',
    minReadinessScore: 65,
    applyDeadline: 'Active Now',
    link: '#apply-pixelcraft',
    tags: ['Design System', 'User Testing', 'Creative Freedom']
  },
  {
    id: 'opp_sentinel_cyber_intern',
    title: 'Security Operations Center (SOC) Intern',
    company: 'Sentinel Defense Group',
    roleType: 'internship',
    location: 'On-site',
    compensation: '$36 - $42 / hr',
    durationOrType: '12 Weeks',
    description: 'Monitor threat telemetry, analyze vulnerability scans, and assist senior engineers in incident triage and mitigation.',
    requiredSkillIds: ['network_security', 'linux_bash', 'python'],
    targetRoleId: 'cybersecurity_analyst',
    minReadinessScore: 68,
    applyDeadline: 'Open for enrolled students',
    link: '#apply-sentinel',
    tags: ['Clearance Pathway', 'Hands-on Lab', 'Security Certification Sponsor']
  }
];

export const PRESET_STUDENTS: StudentProfile[] = [
  {
    id: 'student_sophomore',
    name: 'Alex Rivera',
    avatar: 'AR',
    education: 'CS Sophomore (University Year 2)',
    targetRoleId: 'fullstack_dev',
    weeklyHours: 12,
    streakDays: 8,
    totalHoursStudied: 38,
    planCreatedDate: '2026-08-20',
    lastActiveDate: 'Today',
    savedOpportunityIds: ['opp_techcorp_swe_intern', 'opp_open_source_capstone'],
    completedModuleIds: ['mod_html_css', 'mod_js_fundamentals', 'mod_git_workflows'],
    skills: {
      'html_css': { level: 2, verified: true, lastPracticed: '3 days ago' },
      'javascript': { level: 2, verified: true, lastPracticed: 'Yesterday' },
      'git': { level: 2, verified: true, lastPracticed: 'Today' },
      'python': { level: 2, verified: true, lastPracticed: '1 week ago' },
      'react': { level: 1, verified: false, lastPracticed: 'In progress' },
      'nodejs': { level: 0, verified: false },
      'sql_databases': { level: 0, verified: false },
      'typescript': { level: 0, verified: false },
      'docker': { level: 0, verified: false },
      'automated_testing': { level: 0, verified: false }
    }
  },
  {
    id: 'student_switcher',
    name: 'Maya Chen',
    avatar: 'MC',
    education: 'Self-Taught Career Switcher',
    targetRoleId: 'fullstack_dev',
    weeklyHours: 18,
    streakDays: 21,
    totalHoursStudied: 84,
    planCreatedDate: '2026-07-10',
    lastActiveDate: 'Today',
    savedOpportunityIds: ['opp_techcorp_swe_intern', 'opp_stride_junior_dev'],
    completedModuleIds: ['mod_html_css', 'mod_js_fundamentals', 'mod_git_workflows', 'mod_react_core', 'mod_typescript_basics'],
    skills: {
      'html_css': { level: 3, verified: true, lastPracticed: '2 days ago' },
      'javascript': { level: 2, verified: true, lastPracticed: 'Today' },
      'react': { level: 2, verified: true, lastPracticed: 'Yesterday' },
      'typescript': { level: 1, verified: true, lastPracticed: '3 days ago' },
      'git': { level: 2, verified: true, lastPracticed: 'Today' },
      'nodejs': { level: 1, verified: false, lastPracticed: 'In progress' },
      'sql_databases': { level: 1, verified: false },
      'docker': { level: 0, verified: false },
      'automated_testing': { level: 1, verified: false }
    }
  },
  {
    id: 'student_data',
    name: 'Liam Patel',
    avatar: 'LP',
    education: 'Statistics & Economics Senior',
    targetRoleId: 'data_analyst_ml',
    weeklyHours: 10,
    streakDays: 14,
    totalHoursStudied: 52,
    planCreatedDate: '2026-08-01',
    lastActiveDate: 'Today',
    savedOpportunityIds: ['opp_finflow_data_intern', 'opp_insight_data_entry'],
    completedModuleIds: ['mod_python_basics', 'mod_sql_core', 'mod_pandas_eda'],
    skills: {
      'python': { level: 2, verified: true, lastPracticed: 'Today' },
      'sql_databases': { level: 2, verified: true, lastPracticed: 'Yesterday' },
      'pandas_numpy': { level: 2, verified: true, lastPracticed: '2 days ago' },
      'data_visualization': { level: 1, verified: false, lastPracticed: 'In progress' },
      'machine_learning': { level: 0, verified: false },
      'git': { level: 1, verified: false }
    }
  },
  {
    id: 'student_blank',
    name: 'New Student Profile',
    avatar: 'NS',
    education: 'Exploring Career Pathways',
    targetRoleId: 'fullstack_dev',
    weeklyHours: 10,
    streakDays: 1,
    totalHoursStudied: 0,
    planCreatedDate: '2026-09-16',
    lastActiveDate: 'Today',
    savedOpportunityIds: [],
    completedModuleIds: [],
    skills: {
      'html_css': { level: 1, verified: false }
    }
  }
];
