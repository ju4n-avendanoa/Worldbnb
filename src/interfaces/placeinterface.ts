export interface Perks {
  id: string;
  placeId: string;
  wifi: boolean;
  pet: boolean;
  parking: boolean;
  tv: boolean;
  privateEntrance: boolean;
  kitchen: boolean;
  washer: boolean;
  pool: boolean;
  airConditioner: boolean;
  breakfast: boolean;
  gym: boolean;
  cleaningService: boolean;
}

export interface Place {
  id: string;
  userId: string;
  title: string;
  address: string;
  photos: string[];
  description: string;
  extraInfo: string;
  checkIn: number;
  checkOut: number;
  maxGuests: number;
  perks: Perks;
}
