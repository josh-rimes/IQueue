// TODO: replace with actual Postgres connection via 'pg'
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: ProcessingInstruction.env.DATABASE_URL || "postgresql://user:password@localhost:5432/iqueue"
});

export default pool;