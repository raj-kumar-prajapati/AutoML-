import { useState, useRef } from 'react'
import client, { getSessionId } from '../api/client.js'

export default function UploadStep({ onUploaded, setStatus }) {
  const [dragging, setDragging] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const [data,     setData]     = useState(null)
  const fileRef = useRef()

  async function handleFile(file) {
    if (!file) return

    const MAX_BYTES = 200 * 1024 * 1024 // 200 MB
    const filename = (file.name || '').toLowerCase()
    if (!filename.endsWith('.csv')) {
      setError('Please select a CSV file.'); return
    }
    if (file.size > MAX_BYTES) {
      setError('File too large. Max allowed size is 200 MB.'); return
    }
    setLoading(true); setError(null)
    const form = new FormData()
    form.append('file', file)
    try {
      const sessionId = getSessionId()
      const res = await client.post('/upload-dataset', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Session-ID': sessionId,
        },
      })
      setData(res.data)
      onUploaded(res.data)
      setStatus(s => ({ ...s, has_data: true }))
    } catch (e) {
      const status = e?.response?.status
      const detail = e?.response?.data?.detail
      const data = e?.response?.data
      if (!e?.response) return setError('Upload failed. Backend not reachable or request blocked by network/CORS.')

      if (detail) setError(`Upload failed (HTTP ${status}). ${detail}`)
      else if (typeof data === 'string') setError(`Upload failed (HTTP ${status}). ${data}`)
      else setError(`Upload failed (HTTP ${status}). Please try a different CSV file.`)
    } finally {
      setLoading(false)
    }
  }

  const onDrop = e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }

  return (
    <div>
      <h1 className="page-title">ML Model Comparison Dashboard</h1>
      <p className="page-subtitle">Upload → Preprocess → Train → Predict → Download</p>

      <div className="alert alert-tip">
        💡 <strong>Getting started:</strong> Upload any CSV file to begin. The app auto-detects
        column types, handles missing values, and guides you through the full ML workflow.
        Large datasets (100k+ rows) use smart sampling.
      </div>

      {/* Drop zone */}
      <div
        className={`drop-zone ${dragging ? 'drag-over' : ''}`}
        onClick={() => fileRef.current.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <div className="drop-icon">📂</div>
        <div className="drop-title">Drag &amp; drop your CSV file here</div>
        <div className="drop-sub">or click to browse — max 200 MB</div>
        <input ref={fileRef} type="file" accept=".csv" style={{display:'none'}}
          onChange={e => handleFile(e.target.files[0])} />
      </div>

      {loading && (
        <div className="spinner-wrap">
          <div className="spinner" />
          <span>Loading dataset…</span>
        </div>
      )}
      {error && <div className="alert alert-warning">⚠️ {error}</div>}

      {/* Results */}
      {data && !loading && (
        <>
          <div className="alert alert-success">
            ✅ Dataset loaded — <strong>{data.rows.toLocaleString()}</strong> rows × <strong>{data.cols}</strong> columns
          </div>

          {data.sampling_info?.sampled && (
            <div className="alert alert-warning">
              ⚡ <strong>Large Dataset Detected:</strong> Training will use a representative sample
              of <strong>{data.sampling_info.sample_size.toLocaleString()}</strong> rows
              ({(data.sampling_info.ratio * 100).toFixed(1)}% of full data) for speed.
            </div>
          )}

          <div className="metrics-row metrics-4" style={{marginBottom:'1.5rem'}}>
            <MetricCard label="Rows"       value={data.rows.toLocaleString()} />
            <MetricCard label="Columns"    value={data.cols} />
            <MetricCard label="Numeric"    value={data.numeric_cols} />
            <MetricCard label="Categorical" value={data.categorical_cols} />
          </div>

          {data.missing_total > 0
            ? <div className="alert alert-warning">⚠️ Dataset contains <strong>{data.missing_total.toLocaleString()}</strong> missing values.</div>
            : <div className="alert alert-success">✅ No missing values detected!</div>
          }

          <div className="section-title">📋 Dataset Preview</div>
          <DataTable rows={data.preview} />

          <div className="section-title" style={{marginTop:'1.5rem'}}>📑 Column Information</div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>{['Column','Type','Non-Null','Null','Null %','Unique'].map(h =>
                  <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {data.columns_info.map(c => (
                  <tr key={c.column}>
                    <td><strong>{c.column}</strong></td>
                    <td><code style={{fontSize:'0.78rem',color:'#a78bfa'}}>{c.dtype}</code></td>
                    <td>{c.non_null.toLocaleString()}</td>
                    <td>{c.null}</td>
                    <td>
                      <span className={`badge ${c.null_pct > 0 ? 'badge-amber' : 'badge-green'}`}>
                        {c.null_pct.toFixed(1)}%
                      </span>
                    </td>
                    <td>{c.unique.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

function DataTable({ rows }) {
  if (!rows?.length) return null
  const cols = Object.keys(rows[0])
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{cols.map(c => <td key={c}>{r[c] == null ? <em style={{color:'#555'}}>null</em> : String(r[c])}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
