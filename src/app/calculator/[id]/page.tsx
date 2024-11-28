'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Save,
  AlertCircle,
  Building2
} from 'lucide-react'
import DimensionsInput from '@/components/calculator/DimensionsInput'
import SheetSelector from '@/components/calculator/SheetSelector'
import ResultsDisplay from '@/components/calculator/ResultsDisplay'
import RoofVisualization from '@/components/calculator/RoofVisualization'
import { dummyProjects } from '@/lib/data/projects'
import type { Project } from '@/lib/types'

export default function CalculatorPage({ params }: { params: { id?: string[] } }) {
  const router = useRouter()
  const isEditing = params?.id?.[0]

  const [projectData, setProjectData] = useState({
    projectName: '',
    clientName: '',
    width: 5,
    length: 5,
    selectedSize: 7.0,
    overlap: 0.10,
  })

  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    if (isEditing) {
      // Cargar datos del proyecto existente
      const project = dummyProjects.find(p => p.id === parseInt(isEditing))
      if (project) {
        setProjectData({
          projectName: project.name,
          clientName: project.clientName,
          width: project.width,
          length: project.length,
          selectedSize: project.selectedSize,
          overlap: 0.10,
        })
      }
    }
  }, [isEditing])

  // Cálculos derivados
  const area = projectData.width * projectData.length
  const sheetWidth = 0.72
  const effectiveLength = projectData.selectedSize - projectData.overlap
  const effectiveWidth = sheetWidth - 0.02

  const totalColumns = Math.ceil(projectData.width / effectiveWidth)
  const totalRows = Math.ceil(projectData.length / effectiveLength)
  const totalSheets = totalColumns * totalRows

  const handleSave = () => {
    const newProject: Partial<Project> = {
      name: projectData.projectName,
      clientName: projectData.clientName,
      width: projectData.width,
      length: projectData.length,
      selectedSize: projectData.selectedSize,
      totalSheets,
      totalRows,
      totalColumns,
      area,
      date: new Date().toISOString(),
      status: 'pendiente'
    }

    if (isEditing) {
      // Lógica para actualizar proyecto existente
      // Aquí iría la actualización en tu backend
      router.push(`/projects/${isEditing}`)
    } else {
      // Lógica para crear nuevo proyecto
      // Aquí iría la creación en tu backend
      setShowConfirmation(true)
      setTimeout(() => {
        router.push('/projects')
      }, 2000)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Editar Proyecto' : 'Nuevo Cálculo'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEditing ? 'Modificar medidas y materiales' : 'Crear nuevo proyecto'}
          </p>
        </div>
      </div>

      {/* Información del Proyecto */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Nombre del Proyecto
          </label>
          <input
            type="text"
            value={projectData.projectName}
            onChange={(e) => setProjectData(prev => ({
              ...prev,
              projectName: e.target.value
            }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Casa Principal"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Cliente
          </label>
          <input
            type="text"
            value={projectData.clientName}
            onChange={(e) => setProjectData(prev => ({
              ...prev,
              clientName: e.target.value
            }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del cliente"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <DimensionsInput
            width={projectData.width}
            length={projectData.length}
            onWidthChange={(width) => setProjectData(prev => ({ ...prev, width }))}
            onLengthChange={(length) => setProjectData(prev => ({ ...prev, length }))}
          />

          <SheetSelector
            selectedSize={projectData.selectedSize}
            onSizeChange={(selectedSize) => setProjectData(prev => ({ ...prev, selectedSize }))}
            area={area}
          />

          <ResultsDisplay
            area={area}
            totalSheets={totalSheets}
            totalRows={totalRows}
            totalColumns={totalColumns}
          />

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={!projectData.projectName || !projectData.clientName}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${projectData.projectName && projectData.clientName
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              <Save className="w-5 h-5" />
              {isEditing ? 'Guardar Cambios' : 'Crear Proyecto'}
            </button>
          </div>

          {!isEditing && (
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Al guardar, se creará un nuevo proyecto que podrás gestionar y cotizar.</span>
            </div>
          )}
        </div>

        <RoofVisualization
          width={projectData.width}
          length={projectData.length}
          totalRows={totalRows}
          totalColumns={totalColumns}
        />
      </div>

      {/* Notificación de confirmación */}
      {showConfirmation && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center gap-2 animate-fade-in">
          <Building2 className="w-5 h-5" />
          Proyecto creado exitosamente
        </div>
      )}
    </div>
  )
}