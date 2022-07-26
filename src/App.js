import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Header from "./component/Header";
import Login from "./pages/Login";
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
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/postDetails/:id" element={<PostDetails />} />
        </Routes>
      </ThemeSwitcher>
    </div>
  );
}

export default App;
