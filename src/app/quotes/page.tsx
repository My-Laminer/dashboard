'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  FileText,
  Search,
  Filter,
  Download,
  Send,
  Calendar,
  Building2,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react'
import { dummyProjects } from '@/lib/data/projects'
import type { Project } from '@/lib/types'

interface Quote extends Project {
  quoteNumber: string;
  quoteDate: string;
  total: number;
  quoteStatus: 'pending' | 'sent' | 'accepted' | 'rejected';
}

// Convertir proyectos a cotizaciones para demo
const dummyQuotes: Quote[] = dummyProjects.map(project => ({
  ...project,
  quoteNumber: `COT-${Math.floor(Math.random() * 10000)}`,
  quoteDate: new Date(project.date).toISOString(),
  total: project.area * 350 + 5000, // Ejemplo de cálculo
  quoteStatus: ['pending', 'sent', 'accepted', 'rejected'][Math.floor(Math.random() * 4)] as Quote['quoteStatus']
}))

export default function QuotesPage() {
  const router = useRouter()
  const [quotes, setQuotes] = useState<Quote[]>(dummyQuotes)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  const getStatusConfig = (status: string) => {
    const config = {
      pending: {
        label: 'Pendiente',
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock
      },
      sent: {
        label: 'Enviada',
        color: 'bg-blue-100 text-blue-800',
        icon: Send
      },
      accepted: {
        label: 'Aceptada',
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle2
      },
      rejected: {
        label: 'Rechazada',
        color: 'bg-red-100 text-red-800',
        icon: AlertCircle
      }
    }
    return config[status as keyof typeof config]
  }

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch =
      quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || quote.quoteStatus === statusFilter

    const matchesDate = dateFilter === 'all' || (() => {
      const quoteDate = new Date(quote.quoteDate)
      const now = new Date()
      switch (dateFilter) {
        case 'today':
          return quoteDate.toDateString() === now.toDateString()
        case 'week':
          const weekAgo = new Date(now.setDate(now.getDate() - 7))
          return quoteDate >= weekAgo
        case 'month':
          return quoteDate.getMonth() === now.getMonth() &&
            quoteDate.getFullYear() === now.getFullYear()
        default:
          return true
      }
    })()

    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Cotizaciones
          </h1>
          <p className="text-gray-500 mt-1">
            Gestiona y da seguimiento a tus cotizaciones
          </p>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por cliente, proyecto o número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todos los estados</option>
          <option value="pending">Pendientes</option>
          <option value="sent">Enviadas</option>
          <option value="accepted">Aceptadas</option>
          <option value="rejected">Rechazadas</option>
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todas las fechas</option>
          <option value="today">Hoy</option>
          <option value="week">Última semana</option>
          <option value="month">Este mes</option>
        </select>
      </div>

      {/* Lista de Cotizaciones */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid gap-px bg-gray-200">
          {filteredQuotes.map((quote, index) => {
            const statusConfig = getStatusConfig(quote.quoteStatus)
            const StatusIcon = statusConfig.icon

            return (
              <div key={quote.id} className="bg-white p-4 hover:bg-gray-50 transition-colors">
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{quote.quoteNumber}</p>
                        <p className="text-sm text-gray-500">{quote.name}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{quote.clientName}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {new Date(quote.quoteDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-800">
                        ${quote.total.toLocaleString()}
                      </span>
                    </div>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs mt-1 ${statusConfig.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => router.push(`/quotes/${quote.id}`)}
                      className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                    >
                      Ver detalles
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {filteredQuotes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No se encontraron cotizaciones
          </h3>
          <p className="text-gray-500">
            Ajusta los filtros o crea una nueva cotización
          </p>
        </div>
      )}
    </div>
  )
}