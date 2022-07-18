export const getAllPosts = (posts) => {
  return {
    type: "GET-POSTS",
    payload: posts,
  };
};


