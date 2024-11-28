'use client'

import { X } from 'lucide-react'
import type { SheetFormData } from '@/lib/types/sheetTypes'
import { useState } from 'react';

interface SpecificationsFormProps {
  formData: SheetFormData;
  errors: Record<string, string>;
  onChange: (specifications: Partial<SheetFormData['specifications']>) => void;
  onAddColor: (color: string) => void;
  onRemoveColor: (color: string) => void;
}

export default function SpecificationsForm({
  formData,
  errors,
  onChange,
  onAddColor,
  onRemoveColor
}: SpecificationsFormProps) {
  const [newColor, setNewColor] = useState('')

  const handleAddColor = () => {
    if (newColor.trim()) {
      onAddColor(newColor.trim())
      setNewColor('')
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="font-medium text-gray-800">Especificaciones</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Material
          </label>
          <input
            type="text"
            value={formData.specifications.material}
            onChange={(e) => onChange({ material: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.material ? 'border-red-300' : 'border-gray-300'
              }`}
          />
          {errors.material && (
            <p className="mt-1 text-sm text-red-600">{errors.material}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grosor (mm)
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.specifications.thickness || ''}
            onChange={(e) => onChange({ thickness: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ancho Estándar (m)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.specifications.width}
            onChange={(e) => onChange({ width: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Garantía (años)
          </label>
          <input
            type="number"
            value={formData.specifications.warranty || ''}
            onChange={(e) => onChange({ warranty: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Colores Disponibles
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.specifications.colors?.map(color => (
            <span
              key={color}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm"
            >
              {color}
              <button
                type="button"
                onClick={() => onRemoveColor(color)}
                className="p-0.5 hover:bg-gray-200 rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            placeholder="Agregar color..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddColor}
            className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}