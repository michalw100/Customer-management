import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css';
import SignIn from './pages/SignIn';
import { GlobalContext } from "./context/GlobalContext";
import { useContext } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Profile from "./pages/Profile";


function App() {
  const { isAuth, loading } = useContext(GlobalContext);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route element={isAuth ? <Outlet /> : <Navigate to={"/login"} />}>
          <Route path="/home" element={<> <Nav /><Home /> </>} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/signIn" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;