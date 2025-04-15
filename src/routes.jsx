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
            { path: "/actividades/:id", element: <OneProduct /> }
          ]
        }
      ]
    }
  ];