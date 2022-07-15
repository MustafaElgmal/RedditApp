import axios from "axios";
const Api = axios.create({ baseURL: "https://api.tawwr.com" });
export const getPosts = async () => {
  try {
    const res = await Api.get("/posts");
    console.log(res);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const addPost = async (post) => {
  try {
    const res = await Api.post("/posts", post);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const addVote = async (id, vote) => {
  try {
    const res = await Api.post(`/posts/${id}/vote`, vote);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const addComment = async (id, comment) => {
  try {
    const res = await Api.post(`/posts/${id}/comment`, comment);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
