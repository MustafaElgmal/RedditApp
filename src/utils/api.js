import axios from "axios";
const Api = axios.create({ baseURL: "http://localhost:4000" });

export const createUser = async (user) => {
  try {
    const res = await Api.post("/users", user);
    return res;
  } catch (e) {
    return e;
  }
};

export const loginUser = async (user) => {
  try {
    const res = await Api.post("/users/login", user);
    return res;
  } catch (e) {
    return e;
  }
};
export const getPosts = async () => {
  try {
    const res = await Api.get("/posts");
    return res.data.posts;
  } catch (e) {
    console.log(e);
  }
};

export const getPost = async (id) => {
  try {
    const res = await Api.get(`/posts/${id}`);
    return res.data.post;
  } catch (e) {
    console.log(e);
  }
};

export const addPost = async (post) => {
  try {
    await Api.post("/posts", post);
  } catch (e) {
    console.log(e);
  }
};

export const addVote = async (id, vote) => {
  try {
    await Api.post(`/votes/${id}`, vote);
  } catch (e) {
    console.log(e);
  }
};

export const addComment = async (id, comment) => {
  try {
    await Api.post(`/comments/${id}`, comment);
  } catch (e) {
    console.log(e);
  }
};
