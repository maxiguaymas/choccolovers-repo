import React, { Suspense, lazy } from 'react';
import Home from './pages/Home';
import { useProducts } from './hooks/useProducts';

const AdminPanel = lazy(() => import('./pages/AdminPanel.jsx'));

const App = () => {
  // Simple Router Check
  const isAdminRoute = window.location.pathname === '/admin';
  
  // Usamos el custom hook
  const { products, categories, loading } = useProducts(isAdminRoute);

  // Si estamos en la ruta /admin, renderizamos SOLO el panel de admin
  if (isAdminRoute) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando panel...</div>}>
        <AdminPanel products={products} categories={categories} loading={loading} />
      </Suspense>
    );
  }

  return (
    <Home products={products} categories={categories} loading={loading} />
  );
};

export default App;