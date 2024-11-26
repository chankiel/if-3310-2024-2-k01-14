import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
// import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../contexts/AuthContext";
import { Footer, Header } from "../components";
import {Connection, Requests, Login, NotFound, Register, Users, Profile} from "../pages";

const AuthProviderLayout = () => {
  return (
    <AuthProvider>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </AuthProvider>
  );
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AuthProviderLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/feed",
        element: <Login />,
      },
      {
        path: "/mynetworks/connections",
        element: <Login />,
      },
      {
        path: "/mynetworks/pending",
        element: <Requests/>,
      },
      {
        path: "/chat",
        element: <Login />,
      },
      {
        path: "/notification",
        element: <Login />,
      },
      {
        path: "/connections/:userId",
        element: <Connection />
      },
      {
        path: "/users",
        element: <Users />
      },
      {
        path: "/profile/:user_id",
        element: <Profile />
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
