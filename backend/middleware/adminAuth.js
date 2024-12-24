import jwt from "jsonwebtoken";

const adminAuth =async(req,res,next)=>{
  try {
    const {token} = req.headers;
    if (! token) {
      return res.json({success:false,message:"not authorised admin please login again"})
    }

    //decoding the token
    const decod_token =jwt.verify(token,process.env.JWT_SECRET);

    if (decod_token !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
      return res.json({success:false,message:"Try login again"})
    }

    next();
  } catch (error) {
    return res.json({success:false,error})
  }
}


export default adminAuth;