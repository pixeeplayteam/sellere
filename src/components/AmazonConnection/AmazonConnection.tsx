import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AmazonSettings from './AmazonSettings';
import EANImport from './EANImport';
import ProductTable from './ProductTable';
import { Product } from '@/types';
import { enrichProductWithAmazonData } from '@/utils/amazonApi';
import ExcelJS from 'exceljs';

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

  const handleExportProducts = async (productsToExport: Product[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    // Define columns
    worksheet.columns = [
      { header: 'SKU', key: 'sku', width: 20 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Price', key: 'price', width: 10 },
      { header: 'Stock', key: 'stock', width: 10 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Last Updated', key: 'lastUpdated', width: 20 }
    ];

    // Add rows
    productsToExport.forEach(product => {
      worksheet.addRow({
        sku: product.sku,
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: product.category,
        status: product.status,
        lastUpdated: new Date(product.lastUpdated).toLocaleDateString()
      });
    });

    // Style the header row
    worksheet.getRow(1).font = { bold: true };

    const date = new Date().toISOString().split('T')[0];
    const filename = `amazon-products-${date}.xlsx`;

    // Generate and save the file
    await workbook.xlsx.writeFile(filename);
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
