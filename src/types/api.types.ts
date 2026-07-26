// types/api.types.ts
export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface MessageResponseDto {
  message: string;
}
