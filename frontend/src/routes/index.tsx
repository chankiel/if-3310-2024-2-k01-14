
//       <Router>
//       {/* user={{ role: "jobseeker",nama:"kiel" }} */}
//         <Navbar/>
//         <Routes>
//             <Route path="/feed" element={<Feed />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/profile/:username" element={<Profile />} />
//             <Route path="*" element={<NotFound />}/>
//             <Route ></Route>
//           </Routes>
//       </Router>

import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { Login, NotFound, Register } from "../pages";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../contexts/AuthContext";
import { Footer, Header } from "../components";

const AuthProviderLayout = () => {
  return (
    <AuthProvider>
      <Header user={null}/>
      <Outlet />
      <Footer />
    </AuthProvider>
  );
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AuthProviderLayout />,
    children: [
    //   {
    //     path: "/",
    //     element: (
    //       <ProtectedRoute>
    //         <Home />
    //       </ProtectedRoute>
    //     ),
    //   },
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
