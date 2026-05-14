import { useEffect, useState } from 'react'
import client from '../api/client.js'
import PlotFigure from './PlotFigure.jsx'

export default function ExploreStep() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categoricalColumn, setCategoricalColumn] = useState('')
  const [targetColumn, setTargetColumn] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadExploration() {
      setLoading(true)
      setError(null)
      try {
        const res = await client.get('/explore-data', {
          params: {
            categorical_column: categoricalColumn || undefined,
            target_column: targetColumn || undefined,
          },
        })
        if (!cancelled) {
          setData(res.data)
          if (!categoricalColumn && res.data.categorical_column) {
            setCategoricalColumn(res.data.categorical_column)
          }
          if (!targetColumn && res.data.target_column) {
            setTargetColumn(res.data.target_column)
          }
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.response?.data?.detail || 'Failed to load exploration data.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadExploration()
    return () => {
      cancelled = true
    }
  }, [categoricalColumn, targetColumn])

  if (loading) {
    return <div className="spinner-wrap"><div className="spinner" /><span>Loading exploration data...</span></div>
  }

  if (error) {
    return <div className="alert alert-warning">{error}</div>
  }

  const summaryColumns = data?.summary?.length ? Object.keys(data.summary[0]) : []
  const outlierColumns = data?.outlier_info?.length ? Object.keys(data.outlier_info[0]) : []

  return (
    <div>
      <h1 className="page-title">Data Exploration</h1>
      <p className="page-subtitle">Statistical summaries, outlier analysis, and distribution checks powered by the backend dataset session.</p>

      <div className="metrics-row metrics-4" style={{ marginBottom: '1.5rem' }}>
        <MetricCard label="Rows" value={data.dataset.rows.toLocaleString()} />
        <MetricCard label="Columns" value={data.dataset.cols} />
        <MetricCard label="Numeric" value={data.dataset.numeric_cols} />
        <MetricCard label="Categorical" value={data.dataset.categorical_cols} />
      </div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="section-title">Statistical Summary</div>
        <DataTable rows={data.summary} columns={summaryColumns} />
      </div>

      <div className="form-row form-row-2" style={{ marginBottom: '1rem' }}>
        <div className="card">
          <div className="section-title">Categorical Analysis</div>
          {data.categorical_columns.length > 0 ? (
            <>
              <div className="form-group">
                <label>Select a categorical column</label>
                <select value={categoricalColumn} onChange={e => setCategoricalColumn(e.target.value)}>
                  {data.categorical_columns.map(column => (
                    <option key={column} value={column}>{column}</option>
                  ))}
                </select>
              </div>
              <div className="plot-shell">
                <PlotFigure figure={data.categorical_chart} style={{ height: 360 }} />
              </div>
            </>
          ) : (
            <div className="alert alert-info">No categorical columns available.</div>
          )}
        </div>

        <div className="card">
          <div className="section-title">Target Distribution</div>
          <div className="form-group">
            <label>Select potential target column</label>
            <select value={targetColumn} onChange={e => setTargetColumn(e.target.value)}>
              {data.dataset.all_columns.map(column => (
                <option key={column} value={column}>{column}</option>
              ))}
            </select>
          </div>
          <div className="plot-shell">
            <PlotFigure figure={data.target_chart} style={{ height: 360 }} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-title">Outlier Detection</div>
        {data.used_sample_for_outliers && (
          <div className="alert alert-info">Outlier detection was computed on a 50,000-row sample for speed.</div>
        )}
        <DataTable rows={data.outlier_info} columns={outlierColumns} />
      </div>
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

function DataTable({ rows, columns }) {
  if (!rows?.length || !columns?.length) {
    return <div className="alert alert-info">No data available.</div>
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{columns.map(column => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column}>{row[column] == null || row[column] === '' ? '-' : String(row[column])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
