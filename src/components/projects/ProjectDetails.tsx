'use client'

import { useState } from 'react'
import { Building2, Ruler, Package, Calendar } from 'lucide-react'
import type { Project } from '@/lib/types'

interface ProjectDetailsProps {
  project: Project;
  onUpdate: (data: Partial<Project>) => void;
}

export default function ProjectDetails({ project, onUpdate }: ProjectDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: project.name,
    clientName: project.clientName,
    width: project.width,
    length: project.length,
  })

  const handleSave = () => {
    onUpdate(formData)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cliente
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ancho (metros)
              </label>
              <input
                type="number"
                value={formData.width}
                onChange={(e) => setFormData(prev => ({ ...prev, width: parseFloat(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Largo (metros)
              </label>
              <input
                type="number"
                value={formData.length}
                onChange={(e) => setFormData(prev => ({ ...prev, length: parseFloat(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Información del Proyecto
        </h2>
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Editar
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cliente</p>
              <p className="font-medium">{project.clientName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Ruler className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Dimensiones</p>
              <p className="font-medium">{project.width}m × {project.length}m ({project.area}m²)</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Láminas</p>
              <p className="font-medium">{project.totalSheets} unidades de {project.selectedSize}m</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de Creación</p>
              <p className="font-medium">{new Date(project.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}