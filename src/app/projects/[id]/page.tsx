'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  FileText,
  Package,
  Info,
  Settings,
  History,
  Clock,
  CheckCircle2,
  AlertCircle,
  Save,
  Building2
} from 'lucide-react'
import ProjectDetails from '@/components/projects/ProjectDetails'
import ProjectMaterials from '@/components/projects/ProjectMaterials'
import StatusHistory from '@/components/projects/StatusHistory'
import StatusChanger from '@/components/projects/StatusChanger'
import { dummyProjects } from '@/lib/data/projects'
import type { Project, StatusEntry } from '@/lib/types'

type TabType = 'details' | 'materials' | 'history';

const STATUS_MAP = {
  pendiente: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  cotizado: { label: 'Cotizado', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  en_proceso: { label: 'En Proceso', color: 'bg-blue-100 text-blue-800', icon: Settings },
  cancelado: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: AlertCircle },
  completado: { label: 'Completado', color: 'bg-purple-100 text-purple-800', icon: CheckCircle2 }
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('details')
  const [project, setProject] = useState<Project | null>(null)
  const [statusHistory, setStatusHistory] = useState<StatusEntry[]>([])
  const [showSaveMessage, setShowSaveMessage] = useState(false)

  useEffect(() => {
    const foundProject = dummyProjects.find(p => p.id === parseInt(params.id))
    if (foundProject) {
      setProject(foundProject)
      // Inicializar historial con el estado actual
      setStatusHistory([{
        status: foundProject.status,
        date: foundProject.date,
        note: 'Proyecto creado'
      }])
    }
  }, [params.id])

  const handleUpdateProject = (updatedData: Partial<Project>) => {
    if (!project) return

    const updatedProject = {
      ...project,
      ...updatedData
    }
    setProject(updatedProject)
    showSaveSuccess()
  }

  const handleSaveMaterials = (materialsData: any) => {
    if (!project) return

    setProject(prev => prev ? {
      ...prev,
      materials: materialsData.materials,
      services: materialsData.services
    } : null)
    showSaveSuccess()
  }

  const handleStatusChange = (newStatus: string, note: string) => {
    if (!project) return

    const updatedProject = {
      ...project,
      status: newStatus
    }
    setProject(updatedProject)

    const historyEntry = {
      status: newStatus,
      date: new Date().toISOString(),
      note
    }
    setStatusHistory(prev => [historyEntry, ...prev])
    showSaveSuccess()
  }

  const showSaveSuccess = () => {
    setShowSaveMessage(true)
    setTimeout(() => setShowSaveMessage(false), 3000)
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Proyecto no encontrado
          </h3>
          <button
            onClick={() => router.push('/projects')}
            className="text-blue-600 hover:text-blue-700"
          >
            Volver a proyectos
          </button>
        </div>
      </div>
    )
  }

  const TabButton = ({ tab, icon: Icon, label }: { tab: TabType; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-4 py-2 -mb-px font-medium text-sm ${activeTab === tab
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 hover:text-gray-700'
        }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )

  const StatusBadge = ({ status }: { status: keyof typeof STATUS_MAP }) => {
    const { label, color, icon: Icon } = STATUS_MAP[status]
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${color}`}>
        <Icon className="w-4 h-4" />
        <span className="font-medium">{label}</span>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-2xl font-bold text-gray-800">
              {project.name}
            </h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-gray-500">
            Cliente: {project.clientName}
          </p>
          <p className="text-gray-500">
            Creado el {new Date(project.date).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => router.push(`/quotes/${project.id}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Generar Cotización
        </button>
      </div>

      {/* Tabs de navegación */}
      <div className="flex border-b mb-6">
        <TabButton tab="details" icon={Info} label="Detalles" />
        <TabButton tab="materials" icon={Package} label="Materiales y Servicios" />
        <TabButton tab="history" icon={History} label="Historial" />
      </div>

      {/* Contenido según el tab activo */}
      <div className="mt-6">
        {activeTab === 'details' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ProjectDetails project={project} onUpdate={handleUpdateProject} />
            </div>
            <div>
              <StatusChanger
                project={project}
                onStatusChange={handleStatusChange}
              />
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <ProjectMaterials
            project={project}
            onSave={handleSaveMaterials}
          />
        )}

        {activeTab === 'history' && (
          <StatusHistory
            projectId={project.id}
            history={statusHistory}
          />
        )}
      </div>

      {/* Mensaje de guardado */}
      {showSaveMessage && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center gap-2 animate-fade-in">
          <Save className="w-5 h-5" />
          Cambios guardados correctamente
        </div>
      )}
    </div>
  )
}