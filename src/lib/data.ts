import { Brand, Program, IncentiveStatus } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

let brands: Brand[] = [
  { id: 'brand-1', name: 'Samsung', logo: PlaceHolderImages[0].id },
  { id: 'brand-2', name: 'Apple', logo: PlaceHolderImages[1].id },
  { id: 'brand-3', name: 'Xiaomi', logo: PlaceHolderImages[2].id },
  { id: 'brand-4', name: 'Oppo', logo: PlaceHolderImages[3].id },
  { id: 'brand-5', name: 'Vivo', logo: PlaceHolderImages[4].id },
];

let programs: Program[] = [
  { id: 'prog-1', name: 'Q3 Global Launch', brandId: 'brand-1', type: 'Product Launch', status: 'In Progress', achievement: 75, startDate: '2024-07-01', endDate: '2024-09-30', rewardType: 'percentage', rewardValue: 5 },
  { id: 'prog-2', name: 'Green Earth Campaign', brandId: 'brand-2', type: 'Marketing Campaign', status: 'Done', achievement: 100, startDate: '2024-04-01', endDate: '2024-06-30', rewardType: 'number', rewardValue: 500000, incentiveStatus: 'Paid' },
  { id: 'prog-3', name: 'Summer Collection Promo', brandId: 'brand-3', type: 'Sales Initiative', status: 'In Progress', achievement: 40, startDate: '2024-06-01', endDate: '2024-08-31', rewardType: 'percentage', rewardValue: 10 },
  { id: 'prog-4', name: 'Community Marathon', brandId: 'brand-4', type: 'Community Event', status: 'Done', achievement: 100, startDate: '2024-05-15', endDate: '2024-05-15', rewardType: 'number', rewardValue: 1000000, incentiveStatus: 'Processing' },
  { id: 'prog-5', name: 'Loyalty Rewards Overhaul', brandId: 'brand-1', type: 'Loyalty Program', status: 'Backlog', achievement: 10, startDate: '2024-10-01', endDate: '2024-12-31', rewardType: 'percentage', rewardValue: 2 },
  { id: 'prog-6', name: 'Recycle & Win', brandId: 'brand-2', type: 'Marketing Campaign', status: 'Backlog', achievement: 0, startDate: '2025-01-01', endDate: '2025-03-31', rewardType: 'number', rewardValue: 250000 },
  { id: 'prog-7', name: 'Fall Fashion Week', brandId: 'brand-3', type: 'Community Event', status: 'In Progress', achievement: 90, startDate: '2024-09-01', endDate: '2024-09-07', rewardType: 'percentage', rewardValue: 8 },
  { id: 'prog-8', name: 'Championship Sponsorship', brandId: 'brand-4', type: 'Marketing Campaign', status: 'Done', achievement: 95, startDate: '2024-07-20', endDate: '2024-08-20', rewardType: 'number', rewardValue: 750000, incentiveStatus: 'Pending' },
  { id: 'prog-9', name: 'Back to School Fun', brandId: 'brand-5', type: 'Sales Initiative', status: 'In Progress', achievement: 50, startDate: '2024-07-01', endDate: '2024-07-31', rewardType: 'percentage', rewardValue: 15 },
  { id: 'prog-10', name: 'New Smart Toy', brandId: 'brand-5', type: 'Product Launch', status: 'Backlog', achievement: 20, startDate: '2024-11-01', endDate: '2025-01-31', rewardType: 'number', rewardValue: 100000 },
];

// Simulate API calls
export const getBrands = async (): Promise<Brand[]> => {
  return Promise.resolve(brands);
};

export const getPrograms = async (): Promise<Program[]> => {
    return Promise.resolve(programs);
};

export const getBrandById = async (id: string): Promise<Brand | undefined> => {
    return Promise.resolve(brands.find(b => b.id === id));
}

export const addBrand = async (brand: Omit<Brand, 'id'>): Promise<Brand> => {
    const newBrand = { ...brand, id: `brand-${Date.now()}`};
    brands.push(newBrand);
    return Promise.resolve(newBrand);
}

export const updateBrand = async (id: string, data: Partial<Brand>): Promise<Brand | undefined> => {
    let brandToUpdate = brands.find(b => b.id === id);
    if(brandToUpdate) {
        brandToUpdate = { ...brandToUpdate, ...data };
        brands = brands.map(b => b.id === id ? brandToUpdate! : b);
        return Promise.resolve(brandToUpdate);
    }
    return Promise.resolve(undefined);
}

export const deleteBrand = async (id: string): Promise<boolean> => {
    const initialLength = brands.length;
    brands = brands.filter(b => b.id !== id);
    // also delete programs associated with the brand
    programs = programs.filter(p => p.brandId !== id);
    return Promise.resolve(brands.length < initialLength);
}

export const addProgram = async (program: Omit<Program, 'id'>): Promise<Program> => {
    const newProgram = { ...program, id: `prog-${Date.now()}`};
    programs.push(newProgram);
    return Promise.resolve(newProgram);
}

export const updateProgram = async (id: string, data: Partial<Program>): Promise<Program | undefined> => {
    let programToUpdate = programs.find(p => p.id === id);
    if(programToUpdate) {
        programToUpdate = { ...programToUpdate, ...data };
        programs = programs.map(p => p.id === id ? programToUpdate! : p);
        return Promise.resolve(programToUpdate);
    }
    return Promise.resolve(undefined);
}

export const deleteProgram = async (id: string): Promise<boolean> => {
    const initialLength = programs.length;
    programs = programs.filter(p => p.id !== id);
    return Promise.resolve(programs.length < initialLength);
}
