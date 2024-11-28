'use client'

import { Building2, Calculator, Calendar, Edit3, Trash2 } from 'lucide-react'
import type { ProjectCardProps } from '@/lib/types'

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800">{project.name}</h3>
        <div className={`px-2 py-1 rounded-full text-xs ${project.status === 'cotizado'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
          }`}>
          {project.status}
        </div>
      </div>

      <div className="text-sm text-gray-500 space-y-2">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          <span>Cliente: {project.clientName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          <span>Área: {project.area}m² - {project.totalSheets} láminas</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(project.date).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        {onEdit && (
          <button
            onClick={() => onEdit(project.id)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4 text-blue-600" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(project.id)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        )}
      </div>
    </div>
  )
}