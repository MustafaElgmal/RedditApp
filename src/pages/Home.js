import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../component/Post";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../component/ThemsContext";
import { getAllPosts } from "../redux/actions/post.actions";
import { getPosts } from "../utils/api";
import Layout from "../component/Layout";

const Home = () => {
  const posts = useSelector((state) => state.post);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const updatePosts = async () => {
    const posts = await getPosts();
    dispatch(getAllPosts(posts));
  };
  useEffect(() => {
    updatePosts();
  }, []);

  if (posts?.length === 0) {
    return (
      <main className="mt-5  min-vh-100" style={theme}>
        <div className="div"></div>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
  
    <main className="mt-5 min-vh-100" style={theme}>
      <div className="div"></div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
};

export default Home;
