'use client'

import { Clock } from 'lucide-react'
import type { StatusEntry } from '@/lib/types'

interface StatusHistoryProps {
  projectId: number;
}

export default function StatusHistory({ projectId }: StatusHistoryProps) {
  const mockHistory: StatusEntry[] = [
    {
      status: 'pendiente',
      date: new Date().toISOString(),
      note: 'Proyecto creado'
    },
    {
      status: 'en_proceso',
      date: new Date(Date.now() - 86400000).toISOString(),
      note: 'Actualización de medidas'
    }
  ]

  const getStatusColor = (status: string) => {
    const colors = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      en_proceso: 'bg-blue-100 text-blue-800',
      cotizado: 'bg-green-100 text-green-800',
      cancelado: 'bg-red-100 text-red-800',
      completado: 'bg-purple-100 text-purple-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Historial de Cambios
      </h2>

      <div className="relative space-y-6">
        {/* Línea vertical de tiempo */}
        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200" />

        {mockHistory.map((entry, index) => (
          <div key={index} className="flex gap-4 relative">
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-white border-2 border-blue-500 z-10 relative" />
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`px-2 py-1 rounded-full text-sm ${getStatusColor(entry.status)}`}>
                  {entry.status}
                </div>
                <time className="text-sm text-gray-500">
                  {new Date(entry.date).toLocaleString()}
                </time>
              </div>
              {entry.note && (
                <p className="text-gray-600">{entry.note}</p>
              )}
            </div>
          </div>
        ))}

        {mockHistory.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay cambios registrados
          </div>
        )}
      </div>
    </div>
  )
}