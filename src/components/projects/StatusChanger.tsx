'use client'

import { useState } from 'react'
import StatusModal from './StatusModal'
import { STATUS_CONFIG } from '@/lib/config/statusConfig'
import type { Project, ProjectStatus } from '@/lib/types'

interface StatusChangerProps {
  project: Project;
  onStatusChange: (newStatus: ProjectStatus, note: string) => void;
}

export default function StatusChanger({ project, onStatusChange }: StatusChangerProps) {
  const [showModal, setShowModal] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | ''>('')
  const [note, setNote] = useState('')

  const handleStatusClick = (status: ProjectStatus) => {
    setSelectedStatus(status)
    setShowModal(true)
  }

  const handleConfirm = () => {
    if (selectedStatus && note.trim()) {
      onStatusChange(selectedStatus, note)
      setShowModal(false)
      setNote('')
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Estado del Proyecto
      </h2>

      <div className="grid gap-2">
        {(Object.entries(STATUS_CONFIG) as [ProjectStatus, typeof STATUS_CONFIG[ProjectStatus]][]).map(([status, config]) => {
          const isCurrentStatus = status === project.status
          const isAllowed = STATUS_CONFIG[project.status].allowedTransitions.includes(status)
          const StatusIcon = config.icon

          if (!isCurrentStatus && !isAllowed) return null

          return (
            <button
              key={status}
              onClick={() => isAllowed && handleStatusClick(status)}
              disabled={!isAllowed && !isCurrentStatus}
              className={`
                w-full flex items-center gap-3 p-3 rounded-lg transition-colors
                ${isCurrentStatus ? `${config.color} font-medium` : ''}
                ${!isCurrentStatus && isAllowed ? 'hover:bg-gray-50' : ''}
                ${!isAllowed && !isCurrentStatus ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <StatusIcon className="w-5 h-5" />
              <span>{config.label}</span>
              {isCurrentStatus && (
                <span className="ml-auto text-sm bg-white bg-opacity-50 px-2 py-1 rounded-full">
                  Actual
                </span>
              )}
            </button>
          )
        })}
      </div>

      {showModal && selectedStatus && (
        <StatusModal
          project={project}
          selectedStatus={selectedStatus}
          note={note}
          setNote={setNote}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  )
}