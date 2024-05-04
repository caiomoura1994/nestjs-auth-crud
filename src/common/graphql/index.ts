import { FindConditions } from 'typeorm';

export class PaginatedItems<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export class FindPaginatedInput<T> {
  where?: FindConditions<T>[];
  page?: number;
  perPage?: number;
}
