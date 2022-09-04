export const getAllComments = (comments) => {
    return {
      type: "GET-COMMENTS",
      payload: comments,
    };
  };