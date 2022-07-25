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
import SignUp from "./pages/SignUp";
import Protected from "./component/Protected";

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
    <div>
      <ThemeSwitcher>
        <Header />
          
            <Routes>
            <Route path="/" element={<Protected><Home/></Protected>}/>
              <Route path='/signUp' element={<SignUp />}/>
              <Route path="/postDetails/:id" element={<PostDetails />} />
              <Route path='/login' element={<Login/>}/>
            </Routes>
         
        
      </ThemeSwitcher>
    </div>
  );
}

export default App;
