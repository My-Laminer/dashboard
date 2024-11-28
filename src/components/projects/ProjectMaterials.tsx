'use client'

import { useState } from 'react'
import { Package, Wrench, Save, AlertCircle, Info } from 'lucide-react'
import { materialsConfig, servicesConfig } from '@/lib/data/quote-config'
import type { Project } from '@/lib/types'

interface ProjectMaterialsProps {
  project: Project;
  onSave: (data: any) => void;
}

export default function ProjectMaterials({ project, onSave }: ProjectMaterialsProps) {
  const [activeTab, setActiveTab] = useState('materials') // 'materials' | 'services'
  const [savedMessage, setSavedMessage] = useState(false)

  // Calcular materiales básicos basados en el proyecto
  const basicMaterials = materialsConfig.basicMaterials.map(material => ({
    ...material,
    quantity: material.calculateQuantity(project.totalSheets)
  }))

  const basicServices = servicesConfig.basicServices.map(service => ({
    ...service,
    price: service.calculatePrice(project.area)
  }))

  const showSavedMessage = () => {
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('materials')}
          className={`px-4 py-2 -mb-px font-medium text-sm ${activeTab === 'materials'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Materiales
          </div>
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 -mb-px font-medium text-sm ${activeTab === 'services'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Servicios
          </div>
        </button>
      </div>

      {/* Contenido de Materiales */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          {/* Materiales Básicos */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Materiales Básicos Requeridos
            </h3>
            <div className="grid gap-4">
              {basicMaterials.map(material => (
                <div key={material.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{material.name}</h4>
                      <p className="text-sm text-gray-500">
                        Cantidad calculada: {material.quantity} {material.unit}s
                      </p>
                    </div>
                    <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Requerido
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                    <Info className="w-4 h-4" />
                    Calculado según el área y cantidad de láminas
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Materiales Adicionales */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center justify-between">
              <span>Materiales Adicionales</span>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                + Agregar Material
              </button>
            </h3>
            <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
              Agrega materiales adicionales según las necesidades específicas del proyecto
            </div>
          </div>
        </div>
      )}

      {/* Contenido de Servicios */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          {/* Servicios Básicos */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Servicios Incluidos
            </h3>
            <div className="grid gap-4">
              {basicServices.map(service => (
                <div key={service.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{service.name}</h4>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </div>
                    <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Incluido
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Servicios Opcionales */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center justify-between">
              <span>Servicios Adicionales</span>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                + Agregar Servicio
              </button>
            </h3>
            <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
              Agrega servicios adicionales según los requerimientos del cliente
            </div>
          </div>
        </div>
      )}

      {/* Información y Ayuda */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">¿Cómo se calculan los materiales?</p>
            <p>Los materiales básicos se calculan automáticamente según las dimensiones del proyecto.
              Puedes agregar materiales y servicios adicionales según las necesidades específicas.</p>
          </div>
        </div>
      </div>

      {savedMessage && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center gap-2">
          <Save className="w-5 h-5" />
          Cambios guardados correctamente
        </div>
      )}
    </div>
  )
}