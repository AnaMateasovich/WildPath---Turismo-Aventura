import { AdminLayout } from "./admin/layouts/AdminLayout";
import CreateFullFormAdmin from "./admin/pages/CreateFullFormAdmin/CreateFullFormAdmin";
import Dashboard from "./admin/pages/Dashboard/Dashboard";
import ListProductsAdmin from "./admin/pages/ListProductsAdmin/ListProductsAdmin";
import { FooterLayout } from "./layouts/FooterLayout/FooterLayout";
import { HeaderLayout } from "./layouts/HeaderLayout/HeaderLayout";
import Home from "./pages/Home/Home";
import ListProducts from "./pages/ListProducts/ListProducts";
import OneProduct from "./pages/OneProduct/OneProduct";

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
        ],
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <Dashboard /> },
      { path: "/admin/actividades", element: <ListProductsAdmin /> },
      { path: "/admin/actividades/crear", element: <CreateFullFormAdmin /> },
    ],
  },
];
