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
import Wishlist from "../Pages/Dashboard/UserDashboard/Wishlist";
import Offer from "../Pages/Dashboard/UserDashboard/Offer";
import PropertyBought from "../Pages/Dashboard/UserDashboard/PropertyBought";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile";
import Payment from "../Pages/Dashboard/Payment";
import MyReviews from "../Pages/Dashboard/UserDashboard/MyReviews";
import AgentProfile from "../Pages/Dashboard/AgentDashboard/AgentProfile";
import MyAddedProperties from "../Pages/Dashboard/AgentDashboard/MyAddedProperties";
import UpdateProperty from "../Pages/Dashboard/UpdateProperty";
import RequestedProperties from "../Pages/Dashboard/AgentDashboard/RequestedProperties";
import MySoldProperties from "../Pages/Dashboard/AgentDashboard/MySoldProperties";
import ManageProperties from "../Pages/Dashboard/AdminDashboard/ManageProperties";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers";
import ManageReviews from "../Pages/Dashboard/AdminDashboard/ManageReviews";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import AdminProfile from "../Pages/Dashboard/AdminDashboard/AdminProfile";
import AddProperty from "../Pages/Dashboard/AgentDashboard/AddProperties";
import AdvertiseProperty from "../Pages/Dashboard/AdminDashboard/AdvertiseProperty";

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
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },

      //  user dashboard

      {
        path: "/dashboard/myProfile",
        element: (
          <PrivateRoutes>
            <MyProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/wishlist",
        element: (
          <PrivateRoutes>
            <Wishlist />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/propertyBought",
        element: (
          <PrivateRoutes>
            <PropertyBought />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/myReviews",
        element: (
          <PrivateRoutes>
            <MyReviews />
          </PrivateRoutes>
        ),
      },

      // agent dashboard

      {
        path: "/dashboard/agentProfile",
        element: (
          <AgentRoute>
            <AgentProfile />
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/addProperty",
        element: (
          <AgentRoute>
            <AddProperty />
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/myAddedProperties",
        element: (
          <AgentRoute>
            <MyAddedProperties />
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/mySoldProperties",
        element: (
          <AgentRoute>
            <MySoldProperties />
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/requestedProperties",
        element: (
          <AgentRoute>
            <RequestedProperties />
          </AgentRoute>
        ),
      },

      // admin dashboard

      {
        path: "/dashboard/adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageProperties",
        element: (
          <AdminRoute>
            <ManageProperties />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageReviews",
        element: (
          <AdminRoute>
            <ManageReviews />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/advertiseProperty",
        element: (
          <AdminRoute>
            <AdvertiseProperty />
          </AdminRoute>
        ),
      },

      {
        path: "offer/:id",
        element: (
          <PrivateRoutes>
            <Offer />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/wishlist/${params.id}`),
      },

      // payment

      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoutes>
            <Payment />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bought/${params.id}`),
      },

      // update property

      {
        path: "/dashboard/updateProperty/:id",
        element: (
          <PrivateRoutes>
            <UpdateProperty />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/property/${params.id}`),
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
