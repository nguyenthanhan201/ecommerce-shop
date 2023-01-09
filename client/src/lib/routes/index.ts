import AdminLayout from "layouts/admin-layout/AdminLayout";
import UserPlayout from "layouts/user-layout/UserPlayout";
import { lazy } from "react";

const Orders = lazy(() => import('pages/Admin/Orders'))
const Dashboard = lazy(() => import("pages/Admin/Dashboard"));
const Cart = lazy(() => import("pages/Cart"));
const Catalog = lazy(() => import("pages/Catalog"));
const Home = lazy(() => import("pages/Home"));
const Login = lazy(() => import("pages/Login"));
const ProductDetail = lazy(() => import("pages/ProductDetail"));
const AdminProduct = lazy(() => import("pages/Admin/Products"));
const AdminHideProduct = lazy(() => import("pages/Admin/HideProducts"));
const AdminAnalytics = lazy(() => import("pages/Admin/Analytics"));
const VNPayReturn = lazy(() => import("pages/Order/VNPayReturn"));
const UserPage = lazy(() => import("pages/User"));
const UserAccount = lazy(() => import("pages/User/Account"));
const UserOrders = lazy(() => import("pages/User/Orders"));

type Route = {
  path: string;
  component: React.FC;
  layout?: ({ children }: any) => JSX.Element;
}

const publicRoutes: Route[] = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/catalog',
    component: Catalog,
  },
  {
    path: '/catalog/:slug',
    component: ProductDetail,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/order/vnpay_return',
    component: VNPayReturn,
  },
  {
    path: '/user/orders',
    component: UserOrders,
    layout: UserPlayout
  },
  {
    path: '/user/account',
    component: UserAccount,
    layout: UserPlayout
  },
  {
    path: '/user/*',
    component: UserPage,
    layout: UserPlayout
  },
  {
    path: '*',
    component: Home,
  },
]

const privateRoutes: Route[] = [
  {
    path: '/admin',
    component: Dashboard,
    layout: AdminLayout
  },
  {
    path: '/admin/products',
    component: AdminProduct,
    layout: AdminLayout
  },
  {
    path: '/admin/hide-products',
    component: AdminHideProduct,
    layout: AdminLayout
  },
  {
    path: '/admin/analytics',
    component: AdminAnalytics,
    layout: AdminLayout
  },
  {
    path: '/admin/orders',
    component: Orders,
    layout: AdminLayout
  },
]

export { publicRoutes, privateRoutes };

