'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2 } from 'lucide-react'
import ProjectsHeader from '@/components/projects/ProjectsHeader'
import ProjectsFilters from '@/components/projects/ProjectsFilters'
import ProjectsStats from '@/components/projects/ProjectsStats'
import ProjectCard from '@/components/ProjectCard'
import { dummyProjects } from '@/lib/data/projects'
import type { Project } from '@/lib/types'

export default function ProjectsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [sortBy, setSortBy] = useState('date-desc')
  const [dateFilter, setDateFilter] = useState('all')
  const [showStats, setShowStats] = useState(true)
  const [projects, setProjects] = useState<Project[]>(dummyProjects)

  // Función para filtrar proyectos
  const getFilteredProjects = () => {
    let filtered = [...projects]

    // Filtro de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.clientName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtro de estado
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(project => project.status === statusFilter)
    }

    // Filtro de fecha
    const now = new Date()
    switch (dateFilter) {
      case 'today':
        filtered = filtered.filter(project =>
          new Date(project.date).toDateString() === now.toDateString()
        )
        break
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7))
        filtered = filtered.filter(project =>
          new Date(project.date) >= weekAgo
        )
        break
      case 'month':
        filtered = filtered.filter(project =>
          new Date(project.date).getMonth() === now.getMonth() &&
          new Date(project.date).getFullYear() === now.getFullYear()
        )
        break
      case 'year':
        filtered = filtered.filter(project =>
          new Date(project.date).getFullYear() === now.getFullYear()
        )
        break
    }

    // Ordenamiento
    switch (sortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'area-desc':
        filtered.sort((a, b) => b.area - a.area)
        break
      case 'area-asc':
        filtered.sort((a, b) => a.area - b.area)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return filtered
  }

  const filteredProjects = getFilteredProjects()

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ProjectsHeader
        totalProjects={projects.length}
        onBack={() => router.push('/')}
        onNewProject={() => router.push('/calculator')}
        onToggleStats={() => setShowStats(!showStats)}
      />

      {showStats && <ProjectsStats projects={projects} />}

      <ProjectsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
      />

      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={(id) => router.push(`/projects/${id}`)}
              onDelete={(id) => {
                setProjects(projects.filter(p => p.id !== id))
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No se encontraron proyectos
          </h3>
          <p className="text-gray-500">
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      )}
    </div>
  )
}