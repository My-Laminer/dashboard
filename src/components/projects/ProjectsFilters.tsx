'use client'

import { Filter, SortAsc, Calendar } from 'lucide-react'

interface ProjectsFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (status: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  dateFilter: string
  onDateFilterChange: (date: string) => void
}

export default function ProjectsFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  dateFilter,
  onDateFilterChange
}: ProjectsFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-wrap gap-4">
        {/* Búsqueda */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtro de Estado */}
        <div className="w-48">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="todos">Todos los estados</option>
            <option value="pendiente">Pendientes</option>
            <option value="cotizado">Cotizados</option>
          </select>
        </div>

        {/* Ordenamiento */}
        <div className="w-48">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="date-desc">Más recientes</option>
            <option value="date-asc">Más antiguos</option>
            <option value="area-desc">Mayor área</option>
            <option value="area-asc">Menor área</option>
            <option value="name">Nombre</option>
          </select>
        </div>

        {/* Filtro de Fecha */}
        <div className="w-48">
          <select
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas las fechas</option>
            <option value="today">Hoy</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="year">Este año</option>
          </select>
        </div>
      </div>
    </div>
  )
}