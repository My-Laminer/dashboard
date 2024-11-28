import React from 'react'
import { FolderOpen } from 'lucide-react'

export default function NoProjects() {
  return (

    < div className="text-center py-12" >
      <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">
        No hay proyectos guardados
      </h3>
      <p className="text-gray-500">
        Comienza creando un nuevo cálculo de tejado
      </p>
    </ div>

  )
}
