import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Header from "./component/Header";
import Login from "./pages/Login";
import ErrorPage from './component/404'
import { ThemeSwitcher } from "./component/ThemsContext";
import SignUp from "./pages/SignUp";
import Protected from "./component/Protected";
function App() {
  return (
    <div>
      <ThemeSwitcher>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Login />} />
          <Route
            path="/postDetails/:id"
            element={
              <Protected>
                <PostDetails />
              </Protected>
            }
          />
          <Route  path="*"  element={<ErrorPage />} />
        </Routes>
      </ThemeSwitcher>
    </div>
  );
}

export default App;
