import type { Project } from '../types'

export const dummyProjects: Project[] = [
  {
    id: 1,
    name: "Casa Residencial Los Pinos",
    clientName: "Juan Pérez Gómez",
    width: 12.5,
    length: 8.3,
    selectedSize: 7.00,
    totalSheets: 24,
    totalRows: 4,
    totalColumns: 6,
    area: 103.75,
    date: "2024-11-25",
    status: "cotizado"
  },
  {
    id: 2,
    name: "Bodega Industrial Norte",
    clientName: "Industrias XYZ",
    width: 25,
    length: 18,
    selectedSize: 7.00,
    totalSheets: 96,
    totalRows: 8,
    totalColumns: 12,
    area: 450,
    date: "2024-11-26",
    status: "pendiente"
  },
  {
    id: 3,
    name: "Cochera Doble",
    clientName: "María Sánchez",
    width: 6,
    length: 5,
    selectedSize: 3.60,
    totalSheets: 12,
    totalRows: 3,
    totalColumns: 4,
    area: 30,
    date: "2024-11-26",
    status: "cotizado"
  },
  {
    id: 4,
    name: "Almacén Central",
    clientName: "Distribuidora ABC",
    width: 15,
    length: 12,
    selectedSize: 6.05,
    totalSheets: 48,
    totalRows: 6,
    totalColumns: 8,
    area: 180,
    date: "2024-11-27",
    status: "pendiente"
  },
  {
    id: 5,
    name: "Terraza Familiar",
    clientName: "Roberto Díaz",
    width: 4,
    length: 3,
    selectedSize: 3.20,
    totalSheets: 6,
    totalRows: 2,
    totalColumns: 3,
    area: 12,
    date: "2024-11-27",
    status: "cotizado"
  },
  {
    id: 6,
    name: "Nave Industrial Este",
    clientName: "Manufacturas del Valle",
    width: 30,
    length: 20,
    selectedSize: 7.00,
    totalSheets: 120,
    totalRows: 10,
    totalColumns: 12,
    area: 600,
    date: "2024-11-28",
    status: "pendiente"
  }
]

export const recentProjects = dummyProjects.slice(0, 3)