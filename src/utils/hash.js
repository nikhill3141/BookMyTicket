import bcrypt from 'bcrypt'

const hashPassword = async (password)=>{
  const passwordHashed = await bcrypt.hash(password, 10)
  return passwordHashed

}
const comparePassword = async (password, userPassword) =>{
  const isTrue = await bcrypt.compare(password, userPassword)
  return isTrue
}

export {
  hashPassword,
  comparePassword
}