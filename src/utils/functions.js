export const captilaze=(word)=>{
    const newWord=word.split(" ").map((word)=>word[0].toUpperCase()+word.slice(1)).join(" ")
    return newWord
}