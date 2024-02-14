import mysql from 'mysql2/promise';

export const connectMySQL = async () => {
    const mysqlConfig = {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'yungcode23#@@',
      database: 'crm_db',
      waitForConnections: true,
      connectionLimit: Infinity,
      queueLimit: 0
    };
  
    try {
      const connection = mysql.createPool(mysqlConfig);
      console.log('Connected to DB');
      return connection;
    } catch (error) {
      console.error('Error connecting to MySQL:', error.message);
      process.exit(1);
    }
};