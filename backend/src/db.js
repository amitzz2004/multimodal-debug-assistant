import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://appuser:example@localhost:5432/debug_db',
});

export default pool;
