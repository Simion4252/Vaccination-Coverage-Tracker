require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Important for Render Postgres
});

async function seed() {
  try {
    // 1️⃣ Drop tables if they exist (optional)
    await db.query(`DROP TABLE IF EXISTS users, vaccination_data`);

    // 2️⃣ Create tables
    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE vaccination_data (
        id SERIAL PRIMARY KEY,
        region VARCHAR(100),
        age_group VARCHAR(50),
        gender VARCHAR(20),
        doses_administered INT,
        date_recorded DATE
      );
    `);

    // 3️⃣ Insert sample user (hashed password)
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('password123', 10);
    await db.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, ['admin', hashedPassword]);

    // 4️⃣ Insert sample vaccination data
    await db.query(`
      INSERT INTO vaccination_data (region, age_group, gender, doses_administered, date_recorded) VALUES
      ('North Region', '18-29', 'Female', 120, '2023-10-01'),
      ('North Region', '30-49', 'Male', 150, '2023-10-01'),
      ('North Region', '50+', 'Female', 200, '2023-10-02'),
      ('South Region', '18-29', 'Male', 80, '2023-10-01'),
      ('South Region', '30-49', 'Female', 110, '2023-10-03'),
      ('East Region', '50+', 'Male', 95, '2023-10-04'),
      ('West Region', '18-29', 'Female', 130, '2023-10-05'),
      ('North Region', '18-29', 'Male', 140, '2023-10-06'),
      ('South Region', '50+', 'Female', 180, '2023-10-07');
    `);

    console.log('✅ Render database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
}

seed();
