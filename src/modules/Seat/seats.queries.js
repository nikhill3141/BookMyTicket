import { pool } from "../../config/db.js"

const allSeats = async ()=>{
  return pool.query("select * from seats")
}

export{
  allSeats
}