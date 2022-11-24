import axios from "axios";
import { getAllComments } from "../redux/actions/comments.action";
import { getAllFilterComments } from "../redux/actions/commentsFilter.action";
import { getAllPosts } from "../redux/actions/posts.actions";
import { getAllFilterPosts } from "../redux/actions/postsFilter.action";
import { login } from "../redux/actions/user.actions";

const Api = axios.create({ baseURL: "https://reddit-apis.onrender.com" });

export const createUser = async (user, dispatch, navigate) => {
  try {
    const res = await Api.post("/users", user);
    dispatch(login(res.data.token));
    localStorage.setItem(
      "user",
      JSON.stringify({ token: res.data.token, isLoggedIn: true })
    );
    navigate("/");
  } catch (e) {
    if (e.response.status === 500) {
      console.log(e);
    } else {
      alert(e.response.data.error);
    }
  }
};

export const loginUser = async (user, dispatch, navigate) => {
  try {
    const res = await Api.post("/users/signin", user);
    dispatch(login(res.data.token));
    localStorage.setItem(
      "user",
      JSON.stringify({ token: res.data.token, isLoggedIn: true })
    );
    navigate("/");
  } catch (e) {
    if (e.response.status === 500) {
      console.log(e);
    } else {
      alert(e.response.data.error);
    }
  }
};
export const getPosts = async (dispatch,token) => {
  try {
    const res = await Api.get("/posts",{headers:{authorization:token}});
    dispatch(getAllPosts(res.data.posts));
    dispatch(getAllFilterPosts(res.data.posts))
  } catch (e) {
    console.log(e);
  }
};

export const getPost = async (id,token,setPost,dispatch) => {
  try {
    const res = await Api.get(`/posts/${id}`,{headers:{authorization:token}});
    setPost(res.data.post);
    dispatch(getAllComments(res.data.post.comments))
    dispatch(getAllFilterComments(res.data.post.comments))
  } catch (e) {
    console.log(e);
  }
};

export const addPost = async (post,token,dispatch) => {
  try {
    await Api.post("/posts", post,{headers:{authorization:token}});
  } catch (e) {
    console.log(e);
  }
};

export const addVote = async (id, vote,token,dispatch) => {
  try {
    await Api.post(`/votes/${id}`, vote,{headers:{authorization:token}});
  } catch (e) {
    console.log(e);
  }
};

export const addComment = async (id, comment,token,dispatch) => {
  try {
    await Api.post(`/comments/${id}`, comment,{headers:{authorization:token}});
  } catch (e) {
    console.log(e);
  }
};

export const getAlltags=async(token,setTags)=>{
  try {
    const res=await Api.get(`/tags`,{headers:{authorization:token}});
    setTags(res.data.tags)
  } catch (e) {
    console.log(e);
  }

}
