'use client'

interface DimensionsInputProps {
  width: number
  length: number
  onWidthChange: (width: number) => void
  onLengthChange: (length: number) => void
}

export default function DimensionsInput({
  width,
  length,
  onWidthChange,
  onLengthChange
}: DimensionsInputProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Dimensiones del Tejado
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Ancho (metros)
          </label>
          <div className="relative">
            <input
              type="number"
              value={width}
              onChange={(e) => onWidthChange(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-2 text-gray-400">m</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Largo (metros)
          </label>
          <div className="relative">
            <input
              type="number"
              value={length}
              onChange={(e) => onLengthChange(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-2 text-gray-400">m</span>
          </div>
        </div>
      </div>
    </div>
  )
}