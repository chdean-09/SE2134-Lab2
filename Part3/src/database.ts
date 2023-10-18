import { Pool } from "pg"

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: '',
  database: 'WebDev-Lab2'
})

pool.connect();

export default pool;