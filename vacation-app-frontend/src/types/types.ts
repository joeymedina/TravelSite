export interface TripImage {
  id: string;
  url: string;
  caption: string;
  tripId: string;
}

export interface Trip {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  story: string;
  images: TripImage[];
}
