require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function seed() {
  try {
    // Create tables
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS vaccination_data (
        id SERIAL PRIMARY KEY,
        region VARCHAR(100),
        age_group VARCHAR(50),
        gender VARCHAR(20),
        doses_administered INT,
        date_recorded DATE
      )
    `);

    // Insert admin user
    const hashed = await bcrypt.hash('password123', 10);
    await db.query(
      `INSERT INTO users (username, password) VALUES ($1, $2)
       ON CONFLICT (username) DO NOTHING`,
      ['admin', hashed]
    );

    console.log('✅ Neon database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding Neon DB:', err);
    process.exit(1);
  }
}

seed();
