import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import CreateAccount from "../Pages/CreateAccount";
import PrivateRoutes from "./PrivateRoute";
import AllProperties from "../Pages/AllProperties";
import PropertyDetails from "../Pages/PropertyDetails";
import ErrorPage from "../Pages/ErrorPage";
import Dashboard from "../Pages/Dashboard";
import AgentProfile from "../Components/AgentDashboard/AgentProfile";
import AdminProfile from "../Components/AdminDashboard/AdminProfile";
import MyProfile from "../Components/UserDashboard/MyProfile";
import Wishlist from "../Pages/Dashboard/UserDashboard/Wishlist";
import Offer from "../Pages/Dashboard/UserDashboard/Offer";
import PropertyBought from "../Pages/Dashboard/UserDashboard/PropertyBought";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allProperties",
        element: (
          <PrivateRoutes>
            <AllProperties />
          </PrivateRoutes>
        ),
      },
      {
        path: "/property/:id",
        element: (
          <PrivateRoutes>
            <PropertyDetails />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/property/${params.id}`),
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          //  user dashboard

          {
            path: "myProfile",
            element: <MyProfile />,
          },
          {
            path: "wishlist",
            element: <Wishlist />,
          },
          {
            path: "propertyBought",
            element: <PropertyBought />,
          },

          // agent dashboard

          {
            path: "agentProfile",
            element: <AgentProfile />,
          },

          // admin dashboard

          {
            path: "adminProfile",
            element: <AdminProfile />,
          },
        ],
      },
      {
        path: "offer/:id",
        element: <Offer />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/wishlist/${params.id}`),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/createAccount",
        element: <CreateAccount />,
      },
    ],
  },
]);

export default router;
