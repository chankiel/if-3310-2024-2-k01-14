import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import "./App.css";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        hideProgressBar={false}
        theme="light"
        bodyClassName={"text-black gap-2 h-20"}
        className={"border-linkin-border"}
      />
    </>
  );
}
