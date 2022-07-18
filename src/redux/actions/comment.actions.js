export const getAllPostComments=(comments)=>{
    return{
        type:'GET-COMMENTS',
        payload:comments
    }

}