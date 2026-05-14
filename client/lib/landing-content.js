export const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Testimonials', href: '#testimonials' },
]

export const heroStats = [
  { value: '18 min', label: 'To first production-grade model' },
  { value: '92%', label: 'Faster experimentation cycles' },
  { value: '4.8x', label: 'More experiments per analyst' },
]

export const trustedBy = ['Northstar Health', 'Atlas Cloud', 'PulseOps', 'Synapse Labs', 'Nexa Capital']

export const featureCards = [
  {
    icon: 'spark',
    title: 'Auto Training',
    description:
      'Launch parallel experiments, tuning jobs, and validation runs without hand-crafting every pipeline.',
    metric: '400+ runs/day',
  },
  {
    icon: 'layers',
    title: 'Feature Engineering',
    description:
      'Automatically encode, transform, score, and rank features with explainable recommendations.',
    metric: 'Zero manual prep',
  },
  {
    icon: 'brain',
    title: 'Model Selection',
    description:
      'Compare gradient boosting, tree ensembles, linear baselines, and neural candidates in one workspace.',
    metric: 'Best-fit ranking',
  },
  {
    icon: 'rocket',
    title: 'Deployment',
    description:
      'Ship winning models to APIs, batch jobs, or monitoring pipelines with approval gates and rollback safety.',
    metric: 'One-click release',
  },
]

export const demoScenarios = [
  {
    id: 'classification',
    label: 'Classification',
    eyebrow: 'Fraud detection launch',
    title: 'Move from uploaded CSV to a monitored classifier in one session.',
    summary:
      'ModelForge profiles the data, engineers higher-signal features, and benchmarks top candidate models automatically.',
    kpis: [
      { label: 'Validation AUC', value: '0.982' },
      { label: 'Best Model', value: 'CatBoost' },
      { label: 'Deployment Time', value: '12 min' },
    ],
    chart: [42, 58, 71, 76, 84, 91, 98],
    modules: [
      'Schema inference and drift checks',
      'Auto-generated feature transformations',
      'Champion/challenger leaderboard',
    ],
  },
  {
    id: 'forecasting',
    label: 'Forecasting',
    eyebrow: 'Demand planning workflow',
    title: 'Build time-series models with less spreadsheet work and more confidence.',
    summary:
      'From holiday effects to lag windows, the platform proposes and validates forecasting features so teams can focus on strategy.',
    kpis: [
      { label: 'MAPE', value: '4.2%' },
      { label: 'Forecast Horizon', value: '90 days' },
      { label: 'Scenario Plans', value: '8' },
    ],
    chart: [35, 40, 38, 49, 56, 62, 69],
    modules: [
      'Lag, trend, and seasonality generation',
      'Backtesting across rolling windows',
      'Business-ready confidence intervals',
    ],
  },
  {
    id: 'deployment',
    label: 'Deployment',
    eyebrow: 'Revenue scoring pipeline',
    title: 'Promote the best model to production with guardrails built in.',
    summary:
      'Approval workflows, version snapshots, and monitoring hooks keep production ML shipping fast without giving up control.',
    kpis: [
      { label: 'Release Risk', value: 'Low' },
      { label: 'Latency', value: '84 ms' },
      { label: 'Rollback SLA', value: '<1 min' },
    ],
    chart: [28, 44, 51, 63, 74, 81, 89],
    modules: [
      'Canary release and rollback controls',
      'Prediction logging and lineage',
      'Monitoring-ready API bundles',
    ],
  },
]

export const workflowSteps = [
  {
    number: '01',
    title: 'Upload Data',
    description: 'Drop in CSVs, warehouse extracts, or feature tables and let the platform profile them instantly.',
  },
  {
    number: '02',
    title: 'Train',
    description: 'Run AutoML jobs that tune hyperparameters, engineer features, and benchmark multiple model families.',
  },
  {
    number: '03',
    title: 'Evaluate',
    description: 'Review explainability, performance lift, calibration, and validation traces inside one shared workspace.',
  },
  {
    number: '04',
    title: 'Deploy',
    description: 'Ship to APIs or scheduled pipelines with approvals, version history, and monitoring hooks already attached.',
  },
]

export const comparisonRows = [
  {
    label: 'Time to first model',
    traditional: '2 to 4 weeks',
    modelforge: '18 minutes',
  },
  {
    label: 'Feature engineering',
    traditional: 'Manual notebooks and ad hoc scripts',
    modelforge: 'Automated suggestions with traceability',
  },
  {
    label: 'Model comparison',
    traditional: 'Spreadsheet-driven',
    modelforge: 'Live leaderboard with confidence checks',
  },
  {
    label: 'Deployment handoff',
    traditional: 'Separate engineering request',
    modelforge: 'Built-in release workflows',
  },
]

export const advantageMetrics = [
  {
    title: 'Faster decisions',
    description: 'Executives see measurable performance gains before the first sprint ends.',
  },
  {
    title: 'Safer automation',
    description: 'Every transformation, metric, and deployment artifact is preserved for auditability.',
  },
  {
    title: 'Better accuracy',
    description: 'Automated search and validation loops surface stronger models than default manual baselines.',
  },
]

export const testimonials = [
  {
    quote:
      'ModelForge turned our model review cycle from a monthly bottleneck into a daily habit. The team now ships experiments with confidence.',
    name: 'Priya Raman',
    role: 'Head of Data, Northstar Health',
    avatar: '/avatars/priya.svg',
  },
  {
    quote:
      'The product feels like Stripe-level polish applied to machine learning. It gave analysts and engineers a shared language overnight.',
    name: 'Daniel Sato',
    role: 'VP Product, Atlas Cloud',
    avatar: '/avatars/daniel.svg',
  },
  {
    quote:
      'We replaced brittle notebooks, manual comparisons, and handoff chaos with one system that actually feels production-ready.',
    name: 'Amara Okafor',
    role: 'ML Platform Lead, PulseOps',
    avatar: '/avatars/amara.svg',
  },
]

export const footerColumns = [
  {
    title: 'Platform',
    links: [
      { label: 'Auto Training', href: '#features' },
      { label: 'Model Selection', href: '#why-us' },
      { label: 'Deployment', href: '#demo' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Live Demo', href: '#demo' },
      { label: 'Workflow', href: '#workflow' },
      { label: 'Testimonials', href: '#testimonials' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Launch Dashboard', href: '/app' },
      { label: 'Get Started', href: '/app' },
      { label: 'Contact Sales', href: 'mailto:hello@modelforge.ai' },
    ],
  },
]

export const socialLinks = [
  { label: 'X', href: '#', icon: 'twitter' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'GitHub', href: '#', icon: 'github' },
]
