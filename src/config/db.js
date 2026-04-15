import pg from "pg";



// Equivalent to mongoose connection
// Pool is nothing but group of connections
// If you pick one connection out of the pool and release it
// the pooler will keep that connection open for sometime to other clients to reuse
export const pool = new pg.Pool({
  connectionString:process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
  console.log("DB URL:", process.env.DATABASE_URL);


