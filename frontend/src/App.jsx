import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Profile from "./components/Profile";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { setCredentials } from "./features/userSlice";
import PrivateRoute from "./PrivateRoute";

// Eğer Auth gerektiren sayfaları ayırmak istersen aşağıya bakabilirsin
import { useSelector } from "react-redux";

function PrivateRoute({ element }) {
  const user = useSelector((state) => state.user.user);
  // isAuthenticated da kullanılabilir
  return user ? element : <LoginPage />;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Hem token hem user varsa redux state'e yaz
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(setCredentials({ user, token }));
      } catch (e) {
        // Hatalı user objesi varsa localStorage'ı temizle
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
