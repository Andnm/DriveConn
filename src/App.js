import { BrowserRouter } from "react-router-dom";
import UserRouter from "./routers/UserRouter";
import AdminRouter from "./routers/AdminRouter";
import AuthContextProvider from "./context/authContext";
import { ToastContainer } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import WarningSmallScreen from "./pages/WarningSmallScreen";

function App() {
  const isSmallScreen = useMediaQuery({ maxWidth: 1200 });

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <div>
          {isSmallScreen ? (
            <WarningSmallScreen />
          ) : (
            <>
              <UserRouter />
              <AdminRouter />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </>
          )}
        </div>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
