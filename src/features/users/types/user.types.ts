// ✅ Ce que l'API retourne (GET)
export type UserDto = {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string;
  role: "ADMIN" | "MANAGER" | "CLIENT";
  createdAt: string;
  updatedAt: string;
};

// Création — avec password obligatoire
export type UserCreateRequest = {
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: "ADMIN" | "MANAGER" | "CLIENT";
};

// Modification — sans password
export type UserUpdateRequest = {
  username: string;
  email: string;
  phone: string;
  address: string;
  role: "ADMIN" | "MANAGER" | "CLIENT";
};

export type UserStats = {
  total: number;
  admins: number;
  managers: number;
  clients: number;
};



