'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Building2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Package,
  Tag,
  AlertCircle
} from 'lucide-react'
import type { SheetType } from '@/lib/types/sheetTypes'

// Datos de ejemplo
const mockSheetTypes: SheetType[] = [
  {
    id: 1,
    name: 'Lámina Tipo Teja Clásica',
    description: 'Lámina arquitectónica con apariencia de teja tradicional',
    image: '/images/teja-clasica.jpg',
    status: 'active',
    specifications: {
      material: 'PVC',
      thickness: 2.5,
      width: 0.72,
      colors: ['Terracota', 'Rojo Colonial', 'Café'],
      warranty: 10
    },
    sizes: [
      { id: 1, size: 7.00, price: 850.00, status: 'active' },
      { id: 2, size: 6.05, price: 750.00, status: 'active' },
      { id: 3, size: 5.20, price: 650.00, status: 'active' },
      { id: 4, size: 3.60, price: 450.00, status: 'inactive' }
    ]
  },
  // Más tipos de láminas...
]

export default function SheetCatalogPage() {
  const router = useRouter()
  const [sheetTypes, setSheetTypes] = useState<SheetType[]>(mockSheetTypes)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedType, setExpandedType] = useState<number | null>(null)

  const toggleExpand = (typeId: number) => {
    setExpandedType(expandedType === typeId ? null : typeId)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Catálogo de Láminas
          </h1>
          <p className="text-gray-500 mt-1">
            Gestiona los tipos de láminas y sus medidas disponibles
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/catalog/sheets/new')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuevo Tipo de Lámina
        </button>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="relative col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>
      </div>

      {/* Lista de Tipos de Lámina */}
      <div className="space-y-4">
        {sheetTypes.map(sheetType => (
          <div
            key={sheetType.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Encabezado del tipo de lámina */}
            <div className="p-4 flex items-start justify-between hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleExpand(sheetType.id)}>
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={sheetType.image}
                    alt={sheetType.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{sheetType.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{sheetType.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Package className="w-4 h-4" />
                      {sheetType.specifications?.material}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Tag className="w-4 h-4" />
                      {sheetType.specifications?.width}m ancho
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${sheetType.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                  {sheetType.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Medidas disponibles */}
            {expandedType === sheetType.id && (
              <div className="border-t border-gray-200">
                <div className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-700">Medidas Disponibles</h4>
                    <button
                      className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Agregar Medida
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {sheetType.sizes.map(size => (
                      <div
                        key={size.id}
                        className="bg-white p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-lg font-semibold text-gray-800">
                            {size.size.toFixed(2)}m
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${size.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                            }`}>
                            {size.status === 'active' ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                        <p className="text-gray-600 font-medium">
                          ${size.price.toFixed(2)}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {sheetTypes.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No se encontraron tipos de lámina
          </h3>
          <p className="text-gray-500">
            Comienza agregando un nuevo tipo de lámina al catálogo
          </p>
        </div>
      )}
    </div>
  )
}