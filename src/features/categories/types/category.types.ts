export interface CategoryDto {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResDto {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}


export interface CategoryReqDto {
  name: string;
  description: string;
  imageUrl?: string;
}

export interface UpdateCategoryDto extends Partial<CategoryReqDto> {
  id: number;
}