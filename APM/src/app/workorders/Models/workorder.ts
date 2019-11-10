/* Defines the Workorder entity */
export interface Workorder {
  id: number;
  workorderName: string;
  statusCode: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

