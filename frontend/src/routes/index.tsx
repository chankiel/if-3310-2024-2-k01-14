import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import { UnauthRoute, ProtectedRoute } from "../components";
import {
  Connection,
  Requests,
  Login,
  NotFound,
  Register,
  Users,
  Profile,
  Feed,
  LandingPage,
  Inbox,
} from "../pages";
import ProviderLayout from "./ProviderLayout";
import Chat from "../pages/Chat/Chat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProviderLayout />,
    children: [
      {
        path: "/",
        element: (
          <UnauthRoute>
            <LandingPage />
          </UnauthRoute>
        ),
      },
      {
        path: "/home",
        element: <Navigate to={"/feed"} replace />,
      },
      {
        path: "/login",
        element: (
          <UnauthRoute>
            <Login />
          </UnauthRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <UnauthRoute>
            <Register />
          </UnauthRoute>
        ),
      },
      {
        path: "/feed",
        element: (
          <QueryClientProvider client={queryClient}>
            <Feed />
          </QueryClientProvider>
        ),
      },
      {
        path: "/mynetworks/connections",
        element: (
          <ProtectedRoute>
            <Connection />
          </ProtectedRoute>
        ),
      },
      {
        path: "/mynetworks/pending",
        element: (
          <ProtectedRoute>
            <Requests />
          </ProtectedRoute>
        ),
      },
      {
        path: "/chat",
        element: (
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
      {
        path: "/connections/:userId",
        element: <Connection />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/profile/:user_id",
        element: <Profile />,
      },
      {
        path: "/chat/:roomId",
        element: (
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        ),
      },
      {
        path: "/404",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <Navigate to={"/404"} replace />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
