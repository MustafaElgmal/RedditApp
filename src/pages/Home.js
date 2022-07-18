import React from "react";
import { useSelector } from "react-redux";
import Post from "../component/Post";
import { useContext } from "react";
import { ThemeContext } from "../component/ThemsContext";

const Home = () => {
  const posts = useSelector((state) => state.post);
  const {theme}=useContext(ThemeContext)
  
  if (posts?.length === 0) {
    return (
      <main>
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
