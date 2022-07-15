import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Header from "./component/Header";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "./utils/api";
import { getAllPosts } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const updatePosts = async () => {
    const posts = await getPosts();
    dispatch(getAllPosts(posts));
  };

  useEffect(() => {
    updatePosts();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home className="position-absloty" />} />
        <Route path="/postDetails/:id" element={<PostDetails />} />
      </Routes>
    </div>
  );
}

export default App;
