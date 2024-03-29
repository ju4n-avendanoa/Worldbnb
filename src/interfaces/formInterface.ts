export type FormInputs = {
  title: string;
  address: string;
  description: string;
  extraInfo: string;
  checkIn: number;
  checkOut: number;
  maxGuests: number;
  photos: File[];
  perks: Perk;
  country: string;
  currency: string;
  price: number;
};

export type Perk = {
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
};

export type Files = {
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
};
