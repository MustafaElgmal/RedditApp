export const getAllFilterComments = (comments) => {
    return {
      type: "GET-COMMENTS-FILTER",
      payload: comments,
    };
  };