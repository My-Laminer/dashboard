import { Clock, CheckCircle2, Settings, AlertCircle } from 'lucide-react'
import type { ProjectStatus } from '@/lib/types'

type StatusConfig = {
  [K in ProjectStatus]: {
    label: string;
    color: string;
    icon: any;
    allowedTransitions: ProjectStatus[];
  }
}

export const STATUS_CONFIG: StatusConfig = {
  pendiente: {
    label: 'Pendiente',
    color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    icon: Clock,
    allowedTransitions: ['en_proceso', 'cotizado', 'cancelado']
  },
  en_proceso: {
    label: 'En Proceso',
    color: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    icon: Settings,
    allowedTransitions: ['completado', 'cancelado', 'cotizado']
  },
  cotizado: {
    label: 'Cotizado',
    color: 'bg-green-100 text-green-800 hover:bg-green-200',
    icon: CheckCircle2,
    allowedTransitions: ['en_proceso', 'cancelado', 'completado']
  },
  cancelado: {
    label: 'Cancelado',
    color: 'bg-red-100 text-red-800 hover:bg-red-200',
    icon: AlertCircle,
    allowedTransitions: []
  },
  completado: {
    label: 'Completado',
    color: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    icon: CheckCircle2,
    allowedTransitions: ['en_proceso', 'cancelado']
  }
}