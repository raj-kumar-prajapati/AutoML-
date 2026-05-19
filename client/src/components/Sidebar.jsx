const NAV_ITEMS = [
  {
    key: 'upload',
    screenKey: 'upload',
    icon: '1',
    symbol: '01',
    label: 'Dataset Upload',
    progressKey: 'has_data',
  },
  {
    key: 'exploration',
    screenKey: 'exploration',
    icon: '2',
    symbol: 'DX',
    label: 'Data Exploration',
  },
  {
    key: 'visualization',
    screenKey: 'visualization',
    icon: '3',
    symbol: 'VZ',
    label: 'Visualization',
  },
  {
    key: 'preprocess',
    screenKey: 'preprocess',
    icon: '4',
    symbol: 'PP',
    label: 'Preprocessing',
    progressKey: 'preprocessing_done',
  },
  {
    key: 'supervised',
    screenKey: 'train',
    icon: '5',
    symbol: 'SM',
    label: 'Supervised Models',
    progressKey: 'supervised_done',
  },
  {
    key: 'unsupervised',
    screenKey: 'unsupervised',
    icon: '6',
    symbol: 'UM',
    label: 'Unsupervised Models',
  },
  {
    key: 'best-model',
    screenKey: 'best-model',
    icon: '7',
    symbol: 'BM',
    label: 'Best Model',
  },
  {
    key: 'predict',
    screenKey: 'predict',
    icon: '8',
    symbol: 'PR',
    label: 'Prediction',
    progressKey: 'has_predictions',
  },
  {
    key: 'download',
    screenKey: 'download',
    icon: '9',
    symbol: 'DL',
    label: 'Download Results',
    progressKey: 'download_ready',
  },
]

const PROGRESS_KEYS = [
  'has_data',
  'preprocessing_done',
  'supervised_done',
  'has_predictions',
  'download_ready',
]

function getProgressCount(status) {
  return PROGRESS_KEYS.reduce((count, key) => count + (status[key] ? 1 : 0), 0)
}

function getCurrentNavKey(currentStep) {
  if (currentStep === 'train') {
    return 'supervised'
  }
  return currentStep
}

function getItemState(item, status, currentNavKey, visitedSteps) {
  const done = item.progressKey ? Boolean(status[item.progressKey]) : visitedSteps.has(item.key)
  const active = currentNavKey === item.key
  return { active, done }
}

function getActiveIndex(currentNavKey) {
  const index = NAV_ITEMS.findIndex(item => item.key === currentNavKey)
  return index >= 0 ? index : 0
}

export default function Sidebar({
  currentStep,
  setStep,
  status,
  visitedSteps,
  uploadData,
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onCloseMobile,
}) {
  const compact = collapsed && !mobileOpen
  const total = PROGRESS_KEYS.length
  const done = getProgressCount(status)
  const pct = Math.round((done / total) * 100)
  const currentNavKey = getCurrentNavKey(currentStep)
  const activeIndex = getActiveIndex(currentNavKey)

  return (
    <>
      <div
        className={`sidebar-backdrop ${mobileOpen ? 'is-visible' : ''}`}
        onClick={onCloseMobile}
      />
      <aside
        className={[
          'sidebar-shell',
          compact ? 'is-collapsed' : '',
          mobileOpen ? 'is-mobile-open' : '',
        ].join(' ').trim()}
      >
        <div className="sidebar-aurora" />

        <div className="sidebar-top">
          <button
            type="button"
            className="sidebar-mobile-close"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
          >
            x
          </button>

          <div className="sidebar-brand-card">
            <div className="sidebar-brand-mark" aria-hidden="true">
              <span className="sidebar-brand-ring" />
              <span className="sidebar-brand-bot">AI</span>
            </div>

            {!compact && (
              <>
                <div className="sidebar-title-wrap">
                  <p className="sidebar-kicker">Neural Ops</p>
                  <h1 className="sidebar-title">ML Dashboard</h1>
                </div>

                <div className="sidebar-progress-card">
                  <div className="sidebar-progress-head">
                    <div>
                      <span className="sidebar-progress-label">Progress</span>
                      <p className="sidebar-progress-copy">{done}/{total} steps done</p>
                    </div>
                    <span className="sidebar-progress-pill">{pct}%</span>
                  </div>

                  <div className="sidebar-progress-track" aria-hidden="true">
                    <div
                      className="sidebar-progress-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {!compact && uploadData && (
            <div className="sidebar-dataset-card">
              <div className="sidebar-dataset-badge">Dataset loaded</div>
              <p className="sidebar-dataset-meta">
                {(uploadData.rows ?? 0).toLocaleString()} rows
              </p>
              <p className="sidebar-dataset-submeta">
                {((uploadData.file_size_mb) ?? 0).toFixed(1)} MB synced
              </p>
            </div>
          )}
        </div>

        <nav className="sidebar-nav" aria-label="ML workflow navigation">
          <div
            className="sidebar-step-line"
            style={{ '--progress-stop': `${((activeIndex + 1) / NAV_ITEMS.length) * 100}%` }}
          />

          {NAV_ITEMS.map((item, index) => {
            const { active, done } = getItemState(item, status, currentNavKey, visitedSteps)
            const className = [
              'sidebar-step',
              active ? 'is-active' : '',
              done ? 'is-done' : '',
              compact ? 'is-icon-only' : '',
            ].join(' ').trim()

            return (
              <button
                key={item.key}
                type="button"
                className={className}
                onClick={() => {
                  setStep(item.screenKey)
                  onCloseMobile()
                }}
                title={item.label}
                style={{ '--step-index': index }}
              >
                <span className="sidebar-step-rail-node" aria-hidden="true">
                  <span className="sidebar-step-rail-core" />
                </span>

                <span className="sidebar-step-icon-wrap" aria-hidden="true">
                  <span className="sidebar-step-icon">{item.icon}</span>
                  <span className="sidebar-step-symbol">{item.symbol}</span>
                </span>

                {!compact && (
                  <>
                    <span className="sidebar-step-copy">
                      <span className="sidebar-step-label">{item.label}</span>
                      <span className="sidebar-step-meta">
                        {active ? 'Active now' : done ? 'Completed' : 'Not visited'}
                      </span>
                    </span>
                    <span className="sidebar-step-state" aria-hidden="true">
                      {active ? 'ACTIVE' : done ? 'DONE' : 'READY'}
                    </span>
                  </>
                )}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          {!compact && (
            <div className="sidebar-profile">
              <div className="sidebar-profile-avatar">SS</div>
              <div>
                <p className="sidebar-profile-name">Raj Prajapati</p>
                <p className="sidebar-profile-role">ML Engineer</p>
              </div>
            </div>
          )}

          <button
            type="button"
            className="sidebar-collapse-toggle"
            onClick={onToggleCollapse}
            aria-label={compact ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {compact ? '>' : '<'}
          </button>
        </div>
      </aside>
    </>
  )
}
