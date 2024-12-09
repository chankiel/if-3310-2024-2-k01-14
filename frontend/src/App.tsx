import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import "./App.css";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <NotificationContainer /> */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        hideProgressBar={true}
        theme="light"
        bodyClassName={"text-black gap-2 h-20"}
        className={"border-linkin-border"}
      />
    </>
  );
}
