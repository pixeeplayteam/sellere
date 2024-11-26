'use client';

import { useState } from 'react';
import { Product } from '@/types';
import DataGrid from '@/components/DataGrid/DataGrid';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-7xl">
        <DataGrid
          initialProducts={products}
          onProductsUpdate={setProducts}
        />
      </div>
    </main>
  );
}
