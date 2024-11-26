import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { Login, NotFound, Register } from "../pages";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../contexts/AuthContext";
import { Footer, Header } from "../components";

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
        path: "*",
        element: (
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
