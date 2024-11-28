'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DimensionsInput from '@/components/calculator/DimensionsInput'
import SheetSelector from '@/components/calculator/SheetSelector'
import ResultsDisplay from '@/components/calculator/ResultsDisplay'
import RoofVisualization from '@/components/calculator/RoofVisualization'
import { ArrowLeft, Save } from 'lucide-react'
import type { Project } from '@/lib/types'

export default function CalculatorPage() {
  const router = useRouter()
  const [projectName, setProjectName] = useState('')
  const [clientName, setClientName] = useState('')
  const [width, setWidth] = useState(5)
  const [length, setLength] = useState(5)
  const [selectedSize, setSelectedSize] = useState(7.0)
  const [overlap, setOverlap] = useState(0.10)

  const area = width * length
  const sheetWidth = 0.72
  const effectiveLength = selectedSize - overlap
  const effectiveWidth = sheetWidth - 0.02

  const totalColumns = Math.ceil(width / effectiveWidth)
  const totalRows = Math.ceil(length / effectiveLength)
  const totalSheets = totalColumns * totalRows

  const handleSave = () => {
    const project: Project = {
      id: Date.now(),
      name: projectName,
      clientName,
      width,
      length,
      selectedSize,
      totalSheets,
      totalRows,
      totalColumns,
      area,
      date: new Date().toISOString(),
      status: 'pendiente'
    }

    // Aquí irá la lógica para guardar el proyecto
    router.push('/')
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push('/')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          Calculadora de Tejado
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Nombre del proyecto"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <DimensionsInput
            width={width}
            length={length}
            onWidthChange={setWidth}
            onLengthChange={setLength}
          />

          <SheetSelector
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
            area={area}
          />

          <ResultsDisplay
            area={area}
            totalSheets={totalSheets}
            totalRows={totalRows}
            totalColumns={totalColumns}
          />

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={!projectName || !clientName}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${projectName && clientName
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              <Save className="w-5 h-5" />
              Guardar Proyecto
            </button>
          </div>
        </div>

        <RoofVisualization
          width={width}
          length={length}
          totalRows={totalRows}
          totalColumns={totalColumns}
        />
      </div>
    </div>
  )
}