'use client'

import { Upload, X } from 'lucide-react'
import type { SheetFormData } from '@/lib/types/sheetTypes'

interface BasicInfoFormProps {
  formData: SheetFormData;
  imagePreview: string;
  errors: Record<string, string>;
  onChange: (data: Partial<SheetFormData>) => void;
  onImageChange: (image: string) => void;
}

export default function BasicInfoForm({
  formData,
  imagePreview,
  errors,
  onChange,
  onImageChange
}: BasicInfoFormProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // Manejar error de tamaño
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        onImageChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Tipo de Lámina
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-300' : 'border-gray-300'
            }`}
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estado
        </label>
        <select
          value={formData.status}
          onChange={(e) => onChange({ status: e.target.value as 'active' | 'inactive' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagen de Referencia
        </label>
        <div className="flex items-center gap-4">
          {imagePreview ? (
            <div className="relative w-32 h-32">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => onImageChange('')}
                className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <label className="cursor-pointer text-center p-4">
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <span className="text-sm text-gray-500">Subir imagen</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
        </div>
        {errors.image && (
          <p className="mt-1 text-sm text-red-600">{errors.image}</p>
        )}
      </div>
    </div>
  )
}