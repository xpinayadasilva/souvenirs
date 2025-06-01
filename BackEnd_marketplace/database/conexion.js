import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config'; 

dotenv.config();
const pool = new Pool({
  /* user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME, */
  user: 'postgres',
  host: 'localhost',
  database: 'db_souvenirs',
  password: '2808',
  port: 5432
});

export default pool;
