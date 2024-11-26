import React from 'react';
import { Columns } from 'lucide-react';
import { ColumnConfig } from '@/types';

interface ColumnSelectorProps {
  columns: ColumnConfig[];
  onChange: (columnKey: string) => void;
}

export default function ColumnSelector({ columns, onChange }: ColumnSelectorProps) {
  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Columns className="h-4 w-4 mr-2" />
        Columns
      </button>

      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu" aria-orientation="vertical">
          {columns.map((column) => (
            <label
              key={column.key}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={column.visible}
                onChange={() => onChange(column.key)}
              />
              {column.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
