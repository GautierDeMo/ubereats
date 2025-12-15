import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    console.log('🔍 Attempting to connect with:', process.env.DATABASE_URL);
    const client = await pool.connect();
    console.log('✅ Connection successful!');

    const result = await client.query('SELECT current_user, current_database(), version()');
    console.log('📊 Current user:', result.rows[0].current_user);
    console.log('📊 Current database:', result.rows[0].current_database);
    console.log('📊 PostgreSQL version:', result.rows[0].version);

    // Test permissions
    const permsResult = await client.query(`
      SELECT has_database_privilege(current_user, current_database(), 'CREATE') as can_create,
             has_database_privilege(current_user, current_database(), 'CONNECT') as can_connect;
    `);
    console.log('📊 Permissions:', permsResult.rows[0]);

    client.release();
  } catch (error) {
    console.error('❌ Connection failed:', error);
  } finally {
    await pool.end();
  }
}

testConnection();
