# Product Inventory Dashboard

A modern, responsive product inventory management dashboard built with Next.js 13, TypeScript, and Tailwind CSS.

## Features

- Responsive data grid with sorting and filtering
- Import/Export functionality
- Column customization
- Product image management
- Multi-language support
- User account management

## Tech Stack

- Next.js 13 with App Router
- TypeScript
- Tailwind CSS
- Lucide React Icons

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── DataGrid/
│   │   └── DataGrid.tsx
│   └── Header/
│       └── Header.tsx
```

## Development

- The project uses the new Next.js 13 App Router
- Components are client-side rendered using the 'use client' directive
- Styling is done with Tailwind CSS utility classes
- Icons are from Lucide React package
- Images are served from picsum.photos with proper Next.js Image optimization
