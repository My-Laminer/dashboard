export interface SheetSize {
  id?: number;
  size: number;
  price: number;
  status: 'active' | 'inactive';
  stock?: number;
  minimumOrder?: number;
}

export interface SheetType {
  id: number;
  name: string;
  description: string;
  image: string;
  status: 'active' | 'inactive';
  specifications: {
    material: string;
    thickness?: number;
    width: number;
    colors?: string[];
    warranty?: number;
  };
  sizes: SheetSize[];
}

export interface SheetFormData extends Omit<SheetType, 'id'> {
  sizes: Omit<SheetSize, 'id'>[];
}

export const emptySheetForm: SheetFormData = {
  name: '',
  description: '',
  image: '',
  status: 'active',
  specifications: {
    material: '',
    thickness: 0,
    width: 0.72,
    colors: [],
    warranty: 0
  },
  sizes: []
}