import { RouteObject, createBrowserRouter } from "react-router-dom";
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
import Notifications from "../pages/Notifications";
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
        element: (
          <UnauthRoute>
            <LandingPage />
          </UnauthRoute>
        ),
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
        element: <Connection />,
      },
      {
        path: "/mynetworks/pending",
        element: <Requests />,
      },
      {
        path: "/chat",
        element: <Inbox/>,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
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
        element: <Chat />,
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
