import React from "react";
import { useSelector } from "react-redux";
import Post from "../component/Post";

const Home = () => {
  const posts = useSelector((state) => state);
  

  if (posts?.length === 0) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="mt-5 min-vh-100" style={{ backgroundColor: "#f3f4f6" }}>
    <div className="div"></div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
};

export default Home;
