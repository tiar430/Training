import type { PlaceHolderImages } from "./placeholder-images";

export type Brand = {
  id: string;
  name: string;
  logo: (typeof PlaceHolderImages)[number]['id'];
};

export const PROGRAM_STATUSES = ['Backlog', 'In Progress', 'Done'] as const;
export type ProgramStatus = (typeof PROGRAM_STATUSES)[number];

export const PROGRAM_TYPES = ['Marketing Campaign', 'Loyalty Program', 'Product Launch', 'Sales Initiative', 'Community Event'] as const;
export type ProgramType = (typeof PROGRAM_TYPES)[number];

export type Program = {
  id: string;
  name: string;
  brandId: string;
  type: ProgramType;
  status: ProgramStatus;
  achievement: number; // percentage 0-100
};
