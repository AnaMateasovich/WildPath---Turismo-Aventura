import { FooterLayout } from "./src/layouts/FooterLayout/FooterLayout";
import { HeaderLayout } from "./src/layouts/HeaderLayout/HeaderLayout";
import Home from "./src/pages/Home/Home";

export const routes = [
    {
      element: <HeaderLayout />,
      children: [
        {
          element: <FooterLayout />,
          children: [
            { path: "/", element: <Home /> }
          ]
        }
      ]
    }
  ];