import axios from "axios";
const Api = axios.create({ baseURL: "http://localhost:4000" });

export const createUser=async(user)=>{
  try{
    const res=await Api.post('/users',user)
    return res
  }catch(e){
    return e
  }
}

export const loginUser=async(user)=>{
  try{
    const res=await Api.post('/users/login',user)
    return res

  }catch(e){

    return e

  }
}
export const getPosts = async () => {
  try {
    const res = await Api.get("/posts");
    console.log(res);
    return res.data.posts;
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
    const res = await Api.post(`/votes/${id}`, vote);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const addComment = async (id, comment) => {
  try {
    const res = await Api.post(`/comments/${id}`, comment);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
