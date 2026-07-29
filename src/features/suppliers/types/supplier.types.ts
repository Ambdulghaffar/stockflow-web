export interface SupplierDto {
  id: number;
  name: string;
  contactName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface SupplierReqDto {
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
}