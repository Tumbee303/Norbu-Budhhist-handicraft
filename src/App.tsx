import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components';
import {
  Home,
  OurStory,
  CollectionIndex,
  CategoryPage,
  ProductDetailPage,
  Contact,
  Privacy,
  NotFound,
  DesignSystem,
} from './pages';
import {
  AdminRouteGuard,
  AdminLogin,
  AdminDashboard,
  AdminProducts,
  AdminProductForm,
  AdminInquiries,
  AdminSettings,
} from './admin';

function App() {
  const isDev = import.meta.env.DEV;

  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/collection" element={<CollectionIndex />} />
          <Route path="/collection/:categorySlug" element={<CategoryPage />} />
          <Route path="/products/:productSlug" element={<ProductDetailPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          {isDev && <Route path="/design-system" element={<DesignSystem />} />}
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRouteGuard />}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/new" element={<AdminProductForm />} />
          <Route path="/admin/products/:id/edit" element={<AdminProductForm />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>

        {/* 404 - Must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;