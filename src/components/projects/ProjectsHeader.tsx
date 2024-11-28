'use client'

import { ArrowLeft, PlusCircle, BarChart2 } from 'lucide-react'
import type { Project } from '@/lib/types'

interface ProjectsHeaderProps {
  totalProjects: number
  onBack: () => void
  onNewProject: () => void
  onToggleStats: () => void
}

export default function ProjectsHeader({
  totalProjects,
  onBack,
  onNewProject,
  onToggleStats
}: ProjectsHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <button
        onClick={onBack}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-800">
          Mis Proyectos
        </h1>
        <p className="text-gray-500 mt-1">
          {totalProjects} proyectos totales
        </p>
      </div>
      <button
        onClick={onToggleStats}
        className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
      >
        <BarChart2 className="w-5 h-5" />
        Estadísticas
      </button>
      <button
        onClick={onNewProject}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <PlusCircle className="w-5 h-5" />
        Nuevo Proyecto
      </button>
    </div>
  )
}