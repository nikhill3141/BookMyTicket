import jwt from 'jsonwebtoken'

export const isUserAuthenticated = async (req, res, next)=>{
  try {

    const token = req.cookies.token
    if(!token){
      return res.status(401).json({success:false, message:"user is not Authnticated"})
    }
    const decode = jwt.verify(token, process.env.JWT_SECRECT_KEY)
    if(!decode){
      return res.status(402).json({success:false, message:"user is not Authnticated"})
    }

    req.userId = decode.userId
    next();
  } catch (error) {
    console.log(error)
      return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  
  }
}