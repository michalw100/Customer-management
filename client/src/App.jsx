import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import SignIn from './pages/SignIn';
import GlobalProvider, { GlobalContext } from "./context/GlobalContext";
import { useContext } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";

function App() {
  function PrivateRoute({ children }) {
    const { isAuth } = useContext(GlobalContext);
    return isAuth ? children : <Navigate to="/signIn" />;
  }
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <>
                  <Nav />
                  <Home />
                </>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signIn" />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;