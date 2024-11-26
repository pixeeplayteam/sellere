'use client'

import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import AmazonConnection from '../AmazonConnection/AmazonConnection';
import ColumnSelector from './ColumnSelector';
import Image from 'next/image';
import { Settings2, ArrowUpDown } from 'lucide-react';
import { generateMockData, sortData, filterData, exportToCSV, exportToExcel, parseImportedFile } from '@/utils/dataUtils';
import { SortConfig, FilterConfig, ColumnConfig, PaginationConfig } from '@/types';

interface DataGridProps {
  initialProducts?: Product[];
  onProductsUpdate?: (products: Product[]) => void;
}

const defaultColumns: ColumnConfig[] = [
  { key: 'name', label: 'Product', visible: true },
  { key: 'sku', label: 'SKU', visible: true },
  { key: 'price', label: 'Price', visible: true },
  { key: 'stock', label: 'Stock', visible: true },
  { key: 'category', label: 'Category', visible: true },
  { key: 'status', label: 'Status', visible: true },
  { key: 'lastUpdated', label: 'Last Updated', visible: true },
];

export default function DataGrid({ initialProducts = [], onProductsUpdate }: DataGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [columns, setColumns] = useState<ColumnConfig[]>(defaultColumns);
  const [sort, setSort] = useState<SortConfig>({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState<FilterConfig>({
    search: '',
    category: [],
    status: []
  });
  const [pagination, setPagination] = useState<PaginationConfig>({
    page: 1,
    pageSize: 10,
    total: 0
  });
  const [showSettings, setShowSettings] = useState(false);

  // Initialize with mock data if no products are provided
  useEffect(() => {
    if (products.length === 0) {
      const mockData = generateMockData(10);
      setProducts(mockData);
      if (onProductsUpdate) {
        onProductsUpdate(mockData);
      }
    }
  }, []);

  // Update filtered products when products, filters, or sort changes
  useEffect(() => {
    let result = filterData(products, filters);
    result = sortData(result, sort);
    setFilteredProducts(result);
    setPagination(prev => ({ ...prev, total: result.length }));
  }, [products, filters, sort]);

  const handleProductsUpdate = (newProducts: Product[]) => {
    setProducts(newProducts);
    if (onProductsUpdate) {
      onProductsUpdate(newProducts);
    }
  };

  const handleSort = (key: string) => {
    setSort(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleColumnToggle = (key: string) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleExport = async (type: 'csv' | 'excel') => {
    if (!filteredProducts.length) return;
    
    const visibleColumns = columns.filter(col => col.visible);
    if (type === 'csv') {
      await exportToCSV(filteredProducts, visibleColumns);
    } else {
      await exportToExcel(filteredProducts, visibleColumns);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const importedData = await parseImportedFile(file)
      if (importedData && importedData.length > 0) {
        handleProductsUpdate([...products, ...importedData])
      }
    } catch (error) {
      console.error('Import failed:', error)
      alert('Failed to import file. Please check the file format.')
    }
  }

  return (
    <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Product Inventory</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Settings2 className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        <AmazonConnection onProductsImported={handleProductsUpdate} />
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Visible Columns</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {columns.map((column) => (
              <label key={column.key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={column.visible}
                  onChange={() => handleColumnToggle(column.key)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">{column.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns
                .filter(col => col.visible)
                .map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    <button
                      className="group inline-flex items-center space-x-1 hover:text-gray-900"
                      onClick={() => handleSort(column.key)}
                    >
                      <span>{column.label}</span>
                      <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                    </button>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts
              .slice((pagination.page - 1) * pagination.pageSize, pagination.page * pagination.pageSize)
              .map((product, idx) => (
                <tr key={product.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {columns
                    .filter(col => col.visible)
                    .map((column) => (
                      <td
                        key={`${product.id}-${column.key}`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {column.key === 'price' && typeof product[column.key] === 'number'
                          ? `$${product[column.key].toFixed(2)}`
                          : String(product[column.key])}
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">
              Showing {Math.min(filteredProducts.length, pagination.pageSize)} of {filteredProducts.length} results
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {pagination.page} of {Math.ceil(filteredProducts.length / pagination.pageSize)}
            </span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page * pagination.pageSize >= filteredProducts.length}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
