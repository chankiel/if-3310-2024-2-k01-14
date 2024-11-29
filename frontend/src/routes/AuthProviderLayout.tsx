import { Outlet } from "react-router-dom";
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

export default AuthProviderLayout;
