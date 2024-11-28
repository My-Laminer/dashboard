'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Printer,
  Download,
  Save,
  Building2,
  Calendar,
  Package,
  DollarSign,
  FileText,
  Info,
  Send
} from 'lucide-react'
import MaterialsSelector from '@/components/quotes/MaterialsSelector'
import QuoteSummary from '@/components/quotes/QuoteSummary'
import { dummyProjects } from '@/lib/data/projects'
import { quoteDefaults } from '@/lib/data/quote-config'
import type { Project } from '@/lib/types'

export default function QuotePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [selectedMaterials, setSelectedMaterials] = useState<any[]>([])
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [quoteDetails, setQuoteDetails] = useState({
    notes: '',
    validUntil: new Date(Date.now() + quoteDefaults.validity * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    paymentTerms: quoteDefaults.paymentTerms,
    discount: 0
  })
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)

  useEffect(() => {
    const foundProject = dummyProjects.find(p => p.id === parseInt(params.id))
    if (foundProject) {
      setProject(foundProject)
    }
  }, [params.id])

  if (!project) return null

  const handlePrint = () => {
    window.print()
  }

  const handleSave = () => {
    // Aquí iría la lógica para guardar la cotización
    setShowSaveSuccess(true)
    setTimeout(() => {
      setShowSaveSuccess(false)
    }, 2000)
  }

  const handleSend = () => {
    // Aquí iría la lógica para enviar la cotización por email
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Generar Cotización
            </h1>
            <p className="text-gray-500 mt-1">{project.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Guardar
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Imprimir
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Enviar
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Columna Izquierda - Selección de Materiales y Servicios */}
        <div className="space-y-6">
          {/* Información del Proyecto */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Detalles del Proyecto
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Cliente</p>
                <p className="font-medium">{project.clientName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Área Total</p>
                <p className="font-medium">{project.area.toFixed(2)} m²</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Dimensiones</p>
                <p className="font-medium">{project.width}m × {project.length}m</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Láminas</p>
                <p className="font-medium">{project.totalSheets} unidades</p>
              </div>
            </div>
          </div>

          {/* Selector de Materiales y Servicios */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Materiales y Servicios
            </h2>
            <MaterialsSelector
              area={project.area}
              totalSheets={project.totalSheets}
              width={project.width}
              onMaterialsChange={setSelectedMaterials}
              onServicesChange={setSelectedServices}
            />
          </div>

          {/* Notas y Términos */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Notas y Términos
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas Adicionales
                </label>
                <textarea
                  value={quoteDetails.notes}
                  onChange={(e) => setQuoteDetails(prev => ({
                    ...prev,
                    notes: e.target.value
                  }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Agregar notas o condiciones especiales..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Válido Hasta
                </label>
                <input
                  type="date"
                  value={quoteDetails.validUntil}
                  onChange={(e) => setQuoteDetails(prev => ({
                    ...prev,
                    validUntil: e.target.value
                  }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descuento (%)
                </label>
                <input
                  type="number"
                  value={quoteDetails.discount}
                  onChange={(e) => setQuoteDetails(prev => ({
                    ...prev,
                    discount: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                  }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha - Vista Previa y Resumen */}
        <div className="space-y-6">
          <QuoteSummary
            project={project}
            materials={selectedMaterials}
            services={selectedServices}
            quoteDetails={quoteDetails}
          />
        </div>
      </div>

      {/* Notificación de éxito */}
      {showSaveSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center gap-2 animate-fade-in">
          <FileText className="w-5 h-5" />
          Cotización guardada exitosamente
        </div>
      )}
    </div>
  )
}