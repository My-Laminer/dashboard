'use client'

import { useState } from 'react'
import { Package, Plus, Minus, Info } from 'lucide-react'
import { materialsConfig, servicesConfig } from '@/lib/data/quote-config'

interface MaterialsSelectorProps {
  area: number;
  totalSheets: number;
  width: number;
  onMaterialsChange: (materials: any[]) => void;
  onServicesChange: (services: any[]) => void;
}

export default function MaterialsSelector({
  area,
  totalSheets,
  width,
  onMaterialsChange,
  onServicesChange
}: MaterialsSelectorProps) {
  const [selectedMaterials, setSelectedMaterials] = useState(
    materialsConfig.basicMaterials.map(m => ({
      ...m,
      quantity: m.calculateQuantity(totalSheets)
    }))
  )

  const [selectedServices, setSelectedServices] = useState(
    servicesConfig.basicServices.map(s => ({
      ...s,
      price: s.calculatePrice(area)
    }))
  )

  const [showOptionalMaterials, setShowOptionalMaterials] = useState(false)
  const [showOptionalServices, setShowOptionalServices] = useState(false)

  const handleAddMaterial = (material: any) => {
    const quantity = material.calculateQuantity(
      material.id === 'foam' ? width : totalSheets
    )

    setSelectedMaterials([
      ...selectedMaterials,
      { ...material, quantity }
    ])
    onMaterialsChange([
      ...selectedMaterials,
      { ...material, quantity }
    ])
  }

  const handleAddService = (service: any) => {
    const price = service.calculatePrice(area)

    setSelectedServices([
      ...selectedServices,
      { ...service, price }
    ])
    onServicesChange([
      ...selectedServices,
      { ...service, price }
    ])
  }

  return (
    <div className="space-y-6">
      {/* Materiales Básicos */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">
          Materiales Incluidos
        </h3>
        <div className="space-y-2">
          {selectedMaterials.map((material, index) => (
            <div key={material.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{material.name}</p>
                <p className="text-sm text-gray-500">
                  {material.quantity} {material.unit}(s) × ${material.price}
                </p>
              </div>
              <p className="font-semibold">
                ${(material.quantity * material.price).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Materiales Opcionales */}
      <div>
        <button
          onClick={() => setShowOptionalMaterials(!showOptionalMaterials)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          {showOptionalMaterials ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          Materiales Adicionales
        </button>

        {showOptionalMaterials && (
          <div className="mt-3 space-y-2">
            {materialsConfig.optionalMaterials
              .filter(m => !selectedMaterials.find(sm => sm.id === m.id))
              .map(material => (
                <div key={material.id}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">{material.name}</p>
                    <p className="text-sm text-blue-600">
                      ${material.price} por {material.unit}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddMaterial(material)}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  >
                    Agregar
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Servicios Básicos */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">
          Servicios Incluidos
        </h3>
        <div className="space-y-2">
          {selectedServices.map(service => (
            <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{service.name}</p>
                <p className="text-sm text-gray-500">{service.description}</p>
              </div>
              <p className="font-semibold">${service.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Servicios Opcionales */}
      <div>
        <button
          onClick={() => setShowOptionalServices(!showOptionalServices)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          {showOptionalServices ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          Servicios Adicionales
        </button>

        {showOptionalServices && (
          <div className="mt-3 space-y-2">
            {servicesConfig.optionalServices
              .filter(s => !selectedServices.find(ss => ss.id === s.id))
              .map(service => (
                <div key={service.id}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-blue-600">{service.description}</p>
                  </div>
                  <button
                    onClick={() => handleAddService(service)}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  >
                    Agregar
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-700">
            Los materiales y servicios básicos son necesarios para garantizar una instalación
            adecuada. Los elementos adicionales son opcionales y pueden mejorar el resultado
            final según las necesidades específicas del proyecto.
          </p>
        </div>
      </div>
    </div>
  )
}