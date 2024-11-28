export const materialsConfig = {
  basicMaterials: [
    {
      id: 'screws',
      name: 'Tornillos especiales',
      price: 2.5,
      unit: 'pieza',
      calculateQuantity: (totalSheets: number) => totalSheets * 6,
      required: true
    },
    {
      id: 'caps',
      name: 'Capuchones',
      price: 1.5,
      unit: 'pieza',
      calculateQuantity: (totalSheets: number) => totalSheets * 6,
      required: true
    },
    {
      id: 'sealant',
      name: 'Sellador (tubo)',
      price: 120,
      unit: 'tubo',
      calculateQuantity: (totalSheets: number) => Math.ceil(totalSheets / 10),
      required: true
    }
  ],
  optionalMaterials: [
    {
      id: 'tape',
      name: 'Cinta selladora',
      price: 85,
      unit: 'rollo',
      calculateQuantity: (totalSheets: number) => Math.ceil(totalSheets / 15),
      required: false
    },
    {
      id: 'foam',
      name: 'Espuma selladora',
      price: 45,
      unit: 'metro',
      calculateQuantity: (width: number) => Math.ceil(width * 2),
      required: false
    }
  ]
}

export const servicesConfig = {
  basicServices: [
    {
      id: 'installation',
      name: 'Instalación básica',
      description: 'Incluye mano de obra y equipo básico',
      calculatePrice: (area: number) => area * 100,
      required: true
    }
  ],
  optionalServices: [
    {
      id: 'reinforcement',
      name: 'Refuerzo estructural',
      description: 'Instalación de soportes adicionales',
      calculatePrice: (area: number) => area * 50,
      required: false
    },
    {
      id: 'waterproofing',
      name: 'Impermeabilización adicional',
      description: 'Tratamiento especial para mayor protección',
      calculatePrice: (area: number) => area * 75,
      required: false
    },
    {
      id: 'cleanup',
      name: 'Limpieza y retiro de escombros',
      description: 'Limpieza completa del área de trabajo',
      calculatePrice: (area: number) => 1500,
      required: false
    }
  ]
}

export const quoteDefaults = {
  validity: 15,
  paymentTerms: {
    advance: 50,
    completion: 50
  },
  taxes: {
    iva: 16
  }
}