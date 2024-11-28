'use client'

import { Info } from 'lucide-react'
import type { Project } from '@/lib/types'
import { quoteDefaults } from '@/lib/data/quote-config'

interface QuoteSummaryProps {
  project: Project
  materials: any[]
  services: any[]
  quoteDetails: {
    notes: string
    validUntil: string
    paymentTerms: {
      advance: number
      completion: number
    }
    discount: number
  }
}

export default function QuoteSummary({
  project,
  materials,
  services,
  quoteDetails
}: QuoteSummaryProps) {
  const calculateSubtotal = () => {
    const materialsTotal = materials.reduce(
      (sum, material) => sum + (material.quantity * material.price),
      0
    )
    const servicesTotal = services.reduce(
      (sum, service) => sum + service.price,
      0
    )
    return materialsTotal + servicesTotal
  }

  const subtotal = calculateSubtotal()
  const discount = subtotal * (quoteDetails.discount / 100)
  const subtotalWithDiscount = subtotal - discount
  const iva = subtotalWithDiscount * (quoteDefaults.taxes.iva / 100)
  const total = subtotalWithDiscount + iva

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Resumen de Cotización
      </h2>

      {/* Materiales */}
      <div className="space-y-3 mb-6">
        <h3 className="font-medium text-gray-700">Materiales</h3>
        {materials.map((material, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {material.name} ({material.quantity} {material.unit}s)
            </span>
            <span className="font-medium">
              ${(material.quantity * material.price).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Servicios */}
      <div className="space-y-3 mb-6">
        <h3 className="font-medium text-gray-700">Servicios</h3>
        {services.map((service, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">{service.name}</span>
            <span className="font-medium">${service.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Totales */}
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        {quoteDetails.discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Descuento ({quoteDetails.discount}%)</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">IVA ({quoteDefaults.taxes.iva}%)</span>
          <span className="font-medium">${iva.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-800 border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Términos de Pago */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Términos de Pago</h3>
        <div className="space-y-1 text-sm text-blue-600">
          <p>• Anticipo: {quoteDetails.paymentTerms.advance}% (${(total * quoteDetails.paymentTerms.advance / 100).toFixed(2)})</p>
          <p>• Resto: {quoteDetails.paymentTerms.completion}% al finalizar (${(total * quoteDetails.paymentTerms.completion / 100).toFixed(2)})</p>
        </div>
      </div>

      {/* Notas */}
      {quoteDetails.notes && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Notas</h3>
          <p className="text-sm text-gray-600">{quoteDetails.notes}</p>
        </div>
      )}

      <div className="mt-6 flex items-start gap-2 text-sm text-gray-500">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          Esta cotización es válida hasta el {new Date(quoteDetails.validUntil).toLocaleDateString()}.
          Los precios incluyen IVA y están sujetos a cambios sin previo aviso.
        </p>
      </div>
    </div>
  )
}