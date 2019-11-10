/* Defines the Workorder entity */
export interface Workorder {
  id: number;
  workorderNumber: string;
  statusCode: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

