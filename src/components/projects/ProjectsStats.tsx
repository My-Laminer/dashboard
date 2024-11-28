'use client'

import { Building2, CheckCircle, Clock, LayoutGrid } from 'lucide-react'
import type { Project } from '@/lib/types'

interface ProjectsStatsProps {
  projects: Project[]
}

export default function ProjectsStats({ projects }: ProjectsStatsProps) {
  const totalArea = projects.reduce((sum, project) => sum + project.area, 0)
  const cotizados = projects.filter(p => p.status === 'cotizado').length
  const pendientes = projects.filter(p => p.status === 'pendiente').length

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <LayoutGrid className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Proyectos</p>
            <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Cotizados</p>
            <p className="text-2xl font-bold text-gray-900">{cotizados}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Pendientes</p>
            <p className="text-2xl font-bold text-gray-900">{pendientes}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Building2 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Área Total</p>
            <p className="text-2xl font-bold text-gray-900">{totalArea.toFixed(0)}m²</p>
          </div>
        </div>
      </div>
    </div>
  )
}