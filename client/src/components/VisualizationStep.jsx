import { useEffect, useState } from 'react'
import client from '../api/client.js'
import PlotFigure from './PlotFigure.jsx'

const VIS_TYPES = [
  'Correlation Heatmap',
  'Feature Distributions',
  'Pair Plot',
  'Histogram',
  'Scatter Plot',
  'Box Plot',
]

export default function VisualizationStep() {
  const [dataset, setDataset] = useState(null)
  const [figureData, setFigureData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [vizType, setVizType] = useState(VIS_TYPES[0])
  const [selectedColumns, setSelectedColumns] = useState([])
  const [column, setColumn] = useState('')
  const [xColumn, setXColumn] = useState('')
  const [yColumn, setYColumn] = useState('')
  const [colorColumn, setColorColumn] = useState('')
  const [groupColumn, setGroupColumn] = useState('')
  const [bins, setBins] = useState(30)

  useEffect(() => {
    let cancelled = false

    async function hydrateDataset() {
      try {
        const res = await client.get('/get-data')
        if (!cancelled) {
          setDataset(res.data)
          const numeric = getNumericColumns(res.data)
          setSelectedColumns(numeric.slice(0, Math.min(4, numeric.length)))
          setColumn(res.data.all_columns[0] || '')
          setXColumn(res.data.all_columns[0] || '')
          setYColumn(res.data.all_columns[1] || res.data.all_columns[0] || '')
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.response?.data?.detail || 'Failed to load dataset metadata.')
          setLoading(false)
        }
      }
    }

    hydrateDataset()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!dataset) {
      return
    }

    let cancelled = false

    async function loadFigure() {
      setLoading(true)
      setError(null)
      try {
        const res = await client.post('/visualize', {
          viz_type: vizType,
          selected_columns: selectedColumns,
          color_column: colorColumn || null,
          x_column: xColumn || null,
          y_column: yColumn || null,
          column: column || null,
          bins,
          group_column: groupColumn || null,
        })
        if (!cancelled) {
          setFigureData(res.data)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.response?.data?.detail || 'Failed to render visualization.')
          setFigureData(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadFigure()
    return () => {
      cancelled = true
    }
  }, [dataset, vizType, selectedColumns, colorColumn, xColumn, yColumn, column, bins, groupColumn])

  if (!dataset && loading) {
    return <div className="spinner-wrap"><div className="spinner" /><span>Loading visualization controls...</span></div>
  }

  if (error && !dataset) {
    return <div className="alert alert-warning">{error}</div>
  }

  const numericColumns = getNumericColumns(dataset)
  const allColumns = dataset?.all_columns || []

  return (
    <div>
      <h1 className="page-title">Visualization</h1>
      <p className="page-subtitle">Interactive Plotly charts rendered from backend figure JSON so visualizations stay in sync with the shared dataset session.</p>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="form-row form-row-3">
          <div className="form-group">
            <label>Select visualization</label>
            <select value={vizType} onChange={e => setVizType(e.target.value)}>
              {VIS_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          {(vizType === 'Histogram' || vizType === 'Box Plot') && (
            <div className="form-group">
              <label>{vizType === 'Histogram' ? 'Column' : 'Numeric column'}</label>
              <select value={column} onChange={e => setColumn(e.target.value)}>
                {(vizType === 'Box Plot' ? numericColumns : allColumns).map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
          )}

          {vizType === 'Histogram' && (
            <div className="form-group">
              <label>Bins: {bins}</label>
              <input type="range" min={10} max={100} value={bins} onChange={e => setBins(Number(e.target.value))} />
            </div>
          )}

          {vizType === 'Scatter Plot' && (
            <>
              <div className="form-group">
                <label>X axis</label>
                <select value={xColumn} onChange={e => setXColumn(e.target.value)}>
                  {allColumns.map(value => <option key={value} value={value}>{value}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Y axis</label>
                <select value={yColumn} onChange={e => setYColumn(e.target.value)}>
                  {allColumns.map(value => <option key={value} value={value}>{value}</option>)}
                </select>
              </div>
            </>
          )}

          {(vizType === 'Pair Plot' || vizType === 'Feature Distributions') && (
            <div className="form-group form-group-span-2">
              <label>Select numeric columns</label>
              <select
                multiple
                value={selectedColumns}
                onChange={e => setSelectedColumns(Array.from(e.target.selectedOptions, option => option.value))}
                className="multi-select"
              >
                {numericColumns.map(value => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>
          )}

          {(vizType === 'Scatter Plot' || vizType === 'Pair Plot') && (
            <div className="form-group">
              <label>Color by</label>
              <select value={colorColumn} onChange={e => setColorColumn(e.target.value)}>
                <option value="">None</option>
                {allColumns.map(value => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>
          )}

          {vizType === 'Box Plot' && (
            <div className="form-group">
              <label>Group by</label>
              <select value={groupColumn} onChange={e => setGroupColumn(e.target.value)}>
                <option value="">None</option>
                {allColumns.map(value => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>
          )}
        </div>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}
      {figureData?.note && <div className="alert alert-info">{figureData.note}</div>}

      <div className="card plot-card">
        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /><span>Rendering chart...</span></div>
        ) : (
          <PlotFigure figure={figureData?.figure} style={{ height: 620 }} />
        )}
      </div>
    </div>
  )
}

function getNumericColumns(dataset) {
  return (dataset?.columns_info || [])
    .filter(column => /int|float|double|number/i.test(column.dtype))
    .map(column => column.column)
}
