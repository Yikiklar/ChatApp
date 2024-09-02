require('dotenv').config(); // .env dosyasını yükleyin
const mysql = require('mysql2');

// Veritabanı bağlantısını yapılandırma
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Bağlantıyı başlatma
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = connection;