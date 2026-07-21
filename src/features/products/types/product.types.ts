export type ProductStatus = "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";

export interface ProductReqDto {
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId: number;
  status: ProductStatus;
}

export interface ProductResDto {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  categoryId: number;
  categoryName: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

// Le body de la requête PUT est identique à ProductReqDto — 
// pas de champs optionnels supplémentaires, le backend valide tout comme en création.
// On garde un alias nommé pour la lisibilité dans les fonctions de service/action.
export type UpdateProductDto = ProductReqDto;