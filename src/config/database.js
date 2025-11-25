import * as mysql from 'mysql2';
import * as dotenv from 'dotenv';

dotenv.config();

export const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
});

connection.connect((err) => {
  if (!err) {
    console.log('✅ DATABASE CONNECTED');
  } else {
    console.error('❌ Error while connecting with MYSQL', err.message);
  }
});

export default connection;