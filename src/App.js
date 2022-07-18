import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Header from "./component/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./utils/api";
import { getAllPosts } from "./redux/actions/post.actions";
import Login from "./pages/Login";
import { ThemeSwitcher } from "./component/ThemsContext";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const updatePosts = async () => {
    const posts = await getPosts();
    dispatch(getAllPosts(posts));
  };
  useEffect(() => {
    updatePosts();
  }, []);

  return (
    <div className="App">
      <ThemeSwitcher>
        <Header />
        {user.isLoggedIn || JSON.parse(localStorage.getItem("isLoggedIn")) ? (
          <Routes>
            <Route path="/" element={<Home className="position-absloty" />} />
            <Route path="/postDetails/:id" element={<PostDetails />} />
          </Routes>
        ) : (
          <Login />
        )}
      </ThemeSwitcher>
    </div>
  );
}

export default App;
