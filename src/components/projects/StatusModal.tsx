'use client'

import { ArrowRight, X, Save } from 'lucide-react'
import type { Project, ProjectStatus } from '@/lib/types'
import { STATUS_CONFIG } from '@/lib/config/statusConfig'

interface StatusModalProps {
  project: Project;
  selectedStatus: ProjectStatus;
  note: string;
  setNote: (note: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export default function StatusModal({
  project,
  selectedStatus,
  note,
  setNote,
  onClose,
  onConfirm
}: StatusModalProps) {
  const CurrentIcon = STATUS_CONFIG[project.status].icon
  const NewIcon = STATUS_CONFIG[selectedStatus].icon

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Cambiar Estado
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${STATUS_CONFIG[project.status].color}`}>
              <CurrentIcon className="w-5 h-5" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <div className={`p-2 rounded-lg ${STATUS_CONFIG[selectedStatus].color}`}>
              <NewIcon className="w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nota de cambio
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Describe el motivo del cambio..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              disabled={!note.trim()}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${note.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              <Save className="w-4 h-4" />
              Confirmar Cambio
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}