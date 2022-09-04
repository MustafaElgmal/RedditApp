import React,{ useContext,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../component/Post";
import { ThemeContext } from "../component/ThemsContext";
import { getPosts } from "../utils/api";

const Home = () => {
  const posts = useSelector((state) =>state.postsFilter);
  const user=useSelector((state)=>state.user)
  const { theme } = useContext(ThemeContext);
  const dispatch=useDispatch()

  const updatePosts = async () => {
    await getPosts(dispatch,user.token);
   };
   useEffect(() => {
     updatePosts();
   },[]);
  if (posts.length === 0) {
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
