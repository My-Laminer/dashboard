'use client'

import { Plus, Trash2 } from 'lucide-react'
import type { SheetSize } from '@/lib/types/sheetTypes'

interface SizesFormProps {
  sizes: SheetSize[];
  errors: Record<string, string>;
  onAdd: () => void;
  onUpdate: (index: number, field: keyof SheetSize, value: any) => void;
  onRemove: (index: number) => void;
}

export default function SizesForm({
  sizes,
  errors,
  onAdd,
  onUpdate,
  onRemove
}: SizesFormProps) {
  return (
    <div className="border-t pt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">Medidas Disponibles</h3>
        <button
          type="button"
          onClick={onAdd}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Agregar Medida
        </button>
      </div>

      {errors.sizes && (
        <p className="mb-4 text-sm text-red-600">{errors.sizes}</p>
      )}

      <div className="grid gap-4">
        {sizes.map((size, index) => (
          <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Largo (m)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={size.size}
                  onChange={(e) => onUpdate(index, 'size', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={size.price}
                  onChange={(e) => onUpdate(index, 'price', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  value={size.status}
                  onChange={(e) => onUpdate(index, 'status', e.target.value as 'active' | 'inactive')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}