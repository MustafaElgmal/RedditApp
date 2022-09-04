export const getAllFilterPosts = (posts) => {
    return {
      type: "GET-FILTER-POSTS",
      payload: posts,
    };
  };