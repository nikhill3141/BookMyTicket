import { pool } from "../../config/db.js"
export const createUser = async(name, email, password)=> {
  return await pool.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3)",[name, email, password]);

}

export const findUser = (email) => {
  return pool.query("SELECT * FROM users WHERE email=$1",[email])
}
