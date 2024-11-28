'use client'

import { AlertCircle } from 'lucide-react'

interface SheetSelectorProps {
  selectedSize: number
  onSizeChange: (size: number) => void
  area: number
}

export default function SheetSelector({
  selectedSize,
  onSizeChange,
  area
}: SheetSelectorProps) {
  const availableSizes = [
    7.00, 6.05, 5.60, 5.20, 4.50, 4.05, 3.60, 3.20, 2.44, 2.05, 1.50, 1.10
  ]

  const recommendedSize = (() => {
    if (area <= 15) return 3.20
    if (area <= 25) return 3.60
    if (area <= 40) return 4.50
    if (area <= 60) return 5.20
    if (area <= 80) return 6.05
    return 7.00
  })()

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Tamaño de Lámina
        </h2>
        {selectedSize !== recommendedSize && (
          <span className="text-sm text-yellow-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            Tamaño sugerido: {recommendedSize}m
          </span>
        )}
      </div>

      <select
        value={selectedSize}
        onChange={(e) => onSizeChange(parseFloat(e.target.value))}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${selectedSize !== recommendedSize ? 'border-yellow-400' : 'border-gray-300'
          }`}
      >
        {availableSizes.map((size) => (
          <option key={size} value={size}>
            {size.toFixed(2)} metros {size === recommendedSize ? '(Recomendado)' : ''}
          </option>
        ))}
      </select>
    </div>
  )
}