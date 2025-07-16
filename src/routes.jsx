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
import { NavBarProfileLayout } from "./layouts/NavBarProfileLayout/NavBarProfileLayout";
import Booking from "./pages/Booking/Booking";
import BookingConfirmation from "./pages/BookingConfirmation/BookingConfirmation";
import Favorites from "./pages/Favorites/Favorites";
import History from "./pages/History/History";
import Home from "./pages/Home/Home";
import ListCategories from "./pages/ListCategories/ListCategories";
import ListProducts from "./pages/ListProducts/ListProducts";
import Login from "./pages/Login/Login";
import MobileMenu from "./pages/MobileMenu/MobileMenu";
import OneProduct from "./pages/OneProduct/OneProduct";
import Register from "./pages/Register/Register";
import UserProfile from "./pages/UserProfile/UserProfile";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";

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
          { path: "/reservar/:id", element: <Booking /> },
          { path: "/booking/confirm", element: <BookingConfirmation /> },
          { path: "/menu", element: <MobileMenu /> },
          {
            path: "/perfil",
            element: <NavBarProfileLayout />,
            children: [
              { index: true, element: <UserProfile /> },
              { path: "favoritos", element: <Favorites /> },
              { path: "historial", element: <History /> },
            ],
          },
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
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-account",
    element: <VerifyEmail />,
  },
];
