'use client'

import { useEffect, useState } from 'react'
import client, { clearSessionId } from './api/client.js'
import Sidebar from './components/Sidebar.jsx'
import UploadStep from './components/UploadStep.jsx'
import ExploreStep from './components/ExploreStep.jsx'
import VisualizationStep from './components/VisualizationStep.jsx'
import PreprocessStep from './components/PreprocessStep.jsx'
import TrainStep from './components/TrainStep.jsx'
import UnsupervisedStep from './components/UnsupervisedStep.jsx'
import BestModelStep from './components/BestModelStep.jsx'
import PredictStep from './components/PredictStep.jsx'
import DownloadStep from './components/DownloadStep.jsx'

const DEFAULT_STATUS = {
  has_data: false,
  preprocessing_done: false,
  supervised_done: false,
  unsupervised_done: false,
  has_predictions: false,
  download_ready: false,
  best_model_name: null,
  task_type: null,
  target_col: null,
  feature_columns: null,
}

function getStepLabel(step) {
  switch (step) {
    case 'upload':
      return 'Dataset Upload'
    case 'exploration':
      return 'Data Exploration'
    case 'visualization':
      return 'Visualization'
    case 'preprocess':
      return 'Preprocessing'
    case 'train':
      return 'Supervised Models'
    case 'unsupervised':
      return 'Unsupervised Models'
    case 'best-model':
      return 'Best Model'
    case 'predict':
      return 'Prediction'
    case 'download':
      return 'Download Results'
    default:
      return 'Dashboard'
  }
}

export default function App() {
  const [step, setStep] = useState('upload')
  const [status, setStatus] = useState(DEFAULT_STATUS)
  const [visitedSteps, setVisitedSteps] = useState(() => new Set(['upload']))
  const [uploadData, setUploadData] = useState(null)
  const [preprocessData, setPreprocessData] = useState(null)
  const [trainData, setTrainData] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [resetting, setResetting] = useState(false)

  useEffect(() => {
    function syncViewport() {
      const mobile = window.innerWidth <= 900
      setIsMobile(mobile)
      setSidebarCollapsed(mobile)
      setSidebarOpen(false)
    }

    syncViewport()
    window.addEventListener('resize', syncViewport)
    return () => window.removeEventListener('resize', syncViewport)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function hydrateSession() {
      try {
        const statusRes = await client.get('/session-status')
        if (cancelled) {
          return
        }

        const nextStatus = {
          ...DEFAULT_STATUS,
          ...statusRes.data,
        }
        setStatus(nextStatus)

        if (nextStatus.has_data) {
          const dataRes = await client.get('/get-data')
          if (!cancelled) {
            setUploadData(dataRes.data)
          }
        }

        if (nextStatus.preprocessing_done) {
          try {
            const preprocessRes = await client.get('/preprocess-summary')
            if (!cancelled) {
              setPreprocessData(preprocessRes.data)
            }
          } catch {
            if (!cancelled) {
              setPreprocessData({
                task_type: nextStatus.task_type,
                target_col: nextStatus.target_col,
                feature_columns: nextStatus.feature_columns,
              })
            }
          }
        }

        if (nextStatus.supervised_done) {
          setTrainData({
            best_model_name: nextStatus.best_model_name,
            task_type: nextStatus.task_type,
          })
        }
      } catch {
        if (!cancelled) {
          setStatus(DEFAULT_STATUS)
        }
      }
    }

    hydrateSession()
    return () => {
      cancelled = true
    }
  }, [])

  function handleUploaded(data) {
    setUploadData(data)
    setPreprocessData(null)
    setTrainData(null)
    setStatus({
      ...DEFAULT_STATUS,
      has_data: true,
    })
  }

  function handlePreprocessed(data) {
    setPreprocessData(data)
    setTrainData(null)
    setStatus(s => ({
      ...s,
      preprocessing_done: true,
      supervised_done: false,
      unsupervised_done: false,
      has_predictions: false,
      download_ready: false,
      task_type: data.task_type,
      target_col: data.target_col,
      feature_columns: data.feature_columns,
    }))
  }

  function handleTrained(data) {
    setTrainData(data)
    setStatus(s => ({
      ...s,
      supervised_done: true,
      best_model_name: data.best_model_name,
      task_type: data.task_type,
      download_ready: true,
    }))
  }

  function handleStepChange(nextStep) {
    setStep(nextStep)
    setVisitedSteps(prev => {
      const next = new Set(prev)
      next.add(nextStep === 'train' ? 'supervised' : nextStep)
      return next
    })
    if (isMobile) {
      setSidebarOpen(false)
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  async function handleResetWorkflow() {
    setResetting(true)
    try {
      await client.post('/reset-session')
    } catch {
      // If the backend session is already gone, still reset local state.
    } finally {
      clearSessionId()
      setStep('upload')
      setStatus(DEFAULT_STATUS)
      setVisitedSteps(new Set(['upload']))
      setUploadData(null)
      setPreprocessData(null)
      setTrainData(null)
      setSidebarOpen(false)
      setResetting(false)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  function renderStep() {
    switch (step) {
      case 'upload':
        return <UploadStep onUploaded={handleUploaded} setStatus={setStatus} />

      case 'exploration':
        return <ExploreStep />

      case 'visualization':
        return <VisualizationStep />

      case 'preprocess':
        return (
          <PreprocessStep
            uploadData={uploadData}
            onPreprocessed={handlePreprocessed}
            setStatus={setStatus}
          />
        )

      case 'train':
        return (
          <TrainStep
            preprocessData={preprocessData}
            status={status}
            onTrained={handleTrained}
            setStatus={setStatus}
          />
        )

      case 'unsupervised':
        return <UnsupervisedStep status={status} setStatus={setStatus} />

      case 'best-model':
        return <BestModelStep status={status} />

      case 'predict':
        return (
          <PredictStep
            trainData={trainData}
            status={status}
            setStatus={setStatus}
          />
        )

      case 'download':
        return (
          <DownloadStep
            trainData={trainData}
            preprocessData={preprocessData}
            status={status}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="app-layout">
      <Sidebar
        currentStep={step}
        setStep={handleStepChange}
        status={status}
        visitedSteps={visitedSteps}
        uploadData={uploadData}
        collapsed={sidebarCollapsed}
        mobileOpen={sidebarOpen}
        onToggleCollapse={() => {
          if (isMobile) {
            setSidebarOpen(v => !v)
            return
          }
          setSidebarCollapsed(v => !v)
        }}
        onCloseMobile={() => setSidebarOpen(false)}
      />

      <div className="app-main">
        <header className="app-topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="topbar-menu-button"
              onClick={() => setSidebarOpen(v => !v)}
              aria-label="Toggle sidebar"
            >
              <span />
              <span />
              <span />
            </button>

            <div className="topbar-breadcrumb">
              <span className="topbar-breadcrumb-root">Dashboard</span>
              <span className="topbar-breadcrumb-sep">{'>'}</span>
              <span className="topbar-breadcrumb-current">{getStepLabel(step)}</span>
            </div>
          </div>

          <div className="topbar-right">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleResetWorkflow}
              disabled={resetting}
            >
              {resetting ? 'Resetting...' : 'Refresh Workflow'}
            </button>
            <div className="topbar-badge">
              <span className="topbar-badge-dot" />
              API Connected
            </div>
          </div>
        </header>

        <main className="app-content">
          {renderStep()}
        </main>

        <footer className="app-footer">
          ML Dashboard v2.0 | Built by Raj Prajapati
        </footer>
      </div>
    </div>
  )
}
