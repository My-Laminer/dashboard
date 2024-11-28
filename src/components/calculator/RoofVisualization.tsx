'use client'

interface RoofVisualizationProps {
  width: number
  length: number
  totalRows: number
  totalColumns: number
}

export default function RoofVisualization({
  width,
  length,
  totalRows,
  totalColumns
}: RoofVisualizationProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Vista Previa
      </h2>

      <div className="relative w-full aspect-video bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
        {/* Medidas */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3/4">
          <div className="relative h-8">
            <div className="absolute w-full h-0.5 bg-blue-500" />
            <div className="absolute -left-2 h-2 w-0.5 bg-blue-500" />
            <div className="absolute -right-2 h-2 w-0.5 bg-blue-500" />
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-blue-100 px-2 py-1 rounded-full text-blue-700 text-sm font-medium">
              {width}m
            </div>
          </div>
        </div>

        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 h-3/4">
          <div className="relative w-8 h-full">
            <div className="absolute h-full w-0.5 bg-blue-500" />
            <div className="absolute -top-2 w-2 h-0.5 bg-blue-500" />
            <div className="absolute -bottom-2 w-2 h-0.5 bg-blue-500" />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 -rotate-90 origin-left bg-blue-100 px-2 py-1 rounded-full text-blue-700 text-sm font-medium">
              {length}m
            </div>
          </div>
        </div>

        {/* Grid de láminas */}
        <div className="absolute inset-16 grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${Math.min(totalColumns, 15)}, 1fr)`,
            gridTemplateRows: `repeat(${Math.min(totalRows, 10)}, 1fr)`
          }}>
          {Array.from({ length: Math.min(totalRows * totalColumns, 150) }).map((_, idx) => (
            <div
              key={idx}
              className="bg-red-200 rounded-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-red-300/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}