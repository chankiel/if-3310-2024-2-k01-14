import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { SocketProvider } from "../contexts/SocketContext";
import { Header } from "../components";

const ProviderLayout = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <Header />

        <main>
          <Outlet />
        </main>

      </SocketProvider>
    </AuthProvider>
  );
};

export default ProviderLayout;
