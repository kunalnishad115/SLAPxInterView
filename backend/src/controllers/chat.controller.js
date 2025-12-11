import { genrateStreamToken } from "../config/stream.js" 



export const getStreamToken=async (req,res)=>{

  try{
       const token=await genrateStreamToken(req.auth().userId)
       return res.status(200).json({token});
  }catch(error){
      res.status(500).json({message:"Error generating stream token"});
  }
   
}