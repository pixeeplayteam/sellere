import { Product, SortConfig, FilterConfig, ColumnConfig } from '@/types';
import Papa from 'papaparse';

export const generateMockData = (count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `prod-${i + 1}`,
    name: `Product ${i + 1}`,
    sku: `SKU-${i + 1}`,
    price: Math.floor(Math.random() * 1000),
    stock: Math.floor(Math.random() * 100),
    category: ['Electronics', 'Clothing', 'Books', 'Home'][Math.floor(Math.random() * 4)],
    status: ['In Stock', 'Low Stock', 'Out of Stock'][Math.floor(Math.random() * 3)],
    lastUpdated: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));
};

export const filterData = (data: Product[], filters: FilterConfig): Product[] => {
  if (!data || !Array.isArray(data)) return [];
  
  return data.filter(product => {
    const matchesSearch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.sku.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory = !filters.category.length || 
      filters.category.includes(product.category);

    const matchesStatus = !filters.status.length || 
      filters.status.includes(product.status);

    return matchesSearch && matchesCategory && matchesStatus;
  });
};

export const sortData = (data: Product[], sort: SortConfig): Product[] => {
  if (!data || !Array.isArray(data)) return [];
  
  return [...data].sort((a, b) => {
    const aValue = a[sort.key as keyof Product];
    const bValue = b[sort.key as keyof Product];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sort.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sort.direction === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    }
    
    return 0;
  });
};

export const exportToCSV = async (data: Product[], columns: ColumnConfig[]): Promise<void> => {
  if (!data || !Array.isArray(data) || !data.length) return;

  const headers = columns
    .filter(col => col.visible)
    .map(col => col.label)
    .join(',');

  const rows = data.map(product =>
    columns
      .filter(col => col.visible)
      .map(col => product[col.key as keyof Product])
      .join(',')
  ).join('\\n');

  const csv = `${headers}\\n${rows}`;
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'products.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};

export const exportToExcel = async (data: Product[], columns: ColumnConfig[]): Promise<void> => {
  // Implementation depends on your Excel library choice
  console.log('Excel export not implemented yet');
};

export const parseImportedFile = async (file: File): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\\n');
        const headers = lines[0].split(',');
        
        const products: Product[] = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',');
            const product: Partial<Product> = {};
            
            headers.forEach((header, index) => {
              const value = values[index]?.trim();
              if (value) {
                const key = header.trim().toLowerCase() as keyof Product;
                if (key === 'price' || key === 'stock') {
                  product[key] = Number(value);
                } else {
                  product[key] = value;
                }
              }
            });
            
            return {
              id: `imported-${Date.now()}-${Math.random()}`,
              name: product.name || '',
              sku: product.sku || '',
              price: product.price || 0,
              stock: product.stock || 0,
              category: product.category || 'Uncategorized',
              status: product.status || 'Unknown',
              lastUpdated: new Date().toISOString(),
            };
          });
          
        resolve(products);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
