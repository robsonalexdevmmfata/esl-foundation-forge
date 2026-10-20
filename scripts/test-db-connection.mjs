import pg from 'pg';
const { Pool } = pg;

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  const connectionString = process.env.DATABASE_URL || 'postgresql://els:password@127.0.0.1:5432/esl';
  console.log('Connection string:', connectionString.replace(/:[^:@]+@/, ':****@'));
  
  const pool = new Pool({
    connectionString,
    ssl: false,
  });

  try {
    const client = await pool.connect();
    console.log('✅ Database connection successful!\n');
    
    // Test if admin_users table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'admin_users'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ Table admin_users exists\n');
      
      // Check if user exists
      const userCheck = await client.query(
        'SELECT username, role, active FROM public.admin_users WHERE username = $1',
        ['gestaoesl']
      );
      
      if (userCheck.rows.length > 0) {
        const user = userCheck.rows[0];
        console.log('✅ User found:');
        console.log('   Username:', user.username);
        console.log('   Role:', user.role);
        console.log('   Active:', user.active);
      } else {
        console.log('❌ User "gestaoesl" not found in database');
        console.log('   Run: npm run db:migrate');
      }
    } else {
      console.log('❌ Table admin_users does not exist');
      console.log('   Run: npm run db:migrate');
    }
    
    client.release();
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('   Error:', error.message);
    
    if (error.message.includes('password authentication failed')) {
      console.error('\n💡 Solution: Update the password in DATABASE_URL in your .env file');
    } else if (error.message.includes('database "esl" does not exist')) {
      console.error('\n💡 Solution: Create the database first:');
      console.error('   psql -U els -h 127.0.0.1 -c "CREATE DATABASE esl;"');
    } else if (error.message.includes('Connection refused')) {
      console.error('\n💡 Solution: Make sure PostgreSQL is running');
    }
  } finally {
    await pool.end();
  }
}

testConnection();
