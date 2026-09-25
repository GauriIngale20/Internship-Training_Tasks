export interface Facility {
  id: number;
  name: string;
  location: string;
  cleanlinessScore: number;
  odorScore: number;
  wasteLevel: number;
  waterAvailability: boolean;
  footfall: number;
  complaints: number;
  inspectionDate: string;
  inspector: string;
  status: 'Inspected' | 'Needs Attention';
}

export interface Inspection {
  id?: number;
  facilityId: number;
  facilityName: string;
  cleanlinessScore: number;
  odorScore: number;
  wasteLevel: number;
  waterAvailability: boolean;
  footfall: number;
  complaints: number;
  inspectionDate: string;
  inspector: string;
  status: 'Inspected' | 'Needs Attention';
}