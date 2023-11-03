import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App