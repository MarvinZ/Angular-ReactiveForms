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

export interface WorkorderDetail {
  id: number;
  workorderNumber: string;
  alternateWorkorderNumber: string;
  locationId: string;
  statusCodeId: string;
  priorityId: string;
  createdDate: string;
  updatedDate: string;
  targetDate?: string;
  workTypeId: string;
  requestTypeId: string;
  requestCodeId: string;
  vendorId?: string;
  DNE: number;
  comments?: WoComment[];
  assets?: Asset[];
}


export interface WorkorderSimple {
  id: number;
  workorderNumber: string;
  alternateWorkorderNumber?: string;
  location: string;
  statusCode: string;
  priority: string;
  createdDate: string;
  updatedDate: string;
  targetDate: string;
  workType: string;
  requestType: string;
  requestCode: string;
  vendor: string;
  DNE: number;
}


export interface Asset {
  id: number;
  assetTag: string;
}



export interface WoComment {
  id: number;
  subject: string;
  body: string;
}

