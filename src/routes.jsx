import { AdminLayout } from "./admin/layouts/AdminLayout";
import CategoriesAdmin from "./admin/pages/CategoriesAdmin/CategoriesAdmin";
import CreateCategory from "./admin/pages/CreateCategory/CreateCategory";
import CreateFullFormAdmin from "./admin/pages/CreateFullFormAdmin/CreateFullFormAdmin";
import Dashboard from "./admin/pages/Dashboard/Dashboard";
import ListProductsAdmin from "./admin/pages/ListProductsAdmin/ListProductsAdmin";
import ProductFeatures from "./admin/pages/ProductFeatures/ProductFeatures";
import UsersAdmin from "./admin/pages/UsersAdmin/UsersAdmin";
import { FooterLayout } from "./layouts/FooterLayout/FooterLayout";
import { HeaderLayout } from "./layouts/HeaderLayout/HeaderLayout";
import Home from "./pages/Home/Home";
import ListCategories from "./pages/ListCategories/ListCategories";
import ListProducts from "./pages/ListProducts/ListProducts";
import Login from "./pages/Login/Login";
import OneProduct from "./pages/OneProduct/OneProduct";
import Register from "./pages/Register/Register";
import UserProfile from "./pages/UserProfile/UserProfile";

export const routes = [
  {
    element: <HeaderLayout />,
    children: [
      {
        element: <FooterLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/actividades", element: <ListProducts /> },
          { path: "/actividades/:id", element: <OneProduct /> },
          { path: "/categorias", element: <ListCategories /> },
          { path: "/perfil", element: <UserProfile /> },
        ],
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <Dashboard /> },
      { path: "/admin/actividades", element: <ListProductsAdmin /> },
      { path: "/admin/actividades/:id", element: <ProductFeatures /> },
      { path: "/admin/actividades/crear", element: <CreateFullFormAdmin /> },
      { path: "/admin/categories", element: <CategoriesAdmin /> },
      { path: "/admin/categories/crear", element: <CreateCategory /> },
      { path: "/admin/users", element: <UsersAdmin /> },
    ],
  },
  {
    path: "/registro",
    element: <Register/>
  },
  {
    path: "/iniciar-sesion",
    element: <Login/>
  }
];
