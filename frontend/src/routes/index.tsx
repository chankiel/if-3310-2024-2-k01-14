import { RouteObject, createBrowserRouter } from "react-router-dom";
// import ProtectedRoute from "../components/ProtectedRoute";
import {Connection, Requests, Login, NotFound, Register, Users, Profile} from "../pages";
import ProviderLayout from "./ProviderLayout";
import Chat from "../pages/Chat/Chat";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProviderLayout />,
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
        element: null,
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
        path: "/notification",
        element: null,
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
