'use client'

interface ResultsDisplayProps {
  area: number
  totalSheets: number
  totalRows: number
  totalColumns: number
}

export default function ResultsDisplay({
  area,
  totalSheets,
  totalRows,
  totalColumns
}: ResultsDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-blue-900 mb-4">
        Resultados
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <div className="text-sm text-blue-600">Área Total</div>
          <div className="text-2xl font-bold text-blue-900">
            {area.toFixed(2)}m²
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <div className="text-sm text-blue-600">Láminas</div>
          <div className="text-2xl font-bold text-blue-900">
            {totalSheets}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <div className="text-sm text-blue-600">Filas</div>
          <div className="text-xl font-bold text-blue-900">
            {totalRows}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <div className="text-sm text-blue-600">Columnas</div>
          <div className="text-xl font-bold text-blue-900">
            {totalColumns}
          </div>
        </div>
      </div>
    </div>
  )
}