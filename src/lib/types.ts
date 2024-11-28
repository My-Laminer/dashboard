export type ProjectStatus = 'pendiente' | 'cotizado' | 'en_proceso' | 'cancelado' | 'completado';

export interface Project {
  id: number;
  name: string;
  clientName: string;
  width: number;
  length: number;
  selectedSize: number;
  totalSheets: number;
  totalRows: number;
  totalColumns: number;
  area: number;
  date: string;
  status: 'pendiente' | 'cotizado' | 'en_proceso' | 'cancelado' | 'completado';
  materials?: ProjectMaterial[];
  services?: ProjectService[];
}

export interface ProjectMaterial {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  required: boolean;
}

export interface ProjectService {
  id: string;
  name: string;
  description: string;
  price: number;
  required: boolean;
}

export interface StatusEntry {
  status: string;
  date: string;
  note?: string;
}