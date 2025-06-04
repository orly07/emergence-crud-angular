export interface Product {
  id: number;
  name: string;
  price: number;
  isArchived?: boolean;
  archivedAt?: Date;
}
