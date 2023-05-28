import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT),
});

const executeQueryFindOne = async (query: string) => {
  const res = await pool.query(query);
  if (res.rows) return res.rows[0];
  return null;
};

const executeQueryFindAll = async (query: string): Promise<any> => {
  const res = await pool.query(query);
  if (res.rows) return res.rows;
  return null;
};

export { executeQueryFindOne, executeQueryFindAll };
