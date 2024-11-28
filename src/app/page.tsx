'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Calculator,
  FolderOpen,
  PlusCircle,
  TrendingUp,
  Building2,
  CheckCircle2,
  Clock,
  Clipboard,
  ChartBar,
  ArrowUpRight
} from 'lucide-react'
import { dummyProjects } from '@/lib/data/projects'
import type { Project } from '@/lib/types'

export default function Dashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalArea: 0,
    recentActivity: []
  })

  useEffect(() => {
    // Calcular estadísticas desde los proyectos
    const totalProjects = dummyProjects.length
    const activeProjects = dummyProjects.filter(p => ['pendiente', 'en_proceso'].includes(p.status)).length
    const completedProjects = dummyProjects.filter(p => p.status === 'completado').length
    const totalArea = dummyProjects.reduce((sum, p) => sum + p.area, 0)

    setStats({
      totalProjects,
      activeProjects,
      completedProjects,
      totalArea,
      recentActivity: dummyProjects.slice(0, 3)
    })
  }, [])

  const QuickAction = ({ icon: Icon, title, description, onClick, color }: any) => (
    <button
      onClick={onClick}
      className={`flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 group`}
    >
      <div className={`p-3 ${color} rounded-lg group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-left">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      </div>
    </button>
  )

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Panel de Control
          </h1>
          <p className="text-gray-500 mt-1">
            Resumen y actividad reciente
          </p>
        </div>
        <button
          onClick={() => router.push('/calculator')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Nuevo Proyecto
        </button>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-blue-600 font-medium">Total Proyectos</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.totalProjects}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-sm text-yellow-600 font-medium">Proyectos Activos</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.activeProjects}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">Completados</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.completedProjects}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ChartBar className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-purple-600 font-medium">Área Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.totalArea.toFixed(0)}m²</p>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <QuickAction
          icon={Calculator}
          title="Nueva Calculadora"
          description="Inicia un nuevo cálculo de tejado"
          onClick={() => router.push('/calculator')}
          color="bg-blue-600"
        />
        <QuickAction
          icon={FolderOpen}
          title="Gestionar Proyectos"
          description="Ver y administrar todos los proyectos"
          onClick={() => router.push('/projects')}
          color="bg-purple-600"
        />
        <QuickAction
          icon={Clipboard}
          title="Cotizaciones Pendientes"
          description="Revisa y genera cotizaciones"
          onClick={() => router.push('/quotes')}
          color="bg-green-600"
        />
      </div>

      {/* Métricas Detalladas */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Métricas de Proyectos */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Métricas de Proyectos</h2>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Proyectos Pequeños</span>
                <span className="font-semibold text-gray-800">
                  {dummyProjects.filter(p => p.area < 50).length}
                </span>
              </div>
              <div className="text-sm text-gray-500">Menos de 50m²</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Proyectos Medianos</span>
                <span className="font-semibold text-gray-800">
                  {dummyProjects.filter(p => p.area >= 50 && p.area < 200).length}
                </span>
              </div>
              <div className="text-sm text-gray-500">50m² - 200m²</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Proyectos Grandes</span>
                <span className="font-semibold text-gray-800">
                  {dummyProjects.filter(p => p.area >= 200).length}
                </span>
              </div>
              <div className="text-sm text-gray-500">Más de 200m²</div>
            </div>
          </div>
        </div>

        {/* Métricas de Materiales */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Materiales</h2>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Total Láminas</span>
                <span className="font-semibold text-gray-800">
                  {dummyProjects.reduce((sum, p) => sum + p.totalSheets, 0)} unidades
                </span>
              </div>
              <div className="text-sm text-gray-500">En todos los proyectos</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Tamaño más usado</span>
                <span className="font-semibold text-gray-800">
                  {(() => {
                    const sizes = dummyProjects.map(p => p.selectedSize);
                    const mostCommon = sizes.sort((a, b) =>
                      sizes.filter(v => v === a).length - sizes.filter(v => v === b).length
                    ).pop();
                    return `${mostCommon}m`;
                  })()}
                </span>
              </div>
              <div className="text-sm text-gray-500">Lámina más frecuente</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Promedio por proyecto</span>
                <span className="font-semibold text-gray-800">
                  {Math.round(dummyProjects.reduce((sum, p) => sum + p.totalSheets, 0) / dummyProjects.length)} láminas
                </span>
              </div>
              <div className="text-sm text-gray-500">Media de láminas usadas</div>
            </div>
          </div>
        </div>

        {/* Métricas de Estado */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Estado de Cotizaciones</h2>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Pendientes de Cotizar</span>
                <span className="font-semibold text-gray-800">
                  {dummyProjects.filter(p => p.status === 'pendiente').length}
                </span>
              </div>
              <div className="text-sm text-gray-500">Requieren atención</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">En Proceso</span>
                <span className="font-semibold text-gray-800">
                  {dummyProjects.filter(p => p.status === 'en_proceso').length}
                </span>
              </div>
              <div className="text-sm text-gray-500">Instalaciones activas</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Tasa de Conversión</span>
                <span className="font-semibold text-gray-800">
                  {Math.round((dummyProjects.filter(p => p.status === 'completado').length / dummyProjects.length) * 100)}%
                </span>
              </div>
              <div className="text-sm text-gray-500">Proyectos completados</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}