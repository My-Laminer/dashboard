'use client'

// import { useState, useEffect } from 'react'
import {useState} from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, AlertCircle } from 'lucide-react'
import BasicInfoForm from '@/components/sheets/BasicInfoForm'
import SpecificationsForm from '@/components/sheets/SpecificationsForm'
import SizesForm from '@/components/sheets/SizesForm'
import { emptySheetForm } from '@/lib/types/sheetTypes'
import type { SheetFormData, SheetSize } from '@/lib/types/sheetTypes'

export default function SheetTypePage() {
  const router = useRouter()
  // const { id } = router.query
  // console.log(id)
  // const isEditing = 'router.query.id !=='
  const isEditing = ''
  const [formData, setFormData] = useState<SheetFormData>(emptySheetForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imagePreview, setImagePreview] = useState<string>('')
  const [saving, setSaving] = useState(false)

  // useEffect(() => {
  //   if (isEditing) {
  //     // Aquí cargarías los datos del tipo de lámina existente
  //     // ... código de carga
  //   }
  // }, [isEditing])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }

    if (!formData.specifications.material) {
      newErrors.material = 'El material es requerido'
    }

    if (formData.sizes.length === 0) {
      newErrors.sizes = 'Debe agregar al menos una medida'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setSaving(true)
    try {
      // Aquí iría la llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/admin/catalog/sheets')
    } catch (error) {
      console.error('Error:', error)
      setErrors({ submit: 'Error al guardar los cambios' })
    } finally {
      setSaving(false)
    }
  }

  const handleBasicInfoChange = (data: Partial<SheetFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const handleSpecificationsChange = (specs: Partial<SheetFormData['specifications']>) => {
    setFormData(prev => ({
      ...prev,
      specifications: { ...prev.specifications, ...specs }
    }))
  }

  const handleAddSize = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, { size: 0, price: 0, status: 'active' }]
    }))
  }

  const handleUpdateSize = (index: number, field: keyof SheetSize, value: any) => {
    const newSizes = [...formData.sizes]
    newSizes[index] = { ...newSizes[index], [field]: value }
    setFormData(prev => ({ ...prev, sizes: newSizes }))
  }

  const handleRemoveSize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }))
  }

  const handleAddColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        colors: [...(prev.specifications.colors || []), color]
      }
    }))
  }

  const handleRemoveColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        colors: prev.specifications.colors?.filter(c => c !== color) || []
      }
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditing ? 'Editar Tipo de Lámina' : 'Nuevo Tipo de Lámina'}
            </h1>
            <p className="text-gray-500 mt-1">
              {isEditing ? 'Modifica los detalles del tipo de lámina' : 'Crea un nuevo tipo de lámina'}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2 ${saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
          >
            <Save className="w-5 h-5" />
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>

      {errors.submit && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {errors.submit}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Información Básica */}
        <BasicInfoForm
          formData={formData}
          imagePreview={imagePreview}
          errors={errors}
          onChange={handleBasicInfoChange}
          onImageChange={setImagePreview}
        />

        {/* Especificaciones */}
        <SpecificationsForm
          formData={formData}
          errors={errors}
          onChange={handleSpecificationsChange}
          onAddColor={handleAddColor}
          onRemoveColor={handleRemoveColor}
        />
      </div>

      {/* Medidas */}
      <div className="mt-8">
        <SizesForm
          sizes={formData.sizes}
          errors={errors}
          onAdd={handleAddSize}
          onUpdate={handleUpdateSize}
          onRemove={handleRemoveSize}
        />
      </div>

      {/* Botones de acción flotantes para móvil */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </form>
  )
}