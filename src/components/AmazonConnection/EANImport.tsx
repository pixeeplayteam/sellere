import React, { useState, useRef } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { Product } from '@/types';
import { enrichProductWithAmazonData } from '@/utils/amazonApi';

interface EANImportProps {
  onProductsImported: (products: Product[]) => void;
}

export default function EANImport({ onProductsImported }: EANImportProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      const text = await file.text();
      const eans = text
        .split(/[\n,]/) // Split by newline or comma
        .map(ean => ean.trim())
        .filter(ean => ean && /^\d+$/.test(ean)); // Keep only non-empty numeric EANs

      if (eans.length === 0) {
        throw new Error('No valid EAN numbers found in the file');
      }

      // Process EANs in batches
      const batchSize = 5;
      const enrichedProducts: Product[] = [];

      for (let i = 0; i < eans.length; i += batchSize) {
        const batch = eans.slice(i, i + batchSize);
        const batchPromises = batch.map(async (ean) => {
          try {
            return await enrichProductWithAmazonData(ean);
          } catch (err) {
            console.error(`Failed to enrich product with EAN ${ean}:`, err);
            return null;
          }
        });

        const batchResults = await Promise.all(batchPromises);
        const validProducts = batchResults.filter((p): p is Product => p !== null);
        enrichedProducts.push(...validProducts);

        // Update progress
        setProgress(Math.min(((i + batchSize) / eans.length) * 100, 100));
      }

      onProductsImported(enrichedProducts);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process the file');
    } finally {
      setIsLoading(false);
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept=".txt,.csv"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hidden"
          id="ean-file-upload"
        />
        <label
          htmlFor="ean-file-upload"
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Importing...
            </>
          ) : (
            <>
              <Upload className="-ml-1 mr-2 h-4 w-4" />
              Import EAN List
            </>
          )}
        </label>

        {isLoading && progress > 0 && (
          <div className="flex items-center space-x-2">
            <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <div className="text-sm text-gray-500">
        <p>Upload a text file (.txt) or CSV file with EAN numbers.</p>
        <ul className="list-disc list-inside mt-1">
          <li>One EAN per line or comma-separated</li>
          <li>Only numeric values are accepted</li>
          <li>Example: 1234567890123</li>
        </ul>
      </div>
    </div>
  );
}
