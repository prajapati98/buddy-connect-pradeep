import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import Protected from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RegisterUser from "./RegisterUser";
import UserList from "./UserList";
import UserUpdate from "./UserUpdate";
import UserInfoPage from "./UserInfoPage";
import DeletedList from "./DeletedList";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar>{children}</Sidebar>
      <Footer />
    </>
  );
};

const LoginLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return <>{children}</>;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <Protected>
          <Dashboard />
        </Protected>
      </AppLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <LoginLayout>
        <PublicRoute>
          <Login />
        </PublicRoute>
      </LoginLayout>
    ),
  },
  {
    path: "/register-user",
    element: (
      <AppLayout>
        <Protected>
          <RegisterUser />
        </Protected>
      </AppLayout>
    ),
  },
  {
    path: "/user-list",
    element: (
      <AppLayout>
        <Protected>
          <UserList />
        </Protected>
      </AppLayout>
    ),
  },
  {
    path: "UserUpdate/:id",
    element: (
      <AppLayout>
        <Protected>
          <UserUpdate />
        </Protected>
      </AppLayout>
    ),
  },
  {
    path: "UserInfoPage/:id",
    element: (
      <AppLayout>
        <Protected>
          <UserInfoPage />
        </Protected>
      </AppLayout>
    ),
  },
  {
    path: "deleted-list",
    element: (
      <AppLayout>
        <Protected>
          <DeletedList />
        </Protected>
      </AppLayout>
    ),
  },
]);

const RouteApp = () => <RouterProvider router={router} />;

export default RouteApp;
