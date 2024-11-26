import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RefreshCw, Loader2, Settings } from 'lucide-react';
import AmazonSettings from './AmazonSettings';
import EANImport from './EANImport';
import { Product } from '@/types';
import { fetchAmazonInventory } from '@/utils/amazonApi';
import { testAmazonConnection } from '@/utils/amazonApi';
import type { AmazonCredentials } from '@/types';

interface AmazonConnectionProps {
  onProductsImported: (products: Product[]) => void;
}

export default function AmazonConnection({ onProductsImported }: AmazonConnectionProps) {
  const [showSettings, setShowSettings] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleProductsImported = (newProducts: Product[]) => {
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
  };

  const handleSync = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const products = await fetchAmazonInventory();
      onProductsImported(products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync with Amazon');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCredentials = (credentials: AmazonCredentials) => {
    try {
      localStorage.setItem('amazonCredentials', JSON.stringify(credentials));
      Object.entries(credentials).forEach(([key, value]) => {
        if (key.startsWith('NEXT_PUBLIC_')) {
          (window as any).process.env[key] = value;
        } else {
          (window as any).process.env[`AMAZON_${key.toUpperCase()}`] = value;
        }
      });
      setError(null);
    } catch (err) {
      setError('Failed to save credentials');
    }
  };

  const handleTestConnection = async (credentials: AmazonCredentials): Promise<boolean> => {
    try {
      return await testAmazonConnection(credentials);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection test failed');
      return false;
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
          <AmazonSettings
            onSave={handleSaveCredentials}
            onTest={handleTestConnection}
          />
          
          <div className="border-t pt-4">
            <h3 className="text-md font-medium mb-3">Import Products</h3>
            <EANImport onProductsImported={handleProductsImported} />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSync}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="-ml-1 mr-2 h-4 w-4" />
                Sync Amazon Products
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}
      </div>

      {products.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-medium mb-3">Imported Products</h3>
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EAN</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.ean}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
