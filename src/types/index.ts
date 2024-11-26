export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status: string;
  lastUpdated: string;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  search: string;
  category: string[];
  status: string[];
}

export interface ColumnConfig {
  key: string;
  label: string;
  visible: boolean;
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}

export interface AmazonCredentials {
  marketplaceId: string;
  sellerId: string;
  accessKey: string;
  secretKey: string;
  roleArn: string;
  appId: string;
  region: string;
  refreshToken: string;
}
