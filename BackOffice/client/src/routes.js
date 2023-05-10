import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import DetailUsers from './pages/DetailUsers';
import Modification from './pages/Modification';
import ModifProduct from './pages/ModifProduct';
import ProductDetail from './pages/ProductDetail';
import Admin from './pages/Addadmin';
import OrdersPage from './pages/OrdersPage';
import ModifOrder from './pages/ModifOrder';
import OrderDetail from './pages/OrderDetail';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'modif/:id', element: <Modification /> },
        { path: 'detail/:id', element: <DetailUsers /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'modifProd/:id', element: <ModifProduct /> },
        { path: 'prodDetail/:id', element: <ProductDetail /> },
        { path: 'orders', element: <OrdersPage /> },
        { path: 'modifOrder/:id', element: <ModifOrder /> },
        { path: 'orderDetail/:id', element: <OrderDetail /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'addadmin', element: <Admin /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
