'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Clock, FileText, Calculator, History } from 'lucide-react'
import { dummyProjects } from '@/lib/data/projects'
import type { Project } from '@/lib/types'

interface ActivityEntry {
  id: number;
  projectId: number;
  projectName: string;
  type: 'creation' | 'modification' | 'quote';
  date: string;
  details: string;
}

export default function RecentActivitiesPage() {
  const router = useRouter()
  const [recentProjects, setRecentProjects] = useState<Project[]>([])
  const [recentActivity, setRecentActivity] = useState<ActivityEntry[]>([])

  useEffect(() => {
    // Obtener los últimos 5 proyectos
    const latest = [...dummyProjects]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)

    setRecentProjects(latest)

    // Generar actividad reciente simulada
    const activities: ActivityEntry[] = [
      ...latest.map(project => ({
        id: Date.now() + project.id,
        projectId: project.id,
        projectName: project.name,
        type: 'creation' as const,
        date: project.date,
        details: 'Proyecto creado'
      })),
      // Agregar algunas cotizaciones simuladas
      {
        id: Date.now() + 1000,
        projectId: latest[0]?.id || 0,
        projectName: latest[0]?.name || '',
        type: 'quote' as const,
        date: new Date().toISOString(),
        details: 'Cotización generada'
      },
      {
        id: Date.now() + 1001,
        projectId: latest[1]?.id || 0,
        projectName: latest[1]?.name || '',
        type: 'modification' as const,
        date: new Date(Date.now() - 86400000).toISOString(),
        details: 'Medidas actualizadas'
      }
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    setRecentActivity(activities)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'creation':
        return Calculator
      case 'modification':
        return History
      case 'quote':
        return FileText
      default:
        return Clock
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'creation':
        return 'text-blue-600 bg-blue-100'
      case 'modification':
        return 'text-yellow-600 bg-yellow-100'
      case 'quote':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push('/')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Actividad Reciente
          </h1>
          <p className="text-gray-500 mt-1">
            Últimas actualizaciones y cambios
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Proyectos Recientes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Últimos Proyectos
          </h2>
          <div className="space-y-4">
            {recentProjects.map(project => (
              <div
                key={project.id}
                className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                <div>
                  <h3 className="font-medium text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-500">
                    {project.width}m × {project.length}m • {project.totalSheets} láminas
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(project.date).toLocaleDateString()}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${project.status === 'cotizado'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {project.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Línea de Tiempo de Actividad */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Línea de Tiempo
          </h2>
          <div className="space-y-6">
            {recentActivity.map(activity => {
              const Icon = getActivityIcon(activity.type)
              const colorClass = getActivityColor(activity.type)

              return (
                <div key={activity.id} className="flex gap-4">
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.projectName}</p>
                    <p className="text-gray-600">{activity.details}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(activity.date).toLocaleDateString()} - {new Date(activity.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    onClick={() => router.push(`/projects/${activity.projectId}`)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Ver detalles
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}