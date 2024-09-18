import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import SignIn from './pages/SignIn';
import GlobalProvider, { GlobalContext } from "./context/GlobalContext";
import { useContext } from "react";

function App() {
  // const { isAuth } = useContext(GlobalContext);

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/signIn" />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;