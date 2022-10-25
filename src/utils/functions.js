import { getAllFilterComments } from "../redux/actions/commentsFilter.action";
import { getAllFilterPosts } from "../redux/actions/postsFilter.action";
import { addVote, getPosts } from "./api";

export const captilize = (name) => {
  const nameCap = name
    .split(" ")
    .map((ele) => ele[0].toLocaleUpperCase() + ele.slice(1))
    .join(" ");
  return nameCap;
};
export const vote = async (num, postId, dispatch,token) => {
  const Vote = { userVote: num };
  await addVote(postId, Vote,token);
  await getPosts(dispatch,token);
};

export const searchFilter = async (value,location,dispatch,posts,comments) => {
    
  if(location.pathname === "/"){
    const filter=posts.filter((post)=>post.title.toLowerCase().includes(value.toLowerCase()))
    dispatch(getAllFilterPosts(filter))
    
  }else{
    const filter=comments.filter((comment)=>comment.body.toLowerCase().includes(value.toLowerCase()))
    dispatch(getAllFilterComments(filter))
  }
 
};
