import { useState } from 'react'
import client from '../api/client.js'

const MISSING_OPTS = [
  'Drop rows with missing values',
  'Fill with mean (numeric)',
  'Fill with median (numeric)',
  'Fill with mode (all)',
]
const ENCODE_OPTS  = ['Label Encoding', 'One-Hot Encoding']
const SCALING_OPTS = ['None', 'StandardScaler', 'MinMaxScaler']

export default function PreprocessStep({ uploadData, onPreprocessed, setStatus }) {
  const columns = uploadData?.all_columns || []
  const hasMissing = (uploadData?.missing_total || 0) > 0
  const isLargeDataset = (uploadData?.rows || 0) >= 150000

  const [targetCol,       setTargetCol]       = useState(columns[columns.length - 1] || '')
  const [taskType,        setTaskType]         = useState('Classification')
  const [missingStrategy, setMissingStrategy]  = useState(MISSING_OPTS[1])
  const [encodeMethod,    setEncodeMethod]     = useState('Label Encoding')
  const [scalingMethod,   setScalingMethod]    = useState('StandardScaler')
  const [testSize,        setTestSize]         = useState(20)
  const [randomState,     setRandomState]      = useState(42)
  const [loading,         setLoading]          = useState(false)
  const [error,           setError]            = useState(null)
  const [result,          setResult]           = useState(null)

  if (!uploadData) return <div className="alert alert-warning">⚠️ Please upload a dataset first.</div>

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      const res = await client.post('/preprocess', {
        target_col:       targetCol,
        task_type:        taskType,
        missing_strategy: hasMissing ? missingStrategy : null,
        encode_method:    encodeMethod,
        scaling_method:   scalingMethod,
        test_size:        testSize / 100,
        random_state:     Number(randomState),
      })
      setResult(res.data)
      onPreprocessed(res.data)
      setStatus(s => ({ ...s, preprocessing_done: true, supervised_done: false }))
    } catch (e) {
      setError(e.response?.data?.detail || 'Preprocessing failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="page-title">Data Preprocessing</h1>
      <hr className="divider" />

      {isLargeDataset && (
        <div className="alert alert-info" style={{ marginBottom: '1rem' }}>
          Large dataset detected. The backend will automatically switch to a memory-safe path for
          preprocessing and training so larger CSVs stay stable.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Target column */}
        <div className="card" style={{marginBottom:'1rem'}}>
          <div className="section-title">🎯 Target Column</div>
          <div className="form-row form-row-2">
            <div className="form-group">
              <label>Target Column</label>
              <select value={targetCol} onChange={e => setTargetCol(e.target.value)}>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Task Type</label>
              <div className="radio-group">
                {['Classification','Regression'].map(t => (
                  <label key={t} className={`radio-option ${taskType===t?'selected':''}`}>
                    <input type="radio" value={t} checked={taskType===t} onChange={() => setTaskType(t)} />
                    {t === 'Classification' ? '🏷️' : '📈'} {t}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Missing values */}
        <div className="card" style={{marginBottom:'1rem'}}>
          <div className="section-title">🩹 Handle Missing Values</div>
          {hasMissing ? (
            <div className="form-group">
              <label>Strategy</label>
              <select value={missingStrategy} onChange={e => setMissingStrategy(e.target.value)}>
                {MISSING_OPTS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ) : (
            <div className="alert alert-success">✅ No missing values — nothing to do.</div>
          )}
        </div>

        {/* Encoding */}
        <div className="card" style={{marginBottom:'1rem'}}>
          <div className="section-title">🔤 Encode Categorical Variables</div>
          {(uploadData?.categorical_cols || 0) > 0 ? (
            <div className="radio-group">
              {ENCODE_OPTS.map(o => (
                <label key={o} className={`radio-option ${encodeMethod===o?'selected':''}`}>
                  <input type="radio" checked={encodeMethod===o} onChange={() => setEncodeMethod(o)} />
                  {o}
                </label>
              ))}
            </div>
          ) : (
            <div className="alert alert-success">✅ No categorical columns detected.</div>
          )}
        </div>

        {/* Scaling */}
        <div className="card" style={{marginBottom:'1rem'}}>
          <div className="section-title">📏 Feature Scaling</div>
          <div className="radio-group">
            {SCALING_OPTS.map(o => (
              <label key={o} className={`radio-option ${scalingMethod===o?'selected':''}`}>
                <input type="radio" checked={scalingMethod===o} onChange={() => setScalingMethod(o)} />
                {o}
              </label>
            ))}
          </div>
        </div>

        {/* Train/test split */}
        <div className="card" style={{marginBottom:'1.5rem'}}>
          <div className="section-title">✂️ Train-Test Split</div>
          <div className="form-row form-row-2">
            <div className="form-group">
              <label>Test Size: {testSize}%</label>
              <input type="range" min={10} max={50} value={testSize}
                onChange={e => setTestSize(Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Random State</label>
              <input type="number" value={randomState} onChange={e => setRandomState(e.target.value)} />
            </div>
          </div>
        </div>

        {error && <div className="alert alert-warning">⚠️ {error}</div>}

        <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
          {loading ? '⏳ Processing…' : '🚀 Apply Preprocessing'}
        </button>
      </form>

      {/* Results */}
      {result && !loading && (
        <>
          <hr className="divider" />
          <div className="alert alert-success">✅ Preprocessing complete!</div>
          {result.encoding_warnings?.map((w, i) => (
            <div key={i} className="alert alert-warning">⚠️ {w}</div>
          ))}
          {result.large_dataset_mode && (
            <div className="alert alert-info">
              Large dataset mode is active. The full dataset stays available in the app, while model
              training uses a bounded training sample for speed and memory safety.
            </div>
          )}
          {result.sampled && (
            <div className="alert alert-info">
              ⚡ Training set sampled: <strong>{result.train_size.toLocaleString()}</strong> rows used.
              Test set: <strong>{result.test_size.toLocaleString()}</strong> rows (full).
            </div>
          )}
          <div className="metrics-row metrics-3" style={{margin:'1rem 0'}}>
            <MetricCard label="Total Samples" value={result.total_size.toLocaleString()} />
            <MetricCard label="Train Samples"  value={result.train_size.toLocaleString()} />
            <MetricCard label="Test Samples"   value={result.test_size.toLocaleString()} />
          </div>
          <div className="section-title">Feature Columns ({result.feature_columns?.length})</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.4rem',marginBottom:'1rem'}}>
            {result.feature_columns?.map(c => (
              <span key={c} className="badge badge-blue">{c}</span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function MetricCard({ label, value }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
    </div>
  )
}
