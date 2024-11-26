import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AmazonSettings from './AmazonSettings';
import EANImport from './EANImport';
import ProductTable from './ProductTable';
import { Product } from '@/types';
import { enrichProductWithAmazonData } from '@/utils/amazonApi';
import * as XLSX from 'xlsx';

export default function AmazonConnection() {
  const [showSettings, setShowSettings] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleProductsImported = (newProducts: Product[]) => {
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
  };

  const handleDeleteProducts = async (productIds: string[]) => {
    setProducts((prevProducts) => 
      prevProducts.filter(product => !productIds.includes(product.id))
    );
  };

  const handleExportProducts = (productsToExport: Product[]) => {
    const worksheet = XLSX.utils.json_to_sheet(productsToExport.map(product => ({
      EAN: product.ean,
      Name: product.name,
      Price: product.price,
      Quantity: product.quantity,
      'Last Updated': new Date(product.lastUpdated).toLocaleDateString(),
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    
    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `amazon-products-${date}.xlsx`;
    
    XLSX.writeFile(workbook, filename);
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      const updatedProduct = await enrichProductWithAmazonData(product.ean);
      if (updatedProduct) {
        setProducts(prevProducts => 
          prevProducts.map(p => 
            p.id === product.id ? { ...updatedProduct, id: product.id } : p
          )
        );
      }
    } catch (err) {
      setError('Failed to update product from Amazon');
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Amazon Seller Connection</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          {showSettings ? (
            <>
              Hide Settings <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Show Settings <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      </div>

      {showSettings && (
        <div className="space-y-4">
          <AmazonSettings />
          
          <div className="border-t pt-4">
            <h3 className="text-md font-medium mb-3">Import Products</h3>
            <EANImport onProductsImported={handleProductsImported} />
          </div>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-md font-medium mb-3">Product Management</h3>
        <ProductTable
          products={products}
          onDeleteProducts={handleDeleteProducts}
          onExportProducts={handleExportProducts}
          onUpdateProduct={handleUpdateProduct}
        />
      </div>
    </div>
  );
}
