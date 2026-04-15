import  jwt from 'jsonwebtoken'


const generateToken = async (userId)=>{
  const token = await jwt.sign({userId:userId}, process.env.JWT_SECRECT_KEY,{expiresIn:process.env.JWT_EXPIRE_TIME||'1h'})
  return token
}

export{
  generateToken
}