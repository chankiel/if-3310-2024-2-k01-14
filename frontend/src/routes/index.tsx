import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
// import ProtectedRoute from "../components/ProtectedRoute";
import {Connection, Requests, Login, NotFound, Register, Users, Profile, Feed} from "../pages";
import ProviderLayout from "./ProviderLayout";
import Chat from "../pages/Chat/Chat";
import Notifications from "../pages/Notifications";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProviderLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/feed" replace />,
      },
      {
        path: "/home",
        element: <Navigate to="/feed" replace />,
      },
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
        element: <Feed />,
      },
      {
        path: "/mynetworks/connections",
        element: <Connection/>,
      },
      {
        path: "/mynetworks/pending",
        element: <Requests/>,
      },
      {
        path: "/chat",
        element: null,
      },
      {
        path: "/notifications",
        element: <Notifications />,
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
        path: "/chat/:roomId",
        element: <Chat/>
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
