export interface PackageFormValues {
  name: string;
  description?: string;
  price: number;
  duration: number;
  status?: boolean;
}

export interface EditPackageFormValues {
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
  status?: boolean;
}

export interface PackageDetail {
  name: string;
  description?: string;
  price: number;
  duration: number;
}
